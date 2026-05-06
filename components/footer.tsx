import { BrandLink } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer>
      <div className="foot">
        <div className="foot-brand">
          <BrandLink href="#" />
          <p>
            An independent studio designing and building digital products with
            care, taste and a long view.
          </p>
        </div>
        <div>
          <h4>Studio</h4>
          <ul>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#vision">Vision</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul>
            <li>
              <a href="mailto:hello@kepler-industries.com">
                hello@kepler-industries.com
              </a>
            </li>
            <li>
              <a href="#">Are.na</a>
            </li>
            <li>
              <a href="#">Read.cv</a>
            </li>
            <li>
              <a href="#">Twitter / X</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Signal</h4>
          <ul>
            <li>
              <a href="#">Newsletter — quarterly</a>
            </li>
            <li>
              <a href="#">Field notes</a>
            </li>
            <li>
              <a href="#">Press kit</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 Kepler Industries · All rights reserved</span>
        <span className="coords">48.8566° N · 2.3522° E</span>
        <span>v 1.04 / build 2026·05</span>
      </div>
    </footer>
  );
}
