"use client";

import { useState, FormEvent } from "react";
import { ArrowIcon } from "./brand-mark";

export function Contact() {
  const [status, setStatus] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("· Transmitting signal…");
    const form = e.currentTarget;
    setTimeout(() => {
      setStatus("✶ Signal received. Reply within 48h.");
      form.reset();
    }, 1100);
  };

  return (
    <section className="contact" id="contact" data-screen-label="06 Contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="container contact-inner">
        <div className="eyebrow" style={{ justifyContent: "center" }}>
          <span className="tick" />
          06 / Transmit
        </div>
        <h2 style={{ marginTop: 18 }}>
          Let&apos;s chart something <em>new.</em>
        </h2>
        <p className="sub">
          Tell us about the product you want to build. We reply within two
          working days — no boilerplate.
        </p>

        <form className="contact-form" onSubmit={onSubmit}>
          <div className="form-row">
            <div className="field">
              <label htmlFor="f-name">Name</label>
              <input
                id="f-name"
                name="name"
                type="text"
                placeholder="Ada Lovelace"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="f-email">Email</label>
              <input
                id="f-email"
                name="email"
                type="email"
                placeholder="ada@signal.io"
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-scope">Scope</label>
            <select id="f-scope" name="scope" defaultValue="Web Design">
              <option>Web Design</option>
              <option>App Development</option>
              <option>Product Design</option>
              <option>Full Studio Engagement</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-msg">Mission Brief</label>
            <textarea
              id="f-msg"
              name="message"
              placeholder="A few sentences on what you're building, where it's headed, and when you need it."
            />
          </div>
          <button className="btn btn-primary form-submit" type="submit">
            Transmit
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
