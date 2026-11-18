import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import { ArrowIcon } from "./brand-mark";
import { KShader } from "./k-shader";
import { CodeStream } from "./code-stream";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="section hero" id="top">
      <div className="bleed beams" aria-hidden="true">
        <span className="beam b3" />
        <span className="beam b2" />
        <span className="beam b1" />
      </div>
      <div className="bleed" aria-hidden="true">
        <CodeStream />
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <a href="#projects" className="badge intro" style={delay(0)}>
            <span className="dot" aria-hidden="true" />
            <span className="txt">{t("badge")}</span>
            <ArrowIcon />
          </a>
          <h1 className="hero-title">
            <span className="grad intro" style={delay(80)}>
              {t("titleLine1")}
            </span>
            <span className="grad intro" style={delay(180)}>
              {t("titleLine2")}
            </span>
          </h1>
          <p className="hero-lede intro" style={delay(300)}>
            {t("lede")}
          </p>
          <div className="hero-actions intro" style={delay(420)}>
            <a href="#contact" className="btn btn-primary">
              {t("primary")}
              <ArrowIcon />
            </a>
            <a href="#projects" className="btn btn-glass">
              {t("secondary")}
            </a>
          </div>
          <p className="hero-platforms intro" style={delay(540)}>
            {t("platforms")}
          </p>
        </div>

        <div className="hero-visual intro" style={delay(200)}>
          <KShader />
        </div>
      </div>
    </section>
  );
}
