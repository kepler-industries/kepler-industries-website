export function Vision() {
  return (
    <section className="vision" id="vision" data-screen-label="03 Vision">
      <div className="container">
        <div className="eyebrow">
          <span className="tick" />
          03 / Philosophy
        </div>
        <h2 className="vision-head">
          We design for what&apos;s
          <br />
          <em>not yet here.</em>
        </h2>

        <div className="vision-stage" aria-hidden="true">
          <div className="vision-orbits">
            <div className="orbit o1" />
            <div className="orbit o2" />
            <div className="orbit o3" />
            <div
              className="satellite"
              style={{ left: "50%", top: "calc(50% - 310px)" }}
            />
            <div
              className="satellite"
              style={{
                left: "calc(50% + 380px)",
                top: "50%",
                width: 6,
                height: 6,
              }}
            />
            <div
              className="satellite"
              style={{
                left: "calc(50% - 460px)",
                top: "calc(50% + 100px)",
                width: 5,
                height: 5,
              }}
            />
          </div>
          <div className="planet" />
          <div className="vision-tags">
            <div className="vtag" style={{ left: "12%", top: "24%" }}>
              Trajectory · 042
            </div>
            <div className="vtag right" style={{ right: "14%", top: "32%" }}>
              Heat Signature · Detected
            </div>
            <div className="vtag" style={{ left: "8%", bottom: "22%" }}>
              Lat 48° · Lng 2°
            </div>
            <div
              className="vtag right"
              style={{ right: "10%", bottom: "28%" }}
            >
              Status · Charting
            </div>
          </div>
        </div>

        <div className="vision-pillars">
          <div className="vision-pillar">
            <div className="vp-num">— Principle 01</div>
            <h3 className="vp-title">
              Push <em>further</em>.
            </h3>
            <p className="vp-body">
              Comfort is the enemy of craft. Every project is a chance to
              extend the line — to make something a little more refined, a
              little more daring, than what came before.
            </p>
          </div>
          <div className="vision-pillar">
            <div className="vp-num">— Principle 02</div>
            <h3 className="vp-title">
              Stay <em>precise</em>.
            </h3>
            <p className="vp-body">
              Ambition without precision is noise. We sweat the type, the
              timing, the spacing — because the difference between good and
              unforgettable lives in the details.
            </p>
          </div>
          <div className="vision-pillar">
            <div className="vp-num">— Principle 03</div>
            <h3 className="vp-title">
              Build <em>quietly</em>.
            </h3>
            <p className="vp-body">
              The best work doesn&apos;t announce itself. We design products
              that feel inevitable — calm, considered, and built to last beyond
              the launch cycle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
