#!/usr/bin/env node
/**
 * Auto-translate messages/en.json into the other locales defined in i18n/routing.ts.
 *
 * - Uses google-translate-api-x (free, unofficial, no API key).
 * - Preserves existing translations: only translates keys that are missing
 *   or whose source English string has changed since last run.
 * - Preserves <em> tags (rich text) by switching to HTML-aware translation.
 * - Tracks source-string fingerprints in messages/.translations.lock.json
 *   so re-running is cheap and idempotent.
 *
 * Run:
 *   pnpm translate           // translate any missing/changed keys
 *   pnpm translate --force   // re-translate everything
 */

import { translate } from "google-translate-api-x";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const MESSAGES_DIR = join(ROOT, "messages");
const SOURCE_LOCALE = "en";
const TARGET_LOCALES = ["fr", "es", "it", "de"];
const LOCK_FILE = join(MESSAGES_DIR, ".translations.lock.json");
const FORCE = process.argv.includes("--force");

// Light rate limiting between requests
const DELAY_MS = 120;
const MAX_RETRIES = 3;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function loadJson(path, fallback = null) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(await readFile(path, "utf8"));
}

async function saveJson(path, data) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(data, null, 2) + "\n", "utf8");
}

// Recursively walk an object/array, calling visit(value, pathSegments)
// for each leaf string. visit may return a replacement string.
async function walkStrings(node, path, visit) {
  if (typeof node === "string") {
    return await visit(node, path);
  }
  if (Array.isArray(node)) {
    const out = [];
    for (let i = 0; i < node.length; i++) {
      out.push(await walkStrings(node[i], [...path, String(i)], visit));
    }
    return out;
  }
  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      out[k] = await walkStrings(v, [...path, k], visit);
    }
    return out;
  }
  return node;
}

async function translateString(text, targetLocale) {
  if (!text || !text.trim()) return text;
  const hasHtml = /<[a-z][^>]*>/i.test(text);
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await translate(text, {
        from: SOURCE_LOCALE,
        to: targetLocale,
        forceBatch: false,
        // The endpoint preserves <tags> when given as HTML.
        ...(hasHtml ? { format: "html" } : {}),
      });
      return result.text;
    } catch (err) {
      if (attempt === MAX_RETRIES) throw err;
      const wait = 500 * attempt;
      console.warn(
        `  ! translate failed (attempt ${attempt}): ${err.message}. retrying in ${wait}ms`,
      );
      await sleep(wait);
    }
  }
  return text;
}

function pathKey(segments) {
  return segments.join(".");
}

async function translateLocale(source, locale, lock) {
  const existing = (await loadJson(join(MESSAGES_DIR, `${locale}.json`), {})) ?? {};
  const localeLock = lock[locale] ?? {};
  let translatedCount = 0;
  let preservedCount = 0;

  // Walk the source tree and produce a translated tree.
  const result = await walkStrings(source, [], async (value, segments) => {
    const key = pathKey(segments);
    const existingValue = getByPath(existing, segments);
    const previousSource = localeLock[key];

    // If existing value present, source unchanged, and not forcing -> reuse.
    if (
      !FORCE &&
      typeof existingValue === "string" &&
      previousSource === value
    ) {
      preservedCount++;
      return existingValue;
    }

    process.stdout.write(`  · ${locale} ← ${key} ... `);
    const translated = await translateString(value, locale);
    process.stdout.write(`${truncate(translated)}\n`);
    localeLock[key] = value;
    translatedCount++;
    await sleep(DELAY_MS);
    return translated;
  });

  await saveJson(join(MESSAGES_DIR, `${locale}.json`), result);
  lock[locale] = localeLock;
  console.log(
    `  ✓ ${locale}: ${translatedCount} translated, ${preservedCount} preserved`,
  );
}

function getByPath(node, segments) {
  let cur = node;
  for (const s of segments) {
    if (cur == null) return undefined;
    if (Array.isArray(cur)) {
      const i = Number(s);
      cur = cur[i];
    } else if (typeof cur === "object") {
      cur = cur[s];
    } else {
      return undefined;
    }
  }
  return cur;
}

function truncate(s, n = 60) {
  const oneLine = String(s).replace(/\s+/g, " ");
  return oneLine.length > n ? oneLine.slice(0, n - 1) + "…" : oneLine;
}

async function main() {
  const sourcePath = join(MESSAGES_DIR, `${SOURCE_LOCALE}.json`);
  const source = await loadJson(sourcePath);
  if (!source) {
    console.error(`✗ Missing source file: ${sourcePath}`);
    process.exit(1);
  }

  const lock = (await loadJson(LOCK_FILE, {})) ?? {};
  console.log(
    `→ Translating ${SOURCE_LOCALE} → [${TARGET_LOCALES.join(", ")}]${FORCE ? " (force)" : ""}`,
  );

  for (const locale of TARGET_LOCALES) {
    console.log(`\n[${locale}]`);
    try {
      await translateLocale(source, locale, lock);
    } catch (err) {
      console.error(`✗ ${locale} failed: ${err.message}`);
      process.exitCode = 1;
    }
  }

  await saveJson(LOCK_FILE, lock);
  console.log(`\n✓ Done. Lock file: ${LOCK_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
