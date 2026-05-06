export function About() {
  return (
    <section className="about" id="about" data-screen-label="02 About">
      <div className="container">
        <div className="section-head">
          <h2>
            A studio born from <em>curiosity.</em>
          </h2>
          <div className="meta">
            <span className="num">— 02 / About</span>
            <p className="desc">
              A personal practice that grew into a serious studio for refined,
              intentional digital craft.
            </p>
          </div>
        </div>

        <div className="about-grid">
          <p className="about-lead reveal">
            Kepler began as one designer&apos;s notebook — a place to chase
            ideas without permission. Today it operates as a{" "}
            <em>focused studio</em>, taking on a small number of projects each
            year and bringing the same obsessive attention to every pixel,
            every prompt, every product.
          </p>
          <div className="about-body reveal">
            <p>
              We work with founders, operators and teams who care about how
              their product feels — not just what it does. The work is small in
              volume, deep in execution, and shaped by taste rather than trend.
            </p>
            <p>
              What started as personal exploration has matured into a studio
              with the discipline of a senior team and the directness of a
              single craftsman. No middlemen, no decks-for-the-sake-of-decks —
              just clear thinking, considered design, and clean execution.
            </p>
          </div>
        </div>

        <div className="about-stats">
          <div className="about-stat">
            <div className="num">
              <em>04</em>
            </div>
            <div className="lbl">Years in orbit</div>
          </div>
          <div className="about-stat">
            <div className="num">42</div>
            <div className="lbl">Products shipped</div>
          </div>
          <div className="about-stat">
            <div className="num">
              <em>11</em>
            </div>
            <div className="lbl">Founders served</div>
          </div>
          <div className="about-stat">
            <div className="num">∞</div>
            <div className="lbl">Iterations remaining</div>
          </div>
        </div>
      </div>
    </section>
  );
}
