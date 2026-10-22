/* Semester 3 Chapter 24 Quantum Physics: full notes by Cikgu Suhaili (from STPM_2026_UNIT_24_QUANTUM_PHYSICS.pptx).
   App chapter 24 = STPM 2026 syllabus chapter 25. h = 6.63 × 10⁻³⁴ J s, e = 1.60 × 10⁻¹⁹ C, mₑ = 9.11 × 10⁻³¹ kg. */
(function () {
  'use strict';
  const { card, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4, pq, half } = window.PhysiQLessons.H;
  const ms = 'm&#8239;s<sup>−1</sup>', e0 = 'ε<sub>0</sub>';

  // ---------- figures ----------
  const F = {};
  F.bb = () => { const plk = (l, Tk) => 1 / (Math.pow(l, 5) * (Math.exp(1.4388e-2 / (l * Tk)) - 1)); const m = plk(2.898e-3 / 6000, 6000);
    let body = axes(40, 160, 300, 145, 'λ', 'I', { noO: 1 });
    [[6000, C.v], [5000, C.g], [4000, C.r]].forEach(([Tk, c]) => { let d = ''; for (let i = 1; i <= 120; i++) { const l = i * 25e-9; d += (i > 1 ? ' L' : 'M') + (40 + i * 2.4).toFixed(1) + ',' + (160 - plk(l, Tk) / m * 130).toFixed(1); } body += P(d, c, { w: 2.2 }); });
    body += P('M70,12 C80,90 110,140 330,156', 'sub', { w: 1.6, d: '5 4' }) + T(96, 30, 'classical prediction', { fs: 11, c: C.sub, a: 'start' }) + T(140, 52, '6000 K', { fs: 11, c: C.v, a: 'start' }) + T(186, 100, '5000 K', { fs: 11, c: C.g, a: 'start' }) + T(240, 130, '4000 K', { fs: 11, c: C.r, a: 'start' });
    return svg(360, 180, body, 380); };
  F.tube = () => svg(380, 210, `<path d="M40,40 Q40,20 70,20 L310,20 Q340,20 340,40 L340,120 Q340,140 310,140 L70,140 Q40,140 40,120 Z" fill="#F1F6FB" stroke="${C.ink}" stroke-width="1.6"/>` +
    `<rect x="70" y="40" width="10" height="80" fill="${C.sub}"/>` + T(75, 158, 'emitter (cathode)', { fs: 11 }) + `<rect x="300" y="40" width="10" height="80" fill="${C.sub}"/>` + T(305, 158, 'collector (anode)', { fs: 11 }) +
    L(130, 0, 85, 60, 'v', 'e', { w: 2 }) + L(160, 0, 85, 90, 'v', 'e', { w: 2 }) + T(150, 12, 'light, frequency f', { fs: 11, c: C.v, a: 'start' }) + [60, 80, 100].map(y => L(95, y, 150 + y * 0.6, y, 'o', 'e', { w: 1.4 })).join('') + T(200, 52, 'photoelectrons', { fs: 11, c: C.o }) + T(190, 132, 'vacuum', { fs: 11, c: C.sub }) +
    L(75, 140, 75, 190, 'k', '', { w: 1.4 }) + L(75, 190, 150, 190, 'k', '', { w: 1.4 }) + `<circle cx="170" cy="190" r="14" fill="#fff" stroke="${C.ink}"/>` + T(170, 195, 'A', { fs: 12, b: 1 }) + L(184, 190, 240, 190, 'k', '', { w: 1.4 }) + L(240, 176, 240, 204, 'k', '', { w: 2.4 }) + L(250, 182, 250, 198, 'k', '', { w: 2.4 }) + L(250, 190, 305, 190, 'k', '', { w: 1.4 }) + L(305, 190, 305, 140, 'k', '', { w: 1.4 }) + T(246, 172, 'V (variable, reversible)', { fs: 10.5 }), 400);
  F.iv = () => svg(360, 190, axes(150, 160, 190, 140, 'V', 'I', { noO: 1, yb: 175 }) + L(20, 160, 150, 160, 'k', '', { w: 1.6 }) + P('M70,160 C110,140 140,80 200,52 L340,52', 'v', { w: 2.4 }) + P('M70,160 C110,150 140,115 200,96 L340,96', 'o', { w: 2.4 }) +
    T(70, 176, '−V_s', { fs: 12, it: 1 }) + dot(70, 160, 3, C.ink) + T(344, 46, 'high intensity: larger saturation current', { fs: 10.5, a: 'end', c: C.v }) + T(344, 90, 'low intensity', { fs: 10.5, a: 'end', c: C.o }) + T(60, 120, 'same frequency:', { fs: 10.5, a: 'start' }) + T(60, 134, 'same V_s', { fs: 10.5, a: 'start' }), 380);
  F.kef = () => two(svg(220, 170, axes(40, 140, 160, 120, 'f', 'K_max', { noO: 1 }) + P('M90,140 L200,40', 'r', { w: 2.4 }) + P('M40,185 L90,140', 'r', { w: 1.2, d: '4 3' }) + T(90, 156, 'f₀', { it: 1 }) + T(150, 104, 'gradient = h', { fs: 11, c: C.r }) + T(48, 166, '−W', { fs: 11, it: 1, a: 'start', c: C.sub }), 220),
    svg(220, 170, axes(40, 140, 160, 120, 'f', 'V_s', { noO: 1 }) + P('M80,140 L190,50', 'v', { w: 2.4 }) + P('M110,140 L200,66', 'o', { w: 2.4 }) + T(80, 156, 'f₀₁', { it: 1, fs: 12 }) + T(114, 156, 'f₀₂', { it: 1, fs: 12 }) + T(120, 30, 'gradient = h/e (same for all metals)', { fs: 10.5, c: C.sub }), 220));
  F.orbits = () => svg(240, 220, dot(120, 110, 6, C.r) + T(120, 130, '+e', { fs: 11, c: C.r }) + [24, 60, 100].map((r, i) => `<circle cx="120" cy="110" r="${r}" fill="none" stroke="${C.v}" stroke-width="1.4"/>` + T(120 + r * 0.72, 110 - r * 0.72, 'n = ' + (i + 1), { fs: 10.5, a: 'start' })).join('') + dot(180, 110, 4, C.ball) + L(180, 110, 140, 110, 'r', 'e', { w: 1.6 }) + T(158, 104, 'F', { it: 1, fs: 11, c: C.r }) + L(180, 110, 180, 74, 'o', 'e', { w: 1.6 }) + T(186, 84, 'v', { it: 1, c: C.o, a: 'start' }) + T(120, 214, 'r₁ : r₂ : r₃ = 1 : 4 : 9', { fs: 11, c: C.sub }), 260);
  const lev = [[1, -13.6], [2, -3.40], [3, -1.51], [4, -0.85], [5, -0.54], [99, 0]];
  F.levels = () => { const Y = E => 20 + (-E < 0.01 ? 0 : Math.log(1 + (-E)) / Math.log(14.6) * 210); let s = lev.map(([n, E]) => L(70, Y(E), 330, Y(E), 'k', '', { w: n === 99 ? 1 : 1.6, d: n === 99 ? '4 3' : '' }) + T(64, Y(E) + 4, n === 99 ? 'n = ∞' : 'n = ' + n, { fs: 11, a: 'end' }) + T(336, Y(E) + 4, E.toFixed(2) + ' eV', { fs: 11, a: 'start' })).join('');
    const arr = (x, n1, n2, c) => L(x, Y(lev[n1 - 1][1]), x, Y(lev[n2 - 1][1]), c, 'e', { w: 1.6 });
    s += arr(100, 2, 1, 'v') + arr(115, 3, 1, 'v') + arr(130, 4, 1, 'v') + T(115, 222, 'Lyman (UV)', { fs: 10.5, c: C.v }) + arr(190, 3, 2, 'r') + arr(205, 4, 2, 'r') + arr(220, 5, 2, 'r') + T(205, 124, 'Balmer (visible)', { fs: 10.5, c: C.r }) + arr(280, 4, 3, 'o') + arr(295, 5, 3, 'o') + T(290, 112, 'Paschen (IR)', { fs: 10.5, c: C.o });
    return svg(400, 240, s, 420); };
  F.xtube = () => svg(380, 170, `<ellipse cx="190" cy="70" rx="170" ry="50" fill="#F1F6FB" stroke="${C.ink}" stroke-width="1.6"/>` + P('M50,58 l6,-8 l6,16 l6,-16 l6,16 l6,-8', 'r', { w: 1.6 }) + T(60, 100, 'heated filament', { fs: 10.5 }) + T(60, 112, '(cathode)', { fs: 10.5 }) +
    `<path d="M290,40 L320,40 L320,100 L280,100 Z" fill="${C.sub}"/>` + T(318, 116, 'target (anode)', { fs: 10.5 }) + [55, 70, 85].map(y => L(90, y, 278, y + (70 - y) * 0.2, 'o', 'e', { w: 1.2 })).join('') + T(180, 48, 'electrons accelerated by V', { fs: 10.5, c: C.o }) +
    L(290, 100, 250, 160, 'v', 'e', { w: 2 }) + L(300, 100, 300, 165, 'v', 'e', { w: 2 }) + T(240, 160, 'X-rays', { fs: 11, c: C.v, b: 1, a: 'end' }) + T(350, 34, 'cooling', { fs: 10.5, c: C.sub }) + T(190, 136, 'evacuated tube', { fs: 10.5, c: C.sub }), 400);
  F.xspec = () => { let d = ''; for (let i = 0; i <= 200; i++) { const l = 0.03 + i * 0.0012, lm = 0.031, I = l <= lm ? 0 : (l / lm - 1) / (l * l) * 0.0035; d += (i ? ' L' : 'M') + (40 + i * 1.5).toFixed(1) + ',' + (160 - Math.min(I, 1.4) * 95).toFixed(1); }
    const X = l => 40 + (l - 0.03) / 0.0012 * 1.5;
    return svg(360, 190, axes(40, 160, 310, 145, 'λ / nm', 'I', { noO: 1 }) + P(d, 'v', { w: 2.2 }) + L(X(0.0632), 160, X(0.0632), 30, 'r', '', { w: 2.2 }) + L(X(0.0711), 160, X(0.0711), 18, 'r', '', { w: 2.2 }) + T(X(0.0632) - 4, 28, 'K_β', { fs: 11, c: C.r, a: 'end' }) + T(X(0.0711) + 4, 18, 'K_α', { fs: 11, c: C.r, a: 'start' }) +
      T(X(0.031), 176, 'λ_min', { fs: 11, it: 1 }) + T(260, 120, 'continuous spectrum', { fs: 11, c: C.v }) + T(250, 40, 'characteristic lines', { fs: 11, c: C.r }), 380); };
  F.bragg = () => { const pl = y => [60, 110, 160, 210, 260, 310].map(x => dot(x, y, 4, C.v)).join('') + L(30, y, 340, y, 's', '', { w: 0.8, d: '3 3' });
    return svg(380, 200, pl(90) + pl(150) + L(40, 20, 160, 90, 'r', '', { w: 1.8 }) + L(160, 90, 280, 20, 'r', 'e', { w: 1.8 }) + L(20, 52, 160, 150, 'o', '', { w: 1.8 }) + L(160, 150, 300, 52, 'o', 'e', { w: 1.8 }) +
      L(160, 90, 160, 150, 'k', 'b', { w: 1 }) + T(166, 124, 'd', { it: 1, a: 'start' }) + L(160, 90, 108, 120, 'g', '', { w: 1.4 }) + L(160, 90, 212, 120, 'g', '', { w: 1.4 }) + T(120, 144, 'B', { fs: 11 }) + T(200, 144, 'D', { fs: 11 }) + T(160, 170, 'C', { fs: 11 }) +
      T(100, 82, 'θ', { it: 1, c: C.r }) + T(190, 186, 'extra path BC + CD = 2d sin θ', { fs: 11, c: C.g }), 400); };
  F.ediff = () => svg(380, 150, `<rect x="20" y="50" width="70" height="40" rx="6" fill="#F1F6FB" stroke="${C.ink}"/>` + T(55, 106, 'electron gun', { fs: 10.5 }) + L(90, 70, 200, 70, 'o', 'e', { w: 2 }) + `<rect x="200" y="50" width="6" height="40" fill="${C.sub}"/>` + T(203, 106, 'graphite film', { fs: 10.5 }) +
    L(206, 70, 320, 40, 'v', '', { w: 1 }) + L(206, 70, 320, 100, 'v', '', { w: 1 }) + `<ellipse cx="330" cy="70" rx="10" ry="56" fill="#16191F"/>` + [16, 34].map(r => `<ellipse cx="330" cy="70" rx="${r * 0.18}" ry="${r}" fill="none" stroke="#9EF09E" stroke-width="2"/>`).join('') + T(330, 140, 'rings on the screen', { fs: 10.5 }), 400);

  const S = `
${sec('24-1', '25.1 Photons', `
${h4('Planck’s quantum theory')}
${ul([`A <b>black body</b> is an ideal object that absorbs all the electromagnetic radiation falling on it, and is also the best possible emitter.`, `The spectrum of a hot body shows that (a) the total energy emitted (area under the curve) increases with temperature, and (b) the peak wavelength becomes shorter as the temperature increases.`, `Classical physics assumed energy is continuous and predicted that the intensity rises without limit at short wavelengths. This disagreed with experiment.`])}
${fig(F.bb(), 'Figure 25.1: black-body spectra and the failed classical prediction.')}
${def('Planck’s quantum theory', `${red('electromagnetic radiation is emitted or absorbed in discrete packets of energy called quanta. The energy of one quantum is proportional to the frequency of the radiation')}: <i>E</i> = <i>hf</i>.`)}
${ul([`An oscillator can only have energies 0, <i>hf</i>, 2<i>hf</i>, 3<i>hf</i>, …: the energy is <b>quantised</b>.`, `Einstein (1905) proposed that light itself travels as quanta called <b>photons</b>. A photon has no mass, travels at <i>c</i> in a vacuum and carries energy <i>hf</i>.`, `<b>Electronvolt</b>: the kinetic energy gained by an electron accelerated through a potential difference of 1 V. 1 eV = 1.60 × 10<sup>−19</sup> J.`])}
${key(`<i>E</i> = <i>hf</i> = ${fr('<i>hc</i>', 'λ')}`, '<i>h</i> = 6.63 × 10<sup>−34</sup> J s (Planck constant)')}
${table(['Classical electromagnetic wave', 'Photon (quantum theory)'], [['energy depends on the intensity (∝ amplitude<sup>2</sup>)', 'energy of one photon depends on frequency: <i>E</i> = <i>hf</i>'], ['energy is continuous and spread through the wave', 'energy comes in discrete packets']])}
${example('25.1.1', `Find the energy of a photon of blue light of wavelength 450 nm, in joules and electronvolts.`,
  steps([`<i>E</i> = ${fr('<i>hc</i>', 'λ')} = ${fr('(6.63 × 10<sup>−34</sup>)(3.00 × 10<sup>8</sup>)', '450 × 10<sup>−9</sup>')} = <b>4.42 × 10<sup>−19</sup> J</b> = 4.42 × 10<sup>−19</sup>/1.60 × 10<sup>−19</sup> = <b>2.76 eV</b>`]))}
${h4('The photoelectric effect')}
${def('Photoelectric effect', `is ${red('the emission of electrons from a metal surface when electromagnetic radiation of high enough frequency falls on it')}. The emitted electrons are called <b>photoelectrons</b>.`)}
${fig(F.tube(), 'Figure 25.2: apparatus for the photoelectric effect.')}
${ul([`Monochromatic light falls on the emitter (cathode) in an evacuated tube. Photoelectrons travel to the collector (anode) and a photocurrent <i>I</i> flows.`, `As the positive voltage increases, more photoelectrons reach the collector, until all of them do: the current reaches a maximum, the <b>saturation current</b>.`, `Even at <i>V</i> = 0 a small current flows, because some photoelectrons have enough kinetic energy to reach the collector.`, `If the supply is reversed, the collector repels the electrons. The current falls to zero at the <b>stopping potential</b> <i>V</i><sub>s</sub>.`])}
${def('Stopping potential, <i>V</i><sub>s</sub>', `is ${red('the minimum reverse potential difference needed to stop the most energetic photoelectrons from reaching the collector')}.`)}
${key(`<i>eV</i><sub>s</sub> = ${half}<i>mv</i><sub>max</sub><sup>2</sup>`, 'the work done against the field stops the fastest electrons')}
${fig(F.iv(), 'Figure 25.3: current against voltage for two intensities of the same frequency.')}
${h4('Important observations')}
${ul([`No electrons are emitted if the frequency is below a <b>threshold frequency</b> <i>f</i><sub>0</sub>, however intense the light.`, `Above <i>f</i><sub>0</sub>, emission is <b>instantaneous</b>, even for very weak light.`, `The maximum kinetic energy of the photoelectrons (and so <i>V</i><sub>s</sub>) increases with frequency, but does <b>not</b> depend on intensity.`, `The photocurrent (number of electrons per second) is proportional to the intensity.`])}
${table(['Wave theory predicts', 'Experiment (explained by photons)'], [['any frequency can eject electrons if the light is intense enough', 'no emission below the threshold frequency, however intense the light'], ['the maximum kinetic energy increases with intensity', 'the maximum kinetic energy depends only on frequency'], ['with weak light there should be a delay while energy builds up', 'emission is instantaneous']])}
${h4('Einstein’s photoelectric equation')}
${ul([`An electron absorbs the energy of <b>one</b> photon, all at once.`, `Some energy, at least the <b>work function</b> <i>W</i>, is needed to free the electron from the metal. The rest becomes kinetic energy.`, `<b>Work function</b> <i>W</i>: the minimum energy needed to remove an electron from the surface of the metal. <b>Threshold frequency</b> <i>f</i><sub>0</sub>: the minimum frequency that can eject an electron, <i>W</i> = <i>hf</i><sub>0</sub>. Threshold wavelength λ<sub>0</sub> = <i>c</i>/<i>f</i><sub>0</sub> is the maximum wavelength.`, `More intense light means more photons per second, so more electrons per second (more current), but each photon still has the same energy.`])}
${key(`<i>hf</i> = <i>W</i> + ${half}<i>mv</i><sub>max</sub><sup>2</sup> = <i>W</i> + <i>eV</i><sub>s</sub>`, '<i>W</i> = <i>hf</i><sub>0</sub>')}
${fig(F.kef(), 'Figure 25.4: K_max against f is a straight line of gradient h; V_s against f has gradient h/e for every metal, with different threshold frequencies.')}
${sim('photo', 'The photoelectric effect', 'Choose a metal and change the wavelength, intensity and voltage. Below the threshold frequency no electrons come out, however bright the light. Find the stopping potential by making the voltage negative until the current is zero.')}
${example('25.1.2', `The work function of silver is 4.74 eV. Find the minimum frequency of light that can eject electrons from silver.`,
  steps([`<i>f</i><sub>0</sub> = ${fr('<i>W</i>', '<i>h</i>')} = ${fr('4.74 × 1.60 × 10<sup>−19</sup>', '6.63 × 10<sup>−34</sup>')} = <b>1.14 × 10<sup>15</sup> Hz</b>`]))}
${example('25.1.3', `Find the maximum kinetic energy of electrons ejected from calcium (<i>W</i> = 2.71 eV) by violet light of 420 nm.`,
  steps([`<i>E</i> = <i>hc</i>/λ = 4.74 × 10<sup>−19</sup> J = 2.96 eV`, `<i>K</i><sub>max</sub> = 2.96 − 2.71 = <b>0.25 eV</b>`]))}
${example('25.1.4', `Sodium has a work function of 2.30 eV. Find (a) its threshold frequency, (b) the maximum speed of photoelectrons for light of 500 nm, (c) the stopping potential.`,
  steps([`(a) <i>f</i><sub>0</sub> = ${fr('2.30 × 1.60 × 10<sup>−19</sup>', '6.63 × 10<sup>−34</sup>')} = <b>5.55 × 10<sup>14</sup> Hz</b>`, `(b) <i>hc</i>/λ = 3.98 × 10<sup>−19</sup> J; <i>K</i><sub>max</sub> = 3.98 × 10<sup>−19</sup> − 3.68 × 10<sup>−19</sup> = 2.98 × 10<sup>−20</sup> J; <i>v</i> = ${sq('2<i>K</i>/<i>m</i>')} = <b>2.56 × 10<sup>5</sup> ${ms}</b>`, `(c) <i>V</i><sub>s</sub> = <i>K</i><sub>max</sub>/<i>e</i> = <b>0.186 V</b>`]))}
${example('25.1.5', `A graph of <i>K</i><sub>max</sub> against frequency for a metal cuts the frequency axis at 4.8 × 10<sup>14</sup> Hz. Find (a) the work function, (b) the threshold wavelength.`,
  steps([`(a) <i>W</i> = <i>hf</i><sub>0</sub> = (6.63 × 10<sup>−34</sup>)(4.8 × 10<sup>14</sup>) = <b>3.18 × 10<sup>−19</sup> J</b>`, `(b) λ<sub>0</sub> = <i>c</i>/<i>f</i><sub>0</sub> = <b>6.25 × 10<sup>−7</sup> m</b>`]))}
${h4('Photovoltaic effect in a solar cell')}
${ul([`The <b>photovoltaic effect</b> is the production of an e.m.f. across a p–n junction of a semiconductor when it absorbs light.`, `A photon with energy at least equal to the band gap is absorbed near the junction and creates an electron–hole pair.`, `The electric field at the junction separates the electrons (to the n side) and holes (to the p side) before they recombine, so an e.m.f. appears across the cell and drives a current in an external circuit.`, `Unlike the photoelectric effect, no electron leaves the material: the charge carriers are collected inside the cell. Solar cells convert light energy directly into electrical energy with no moving parts; many cells form a solar panel.`])}
`)}

${sec('24-2', '25.2 Wave–particle duality', `
<p>Light behaves as a wave in interference and diffraction, and as a particle (photons) in the photoelectric effect. De Broglie suggested that particles might also behave as waves.</p>
${def('de Broglie’s hypothesis', `${red('a moving particle has a wave associated with it, whose wavelength is λ = <i>h</i>/<i>p</i>')}, where <i>p</i> = <i>mv</i> is the momentum of the particle.`)}
${key(`λ = ${fr('<i>h</i>', '<i>p</i>')} = ${fr('<i>h</i>', '<i>mv</i>')}`, 'for a photon, <i>p</i> = <i>E</i>/<i>c</i> = <i>h</i>/λ as well')}
${steps([`An electron accelerated from rest through <i>V</i>: <i>eV</i> = ½<i>mv</i><sup>2</sup> = ${fr('<i>p</i><sup>2</sup>', '2<i>m</i>')} ⇒ <i>p</i> = ${sq('2<i>meV</i>')}`])}
${key(`λ = ${fr('<i>h</i>', sq('2<i>meV</i>'))} = ${fr('<i>h</i>', sq('2<i>mK</i>'))}`, '<i>K</i> = kinetic energy')}
${h4('Electron diffraction')}
${fig(F.ediff(), 'Figure 25.5: electrons passing through a thin graphite film form diffraction rings.')}
${ul([`Electrons are accelerated through a few kilovolts and pass through a thin graphite film.`, `The rows of carbon atoms act like a diffraction grating, because their spacing is similar to the electron wavelength.`, `Bright rings appear on the fluorescent screen: a <b>diffraction pattern</b>. Diffraction is a wave property, so this is evidence that electrons behave as waves.`, `When the accelerating voltage increases, the rings become smaller: the electrons are faster, so λ = <i>h</i>/<i>mv</i> is shorter, as de Broglie predicted. (Davisson and Germer first showed electron diffraction in 1927.)`])}
${sim('ediff', 'Electron diffraction', 'Change the accelerating voltage. A higher voltage gives faster electrons, a shorter de Broglie wavelength and smaller diffraction rings.')}
${h4('The electron microscope')}
${ul([`The resolving power of a microscope is limited by diffraction: the minimum resolvable detail is about the wavelength used.`, `Electrons accelerated through tens of kilovolts have wavelengths of about 10<sup>−11</sup> m, thousands of times shorter than visible light (about 5 × 10<sup>−7</sup> m).`, `So an electron microscope has a much <b>higher resolving power</b> than an optical microscope and can show much finer detail.`])}
${example('25.2.1', `Find the momentum and energy of a photon of wavelength 5.0 × 10<sup>−7</sup> m.`,
  steps([`<i>p</i> = <i>h</i>/λ = 6.63 × 10<sup>−34</sup>/5.0 × 10<sup>−7</sup> = <b>1.33 × 10<sup>−27</sup> kg ${ms}</b>`, `<i>E</i> = <i>hc</i>/λ = <b>3.98 × 10<sup>−19</sup> J</b>`]))}
${example('25.2.2', `An electron and a photon both have a wavelength of 0.25 nm. Find the momentum and energy (in eV) of each.`,
  steps([`Both: <i>p</i> = <i>h</i>/λ = 6.63 × 10<sup>−34</sup>/0.25 × 10<sup>−9</sup> = <b>2.65 × 10<sup>−24</sup> kg ${ms}</b>`, `Electron: <i>K</i> = ${fr('<i>p</i><sup>2</sup>', '2<i>m</i>')} = ${fr('(2.65 × 10<sup>−24</sup>)<sup>2</sup>', '2(9.11 × 10<sup>−31</sup>)')} = 3.86 × 10<sup>−18</sup> J = <b>24.1 eV</b>`, `Photon: <i>E</i> = <i>pc</i> = <i>hc</i>/λ = 7.96 × 10<sup>−16</sup> J = <b>4.97 × 10<sup>3</sup> eV</b>`, `The same wavelength needs far less energy for an electron than for a photon.`]))}
${example('25.2.3', `An electron is accelerated from rest through 1200 V. Find its de Broglie wavelength.`,
  steps([`<i>p</i> = ${sq('2<i>meV</i>')} = ${sq('2(9.11 × 10<sup>−31</sup>)(1.60 × 10<sup>−19</sup>)(1200)')} = 1.87 × 10<sup>−23</sup> kg ${ms}`, `λ = <i>h</i>/<i>p</i> = <b>3.55 × 10<sup>−11</sup> m</b>`]))}
${example('25.2.4', `An electron and a proton have the same kinetic energy. Find the ratio of the de Broglie wavelength of the electron to that of the proton. (<i>m</i><sub>p</sub> = 1.67 × 10<sup>−27</sup> kg)`,
  steps([`λ = <i>h</i>/${sq('2<i>mK</i>')} ⇒ ${fr('λ<sub>e</sub>', 'λ<sub>p</sub>')} = ${sq(fr('<i>m</i><sub>p</sub>', '<i>m</i><sub>e</sub>'))} = ${sq(fr('1.67 × 10<sup>−27</sup>', '9.11 × 10<sup>−31</sup>'))} = <b>42.8</b>`]))}
`)}

${sec('24-3', '25.3 Atomic structure', `
${h4('Bohr’s postulates for the hydrogen atom')}
${steps([`The electron moves in certain circular orbits round the nucleus <b>without radiating energy</b> (stationary states).`, `In these orbits the angular momentum of the electron is a whole number times <i>h</i>/2π: <i>mvr</i> = ${fr('<i>nh</i>', '2π')}, <i>n</i> = 1, 2, 3, … (principal quantum number).`, `Radiation is emitted or absorbed only when the electron moves from one orbit to another. The photon energy is the difference in energy: <i>hf</i> = <i>E</i><sub>i</sub> − <i>E</i><sub>f</sub>.`])}
${fig(F.orbits(), 'Figure 25.6: the Coulomb force provides the centripetal force on the orbiting electron.')}
${h4('Radius of the orbits')}
${steps([`Coulomb force = centripetal force: ${fr('<i>e</i><sup>2</sup>', '4π' + e0 + '<i>r</i><sup>2</sup>')} = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} &nbsp; … (1)`, `From postulate 2: <i>v</i> = ${fr('<i>nh</i>', '2π<i>mr</i>')} &nbsp; … (2)`, `Substitute (2) in (1): ${fr('<i>e</i><sup>2</sup>', '4π' + e0 + '<i>r</i>')} = <i>m</i>${fr('<i>n</i><sup>2</sup><i>h</i><sup>2</sup>', '4π<sup>2</sup><i>m</i><sup>2</sup><i>r</i><sup>2</sup>')} ⇒ <i>r</i> = ${fr('<i>n</i><sup>2</sup><i>h</i><sup>2</sup>' + e0, 'π<i>me</i><sup>2</sup>')}`])}
${key(`<i>r<sub>n</sub></i> = ${fr('<i>n</i><sup>2</sup><i>h</i><sup>2</sup>' + e0, 'π<i>me</i><sup>2</sup>')} = <i>n</i><sup>2</sup><i>a</i><sub>0</sub>`, '<i>a</i><sub>0</sub> = <i>r</i><sub>1</sub> = 5.29 × 10<sup>−11</sup> m (the Bohr radius). The radii are in the ratio 1 : 4 : 9 : …')}
${h4('Energy levels')}
${steps([`From (1): kinetic energy <i>K</i> = ½<i>mv</i><sup>2</sup> = ${fr('<i>e</i><sup>2</sup>', '8π' + e0 + '<i>r</i>')}`, `Electric potential energy <i>U</i> = −${fr('<i>e</i><sup>2</sup>', '4π' + e0 + '<i>r</i>')}`, `Total energy <i>E</i> = <i>K</i> + <i>U</i> = −${fr('<i>e</i><sup>2</sup>', '8π' + e0 + '<i>r</i>')}; substitute <i>r<sub>n</sub></i>:`])}
${key(`<i>E<sub>n</sub></i> = −${fr('<i>e</i><sup>4</sup><i>m</i>', '8' + e0 + '<sup>2</sup><i>h</i><sup>2</sup><i>n</i><sup>2</sup>')} = −${fr('13.6', '<i>n</i><sup>2</sup>')} eV`, 'the negative sign means the electron is bound: energy must be supplied to remove it to infinity, where <i>E</i> = 0. <i>E</i><sub>1</sub> = −13.6 eV = −2.18 × 10<sup>−18</sup> J.')}
${ul([`<b>Ground state</b> (<i>n</i> = 1): the lowest energy level. <b>Excited states</b>: <i>n</i> = 2, 3, 4, …`, `<b>Excitation energy</b>: the energy needed to move an electron from the ground state to a higher level, e.g. <i>E</i><sub>2</sub> − <i>E</i><sub>1</sub> = 10.2 eV.`, `<b>Ionisation energy</b>: the minimum energy needed to remove an electron from the ground state completely (to <i>n</i> = ∞): 13.6 eV for hydrogen.`])}
${h4('Emission and absorption line spectra')}
${fig(F.levels(), 'Figure 25.7: energy levels of hydrogen and three series of emission lines.')}
${ul([`<b>Emission</b>: atoms of a low-pressure gas are excited (by heating or by an electric discharge). When an electron falls from a higher level to a lower level, it emits a photon of energy <i>hf</i> = <i>E</i><sub>i</sub> − <i>E</i><sub>f</sub>. Only certain energy differences exist, so only certain wavelengths are emitted: <b>bright lines on a dark background</b>.`, `<b>Absorption</b>: white light passes through a cool gas. Photons whose energy exactly equals an energy difference are absorbed, raising electrons to higher levels: <b>dark lines on a continuous spectrum</b>, at the same wavelengths as the emission lines.`, `Lyman series: transitions ending at <i>n</i> = 1 (ultraviolet). Balmer series: ending at <i>n</i> = 2 (visible). Paschen: ending at <i>n</i> = 3 (infrared). Brackett (<i>n</i> = 4) and Pfund (<i>n</i> = 5): infrared.`])}
${key(`<i>hf</i> = ${fr('<i>hc</i>', 'λ')} = <i>E</i><sub>i</sub> − <i>E</i><sub>f</sub>`)}
${sim('bohr', 'Energy levels and line spectra of hydrogen', 'Pick the starting and final levels. A fall emits a photon; a jump up absorbs one. The wavelength and series are shown, and visible lines appear in the spectrum.')}
${example('25.3.1', `(a) Find the radius of the <i>n</i> = 4 orbit of hydrogen. (b) An excited hydrogen atom has a radius of 0.847 nm. Which state is this?`,
  steps([`(a) <i>r</i><sub>4</sub> = 4<sup>2</sup>(5.29 × 10<sup>−11</sup>) = <b>8.46 × 10<sup>−10</sup> m</b>`, `(b) <i>n</i><sup>2</sup> = 0.847 × 10<sup>−9</sup>/5.29 × 10<sup>−11</sup> = 16 ⇒ <b><i>n</i> = 4</b>`]))}
${example('25.3.2', `An electron in hydrogen falls from <i>E</i><sub>2</sub> = −3.40 eV to the ground state, <i>E</i><sub>1</sub> = −13.6 eV. Find the energy and wavelength of the emitted photon.`,
  steps([`Δ<i>E</i> = −3.40 − (−13.6) = 10.2 eV = <b>1.63 × 10<sup>−18</sup> J</b>`, `λ = <i>hc</i>/Δ<i>E</i> = <b>1.22 × 10<sup>−7</sup> m</b> (ultraviolet, Lyman series)`]))}
${example('25.3.3', `Find the frequency of the photon needed to ionise a hydrogen atom in the ground state.`,
  steps([`<i>E</i> = 0 − (−13.6 eV) = 2.18 × 10<sup>−18</sup> J; <i>f</i> = <i>E</i>/<i>h</i> = <b>3.29 × 10<sup>15</sup> Hz</b>`]))}
${example('25.3.4', `An electron in a hydrogen atom moves from the ground state to the 4th excited state. Find the energy absorbed.`,
  steps([`4th excited state: <i>n</i> = 5`, `Δ<i>E</i> = −${fr('13.6', '25')} − (−13.6) = <b>13.1 eV</b> = 2.09 × 10<sup>−18</sup> J`]))}
${example('25.3.5', `Find the shortest and longest wavelengths in the Balmer series.`,
  steps([`Shortest: ∞ → 2, Δ<i>E</i> = 3.40 eV ⇒ λ = <i>hc</i>/Δ<i>E</i> = <b>366 nm</b>`, `Longest: 3 → 2, Δ<i>E</i> = 3.40 − 1.51 = 1.89 eV ⇒ λ = <b>658 nm</b> (red)`]))}
${example('25.3.6', `Hydrogen emits 121.5 nm and 102.4 nm when electrons fall from the 1st and 2nd excited states to the ground state. Find (a) the photon energies, (b) the wavelength emitted when an electron falls from the 2nd excited state to the 1st excited state.`,
  steps([`(a) <i>E</i> = <i>hc</i>/λ: <b>1.64 × 10<sup>−18</sup> J</b> and <b>1.94 × 10<sup>−18</sup> J</b>`, `(b) Δ<i>E</i> = 1.942 × 10<sup>−18</sup> − 1.637 × 10<sup>−18</sup> = 3.05 × 10<sup>−19</sup> J ⇒ λ = <b>652 nm</b> (or directly 1/λ = 1/102.4 − 1/121.5)`]))}
${example('25.3.7', `A hydrogen atom in the <i>n</i> = 3 state falls to the ground state and emits one photon. Find (a) its wavelength, (b) the type of radiation, (c) its momentum.`,
  steps([`(a) Δ<i>E</i> = 13.6(1 − 1/9) = 12.1 eV = 1.94 × 10<sup>−18</sup> J ⇒ λ = <b>1.03 × 10<sup>−7</sup> m</b>`, `(b) <b>ultraviolet</b>`, `(c) <i>p</i> = <i>h</i>/λ = <b>6.44 × 10<sup>−27</sup> kg ${ms}</b>`]))}
`)}

${sec('24-4', '25.4 X-rays', `
<p>X-rays are electromagnetic waves of very short wavelength (about 10<sup>−12</sup> m to 10<sup>−8</sup> m), discovered by Röntgen in 1895. They travel in straight lines, penetrate matter, are not deflected by electric or magnetic fields, ionise gases, affect photographic film, cause fluorescence and can be diffracted.</p>
${h4('Production of X-rays in an X-ray tube')}
${fig(F.xtube(), 'Figure 25.8: an X-ray tube.')}
${ul([`A heated filament (cathode) emits electrons by <b>thermionic emission</b>.`, `A high voltage (tens of kV) accelerates them across an <b>evacuated</b> tube, so they do not collide with gas molecules.`, `They strike a <b>target</b> of a heavy metal with a high melting point (tungsten or molybdenum). Less than 1% of their kinetic energy becomes X-rays; the rest becomes heat, so the target is cooled.`, `The tube current (filament current) controls the <b>number</b> of electrons, so the <b>intensity</b> of the X-rays. The accelerating voltage controls the electron energy, so the <b>penetrating power</b> (hardness).`])}
${fig(F.xspec(), 'Figure 25.9: an X-ray spectrum: a continuous spectrum with a sharp cut-off at λ_min, and characteristic lines.')}
${two(`<p><b>Continuous spectrum</b> (braking radiation, bremsstrahlung)</p>${ul([`Electrons are decelerated by the nuclei of the target atoms; the kinetic energy lost is emitted as an X-ray photon.`, `An electron can lose any amount of energy in a collision, so all wavelengths above a minimum are produced.`, `The shortest wavelength comes from an electron that loses <b>all</b> its kinetic energy in one collision.`])}`,
`<p><b>Characteristic line spectrum</b></p>${ul([`A fast electron knocks out an electron from an inner shell (e.g. K shell) of a target atom, leaving a vacancy.`, `An electron from a higher shell falls into the vacancy and emits an X-ray photon of energy equal to the difference of the two energy levels.`, `The energies are fixed for each element, so the lines are characteristic of the target metal. Kα: L → K; Kβ: M → K; Lα: M → L, …`])}`)}
${h4('Minimum wavelength')}
${steps([`Kinetic energy of the electron = <i>eV</i>. If all of it becomes one photon: <i>eV</i> = <i>hf</i><sub>max</sub> = ${fr('<i>hc</i>', 'λ<sub>min</sub>')}`])}
${key(`λ<sub>min</sub> = ${fr('<i>hc</i>', '<i>eV</i>')}`, 'depends only on the accelerating voltage, not on the target metal')}
${table(['Change', 'Continuous spectrum', 'Characteristic lines'], [['tube current increased', 'intensity increases; λ<sub>min</sub> unchanged', 'more intense; same wavelengths'], ['accelerating voltage increased', 'intensity increases; λ<sub>min</sub> decreases', 'same wavelengths (may appear once <i>eV</i> is large enough)'], ['target of higher atomic number', 'λ<sub>min</sub> unchanged (more intense)', 'lines move to shorter wavelengths']])}
${sim('xray', 'X-ray spectrum', 'Change the accelerating voltage, the tube current and the target. Watch the cut-off wavelength λmin = hc/eV move, and see the characteristic lines appear once the electrons have enough energy to knock out K-shell electrons.')}
${example('25.4.1', `Find the shortest wavelength of X-rays from a tube operated at 50 kV.`,
  steps([`λ<sub>min</sub> = ${fr('(6.63 × 10<sup>−34</sup>)(3.00 × 10<sup>8</sup>)', '(1.60 × 10<sup>−19</sup>)(50 × 10<sup>3</sup>)')} = <b>2.49 × 10<sup>−11</sup> m</b>`]))}
${example('25.4.2', `The shortest wavelength of X-rays from a tube is 0.019 nm. What is the voltage across the tube?`,
  steps([`<i>V</i> = ${fr('<i>hc</i>', '<i>e</i>λ<sub>min</sub>')} = ${fr('(6.63 × 10<sup>−34</sup>)(3.00 × 10<sup>8</sup>)', '(1.60 × 10<sup>−19</sup>)(0.019 × 10<sup>−9</sup>)')} = <b>65.4 kV</b>`]))}
${h4('X-ray diffraction and Bragg’s law')}
${ul([`The regularly spaced atoms of a crystal act like a diffraction grating for X-rays, because the spacing of the atomic planes (about 10<sup>−10</sup> m) is similar to the X-ray wavelength.`, `X-rays are partly reflected by each plane of atoms. Waves reflected from adjacent planes interfere constructively when their path difference is a whole number of wavelengths.`])}
${fig(F.bragg(), 'Figure 25.10: reflection from two adjacent atomic planes a distance d apart. θ is the glancing angle, measured from the plane.')}
${steps([`The ray reflected from the lower plane travels an extra distance BC + CD = <i>d</i> sin θ + <i>d</i> sin θ = 2<i>d</i> sin θ.`, `Constructive interference: path difference = <i>m</i>λ.`])}
${key(`2<i>d</i> sin θ = <i>m</i>λ`, 'Bragg’s law; <i>d</i> = spacing of atomic planes; θ = glancing angle (between the ray and the plane, not the normal); <i>m</i> = 1, 2, 3, …')}
${sim('bragg', 'Bragg’s law', 'Change the glancing angle, the plane spacing and the wavelength. The detector reading is high only when 2d sin θ is a whole number of wavelengths.')}
${example('25.4.3', `X-rays of wavelength 0.36 × 10<sup>−10</sup> m give a first-order reflection from a crystal at a glancing angle of 4.8°. Find the spacing of the atomic planes.`,
  steps([`<i>d</i> = ${fr('<i>m</i>λ', '2 sin θ')} = ${fr('0.36 × 10<sup>−10</sup>', '2 sin 4.8°')} = <b>2.15 × 10<sup>−10</sup> m</b>`]))}
${exercises('Exercise: Bragg’s law', [{ q: `X-rays are diffracted by a crystal with plane spacing 2.65 × 10<sup>−10</sup> m. The first-order reflection is at 8.0°. Find the wavelength.`, a: `7.38 × 10<sup>−11</sup> m` }])}
${h4('Applications of X-rays')}
${table(['Field', 'Uses'], [['Medicine', 'radiography of bones and organs; CT scans; radiotherapy to destroy cancer cells'], ['Industry', 'non-destructive testing of welds, castings and pipes; X-ray crystallography of materials'], ['Security', 'baggage and cargo scanning at airports'], ['Research', 'crystal structures of DNA and proteins; X-ray astronomy']])}
${h4('Inside a hospital X-ray machine')}
${ul([`The tube current (a few mA) is set by heating the filament: a hotter filament emits more electrons per second, so more X-ray photons are produced and the picture is brighter. It does not change λ<sub>min</sub>.`, `The tube voltage (about 50–120 kV) sets the energy of each electron, <i>eV</i>, and so the most energetic photons. Higher voltage gives more penetrating ("harder") X-rays.`, `Bone contains calcium, which has a higher atomic number than soft tissue, so it absorbs X-rays much more strongly. Where X-rays reach the detector it turns dark; behind bone it stays light. That is why bones look white on an X-ray image.`, `About 99% of the electrons' energy becomes heat in the target, so the anode is made of tungsten and is often a spinning disc, so the heat is spread around its rim.`])}
${sim('xtube', 'Taking an X-ray picture of a hand', 'Turn on the tube and watch an X-ray image build up. The filament current controls how many electrons (and photons) there are each second; the voltage controls the energy of each one. At low voltage even the soft tissue blocks most X-rays; at high voltage the bones become less clear.')}
${example('25.4.3', `A hospital X-ray tube operates at 80 kV with a tube current of 5.0 mA. Find (a) the number of electrons striking the target each second, (b) the power supplied to the tube, (c) the rate of heat production in the target if 1% of the energy becomes X-rays, (d) the minimum wavelength of the X-rays.`,
  steps([`(a) <i>n</i> = ${fr('<i>I</i>', '<i>e</i>')} = ${fr('5.0 × 10<sup>−3</sup>', '1.60 × 10<sup>−19</sup>')} = <b>3.1 × 10<sup>16</sup> s<sup>−1</sup></b>`, `(b) <i>P</i> = <i>IV</i> = (5.0 × 10<sup>−3</sup>)(80 × 10<sup>3</sup>) = <b>400 W</b>`, `(c) heat = 0.99 × 400 = <b>396 W</b> (only 4 W becomes X-rays)`, `(d) λ<sub>min</sub> = ${fr('<i>hc</i>', '<i>eV</i>')} = ${fr('(6.63 × 10<sup>−34</sup>)(3.00 × 10<sup>8</sup>)', '(1.60 × 10<sup>−19</sup>)(80 × 10<sup>3</sup>)')} = <b>1.55 × 10<sup>−11</sup> m</b>`]))}
`)}

${sec('24-5', '25.5 Nanoscience', `
${def('Nanoscience', `is ${red('the study of structures and materials on the scale of about 1 nm to 100 nm')} (1 nm = 10<sup>−9</sup> m, a few atoms across). Nanotechnology is the design and making of devices at this scale.`)}
${ul([`At the nanoscale, materials can behave very differently from the bulk: a large fraction of the atoms are at the surface, and quantum effects become important. Colour, strength, conductivity and chemical reactivity can all change with size.`, `Examples: carbon nanotubes and graphene (very strong, excellent conductors), quantum dots (nanocrystals whose colour depends on their size), nanoparticles of titanium dioxide and silver.`])}
${h4('Applications in electronic devices')}
${table(['Device', 'How nanoscience helps'], [['Microprocessors', 'transistors only a few nanometres wide: billions on one chip, faster and using less power'], ['Memory and data storage', 'nanoscale memory cells and magnetic layers store far more data in a smaller space (flash memory, hard disks)'], ['Displays', 'quantum-dot (QLED) screens give bright, pure colours; organic and flexible displays'], ['Sensors', 'nanoscale sensors detect tiny amounts of gases, chemicals or biological molecules'], ['Solar cells and batteries', 'nanostructured materials absorb more light and store more charge'], ['Future electronics', 'graphene and carbon-nanotube transistors; single-electron devices']])}
${ul([`Other applications: stain-resistant fabrics, scratch-resistant paint, self-cleaning glass, drug delivery and early detection of disease.`, `Concerns: nanoparticles may be breathed in or absorbed through the skin, and their effects on health and the environment are not yet fully understood.`])}
`)}

${sec('24-6', 'Summary and exercises', `
${table(['Subtopic', 'Key results'], [['25.1', '<i>E</i> = <i>hf</i>; <i>hf</i> = <i>W</i> + ½<i>mv</i><sub>max</sub><sup>2</sup>; <i>eV</i><sub>s</sub> = ½<i>mv</i><sub>max</sub><sup>2</sup>; <i>W</i> = <i>hf</i><sub>0</sub>'], ['25.2', 'λ = <i>h</i>/<i>p</i> = <i>h</i>/√(2<i>meV</i>)'], ['25.3', '<i>r<sub>n</sub></i> = <i>n</i><sup>2</sup><i>h</i><sup>2</sup>ε<sub>0</sub>/π<i>me</i><sup>2</sup>; <i>E<sub>n</sub></i> = −13.6/<i>n</i><sup>2</sup> eV; <i>hf</i> = <i>E</i><sub>i</sub> − <i>E</i><sub>f</sub>'], ['25.4', 'λ<sub>min</sub> = <i>hc</i>/<i>eV</i>; 2<i>d</i> sin θ = <i>m</i>λ']])}
${exercises('Exercises', [
  { q: `Ultraviolet light of wavelength 250 nm falls on a metal of work function 3.0 eV. Find the stopping potential.`, a: `<i>hc</i>/λ = 4.97 eV ⇒ <i>V</i><sub>s</sub> = 1.97 V` },
  { q: `Explain why increasing the intensity of light of frequency below the threshold frequency does not cause photoelectric emission.`, a: `Each electron absorbs one photon. Below <i>f</i><sub>0</sub> each photon has energy <i>hf</i> < <i>W</i>, so no single photon can free an electron. More intensity only means more photons, each still with too little energy.` },
  { q: `Find the de Broglie wavelength of a 0.15 kg ball moving at 40 ${ms}, and explain why its wave nature is not observed.`, a: `λ = 1.1 × 10<sup>−34</sup> m, far smaller than any gap or obstacle, so no diffraction can be seen.` },
  { q: `Find the ionisation energy of a hydrogen atom in the <i>n</i> = 2 state.`, a: `3.40 eV` },
  { q: `An X-ray tube operates at 30 kV. Find the maximum frequency of the X-rays.`, a: `<i>f</i><sub>max</sub> = <i>eV</i>/<i>h</i> = 7.24 × 10<sup>18</sup> Hz` }])}
`)}
`;
  window.PhysiQLessons.register('LESSON-S3-25', { html: () => S });

  // ===================== simulations =====================
  const TAU = 2 * Math.PI, h = 6.63e-34, c = 3e8, e = 1.6e-19, me = 9.11e-31;
  function rgbOf(nm) { let r = 0, g = 0, b = 0; if (nm < 440) { r = -(nm - 440) / 60; b = 1; } else if (nm < 490) { g = (nm - 440) / 50; b = 1; } else if (nm < 510) { g = 1; b = -(nm - 510) / 20; } else if (nm < 580) { r = (nm - 510) / 70; g = 1; } else if (nm < 645) { r = 1; g = -(nm - 645) / 65; } else r = 1;
    const f = nm < 380 || nm > 750 ? 0 : nm < 420 ? 0.3 + 0.7 * (nm - 380) / 40 : nm > 700 ? 0.3 + 0.7 * (750 - nm) / 50 : 1; return [r * f, g * f, b * f].map(x => Math.max(0, Math.min(1, x))); }
  const css = (col, a = 1) => `rgba(${Math.round(col[0] * 255)},${Math.round(col[1] * 255)},${Math.round(col[2] * 255)},${a})`;
  const beam = nm => nm < 380 ? [0.62, 0.42, 1] : nm > 750 ? [0.8, 0.2, 0.2] : rgbOf(nm);

  // ---------- 1. photoelectric effect ----------
  window.PhysiQSims.add('photo', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, loop, readouts } = window.PhysiQSims.U;
    const MET = [['Caesium', 2.10], ['Sodium', 2.30], ['Calcium', 2.71], ['Zinc', 4.30], ['Silver', 4.74]];
    const S = { W: 2.30, lam: 400, I: 60, V: 2, parts: [], t: 0 };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const bs = MET.map(([n, W]) => { const b = button(pre, n + ' (' + W + ' eV)', 'sm-chip' + (W === S.W ? ' on' : ''), () => { S.W = W; bs.forEach(x => x.classList.toggle('on', x === b)); }); return b; });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'wavelength λ', 150, 700, 5, S.lam, 'nm', v => { S.lam = v; });
    slider(ctl, 'intensity', 0, 100, 5, S.I, '%', v => { S.I = v; });
    const sv = slider(ctl, 'voltage V (collector)', -4, 6, 0.05, S.V, 'V', v => { S.V = v; });
    const cv = canvas(root); const ro = readouts(root);
    function draw() {
      const ctx = cv.ctx, { w, h: H } = cv.size(0.55, 280, 400); ctx.clearRect(0, 0, w, H); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, H);
      const Eph = h * c / (S.lam * 1e-9) / e, Kmax = Eph - S.W, emits = Kmax > 0, Vs = Math.max(0, Kmax);
      const curr = V => { if (!emits) return 0; if (V <= -Vs) return 0; const sat = S.I / 100; return V >= 0 ? sat * (1 - 0.35 * Math.exp(-V / 0.5)) : sat * 0.65 * Math.pow((V + Vs) / Vs, 1.6); };
      // tube
      const tw = w < 520 ? w - 20 : w * 0.55, tx = 10, ty = 16, th = H * 0.5;
      ctx.fillStyle = '#EEF4FA'; ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(tx, ty, tw, th, 18) : ctx.rect(tx, ty, tw, th); ctx.fill(); ctx.stroke();
      const cx = tx + 30, ax = tx + tw - 30; ctx.fillStyle = '#8D95A3'; ctx.fillRect(cx - 6, ty + 20, 10, th - 40); ctx.fillRect(ax - 4, ty + 20, 10, th - 40);
      text(ctx, 'emitter', cx, ty + th + 14, { a: 'center', fs: 11 }); text(ctx, 'collector ' + (S.V >= 0 ? '+' : '−'), ax, ty + th + 14, { a: 'center', fs: 11 });
      // light
      const col = beam(S.lam); ctx.fillStyle = css(col, 0.12 + 0.5 * S.I / 100); ctx.beginPath(); ctx.moveTo(cx + 60, ty); ctx.lineTo(cx + 110, ty); ctx.lineTo(cx + 4, ty + th * 0.75); ctx.lineTo(cx + 4, ty + th * 0.25); ctx.closePath(); ctx.fill();
      text(ctx, S.lam < 380 ? 'ultraviolet' : S.lam > 700 ? 'red / IR' : 'visible', cx + 116, ty + 14, { fs: 11, c: COL.sub });
      // electrons
      S.parts.forEach(p => { ctx.fillStyle = COL.o; ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, 7); ctx.fill(); });
      // graph I-V
      const gx = w < 520 ? 40 : tx + tw + 50, gy = w < 520 ? ty + th + 40 : 30, gw = w < 520 ? w - 60 : w - gx - 14, gh = w < 520 ? H - gy - 30 : H - 70;
      const Xv = V => gx + (V + 4) / 10 * gw, Yi = i => gy + gh - i * gh / 1.05;
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.moveTo(Xv(0), gy); ctx.lineTo(Xv(0), gy + gh); ctx.stroke();
      ctx.strokeStyle = COL.v; ctx.lineWidth = 2.2; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const V = -4 + 10 * i / 200, y = Yi(curr(V)); i ? ctx.lineTo(Xv(V), y) : ctx.moveTo(Xv(V), y); } ctx.stroke();
      ctx.fillStyle = COL.r; ctx.beginPath(); ctx.arc(Xv(S.V), Yi(curr(S.V)), 5, 0, 7); ctx.fill();
      if (emits && Vs < 4) { text(ctx, '−Vs', Xv(-Vs), gy + gh + 13, { a: 'center', fs: 11, c: COL.r, b: 1 }); }
      text(ctx, 'I', Xv(0) + 4, gy + 10, { it: 1, b: 1 }); text(ctx, 'V', gx + gw, gy + gh + 13, { a: 'right', it: 1 });
      if (!emits) text(ctx, 'f < f₀: no photoelectrons, however bright', tx + tw / 2, ty + th / 2, { a: 'center', b: 1, c: COL.r, fs: 13 });
      ro([['photon energy hf', fmt(Eph, 2) + ' eV', 'hl'], ['work function W', fmt(S.W, 2) + ' eV'], ['threshold wavelength λ₀', fmt(h * c / (S.W * e) * 1e9, 0) + ' nm'], ['K_max = hf − W', emits ? fmt(Kmax, 2) + ' eV' : 'none', 'hl'], ['stopping potential V_s', emits ? fmt(Vs, 2) + ' V' : '—'], ['photocurrent', fmt(curr(S.V) * 100, 0) + ' (relative)']]);
      S._geom = { cx, ax, ty, th, Kmax, emits };
    }
    function step(dt) {
      const gm = S._geom; if (!gm) return; S.t += dt;
      if (gm.emits && Math.random() < S.I / 100 * 0.9) { const K = gm.Kmax * Math.random(); S.parts.push({ x: gm.cx + 6, y: gm.ty + gm.th * (0.3 + 0.4 * Math.random()), v: 40 + 160 * Math.sqrt(K / 3), K }); }
      const span = gm.ax - gm.cx;
      S.parts.forEach(p => { const a = S.V * 60; p.v += a * dt; p.x += p.v * dt; });
      S.parts = S.parts.filter(p => p.x < gm.ax - 4 && p.x > gm.cx + 2 && S.parts.length < 400);
    }
    loop(cv, dt => { step(dt); draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 2. electron diffraction rings ----------
  window.PhysiQSims.add('ediff', function (root) {
    const { COL, fmt, el, slider, canvas, text, readouts } = window.PhysiQSims.U;
    const S = { V: 4000 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'accelerating voltage V', 1000, 10000, 100, S.V, 'V', v => { S.V = v; draw(); });
    const cv = canvas(root); const ro = readouts(root);
    function draw() {
      const ctx = cv.ctx, { w, h: H } = cv.size(0.5, 240, 340); ctx.fillStyle = '#101418'; ctx.fillRect(0, 0, w, H);
      const lam = h / Math.sqrt(2 * me * e * S.V), cx = w / 2, cy = H / 2, k = Math.min(w, H) * 0.42 * Math.sqrt(1000 / S.V) / Math.sqrt(1000 / 1000) * 0.9;
      ctx.fillStyle = 'rgba(160,255,160,.9)'; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, 7); ctx.fill();
      [[0.213, 1], [0.123, 0.75]].forEach(([dnm, s], i) => { const r = k * (0.123 / dnm) * (i ? 1 : 0.58) * 1.2; ctx.strokeStyle = `rgba(160,255,160,${0.85 * s})`; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); });
      text(ctx, 'fluorescent screen', 10, 18, { fs: 11, c: '#cfd' });
      ro([['electron speed v = √(2eV/m)', fmt(Math.sqrt(2 * e * S.V / me) / 1e7, 2) + ' × 10⁷ m/s'], ['de Broglie λ = h/√(2meV)', fmt(lam * 1e12, 1) + ' pm', 'hl'], ['ring size', 'larger V → shorter λ → smaller rings']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 3. Bohr energy levels ----------
  window.PhysiQSims.add('bohr', function (root) {
    const { COL, fmt, el, button, canvas, text, loop, readouts } = window.PhysiQSims.U;
    const S = { ni: 3, nf: 2, t: 0, lines: [] };
    const r1 = el('div', 'sm-row sm-pre'); root.appendChild(r1); r1.appendChild(el('span', 'sm-sl-l', 'from n ='));
    const bi = [1, 2, 3, 4, 5, 6].map(n => { const b = button(r1, String(n), 'sm-chip' + (n === S.ni ? ' on' : ''), () => { S.ni = n; bi.forEach(x => x.classList.toggle('on', x === b)); S.t = 0; }); return b; });
    const r2 = el('div', 'sm-row sm-pre'); root.appendChild(r2); r2.appendChild(el('span', 'sm-sl-l', 'to n ='));
    const bf = [1, 2, 3, 4, 5, 6, '∞'].map(n => { const b = button(r2, String(n), 'sm-chip' + (n === S.nf ? ' on' : ''), () => { S.nf = n; bf.forEach(x => x.classList.toggle('on', x === b)); S.t = 0; }); return b; });
    const cv = canvas(root); const ro = readouts(root);
    const En = n => n === '∞' ? 0 : -13.6 / (n * n);
    function draw() {
      const ctx = cv.ctx, { w, h: H } = cv.size(0.55, 280, 400); ctx.clearRect(0, 0, w, H); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, H);
      const narrow = w < 520, lx = 50, lw = narrow ? w - 110 : w * 0.5, Y = E => 20 + (Math.log(1 + (-E)) / Math.log(14.6)) * (H - (narrow ? 120 : 50));
      [1, 2, 3, 4, 5, 6, '∞'].forEach(n => { const y = Y(En(n)); ctx.strokeStyle = COL.ink; ctx.lineWidth = n === '∞' ? 1 : 1.6; ctx.setLineDash(n === '∞' ? [4, 3] : []); ctx.beginPath(); ctx.moveTo(lx, y); ctx.lineTo(lx + lw, y); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'n = ' + n, lx - 6, y + 4, { a: 'right', fs: 11 }); text(ctx, fmt(En(n), 2) + ' eV', lx + lw + 4, y + 4, { fs: 10.5, c: COL.sub }); });
      const Ei = En(S.ni), Ef = En(S.nf), dE = Ei - Ef, emit = dE > 0, lam = Math.abs(dE) > 1e-9 ? 1239.8 / Math.abs(dE) : Infinity;
      const xa = lx + lw * 0.5, y1 = Y(Ei), y2 = Y(Ef), prog = Math.min(1, S.t / 0.8);
      if (S.ni !== S.nf) { ctx.strokeStyle = emit ? COL.r : COL.v; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(xa, y1); ctx.lineTo(xa, y1 + (y2 - y1) * prog); ctx.stroke(); ctx.fillStyle = ctx.strokeStyle; ctx.beginPath(); ctx.arc(xa, y1 + (y2 - y1) * prog, 5, 0, 7); ctx.fill();
        // photon squiggle
        const col = lam >= 380 && lam <= 750 ? css(rgbOf(lam)) : lam < 380 ? '#7A5AE0' : '#B54242'; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const x = xa + (emit ? 10 : -70) + i, yy = (y1 + y2) / 2 + 6 * Math.sin(i * 0.6 - S.t * 12); i ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke(); text(ctx, emit ? 'photon emitted' : 'photon absorbed', xa + (emit ? 12 : -70), (y1 + y2) / 2 - 12, { fs: 11, c: COL.sub }); }
      // spectrum strip
      const sx = narrow ? 20 : lx + lw + 80, sy = narrow ? H - 50 : 40, sw = narrow ? w - 40 : w - sx - 14, sh = 30;
      ctx.fillStyle = '#111'; ctx.fillRect(sx, sy, sw, sh); text(ctx, 'visible emission lines seen so far', sx, sy - 6, { fs: 10.5 });
      S.lines.forEach(l => { const x = sx + (l - 380) / 370 * sw; ctx.fillStyle = css(rgbOf(l)); ctx.fillRect(x - 1.5, sy, 3, sh); });
      [400, 500, 600, 700].forEach(l => text(ctx, l, sx + (l - 380) / 370 * sw, sy + sh + 12, { a: 'center', fs: 10, c: COL.sub }));
      const series = { 1: 'Lyman (UV)', 2: 'Balmer (visible/near UV)', 3: 'Paschen (IR)', 4: 'Brackett (IR)', 5: 'Pfund (IR)' };
      ro([['ΔE = Eᵢ − E_f', fmt(dE, 2) + ' eV', 'hl'], ['photon wavelength', isFinite(lam) ? fmt(lam, 0) + ' nm' : '—', 'hl'], ['process', S.ni === S.nf ? 'choose two different levels' : emit ? 'emission' : S.nf === '∞' ? 'ionisation' : 'absorption (excitation)'], ['series', emit ? series[S.nf] || '' : '']]);
    }
    loop(cv, dt => { const before = S.t; S.t += dt; if (before < 0.8 && S.t >= 0.8) { const dE = En(S.ni) - En(S.nf), l = 1239.8 / dE; if (dE > 0 && l >= 380 && l <= 750 && !S.lines.some(x => Math.abs(x - l) < 1)) S.lines.push(l); } draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 4. X-ray spectrum ----------
  window.PhysiQSims.add('xray', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts } = window.PhysiQSims.U;
    const TG = { Molybdenum: { Z: 42, ka: 0.0711, kb: 0.0632, edge: 20.0 }, Copper: { Z: 29, ka: 0.1542, kb: 0.1392, edge: 8.98 } };
    const S = { V: 30, I: 1, tg: 'Molybdenum' };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const bs = Object.keys(TG).map(n => { const b = button(pre, n + ' target', 'sm-chip' + (n === S.tg ? ' on' : ''), () => { S.tg = n; bs.forEach(x => x.classList.toggle('on', x === b)); draw(); }); return b; });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'accelerating voltage', 5, 40, 0.5, S.V, 'kV', v => { S.V = v; draw(); });
    slider(ctl, 'tube current', 0.2, 2, 0.1, S.I, 'mA', v => { S.I = v; draw(); });
    const cv = canvas(root); const ro = readouts(root);
    function draw() {
      const ctx = cv.ctx, { w, h: H } = cv.size(0.5, 240, 340); ctx.clearRect(0, 0, w, H); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, H);
      const t = TG[S.tg], lmin = 1.2398 / S.V, L0 = 0.02, L1 = 0.2, box = { x: 46, y: 20, w: w - 60, h: H - 56 }, X = l => box.x + (l - L0) / (L1 - L0) * box.w, Ymax = 4.5, Y = v => box.y + box.h - Math.min(v, Ymax) / Ymax * box.h;
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(box.x, box.y); ctx.lineTo(box.x, box.y + box.h); ctx.lineTo(box.x + box.w, box.y + box.h); ctx.stroke();
      const cont = l => l <= lmin ? 0 : S.I * t.Z / 42 * (l / lmin - 1) / (l * l) * 0.0045 * (S.V / 30);
      ctx.strokeStyle = COL.v; ctx.lineWidth = 2.2; ctx.beginPath(); for (let i = 0; i <= 400; i++) { const l = L0 + (L1 - L0) * i / 400; i ? ctx.lineTo(X(l), Y(cont(l))) : ctx.moveTo(X(l), Y(cont(l))); } ctx.stroke();
      const on = S.V > t.edge; if (on) { const amp = S.I * (S.V / t.edge - 1) * 2.2; [[t.ka, 1, 'Kα'], [t.kb, 0.35, 'Kβ']].forEach(([l, s, n]) => { const y0 = Y(cont(l)), y1 = Y(cont(l) + amp * s); ctx.strokeStyle = COL.r; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(l), y0); ctx.lineTo(X(l), y1); ctx.stroke(); text(ctx, n, X(l) + 4, Math.max(box.y + 10, y1 + 10), { fs: 11, c: COL.r, b: 1 }); }); }
      ctx.setLineDash([4, 3]); ctx.strokeStyle = COL.o; ctx.beginPath(); ctx.moveTo(X(lmin), box.y); ctx.lineTo(X(lmin), box.y + box.h); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'λmin', X(lmin) + 3, box.y + 12, { fs: 11, c: COL.o, b: 1 });
      [0.05, 0.1, 0.15, 0.2].forEach(l => text(ctx, l.toFixed(2), X(l), box.y + box.h + 13, { a: 'center', fs: 10, c: COL.sub })); text(ctx, 'λ / nm', box.x + box.w, box.y + box.h + 28, { a: 'right', fs: 11, c: COL.sub }); text(ctx, 'intensity', box.x, box.y - 6, { fs: 11, b: 1 });
      ro([['λmin = hc/eV', fmt(lmin * 1000, 1) + ' pm', 'hl'], ['max photon energy', fmt(S.V, 1) + ' keV'], ['characteristic K lines', on ? 'present (eV > K-shell binding energy ' + t.edge + ' keV)' : 'absent: electrons cannot remove K-shell electrons (' + t.edge + ' keV needed)', on ? 'hl' : '']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 5. Bragg's law ----------
  window.PhysiQSims.add('bragg', function (root) {
    const { COL, fmt, el, slider, canvas, text, readouts } = window.PhysiQSims.U;
    const S = { th: 15, d: 0.28, lam: 0.154 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'glancing angle θ', 2, 80, 0.5, S.th, '°', v => { S.th = v; draw(); });
    slider(ctl, 'plane spacing d', 0.15, 0.5, 0.01, S.d, 'nm', v => { S.d = v; draw(); });
    slider(ctl, 'wavelength λ', 0.05, 0.3, 0.002, S.lam, 'nm', v => { S.lam = v; draw(); });
    const cv = canvas(root); const ro = readouts(root);
    function draw() {
      const ctx = cv.ctx, { w, h: H } = cv.size(0.5, 240, 340); ctx.clearRect(0, 0, w, H); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, H);
      const r = S.th * Math.PI / 180, pd = 2 * S.d * Math.sin(r), m = pd / S.lam, near = Math.round(m), off = Math.abs(m - near), N = 20, I = near >= 1 ? Math.pow(Math.sin(Math.PI * m * N) / (N * Math.sin(Math.PI * m) || 1), 2) : 0;
      const cx = w * 0.42, py = H * 0.48, sp = 40 + S.d * 60;
      for (let j = 0; j < 3; j++) { const y = py + j * sp; ctx.strokeStyle = '#C9CDBF'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(w - 20, y); ctx.stroke(); ctx.setLineDash([]); for (let x = 40; x < w - 20; x += 36) { ctx.fillStyle = COL.v; ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fill(); } }
      const Lr = Math.min(cx - 20, 220);
      [0, 1].forEach(j => { const y = py + j * sp, x0 = cx + (j ? sp / Math.tan(r) * 0 : 0); ctx.strokeStyle = j ? COL.o : COL.r; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0 - Lr * Math.cos(r), y - Lr * Math.sin(r) - j * 0); ctx.lineTo(x0, y); ctx.lineTo(x0 + Lr * Math.cos(r), y - Lr * Math.sin(r)); ctx.stroke(); });
      text(ctx, 'θ', cx - 40, py - 6, { it: 1, b: 1, c: COL.r });
      // detector meter
      const mx = w - 70, my = 30; ctx.fillStyle = '#fff'; ctx.strokeStyle = COL.ink; ctx.fillRect(mx, my, 50, 90); ctx.strokeRect(mx, my, 50, 90); ctx.fillStyle = I > 0.5 ? COL.gr : COL.o; ctx.fillRect(mx + 8, my + 82 - 74 * I, 34, 74 * I); text(ctx, 'detector', mx + 25, my + 104, { a: 'center', fs: 11 });
      text(ctx, I > 0.5 ? 'constructive: 2d sin θ = ' + near + 'λ' : 'reflections cancel', 14, 20, { b: 1, fs: 12, c: I > 0.5 ? COL.gr : COL.r });
      ro([['path difference 2d sin θ', fmt(pd, 3) + ' nm', 'hl'], ['2d sin θ / λ', fmt(m, 2), 'hl'], ['Bragg angles (m = 1, 2)', [1, 2].map(k => { const s = k * S.lam / (2 * S.d); return s <= 1 ? fmt(Math.asin(s) * 180 / Math.PI, 1) + '°' : '—'; }).join(', ')]]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });
  // ---------- X-ray tube and a radiograph ----------
  window.PhysiQSims.add('xtube', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts, loop } = window.PhysiQSims.U;
    const S = { on: false, I: 5, V: 70, el: [], ph: [], heat: 0, spin: 0, img: null, t: 0 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'tube current (filament heating)', 1, 10, 1, S.I, 'mA', x => { S.I = x; });
    slider(ctl, 'tube voltage', 20, 140, 5, S.V, 'kV', x => { S.V = x; });
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const ob = button(bar, '⚡ Switch on the tube', '', () => { S.on = !S.on; ob.textContent = S.on ? '⏹ Switch off' : '⚡ Switch on the tube'; });
    button(bar, 'New film', '', () => { S.img = null; });
    const cv = canvas(root); const ro = readouts(root);
    // the hand in a unit box (u across, v down): finger outlines and bones (segments with joints between them)
    const FC = [0.30, 0.42, 0.54, 0.66], FT = [0.06, 0.0, 0.03, 0.10];
    const fingers = FC.map((c, i) => [c - 0.055, FT[i], c + 0.055, 0.56]);
    const segs = [];
    FC.forEach((c, i) => { const t = FT[i] + 0.03, L = 0.53 - t, r = 0.017; [[t, t + L * 0.22], [t + L * 0.31, t + L * 0.57], [t + L * 0.66, 0.53]].forEach(([a, b]) => segs.push([c, a + r, c, b - r, r])); segs.push([c, 0.58 + r, c + (c - 0.48) * 0.25, 0.9 - r, 0.019]); });
    segs.push([0.835, 0.44, 0.795, 0.54, 0.02], [0.78, 0.61, 0.745, 0.74, 0.021], [0.73, 0.80, 0.69, 0.90, 0.021]);
    [[0.34, 0.95], [0.44, 0.95], [0.54, 0.95], [0.63, 0.95]].forEach(([u, v]) => segs.push([u - 0.02, v, u + 0.02, v, 0.03]));
    const thumb = [[0.86, 0.38], [0.66, 0.95]];
    function dseg(u, v, [x1, y1, x2, y2, r]) { const dx = x2 - x1, dy = y2 - y1, L2 = dx * dx + dy * dy || 1e-9; let t = ((u - x1) * dx + (v - y1) * dy) / L2; t = Math.max(0, Math.min(1, t)); const ex = x1 + t * dx - u, ey = y1 + t * dy - v; return Math.hypot(ex, ey) < r * (1 + 0.35 * Math.abs(2 * t - 1)); }
    const isBone = (u, v) => segs.some(sg => dseg(u, v, sg));
    const inThumb = (u, v) => dseg(u, v, [thumb[0][0], thumb[0][1], thumb[1][0], thumb[1][1], 0.065]);
    const isTissue = (u, v) => (u > 0.24 && u < 0.72 && v > 0.5 && v < 1.0) || fingers.some(([a, b, c, d]) => u > a && u < c && v > b && v < d) || inThumb(u, v);
    const NX = 64, NY = 60;
    let tr = null, trV = -1;
    function trans() {   // fraction of X-rays getting through each pixel; lower voltage → absorbed more
      if (trV === S.V) return tr; trV = S.V; tr = new Float32Array(NX * NY); const mu = Math.pow(70 / S.V, 1.5);
      for (let k = 0; k < NX * NY; k++) { const u = (k % NX + 0.5) / NX, v = (Math.floor(k / NX) + 0.5) / NY; let x = 1; if (isTissue(u, v)) x *= Math.exp(-1.0 * mu); if (isBone(u, v)) x *= Math.exp(-3.0 * mu); tr[k] = x; }
      return tr;
    }
    function frame(dt) {
      if (dt < 0) dt = 0; dt = Math.min(dt, 0.05); S.t += dt;
      const ctx = cv.ctx, narrow = root.clientWidth < 520, { w, h } = narrow ? cv.size(0.92, 340, 420) : cv.size(0.55, 360, 420); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const tx = 20, ty = 30, th = 64, tw = narrow ? w - 40 : w * 0.52;
      const cx = tx + 40, ax = tx + tw - 60, ay = ty + th / 2;
      // hand, film positions
      const top = ty + th + 34, avail = h - top - 30;
      let hw, hx, ix;
      if (narrow) { hw = Math.min((w - 60) / 2, avail / 0.95); hx = w - 20 - hw; ix = 20; }
      else { hw = Math.min(w * 0.28, avail / 0.95); hx = ax - hw / 2 - 6; ix = Math.max(hx + hw + 40, w * 0.66); }
      const hh2 = hw * 0.95, hy = top, dy = hy + hh2 + 4, iy = hy;
      // tube
      ctx.fillStyle = 'rgba(205,225,240,.6)'; ctx.strokeStyle = '#7D8C99'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(tx + tw / 2, ay, tw / 2, th / 2, 0, 0, 7); ctx.fill(); ctx.stroke();
      text(ctx, 'vacuum', tx + tw / 2, ty + 14, { a: 'center', fs: 10.5, c: COL.sub });
      const glow = S.I / 10;
      ctx.strokeStyle = S.on ? `rgb(255,${Math.round(200 - 120 * glow)},60)` : '#666'; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= 8; i++) ctx.lineTo(cx + (i % 2 ? 5 : -5), ay - 14 + i * 3.5); ctx.stroke();
      text(ctx, 'hot filament (−)', tx + 4, ty - 8, { fs: 10.5, c: COL.sub });
      text(ctx, 'spinning tungsten target (+)', tx + tw, ty - 8, { a: 'right', fs: 10.5, c: COL.sub });
      S.spin += dt * (S.on ? 20 : 0);
      ctx.fillStyle = '#8A6F4D'; ctx.fillRect(ax + 14, ay - 4, 36, 8);
      ctx.save(); ctx.translate(ax, ay); ctx.fillStyle = S.heat > 0.05 ? `rgb(${Math.round(140 + 115 * S.heat)},${Math.round(140 - 40 * S.heat)},${Math.round(140 - 90 * S.heat)})` : '#8C8C8C'; ctx.beginPath(); ctx.moveTo(-6, -22); ctx.lineTo(14, -18); ctx.lineTo(14, 18); ctx.lineTo(6, 22); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 1; const sy = ((S.spin * 10) % 36) - 18; ctx.beginPath(); ctx.moveTo(-2, sy); ctx.lineTo(13, sy + 2); ctx.stroke(); ctx.restore();
      ctx.fillStyle = '#E2C35A'; ctx.fillRect(ax - 22, ty + th - 6, 28, 5);
      // electrons
      const vpx = 140 + S.V * 4;
      if (S.on && Math.random() < S.I * 0.8 * dt * 10) S.el.push({ x: cx + 6, y: ay + (Math.random() - 0.5) * 10 });
      S.el.forEach(e => { e.x += vpx * dt; });
      S.el = S.el.filter(e => {
        if (e.x < ax - 4) return true;
        S.heat = Math.min(1, S.heat + 0.004 * (S.V / 70));
        if (Math.random() < 0.3) { const u = 0.15 + Math.random() * 0.75, v = Math.random(), x0 = ax - 8, y0 = ty + th - 4, X = hx + u * hw, Y = hy + v * hh2, T = (Y - y0) / 300; S.ph.push({ x: x0, y: y0, vx: (X - x0) / T, vy: 300, stopY: Y, pass: Math.random() < trans()[Math.min(NY - 1, Math.floor(v * NY)) * NX + Math.min(NX - 1, Math.floor(u * NX))] }); }
        return false;
      });
      S.heat = Math.max(0, S.heat - dt * 0.12);
      ctx.fillStyle = '#2C6BB3'; S.el.forEach(e => { ctx.beginPath(); ctx.arc(e.x, e.y, 2.4, 0, 7); ctx.fill(); });
      // hand
      ctx.save(); ctx.globalAlpha = 0.9; ctx.fillStyle = '#F1C27D';
      fingers.forEach(([a, b, c, d]) => { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(hx + a * hw, hy + b * hh2, (c - a) * hw, (d - b) * hh2, 9) : ctx.rect(hx + a * hw, hy + b * hh2, (c - a) * hw, (d - b) * hh2); ctx.fill(); });
      ctx.fillRect(hx + 0.24 * hw, hy + 0.5 * hh2, 0.48 * hw, 0.5 * hh2);
      ctx.lineCap = 'round'; ctx.strokeStyle = '#F1C27D'; ctx.lineWidth = 0.13 * hw; ctx.beginPath(); ctx.moveTo(hx + thumb[0][0] * hw, hy + thumb[0][1] * hh2); ctx.lineTo(hx + thumb[1][0] * hw, hy + thumb[1][1] * hh2); ctx.stroke(); ctx.lineCap = 'butt'; ctx.restore();
      ctx.fillStyle = '#C9CED6'; ctx.fillRect(hx, dy, hw, 6); text(ctx, 'detector under the hand', hx + hw / 2, dy + 18, { a: 'center', fs: 10.5, c: COL.sub });
      // image builds up: each pixel gets photons in proportion to what passes through the hand there
      if (!S.img) S.img = new Float32Array(NX * NY);
      if (S.on) { const t = trans(), rate = S.I * dt * 0.08; for (let k = 0; k < NX * NY; k++) S.img[k] += rate * t[k] * (0.6 + 0.8 * Math.random()); }
      const pw = hw / NX, ph = hh2 / NY;
      ctx.fillStyle = '#E8ECEF'; ctx.fillRect(ix, iy, hw, hh2);
      for (let k = 0; k < NX * NY; k++) { const d = Math.min(1, S.img[k]); if (d < 0.02) continue; const g = Math.round(232 - 214 * d); ctx.fillStyle = `rgb(${g},${g + 3},${g + 7})`; ctx.fillRect(ix + (k % NX) * pw, iy + Math.floor(k / NX) * ph, pw + 0.6, ph + 0.6); }
      ctx.strokeStyle = '#999'; ctx.lineWidth = 1; ctx.strokeRect(ix, iy, hw, hh2);
      text(ctx, 'X-ray image', ix + hw / 2, iy + hh2 + 18, { a: 'center', fs: 11, b: 1 });
      // photons: absorbed in the hand or pass through to the detector
      S.ph = S.ph.filter(p => { p.x += p.vx * dt; p.y += p.vy * dt; if (!p.pass && p.y >= p.stopY) return false; if (p.y >= dy) return false; return true; });
      ctx.strokeStyle = '#8A3FD1'; ctx.lineWidth = 1.4; S.ph.forEach(p => { const n = Math.hypot(p.vx, p.vy), ux = p.vx / n, uy = p.vy / n; ctx.beginPath(); for (let j = 0; j < 12; j++) { const s = 2.5 * Math.sin(j * 1.5), xx = p.x - ux * j * 1.8 - uy * s, yy = p.y - uy * j * 1.8 + ux * s; j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); });
      if (!narrow) { const bx = tx + tw + 24, by = ty; ctx.fillStyle = '#eee'; ctx.fillRect(bx, by, 12, th); ctx.fillStyle = '#E4572E'; ctx.fillRect(bx, by + th * (1 - S.heat), 12, th * S.heat); text(ctx, 'target temperature', bx + 18, by + th / 2, { fs: 10.5, c: COL.sub }); }
      const P = S.I * S.V;
      ro([['electrons per second n = I/e', fmt(S.I * 1e-3 / 1.6e-19 / 1e16, 2) + ' × 10¹⁶', 'hl'], ['energy of each electron eV', fmt(S.V, 0) + ' keV', 'hl'], ['shortest wavelength λmin = hc/eV', fmt(6.63e-34 * 3e8 / (1.6e-19 * S.V * 1e3) * 1e12, 1) + ' pm'], ['power supplied IV', fmt(P, 0) + ' W'], ['heat in the target (≈ 99%)', fmt(P * 0.99, 0) + ' W']]);
    }
    loop(cv, frame);
  });
})();
