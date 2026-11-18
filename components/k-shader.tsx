"use client";

import { useEffect, useRef, useState } from "react";
import { KeplerMark } from "./brand-mark";

/*
 * Le « K pochoir » en 3D, rendu en temps réel par raymarching (WebGL 1, sans
 * dépendance). Les trois pièces du logo sont extrudées, biseautées, puis
 * éclairées comme une laque noire : reflets de studio, liseré irisé
 * violet → cyan et un balayage de lumière qui passe sur les faces.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uRot;

mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c); }
mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c); }

float sdBox2(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

void edge(vec2 p, vec2 a, vec2 b, inout float d, inout float s) {
  vec2 e = b - a;
  vec2 w = p - a;
  vec2 q = w - e * clamp(dot(w, e) / dot(e, e), 0.0, 1.0);
  d = min(d, dot(q, q));
  bvec3 c = bvec3(p.y >= a.y, p.y < b.y, e.x * w.y > e.y * w.x);
  if (all(c) || all(not(c))) s = -s;
}

float sdQuad(vec2 p, vec2 v0, vec2 v1, vec2 v2, vec2 v3) {
  float d = dot(p - v0, p - v0);
  float s = 1.0;
  edge(p, v0, v3, d, s);
  edge(p, v1, v0, d, s);
  edge(p, v2, v1, d, s);
  edge(p, v3, v2, d, s);
  return s * sqrt(d);
}

// Le logo (viewBox 24×24) recentré et mis à l'échelle 0.1
float sdLogo(vec2 q) {
  float a = sdBox2(q - vec2(-0.705, 0.0), vec2(0.18, 0.9));
  float b = sdQuad(q, vec2(-0.295, 0.14), vec2(0.445, 0.9), vec2(0.885, 0.9), vec2(0.145, 0.14));
  float c = sdQuad(q, vec2(-0.115, -0.04), vec2(0.325, -0.04), vec2(0.885, -0.9), vec2(0.445, -0.9));
  return min(a, min(b, c));
}

float map(vec3 p) {
  const float r = 0.045;
  const float h = 0.17;
  float d2 = sdLogo(p.xy) + r;
  vec2 w = vec2(d2, abs(p.z) - h + r);
  return min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - r;
}

vec3 calcNormal(vec3 p) {
  const vec2 k = vec2(1.0, -1.0);
  const float e = 0.0009;
  return normalize(
    k.xyy * map(p + k.xyy * e) +
    k.yyx * map(p + k.yyx * e) +
    k.yxy * map(p + k.yxy * e) +
    k.xxx * map(p + k.xxx * e)
  );
}

// Éclairage de studio : boîte à lumière en haut, clé à gauche, contre-jour
// froid à droite et une bande lumineuse qui balaie l'objet.
vec3 env(vec3 d, float t) {
  vec3 col = vec3(0.002) + vec3(0.03) * smoothstep(0.1, 1.0, d.y);
  // Grand dégradé frontal : les faces avant prennent une lumière douce en haut.
  col += vec3(0.6) * smoothstep(-0.3, 0.9, d.y) * smoothstep(0.2, 1.0, d.z);
  col += vec3(1.0) * smoothstep(0.6, 0.98, d.y) * 1.1;
  col += vec3(1.0) * pow(max(dot(d, normalize(vec3(-0.8, 0.35, 0.6))), 0.0), 48.0) * 4.0;
  col += vec3(0.72, 0.8, 1.0) * pow(max(dot(d, normalize(vec3(0.95, 0.15, -0.25))), 0.0), 18.0) * 1.6;
  float sweep = fract(t * 0.09) * 4.0 - 2.0;
  float band = smoothstep(0.06, 0.0, abs(d.x * 0.8 + d.y * 0.6 - sweep));
  col += vec3(1.0) * band * 1.4 * smoothstep(-0.1, 0.4, d.z);
  return col;
}

vec3 shade(vec3 pObj, vec3 rd, mat3 R) {
  vec3 n = normalize(R * calcNormal(pObj));
  vec3 v = -rd;
  vec3 r = reflect(rd, n);
  float ndv = clamp(dot(n, v), 0.0, 1.0);
  float fres = 0.04 + 0.96 * pow(1.0 - ndv, 5.0);
  vec3 col = vec3(0.003, 0.003, 0.004);
  col += env(r, uTime) * mix(0.1, 1.0, fres);
  vec3 irid = mix(vec3(0.55, 0.45, 1.0), vec3(0.25, 0.82, 1.0), 0.5 + 0.5 * r.y);
  col += irid * pow(1.0 - ndv, 4.0) * 0.16;
  return col;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 ro = vec3(0.0, 0.0, 4.3);
  vec3 rd = normalize(vec3(uv, -1.75));

  mat3 R = rotY(uRot.x) * rotX(uRot.y);
  vec3 o = rotX(-uRot.y) * (rotY(-uRot.x) * ro);
  vec3 d = rotX(-uRot.y) * (rotY(-uRot.x) * rd);

  vec4 outc = vec4(0.0);
  float b = dot(o, d);
  float c = dot(o, o) - 1.35 * 1.35;
  float h = b * b - c;
  if (h > 0.0) {
    h = sqrt(h);
    float t = max(-b - h, 0.0);
    float tEnd = -b + h;
    float dmin = 1e9;
    float tmin = t;
    bool hit = false;
    for (int i = 0; i < 90; i++) {
      float dist = map(o + d * t);
      if (dist < dmin) { dmin = dist; tmin = t; }
      if (dist < 0.0007) { hit = true; break; }
      t += dist * 0.92;
      if (t > tEnd) break;
    }
    float px = 1.3 * tmin / (uRes.y * 1.75);
    float alpha = hit ? 1.0 : 1.0 - smoothstep(0.0, px, dmin);
    if (alpha > 0.002) {
      vec3 col = shade(o + d * (hit ? t : tmin), rd, R);
      col = col / (1.0 + col * 0.7);
      col = pow(col, vec3(0.62));
      outc = vec4(col * alpha, alpha);
    }
  }
  gl_FragColor = outc;
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function KShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      setFailed(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      setFailed(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRot = gl.getUniformLocation(prog, "uRot");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const cap = rect.width < 420 ? 1.5 : 1.75;
      const dpr = Math.min(window.devicePixelRatio || 1, cap);
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    // Rotation : oscillation lente + parallaxe au curseur, entrée en douceur.
    let mx = 0;
    let my = 0;
    let yaw = -1.25;
    let pitch = 0.32;
    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      my = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
    };

    const draw = (time: number) => {
      gl.uniform1f(uTime, time);
      gl.uniform2f(uRot, yaw, pitch);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(4);
    });
    ro.observe(canvas);

    if (reduced) {
      yaw = -0.42;
      pitch = 0.12;
      draw(4);
      return () => ro.disconnect();
    }

    let raf = 0;
    let visible = true;
    let last = performance.now();
    let clock = 0;

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      clock += dt;
      const targetYaw = Math.sin(clock * 0.45) * 0.5 - 0.18 + mx * 0.5;
      const targetPitch = Math.sin(clock * 0.31) * 0.1 + 0.06 + my * 0.28;
      const k = clock < 2.2 ? 1.6 * dt : 3.2 * dt;
      yaw += (targetYaw - yaw) * Math.min(1, k);
      pitch += (targetPitch - pitch) * Math.min(1, k);
      draw(clock);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointer, { passive: true });
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <>
      <span className="k-glow" aria-hidden="true" />
      <span className="k-floor" aria-hidden="true" />
      {failed ? (
        <span className="k-fallback" aria-hidden="true">
          <KeplerMark />
        </span>
      ) : (
        <canvas ref={canvasRef} className="k3d" aria-hidden="true" data-k-target />
      )}
    </>
  );
}
