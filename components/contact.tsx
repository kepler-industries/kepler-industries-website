"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { ArrowIcon } from "./brand-mark";
import { Tile } from "./icons";
import { SignalWave } from "./signal-wave";

const EMAIL = "hello@kepler-industries.com";

export function Contact() {
  const t = useTranslations("Contact");
  const f = useTranslations("Contact.fields");
  const options = f.raw("typeOptions") as string[];
  const [status, setStatus] = useState("");

  // Pas de back-end d'envoi : on ouvre la messagerie du visiteur avec un
  // message prérempli, adressé au studio.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const type = String(data.get("type") ?? options[0]);
    const message = String(data.get("message") ?? "").trim();

    const subject = t("subject", { type });
    const body = [
      `${f("name")} : ${name}`,
      `${f("email")} : ${email}`,
      `${f("type")} : ${type}`,
      "",
      message,
    ].join("\n");

    setStatus(t("opening"));
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

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

      <form className="card form reveal" onSubmit={onSubmit}>
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
            />
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
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="f-type">{f("type")}</label>
          <select id="f-type" name="type" defaultValue={options[0]}>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-msg">{f("message")}</label>
          <textarea
            id="f-msg"
            name="message"
            placeholder={f("messagePlaceholder")}
            required
          />
        </div>
        <div className="form-foot">
          <p className="form-direct">
            {t("direct")} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
          <button className="btn btn-primary" type="submit">
            {t("submit")}
            <ArrowIcon />
          </button>
        </div>
        <p className="form-status" aria-live="polite">
          {status}
        </p>
      </form>
    </section>
  );
}
