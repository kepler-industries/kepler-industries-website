"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { ArrowIcon } from "./brand-mark";

export function Contact() {
  const t = useTranslations("Contact");
  const f = useTranslations("Contact.fields");
  const options = f.raw("scopeOptions") as string[];
  const [status, setStatus] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(t("transmitting"));
    const form = e.currentTarget;
    setTimeout(() => {
      setStatus(t("received"));
      form.reset();
    }, 1100);
  };

  const em = (chunks: React.ReactNode) => <em>{chunks}</em>;

  return (
    <section className="contact" id="contact" data-screen-label={t("screenLabel")}>
      <div className="contact-glow" aria-hidden="true" />
      <div className="container contact-inner">
        <div className="eyebrow" style={{ justifyContent: "center" }}>
          <span className="tick" />
          {t("eyebrow")}
        </div>
        <h2 style={{ marginTop: 18 }}>
          {t("titleLine1")} {t.rich("titleLine2", { em })}
        </h2>
        <p className="sub">{t("sub")}</p>

        <form className="contact-form" onSubmit={onSubmit}>
          <div className="form-row">
            <div className="field">
              <label htmlFor="f-name">{f("name")}</label>
              <input
                id="f-name"
                name="name"
                type="text"
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
                placeholder={f("emailPlaceholder")}
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-scope">{f("scope")}</label>
            <select id="f-scope" name="scope" defaultValue={options[0]}>
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
            />
          </div>
          <button className="btn btn-primary form-submit" type="submit">
            {t("submit")}
            <ArrowIcon />
          </button>
          <div className="form-status" aria-live="polite">
            {status}
          </div>
        </form>
      </div>
    </section>
  );
}
