/* Semester 3 Chapter 22 Geometrical Optics: full notes by Cikgu Suhaili (from STPM_2026_Geometrical_Optics_teachers_version.pptx).
   App chapter 22 = STPM 2026 syllabus chapter 23. Sign convention: real-is-positive throughout. */
(function () {
  'use strict';
  const { card, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4, pq } = window.PhysiQLessons.H;
  const inv = x => fr('1', x);

  // ======================================================================
  // A small paraxial ray tracer shared by the static figures and the simulations.
  // Light travels left to right. Elements: lens {x,f}, surface {x,r,n1,n2}, mirror {x,f} (last element only).
  // ======================================================================
  function imageOf(el, u) {
    // returns {v, m} for a single element with object distance u (real-is-positive)
    if (el.type === 'surface') { const rhs = (el.n2 - el.n1) / el.r - el.n1 / u; const v = Math.abs(rhs) < 1e-12 ? Infinity : el.n2 / rhs; return { v, m: -el.n1 * v / (el.n2 * u) }; }
    const d = 1 / el.f - 1 / u, v = Math.abs(d) < 1e-12 ? Infinity : 1 / d; return { v, m: -v / u };
  }
  function trace(els, x0, y0, s0, xmin, xmax) {
    let x = x0, y = y0, s = s0, dir = 1; const pts = [[x, y]];
    for (const el of els) {
      y = y + s * (el.x - x); x = el.x; pts.push([x, y]);
      if (el.type === 'lens') s = s - y / el.f;
      else if (el.type === 'surface') s = (el.n1 * s - (el.n2 - el.n1) * y / el.r) / el.n2;
      else if (el.type === 'mirror') { s = s - y / el.f; dir = -1; }
    }
    const xe = dir > 0 ? xmax : xmin, ye = dir > 0 ? y + s * (xe - x) : y + s * (x - xe);
    pts.push([xe, ye]);
    return { pts, hit: [x, y], s, dir };
  }
  // principal rays from the object tip for a single element
  function principal(el, x0, h) {
    const u = el.x - x0, out = [0];
    const add = den => { if (Math.abs(den) > 0.4) out.push(-h / den); };
    if (el.type === 'lens') { out.push(-h / u); add(u - el.f); }
    else if (el.type === 'mirror') { add(u - el.f); add(u - 2 * el.f); }
    else { add(u + el.r); out.push(-h / u); if (Math.abs(el.r) < 1e8 && Math.abs(el.n2 - el.n1) > 1e-3) add(u - el.n1 * el.r / (el.n2 - el.n1)); }
    return out;
  }
  // full solution: final image position (world x) and magnification
  function solve(els, x0, h) {
    let xo = x0, m = 1, stages = [];
    for (const el of els) {
      const u = el.x - xo, r = imageOf(el, u); m *= r.m;
      const xi = el.type === 'mirror' ? el.x - r.v : el.x + r.v;
      stages.push({ u, v: r.v, m: r.m, xi }); xo = xi;
    }
    const last = stages[stages.length - 1];
    return { stages, xi: last.xi, v: last.v, m, hi: m * h, real: last.v > 0 && isFinite(last.v) };
  }

  // ---------- SVG ray diagram ----------
  const ACOL = ['#C0392B', '#2F6FE0', '#3E8E1E'];
  function elementSVG(el, X, Y, ext) {
    const x = +X(el.x), top = +Y(ext), bot = +Y(-ext);
    if (el.type === 'lens') {
      if (el.f > 0) return `<path d="M${x},${top} Q${x + 9},${(top + bot) / 2} ${x},${bot} Q${x - 9},${(top + bot) / 2} ${x},${top} Z" fill="#DCEBF7" stroke="${C.ink}" stroke-width="1.3"/>`;
      return `<path d="M${x - 7},${top} L${x + 7},${top} Q${x + 1},${(top + bot) / 2} ${x + 7},${bot} L${x - 7},${bot} Q${x - 1},${(top + bot) / 2} ${x - 7},${top} Z" fill="#DCEBF7" stroke="${C.ink}" stroke-width="1.3"/>`;
    }
    if (el.type === 'mirror') { const b = el.f > 0 ? -9 : 9; return `<path d="M${x + b},${top} Q${x - b},${(top + bot) / 2} ${x + b},${bot}" fill="none" stroke="${C.ink}" stroke-width="2.6"/>` + [0, 1, 2, 3, 4, 5, 6].map(i => { const yy = top + (bot - top) * (i + 0.5) / 7; return L(x + 4 + (el.f > 0 ? 0 : 6), yy, x + 10 + (el.f > 0 ? 0 : 6), yy - 6, 's', '', { w: 1 }); }).join(''); }
    const b = el.r > 0 ? 10 : -10; return `<path d="M${x + b},${top} Q${x - b},${(top + bot) / 2} ${x + b},${bot} L${X(1e9) > 0 ? x + 200 : x + 200},${bot} L${x + 200},${top} Z" fill="#E6F1FA" stroke="none"/><path d="M${x + b},${top} Q${x - b},${(top + bot) / 2} ${x + b},${bot}" fill="none" stroke="${C.ink}" stroke-width="1.6"/>`;
  }
  const arrowSVG = (x1, y1, x2, y2, c, dash) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="2.6"${dash ? ' stroke-dasharray="4 3"' : ''}/>` + (() => { const s = y2 < y1 ? 1 : -1; return `<path d="M${x2},${y2} l-5,${7 * s} l10,0 z" fill="${c}"/>`; })();
  function rayFig(o) {
    // o: {els, x0, h, xmin, xmax, ymax, w, hgt, labels:[[x,text]], rays (optional list of slopes)}
    const w = o.w || 360, H = o.hgt || 170, padL = 10, padR = 10, k = (w - padL - padR) / (o.xmax - o.xmin), cy = H / 2 + 4, ky = (H / 2 - 14) / o.ymax;
    const X = x => (padL + (x - o.xmin) * k).toFixed(1), Y = y => (cy - y * ky).toFixed(1);
    const sol = solve(o.els, o.x0, o.h);
    let body = `<defs><clipPath id="§cp"><rect x="0" y="0" width="${w}" height="${H}"/></clipPath></defs>`;
    body += L(X(o.xmin), Y(0), X(o.xmax), Y(0), 's', '', { w: 1 });
    o.els.forEach(el => { body += elementSVG(el, X, Y, o.ymax * 0.85);
      const fp = (xx, lab) => { if (xx > o.xmin && xx < o.xmax) body += `<circle cx="${X(xx)}" cy="${Y(0)}" r="2.6" fill="${C.ink}"/>` + T(X(xx), +Y(0) + 14, lab, { fs: 10.5, c: C.sub }); };
      if (el.type === 'lens') { fp(el.x - el.f, 'F'); fp(el.x + el.f, 'F'); if (o.twoF) { fp(el.x - 2 * el.f, '2F'); fp(el.x + 2 * el.f, '2F'); } }
      if (el.type === 'mirror') { fp(el.x - el.f, 'F'); fp(el.x - 2 * el.f, 'C'); }
      if (el.type === 'surface') fp(el.x + el.r, 'C');
    });
    const slopes = o.rays || (o.els.length === 1 ? principal(o.els[0], o.x0, o.h) : [0, -o.h / (o.els[0].x - o.x0)]);
    let rays = '';
    slopes.forEach((s, i) => { const t = trace(o.els, o.x0, o.h, s, o.xmin, o.xmax); const c = ACOL[i % 3];
      rays += `<polyline points="${t.pts.map(p => X(p[0]) + ',' + Y(p[1])).join(' ')}" fill="none" stroke="${c}" stroke-width="1.5"/>`;
      if (!sol.real && isFinite(sol.xi)) { const [xh, yh] = t.hit, yi = t.dir > 0 ? yh + t.s * (sol.xi - xh) : yh + t.s * (xh - sol.xi); rays += `<line x1="${X(xh)}" y1="${Y(yh)}" x2="${X(sol.xi)}" y2="${Y(yi)}" stroke="${c}" stroke-width="1.2" stroke-dasharray="4 3"/>`; }
    });
    body += `<g clip-path="url(#§cp)">${rays}</g>`;
    body += arrowSVG(X(o.x0), Y(0), X(o.x0), Y(o.h), C.ink) + T(+X(o.x0) - 2, +Y(o.h) - 6, 'O', { fs: 11, b: 1 });
    if (isFinite(sol.xi) && Math.abs(sol.hi) < o.ymax * 1.6 && sol.xi > o.xmin && sol.xi < o.xmax) body += arrowSVG(X(sol.xi), Y(0), X(sol.xi), Y(sol.hi), C.o, !sol.real) + T(+X(sol.xi) + 2, sol.hi > 0 ? +Y(sol.hi) - 6 : +Y(sol.hi) + 14, 'I', { fs: 11, b: 1, c: C.o });
    (o.labels || []).forEach(([x, y, s, opt]) => { body += T(x, y, s, Object.assign({ fs: 11, c: C.sub }, opt || {})); });
    return svg(w, H, body, o.maxw || w + 20);
  }

  // ---------- other figures ----------
  const F = {};
  F.terms = () => { const one = (cv) => { const b = cv ? 1 : -1, x = 150; return `<path d="M${x - 14 * b},20 Q${x + 14 * b},90 ${x - 14 * b},160" fill="none" stroke="${C.ink}" stroke-width="2.6"/>` + L(10, 90, 210, 90, 's', '', { w: 1 }) +
      (cv ? dot(30, 90, 3, C.ink) + T(30, 106, 'C', { fs: 12, b: 1 }) + dot(90, 90, 3, C.ink) + T(90, 106, 'F', { fs: 12, b: 1 }) + T(156, 106, 'P', { fs: 12, b: 1, a: 'start' }) + L(90, 130, 150, 130, 'k', 'b', { w: 1 }) + T(120, 144, 'f', { it: 1, fs: 12 }) + L(30, 160, 150, 160, 'k', 'b', { w: 1 }) + T(90, 174, 'r', { it: 1, fs: 12 }) + T(110, 14, 'concave mirror', { fs: 12, b: 1 })
        : dot(210, 90, 3, C.ink) + T(210, 106, 'F', { fs: 12, b: 1 }) + T(144, 106, 'P', { fs: 12, b: 1, a: 'end' }) + L(150, 130, 210, 130, 'k', 'b', { w: 1 }) + T(180, 144, 'f', { it: 1, fs: 12 }) + T(110, 14, 'convex mirror', { fs: 12, b: 1 }) + T(212, 76, 'C →', { fs: 11, a: 'end', c: C.sub })) + T(166, 26, 'A', { fs: 11 }) + T(166, 164, 'B', { fs: 11 }); };
    return two(svg(230, 182, one(true), 230), svg(230, 182, one(false), 230)); };
  F.fr2 = () => svg(360, 190, `<path d="M300,20 Q330,100 300,180" fill="none" stroke="${C.ink}" stroke-width="2.6"/>` + L(20, 100, 340, 100, 's', '', { w: 1 }) + L(20, 52, 314, 52, 'r', 'e', { w: 1.8 }) + L(314, 52, 168, 100, 'r', 'e', { w: 1.8 }) + L(60, 100, 314, 52, 's', '', { d: '5 4', w: 1.2 }) +
    dot(60, 100, 3, C.ink) + T(60, 118, 'C', { b: 1 }) + dot(168, 100, 3, C.ink) + T(168, 118, 'F', { b: 1 }) + T(326, 118, 'P', { b: 1 }) + T(318, 46, 'M', { b: 1, a: 'start' }) + T(20, 44, 'A', { b: 1 }) +
    P('M90,100 A30,30 0 0,0 89,94', 'o', { w: 1.4 }) + T(98, 94, 'θ', { it: 1, c: C.o, fs: 12 }) + T(290, 64, 'θ', { it: 1, c: C.o, fs: 12 }) + T(270, 48, 'θ', { it: 1, c: C.o, fs: 12 }) + T(190, 160, 'CM = r (normal at M); triangle FCM is isosceles', { fs: 11, c: C.sub }) + T(190, 176, 'paraxial ray: FM ≈ FP ⇒ f = r/2', { fs: 11, c: C.r, b: 1 }), 380);
  F.snell = () => svg(340, 200, `<rect x="20" y="100" width="300" height="90" fill="#E6F1FA"/>` + L(20, 100, 320, 100, 'k', '', { w: 1.4 }) + L(170, 14, 170, 190, 's', '', { d: '4 3', w: 1 }) + L(90, 24, 170, 100, 'r', 'e', { w: 2 }) + L(170, 100, 218, 186, 'r', 'e', { w: 2 }) + L(170, 100, 250, 24, 'v', 'e', { w: 1.4, d: '5 3' }) +
    T(150, 52, 'θ₁', { it: 1 }) + T(184, 150, 'θ₂', { it: 1 }) + T(30, 92, 'medium 1, n₁', { a: 'start', fs: 12 }) + T(30, 182, 'medium 2, n₂ > n₁', { a: 'start', fs: 12 }) + T(250, 46, 'reflected', { fs: 11, c: C.v }) + T(226, 172, 'refracted', { fs: 11, c: C.r, a: 'start' }), 360);
  F.surfGeom = () => svg(380, 190, `<path d="M190,30 Q170,100 190,170 L370,170 L370,30 Z" fill="#E6F1FA"/>` + `<path d="M190,30 Q170,100 190,170" fill="none" stroke="${C.ink}" stroke-width="1.8"/>` + L(10, 100, 370, 100, 's', '', { w: 1 }) +
    L(40, 100, 182, 70, 'r', '', { w: 1.8 }) + L(182, 70, 320, 100, 'r', 'e', { w: 1.8 }) + L(182, 70, 250, 100, 's', '', { d: '4 3', w: 1 }) + dot(40, 100, 3, C.ink) + T(40, 118, 'O', { b: 1 }) + dot(320, 100, 3, C.o) + T(320, 118, 'I', { b: 1, c: C.o }) + dot(250, 100, 3, C.ink) + T(250, 118, 'C', { b: 1 }) + T(176, 118, 'V', { b: 1 }) +
    L(40, 140, 176, 140, 'k', 'b', { w: 1 }) + T(108, 154, 'u', { it: 1 }) + L(176, 160, 320, 160, 'k', 'b', { w: 1 }) + T(248, 174, 'v', { it: 1 }) + L(176, 24, 250, 24, 'k', 'b', { w: 1 }) + T(213, 18, 'r', { it: 1 }) + T(80, 50, 'n₁', { it: 1, fs: 14 }) + T(300, 50, 'n₂', { it: 1, fs: 14 }), 400);
  F.lenses = () => { const cx = (x, t) => `<path d="M${x},20 Q${x + 18},80 ${x},140 Q${x - 18},80 ${x},20 Z" fill="#DCEBF7" stroke="${C.ink}"/>` + T(x, 160, t, { fs: 11 }); const cc = (x, t) => `<path d="M${x - 14},20 L${x + 14},20 Q${x + 2},80 ${x + 14},140 L${x - 14},140 Q${x - 2},80 ${x - 14},20 Z" fill="#DCEBF7" stroke="${C.ink}"/>` + T(x, 160, t, { fs: 11 });
    return svg(400, 176, cx(45, 'double convex') + `<path d="M130,20 Q150,80 130,140 Z" fill="#DCEBF7" stroke="${C.ink}"/>` + T(136, 160, 'plano-convex', { fs: 11 }) + cc(250, 'double concave') + `<path d="M330,20 L348,20 Q336,80 348,140 L330,140 Z" fill="#DCEBF7" stroke="${C.ink}"/>` + T(340, 160, 'plano-concave', { fs: 11 }) + T(90, 12, 'converging: thicker at the centre', { fs: 11, b: 1, c: C.g }) + T(295, 12, 'diverging: thinner at the centre', { fs: 11, b: 1, c: C.r }), 420); };
  F.lensSign = () => svg(380, 150, `<path d="M190,20 Q230,75 190,130 Q150,75 190,20 Z" fill="#DCEBF7" stroke="${C.ink}" stroke-width="1.4"/>` + L(20, 75, 360, 75, 's', '', { w: 1 }) + dot(300, 75, 3, C.ink) + T(300, 92, 'C₁', { b: 1, fs: 12 }) + dot(80, 75, 3, C.ink) + T(80, 92, 'C₂', { b: 1, fs: 12 }) +
    T(300, 112, 'centre on the outgoing side', { fs: 10.5, c: C.g }) + T(300, 126, 'r₁ positive', { fs: 11, b: 1, c: C.g }) + T(80, 112, 'centre on the incoming side', { fs: 10.5, c: C.r }) + T(80, 126, 'r₂ negative', { fs: 11, b: 1, c: C.r }) + L(30, 30, 110, 30, 'o', 'e', { w: 1.6 }) + T(70, 22, 'light', { fs: 11, c: C.o }) + T(170, 16, 'surface 1', { fs: 10, a: 'end' }) + T(212, 16, 'surface 2', { fs: 10, a: 'start' }), 400);

  F.q14 = () => svg(440, 140, L(10, 70, 370, 70, 's', '', { w: 1 }) + L(60, 70, 60, 40, 'k', 'e', { w: 2 }) + T(60, 90, 'object', { fs: 11 }) +
    `<path d="M150,20 Q172,70 150,120 Q128,70 150,20 Z" fill="#DCEBF7" stroke="${C.ink}" stroke-width="1.4"/>` + T(150, 136, 'bi-convex, f = 12.0 cm', { fs: 10.5 }) +
    `<path d="M300,20 Q262,70 300,120 Q284,70 300,20 Z" fill="#DCEBF7" stroke="${C.ink}" stroke-width="1.4"/>` + T(300, 136, 'meniscus', { fs: 10.5 }) +
    L(60, 106, 150, 106, 'k', 'b', { w: 1 }) + T(105, 102, '25.0 cm', { fs: 10.5 }) + L(150, 14, 300, 14, 'k', 'b', { w: 1 }) + T(225, 10, '50.0 cm', { fs: 10.5 }) + T(330, 44, 'r₁ = 15 cm (left face)', { fs: 10, a: 'start' }) + T(330, 58, 'r₂ = 20 cm (right face)', { fs: 10, a: 'start' }), 450);
  // configurations for the ray-diagram figures
  const mir = (f, u, h, extra) => rayFig(Object.assign({ els: [{ type: 'mirror', x: 0, f }], x0: -u, h, xmin: -70, xmax: 30, ymax: 10, w: 360, hgt: 160 }, extra || {}));
  const lens = (f, u, h, extra) => rayFig(Object.assign({ els: [{ type: 'lens', x: 0, f }], x0: -u, h, xmin: -60, xmax: 60, ymax: 10, w: 360, hgt: 160, twoF: true }, extra || {}));

  const S = `
${sec('22-0', 'Geometrical optics: introduction', `
<p><b>Geometrical optics</b> studies light on the assumption that it travels in straight lines called <b>rays</b>. A collection of rays is a <b>beam</b>. Two laws describe how light changes direction at a surface: the law of reflection and the law of refraction.</p>
${table(['Real image', 'Virtual image'], [['formed by light rays that actually pass through it', 'the rays only appear to come from it; no light passes through it'], ['can be formed on a screen', 'cannot be formed on a screen'], ['drawn with solid lines', 'drawn with dashed lines']])}
${def('Law of reflection', `${red('the angle of reflection equals the angle of incidence')}, and the incident ray, the reflected ray and the normal lie in the same plane. (Angles are measured from the normal, not from the surface.)`)}
<p>A <b>plane mirror</b> forms an image that is virtual, upright, the same size (<i>m</i> = +1), as far behind the mirror as the object is in front (<i>v</i> = <i>u</i>), and laterally inverted. This is why “AMBULANCE” is written back to front on the front of an ambulance: it reads correctly in a driver’s mirror.</p>
`)}

${sec('22-1', '22.1 Spherical mirrors', `
<p>A spherical mirror is a reflecting surface that is part of a sphere. It is <b>concave</b> if the reflection is on the inner surface and <b>convex</b> if it is on the outer surface.</p>
${fig(F.terms(), 'Figure 22.1: C = centre of curvature, P = pole (vertex), F = focal point, CP = principal axis, AB = aperture, f = focal length (FP), r = radius of curvature (CP).')}
${two(def('Focal point of a concave mirror', `the point on the principal axis ${red('through which rays parallel and close to the principal axis pass after reflection')}.`), def('Focal point of a convex mirror', `the point on the principal axis ${red('from which rays parallel and close to the principal axis appear to diverge after reflection')}.`))}
${note(`This is true only for <b>paraxial rays</b> (rays close to the principal axis). Wide rays are focused nearer the mirror (spherical aberration).`)}
${h4('Relation between f and r')}
${fig(F.fr2(), 'Figure 22.2: a paraxial ray AM, parallel to the axis, reflects through F.')}
${steps([`CM is the normal at M, so the angle of incidence = angle of reflection = θ.`, `AM ∥ CP, so ∠MCF = θ (alternate angles). Triangle FCM has two equal angles, so it is isosceles: FC = FM.`, `For a paraxial ray, M is very close to P, so FM ≈ FP. Then FC = FP, i.e. F is the midpoint of CP.`])}
${key(`<i>f</i> = ${fr('<i>r</i>', '2')}`)}
${h4('Ray diagrams')}
${ul([`<b>Ray 1</b>: a ray parallel to the principal axis is reflected through F (concave), or as if it came from F (convex).`, `<b>Ray 2</b>: a ray through F (or heading towards F, convex) is reflected parallel to the axis.`, `<b>Ray 3</b>: a ray through C (or heading towards C, convex) is reflected back along the same path.`, `Any two rays from the top of the object locate the top of the image.`])}
${table(['Object position (concave mirror)', 'Image position', 'Nature'], [['at infinity', 'at F', 'real, inverted, diminished (a point)'], ['beyond C', 'between C and F', 'real, inverted, diminished'], ['at C', 'at C', 'real, inverted, same size'], ['between C and F', 'beyond C', 'real, inverted, magnified'], ['at F', 'at infinity', '—'], ['between F and P', 'behind the mirror', 'virtual, upright, magnified']])}
${two(fig(mir(15, 45, 6), 'Concave mirror, object beyond C.'), fig(mir(15, 9, 3.5, { xmin: -40, xmax: 40 }), 'Concave mirror, object between F and P: virtual, upright, magnified.'))}
${fig(mir(-15, 30, 6, { xmin: -45, xmax: 35 }), 'Convex mirror: the image is always virtual, upright and diminished, between P and F behind the mirror.')}
${h4('The mirror equation')}
<p>Using similar triangles in the ray diagram (object distance OP = <i>u</i>, image distance IP = <i>v</i>, CP = <i>r</i>):</p>
${steps([`Ray to P: ${fr('<i>h</i>', '<i>u</i>')} = ${fr('<i>h</i>′', '<i>v</i>')} ⇒ ${fr('<i>h</i>′', '<i>h</i>')} = ${fr('<i>v</i>', '<i>u</i>')} &nbsp; … (1)`, `Ray through C: ${fr('<i>h</i>', '<i>u</i> − <i>r</i>')} = ${fr('<i>h</i>′', '<i>r</i> − <i>v</i>')} ⇒ ${fr('<i>h</i>′', '<i>h</i>')} = ${fr('<i>r</i> − <i>v</i>', '<i>u</i> − <i>r</i>')} &nbsp; … (2)`, `(1) = (2): <i>v</i>(<i>u</i> − <i>r</i>) = <i>u</i>(<i>r</i> − <i>v</i>) ⇒ 2<i>uv</i> = <i>r</i>(<i>u</i> + <i>v</i>) ⇒ ${fr('2', '<i>r</i>')} = ${inv('<i>u</i>')} + ${inv('<i>v</i>')}`])}
${key(`${inv('<i>u</i>')} + ${inv('<i>v</i>')} = ${inv('<i>f</i>')} = ${fr('2', '<i>r</i>')} &nbsp;&nbsp;&nbsp; <i>m</i> = ${fr('<i>h</i>′', '<i>h</i>')} = −${fr('<i>v</i>', '<i>u</i>')}`, '<i>m</i> = linear magnification')}
${table(['Quantity', 'Positive (+)', 'Negative (−)'], [['object distance <i>u</i>', 'real object', 'virtual object'], ['image distance <i>v</i>', 'real image (in front of the mirror)', 'virtual image (behind the mirror)'], ['focal length <i>f</i>, radius <i>r</i>', 'concave mirror', 'convex mirror'], ['magnification <i>m</i>', 'upright image', 'inverted image']])}
${tip(`Write the sign of <i>f</i> first (concave +, convex −), solve for <i>v</i>, then describe the image from the signs: <i>v</i> > 0 real, <i>v</i> < 0 virtual; <i>m</i> > 0 upright, <i>m</i> < 0 inverted; |<i>m</i>| > 1 magnified.`)}
${sim('mirror', 'Ray diagram for a spherical mirror', 'Choose a concave or convex mirror and drag the object along the axis. The three principal rays are drawn and the image appears where they meet. Watch the image change from real and inverted to virtual and upright as the object passes F.')}
${example('22.1.1', `An object 6 cm high is 30 cm in front of a convex mirror of radius 40 cm. Find the position and height of its image.`,
  steps([`Convex: <i>r</i> = −40 cm; ${fr('2', '<i>r</i>')} = ${inv('<i>u</i>')} + ${inv('<i>v</i>')} ⇒ ${fr('2', '−40')} = ${inv('30')} + ${inv('<i>v</i>')} ⇒ <i>v</i> = <b>−12 cm</b> (virtual, 12 cm behind the mirror)`, `<i>m</i> = −<i>v</i>/<i>u</i> = 12/30 = 0.40 ⇒ <i>h</i>′ = 0.40 × 6 = <b>2.4 cm</b> (upright)`]))}
${example('22.1.2', `An object is 15 cm from (a) a concave mirror, (b) a convex mirror, each of radius of curvature 20 cm. Find the image position and magnification in each case.`,
  steps([`(a) <i>f</i> = +10 cm: ${inv('<i>v</i>')} = ${inv('10')} − ${inv('15')} ⇒ <i>v</i> = <b>+30 cm</b> (real, 30 cm in front); <i>m</i> = −30/15 = <b>−2</b> (inverted, twice as high)`, `(b) <i>f</i> = −10 cm: ${inv('<i>v</i>')} = ${inv('−10')} − ${inv('15')} ⇒ <i>v</i> = <b>−6.0 cm</b> (virtual, 6.0 cm behind); <i>m</i> = 6/15 = <b>+0.40</b> (upright, two-fifths as high)`]))}
${example('22.1.3', `What is the focal length of a convex mirror that forms an image one-sixth the size of an object 12 cm from the mirror?`,
  steps([`Convex mirror: image virtual and upright, <i>m</i> = +1/6 ⇒ <i>v</i> = −<i>u</i>/6 = −2 cm`, `${inv('<i>f</i>')} = ${inv('12')} + ${inv('−2')} ⇒ <i>f</i> = <b>−2.4 cm</b>`]))}
${example('22.1.4', `An object 20 cm from a concave mirror forms a real image three times its size. (a) Find the focal length. (b) Where must the object be placed to give a virtual image three times its size?`,
  steps([`(a) real ⇒ inverted, <i>m</i> = −3 ⇒ <i>v</i> = 3<i>u</i> = 60 cm; ${inv('<i>f</i>')} = ${inv('20')} + ${inv('60')} ⇒ <i>f</i> = <b>+15 cm</b>`, `(b) virtual ⇒ upright, <i>m</i> = +3 ⇒ <i>v</i> = −3<i>u</i>; ${inv('<i>u</i>')} − ${fr('1', '3<i>u</i>')} = ${inv('15')} ⇒ <i>u</i> = <b>10 cm</b>`]))}
${example('22.1.5', `An object 2.0 cm high is 30 cm from a concave mirror of radius of curvature 10 cm. Find the position and the characteristics of the image.`,
  steps([`<i>f</i> = <i>r</i>/2 = +5 cm; ${inv('<i>v</i>')} = ${inv('5')} − ${inv('30')} ⇒ <i>v</i> = <b>+6.0 cm</b>`, `<i>m</i> = −6/30 = −0.20, <i>h</i>′ = −0.40 cm`, `The image is <b>real</b>, <b>inverted</b>, <b>diminished</b> (0.4 cm high), 6.0 cm in front of the mirror.`]), fig(mir(5, 30, 4, { xmin: -36, xmax: 10, ymax: 6 })))}
${exercises('Exercises: spherical mirrors', [
  { q: `A concave mirror has a focal length of 10 cm. Find the two positions where an object can be placed to give an image twice the height of the object.`, a: `15 cm (real, inverted image) and 5.0 cm (virtual, upright image)` },
  { q: `A convex mirror of radius of curvature 40 cm forms an image half the height of the object. Find the object and image positions.`, a: `<i>u</i> = 20 cm; image 10 cm behind the mirror (<i>v</i> = −10 cm)` },
  { q: `An object is 5.0 cm in front of a concave mirror of focal length 10.0 cm. Find the location of the image and its characteristics.`, a: `<i>v</i> = −10 cm (10 cm behind the mirror); <i>m</i> = +2: virtual, upright, twice the height` },
  { q: `What kind of spherical mirror, and what radius, gives an upright image one-fifth as large as an object placed 15 cm in front of it?`, a: `<i>m</i> = +1/5 ⇒ <i>v</i> = −3.0 cm, <i>f</i> = −3.75 cm: a convex mirror of radius 7.5 cm (<i>r</i> = −7.5 cm)` },
  { q: `A concave mirror forms an image, on a wall 3.0 m from the mirror, of a lamp filament 10 cm in front of the mirror. (a) What is the radius of curvature? (b) How high is the image if the filament is 5 mm high?`, a: `(a) <i>f</i> = 9.68 cm, <i>r</i> = 19.4 cm &nbsp; (b) <i>m</i> = −30, image 15 cm high (inverted)` },
  { q: `What are the nature, size and location of the image of a 6 cm tall object 15 cm from a concave mirror of focal length 20 cm?`, a: `<i>v</i> = −60 cm (behind the mirror), <i>m</i> = +4: virtual, upright, 24 cm high` },
  { q: `The magnification of a mirror is −0.333. Its image is formed on a card 540 mm from the mirror. Where is the object, and what is the focal length?`, a: `<i>u</i> = 1.62 m; <i>f</i> = +405 mm (concave)` }])}
`)}

${sec('22-2', '22.2 Refraction at spherical surfaces', `
${h4('Refraction at a plane surface (revision)')}
${fig(F.snell(), 'Figure 22.3: light going into a denser medium bends towards the normal.')}
${ul([`The incident ray, the refracted ray and the normal lie in the same plane.`, `<b>Snell’s law</b>: ${fr('sin θ<sub>1</sub>', 'sin θ<sub>2</sub>')} = ${fr('<i>v</i><sub>1</sub>', '<i>v</i><sub>2</sub>')} = constant.`, `<b>Refractive index</b>: <i>n</i> = ${fr('<i>c</i>', '<i>v</i>')} (speed in a vacuum / speed in the medium); <i>n</i> ≥ 1, no unit.`, `The frequency does not change across the boundary, but the speed and the wavelength do: <i>n</i><sub>1</sub>λ<sub>1</sub> = <i>n</i><sub>2</sub>λ<sub>2</sub>, and λ<sub><i>n</i></sub> = λ<sub>0</sub>/<i>n</i>.`])}
${key(`<i>n</i><sub>1</sub> sin θ<sub>1</sub> = <i>n</i><sub>2</sub> sin θ<sub>2</sub>`)}
${example('22.2.1', `Light of wavelength 500 nm in air strikes a slab of transparent material at 40.0° to the normal. The refracted beam makes 26.0° with the normal. Find the refractive index and the wavelength in the material.`,
  steps([`<i>n</i><sub>2</sub> = ${fr('(1) sin 40.0°', 'sin 26.0°')} = <b>1.47</b>`, `λ<sub>2</sub> = ${fr('<i>n</i><sub>1</sub>λ<sub>1</sub>', '<i>n</i><sub>2</sub>')} = ${fr('500', '1.47')} = <b>340 nm</b>`]))}
${example('22.2.2', `Light travelling in air strikes crown glass (<i>n</i> = 1.52) at 30.0° to the normal. Find the angle of refraction.`,
  steps([`sin θ<sub>2</sub> = ${fr('sin 30.0°', '1.52')} = 0.329 ⇒ θ<sub>2</sub> = <b>19.2°</b>`]))}
${example('22.2.3', `A layer of oil (<i>n</i> = 1.45) floats on water (<i>n</i> = 1.33). Light strikes the oil at 40.0° to the normal. Find the angle the ray makes with the normal in the water.`,
  steps([`<i>n</i><sub>air</sub> sin 40.0° = <i>n</i><sub>oil</sub> sin θ<sub>oil</sub> = <i>n</i><sub>water</sub> sin θ<sub>water</sub> (parallel boundaries)`, `sin θ<sub>water</sub> = sin 40.0°/1.33 ⇒ θ<sub>water</sub> = <b>28.9°</b> (the oil does not affect the final angle)`]))}
${h4('Refraction at a spherical surface')}
${fig(F.surfGeom(), 'Figure 22.4: a point object O in medium n₁ forms an image I in medium n₂ by refraction at a spherical surface with centre C.')}
${key(`${fr('<i>n</i><sub>1</sub>', '<i>u</i>')} + ${fr('<i>n</i><sub>2</sub>', '<i>v</i>')} = ${fr('<i>n</i><sub>2</sub> − <i>n</i><sub>1</sub>', '<i>r</i>')} &nbsp;&nbsp;&nbsp; <i>m</i> = ${fr('<i>h</i>′', '<i>h</i>')} = −${fr('<i>n</i><sub>1</sub><i>v</i>', '<i>n</i><sub>2</sub><i>u</i>')}`, '<i>n</i><sub>1</sub> = medium the light comes from; <i>n</i><sub>2</sub> = medium the light goes into. (The derivation is not required.)')}
${table(['Quantity', 'Positive (+)', 'Negative (−)'], [['<i>u</i>', 'real object (in front of the surface)', 'virtual object (behind the surface)'], ['<i>v</i>', 'real image (behind the surface, in medium 2)', 'virtual image (in front of the surface, in medium 1)'], ['<i>r</i>', 'centre of curvature behind the surface (surface convex to the incoming light)', 'centre of curvature in front of the surface (surface concave to the incoming light)'], ['flat surface', '<i>r</i> → ∞, so the right-hand side is 0', '']])}
${note(`Some books use |<i>n</i><sub>2</sub> − <i>n</i><sub>1</sub>|/<i>r</i> with <i>r</i> positive when the centre of curvature is in the denser medium. Both forms are accepted in STPM. State the convention you use and never mix the two rules.`)}
${sim('surface', 'Refraction at a spherical surface', 'Change the refractive indices, the radius of the surface and the object distance. The ray towards the centre of curvature crosses the surface without bending; the parallel ray is refracted. Try a fish in water seen from the air (flat surface).')}
${example('22.2.4', `A glass rod (<i>n</i> = 1.50) has one end ground to a hemispherical surface of radius 20 mm. A point object is on the axis, 80 mm to the left of the vertex, in air. Find (a) the image distance, (b) the magnification.`,
  steps([`<i>n</i><sub>1</sub> = 1, <i>n</i><sub>2</sub> = 1.50, <i>r</i> = +20 mm (centre inside the glass), <i>u</i> = +80 mm`, `(a) ${fr('1', '80')} + ${fr('1.50', '<i>v</i>')} = ${fr('1.50 − 1', '20')} ⇒ <i>v</i> = <b>+120 mm</b> (real, inside the rod)`, `(b) <i>m</i> = −${fr('(1)(120)', '(1.50)(80)')} = <b>−1.0</b>: same size, inverted`]))}
${example('22.2.5', `The rod in Example 22.2.4 is placed in water (<i>n</i> = 1.33). Find the image distance and the magnification.`,
  steps([`${fr('1.33', '80')} + ${fr('1.50', '<i>v</i>')} = ${fr('1.50 − 1.33', '20')} = 0.0085 ⇒ <i>v</i> = <b>−185 mm</b> (virtual, 185 mm in front of the vertex, in the water)`, `<i>m</i> = −${fr('(1.33)(−185)', '(1.50)(80)')} = <b>+2.05</b>: upright, magnified`]))}
${example('22.2.6', `A coin is embedded in a spherical plastic paperweight of radius 3.0 cm (<i>n</i> = 1.50). The coin is 2.0 cm from the surface nearest the viewer. Find the position of its image.`,
  steps([`Light goes from plastic to air: <i>n</i><sub>1</sub> = 1.50, <i>n</i><sub>2</sub> = 1.00, <i>u</i> = 2.0 cm. The centre of curvature is on the coin’s side (in front of the surface), so <i>r</i> = −3.0 cm.`, `${fr('1.50', '2.0')} + ${fr('1.00', '<i>v</i>')} = ${fr('1.00 − 1.50', '−3.0')} = 0.1667 ⇒ <i>v</i> = <b>−1.7 cm</b>`, `Virtual image 1.7 cm inside the plastic: the coin looks nearer the surface than it is.`]))}
${example('22.2.7', `A fish is 8.0 cm below the flat surface of water (<i>n</i> = 1.33). Find the apparent depth of the fish seen from directly above, and the magnification.`,
  steps([`Flat surface: <i>r</i> → ∞, so ${fr('1.33', '8.0')} + ${fr('1.00', '<i>v</i>')} = 0 ⇒ <i>v</i> = <b>−6.0 cm</b> (virtual; apparent depth 6.0 cm)`, `<i>m</i> = −${fr('(1.33)(−6.0)', '(1.00)(8.0)')} = <b>+1.0</b>: upright, same size`, `In general, apparent depth = real depth/<i>n</i>.`]))}
${card('STPM 2015 (repeat) · Paper 3', `An object 5.0 mm high is 35.0 cm from the vertex of the spherical surface of a glass rod (<i>n</i> = 1.5). The image forms inside the rod, 50.0 cm from the vertex. (i) State the characteristics of the image. (ii) Find the radius of curvature. (iii) Where must the object be placed to give a virtual image 10.0 cm from the vertex?`,
  steps([`(i) <i>m</i> = −${fr('<i>n</i><sub>1</sub><i>v</i>', '<i>n</i><sub>2</sub><i>u</i>')} = −${fr('50.0', '1.5 × 35.0')} = −0.952: <b>real, inverted</b>, almost the same size (<i>h</i>′ ≈ 4.8 mm)`, `(ii) ${fr('1', '35.0')} + ${fr('1.5', '50.0')} = ${fr('0.5', '<i>r</i>')} ⇒ 0.05857 = 0.5/<i>r</i> ⇒ <i>r</i> = <b>+8.54 cm</b>`, `(iii) <i>v</i> = −10.0 cm: ${inv('<i>u</i>')} − ${fr('1.5', '10.0')} = ${fr('0.5', '8.54')} ⇒ ${inv('<i>u</i>')} = 0.2086 ⇒ <i>u</i> = <b>4.80 cm</b>`]))}
${exercises('Exercise: refraction at spherical surfaces', [
  { q: `A point object is 25.0 cm from the centre of a glass sphere of radius 5.0 cm (<i>n</i> = 1.50). Find the position of the image formed by (a) the first surface, (b) the second surface.`, a: `(a) <i>u</i><sub>1</sub> = 20.0 cm, <i>r</i> = +5.0 cm: ${fr('1', '20.0')} + ${fr('1.50', '<i>v</i><sub>1</sub>')} = ${fr('0.50', '5.0')} ⇒ <i>v</i><sub>1</sub> = +30.0 cm (20.0 cm beyond the sphere) &nbsp; (b) this is a virtual object for the back surface, <i>u</i><sub>2</sub> = 10.0 − 30.0 = −20.0 cm, <i>r</i> = −5.0 cm: ${fr('1.50', '−20.0')} + ${fr('1', '<i>v</i><sub>2</sub>')} = ${fr('1 − 1.50', '−5.0')} ⇒ <i>v</i><sub>2</sub> = <b>+5.71 cm</b>: a real image 5.71 cm from the back surface` }])}
`)}

${sec('22-3', '22.3 Thin lenses', `
<p>A lens is a transparent object with two refracting surfaces whose principal axes coincide. A <b>thin lens</b> is one whose thickness is small compared with its focal length.</p>
${fig(F.lenses(), 'Figure 22.5: converging (convex) lenses make parallel rays converge; diverging (concave) lenses make them diverge.')}
${ul([`<b>Principal axis</b>: the line through the centre of the lens, perpendicular to both surfaces.`, `<b>Focal point F</b>: the point where parallel paraxial rays meet after a converging lens, or from which they appear to diverge after a diverging lens. A lens has a focal point on each side.`, `<b>Focal length <i>f</i></b>: the distance between the focal point and the centre of the lens.`])}
${h4('Ray diagrams for lenses')}
${ul([`<b>Ray 1</b>: a ray parallel to the axis passes through F on the other side (converging), or appears to come from F on the same side (diverging).`, `<b>Ray 2</b>: a ray through F (or heading towards F on the far side, diverging) leaves parallel to the axis.`, `<b>Ray 3</b>: a ray through the centre of the lens goes straight on.`])}
${table(['Object position (converging lens)', 'Image', 'Everyday use'], [['beyond 2F', 'between F and 2F; real, inverted, diminished', 'camera, phone camera, the eye'], ['at 2F', 'at 2F; real, inverted, same size', 'photocopier at 1 : 1'], ['between F and 2F', 'beyond 2F; real, inverted, magnified', 'projector, enlarger'], ['at F', 'at infinity', 'spotlight, searchlight'], ['between F and the lens', 'on the same side; virtual, upright, magnified', 'magnifying glass']])}
${two(fig(lens(15, 40, 6), 'Converging lens, object beyond 2F.'), fig(lens(15, 8, 3, { xmin: -40, xmax: 40 }), 'Converging lens, object inside F: magnifying glass.'))}
${fig(lens(-15, 30, 6, { xmin: -45, xmax: 30, twoF: false }), 'Diverging lens: the image is always virtual, upright and diminished, between the lens and F (door viewer, spectacles for short sight).')}
${h4('Thin lens formula and lensmaker’s equation')}
<p>Apply ${fr('<i>n</i><sub>1</sub>', '<i>u</i>')} + ${fr('<i>n</i><sub>2</sub>', '<i>v</i>')} = ${fr('<i>n</i><sub>2</sub> − <i>n</i><sub>1</sub>', '<i>r</i>')} to each surface of a thin lens of refractive index <i>n</i><sub>l</sub> in a medium of index <i>n</i><sub>m</sub>.</p>
${steps([`Surface 1 (medium → lens): ${fr('<i>n</i><sub>m</sub>', '<i>u</i>')} + ${fr('<i>n</i><sub>l</sub>', '<i>v</i><sub>1</sub>')} = ${fr('<i>n</i><sub>l</sub> − <i>n</i><sub>m</sub>', '<i>r</i><sub>1</sub>')} &nbsp; … (1)`, `The image of surface 1 is the object for surface 2. For a thin lens it is a distance <i>v</i><sub>1</sub> beyond surface 2, i.e. a virtual object: <i>u</i><sub>2</sub> = −<i>v</i><sub>1</sub>.`, `Surface 2 (lens → medium): ${fr('<i>n</i><sub>l</sub>', '−<i>v</i><sub>1</sub>')} + ${fr('<i>n</i><sub>m</sub>', '<i>v</i>')} = ${fr('<i>n</i><sub>m</sub> − <i>n</i><sub>l</sub>', '<i>r</i><sub>2</sub>')} &nbsp; … (2)`, `(1) + (2): <i>n</i><sub>m</sub>(${inv('<i>u</i>')} + ${inv('<i>v</i>')}) = (<i>n</i><sub>l</sub> − <i>n</i><sub>m</sub>)(${inv('<i>r</i><sub>1</sub>')} − ${inv('<i>r</i><sub>2</sub>')})`, `For an object at infinity, <i>v</i> = <i>f</i>. So the right-hand side divided by <i>n</i><sub>m</sub> is 1/<i>f</i>, giving both results:`])}
${key(`${inv('<i>u</i>')} + ${inv('<i>v</i>')} = ${inv('<i>f</i>')} &nbsp;&nbsp;&nbsp; <i>m</i> = −${fr('<i>v</i>', '<i>u</i>')}`, 'thin lens formula')}
${key(`${inv('<i>f</i>')} = (${fr('<i>n</i><sub>l</sub>', '<i>n</i><sub>m</sub>')} − 1)(${inv('<i>r</i><sub>1</sub>')} − ${inv('<i>r</i><sub>2</sub>')})`, 'lensmaker’s equation. In air, <i>n</i><sub>m</sub> = 1: 1/<i>f</i> = (<i>n</i> − 1)(1/<i>r</i><sub>1</sub> − 1/<i>r</i><sub>2</sub>)')}
${fig(F.lensSign(), 'Figure 22.6: radius signs for a biconvex lens. r is positive when the centre of curvature is on the outgoing (back) side of that surface.')}
${table(['Quantity', 'Positive (+)', 'Negative (−)'], [['<i>f</i>', 'converging lens', 'diverging lens'], ['<i>u</i>', 'real object (in front of the lens)', 'virtual object (behind the lens)'], ['<i>v</i>', 'real image (behind the lens)', 'virtual image (in front of the lens)'], ['<i>r</i>', 'centre of curvature on the outgoing side', 'centre of curvature on the incoming side'], ['<i>m</i>', 'upright image', 'inverted image']])}
${note(`Biconvex: <i>r</i><sub>1</sub> = +, <i>r</i><sub>2</sub> = −. Biconcave: <i>r</i><sub>1</sub> = −, <i>r</i><sub>2</sub> = +. Flat face: <i>r</i> = ∞. Some books write (1/<i>r</i><sub>1</sub> + 1/<i>r</i><sub>2</sub>) with both radii as magnitudes for a biconvex lens; it is the same physics with a different convention. These notes use signed radii and the minus form throughout.`)}
${sim('lens', 'Ray diagram for a thin lens', 'Choose a converging or diverging lens and move the object. The three principal rays find the image. Put the object at 2F, between F and 2F, and inside F, and compare with the table.')}
${example('22.3.1', `An object is 10 cm from a converging lens of focal length 15 cm. Find the image position and its characteristics.`,
  steps([`${inv('<i>v</i>')} = ${inv('15')} − ${inv('10')} ⇒ <i>v</i> = <b>−30 cm</b> (virtual, on the same side as the object)`, `<i>m</i> = −(−30)/10 = <b>+3.0</b>: upright, three times as large (a magnifying glass)`]))}
${example('22.3.2', `Where must a small insect be placed if a diverging lens of focal length 25 cm is to form a virtual image 20 cm in front of the lens?`,
  steps([`<i>f</i> = −25 cm, <i>v</i> = −20 cm: ${inv('<i>u</i>')} = ${inv('−25')} − ${inv('−20')} = ${inv('100')} ⇒ <i>u</i> = <b>100 cm</b>`]))}
${example('22.3.3', `A diverging meniscus lens has a focal length of −16 cm. The lens is held 10 cm from an object. Find the image position and the magnification.`,
  steps([`${inv('<i>v</i>')} = ${inv('−16')} − ${inv('10')} ⇒ <i>v</i> = <b>−6.15 cm</b>`, `<i>m</i> = 6.15/10 = <b>+0.615</b> (virtual, upright, diminished)`]))}
${example('22.3.4', `An object 450 mm from a converging lens forms a real image 900 mm from the lens. Find the focal length.`,
  steps([`${inv('<i>f</i>')} = ${inv('450')} + ${inv('900')} = ${fr('3', '900')} ⇒ <i>f</i> = 300 mm = <b>30 cm</b>`]))}
${example('22.3.5', `An object 6 cm high is 4 cm from a diverging meniscus lens of focal length −24 cm. Find the nature, size and location of the image.`,
  steps([`${inv('<i>v</i>')} = ${inv('−24')} − ${inv('4')} ⇒ <i>v</i> = <b>−3.43 cm</b>`, `<i>m</i> = 3.43/4 = 0.857 ⇒ <i>h</i>′ = 0.857 × 6 = <b>5.14 cm</b>; virtual and upright`]))}
${exercises('Exercises: thin lens formula', [
  { q: `An object 8 cm high is 30 cm from a converging lens of focal length 12 cm. Find the nature, size and location of the image.`, a: `<i>v</i> = +20 cm, <i>m</i> = −0.667: real, inverted, 5.33 cm high (<i>h</i>′ = −5.33 cm)` },
  { q: `A 1.70 m tall person stands 2.50 m in front of a camera whose converging lens has a focal length of 0.0500 m. Find the characteristics of the image on the sensor.`, a: `<i>v</i> = 0.0510 m, <i>m</i> = −0.0204: real, inverted, diminished, 0.0347 m high` },
  { q: `An object is 18 cm in front of a diverging lens of focal length −12 cm. How far in front of the lens should the object be placed so that the size of its image is halved?`, a: `At 18 cm, <i>m</i> = 0.40; for <i>m</i> = 0.20: <i>u</i> = 48 cm` },
  { q: `How far from a 50.0 mm focal length lens must an object be placed for a real image magnified 3.00×? And for a virtual image magnified 3.00×?`, a: `66.7 mm (real); 33.3 mm (virtual)` },
  { q: `A lens focuses an object 22.5 cm away as an image 33.0 cm on the other side. What type of lens is it, what is its focal length, and is the image real or virtual?`, a: `converging, <i>f</i> = 13.4 cm, real` },
  { q: `(a) A 2.70 cm high insect is 2.20 m from a lens of focal length 135 mm. Where is the image, how high is it, and what type is it? (b) Repeat for <i>f</i> = −135 mm.`, a: `(a) 144 mm behind the lens, real, inverted, 1.77 mm &nbsp; (b) 127 mm in front of the lens, virtual, upright, 1.56 mm` }])}
${h4('Using the lensmaker’s equation')}
${example('22.3.6', `A meniscus lens (<i>n</i> = 1.52) in air has radii <i>r</i><sub>1</sub> = +22.4 cm and <i>r</i><sub>2</sub> = +46.2 cm. Find its focal length and state the type of lens.`,
  steps([`${inv('<i>f</i>')} = (1.52 − 1)(${inv('22.4')} − ${inv('46.2')}) = 0.52 × 0.02300 ⇒ <i>f</i> = <b>+83.6 cm</b>`, `<i>f</i> is positive: a <b>converging</b> lens.`]))}
${example('22.3.7', `Each face of a double convex lens has radius 20.0 cm; <i>n</i> = 1.50. Find the focal length (a) in air, (b) in carbon disulfide (<i>n</i> = 1.63).`,
  steps([`<i>r</i><sub>1</sub> = +20.0 cm, <i>r</i><sub>2</sub> = −20.0 cm`, `(a) ${inv('<i>f</i>')} = (1.50 − 1)(${inv('20.0')} + ${inv('20.0')}) ⇒ <i>f</i> = <b>+20.0 cm</b>`, `(b) ${inv('<i>f</i>')} = (${fr('1.50', '1.63')} − 1)(0.100) = −0.00798 ⇒ <i>f</i> = <b>−125 cm</b>: in a denser liquid, the lens is <b>diverging</b>.`]))}
${example('22.3.8', `A plano-convex lens of glass (<i>n</i> = 1.5) is to have a focal length of 40 cm. Find the radius of the curved surface.`,
  steps([`Flat face first: <i>r</i><sub>1</sub> = ∞. ${inv('40')} = (1.5 − 1)(0 − ${inv('<i>r</i><sub>2</sub>')}) ⇒ <i>r</i><sub>2</sub> = −20 cm`, `radius of the curved surface = <b>20 cm</b>`]))}
${card('STPM 2015 (repeat) · Paper 3', `A thin biconvex lens (<i>n</i> = 1.5, both radii 10.0 cm) is immersed in a liquid of refractive index 1.65. Find the focal length and state how the lens behaves.`,
  steps([`${inv('<i>f</i>')} = (${fr('1.5', '1.65')} − 1)(${inv('10.0')} + ${inv('10.0')}) = (−0.0909)(0.200) ⇒ <i>f</i> = <b>−55 cm</b>`, `<i>f</i> is negative: in this liquid the lens <b>diverges</b> a parallel beam.`]))}
${h4('Power of a lens')}
${def('Power of a lens', `${red('the reciprocal of its focal length in metres')}. Unit: dioptre (D) = m<sup>−1</sup>. Converging lenses have positive power; diverging lenses have negative power.`)}
${key(`<i>P</i> = ${inv('<i>f</i>')}`)}
${h4('Two thin lenses in contact')}
${steps([`Lens 1: ${inv('<i>u</i>')} + ${inv('<i>v</i><sub>1</sub>')} = ${inv('<i>f</i><sub>1</sub>')}. Its image is a virtual object for lens 2 (no gap): <i>u</i><sub>2</sub> = −<i>v</i><sub>1</sub>.`, `Lens 2: −${inv('<i>v</i><sub>1</sub>')} + ${inv('<i>v</i>')} = ${inv('<i>f</i><sub>2</sub>')}. Adding: ${inv('<i>u</i>')} + ${inv('<i>v</i>')} = ${inv('<i>f</i><sub>1</sub>')} + ${inv('<i>f</i><sub>2</sub>')}`])}
${key(`${inv('<i>f</i>')} = ${inv('<i>f</i><sub>1</sub>')} + ${inv('<i>f</i><sub>2</sub>')} &nbsp;&nbsp;&nbsp; <i>P</i> = <i>P</i><sub>1</sub> + <i>P</i><sub>2</sub>`)}
${exercises('Exercises: power and lenses in contact', [
  { q: `A converging lens has a focal length of 12.5 cm. Calculate its power.`, a: `+8.0 D` },
  { q: `A lens has a power of −4.0 D. State the type of lens and find its focal length.`, a: `diverging, <i>f</i> = −25 cm` },
  { q: `A lens of power +6.0 D is in contact with a lens of power −2.0 D. Find the power and focal length of the combination.`, a: `+4.0 D, <i>f</i> = +25 cm` },
  { q: `Two thin lenses of focal lengths +20.0 cm and +30.0 cm are in contact. Find the focal length and power of the combination.`, a: `<i>f</i> = +12.0 cm, <i>P</i> = +8.33 D` },
  { q: `A double convex lens (<i>n</i> = 1.50) has <i>r</i><sub>1</sub> = +15.0 cm and <i>r</i><sub>2</sub> = −15.0 cm. Find its focal length and power in air.`, a: `<i>f</i> = +15.0 cm, <i>P</i> = +6.67 D` }])}
${h4('Combination of two lenses (separated)')}
${steps([`Find the image I<sub>1</sub> formed by the first lens alone.`, `Treat I<sub>1</sub> as the object for the second lens: <i>u</i><sub>2</sub> = <i>d</i> − <i>v</i><sub>1</sub>. If I<sub>1</sub> is in front of lens 2, <i>u</i><sub>2</sub> is positive (real object). If I<sub>1</sub> falls beyond lens 2, <i>u</i><sub>2</sub> is negative (virtual object).`, `Find the final image from lens 2. The overall magnification is <i>m</i> = <i>m</i><sub>1</sub> × <i>m</i><sub>2</sub>.`])}
${sim('twolens', 'Two-lens system', 'Set the two focal lengths, the separation and the object distance. The intermediate image I₁ (faint) becomes the object for the second lens. Make I₁ fall beyond lens 2 to see a virtual object.')}
${example('22.3.9', `Two converging lenses, <i>f</i><sub>1</sub> = 10.0 cm and <i>f</i><sub>2</sub> = 20.0 cm, are 20.0 cm apart. An object is 30.0 cm in front of the first. Find the position and magnification of the final image.`,
  steps([`Lens 1: ${inv('<i>v</i><sub>1</sub>')} = ${inv('10.0')} − ${inv('30.0')} ⇒ <i>v</i><sub>1</sub> = 15.0 cm, <i>m</i><sub>1</sub> = −0.500`, `Lens 2: <i>u</i><sub>2</sub> = 20.0 − 15.0 = 5.0 cm; ${inv('<i>v</i><sub>2</sub>')} = ${inv('20.0')} − ${inv('5.0')} ⇒ <i>v</i><sub>2</sub> = <b>−6.67 cm</b> (virtual, 6.67 cm in front of lens 2)`, `<i>m</i><sub>2</sub> = −(−6.67)/5.0 = +1.33; <i>m</i> = (−0.500)(+1.33) = <b>−0.667</b> (inverted)`]))}
${example('22.3.10', `Two converging lenses, <i>f</i><sub>1</sub> = 20.0 cm and <i>f</i><sub>2</sub> = 25.0 cm, are 80.0 cm apart. An object is 60.0 cm in front of the first. Find the position and magnification of the final image.`,
  steps([`Lens 1: <i>v</i><sub>1</sub> = 30.0 cm, <i>m</i><sub>1</sub> = −0.500`, `Lens 2: <i>u</i><sub>2</sub> = 80.0 − 30.0 = 50.0 cm ⇒ <i>v</i><sub>2</sub> = <b>+50.0 cm</b> beyond lens 2 (real); <i>m</i><sub>2</sub> = −1.00`, `<i>m</i> = (−0.500)(−1.00) = <b>+0.500</b> (upright relative to the object)`]), fig(rayFig({ els: [{ type: 'lens', x: 0, f: 20 }, { type: 'lens', x: 80, f: 25 }], x0: -60, h: 6, xmin: -65, xmax: 135, ymax: 9, w: 380, hgt: 150 })))}
${exercises('Exercises: two lenses', [
  { q: `A converging lens has focal length 0.080 m. An object is 0.040 m to its left. A second identical lens is 0.120 m to the right of the first. Where is the final image, relative to the second lens?`, a: `<i>v</i><sub>1</sub> = −8.0 cm (virtual), <i>u</i><sub>2</sub> = 20.0 cm ⇒ <i>v</i><sub>2</sub> = +13.3 cm = 0.133 m to the right of lens 2; <i>m</i> = (+2.00)(−0.667) = −1.33` },
  { q: `A coin is 20.0 cm to the left of a converging lens (<i>f</i> = 16.0 cm). A second identical lens is placed to the right so that the final image has the same size and orientation as the coin. Find the separation of the lenses.`, a: `<i>v</i><sub>1</sub> = 80.0 cm, <i>m</i><sub>1</sub> = −4.00; need <i>m</i><sub>2</sub> = −0.250 ⇒ <i>u</i><sub>2</sub> = 80.0 cm; separation = <b>160 cm</b>` },
  { q: `Two converging lenses 60 cm apart have focal lengths 10 cm and 15.0 cm. An object 6.0 cm high is 20 cm in front of the first. Find the location and size of the final image. Is it real or virtual?`, a: `<i>v</i><sub>1</sub> = 20 cm, <i>u</i><sub>2</sub> = 40 cm ⇒ <i>v</i><sub>2</sub> = 24 cm beyond lens 2; <i>m</i> = (−1.00)(−0.600) = +0.600, <i>h</i>′ = 3.6 cm; real` }])}
${h4('Combination of a lens and a spherical mirror')}
${ul([`Light passes through the lens, reflects from the mirror, then passes through the lens <b>again</b>. So there are three stages (lens → mirror → lens), and the three magnifications multiply.`, `The image formed by the lens is the object for the mirror. If that image would fall behind the mirror, the mirror intercepts the rays before they meet: it is a <b>virtual object</b> and its object distance is negative.`])}
${example('22.3.11', `A converging lens (<i>f</i> = 10.0 cm) and a concave mirror (<i>r</i> = 30.0 cm) are 50.0 cm apart on a common axis. An object is 30.0 cm in front of the lens. Find the position and magnification of the final image.`,
  steps([`Lens: ${inv('<i>v</i><sub>1</sub>')} = ${inv('10.0')} − ${inv('30.0')} ⇒ <i>v</i><sub>1</sub> = 15.0 cm, <i>m</i><sub>1</sub> = −0.500`, `Mirror (<i>f</i> = +15.0 cm): <i>u</i><sub>2</sub> = 50.0 − 15.0 = 35.0 cm ⇒ <i>v</i><sub>2</sub> = 26.25 cm, <i>m</i><sub>2</sub> = −0.750`, `Lens again: <i>u</i><sub>3</sub> = 50.0 − 26.25 = 23.75 cm ⇒ <i>v</i><sub>3</sub> = <b>17.3 cm</b> from the lens (on the object side, real); <i>m</i><sub>3</sub> = −0.727`, `<i>m</i> = (−0.500)(−0.750)(−0.727) = <b>−0.273</b> (inverted, diminished)`]))}
${exercises('Exercises: lens and mirror', [
  { q: `A converging lens (<i>f</i> = 15.0 cm) is 40.0 cm from a convex mirror of radius 20.0 cm on a common axis. An object is 30.0 cm in front of the lens. Find the position and magnification of the final image.`, a: `<i>v</i><sub>1</sub> = 30.0 cm, <i>m</i><sub>1</sub> = −1.00; mirror <i>u</i><sub>2</sub> = 10.0 cm, <i>f</i> = −10.0 cm ⇒ <i>v</i><sub>2</sub> = −5.0 cm, <i>m</i><sub>2</sub> = +0.500; lens again <i>u</i><sub>3</sub> = 45.0 cm ⇒ <i>v</i><sub>3</sub> = 22.5 cm, <i>m</i><sub>3</sub> = −0.500; final image 22.5 cm from the lens, <i>m</i> = +0.25 (upright)` },
  { q: `A converging lens (<i>f</i> = 10.0 cm) and a concave mirror (<i>f</i> = 20.0 cm) are 80.0 cm apart. An object is 15.0 cm in front of the lens. Find the position and magnification of the final image.`, a: `<i>v</i><sub>1</sub> = 30.0 cm (<i>m</i><sub>1</sub> = −2.00); <i>u</i><sub>2</sub> = 50.0 cm ⇒ <i>v</i><sub>2</sub> = 33.3 cm (<i>m</i><sub>2</sub> = −0.667); <i>u</i><sub>3</sub> = 46.7 cm ⇒ <i>v</i><sub>3</sub> = 12.7 cm (<i>m</i><sub>3</sub> = −0.272); final image 12.7 cm from the lens, <i>m</i> = −0.36 (inverted)` }])}
`)}

${sec('22-4', 'STPM past-year questions', `
${pq('STPM 2013 · Paper 3 · Q7', `A baby is in front of a concave mirror of radius of curvature <i>R</i>. An upright image twice the size of the baby is seen. What is the distance between the baby and the mirror?`, ['<i>R</i>/4', '<i>R</i>/2', '3<i>R</i>/4', '<i>R</i>'], 0, `<p>Upright ⇒ virtual, <i>m</i> = +2 ⇒ <i>v</i> = −2<i>u</i>. ${inv('<i>u</i>')} − ${fr('1', '2<i>u</i>')} = ${fr('2', '<i>R</i>')} ⇒ <i>u</i> = <i>R</i>/4.</p>`)}
${pq('STPM 2013 · Paper 3 · Q8', `A diverging lens and a converging lens, each of focal length 10.0 cm, are 10.0 cm apart, with the diverging lens in front. The arrangement is focused on a distant object. The image formed is`, ['virtual, 5.0 cm behind the converging lens', 'virtual, 10.0 cm behind the diverging lens', 'real, 10.0 cm behind the converging lens', 'real, 20.0 cm behind the converging lens'], 3, `<p>Parallel rays give a virtual image at the focus of the diverging lens, 10.0 cm in front of it. So <i>u</i><sub>2</sub> = 20.0 cm for the converging lens: ${inv('20.0')} + ${inv('<i>v</i>')} = ${inv('10.0')} ⇒ <i>v</i> = +20.0 cm (real).</p>`)}
${pq('STPM 2014 · Paper 3 · Q7', `A parallel beam is incident normally on a converging lens of focal length <i>f</i><sub>1</sub> in contact with a diverging lens of focal length <i>f</i><sub>2</sub>. The focal length of the combination is <i>f</i><sub>3</sub>. If the image distances of the converging lens and of the diverging lens are <i>v</i><sub>1</sub> and <i>v</i><sub>2</sub>, which pair (<i>v</i><sub>1</sub>, <i>v</i><sub>2</sub>) is correct?`, ['(<i>f</i><sub>1</sub>, <i>f</i><sub>2</sub>)', '(<i>f</i><sub>1</sub>, <i>f</i><sub>3</sub>)', '(<i>f</i><sub>2</sub>, <i>f</i><sub>1</sub>)', '(<i>f</i><sub>3</sub>, <i>f</i><sub>1</sub>)'], 1, `<p>The converging lens alone would focus the parallel beam at its own focus, so <i>v</i><sub>1</sub> = <i>f</i><sub>1</sub>. Together the lenses act as one lens of focal length <i>f</i><sub>3</sub>, so the light converges at <i>v</i><sub>2</sub> = <i>f</i><sub>3</sub>.</p>`)}
${pq('STPM 2015 · Paper 3 · Q7', `An object is 5.0 cm in front of a concave mirror of radius of curvature 20.0 cm. Which statement about the image is true?`, ['It is enlarged, upright and 10 cm behind the mirror.', 'It is enlarged, inverted and 10 cm in front of the mirror.', 'It is diminished, upright and 6.7 cm behind the mirror.', 'It is diminished, inverted and 6.7 cm in front of the mirror.'], 0, `<p><i>f</i> = +10 cm: ${inv('5.0')} + ${inv('<i>v</i>')} = ${inv('10')} ⇒ <i>v</i> = −10 cm; <i>m</i> = +2 (virtual, upright, enlarged).</p>`)}
${pq('STPM 2015 (repeat) · Paper 3 · Q7', `A converging lens forms an inverted image twice the size of the object when the object is 30 cm from the lens. What is the new object distance if the image is also twice the size of the object but upright?`, ['5.0 cm', '10.0 cm', '15.0 cm', '20.0 cm'], 1, `<p>Inverted, <i>m</i> = −2 at <i>u</i> = 30 cm ⇒ <i>v</i> = 60 cm, <i>f</i> = 20 cm. Upright ⇒ virtual, <i>v</i> = −2<i>u</i>: ${inv('<i>u</i>')} − ${fr('1', '2<i>u</i>')} = ${inv('20')} ⇒ <i>u</i> = 10.0 cm.</p>`)}
${card('STPM 2014 · Paper 3 · Q19(a)', `A concave mirror has radius of curvature 40.0 cm. A nail 5.00 cm long stands upright on the principal axis, 45.0 cm in front of the mirror. (i) Calculate the image distance. (ii) Find the size of the image. (iii) State two characteristics of the image.`,
  steps([`(i) <i>f</i> = +20.0 cm: ${inv('<i>v</i>')} = ${inv('20.0')} − ${inv('45.0')} ⇒ <i>v</i> = <b>+36.0 cm</b>`, `(ii) <i>m</i> = −36.0/45.0 = −0.800 ⇒ image height = <b>4.00 cm</b>`, `(iii) real (<i>v</i> positive) and inverted (<i>m</i> negative); also diminished`]), fig(mir(20, 45, 5, { xmin: -50, xmax: 12, ymax: 7 })))}
${card('STPM 2014 · Paper 3 · Q19(b)', `An object is 25.0 cm in front of a biconvex lens of focal length 12.0 cm. A meniscus lens (radii 15.0 cm and 20.0 cm, <i>n</i> = 1.5) is 50.0 cm behind the biconvex lens. Determine (i) the focal length of the meniscus lens, (ii) the position of the final image, (iii) the magnification.`,
  steps([`(i) From the figure, both faces of the meniscus bulge towards the incoming light, and the left face (radius 15.0 cm) is the more curved. Both centres of curvature are on the outgoing side, so <i>r</i><sub>1</sub> = +15.0 cm, <i>r</i><sub>2</sub> = +20.0 cm: ${inv('<i>f</i>')} = 0.5(${inv('15.0')} − ${inv('20.0')}) ⇒ <i>f</i> = <b>+120 cm</b> (converging: thicker at the centre)`, `(ii) Biconvex lens: ${inv('25.0')} + ${inv('<i>v</i><sub>1</sub>')} = ${inv('12.0')} ⇒ <i>v</i><sub>1</sub> = +23.08 cm. Meniscus: <i>u</i><sub>2</sub> = 50.0 − 23.08 = 26.92 cm ⇒ ${inv('<i>v</i><sub>2</sub>')} = ${inv('120')} − ${inv('26.92')} ⇒ <i>v</i><sub>2</sub> = <b>−34.7 cm</b>: a virtual image 34.7 cm in front of the meniscus lens`, `(iii) <i>m</i> = (−${fr('23.08', '25.0')})(−${fr('−34.71', '26.92')}) = <b>−1.19</b> (inverted, slightly enlarged)`]), fig(F.q14(), 'The arrangement in STPM 2014 Paper 3 Q19(b) (not to scale).'))}
${card('STPM 2015 · Paper 3 · Q19', `(a) An object is 30.0 cm in front of a converging lens of focal length 7.55 cm. Find the image position, the magnification and the characteristics of the image. (b) A 10.0 cm object is 15.0 cm in front of a convex mirror of radius 40.0 cm. Find the image position and height. (c) A spider 2.00 cm across hangs 200 cm from a wall. A lens forms an image of the spider on the wall half its size. What lens is needed, and where?`,
  steps([`(a) ${inv('<i>v</i>')} = ${inv('7.55')} − ${inv('30.0')} ⇒ <i>v</i> = <b>+10.1 cm</b>; <i>m</i> = −10.1/30.0 = <b>−0.336</b>: real, inverted, diminished`, `(b) <i>f</i> = −20.0 cm: ${inv('<i>v</i>')} = ${inv('−20.0')} − ${inv('15.0')} ⇒ <i>v</i> = <b>−8.57 cm</b> (behind the mirror); <i>h</i>′ = 10.0 × 8.57/15.0 = <b>5.71 cm</b>: virtual, upright, diminished`, `(c) The image is on a screen, so it is real: a <b>converging</b> lens. |<i>m</i>| = <i>v</i>/<i>u</i> = ½ ⇒ <i>u</i> = 2<i>v</i>, and <i>u</i> + <i>v</i> = 200 cm ⇒ <i>v</i> = 66.7 cm from the wall, <i>u</i> = 133 cm; ${inv('<i>f</i>')} = ${inv('133')} + ${inv('66.7')} ⇒ <i>f</i> = <b>44.4 cm</b>`]), fig(lens(7.55, 30, 4, { xmin: -34, xmax: 16, ymax: 5, twoF: false })))}
`)}
`;
  window.PhysiQLessons.register('LESSON-S3-22', { html: () => S });

  // ===================== simulations (canvas versions of the same tracer) =====================
  function optSim(root, mode) {
    const { COL, fmt, el, slider, button, canvas, text, readouts } = window.PhysiQSims.U;
    const S = mode === 'mirror' ? { f: 15, u: 40, h: 5, sgn: 1 } : mode === 'lens' ? { f: 15, u: 40, h: 5, sgn: 1 } : mode === 'surface' ? { n1: 1.0, n2: 1.5, r: 10, u: 40, h: 4 } : { f1: 10, f2: 15, d: 40, u: 25, h: 4 };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    const sl = {};
    if (mode === 'mirror' || mode === 'lens') {
      const names = mode === 'mirror' ? ['concave', 'convex'] : ['converging', 'diverging'];
      const bs = names.map((n, i) => button(pre, n, 'sm-chip' + (i ? '' : ' on'), () => { S.sgn = i ? -1 : 1; bs.forEach((b, j) => b.classList.toggle('on', j === i)); draw(); }));
      sl.u = slider(ctl, 'object distance <i>u</i>', 3, 70, 0.5, S.u, 'cm', v => { S.u = v; draw(); });
      slider(ctl, 'focal length |<i>f</i>|', 5, 25, 0.5, S.f, 'cm', v => { S.f = v; draw(); });
      slider(ctl, 'object height', 1, 8, 0.5, S.h, 'cm', v => { S.h = v; draw(); });
      const jump = mode === 'mirror' ? [['beyond C', 2.6], ['at C', 2], ['between C and F', 1.5], ['inside F', 0.6]] : [['beyond 2F', 2.6], ['at 2F', 2], ['between F and 2F', 1.5], ['inside F', 0.6]];
      jump.forEach(([n, k]) => button(pre, n, 'sm-chip', () => { S.u = k * S.f; sl.u.set(S.u); draw(); }));
    } else if (mode === 'surface') {
      [['air → glass, convex', 1, 1.5, 10], ['water → glass', 1.33, 1.5, 10], ['glass → air, concave side', 1.5, 1, -10], ['fish in water (flat)', 1.33, 1, 1e9]].forEach(([n, a, b, r]) => button(pre, n, 'sm-chip', () => { S.n1 = a; S.n2 = b; S.r = r; s1.set(a); s2.set(b); if (Math.abs(r) < 1e8) sr.set(r); draw(); }));
      const s1 = slider(ctl, '<i>n</i>₁ (left)', 1, 2, 0.01, S.n1, '', v => { S.n1 = v; draw(); });
      const s2 = slider(ctl, '<i>n</i>₂ (right)', 1, 2, 0.01, S.n2, '', v => { S.n2 = v; draw(); });
      const sr = slider(ctl, 'radius <i>r</i>', -25, 25, 1, S.r, 'cm', v => { S.r = Math.abs(v) < 1 ? 1e9 : v; draw(); });
      slider(ctl, 'object distance <i>u</i>', 5, 70, 0.5, S.u, 'cm', v => { S.u = v; draw(); });
    } else {
      slider(ctl, '<i>f</i>₁', -25, 25, 1, S.f1, 'cm', v => { S.f1 = Math.abs(v) < 2 ? (v < 0 ? -2 : 2) : v; draw(); });
      slider(ctl, '<i>f</i>₂', -25, 25, 1, S.f2, 'cm', v => { S.f2 = Math.abs(v) < 2 ? (v < 0 ? -2 : 2) : v; draw(); });
      slider(ctl, 'separation <i>d</i>', 0, 80, 1, S.d, 'cm', v => { S.d = v; draw(); });
      slider(ctl, 'object distance <i>u</i>₁', 5, 60, 0.5, S.u, 'cm', v => { S.u = v; draw(); });
    }
    const cv = canvas(root); const ro = readouts(root);
    const nat = (v, m) => !isFinite(v) ? 'image at infinity' : (v > 0 ? 'real' : 'virtual') + ', ' + (m < 0 ? 'inverted' : 'upright') + ', ' + (Math.abs(Math.abs(m) - 1) < 0.02 ? 'same size' : Math.abs(m) > 1 ? 'magnified' : 'diminished');
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.5, 260, 400); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      let els, xmin, xmax, x0;
      if (mode === 'mirror') { els = [{ type: 'mirror', x: 0, f: S.sgn * S.f }]; xmin = -75; xmax = 35; }
      else if (mode === 'lens') { els = [{ type: 'lens', x: 0, f: S.sgn * S.f }]; xmin = -75; xmax = 75; }
      else if (mode === 'surface') { els = [{ type: 'surface', x: 0, r: S.r, n1: S.n1, n2: S.n2 }]; xmin = -75; xmax = 90; }
      else { els = [{ type: 'lens', x: 0, f: S.f1 }, { type: 'lens', x: S.d, f: S.f2 }]; xmin = -65; xmax = S.d + 70; }
      x0 = -S.u;
      const ymax = 14, k = (w - 20) / (xmax - xmin), cy = h / 2, ky = (h / 2 - 22) / ymax, X = x => 10 + (x - xmin) * k, Y = y => cy - y * ky;
      const sol = solve(els, x0, S.h);
      // media for surface
      if (mode === 'surface') { ctx.fillStyle = 'rgba(127,178,229,' + Math.min(0.5, (S.n2 - 1) * 0.6 + 0.05) + ')'; ctx.beginPath(); const b = Math.abs(S.r) > 1e8 ? 0 : (S.r > 0 ? 1 : -1) * 14; ctx.moveTo(X(0) + b, 0); ctx.quadraticCurveTo(X(0) - b, h / 2, X(0) + b, h); ctx.lineTo(w, h); ctx.lineTo(w, 0); ctx.closePath(); ctx.fill();
        if (S.n1 > 1.01) { ctx.fillStyle = 'rgba(127,178,229,' + Math.min(0.5, (S.n1 - 1) * 0.6 + 0.05) + ')'; ctx.beginPath(); ctx.moveTo(X(0) + b, 0); ctx.quadraticCurveTo(X(0) - b, h / 2, X(0) + b, h); ctx.lineTo(0, h); ctx.lineTo(0, 0); ctx.closePath(); ctx.fill(); }
        ctx.strokeStyle = COL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(0) + b, 4); ctx.quadraticCurveTo(X(0) - b, h / 2, X(0) + b, h - 4); ctx.stroke();
        text(ctx, 'n₁ = ' + fmt(S.n1, 2), 12, 18, { b: 1, fs: 12 }); text(ctx, 'n₂ = ' + fmt(S.n2, 2), w - 12, 18, { a: 'right', b: 1, fs: 12 }); }
      ctx.strokeStyle = COL.sub; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
      const pt = (x, lab) => { if (x > xmin && x < xmax) { ctx.fillStyle = COL.ink; ctx.beginPath(); ctx.arc(X(x), cy, 3, 0, 7); ctx.fill(); text(ctx, lab, X(x), cy + 16, { a: 'center', fs: 11, c: COL.sub }); } };
      els.forEach((e, i) => {
        const x = X(e.x), t = Y(ymax * 0.9), bt = Y(-ymax * 0.9);
        if (e.type === 'lens') { ctx.fillStyle = 'rgba(160,200,236,.6)'; ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.3; ctx.beginPath(); if (e.f > 0) { ctx.moveTo(x, t); ctx.quadraticCurveTo(x + 12, cy, x, bt); ctx.quadraticCurveTo(x - 12, cy, x, t); } else { ctx.moveTo(x - 8, t); ctx.lineTo(x + 8, t); ctx.quadraticCurveTo(x + 1, cy, x + 8, bt); ctx.lineTo(x - 8, bt); ctx.quadraticCurveTo(x - 1, cy, x - 8, t); } ctx.fill(); ctx.stroke(); pt(e.x - e.f, 'F' + (els.length > 1 ? i + 1 : '')); pt(e.x + e.f, 'F' + (els.length > 1 ? i + 1 : '')); if (els.length === 1) { pt(e.x - 2 * e.f, '2F'); pt(e.x + 2 * e.f, '2F'); } }
        if (e.type === 'mirror') { const b = e.f > 0 ? -12 : 12; ctx.strokeStyle = COL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + b, t); ctx.quadraticCurveTo(x - b, cy, x + b, bt); ctx.stroke(); ctx.lineWidth = 1; for (let j = 0; j < 9; j++) { const yy = t + (bt - t) * (j + 0.5) / 9; ctx.beginPath(); ctx.moveTo(x + 6 + (e.f > 0 ? 0 : 8), yy); ctx.lineTo(x + 13 + (e.f > 0 ? 0 : 8), yy - 6); ctx.stroke(); } pt(e.x - e.f, 'F'); pt(e.x - 2 * e.f, 'C'); }
        if (e.type === 'surface' && Math.abs(e.r) < 1e8) pt(e.x + e.r, 'C');
      });
      // rays
      const slopes = els.length === 1 ? principal(els[0], x0, S.h) : [0, -S.h / (els[0].x - x0)];
      const cols = [COL.r, '#2F6FE0', COL.gr];
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.clip();
      slopes.forEach((s, i) => { const tr = trace(els, x0, S.h, s, xmin, xmax); ctx.strokeStyle = cols[i % 3]; ctx.lineWidth = 1.8; ctx.beginPath(); tr.pts.forEach((p, j) => j ? ctx.lineTo(X(p[0]), Y(p[1])) : ctx.moveTo(X(p[0]), Y(p[1]))); ctx.stroke();
        if (!sol.real && isFinite(sol.xi)) { const [xh, yh] = tr.hit, yi = tr.dir > 0 ? yh + tr.s * (sol.xi - xh) : yh + tr.s * (xh - sol.xi); ctx.setLineDash([5, 4]); ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(X(xh), Y(yh)); ctx.lineTo(X(sol.xi), Y(yi)); ctx.stroke(); ctx.setLineDash([]); } });
      const arrowC = (x, y, c, dash) => { ctx.strokeStyle = c; ctx.fillStyle = c; ctx.lineWidth = 3; ctx.setLineDash(dash ? [5, 4] : []); ctx.beginPath(); ctx.moveTo(X(x), cy); ctx.lineTo(X(x), Y(y)); ctx.stroke(); ctx.setLineDash([]); const s = y > 0 ? 1 : -1; ctx.beginPath(); ctx.moveTo(X(x), Y(y)); ctx.lineTo(X(x) - 6, Y(y) + 9 * s); ctx.lineTo(X(x) + 6, Y(y) + 9 * s); ctx.closePath(); ctx.fill(); };
      arrowC(x0, S.h, COL.ink, false); text(ctx, 'O', X(x0), Y(S.h) - 8, { a: 'center', b: 1, fs: 12 });
      if (els.length > 1) { const s1 = sol.stages[0]; if (isFinite(s1.xi) && s1.xi > xmin && s1.xi < xmax) { ctx.globalAlpha = 0.45; arrowC(s1.xi, s1.m * S.h, COL.v, s1.v < 0 || s1.xi > els[1].x); ctx.globalAlpha = 1; text(ctx, 'I₁', X(s1.xi) + 6, Y(s1.m * S.h / 2), { fs: 11, c: COL.v, b: 1 }); } }
      if (isFinite(sol.xi) && sol.xi > xmin && sol.xi < xmax) { arrowC(sol.xi, sol.hi, COL.o, !sol.real); text(ctx, els.length > 1 ? 'I₂' : 'I', X(sol.xi) + 7, Y(sol.hi) + (sol.hi > 0 ? -4 : 12), { b: 1, fs: 12, c: COL.o }); }
      ctx.restore();
      const st = sol.stages[sol.stages.length - 1];
      const rows = [];
      if (mode === 'twolens') { const s1 = sol.stages[0]; rows.push(['lens 1: v₁', isFinite(s1.v) ? fmt(s1.v, 1) + ' cm' : '∞'], ['lens 2: u₂ = d − v₁', isFinite(st.u) ? fmt(st.u, 1) + ' cm' + (st.u < 0 ? ' (virtual object)' : '') : '∞'], ['lens 2: v₂', isFinite(st.v) ? fmt(st.v, 1) + ' cm' : '∞', 'hl'], ['m = m₁ × m₂', isFinite(sol.m) ? fmt(sol.m, 2) : '—', 'hl']); }
      else { if (mode === 'surface') rows.push(['n₁/u + n₂/v = (n₂ − n₁)/r', Math.abs(S.r) > 1e8 ? 'flat surface' : 'r = ' + fmt(S.r, 0) + ' cm']); else rows.push(['f', fmt(els[0].f, 1) + ' cm']); rows.push(['image distance v', isFinite(st.v) ? fmt(st.v, 1) + ' cm' : '∞', 'hl'], ['magnification m', isFinite(sol.m) ? fmt(sol.m, 2) : '—', 'hl']); }
      rows.push(['image', nat(st.v, sol.m)]);
      ro(rows);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  }
  ['mirror', 'lens', 'surface', 'twolens'].forEach(m => window.PhysiQSims.add(m, root => optSim(root, m)));
})();
