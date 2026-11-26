"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowIcon } from "./brand-mark";
import { CONTACT_EMAIL as EMAIL, Email } from "./email";
import { Tile } from "./icons";
import { CONTACT_ENDPOINT as ENDPOINT } from "./links";
import { SignalWave } from "./signal-wave";

// ENDPOINT : route publique de Kepler Business ; elle enregistre la demande,
// prévient le studio et envoie un accusé de réception à la personne.

const FIELDS = ["name", "email", "type", "message"] as const;
type FieldName = (typeof FIELDS)[number];
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "success" | "invalid" | "rate" | "error";

export function Contact() {
  const t = useTranslations("Contact");
  const f = useTranslations("Contact.fields");
  const locale = useLocale();
  const options = f.raw("typeOptions") as string[];
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  // Anti-spam : temps écoulé depuis l'affichage du formulaire. Un robot qui
  // poste directement à l'API n'envoie pas cette valeur, ou envoie trop vite.
  const shownAt = useRef<number | null>(null);
  useEffect(() => {
    shownAt.current = Date.now();
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "");

    setStatus("sending");
    setErrors({});

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value("name").trim(),
          email: value("email").trim(),
          type: value("type"),
          message: value("message").trim(),
          locale,
          source: window.location.href,
          website: value("website"),
          elapsed: shownAt.current ? Date.now() - shownAt.current : null,
        }),
      });

      if (res.status === 201) {
        form.reset();
        setStatus("success");
        return;
      }

      if (res.status === 400) {
        const body = (await res.json().catch(() => null)) as {
          fields?: Record<string, unknown>;
        } | null;
        const next: FieldErrors = {};
        for (const key of FIELDS) {
          const msg = body?.fields?.[key];
          if (typeof msg === "string") next[key] = msg;
        }
        const first = FIELDS.find((key) => next[key]);
        if (first) {
          setErrors(next);
          setStatus("invalid");
          form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
          return;
        }
      }

      setStatus(res.status === 429 ? "rate" : "error");
    } catch {
      setStatus("error");
    }
  };

  // Une erreur disparaît dès qu'on corrige le champ concerné.
  const onChange = (e: FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name as FieldName;
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const fieldProps = (name: FieldName) =>
    errors[name]
      ? { "aria-invalid": true, "aria-describedby": `f-${name}-error` }
      : {};

  const fieldError = (name: FieldName) =>
    errors[name] ? (
      <p className="field-error" id={`f-${name}-error`}>
        {errors[name]}
      </p>
    ) : null;

  const sending = status === "sending";

  return (
    <section className="section contact" id="contact">
      <div className="bleed" aria-hidden="true">
        <SignalWave />
      </div>

      <header className="contact-head reveal">
        <Tile glyph="mail" accent="#c4b5fd" className="contact-tile" />
        <span className="eyebrow" style={{ marginTop: 28 }}>
          {t("eyebrow")}
        </span>
        <h2 className="contact-title">
          <span className="grad">{t("titleLine1")}</span>
          <span className="hl">{t("titleLine2")}</span>
        </h2>
        <p className="lede">{t("sub")}</p>
      </header>

      {/* method/action : si le visiteur envoie avant le chargement du JS, le
          navigateur poste directement à l'API (qui accepte aussi les
          formulaires classiques) au lieu de mettre ses données dans l'URL. */}
      <form
        className="card form reveal"
        method="post"
        action={ENDPOINT}
        onSubmit={onSubmit}
        onChange={onChange}
        aria-busy={sending}
      >
        <input type="hidden" name="locale" value={locale} />
        {/* Pot de miel : invisible pour un humain, rempli par les robots. */}
        <input
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px" }}
        />

        <div className="form-row">
          <div className="field">
            <label htmlFor="f-name">{f("name")}</label>
            <input
              id="f-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder={f("namePlaceholder")}
              required
              {...fieldProps("name")}
            />
            {fieldError("name")}
          </div>
          <div className="field">
            <label htmlFor="f-email">{f("email")}</label>
            <input
              id="f-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={f("emailPlaceholder")}
              required
              {...fieldProps("email")}
            />
            {fieldError("email")}
          </div>
        </div>
        <div className="field">
          <label htmlFor="f-type">{f("type")}</label>
          <select
            id="f-type"
            name="type"
            defaultValue={options[0]}
            {...fieldProps("type")}
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {fieldError("type")}
        </div>
        <div className="field">
          <label htmlFor="f-msg">{f("message")}</label>
          <textarea
            id="f-msg"
            name="message"
            placeholder={f("messagePlaceholder")}
            required
            minLength={10}
            {...fieldProps("message")}
          />
          {fieldError("message")}
        </div>
        <div className="form-foot">
          <p className="form-direct">
            {t("direct")} <Email />
          </p>
          <button className="btn btn-primary" type="submit" disabled={sending}>
            {sending ? t("sending") : t("submit")}
            <ArrowIcon />
          </button>
        </div>
        <p
          className={`form-status${
            status === "success"
              ? " is-success"
              : status === "rate" || status === "error"
                ? " is-error"
                : ""
          }`}
          role="status"
          aria-live="polite"
        >
          {status === "success" && t("success")}
          {status === "rate" && t("rateLimited")}
          {status === "error" &&
            t.rich("error", {
              email: EMAIL,
              link: (chunks) => <a href={`mailto:${EMAIL}`}>{chunks}</a>,
            })}
        </p>
      </form>
    </section>
  );
}
