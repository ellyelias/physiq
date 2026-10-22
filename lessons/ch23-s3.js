/* Semester 3 Chapter 23 Wave Optics: full notes by Cikgu Suhaili (from STPM_2026_wave_optics_TEACHERS_VERSION.pptx).
   App chapter 23 = STPM 2026 syllabus chapter 24. The syllabus writes the two-slit separation as a (x = λD/a); the slides use d. */
(function () {
  'use strict';
  const { card, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4, pq } = window.PhysiQLessons.H;
  const lD = fr('λ<i>D</i>', '<i>a</i>');

  // ---------- figures ----------
  const F = {};
  F.huy = () => { let pl = '', sp = '';
    [40, 70, 100, 130, 160].forEach(y => { pl += dot(40, y, 3, C.v) + `<path d="M40,${y - 26} A26,26 0 0,1 40,${y + 26}" fill="none" stroke="${C.r}" stroke-width="1.2"/>`; });
    pl += L(40, 20, 40, 180, 'v', '', { w: 2 }) + L(66, 20, 66, 180, 'g', '', { w: 2.4, d: '6 3' }) + T(40, 196, 't = 0', { fs: 11 }) + T(70, 196, 'later', { fs: 11, c: C.g }) + L(80, 100, 110, 100, 'k', 'e', { w: 1.4 });
    const cx = 230, cy = 100; [-60, -30, 0, 30, 60].forEach(a => { const r = a * Math.PI / 180, x = cx + 40 * Math.cos(r), y = cy + 40 * Math.sin(r); sp += dot(x, y, 2.6, C.v) + `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="20" fill="none" stroke="${C.r}" stroke-width="1"/>`; });
    sp += `<path d="M${cx},${cy - 40} A40,40 0 0,1 ${cx},${cy + 40}" fill="none" stroke="${C.v}" stroke-width="2"/><path d="M${cx},${cy - 60} A60,60 0 0,1 ${cx},${cy + 60}" fill="none" stroke="${C.g}" stroke-width="2.4" stroke-dasharray="6 3"/>` + dot(cx, cy, 3, C.ink) + T(cx, 196, 'spherical wavefront', { fs: 11 });
    return svg(360, 205, pl + T(60, 14, 'plane wavefront', { fs: 11 }) + sp + T(250, 14, 'new wavefront = tangent to wavelets', { fs: 11, c: C.g }), 380); };
  F.huySlit = () => { let s = `<rect x="100" y="10" width="10" height="70" fill="${C.sub}"/><rect x="100" y="120" width="10" height="70" fill="${C.sub}"/>`;
    [20, 40, 60].forEach(x => { s += L(x, 20, x, 180, 'v', '', { w: 1.6 }); });
    [86, 100, 114].forEach(y => { s += dot(105, y, 2.4, C.r) + `<path d="M105,${y - 30} A30,30 0 0,1 105,${y + 30}" fill="none" stroke="${C.r}" stroke-width="1"/>`; });
    [40, 75, 110].forEach(r => { s += `<path d="M110,${100 - r} A${r},${r} 0 0,1 110,${100 + r}" fill="none" stroke="${C.v}" stroke-width="1.6"/>`; });
    return svg(340, 200, s + T(40, 198, 'plane waves', { fs: 11 }) + T(220, 198, 'waves spread round the edges', { fs: 11, c: C.v }) + T(230, 14, 'gap ≈ λ: strong diffraction', { fs: 11, b: 1 }), 360); };
  F.young = () => svg(380, 220, `<rect x="100" y="20" width="6" height="66" fill="${C.sub}"/><rect x="100" y="94" width="6" height="32" fill="${C.sub}"/><rect x="100" y="134" width="6" height="66" fill="${C.sub}"/>` + L(330, 20, 330, 200, 'k', '', { w: 3 }) +
    L(10, 110, 100, 110, 'o', 'e', { w: 1.6 }) + T(40, 102, 'coherent light', { fs: 11, c: C.o }) + L(103, 90, 330, 46, 'r', '', { w: 1.4 }) + L(103, 130, 330, 46, 'r', '', { w: 1.4 }) + L(103, 110, 330, 110, 's', '', { d: '4 3', w: 1 }) + L(103, 110, 330, 46, 's', '', { d: '4 3', w: 1 }) +
    L(103, 130, 125, 85, 'g', '', { w: 1.6 }) + T(130, 118, 'a sin θ', { fs: 11, c: C.g, a: 'start' }) + T(96, 92, 'S₁', { fs: 11, a: 'end' }) + T(96, 136, 'S₂', { fs: 11, a: 'end' }) + L(86, 90, 86, 130, 'k', 'b', { w: 1 }) + T(80, 114, 'a', { it: 1, a: 'end' }) +
    T(160, 102, 'θ', { it: 1, c: C.r }) + dot(330, 46, 4, C.o) + T(338, 50, 'P', { b: 1, a: 'start' }) + L(345, 46, 345, 110, 'k', 'b', { w: 1 }) + T(352, 82, 'x', { it: 1, a: 'start' }) + L(106, 210, 330, 210, 'k', 'b', { w: 1 }) + T(218, 206, 'D', { it: 1 }) + T(338, 114, 'O', { fs: 11, a: 'start' }), 400);
  F.pattern = (kind) => { const W = 340, cx = W / 2; let bars = '', cur = '';
    for (let i = 0; i <= 340; i++) { const x = (i - cx) / 22; let I;
      if (kind === 'two') I = Math.cos(Math.PI * x) ** 2; else if (kind === 'single') { const b = Math.PI * x / 3; I = Math.abs(b) < 1e-6 ? 1 : (Math.sin(b) / b) ** 2; } else { const b = Math.PI * x / 3, s = Math.abs(b) < 1e-6 ? 1 : (Math.sin(b) / b) ** 2; I = s * Math.cos(Math.PI * x) ** 2; }
      bars += `<rect x="${10 + i}" y="10" width="1.2" height="26" fill="rgba(220,40,40,${I.toFixed(3)})"/>`; cur += (i ? ' L' : 'M') + (10 + i) + ',' + (100 - 56 * I).toFixed(1); }
    return svg(360, 112, `<rect x="10" y="10" width="341" height="26" fill="#111"/>` + bars + L(10, 100, 352, 100, 's', '', { w: 1 }) + P(cur, 'r', { w: 2 }), 380); };
  F.film = () => svg(360, 190, `<rect x="20" y="80" width="320" height="40" fill="#E6F1FA" stroke="${C.ink}"/>` + T(30, 70, 'air, n₁ = 1', { a: 'start', fs: 11 }) + T(30, 104, 'film, n', { a: 'start', fs: 11 }) + T(30, 140, 'air (soap film) or water (oil film)', { a: 'start', fs: 11 }) +
    L(120, 20, 150, 80, 'o', 'e', { w: 1.8 }) + L(150, 80, 180, 20, 'r', 'e', { w: 1.8 }) + L(150, 80, 170, 120, 'o', '', { w: 1.6 }) + L(170, 120, 190, 80, 'o', '', { w: 1.6 }) + L(190, 80, 220, 20, 'v', 'e', { w: 1.8 }) +
    T(186, 30, '1', { b: 1, c: C.r }) + T(226, 30, '2', { b: 1, c: C.v }) + T(150, 76, 'A', { fs: 11, a: 'end' }) + T(170, 136, 'B', { fs: 11 }) + L(320, 80, 320, 120, 'k', 'b', { w: 1 }) + T(328, 104, 't', { it: 1, a: 'start' }) + T(236, 46, 'ray 1, at A (into a denser', { fs: 10.5, a: 'start', c: C.r }) + T(236, 60, 'medium): phase change π', { fs: 10.5, a: 'start', c: C.r }) + T(240, 172, 'ray 2 travels an extra 2t inside the film', { fs: 10.5, a: 'middle', c: C.v }), 380);
  F.single = () => svg(380, 200, `<rect x="110" y="10" width="6" height="70" fill="${C.sub}"/><rect x="110" y="130" width="6" height="60" fill="${C.sub}"/>` + L(340, 10, 340, 190, 'k', '', { w: 3 }) +
    [84, 96, 108, 120].map(y => L(20, y, 113, y, 'o', '', { w: 1.2 }) + L(113, y, 200, y - 52, 'r', '', { w: 1.2 })).join('') + L(113, 80, 113, 130, 'k', 'b', { w: 1 }) + T(104, 108, 'a', { it: 1, a: 'end' }) + L(113, 130, 145, 92, 'g', '', { w: 1.6 }) + T(150, 128, 'a sin θ = λ', { fs: 11, c: C.g, a: 'start' }) +
    T(176, 56, 'θ', { it: 1, c: C.r }) + T(214, 22, 'first minimum: split the slit', { fs: 10.5, a: 'start' }) + T(214, 36, 'into two halves; each ray in', { fs: 10.5, a: 'start' }) + T(214, 50, 'the top half cancels one λ/2', { fs: 10.5, a: 'start' }) + T(214, 64, 'behind it in the bottom half', { fs: 10.5, a: 'start' }), 400);
  F.rayleigh = () => { const g = (c) => { let d = ''; for (let i = 0; i <= 200; i++) { const x = -3 + 6 * i / 200, b = Math.PI * (x - c); const I = Math.abs(b) < 1e-6 ? 1 : (Math.sin(b) / b) ** 2; d += (i ? ' L' : 'M') + (40 + i * 1.5).toFixed(1) + ',' + (110 - 80 * I).toFixed(1); } return d; };
    return svg(360, 130, L(40, 110, 340, 110, 's', '', { w: 1 }) + P(g(-0.5), 'v', { w: 2 }) + P(g(0.5), 'r', { w: 2 }) + T(190, 126, 'just resolved: the central maximum of one falls on the first minimum of the other', { fs: 10.5, c: C.sub }), 380); };
  F.grating = () => svg(380, 200, L(100, 20, 100, 180, 'k', '', { w: 3 }) + [30, 50, 70, 90, 110, 130, 150, 170].map(y => L(97, y, 103, y, 's', '', { w: 1 })).join('') + L(20, 100, 100, 100, 'o', 'e', { w: 1.8 }) +
    [[0, 'm = 0'], [22, 'm = 1'], [-22, 'm = 1'], [48, 'm = 2'], [-48, 'm = 2']].map(([a, s]) => { const r = a * Math.PI / 180; return L(100, 100, 100 + 230 * Math.cos(r), 100 - 230 * Math.sin(r), a ? 'r' : 'k', '', { w: 1.4 }) + T(100 + 250 * Math.cos(r), 104 - 250 * Math.sin(r) * 0.82, s, { fs: 11, a: 'end' }); }).join('') + T(150, 92, 'θ₁', { it: 1, c: C.r }) + T(60, 92, 'monochromatic', { fs: 10.5, c: C.o }) + T(100, 196, 'grating', { fs: 11 }), 400);
  F.gratingPD = () => svg(320, 160, [40, 80, 120].map(y => `<rect x="60" y="${y - 4}" width="8" height="8" fill="#fff" stroke="${C.ink}"/>`).join('') + L(64, 20, 64, 140, 'k', '', { w: 1, d: '2 2' }) + [40, 80, 120].map(y => L(64, y, 260, y - 90, 'r', '', { w: 1.3 })).join('') + L(64, 80, 82, 47, 'g', '', { w: 1.6 }) + T(88, 70, 'd sin θ', { fs: 11, c: C.g, a: 'start' }) + L(46, 40, 46, 80, 'k', 'b', { w: 1 }) + T(40, 64, 'd', { it: 1, a: 'end' }) + T(200, 150, 'adjacent slits differ by d sin θ = mλ', { fs: 11, c: C.sub }), 340);
  F.polar = () => svg(380, 150, L(10, 75, 370, 75, 's', '', { d: '4 3', w: 1 }) + [30, 60].map(x => L(x, 45, x, 105, 'r', 'b', { w: 1.6 }) + L(x - 20, 55, x + 20, 95, 'r', 'b', { w: 1.6 }) + L(x - 20, 95, x + 20, 55, 'r', 'b', { w: 1.6 })).join('') + T(45, 130, 'unpolarised', { fs: 11 }) +
    `<rect x="110" y="30" width="16" height="90" fill="#DCEBF7" stroke="${C.ink}"/>` + L(118, 36, 118, 114, 'k', '', { w: 1.4 }) + T(118, 140, 'polariser', { fs: 11 }) + [170, 200].map(x => L(x, 45, x, 105, 'r', 'b', { w: 1.6 })).join('') + T(185, 130, 'I₀ (polarised)', { fs: 11 }) +
    `<rect x="240" y="30" width="16" height="90" fill="#DCEBF7" stroke="${C.ink}"/>` + L(248, 40, 268, 110, 'k', '', { w: 1.4 }) + T(248, 140, 'analyser at θ', { fs: 11 }) + [300, 330].map(x => L(x - 9, 50, x + 9, 100, 'r', 'b', { w: 1.6 })).join('') + T(320, 130, 'I = I₀ cos²θ', { fs: 11, it: 1, c: C.r }), 400);
  F.brewster = () => svg(340, 200, `<rect x="20" y="100" width="300" height="90" fill="#E6F1FA"/>` + L(20, 100, 320, 100, 'k', '', { w: 1.4 }) + L(170, 14, 170, 190, 's', '', { d: '4 3', w: 1 }) + L(70, 33, 170, 100, 'o', 'e', { w: 2 }) + L(170, 100, 270, 33, 'r', 'e', { w: 2 }) + L(170, 100, 215, 186, 'v', 'e', { w: 2 }) +
    T(150, 52, 'θ_B', { it: 1 }) + T(190, 52, 'θ_B', { it: 1 }) + T(184, 150, 'θ₂', { it: 1 }) + P('M195,88 Q205,100 190,112', 'g', { w: 1.4 }) + T(214, 108, '90°', { fs: 11, c: C.g, a: 'start' }) + T(330, 22, 'reflected: completely polarised', { fs: 10.5, a: 'end', c: C.r }) + T(30, 92, 'n₁', { it: 1, a: 'start' }) + T(30, 182, 'n₂', { it: 1, a: 'start' }), 360);
  F.fibre = () => svg(380, 130, `<rect x="10" y="20" width="360" height="90" fill="#F3E9D6"/><rect x="10" y="40" width="360" height="50" fill="#DCEBF7"/>` + P('M10,80 L60,40 L120,90 L180,40 L240,90 L300,40 L360,90', 'r', { w: 2 }) + T(20, 34, 'cladding (lower n₂)', { fs: 11, a: 'start' }) + T(20, 64, 'core (higher n₁)', { fs: 11, a: 'start' }) + T(190, 124, 'light hits the core–cladding boundary above the critical angle: total internal reflection', { fs: 10.5, c: C.sub }), 400);

  const S = `
${sec('23-1', '23.1 Huygens’s principle', `
<p><b>Physical (wave) optics</b> studies the wave nature of light: interference, diffraction and polarisation.</p>
${ul([`A <b>wavefront</b> is a line or surface on which all points vibrate in the same phase. Wavefronts can be plane or spherical.`, `A <b>ray</b> is a line perpendicular to the wavefronts; it shows the direction of travel of the wave.`])}
${def('Huygens’s principle', `states that ${red('every point on a wavefront acts as a source of secondary wavelets that spread out in the forward direction at the same speed as the wave. The new wavefront is the surface tangent to all these wavelets')}.`)}
${fig(F.huy(), 'Figure 23.1: constructing the new wavefront from the secondary wavelets, for a plane and a spherical wavefront.')}
${h4('Using Huygens’s principle')}
${table(['Phenomenon', 'Explanation with wavelets'], [['Reflection', 'Points on the wavefront reach the mirror one after another. Their wavelets spread back from the mirror; the tangent to them is the reflected wavefront, at an equal angle (<i>i</i> = <i>r</i>).'], ['Refraction', 'Wavelets in the second medium travel at a different speed, so in the same time they have a different radius. The tangent wavefront changes direction, giving Snell’s law, sin θ₁/sin θ₂ = <i>v</i>₁/<i>v</i>₂.'], ['Diffraction', 'Only the part of the wavefront in the gap produces wavelets. The wavelets at the edges spread into the shadow, so the new wavefront bends round the edges. The effect is greatest when the gap is about the size of λ.'], ['Interference', 'Wavelets from two (or more) coherent sources overlap. Where crests meet crests the light is bright; where crests meet troughs it is dark.']])}
${fig(F.huySlit(), 'Figure 23.2: diffraction at a gap explained by Huygens’s wavelets.')}
${sim('ripple', 'Huygens wavelets: diffraction and interference', 'Each dot in the gap is a source of wavelets. With one slit you see diffraction: narrow the slit and the waves spread more. With two slits the wavelets from both gaps interfere and give bright and dark directions.')}
`)}

${sec('23-2', '23.2 Interference', `
${def('Coherent sources', `are sources that ${red('emit waves of the same frequency (wavelength) with a constant phase difference')}.`)}
${ul([`Two separate lamps are not coherent: each atom emits at random, so the phase difference changes all the time. Coherent sources are made by splitting light from one source: by two slits (division of wavefront) or by partial reflection at a thin film (division of amplitude).`, `A clear interference pattern also needs waves of roughly the same amplitude, so that the dark fringes are really dark.`])}
${table(['Constructive interference', 'Destructive interference'], [['the waves meet in phase (crest on crest)', 'the waves meet in antiphase (crest on trough)'], ['resultant amplitude = sum of the amplitudes: bright', 'resultant amplitude = difference (zero if equal): dark']])}
${h4('Path difference and optical path difference')}
${ul([`<b>Path difference</b>: the difference between the distances travelled by the two waves from their sources to the point.`, `A path difference of λ is a phase difference of 2π; a path difference of λ/2 is a phase difference of π. In general, Δφ = (2π/λ) × path difference.`, `<b>Optical path</b> = refractive index × geometric path, <i>nL</i>. In a medium of index <i>n</i> the wavelength is λ/<i>n</i>, so a length <i>L</i> holds as many waves as a length <i>nL</i> in a vacuum.`, `<b>Optical path difference</b> (OPD): the difference between the optical paths of the two waves. Use the OPD whenever the light goes through different media.`])}
${key(`constructive: OPD = <i>m</i>λ &nbsp;&nbsp;&nbsp; destructive: OPD = (<i>m</i> + ½)λ`, '<i>m</i> = 0, 1, 2, … for two coherent sources in phase; λ = wavelength in a vacuum')}
${example('23.2.1', `Light of wavelength 600 nm passes through a glass plate (<i>n</i> = 1.50) of thickness 2.0 μm, while a second beam travels the same distance in air. Find the optical path difference and the phase difference.`,
  steps([`OPD = (<i>n</i> − 1)<i>t</i> = (0.50)(2.0 × 10<sup>−6</sup>) = <b>1.0 × 10<sup>−6</sup> m</b>`, `Δφ = 2π × OPD/λ = 2π × (1.0 × 10<sup>−6</sup>)/(600 × 10<sup>−9</sup>) = <b>3.33π rad</b> (1.67 cycles)`]))}
`)}

${sec('23-3', '23.3 Two-slit interference pattern (Young’s experiment)', `
<p>In 1801 Thomas Young showed interference of light with two slits. It proved that light is a wave, and it lets us measure its wavelength.</p>
${fig(F.young(), 'Figure 23.3: the two slits S₁ and S₂ act as coherent sources. The path difference to P is a sin θ.')}
${ul([`Monochromatic light from one source falls on two narrow slits S₁ and S₂ a distance <i>a</i> apart. By diffraction, the light spreads out from each slit, and the two slits act as <b>coherent sources</b> in phase.`, `The waves overlap on a screen a distance <i>D</i> away. Where the path difference is a whole number of wavelengths they interfere constructively: a <b>bright fringe</b>. Where it is an odd number of half wavelengths: a <b>dark fringe</b>.`, `The result is a series of equally spaced, equally bright fringes.`])}
${h4('Derivation of the fringe separation')}
${steps([`For a distant screen (<i>D</i> ≫ <i>a</i>) the two rays are almost parallel. Path difference S₂P − S₁P = <i>a</i> sin θ.`, `Bright fringes: <i>a</i> sin θ = <i>m</i>λ; dark fringes: <i>a</i> sin θ = (<i>m</i> + ½)λ, <i>m</i> = 0, 1, 2, …`, `θ is small, so sin θ ≈ tan θ = ${fr('<i>x</i>', '<i>D</i>')}, where <i>x</i> is the distance of the fringe from the central maximum O.`, `Bright: <i>x<sub>m</sub></i> = ${fr('<i>m</i>λ<i>D</i>', '<i>a</i>')}; &nbsp; dark: <i>x<sub>m</sub></i> = (<i>m</i> + ½)${lD}`, `Separation of adjacent bright (or dark) fringes: Δ<i>x</i> = <i>x</i><sub><i>m</i>+1</sub> − <i>x<sub>m</sub></i> = ${lD}`])}
${key(`Δ<i>x</i> = ${lD}`, 'Δ<i>x</i> = fringe separation; λ = wavelength; <i>D</i> = slit-to-screen distance; <i>a</i> = slit separation (centre to centre). The central bright fringe is <i>m</i> = 0; the first dark fringe on each side is <i>m</i> = 0 in the dark-fringe formula.')}
${fig(F.pattern('two'), 'Figure 23.4: the two-slit pattern. All the bright fringes are about equally bright and equally spaced.')}
${table(['Change', 'Effect on Δ<i>x</i> = λ<i>D</i>/<i>a</i>'], [['longer wavelength (red instead of blue)', 'fringes further apart'], ['screen further away (larger <i>D</i>)', 'fringes further apart'], ['slits further apart (larger <i>a</i>)', 'fringes closer together'], ['apparatus in water', 'λ becomes λ/<i>n</i>: fringes closer together, more fringes seen'], ['white light', 'central fringe white; other fringes coloured (violet inside, red outside)'], ['light from one slit delayed by λ/2', 'bright and dark fringes swap places; the separation does not change'], ['thin transparent film over one slit', 'the whole pattern shifts towards that slit by (<i>n</i> − 1)<i>t</i>/λ fringes']])}
${sim('young', 'Young’s two-slit experiment', 'Change the wavelength, the slit separation and the screen distance, and measure the fringe separation. Then cover one slit, put the apparatus in water, or place a thin glass film over one slit and watch the pattern move.')}
${example('23.3.1', `Light of wavelength 550 nm falls on two slits 50 μm apart. The second-order bright fringe is 4.5 cm from the central maximum. How far is the screen from the slits?`,
  steps([`<i>x</i><sub>2</sub> = ${fr('2λ<i>D</i>', '<i>a</i>')} ⇒ 4.5 × 10<sup>−2</sup> = ${fr('2(550 × 10<sup>−9</sup>)<i>D</i>', '50 × 10<sup>−6</sup>')} ⇒ <i>D</i> = <b>2.0 m</b>`]))}
${example('23.3.2', `Light passes through two slits 0.050 mm apart. On a wall 1.0 m away, the second-order bright fringe is 2.4 cm from the central maximum. Find (a) the wavelength, (b) the distance between the second- and third-order bright fringes.`,
  steps([`(a) λ = ${fr('<i>x</i><sub>2</sub><i>a</i>', '2<i>D</i>')} = ${fr('(2.4 × 10<sup>−2</sup>)(0.050 × 10<sup>−3</sup>)', '2(1.0)')} = <b>6.0 × 10<sup>−7</sup> m</b>`, `(b) Δ<i>x</i> = ${lD} = ${fr('(6.0 × 10<sup>−7</sup>)(1.0)', '0.050 × 10<sup>−3</sup>')} = <b>1.2 × 10<sup>−2</sup> m</b>`]))}
${example('23.3.3', `Find the separation of two slits that gives the first dark fringe for 410 nm violet light at 45°.`,
  steps([`First dark fringe: <i>a</i> sin θ = ½λ ⇒ <i>a</i> = ${fr('0.5(410 nm)', 'sin 45°')} = <b>290 nm</b>`]))}
${card('STPM past-year · Section C', `Monochromatic light of frequency 6.00 × 10<sup>14</sup> Hz is used in a Young’s two-slit experiment. The fringe separation is 0.75 mm and the screen is 1.80 m from the slits. (i) Calculate the separation of the slits. [3] (ii) A thin film of glass (<i>n</i> = 1.50) is placed in front of one slit, and the original central bright fringe becomes the 10th bright fringe. Find the thickness of the film. [3] (iii) If one slit is covered, a single-slit pattern is seen with a central bright fringe 1.0 cm wide. Find the width of the slit. [3]`,
  steps([`λ = <i>c</i>/<i>f</i> = 3.00 × 10<sup>8</sup>/6.00 × 10<sup>14</sup> = 5.00 × 10<sup>−7</sup> m (do not put the frequency into the formula!)`, `(i) <i>a</i> = ${fr('λ<i>D</i>', 'Δ<i>x</i>')} = ${fr('(5.00 × 10<sup>−7</sup>)(1.80)', '0.75 × 10<sup>−3</sup>')} = <b>1.20 × 10<sup>−3</sup> m</b>`, `(ii) The film adds an optical path difference (<i>n</i> − 1)<i>t</i>. The central point is now the 10th bright fringe: (<i>n</i> − 1)<i>t</i> = 10λ ⇒ <i>t</i> = ${fr('10(5.00 × 10<sup>−7</sup>)', '0.50')} = <b>1.00 × 10<sup>−5</sup> m</b>`, `(iii) This is now single-slit diffraction: central width = 2λ<i>D</i>/<i>a</i> ⇒ <i>a</i> = ${fr('2(5.00 × 10<sup>−7</sup>)(1.80)', '1.0 × 10<sup>−2</sup>')} = <b>1.80 × 10<sup>−4</sup> m</b>`]))}
${tip(`Examiners’ report: many candidates used the thin-film formula in (ii) instead of the optical path difference (<i>n</i> − 1)<i>t</i>, and used the two-slit formula in (iii). Read which arrangement the question describes.`)}
`)}

${sec('23-4', '23.4 Interference in a thin film', `
<p>The colours of soap bubbles and oil films come from interference between light reflected from the <b>top</b> and the <b>bottom</b> surfaces of a thin transparent film (division of amplitude).</p>
${fig(F.film(), 'Figure 23.5: light incident almost normally on a film of thickness t and refractive index n.')}
${h4('Two things to consider')}
${ul([`<b>The extra path</b>: ray 2 travels an extra distance 2<i>t</i> inside the film, an optical path difference of <b>2<i>nt</i></b>.`, `<b>Phase change on reflection</b>: light reflected at a boundary with a medium of <b>higher</b> refractive index undergoes a phase change of π (equivalent to an extra λ/2). Reflection at a boundary with a <b>lower</b> refractive index gives no phase change.`])}
${table(['Situation', 'Phase changes', 'Bright (constructive)', 'Dark (destructive)'], [['soap film in air; oil film (<i>n</i> = 1.45) on water (<i>n</i> = 1.33)', 'one (at the top surface only)', '2<i>nt</i> = (<i>m</i> + ½)λ', '2<i>nt</i> = <i>m</i>λ'], ['coating (<i>n</i> = 1.38) on glass (<i>n</i> = 1.50)', 'two (at both surfaces), so they cancel', '2<i>nt</i> = <i>m</i>λ', '2<i>nt</i> = (<i>m</i> + ½)λ']])}
${note(`λ is the wavelength in air (vacuum). Writing 2<i>nt</i> is the same as comparing 2<i>t</i> with λ<sub><i>n</i></sub> = λ/<i>n</i>, the wavelength inside the film.`)}
${tip(`Count the phase changes first, then choose the formula. With one phase change, 2<i>nt</i> = <i>m</i>λ is <b>dark</b>, the opposite of the two-slit rule. A very thin film (<i>t</i> → 0) looks dark in reflected light: this is why a soap film turns black just before it bursts.`)}
${sim('thinfilm', 'Colours of a thin film', 'Change the thickness and refractive index of the film, and choose a soap film in air or an anti-reflection coating on glass. The graph shows which wavelengths are reflected strongly; the colour swatch is what you see.')}
${example('23.4.1', `A soap film (<i>n</i> = 1.33) in air is lit normally with white light. What is the minimum thickness that strongly reflects green light of wavelength 532 nm?`,
  steps([`One phase change (at the top surface). Bright: 2<i>nt</i> = (<i>m</i> + ½)λ`, `Minimum thickness, <i>m</i> = 0: <i>t</i> = ${fr('λ', '4<i>n</i>')} = ${fr('532', '4(1.33)')} = <b>100 nm</b>`]))}
${example('23.4.2', `Glass lenses (<i>n</i> = 1.50) are coated with a thin layer of magnesium fluoride (<i>n</i> = 1.38) to reduce reflection of light of wavelength 550 nm. Find the minimum thickness of the coating.`,
  steps([`Both reflections are from a denser medium (air → MgF₂, MgF₂ → glass): two phase changes, which cancel.`, `For no reflection, destructive: 2<i>nt</i> = (<i>m</i> + ½)λ. Minimum, <i>m</i> = 0: <i>t</i> = ${fr('λ', '4<i>n</i>')} = ${fr('550', '4(1.38)')} = <b>99.6 nm</b>`]))}
${example('23.4.3', `A thin oil film (<i>n</i> = 1.45) floats on water (<i>n</i> = 1.33). Viewed from above at normal incidence, it strongly reflects light of 600 nm and no other visible wavelength. What is the minimum thickness of the film?`,
  steps([`Top: air → oil (phase change). Bottom: oil → water, a less dense medium (no phase change). One phase change.`, `Bright: 2<i>nt</i> = (<i>m</i> + ½)λ ⇒ <i>t</i><sub>min</sub> = ${fr('λ', '4<i>n</i>')} = ${fr('600', '4(1.45)')} = <b>103 nm</b>`]))}
`)}

${sec('23-5', '23.5 Diffraction by a single slit', `
${def('Diffraction', `is ${red('the spreading of waves when they pass through an aperture or round the edge of an obstacle')}. It is the result of interference between wavelets from different points on the same wavefront.`)}
${fig(F.pattern('single'), 'Figure 23.6: the single-slit pattern. The central maximum is twice as wide as the others and much brighter.')}
${h4('Explaining the pattern')}
${ul([`<b>Central maximum</b>: straight ahead (θ = 0), all the wavelets from the slit travel the same distance and arrive in phase, so they interfere constructively.`, `<b>First minimum</b>: divide the slit into two halves. If the bottom edge is λ further from the screen than the top edge, each wavelet in the top half is λ/2 ahead of the matching wavelet in the bottom half. They cancel in pairs, so no light arrives.`, `Second minimum: divide the slit into four parts; neighbouring parts cancel. In general minima occur at <i>a</i> sin θ = <i>m</i>λ, <i>m</i> = ±1, ±2, …`, `Between the minima there are weaker secondary maxima, at about <i>a</i> sin θ ≈ (<i>m</i> + ½)λ.`])}
${fig(F.single(), 'Figure 23.7: the first minimum of a single slit of width a.')}
${key(`<i>a</i> sin θ = λ &nbsp; (first minimum) &nbsp;&nbsp;&nbsp; sin θ = ${fr('λ', '<i>a</i>')}`, '<i>a</i> = slit width. Position on a screen: <i>x</i> = <i>m</i>λ<i>D</i>/<i>a</i> for the <i>m</i>th minimum; width of the central maximum = 2λ<i>D</i>/<i>a</i>.')}
${table(['', 'Two-slit interference', 'Single-slit diffraction'], [['formula', '<i>a</i> sin θ = <i>m</i>λ gives a <b>bright</b> fringe (<i>a</i> = slit separation)', '<i>a</i> sin θ = <i>m</i>λ gives a <b>dark</b> fringe (<i>a</i> = slit width)'], ['brightness', 'the bright fringes are almost equally bright', 'the central maximum is much brighter than the others'], ['width', 'all fringes have equal width', 'the central maximum is twice as wide as the others'], ['cause', 'two coherent sources', 'wavelets from one slit cancel each other in pairs']])}
${tip(`The same-looking equation <i>a</i> sin θ = <i>m</i>λ means bright for two slits and a grating, but dark for a single slit. Always ask how many slits are interfering.`)}
${h4('Resolving power')}
${ul([`Because of diffraction, the image of a point source formed through an aperture is not a point but a small spread-out pattern. Two close sources may overlap so much that they cannot be seen as separate.`, `<b>Rayleigh’s criterion</b>: two sources are just resolved when the central maximum of one diffraction pattern falls on the first minimum of the other.`, `The smaller the angle θ between two sources that can still be resolved, the greater the resolving power.`])}
${fig(F.rayleigh(), 'Figure 23.8: two sources just resolved.')}
${key(`θ = ${fr('λ', '<i>a</i>')} (slit) &nbsp;&nbsp;&nbsp; θ = ${fr('1.22λ', '<i>a</i>')} (circular aperture of diameter <i>a</i>)`, 'θ in radians = minimum angle of resolution. A larger aperture or a shorter wavelength gives a smaller θ, i.e. better resolution. Blue light resolves finer detail than red.')}
${sim('singleslit', 'Single-slit diffraction and resolution', 'Change the slit width and the wavelength and watch the central maximum. Then switch on a second source and move the two sources closer until they are only just resolved.')}
${example('23.5.1', `Light of wavelength 550 nm falls on a single slit and produces its second minimum at 45.0°. Find (a) the slit width, (b) the angle of the first minimum.`,
  steps([`(a) <i>a</i> sin θ = 2λ ⇒ <i>a</i> = ${fr('2(550 × 10<sup>−9</sup>)', 'sin 45.0°')} = <b>1.56 × 10<sup>−6</sup> m</b>`, `(b) sin θ<sub>1</sub> = λ/<i>a</i> = 0.354 ⇒ θ<sub>1</sub> = <b>20.7°</b>`]))}
${example('23.5.2', `A single slit of width 0.140 mm is lit with monochromatic light. On a screen 2.00 m away, the second dark band is 16.0 mm from the centre of the central bright band. Find the wavelength.`,
  steps([`<i>x</i><sub>2</sub> = ${fr('2λ<i>D</i>', '<i>a</i>')} ⇒ λ = ${fr('(16.0 × 10<sup>−3</sup>)(0.140 × 10<sup>−3</sup>)', '2(2.00)')} = <b>560 nm</b>`]))}
${example('23.5.3', `Light of wavelength 450 nm falls on a slit. On a screen 2.0 m away the central maximum is 6.0 cm wide. Find (a) the slit width, (b) the approximate distance from the centre to the third bright fringe.`,
  steps([`(a) half-width <i>x</i><sub>1</sub> = 3.0 cm = λ<i>D</i>/<i>a</i> ⇒ <i>a</i> = ${fr('(450 × 10<sup>−9</sup>)(2.0)', '3.0 × 10<sup>−2</sup>')} = <b>3.0 × 10<sup>−5</sup> m</b>`, `(b) <i>x</i> ≈ (3 + ½)${lD} = 3.5 × 3.0 cm = <b>0.105 m</b>`]))}
${example('23.5.4', `The pupil of the eye has a diameter of 3.0 mm. Find the minimum angle of resolution for light of 550 nm, and the smallest separation of two points 25 m away that can be seen as separate.`,
  steps([`θ = ${fr('1.22λ', '<i>a</i>')} = ${fr('1.22(550 × 10<sup>−9</sup>)', '3.0 × 10<sup>−3</sup>')} = <b>2.2 × 10<sup>−4</sup> rad</b>`, `separation = <i>r</i>θ = 25 × 2.2 × 10<sup>−4</sup> = <b>5.6 mm</b>`]))}
`)}

${sec('23-6', '23.6 Diffraction gratings', `
<p>A <b>diffraction grating</b> has a very large number of equally spaced, parallel, narrow slits. A transmission grating can be made by ruling many fine lines on glass; a CD acts as a reflection grating.</p>
${ul([`<b>Grating spacing</b> <i>d</i> = distance between the centres of adjacent slits = 1/<i>N</i>, where <i>N</i> = number of lines per unit length. e.g. 5000 lines per cm: <i>d</i> = 1/5000 cm = 2.0 × 10<sup>−6</sup> m.`])}
${fig(F.grating(), 'Figure 23.9: monochromatic light gives sharp bright lines (orders) at definite angles.')}
${h4('Formation of the pattern and the grating equation')}
${ul([`Monochromatic light falls normally on the grating. By Huygens’s principle each slit acts as a source of secondary wavelets.`, `In most directions the wavelets from the many slits cancel. Only in directions where the path difference between wavelets from <b>adjacent</b> slits is a whole number of wavelengths do they all interfere constructively.`, `This gives very sharp, bright lines (principal maxima) with almost complete darkness between them, much sharper than with two slits.`])}
${fig(F.gratingPD(), 'Figure 23.10: the path difference between adjacent slits.')}
${key(`<i>d</i> sin θ = <i>m</i>λ`, '<i>m</i> = 0, 1, 2, … (order); since sin θ ≤ 1, the highest order is <i>m</i><sub>max</sub> ≤ <i>d</i>/λ (take the whole number below)')}
${h4('Spectrum of white light')}
${ul([`The zero order (θ = 0) is white, because every wavelength has θ = 0 there.`, `In every other order, each wavelength is diffracted at a different angle (sin θ = <i>m</i>λ/<i>d</i>), so the colours separate into a spectrum: violet nearest the centre, red furthest out.`, `Higher orders are more spread out and may overlap (e.g. the red of the 2nd order with the violet of the 3rd).`])}
${h4('Measuring wavelength with a grating')}
${steps([`Set up a spectrometer so that a parallel beam of the monochromatic light falls normally on the grating.`, `Turn the telescope to find the first-order line on each side, and read the angles. θ = half the angle between them (this removes a small error in setting the grating).`, `Calculate λ = <i>d</i> sin θ. Repeat for the second order and take an average.`])}
${sim('grating', 'Diffraction grating', 'Change the number of lines per mm and the wavelength, or choose white light. See the angles of each order and the highest order possible.')}
${example('23.6.1', `A grating with 300 lines per mm is illuminated normally with monochromatic light. The second-order maximum is at 18.9°. Find the wavelength.`,
  steps([`<i>d</i> = 1/300 mm = 3.33 × 10<sup>−6</sup> m`, `λ = ${fr('<i>d</i> sin θ', '<i>m</i>')} = ${fr('(3.33 × 10<sup>−6</sup>) sin 18.9°', '2')} = <b>5.40 × 10<sup>−7</sup> m</b>`]))}
${example('23.6.2', `Find the first- and second-order angles for light of 400 nm and 700 nm with a grating of 10 000 lines per cm.`,
  steps([`<i>d</i> = 1.0 × 10<sup>−6</sup> m`, `400 nm: θ<sub>1</sub> = sin<sup>−1</sup> 0.400 = <b>23.6°</b>; θ<sub>2</sub> = sin<sup>−1</sup> 0.800 = <b>53.1°</b>`, `700 nm: θ<sub>1</sub> = sin<sup>−1</sup> 0.700 = <b>44.4°</b>; second order: sin θ = 1.4 > 1, so there is <b>no</b> second order.`]))}
${example('23.6.3', `The first-order line of 550 nm light is at 12° from a grating. How far apart are the slits?`,
  steps([`<i>d</i> = ${fr('λ', 'sin 12°')} = ${fr('550 × 10<sup>−9</sup>', '0.208')} = <b>2.64 × 10<sup>−6</sup> m</b>`]))}
${example('23.6.4', `How many bright lines are produced when a grating of spacing 2.00 × 10<sup>−6</sup> m is illuminated normally with light of 6.44 × 10<sup>−7</sup> m?`,
  steps([`<i>m</i> ≤ ${fr('<i>d</i>', 'λ')} = 3.11 ⇒ <i>m</i><sub>max</sub> = 3`, `Lines: orders 0, ±1, ±2, ±3 = <b>7</b> bright lines`]))}
${card('STPM past-year · Section C', `Explain, with the aid of a diagram, the production of bright fringes in a diffraction grating by using Huygens’s principle. [4]`,
  ul([`Every point on the wavefront at each slit acts as a source of secondary wavelets.`, `The new wavefront is the line touching the wavelets; it bends round the edges of each slit (diffraction).`, `The diffracted waves from all the slits overlap and interfere.`, `Where the path difference between adjacent slits is <i>m</i>λ, the waves are in phase and give a bright fringe. (Draw at least three slits with circular wavelets, and new wavefronts in two different directions.)`]))}
`)}

${sec('23-7', '23.7 Polarisation', `
${ul([`Light is a transverse electromagnetic wave: its electric field <i>E</i> vibrates perpendicular to the direction of travel.`, `In <b>unpolarised</b> light (sunlight, a lamp) the electric field vibrates in all directions perpendicular to the direction of travel.`, `In <b>plane-polarised</b> light the electric field vibrates in one plane only.`, `Only transverse waves can be polarised. Polarisation is evidence that light is a transverse wave; sound (longitudinal) cannot be polarised.`])}
${h4('Polarisation by a polariser')}
${ul([`A polariser (e.g. Polaroid sheet) has long-chain molecules aligned in one direction, giving it a <b>transmission axis</b>. Only the component of <i>E</i> parallel to the axis passes; the perpendicular component is absorbed.`, `Unpolarised light through one polariser becomes plane-polarised, and its intensity is halved: <i>I</i> = <i>I</i><sub>0</sub>/2.`])}
${fig(F.polar(), 'Figure 23.11: a polariser and an analyser.')}
${def('Malus’s law', `states that ${red('when plane-polarised light of intensity <i>I</i><sub>0</sub> passes through an analyser whose transmission axis is at angle θ to the plane of polarisation, the transmitted intensity is <i>I</i> = <i>I</i><sub>0</sub> cos² θ')}.`)}
${key(`<i>I</i> = <i>I</i><sub>0</sub> cos<sup>2</sup> θ`, 'θ = 0°: all the light passes; θ = 90° (crossed): no light passes. The amplitude transmitted is <i>E</i><sub>0</sub> cos θ, and <i>I</i> ∝ <i>E</i><sup>2</sup>.')}
${sim('malus', 'Polariser and analyser', 'Turn the analyser and watch the transmitted intensity follow I = I₀ cos²θ. Add a third polariser between two crossed ones: light gets through again.')}
${example('23.7.1', `Unpolarised light of intensity <i>I</i><sub>0</sub> passes through two polarisers whose axes are at 30° to each other. Find the transmitted intensity.`,
  steps([`After the first polariser: <i>I</i><sub>1</sub> = <i>I</i><sub>0</sub>/2`, `After the second: <i>I</i> = <i>I</i><sub>1</sub> cos<sup>2</sup> 30° = (<i>I</i><sub>0</sub>/2)(0.75) = <b>0.375<i>I</i><sub>0</sub></b>`]))}
${example('23.7.2', `Two polarisers are crossed (90°). A third polariser is placed between them with its axis at 45° to the first. Unpolarised light of intensity <i>I</i><sub>0</sub> enters. Find the intensity that emerges.`,
  steps([`<i>I</i><sub>1</sub> = <i>I</i><sub>0</sub>/2; &nbsp; <i>I</i><sub>2</sub> = <i>I</i><sub>1</sub> cos<sup>2</sup> 45° = <i>I</i><sub>0</sub>/4; &nbsp; <i>I</i><sub>3</sub> = <i>I</i><sub>2</sub> cos<sup>2</sup> 45° = <b><i>I</i><sub>0</sub>/8</b>`, `Without the middle polariser no light would pass.`]))}
${h4('Polarisation by reflection: Brewster’s law')}
${ul([`Unpolarised light reflected from glass or water is partially polarised.`, `At one angle of incidence, the <b>Brewster angle</b> θ<sub>B</sub>, the reflected light is completely plane-polarised (vibrating parallel to the surface). At this angle the reflected and refracted rays are perpendicular.`])}
${fig(F.brewster(), 'Figure 23.12: at the Brewster angle the reflected and refracted rays are at 90°.')}
${steps([`Reflected ⊥ refracted: θ<sub>B</sub> + 90° + θ<sub>2</sub> = 180° ⇒ θ<sub>2</sub> = 90° − θ<sub>B</sub>`, `Snell’s law: <i>n</i><sub>1</sub> sin θ<sub>B</sub> = <i>n</i><sub>2</sub> sin (90° − θ<sub>B</sub>) = <i>n</i><sub>2</sub> cos θ<sub>B</sub>`])}
${key(`tan θ<sub>B</sub> = ${fr('<i>n</i><sub>2</sub>', '<i>n</i><sub>1</sub>')}`, 'Brewster’s law')}
${example('23.7.3', `Unpolarised light in air strikes glass (<i>n</i> = 1.50). Find the Brewster angle and the angle of refraction.`,
  steps([`tan θ<sub>B</sub> = 1.50 ⇒ θ<sub>B</sub> = <b>56.3°</b>`, `θ<sub>2</sub> = 90° − 56.3° = <b>33.7°</b> (check: sin 56.3° = 1.50 sin 33.7° ✓)`]))}
${h4('Uses of polarisation')}
${ul([`Polaroid sunglasses cut glare: light reflected from water and roads is mostly horizontally polarised, and the lenses block it.`, `LCD screens use two polarisers with liquid crystal between them to control each pixel.`, `Photography filters reduce reflections and darken blue sky; stress analysis shows strain patterns in transparent models; 3-D cinema glasses send a different image to each eye.`])}
`)}

${sec('23-8', '23.8 Optical waveguides', `
${ul([`<b>Total internal reflection</b>: when light in a denser medium hits the boundary with a less dense medium at an angle greater than the critical angle <i>c</i> (sin <i>c</i> = <i>n</i><sub>2</sub>/<i>n</i><sub>1</sub>), all the light is reflected.`, `An optical fibre has a glass <b>core</b> of higher refractive index <i>n</i><sub>1</sub> surrounded by a <b>cladding</b> of lower index <i>n</i><sub>2</sub>.`, `Light entering within the acceptance angle strikes the core–cladding boundary at more than the critical angle and is totally internally reflected again and again. It is guided along the core with very little loss, even round gentle bends.`, `The cladding protects the core surface and stops light leaking into a neighbouring fibre.`])}
${fig(F.fibre(), 'Figure 23.13: light guided along an optical fibre by repeated total internal reflection.')}
${table(['Application', 'How fibres are used'], [['Telecommunications', 'telephone, television and internet signals travel as light pulses: high bandwidth, low loss, no electrical interference'], ['Medicine', 'endoscopes let doctors see inside the body; fibres also carry laser light for surgery'], ['Sensing', 'changes in the light show changes in temperature, pressure or strain'], ['Others', 'decorative lighting, inspection cameras in hard-to-reach places']])}
${example('23.8.1', `An optical fibre has a core of refractive index 1.50 and cladding of refractive index 1.45. Find the critical angle at the core–cladding boundary.`,
  steps([`sin <i>c</i> = ${fr('1.45', '1.50')} = 0.967 ⇒ <i>c</i> = <b>75.2°</b>`, `Light must hit the boundary at more than 75.2° to the normal to be guided.`]))}
`)}

${sec('23-9', 'Summary', `
${table(['Situation', 'Formula', '<i>m</i>λ means', '(<i>m</i> + ½)λ means'], [['Two slits (Young)', '<i>a</i> sin θ = <i>m</i>λ, Δ<i>x</i> = λ<i>D</i>/<i>a</i>', 'bright', 'dark'], ['Diffraction grating', '<i>d</i> sin θ = <i>m</i>λ', 'bright line', '—'], ['Single slit', '<i>a</i> sin θ = <i>m</i>λ', '<b>dark</b>', 'bright (approx.)'], ['Thin film, one phase change', '2<i>nt</i>', '<b>dark</b>', 'bright'], ['Thin film, two phase changes', '2<i>nt</i>', 'bright', 'dark'], ['Polarisation', '<i>I</i> = <i>I</i><sub>0</sub> cos² θ; tan θ<sub>B</sub> = <i>n</i><sub>2</sub>/<i>n</i><sub>1</sub>', '—', '—']])}
${exercises('Exercises', [
  { q: `State two differences between a two-slit interference pattern and a single-slit diffraction pattern.`, a: `Two-slit: bright fringes of almost equal intensity and equal width. Single slit: the central maximum is much brighter than the others and twice as wide.` },
  { q: `In a Young’s experiment with light of 589 nm, the slits are 0.20 mm apart and the screen is 1.5 m away. Find the fringe separation. What happens to it if the apparatus is put in water (<i>n</i> = 1.33)?`, a: `Δ<i>x</i> = 4.4 mm; in water λ → λ/1.33, so Δ<i>x</i> = 3.3 mm` },
  { q: `A grating has 600 lines per mm. Find the highest order for light of 500 nm.`, a: `<i>d</i>/λ = 3.33 ⇒ third order` },
  { q: `Unpolarised light passes through two polarisers. The transmitted intensity is 1/8 of the incident intensity. Find the angle between the axes.`, a: `cos² θ = 1/4 ⇒ θ = 60°` },
  { q: `Find the Brewster angle for light in air reflected from water (<i>n</i> = 1.33).`, a: `53.1°` }])}
`)}
`;
  window.PhysiQLessons.register('LESSON-S3-23', { html: () => S });

  // ===================== simulations =====================
  const TAU = 2 * Math.PI;
  function rgbOf(nm) { // approximate colour of a wavelength (380–750 nm)
    let r = 0, g = 0, b = 0;
    if (nm < 440) { r = -(nm - 440) / 60; b = 1; } else if (nm < 490) { g = (nm - 440) / 50; b = 1; } else if (nm < 510) { g = 1; b = -(nm - 510) / 20; } else if (nm < 580) { r = (nm - 510) / 70; g = 1; } else if (nm < 645) { r = 1; g = -(nm - 645) / 65; } else r = 1;
    const f = nm < 420 ? 0.3 + 0.7 * (nm - 380) / 40 : nm > 700 ? 0.3 + 0.7 * (750 - nm) / 50 : 1;
    return [r * f, g * f, b * f].map(x => Math.max(0, Math.min(1, x)));
  }
  const css = (c, a = 1) => `rgba(${Math.round(c[0] * 255)},${Math.round(c[1] * 255)},${Math.round(c[2] * 255)},${a})`;

  // ---------- 1. ripple tank: wavelets from one or two slits ----------
  window.PhysiQSims.add('ripple', function (root) {
    const { COL, el, slider, button, canvas, text, loop } = window.PhysiQSims.U;
    const S = { mode: 1, lam: 14, w: 20, sep: 60, t: 0, play: true };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const b1 = button(pre, 'single slit', 'sm-chip on', () => { S.mode = 1; b1.classList.add('on'); b2.classList.remove('on'); }), b2 = button(pre, 'two slits', 'sm-chip', () => { S.mode = 2; b2.classList.add('on'); b1.classList.remove('on'); });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'wavelength', 8, 24, 1, S.lam, 'units', v => { S.lam = v; });
    slider(ctl, 'slit width', 4, 70, 1, S.w, 'units', v => { S.w = v; });
    slider(ctl, 'slit separation (two slits)', 30, 100, 2, S.sep, 'units', v => { S.sep = v; });
    const cv = canvas(root);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const pb = button(bar, '❚❚ Pause', 'sm-main', () => { S.play = !S.play; pb.textContent = S.play ? '❚❚ Pause' : '▶ Play'; });
    let off = document.createElement('canvas');
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.55, 260, 400), gx = Math.max(110, Math.round(w / 3)), gy = Math.round(gx * h / w), sc = w / gx;
      off.width = gx; off.height = gy; const oc = off.getContext('2d'), img = oc.createImageData(gx, gy), D = img.data;
      const wallX = gx * 0.22, cy = gy / 2, k = TAU / (S.lam / sc), om = 3.0, ph = om * S.t;
      const src = []; const centres = S.mode === 1 ? [cy] : [cy - S.sep / sc / 2, cy + S.sep / sc / 2];
      centres.forEach(c => { const n = Math.max(2, Math.round(S.w / sc / 1.5)); for (let i = 0; i < n; i++) src.push(c - S.w / sc / 2 + (S.w / sc) * (i + 0.5) / n); });
      for (let y = 0; y < gy; y++) for (let x = 0; x < gx; x++) {
        let v = 0;
        if (x < wallX) v = Math.cos(k * (x - wallX) - ph) * 0.9;
        else { let re = 0; for (const sy of src) { const r = Math.hypot(x - wallX, y - sy) + 0.5; re += Math.cos(k * r - ph) / Math.sqrt(r); } v = re / src.length * 2.2; }
        const i = (y * gx + x) * 4, val = Math.max(-1, Math.min(1, v));
        D[i] = 30 + 70 * (val + 1); D[i + 1] = 60 + 90 * (val + 1); D[i + 2] = 120 + 65 * (val + 1); D[i + 3] = 255;
      }
      oc.putImageData(img, 0, 0); ctx.imageSmoothingEnabled = true; ctx.drawImage(off, 0, 0, w, h);
      // wall
      ctx.fillStyle = '#2B2F36'; const wx = wallX * sc; let yPrev = 0;
      const gaps = centres.map(c => [c * sc - S.w / 2, c * sc + S.w / 2]).sort((a, b) => a[0] - b[0]);
      gaps.forEach(([a, b]) => { ctx.fillRect(wx - 3, yPrev, 6, Math.max(0, a - yPrev)); yPrev = b; }); ctx.fillRect(wx - 3, yPrev, 6, h - yPrev);
      src.forEach(sy => { ctx.fillStyle = '#FFD24A'; ctx.beginPath(); ctx.arc(wx, sy * sc, 2.4, 0, 7); ctx.fill(); });
      text(ctx, S.mode === 1 ? (S.w < S.lam * 1.5 ? 'slit about λ wide: waves spread widely' : 'wide slit: little spreading') : 'two coherent sources: bright and dark directions', w - 10, 18, { a: 'right', b: 1, fs: 12, c: '#fff' });
    }
    loop(cv, dt => { if (S.play) S.t += dt; draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // shared: draw a screen pattern given intensity function of x (m)
  function screenPattern(ctx, w, y0, hh, xr, I, col) {
    for (let i = 0; i < w; i++) { const x = -xr + 2 * xr * i / w, v = Math.max(0, Math.min(1, I(x))); ctx.fillStyle = css(col, v); ctx.fillRect(i, y0, 1.2, hh); }
  }

  // ---------- 2. Young's two slits ----------
  window.PhysiQSims.add('young', function (root) {
    const { COL, fmt, el, slider, toggle, canvas, text, readouts } = window.PhysiQSims.U;
    const S = { lam: 600, a: 0.30, D: 1.5, water: false, cover: false, film: 0 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'wavelength λ', 400, 700, 5, S.lam, 'nm', v => { S.lam = v; draw(); });
    slider(ctl, 'slit separation <i>a</i>', 0.1, 1.0, 0.02, S.a, 'mm', v => { S.a = v; draw(); });
    slider(ctl, 'screen distance <i>D</i>', 0.5, 3, 0.1, S.D, 'm', v => { S.D = v; draw(); });
    slider(ctl, 'glass film on S₁: thickness', 0, 10, 0.5, S.film, 'μm', v => { S.film = v; draw(); });
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    toggle(bar, 'Apparatus in water', S.water, v => { S.water = v; draw(); });
    toggle(bar, 'Cover one slit', S.cover, v => { S.cover = v; draw(); });
    const cv = canvas(root); const ro = readouts(root), slitW = 0.06e-3;
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.42, 220, 320); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const n = S.water ? 1.33 : 1, lam = S.lam * 1e-9 / n, a = S.a * 1e-3, dx = lam * S.D / a, xr = 0.012, col = rgbOf(S.lam);
      const shiftCycles = S.film * 1e-6 * 0.5 / (S.lam * 1e-9), shift = shiftCycles * dx; // pattern moves towards the covered slit (up)
      const env = x => { const b = Math.PI * slitW * x / (lam * S.D); return Math.abs(b) < 1e-9 ? 1 : (Math.sin(b) / b) ** 2; };
      const I = S.cover ? env : x => env(x) * Math.cos(Math.PI * (x - shift) / dx) ** 2;
      ctx.fillStyle = '#111'; ctx.fillRect(0, 26, w, 54); screenPattern(ctx, w, 26, 54, xr, I, col);
      const X = x => (x + xr) / (2 * xr) * w, gy = h - 24, gh = h - 120;
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
      ctx.strokeStyle = css(col.map(c => c * 0.8)); ctx.lineWidth = 2.2; ctx.beginPath(); for (let i = 0; i <= w; i++) { const x = -xr + 2 * xr * i / w, y = gy - I(x) * gh; i ? ctx.lineTo(i, y) : ctx.moveTo(i, y); } ctx.stroke();
      ctx.strokeStyle = COL.sub; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(X(0), 20); ctx.lineTo(X(0), gy); ctx.stroke(); ctx.setLineDash([]);
      text(ctx, 'O (centre line)', X(0) + 4, 18, { fs: 11, c: COL.sub });
      if (!S.cover) { const xa = X(shift), xb = X(shift + dx); ctx.strokeStyle = COL.ink; ctx.beginPath(); ctx.moveTo(xa, 88); ctx.lineTo(xb, 88); ctx.stroke(); text(ctx, 'Δx', (xa + xb) / 2, 100, { a: 'center', it: 1, b: 1 }); }
      text(ctx, 'screen: ±12 mm', w - 6, h - 6, { a: 'right', fs: 10, c: COL.sub });
      ro(S.cover ? [['pattern', 'single-slit diffraction'], ['central maximum width 2λD/w', fmt(2 * lam * S.D / slitW * 1000, 1) + ' mm', 'hl'], ['slit width w', '0.06 mm']] :
        [['λ in the medium', fmt(lam * 1e9, 0) + ' nm'], ['fringe separation Δx = λD/a', fmt(dx * 1000, 2) + ' mm', 'hl'], ['pattern shift by the film', S.film ? fmt(shiftCycles, 1) + ' fringes' : 'none'], ['colour', S.lam < 450 ? 'violet' : S.lam < 495 ? 'blue' : S.lam < 570 ? 'green' : S.lam < 590 ? 'yellow' : S.lam < 620 ? 'orange' : 'red']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 3. thin film colours ----------
  window.PhysiQSims.add('thinfilm', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts } = window.PhysiQSims.U;
    const S = { t: 300, n: 1.33, two: false };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const c1 = button(pre, 'soap film in air (one phase change)', 'sm-chip on', () => { S.two = false; S.n = 1.33; sn.set(1.33); c1.classList.add('on'); c2.classList.remove('on'); draw(); });
    const c2 = button(pre, 'coating on glass (two phase changes)', 'sm-chip', () => { S.two = true; S.n = 1.38; sn.set(1.38); c2.classList.add('on'); c1.classList.remove('on'); draw(); });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'thickness <i>t</i>', 0, 800, 5, S.t, 'nm', v => { S.t = v; draw(); });
    const sn = slider(ctl, 'refractive index <i>n</i>', 1.2, 1.7, 0.01, S.n, '', v => { S.n = v; draw(); });
    const cv = canvas(root); const ro = readouts(root);
    const R = (lam) => { const d = 2 * S.n * S.t / lam + (S.two ? 0 : 0.5); return Math.cos(Math.PI * d) ** 2; }; // relative reflected intensity
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.45, 230, 320); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const box = { x: 44, y: 20, w: w - 150, h: h - 60 }, X = l => box.x + (l - 380) / 370 * box.w, Y = v => box.y + box.h - v * box.h;
      for (let l = 380; l <= 750; l += 2) { ctx.fillStyle = css(rgbOf(l), 0.35); ctx.fillRect(X(l), box.y + box.h + 4, box.w / 185 + 1, 8); }
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(box.x, box.y); ctx.lineTo(box.x, box.y + box.h); ctx.lineTo(box.x + box.w, box.y + box.h); ctx.stroke();
      ctx.strokeStyle = COL.v; ctx.lineWidth = 2.4; ctx.beginPath(); for (let l = 380; l <= 750; l += 2) { l > 380 ? ctx.lineTo(X(l), Y(R(l))) : ctx.moveTo(X(l), Y(R(l))); } ctx.stroke();
      text(ctx, 'reflected intensity', box.x, box.y - 6, { fs: 11, b: 1 }); text(ctx, 'λ / nm', box.x + box.w, box.y + box.h + 26, { a: 'right', fs: 11, c: COL.sub }); [400, 500, 600, 700].forEach(l => text(ctx, l, X(l), box.y + box.h + 24, { a: 'center', fs: 10, c: COL.sub }));
      // perceived colour
      let r = 0, g = 0, b = 0, n = 0; for (let l = 400; l <= 700; l += 5) { const c = rgbOf(l), k = R(l); r += c[0] * k; g += c[1] * k; b += c[2] * k; n++; }
      const m = Math.max(r, g, b, 1e-6), bright = Math.min(1, m / (n * 0.35)), col = [r / m * bright, g / m * bright, b / m * bright];
      ctx.fillStyle = css(col); ctx.fillRect(w - 92, box.y + 10, 76, 76); ctx.strokeStyle = COL.ink; ctx.strokeRect(w - 92, box.y + 10, 76, 76); text(ctx, 'colour seen', w - 54, box.y + 102, { a: 'center', fs: 11 });
      let best = 380, bv = -1; for (let l = 380; l <= 750; l++) if (R(l) > bv) { bv = R(l); best = l; }
      ro([['optical path difference 2nt', fmt(2 * S.n * S.t, 0) + ' nm', 'hl'], ['bright when', S.two ? '2nt = mλ' : '2nt = (m + ½)λ'], ['strongest visible reflection', fmt(best, 0) + ' nm'], ['note', S.t < 30 ? (S.two ? 'very thin coating: reflects like bare glass' : 'very thin film: dark (black film)') : '']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 4. single slit and resolution ----------
  window.PhysiQSims.add('singleslit', function (root) {
    const { COL, fmt, el, slider, toggle, canvas, text, readouts } = window.PhysiQSims.U;
    const S = { a: 0.10, lam: 600, two: false, sep: 6 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'slit width <i>a</i>', 0.03, 0.4, 0.01, S.a, 'mm', v => { S.a = v; draw(); });
    slider(ctl, 'wavelength λ', 400, 700, 5, S.lam, 'nm', v => { S.lam = v; draw(); });
    slider(ctl, 'angle between two sources', 0.5, 15, 0.5, S.sep, 'mrad', v => { S.sep = v; draw(); });
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar); toggle(bar, 'Two sources', S.two, v => { S.two = v; draw(); });
    const cv = canvas(root); const ro = readouts(root), Dd = 1.0, xr = 0.03;
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.42, 220, 320); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const lam = S.lam * 1e-9, a = S.a * 1e-3, col = rgbOf(S.lam), f = (x, c) => { const b = Math.PI * a * (x - c) / (lam * Dd); return Math.abs(b) < 1e-9 ? 1 : (Math.sin(b) / b) ** 2; };
      const off = S.two ? S.sep * 1e-3 * Dd / 2 : 0, I = x => S.two ? Math.min(1, f(x, -off) + f(x, off)) : f(x, 0);
      ctx.fillStyle = '#111'; ctx.fillRect(0, 20, w, 50); screenPattern(ctx, w, 20, 50, xr, I, col);
      const gy = h - 20, gh = h - 110; ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
      const plot = (fn, c, lw) => { ctx.strokeStyle = c; ctx.lineWidth = lw; ctx.beginPath(); for (let i = 0; i <= w; i++) { const x = -xr + 2 * xr * i / w, y = gy - fn(x) * gh; i ? ctx.lineTo(i, y) : ctx.moveTo(i, y); } ctx.stroke(); };
      if (S.two) { plot(x => f(x, -off), 'rgba(106,99,236,.8)', 1.6); plot(x => f(x, off), 'rgba(242,102,27,.8)', 1.6); plot(x => f(x, -off) + f(x, off), COL.ink, 1.2); } else plot(I, css(col.map(c => c * 0.8)), 2.4);
      const thR = lam / a; const resolved = S.sep * 1e-3 >= thR * 0.999;
      if (S.two) text(ctx, resolved ? (S.sep * 1e-3 < thR * 1.15 ? 'just resolved (Rayleigh)' : 'resolved') : 'not resolved: the images merge', w - 8, 14, { a: 'right', b: 1, fs: 12, c: resolved ? COL.gr : COL.r });
      ro([['first minimum: sin θ = λ/a', fmt(thR * 1000, 2) + ' mrad', 'hl'], ['central maximum width (D = 1 m)', fmt(2 * lam * Dd / a * 1000, 1) + ' mm', 'hl'], ['minimum resolvable angle θ = λ/a', fmt(thR * 1000, 2) + ' mrad']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 5. diffraction grating ----------
  window.PhysiQSims.add('grating', function (root) {
    const { COL, fmt, el, slider, toggle, canvas, text, readouts } = window.PhysiQSims.U;
    const S = { N: 300, lam: 550, white: false };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'lines per mm <i>N</i>', 100, 1200, 50, S.N, '', v => { S.N = v; draw(); });
    slider(ctl, 'wavelength λ', 400, 700, 5, S.lam, 'nm', v => { S.lam = v; draw(); });
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar); toggle(bar, 'White light', S.white, v => { S.white = v; draw(); });
    const cv = canvas(root); const ro = readouts(root);
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.5, 240, 360); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#16191F'; ctx.fillRect(0, 0, w, h);
      const d = 1e-3 / S.N, gx = 40, gy = h / 2, R = Math.min(w - 150, h / 2 - 16);
      ctx.fillStyle = '#9AA'; ctx.fillRect(gx - 3, gy - 60, 6, 120); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(gx, gy); ctx.stroke();
      const lams = S.white ? Array.from({ length: 31 }, (_, i) => 400 + i * 10) : [S.lam];
      let maxm = Math.floor(d / (S.lam * 1e-9)), rows = [];
      lams.forEach(l => { const lam = l * 1e-9; for (let m = -6; m <= 6; m++) { const s = m * lam / d; if (Math.abs(s) >= 1) continue; const th = Math.asin(s); ctx.strokeStyle = m === 0 ? 'rgba(255,255,255,.9)' : css(rgbOf(l), S.white ? 0.7 : 1); ctx.lineWidth = S.white ? 1.2 : 2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + R * Math.cos(th), gy - R * Math.sin(th)); ctx.stroke(); } });
      if (!S.white) for (let m = 0; m <= maxm; m++) { const th = Math.asin(m * S.lam * 1e-9 / d); if (maxm <= 4) text(ctx, 'm = ' + m + (m ? ' (' + fmt(th * 180 / Math.PI, 1) + '°)' : ''), gx + (R + 6) * Math.cos(th), gy - (R + 6) * Math.sin(th) + 4, { a: 'start', fs: 11, c: '#fff', b: 1 }); rows.push(['order ' + m, fmt(th * 180 / Math.PI, 1) + '°']); }
      else text(ctx, 'zero order white; each order is a spectrum, violet inside, red outside', w - 8, 16, { a: 'right', fs: 11, c: '#fff' });
      ro([['d = 1/N', fmt(d * 1e6, 3) + ' μm', 'hl'], ['highest order m ≤ d/λ', S.white ? 'depends on λ' : String(maxm) + ' (d/λ = ' + fmt(d / (S.lam * 1e-9), 2) + ')', 'hl'], ['number of lines seen', S.white ? '—' : String(2 * maxm + 1)]].concat(rows.slice(1, 4)));
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 6. Malus's law ----------
  window.PhysiQSims.add('malus', function (root) {
    const { COL, fmt, el, slider, toggle, canvas, text, readouts } = window.PhysiQSims.U;
    const S = { th: 30, mid: false, phi: 45 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'analyser angle θ', 0, 180, 1, S.th, '°', v => { S.th = v; draw(); });
    slider(ctl, 'middle polariser angle', 0, 90, 1, S.phi, '°', v => { S.phi = v; draw(); });
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar); toggle(bar, 'Add a middle polariser', S.mid, v => { S.mid = v; draw(); });
    const cv = canvas(root); const ro = readouts(root);
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.42, 220, 300); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const r = Math.PI / 180, I1 = 0.5, I2 = S.mid ? I1 * Math.cos(S.phi * r) ** 2 : I1, I3 = S.mid ? I2 * Math.cos((S.th - S.phi) * r) ** 2 : I1 * Math.cos(S.th * r) ** 2;
      const cy = h * 0.45, disks = S.mid ? [[0.3, 0], [0.55, S.phi], [0.8, S.th]] : [[0.33, 0], [0.7, S.th]];
      // beam
      const seg = (x1, x2, I) => { ctx.fillStyle = `rgba(242,180,40,${0.15 + 0.85 * I})`; ctx.fillRect(x1, cy - 14, x2 - x1, 28); };
      const xs = [10].concat(disks.map(d => d[0] * w)).concat([w - 10]), Is = [1, I1].concat(S.mid ? [I2, I3] : [I3]);
      for (let i = 0; i < xs.length - 1; i++) seg(xs[i], xs[i + 1], Is[i]);
      disks.forEach(([fx, ang], i) => { const x = fx * w; ctx.fillStyle = 'rgba(200,220,240,.85)'; ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.ellipse(x, cy, 14, 52, 0, 0, 7); ctx.fill(); ctx.stroke();
        const a = (90 - ang) * r; ctx.strokeStyle = COL.r; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(x - 12 * Math.cos(a), cy - 46 * Math.sin(a)); ctx.lineTo(x + 12 * Math.cos(a), cy + 46 * Math.sin(a)); ctx.stroke();
        text(ctx, i === 0 ? 'polariser (0°)' : i === disks.length - 1 ? 'analyser (' + fmt(ang, 0) + '°)' : 'middle (' + fmt(ang, 0) + '°)', x, cy + 72, { a: 'center', fs: 11 }); });
      text(ctx, 'I₀ unpolarised', 12, cy - 22, { fs: 11 }); text(ctx, 'out: ' + fmt(I3 * 100, 1) + '% of I₀', w - 10, cy - 22, { a: 'right', b: 1, fs: 12, c: COL.r });
      // small graph I vs θ
      const gx = 40, gy = h - 14, gw = w - 60, gh = 34; ctx.strokeStyle = COL.sub; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
      ctx.strokeStyle = COL.v; ctx.lineWidth = 1.8; ctx.beginPath(); for (let i = 0; i <= 180; i++) { const v = S.mid ? Math.cos(S.phi * r) ** 2 * Math.cos((i - S.phi) * r) ** 2 : Math.cos(i * r) ** 2, x = gx + gw * i / 180, y = gy - v * gh; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
      const vx = gx + gw * S.th / 180, vv = S.mid ? Math.cos(S.phi * r) ** 2 * Math.cos((S.th - S.phi) * r) ** 2 : Math.cos(S.th * r) ** 2; ctx.fillStyle = COL.r; ctx.beginPath(); ctx.arc(vx, gy - vv * gh, 4, 0, 7); ctx.fill();
      ro([['after the first polariser', '½ I₀', ''], ['I = I₀ cos²θ', S.mid ? 'applied twice' : fmt(Math.cos(S.th * r) ** 2, 3) + ' × (½ I₀)', 'hl'], ['transmitted', fmt(I3, 3) + ' I₀', 'hl']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });
})();
