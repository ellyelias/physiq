/* Semester 3 Chapter 25 Nuclear Physics: full notes by Cikgu Suhaili (from STPM_2026_UNIT_26_NUCLEAR_PHYSICS.pptx and unit_15_radioactivity.ppt).
   App chapter 25 = STPM 2026 syllabus chapter 26. */
(function () {
  'use strict';
  const { card, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4, pq } = window.PhysiQLessons.H;
  const nuc = (A, Z, X) => `<span class="ls-nuc"><span class="ls-nuc-s"><sup>${A}</sup><sub>${Z}</sub></span>${X}</span>`;
  const MeV = '931.5 MeV u<sup>−1</sup>';

  // binding energy per nucleon (semi-empirical mass formula), MeV
  function bea(A) { if (A < 2) return 0; const Z = Math.round(A / (1.98 + 0.0155 * Math.pow(A, 2 / 3))); const N = A - Z;
    let B = 15.75 * A - 17.8 * Math.pow(A, 2 / 3) - 0.711 * Z * (Z - 1) / Math.pow(A, 1 / 3) - 23.7 * (N - Z) * (N - Z) / A; return Math.max(0, B / A); }
  const LIGHT = { 2: 1.11, 3: 2.83, 4: 7.07, 6: 5.33, 7: 5.61, 9: 6.46, 12: 7.68, 14: 7.48, 16: 7.98, 20: 8.03 };
  const beaPlot = A => LIGHT[A] != null ? LIGHT[A] : A < 20 ? Math.min(8, 7.1 + (A - 4) * 0.06) : bea(A);

  // ---------- figures ----------
  const F = {};
  F.becurve = () => { const X = A => 40 + A / 240 * 300, Y = b => 170 - b / 9 * 150; let d = ''; for (let A = 4; A <= 240; A += 2) d += (A > 4 ? ' L' : 'M') + X(A).toFixed(1) + ',' + Y(beaPlot(A)).toFixed(1);
    const pts = [[2, 'H-2'], [4, 'He-4'], [56, 'Fe-56'], [235, 'U-235']];
    return svg(380, 200, axes(40, 170, 315, 160, 'A', 'E_B/A', { noO: 1 }) + P('M' + X(2) + ',' + Y(1.11) + ' L' + X(3) + ',' + Y(2.83) + ' L' + X(4) + ',' + Y(7.07) + ' L' + X(6) + ',' + Y(5.33) + ' L' + X(7) + ',' + Y(5.61) + ' L' + X(12) + ',' + Y(7.68), 'v', { w: 1.6 }) + P(d.replace(/^M[^L]*L/, 'M' + X(12) + ',' + Y(7.68) + ' L'), 'v', { w: 2.4 }) +
      pts.map(([A, s]) => dot(X(A), Y(beaPlot(A)), 3, C.r) + T(X(A) + 5, Y(beaPlot(A)) - 6, s, { fs: 10.5, a: 'start' })).join('') + [2, 4, 6, 8].map(b => T(34, Y(b) + 4, b, { fs: 10, a: 'end', c: C.sub })).join('') + [50, 100, 150, 200].map(A => T(X(A), 184, A, { fs: 10, c: C.sub })).join('') +
      L(X(10), Y(3.4), X(40), Y(3.4), 'g', 'e', { w: 1.6 }) + T(X(4), Y(2.9), 'fusion', { fs: 11, c: C.g, a: 'start', b: 1 }) + L(X(230), Y(6.4), X(140), Y(6.4), 'o', 'e', { w: 1.6 }) + T(X(200), Y(6.0), 'fission', { fs: 11, c: C.o, b: 1 }) + T(X(110), Y(7.2), 'most stable near A ≈ 56–62', { fs: 10.5, c: C.r, a: 'start' }), 400); };
  F.spec = () => svg(380, 210, `<rect x="40" y="16" width="40" height="18" fill="${C.sub}"/>` + T(60, 12, 'ion source', { fs: 10.5 }) + L(60, 34, 60, 104, 'o', 'e', { w: 2 }) + `<rect x="40" y="50" width="6" height="50" fill="${C.r}"/><rect x="74" y="50" width="6" height="50" fill="${C.v}"/>` + T(30, 80, '+', { b: 1, c: C.r }) + T(90, 80, '−', { b: 1, c: C.v }) + T(110, 64, 'velocity selector:', { fs: 10.5, a: 'start' }) + T(110, 78, 'E and B₁ ⊥, v = E/B₁', { fs: 10.5, a: 'start' }) +
    `<rect x="20" y="104" width="340" height="100" fill="#EEF4FA"/>` + T(340, 198, 'B₂ (into page)', { fs: 10.5, a: 'end', c: C.sub }) + P('M60,104 A60,60 0 0,0 180,104', 'r', { w: 2 }) + P('M60,104 A80,80 0 0,0 220,104', 'g', { w: 2 }) + L(20, 104, 360, 104, 'k', '', { w: 3 }) + T(180, 98, 'm₁', { fs: 11, c: C.r }) + T(222, 98, 'm₂', { fs: 11, c: C.g, a: 'start' }) + T(290, 98, 'photographic plate', { fs: 10.5 }) + T(120, 150, 'r = mv/B₂q ∝ m', { fs: 11, it: 1 }), 400);
  F.penetrate = () => svg(380, 150, [['α', 30, 110, C.r], ['β', 70, 210, C.v], ['γ', 110, 340, C.g]].map(([s, y, x2, c]) => L(20, y, x2, y, c === C.r ? 'r' : c === C.v ? 'v' : 'g', 'e', { w: 2.4 }) + T(14, y + 5, s, { b: 1, a: 'end', c })).join('') +
    `<rect x="110" y="10" width="6" height="120" fill="#E9DFC4" stroke="${C.ink}"/><rect x="210" y="10" width="14" height="120" fill="#BFC6CF" stroke="${C.ink}"/><rect x="340" y="10" width="26" height="120" fill="#8B8F96" stroke="${C.ink}"/>` + T(113, 146, 'paper', { fs: 10.5 }) + T(217, 146, 'few mm Al', { fs: 10.5 }) + T(353, 146, 'thick lead', { fs: 10.5 }), 380);
  F.decay = () => { const X = t => 40 + t * 70, Y = n => 150 - n * 130; let d = ''; for (let i = 0; i <= 100; i++) { const t = i / 25; d += (i ? ' L' : 'M') + X(t).toFixed(1) + ',' + Y(Math.pow(0.5, t)).toFixed(1); }
    return svg(360, 180, axes(40, 150, 300, 140, 't', 'N', { noO: 1 }) + P(d, 'v', { w: 2.4 }) + [1, 2, 3].map(k => L(X(k), 150, X(k), Y(Math.pow(0.5, k)), 's', '', { d: '3 3', w: 1 }) + L(40, Y(Math.pow(0.5, k)), X(k), Y(Math.pow(0.5, k)), 's', '', { d: '3 3', w: 1 }) + T(X(k), 166, k + 'T½', { fs: 10.5 })).join('') +
      T(34, Y(1) + 4, 'N₀', { fs: 11, a: 'end' }) + T(34, Y(0.5) + 4, 'N₀/2', { fs: 11, a: 'end' }) + T(34, Y(0.25) + 4, 'N₀/4', { fs: 11, a: 'end' }) + T(250, 60, 'N = N₀e^(−λt)', { fs: 12, it: 1, c: C.v }), 380); };
  F.chain = () => { let s = ''; const node = (x, y) => dot(x, y, 7, '#E7B54A'); const n = (x1, y1, x2, y2) => L(x1, y1, x2, y2, 'v', 'e', { w: 1.2 });
    s += L(10, 100, 46, 100, 'v', 'e', { w: 1.4 }) + node(54, 100); [[130, 50], [130, 100], [130, 150]].forEach(([x, y]) => { s += n(60, 100, x - 8, y) + node(x, y); [[-30, 0], [0, 0], [30, 0]].forEach(([dy], k) => { const x2 = 220, y2 = y + (k - 1) * 18; s += n(x + 6, y, x2 - 8, y2) + node(x2, y2) + L(x2 + 6, y2, x2 + 40, y2 + (k - 1) * 6, 'v', 'e', { w: 1 }); }); });
    return svg(300, 200, s + T(54, 124, '²³⁵U', { fs: 10.5 }) + T(150, 194, 'each fission releases 2–3 neutrons', { fs: 10.5, c: C.sub }), 320); };
  F.reactor = () => svg(380, 220, `<rect x="40" y="30" width="200" height="170" fill="#DCEBF7" stroke="${C.ink}" stroke-width="2"/>` + [70, 120, 170, 210].map(x => `<rect x="${x}" y="70" width="10" height="120" fill="#E7B54A" stroke="${C.ink}"/>`).join('') + [95, 145, 190].map(x => `<rect x="${x}" y="20" width="8" height="${x === 145 ? 120 : 80}" fill="#4A4F57"/>`).join('') +
    T(250, 60, 'control rods (boron or cadmium):', { fs: 10.5, a: 'start' }) + T(250, 74, 'absorb neutrons; lowered to', { fs: 10.5, a: 'start' }) + T(250, 88, 'slow the reaction', { fs: 10.5, a: 'start' }) + T(250, 120, 'fuel rods: enriched uranium', { fs: 10.5, a: 'start', c: C.o }) + T(250, 134, '(3–5% U-235)', { fs: 10.5, a: 'start', c: C.o }) + T(250, 166, 'moderator (water or graphite):', { fs: 10.5, a: 'start', c: C.v }) + T(250, 180, 'slows the neutrons down', { fs: 10.5, a: 'start', c: C.v }) + T(140, 214, 'coolant carries the heat to the boiler', { fs: 10.5, c: C.sub }), 400);

  const S = `
${sec('25-1', '25.1 Nucleus', `
<p>The nucleus (about 10<sup>−15</sup> m across) contains protons and neutrons, together called <b>nucleons</b>.</p>
${h4('Discovery of protons and neutrons')}
${ul([`<b>Proton</b>: Rutherford (1919) bombarded nitrogen with alpha particles and found that hydrogen nuclei were knocked out. He identified this positively charged particle, present in every nucleus, as the proton.`, `<b>Neutron</b>: Chadwick (1932) showed that the radiation produced when beryllium is bombarded with alpha particles consists of uncharged particles with a mass close to that of the proton: neutrons.`, `(Experimental details are not required.)`])}
${table(['Particle', 'Mass / kg', 'Charge / C'], [['proton', '1.672 × 10<sup>−27</sup>', '+1.60 × 10<sup>−19</sup>'], ['neutron', '1.675 × 10<sup>−27</sup>', '0']])}
${ul([`<b>Proton number</b> (atomic number) <i>Z</i>: the number of protons in the nucleus.`, `<b>Nucleon number</b> (mass number) <i>A</i>: the total number of protons and neutrons. Number of neutrons <i>N</i> = <i>A</i> − <i>Z</i>.`, `A nuclide is written ${nuc('<i>A</i>', '<i>Z</i>', 'X')}, e.g. ${nuc(56, 26, 'Fe')} has 26 protons and 30 neutrons.`, `<b>Isotopes</b>: atoms of the same element with the same number of protons but different numbers of neutrons, e.g. hydrogen ${nuc(1, 1, 'H')}, deuterium ${nuc(2, 1, 'H')} and tritium ${nuc(3, 1, 'H')}.`])}
${example('25.1.1', `Find the number of protons, neutrons and electrons in a neutral atom of each nuclide: ${nuc(9, 4, 'Be')}, ${nuc(23, 11, 'Na')}, ${nuc(59, 27, 'Co')}, ${nuc(133, 55, 'Cs')}, ${nuc(238, 92, 'U')}.`,
  table(['Nuclide', 'Protons', 'Neutrons', 'Electrons'], [[nuc(9, 4, 'Be'), '4', '5', '4'], [nuc(23, 11, 'Na'), '11', '12', '11'], [nuc(59, 27, 'Co'), '27', '32', '27'], [nuc(133, 55, 'Cs'), '55', '78', '55'], [nuc(238, 92, 'U'), '92', '146', '92']]))}
${h4('The mass spectrometer')}
${fig(F.spec(), 'Figure 25.1: a Bainbridge mass spectrometer.')}
${ul([`Positive ions pass through a <b>velocity selector</b> with perpendicular fields <i>E</i> and <i>B</i><sub>1</sub>. Only ions with <i>qE</i> = <i>qvB</i><sub>1</sub>, i.e. <i>v</i> = <i>E</i>/<i>B</i><sub>1</sub>, go straight through.`, `In the uniform field <i>B</i><sub>2</sub> the ions move in semicircles: <i>qvB</i><sub>2</sub> = <i>mv</i><sup>2</sup>/<i>r</i>, so <i>r</i> = ${fr('<i>mE</i>', '<i>qB</i><sub>1</sub><i>B</i><sub>2</sub>')} ∝ <i>m</i>.`, `Isotopes of different mass land at different places on the plate: <i>m</i><sub>1</sub>/<i>m</i><sub>2</sub> = <i>r</i><sub>1</sub>/<i>r</i><sub>2</sub>. It is used to measure atomic masses and the abundance of isotopes.`])}
${h4('Mass defect and binding energy')}
${def('Mass defect, Δ<i>m</i>', `${red('the difference between the total mass of the separate nucleons and the mass of the nucleus')}.`)}
${key(`Δ<i>m</i> = <i>Zm</i><sub>p</sub> + (<i>A</i> − <i>Z</i>)<i>m</i><sub>n</sub> − <i>M</i>`)}
${def('Binding energy, <i>E</i><sub>B</sub>', `${red('the energy needed to separate a nucleus completely into its individual protons and neutrons')}. It is also the energy released when the nucleus is formed from its nucleons.`)}
${key(`<i>E</i> = <i>mc</i><sup>2</sup> &nbsp;&nbsp; ⇒ &nbsp;&nbsp; <i>E</i><sub>B</sub> = Δ<i>m c</i><sup>2</sup>`, 'Einstein’s mass–energy equivalence: mass is a form of energy')}
${h4('Units: u and eV')}
${ul([`<b>Unified atomic mass unit</b>: 1 u = 1/12 of the mass of a carbon-12 atom = 1.66 × 10<sup>−27</sup> kg.`, `Its energy equivalent: <i>E</i> = (1.66 × 10<sup>−27</sup>)(3.00 × 10<sup>8</sup>)<sup>2</sup> = 1.49 × 10<sup>−10</sup> J = 931.5 MeV.`])}
${key(`1 u = 1.66 × 10<sup>−27</sup> kg ≙ 931.5 MeV &nbsp;&nbsp; 1 eV = 1.60 × 10<sup>−19</sup> J`, 'so <i>E</i><sub>B</sub> (MeV) = Δ<i>m</i> (u) × 931.5')}
${h4('Binding energy per nucleon')}
${fig(F.becurve(), 'Figure 25.2: binding energy per nucleon against nucleon number.')}
${ul([`Binding energy per nucleon = <i>E</i><sub>B</sub>/<i>A</i>. It measures the <b>stability</b> of a nucleus: the larger it is, the more tightly bound and stable the nucleus.`, `For light nuclei it rises rapidly with <i>A</i> (helium-4 is unusually stable, a peak at 7.1 MeV).`, `It is largest, about 8.8 MeV, for <i>A</i> ≈ 56–62 (iron and nickel): the most stable nuclei.`, `For heavier nuclei it decreases slowly, to about 7.6 MeV for uranium.`, `Energy is released when nuclei move towards the peak: light nuclei <b>fuse</b>, heavy nuclei <b>split</b> (fission).`])}
${sim('becurve', 'Binding energy per nucleon', 'Move along the curve to see how tightly bound each nucleus is. Then try a fission of uranium and a fusion of hydrogen: both move the nucleons up the curve and release energy.')}
${example('25.1.2', `Find the binding energy of deuterium ${nuc(2, 1, 'H')}. (nucleus 2.013553 u, proton 1.007276 u, neutron 1.008665 u)`,
  steps([`Δ<i>m</i> = 1.007276 + 1.008665 − 2.013553 = 0.002388 u`, `<i>E</i><sub>B</sub> = 0.002388 × 931.5 = <b>2.22 MeV</b> (= 3.57 × 10<sup>−13</sup> J)`]))}
${example('25.1.3', `The binding energy of ${nuc(20, 10, 'Ne')} is 160.647 MeV. Find its atomic mass. (<sup>1</sup>H atom 1.007825 u, neutron 1.008665 u)`,
  steps([`Mass of 10 hydrogen atoms + 10 neutrons = 10(1.007825) + 10(1.008665) = 20.16490 u`, `Δ<i>m</i> = 160.647/931.5 = 0.17246 u ⇒ <i>M</i> = 20.16490 − 0.17246 = <b>19.992 u</b>`]))}
${example('25.1.4', `Find the binding energy per nucleon of ${nuc(56, 26, 'Fe')} (atomic mass 55.93494 u; <sup>1</sup>H 1.00782 u; neutron 1.00867 u).`,
  steps([`Δ<i>m</i> = 26(1.00782) + 30(1.00867) − 55.93494 = 0.52848 u`, `<i>E</i><sub>B</sub> = 0.52848 × 931.5 = 492.3 MeV ⇒ <i>E</i><sub>B</sub>/<i>A</i> = 492.3/56 = <b>8.79 MeV per nucleon</b>`]))}
${note(`Using atomic masses (with <sup>1</sup>H atoms instead of protons) is correct: the electron masses cancel.`)}
${exercises('Exercise: binding energy', [{ q: `Find the total binding energy and the binding energy per nucleon of ${nuc(14, 7, 'N')} (14.003074 u; <sup>1</sup>H 1.007825 u; neutron 1.008665 u).`, a: `Δ<i>m</i> = 0.11236 u; 104.6 MeV; 7.47 MeV per nucleon` }])}
`)}

${sec('25-2', '25.2 Radioactivity', `
${def('Radioactivity', `is ${red('the spontaneous and random emission of radiation (α, β or γ) from unstable nuclei')}, forming a new nucleus.`)}
${ul([`<b>Spontaneous</b>: the decay happens on its own and is not affected by physical conditions (temperature, pressure) or chemical changes.`, `<b>Random</b>: it is impossible to predict when a particular nucleus will decay; every nucleus has the same probability of decaying per unit time. Only the behaviour of a large number of nuclei can be predicted.`])}
${h4('Types of radiation')}
${table(['', 'Alpha (α)', 'Beta (β⁻ / β⁺)', 'Gamma (γ)'], [['nature', 'helium nucleus ' + nuc(4, 2, 'He'), 'fast electron / positron', 'high-energy electromagnetic photon'], ['charge', '+2<i>e</i>', '−<i>e</i> / +<i>e</i>', '0'], ['deflected by E and B fields', 'yes', 'yes (opposite way)', 'no'], ['ionising power', 'strong', 'moderate', 'weak'], ['penetration', 'stopped by paper', 'stopped by a few mm of aluminium', 'reduced by thick lead or concrete']])}
${fig(F.penetrate(), 'Figure 25.3: penetrating power of α, β and γ.')}
${table(['Decay', 'Equation', 'Change'], [['α', `${nuc('<i>A</i>', '<i>Z</i>', 'X')} → ${nuc('<i>A</i>−4', '<i>Z</i>−2', 'Y')} + ${nuc(4, 2, 'He')}`, 'loses 2 protons and 2 neutrons (heavy nuclei, <i>Z</i> > 82)'], ['β⁻', `${nuc('<i>A</i>', '<i>Z</i>', 'X')} → ${nuc('<i>A</i>', '<i>Z</i>+1', 'Y')} + ${nuc(0, '−1', 'e')} + antineutrino`, 'a neutron becomes a proton'], ['β⁺', `${nuc('<i>A</i>', '<i>Z</i>', 'X')} → ${nuc('<i>A</i>', '<i>Z</i>−1', 'Y')} + ${nuc(0, '+1', 'e')} + neutrino`, 'a proton becomes a neutron'], ['γ', `${nuc('<i>A</i>', '<i>Z</i>', 'X')}* → ${nuc('<i>A</i>', '<i>Z</i>', 'X')} + γ`, 'an excited nucleus drops to a lower state; <i>A</i> and <i>Z</i> unchanged']])}
${example('25.2.1', `Find the energy released in the alpha decay ${nuc(238, 92, 'U')} → ${nuc(234, 90, 'Th')} + ${nuc(4, 2, 'He')}. (238.050786 u, 234.043583 u, 4.002603 u)`,
  steps([`Δ<i>m</i> = 238.050786 − 234.043583 − 4.002603 = 0.004600 u`, `<i>Q</i> = 0.004600 × 931.5 = <b>4.28 MeV</b> (shared as kinetic energy of the α particle and the daughter nucleus)`]))}
${example('25.2.2', `Find the energy released in the β⁻ decay of ${nuc(213, 83, 'Bi')}. (nuclear masses: Bi 212.9944 u, Po 212.9928 u; electron 5.486 × 10<sup>−4</sup> u)`,
  steps([`${nuc(213, 83, 'Bi')} → ${nuc(213, 84, 'Po')} + ${nuc(0, '−1', 'e')}`, `<i>Q</i> = (212.9944 − 212.9928 − 0.0005486)(931.5) = <b>0.979 MeV</b>`]))}
${example('25.2.3', `Find the wavelength of a 0.186 MeV γ-ray photon emitted by radium-226.`,
  steps([`λ = ${fr('<i>hc</i>', '<i>E</i>')} = ${fr('(6.63 × 10<sup>−34</sup>)(3.00 × 10<sup>8</sup>)', '(0.186 × 10<sup>6</sup>)(1.60 × 10<sup>−19</sup>)')} = <b>6.68 × 10<sup>−12</sup> m</b>`]))}
${h4('The radioactive decay law')}
${def('Radioactive decay law', `${red('the rate of decay of a radioactive nuclide is directly proportional to the number of undecayed nuclei present')}.`)}
${key(`<i>A</i> = −${fr('d<i>N</i>', 'd<i>t</i>')} = λ<i>N</i>`, '<b>activity</b> <i>A</i> = number of decays per second; unit becquerel (1 Bq = 1 decay s<sup>−1</sup>); 1 curie = 3.7 × 10<sup>10</sup> Bq. The minus sign shows that <i>N</i> decreases.')}
${def('Decay constant, λ', `${red('the probability that a nucleus decays per unit time')} (unit s<sup>−1</sup>). It is a constant for each nuclide; a larger λ means faster decay.`)}
${steps([`${fr('d<i>N</i>', '<i>N</i>')} = −λ d<i>t</i>. Integrate from <i>N</i><sub>0</sub> at <i>t</i> = 0 to <i>N</i> at time <i>t</i>:`, `ln <i>N</i> − ln <i>N</i><sub>0</sub> = −λ<i>t</i> ⇒ ln ${fr('<i>N</i>', '<i>N</i><sub>0</sub>')} = −λ<i>t</i>`])}
${key(`<i>N</i> = <i>N</i><sub>0</sub>e<sup>−λ<i>t</i></sup> &nbsp;&nbsp; <i>A</i> = <i>A</i><sub>0</sub>e<sup>−λ<i>t</i></sup>`, 'also the mass of the radioactive sample: <i>m</i> = <i>m</i><sub>0</sub>e<sup>−λ<i>t</i></sup>')}
${def('Half-life, <i>T</i><sub>½</sub>', `${red('the time taken for the number of radioactive nuclei (or the activity) to fall to half of its original value')}.`)}
${steps([`At <i>t</i> = <i>T</i><sub>½</sub>, <i>N</i> = <i>N</i><sub>0</sub>/2: ${fr('<i>N</i><sub>0</sub>', '2')} = <i>N</i><sub>0</sub>e<sup>−λ<i>T</i>½</sup> ⇒ e<sup>λ<i>T</i>½</sup> = 2 ⇒ λ<i>T</i><sub>½</sub> = ln 2`])}
${key(`λ = ${fr('ln 2', '<i>T</i><sub>½</sub>')} = ${fr('0.693', '<i>T</i><sub>½</sub>')}`)}
${fig(F.decay(), 'Figure 25.4: exponential decay. After each half-life the number left halves: N₀, N₀/2, N₀/4, …')}
${tip(`After <i>n</i> half-lives, <i>N</i> = <i>N</i><sub>0</sub>(½)<sup><i>n</i></sup>. To find the number of nuclei in a mass <i>m</i>: <i>N</i> = (<i>m</i>/molar mass) × <i>N</i><sub>A</sub>. Keep λ and <i>t</i> in matching units.`)}
${sim('decay', 'Random radioactive decay', 'Each square is a nucleus. Every tick each one has the same small chance of decaying, so you cannot tell which will go next, yet the total follows N = N₀e^(−λt). Change the half-life and the number of nuclei, and compare the count with the curve.')}
${example('25.2.4', `Krypton-87 has a half-life of 78 minutes. Find the activity of 10 μg of krypton-87 (in Bq and Ci).`,
  steps([`<i>N</i> = ${fr('10 × 10<sup>−6</sup>', '87')} × 6.02 × 10<sup>23</sup> = 6.92 × 10<sup>16</sup>`, `λ = ${fr('0.693', '78 × 60')} = 1.48 × 10<sup>−4</sup> s<sup>−1</sup>`, `<i>A</i> = λ<i>N</i> = <b>1.02 × 10<sup>13</sup> Bq</b> = 1.02 × 10<sup>13</sup>/3.7 × 10<sup>10</sup> = <b>277 Ci</b>`]))}
${example('25.2.5', `A sample has an activity of 9.00 × 10<sup>12</sup> Bq and a half-life of 80.0 s. How long will it take for the activity to fall to 2.00 × 10<sup>12</sup> Bq?`,
  steps([`<i>A</i> = <i>A</i><sub>0</sub>e<sup>−λ<i>t</i></sup> ⇒ <i>t</i> = ${fr('ln (<i>A</i><sub>0</sub>/<i>A</i>)', 'λ')} = ${fr('ln 4.5', '0.693/80.0')} = <b>174 s</b>`]))}
${example('25.2.6', `What mass of radium-227 has an activity of 1.0 × 10<sup>6</sup> Bq? (half-life 41 minutes)`,
  steps([`<i>N</i> = ${fr('<i>A</i>', 'λ')} = ${fr('1.0 × 10<sup>6</sup>', '0.693/(41 × 60)')} = 3.55 × 10<sup>9</sup>`, `<i>m</i> = ${fr('3.55 × 10<sup>9</sup>', '6.02 × 10<sup>23</sup>')} × 227 g = <b>1.34 × 10<sup>−12</sup> g</b>`]))}
${example('25.2.7', `The half-life of potassium-45 is 17.3 minutes. How long does it take for 75% of the nuclei to decay?`,
  steps([`25% remain: <i>N</i> = 0.25<i>N</i><sub>0</sub> (two half-lives)`, `<i>t</i> = ${fr('ln 4', 'λ')} = 2<i>T</i><sub>½</sub> = <b>34.6 min</b>`]))}
${example('25.2.8', `After 4 hours, 80% of the nuclei of a radioactive isotope have decayed. Find the half-life.`,
  steps([`<i>N</i> = 0.20<i>N</i><sub>0</sub> ⇒ λ = ${fr('ln 5', '4')} = 0.402 h<sup>−1</sup>`, `<i>T</i><sub>½</sub> = ${fr('0.693', '0.402')} = <b>1.72 h</b>`]))}
${h4('Applications of radioisotopes as tracers')}
<p>A <b>radioisotope</b> behaves chemically like the stable isotope, so it can be followed by detecting its radiation. Short half-lives are chosen so that the activity soon dies away.</p>
${table(['Field', 'Use'], [['Medical: blood volume', 'a small known activity is injected; after it mixes, the activity per unit volume of a blood sample gives the total volume'], ['Medical: imaging', 'technetium-99m (γ emitter, half-life 6 h) collects in tumours, which then show up on a gamma camera; iodine-131 is used for the thyroid'], ['Agriculture', 'phosphorus-32 in fertiliser shows how fast and where the plant takes it up; tracers also study pesticides and are used in the sterile insect technique'], ['Industry', 'a short-lived tracer in an underground pipe: a Geiger counter above the ground detects higher activity where the pipe leaks; also thickness gauges and flow measurement']])}
${example('25.2.9', `A solution of sodium-24 (half-life 15 h) of activity 1.5 × 10<sup>4</sup> Bq is injected into a patient’s blood. After 30 h, 1.0 cm<sup>3</sup> of blood has an activity of 0.50 Bq. Estimate the volume of blood.`,
  steps([`After 30 h (2 half-lives) the total activity = 1.5 × 10<sup>4</sup> × ¼ = 3.75 × 10<sup>3</sup> Bq`, `The activity is spread evenly: ${fr('3.75 × 10<sup>3</sup>', '<i>V</i>')} = ${fr('0.50', '1.0 cm<sup>3</sup>')} ⇒ <i>V</i> = 7.5 × 10<sup>3</sup> cm<sup>3</sup> = <b>7.5 × 10<sup>−3</sup> m<sup>3</sup></b> (7.5 L)`]))}
`)}

${sec('25-3', '25.3 Nuclear reactions', `
<p>A nuclear reaction changes the nucleus: radioactive decay, bombardment by a particle, fission or fusion. For example, Rutherford’s first artificial reaction: ${nuc(14, 7, 'N')} + ${nuc(4, 2, 'He')} → ${nuc(17, 8, 'O')} + ${nuc(1, 1, 'H')}.</p>
${h4('Conservation laws')}
${ul([`<b>Conservation of nucleon number</b>: the total nucleon number <i>A</i> before the reaction equals the total after.`, `<b>Conservation of charge</b>: the total proton number (charge) <i>Z</i> before equals the total after.`, `<b>Conservation of mass–energy</b>: the total mass-energy (rest mass energy + kinetic energy) before equals the total after. Any loss of mass appears as energy.`])}
${key(`<i>Q</i> = Δ<i>m c</i><sup>2</sup>, &nbsp; Δ<i>m</i> = (total mass before) − (total mass after)`, '<i>Q</i> > 0: energy released (exothermic). <i>Q</i> < 0: energy must be supplied, e.g. as kinetic energy of the bombarding particle (endothermic).')}
${example('25.3.1', `Complete the reactions: (a) ${nuc(238, 92, 'U')} → ${nuc(234, 90, 'Th')} + ? &nbsp; (b) ${nuc(14, 7, 'N')} + ${nuc(4, 2, 'He')} → ${nuc(17, 8, 'O')} + ? &nbsp; (c) ${nuc(7, 3, 'Li')} + ${nuc(1, 1, 'H')} → 2 ? &nbsp; (d) ${nuc(10, 5, 'B')} + ${nuc(1, 0, 'n')} → ${nuc(7, 3, 'Li')} + ? &nbsp; (e) ${nuc(226, 88, 'Ra')} → ? + ${nuc(4, 2, 'He')}`,
  steps([`(a) ${nuc(4, 2, 'He')} (α decay) &nbsp; (b) ${nuc(1, 1, 'H')} (a proton) &nbsp; (c) ${nuc(4, 2, 'He')} &nbsp; (d) ${nuc(4, 2, 'He')} &nbsp; (e) ${nuc(222, 86, 'Rn')}`, `Check each with <i>A</i> and <i>Z</i>: e.g. (b) 14 + 4 = 17 + 1 and 7 + 2 = 8 + 1.`]))}
${example('25.3.2', `When lithium-7 is bombarded with a proton, two alpha particles are produced. Find the energy released. (<sup>1</sup>H 1.007825 u, <sup>7</sup>Li 7.016003 u, <sup>4</sup>He 4.002603 u)`,
  steps([`${nuc(7, 3, 'Li')} + ${nuc(1, 1, 'H')} → 2${nuc(4, 2, 'He')}`, `Δ<i>m</i> = 7.016003 + 1.007825 − 2(4.002603) = 0.018622 u`, `<i>Q</i> = 0.018622 × 931.5 = <b>17.3 MeV</b> (2.78 × 10<sup>−12</sup> J), released`]))}
${example('25.3.3', `A deuteron bombards carbon-13 and produces nitrogen-14. (a) Write the equation. (b) Find the energy released. (<sup>13</sup>C 13.00335 u, <sup>2</sup>H 2.01410 u, <sup>14</sup>N 14.00307 u, n 1.00867 u)`,
  steps([`(a) ${nuc(13, 6, 'C')} + ${nuc(2, 1, 'H')} → ${nuc(14, 7, 'N')} + ${nuc(1, 0, 'n')}`, `(b) Δ<i>m</i> = 13.00335 + 2.01410 − 14.00307 − 1.00867 = 0.00571 u ⇒ <i>Q</i> = <b>5.32 MeV</b>`]))}
${h4('Nuclear fission')}
${def('Nuclear fission', `is ${red('the splitting of a heavy nucleus into two lighter nuclei of roughly equal mass')}, with the release of neutrons and energy.`)}
${eq(`${nuc(235, 92, 'U')} + ${nuc(1, 0, 'n')} → ${nuc(236, 92, 'U')}* → ${nuc(141, 56, 'Ba')} + ${nuc(92, 36, 'Kr')} + 3${nuc(1, 0, 'n')} + energy`)}
${ul([`Fission of uranium-235 is usually <b>induced</b> by a slow (thermal) neutron. The excited U-236 nucleus splits within about 10<sup>−12</sup> s.`, `The fragments vary, mostly with <i>A</i> about 90–100 and 135–145.`, `<b>Why energy is released</b>: the binding energy per nucleon of uranium is about 7.6 MeV, but that of the fragments is about 8.5 MeV. The products are more tightly bound, so they have less mass. Energy released ≈ (8.5 − 7.6) × 236 ≈ <b>200 MeV</b> per fission, mostly as kinetic energy of the fragments and neutrons.`])}
${example('25.3.4', `Find the energy released when 10 kg of uranium-235 undergoes fission: ${nuc(235, 92, 'U')} + ${nuc(1, 0, 'n')} → ${nuc(141, 56, 'Ba')} + ${nuc(92, 36, 'Kr')} + 3${nuc(1, 0, 'n')}. (U 235.04 u, Ba 140.91 u, Kr 91.91 u, n 1.01 u)`,
  steps([`Δ<i>m</i> = (235.04 + 1.01) − (140.91 + 91.91 + 3 × 1.01) = 0.20 u ⇒ <i>Q</i> = <b>186 MeV</b> per fission`, `Number of nuclei = ${fr('10', '235 × 10<sup>−3</sup>')} × 6.02 × 10<sup>23</sup> = 2.56 × 10<sup>25</sup>`, `Total = 186.3 MeV × 2.56 × 10<sup>25</sup> = <b>4.77 × 10<sup>33</sup> eV</b> = 7.6 × 10<sup>14</sup> J`]))}
${h4('Chain reaction')}
${fig(F.chain(), 'Figure 25.5: a chain reaction.')}
${ul([`Each fission releases 2 or 3 neutrons. If at least one of them causes another fission, the reaction continues by itself: a <b>chain reaction</b>.`, `If the piece of uranium is too small, too many neutrons escape through the surface and the chain dies out. The <b>critical mass</b> is the minimum mass of fissile material needed to sustain a chain reaction.`, `Above the critical mass, if every neutron is allowed to cause fission, the number of fissions grows very rapidly (an uncontrolled chain reaction, as in a bomb).`])}
${h4('Controlled fission in a nuclear reactor')}
${fig(F.reactor(), 'Figure 25.6: the core of a thermal fission reactor.')}
${table(['Part', 'Purpose'], [['Fuel rods', 'enriched uranium (3–5% U-235); the U-235 undergoes fission'], ['Moderator (water or graphite)', 'slows down the fast neutrons from fission by collisions, because slow neutrons are much more likely to cause fission of U-235'], ['Control rods (cadmium or boron)', 'absorb neutrons. They are raised or lowered so that, on average, exactly <b>one</b> neutron from each fission causes another fission: a steady (critical) rate'], ['Coolant', 'carries the heat away to produce steam, which drives turbines to generate electricity'], ['Concrete shield', 'absorbs neutrons and γ-radiation to protect the workers']])}
${sim('chain', 'Chain reaction and control rods', 'Fire one neutron into the uranium. Each fission (yellow nucleus) releases 2–3 new neutrons. Push the control rods in to absorb more neutrons: find the setting where the reaction keeps going at a steady rate.')}
${h4('A nuclear power station')}
${ul([`The fission energy heats the water in the reactor core. In a <b>pressurised water reactor</b> the water is kept at high pressure so it does not boil, and the same water acts as moderator and coolant.`, `The hot coolant is pumped through a <b>heat exchanger</b> (steam generator), where it boils water in a separate loop. The steam turns a <b>turbine</b> connected to a <b>generator</b>.`, `The steam is cooled back to water in a <b>condenser</b> and returned. Only about one third of the heat becomes electrical energy; the rest is given out to the cooling water.`, `If the power rises too fast, the control rods drop fully into the core (an emergency shutdown) and the chain reaction stops.`])}
${sim('reactor', 'Inside a nuclear power station', 'Move the control rods. Pulled out, more neutrons survive and the power rises; pushed in, the power falls. Find the position where each fission causes, on average, exactly one more (k = 1) and the power stays steady. If the power goes above 120%, the reactor shuts itself down.')}
${example('25.3.5', `A nuclear power station produces 1000 MW of electrical power with an efficiency of 33%. Each fission of U-235 releases 200 MeV. Find (a) the thermal power of the reactor, (b) the number of fissions per second, (c) the mass of U-235 used in one day.`,
  steps([`(a) <i>P</i><sub>thermal</sub> = ${fr('1000', '0.33')} = <b>3.0 × 10<sup>3</sup> MW</b>`, `(b) energy per fission = 200 × 1.60 × 10<sup>−13</sup> = 3.2 × 10<sup>−11</sup> J ⇒ <i>n</i> = ${fr('3.0 × 10<sup>9</sup>', '3.2 × 10<sup>−11</sup>')} = <b>9.4 × 10<sup>19</sup> s<sup>−1</sup></b>`, `(c) nuclei per day = 9.4 × 10<sup>19</sup> × 86 400 = 8.1 × 10<sup>24</sup> ⇒ mass = ${fr('8.1 × 10<sup>24</sup>', '6.02 × 10<sup>23</sup>')} × 0.235 kg = <b>3.2 kg</b>`]))}
${h4('Nuclear fusion')}
${def('Nuclear fusion', `is ${red('the joining of two light nuclei to form a heavier nucleus')}, with the release of energy.`)}
${eq(`${nuc(2, 1, 'H')} + ${nuc(3, 1, 'H')} → ${nuc(4, 2, 'He')} + ${nuc(1, 0, 'n')} + 17.6 MeV`)}
${ul([`Light nuclei have a low binding energy per nucleon. The product (e.g. helium-4) is much more tightly bound, so mass is lost and energy is released. Per nucleon, fusion releases more energy than fission.`, `The nuclei are both positive and repel each other. To come within the range of the strong nuclear force (about 10<sup>−15</sup> m) they need very high kinetic energies, i.e. temperatures of about 10<sup>7</sup>–10<sup>8</sup> K. Fusion is therefore called a <b>thermonuclear</b> reaction.`])}
${h4('Fusion in the Sun')}
${ul([`The Sun’s core has a temperature of about 1.5 × 10<sup>7</sup> K and a very high density, so hydrogen nuclei collide fast and often enough to fuse.`, `The main process is the <b>proton–proton chain</b>:`])}
${steps([`${nuc(1, 1, 'H')} + ${nuc(1, 1, 'H')} → ${nuc(2, 1, 'H')} + ${nuc(0, '+1', 'e')} + ν (positron and neutrino)`, `${nuc(2, 1, 'H')} + ${nuc(1, 1, 'H')} → ${nuc(3, 2, 'He')} + γ`, `${nuc(3, 2, 'He')} + ${nuc(3, 2, 'He')} → ${nuc(4, 2, 'He')} + 2${nuc(1, 1, 'H')}`, `Overall: 4${nuc(1, 1, 'H')} → ${nuc(4, 2, 'He')} + 2${nuc(0, '+1', 'e')} + 2ν + 2γ + about <b>26.7 MeV</b>`])}
${table(['Fission', 'Fusion'], [['a heavy nucleus splits into lighter ones', 'light nuclei join into a heavier one'], ['started by neutron bombardment', 'needs a very high temperature'], ['produces radioactive waste', 'products mostly not radioactive'], ['controlled in reactors today', 'very difficult to contain and control']])}
<p>Both release energy, both produce new nuclei, and in both the total mass decreases.</p>
${example('25.3.5', `In the fusion ${nuc(2, 1, 'H')} + ${nuc(2, 1, 'H')} → ${nuc(4, 2, 'He')}, 2 kg of deuterium is used. Find (a) the energy released per helium nucleus, (b) the total mass lost, (c) the total energy released. (<sup>2</sup>H 2.014 u, <sup>4</sup>He 4.002 u)`,
  steps([`(a) Δ<i>m</i> = 2(2.014) − 4.002 = 0.026 u ⇒ <i>Q</i> = 0.026 × 931.5 = <b>24.2 MeV</b> (3.88 × 10<sup>−12</sup> J)`, `(b) number of <sup>2</sup>H nuclei = ${fr('2', '2 × 10<sup>−3</sup>')} × 6.02 × 10<sup>23</sup> = 6.02 × 10<sup>26</sup>, i.e. 3.01 × 10<sup>26</sup> reactions; mass lost = 3.01 × 10<sup>26</sup> × 0.026 u = 7.83 × 10<sup>24</sup> u = <b>0.013 kg</b>`, `(c) <i>E</i> = Δ<i>mc</i><sup>2</sup> = 0.013 × (3.00 × 10<sup>8</sup>)<sup>2</sup> = <b>1.17 × 10<sup>15</sup> J</b>`]))}
${example('25.3.6', `Compare the energy released per nucleon in the fusion ${nuc(2, 1, 'H')} + ${nuc(6, 3, 'Li')} → 2${nuc(4, 2, 'He')} (<i>Q</i> = 22.36 MeV) with that in the fission ${nuc(236, 94, 'Pu')} + ${nuc(1, 0, 'n')} → ${nuc(138, 56, 'Ba')} + ${nuc(96, 38, 'Sr')} + 3${nuc(1, 0, 'n')} (<i>Q</i> = 188.16 MeV).`,
  steps([`Fusion: 22.36/8 = 2.80 MeV per nucleon. Fission: 188.16/237 = 0.794 MeV per nucleon.`, `Fusion releases about <b>3.5 times</b> more energy per nucleon.`]))}
${h4('Nuclear waste disposal')}
${table(['Waste', 'Disposal'], [['Low-level (gloves, clothing, tools)', 'sealed in drums and buried in shallow engineered landfill sites'], ['Intermediate-level', 'mixed with concrete or bitumen in steel containers, stored in deep vaults'], ['High-level (used fuel)', 'cooled for years under water, then sealed in thick steel and concrete casks for deep geological burial, away from groundwater and earthquake zones; some is reprocessed to recover uranium and plutonium']])}
`)}

${sec('25-4', 'Summary and exercises', `
${table(['Subtopic', 'Key results'], [['25.1', 'Δ<i>m</i> = <i>Zm</i><sub>p</sub> + <i>Nm</i><sub>n</sub> − <i>M</i>; <i>E</i><sub>B</sub> = Δ<i>mc</i><sup>2</sup>; 1 u ≙ 931.5 MeV; most stable near <i>A</i> ≈ 56'], ['25.2', '<i>A</i> = −d<i>N</i>/d<i>t</i> = λ<i>N</i>; <i>N</i> = <i>N</i><sub>0</sub>e<sup>−λ<i>t</i></sup>; λ = ln 2/<i>T</i><sub>½</sub>'], ['25.3', 'conserve <i>A</i> and <i>Z</i>; <i>Q</i> = Δ<i>mc</i><sup>2</sup>; fission of heavy and fusion of light nuclei both move towards the peak of the <i>E</i><sub>B</sub>/<i>A</i> curve']])}
${exercises('Exercises', [
  { q: `A radioactive sample has a half-life of 5.0 days. What fraction remains after 20 days?`, a: `4 half-lives: (½)<sup>4</sup> = 1/16` },
  { q: `The activity of a source falls from 800 Bq to 100 Bq in 30 minutes. Find its half-life.`, a: `800 → 100 is 3 half-lives: 10 minutes` },
  { q: `Explain why radioactive decay is described as random.`, a: `It is impossible to predict which nucleus will decay next or when; each nucleus has the same probability of decaying per unit time.` },
  { q: `State the function of the moderator and of the control rods in a fission reactor.`, a: `Moderator: slows the neutrons so that they can cause further fission of U-235. Control rods: absorb neutrons to keep the rate of fission steady (one neutron per fission goes on to cause another fission).` },
  { q: `Use the graph of binding energy per nucleon to explain why both fission and fusion release energy.`, a: `Fission (heavy → medium) and fusion (light → heavier) both produce nuclei with greater binding energy per nucleon. The products are more tightly bound, so their total mass is smaller; the lost mass is released as energy, <i>E</i> = Δ<i>mc</i><sup>2</sup>.` }])}
`)}
`;
  window.PhysiQLessons.register('LESSON-S3-25', { html: () => S });

  // ===================== simulations =====================
  // ---------- 1. random decay ----------
  window.PhysiQSims.add('decay', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, loop, readouts } = window.PhysiQSims.U;
    const S = { n: 400, T: 4, t: 0, alive: [], hist: [], play: true };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'half-life', 1, 10, 0.5, S.T, 's', v => { S.T = v; reset(); });
    slider(ctl, 'number of nuclei', 100, 900, 100, S.n, '', v => { S.n = v; reset(); });
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const pb = button(bar, '❚❚ Pause', 'sm-main', () => { S.play = !S.play; pb.textContent = S.play ? '❚❚ Pause' : '▶ Play'; });
    button(bar, '↺ New sample', '', reset);
    const cv = canvas(root); const ro = readouts(root);
    function reset() { S.t = 0; S.alive = Array.from({ length: S.n }, () => true); S.hist = [[0, S.n]]; }
    reset();
    function step(dt) { const lam = Math.LN2 / S.T, p = 1 - Math.exp(-lam * dt); S.alive = S.alive.map(a => a && Math.random() > p); S.t += dt; const N = S.alive.filter(Boolean).length; S.hist.push([S.t, N]); if (S.t > 5 * S.T) S.play = false, pb.textContent = '▶ Play'; }
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.5, 260, 360); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const narrow = w < 520, gw = narrow ? w - 20 : w * 0.42, cols = Math.ceil(Math.sqrt(S.n * gw / (narrow ? h * 0.45 : h - 30))), sz = gw / cols;
      S.alive.forEach((a, i) => { const x = 10 + (i % cols) * sz, y = 14 + Math.floor(i / cols) * sz; ctx.fillStyle = a ? '#E7B54A' : '#C9CDBF'; ctx.fillRect(x + 0.5, y + 0.5, sz - 1.5, sz - 1.5); });
      const bx = narrow ? 44 : gw + 60, by = narrow ? h * 0.5 + 20 : 20, bw = narrow ? w - 60 : w - bx - 16, bh = narrow ? h * 0.5 - 50 : h - 56, tmax = 5 * S.T, X = t => bx + t / tmax * bw, Y = n => by + bh - n / S.n * bh;
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.stroke();
      ctx.strokeStyle = COL.v; ctx.setLineDash([5, 4]); ctx.beginPath(); for (let i = 0; i <= 100; i++) { const t = tmax * i / 100; i ? ctx.lineTo(X(t), Y(S.n * Math.pow(0.5, t / S.T))) : ctx.moveTo(X(t), Y(S.n)); } ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = COL.o; ctx.lineWidth = 2.2; ctx.beginPath(); S.hist.forEach(([t, n], i) => i ? ctx.lineTo(X(t), Y(n)) : ctx.moveTo(X(t), Y(n))); ctx.stroke();
      for (let k = 1; k <= 5; k++) text(ctx, k + 'T½', X(k * S.T), by + bh + 13, { a: 'center', fs: 10, c: COL.sub });
      text(ctx, 'N', bx - 6, by + 8, { a: 'right', it: 1, b: 1 }); text(ctx, 'count (orange) and N₀e^(−λt) (dashed)', bx + bw, by + 10, { a: 'right', fs: 10.5, c: COL.sub });
      const N = S.alive.filter(Boolean).length;
      ro([['time', fmt(S.t, 1) + ' s = ' + fmt(S.t / S.T, 2) + ' half-lives'], ['nuclei left (count)', String(N), 'hl'], ['N₀e^(−λt) predicts', fmt(S.n * Math.exp(-Math.LN2 / S.T * S.t), 0), 'hl'], ['λ = ln 2 / T½', fmt(Math.LN2 / S.T, 3) + ' s⁻¹']]);
    }
    let acc = 0; loop(cv, dt => { if (S.play) { acc += dt; while (acc > 0.05) { step(0.05); acc -= 0.05; } } draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 2. binding energy per nucleon ----------
  window.PhysiQSims.add('becurve', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts } = window.PhysiQSims.U;
    const S = { A: 56, mode: null };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    const sa = slider(ctl, 'nucleon number A', 2, 240, 1, S.A, '', v => { S.A = v; S.mode = null; draw(); });
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    button(pre, 'Fission: U-235 → Ba-141 + Kr-92', 'sm-chip', () => { S.mode = 'fis'; S.A = 236; sa.set(236); draw(); });
    button(pre, 'Fusion: H-2 + H-3 → He-4', 'sm-chip', () => { S.mode = 'fus'; S.A = 4; sa.set(4); draw(); });
    const cv = canvas(root); const ro = readouts(root);
    const NAMES = { 2: 'H-2', 3: 'H-3', 4: 'He-4', 12: 'C-12', 16: 'O-16', 56: 'Fe-56', 62: 'Ni-62', 92: 'Kr-92', 141: 'Ba-141', 235: 'U-235', 236: 'U-236', 238: 'U-238' };
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.5, 240, 340); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const box = { x: 46, y: 18, w: w - 62, h: h - 52 }, X = A => box.x + A / 240 * box.w, Y = b => box.y + box.h - b / 9.5 * box.h;
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(box.x, box.y); ctx.lineTo(box.x, box.y + box.h); ctx.lineTo(box.x + box.w, box.y + box.h); ctx.stroke();
      [2, 4, 6, 8].forEach(b => text(ctx, b, box.x - 6, Y(b) + 4, { a: 'right', fs: 10, c: COL.sub })); [50, 100, 150, 200].forEach(A => text(ctx, A, X(A), box.y + box.h + 13, { a: 'center', fs: 10, c: COL.sub }));
      text(ctx, 'E_B/A (MeV)', box.x, box.y - 4, { fs: 11, b: 1 }); text(ctx, 'A', box.x + box.w, box.y + box.h + 26, { a: 'right', it: 1 });
      ctx.strokeStyle = COL.v; ctx.lineWidth = 2.4; ctx.beginPath(); [2, 3, 4, 6, 7, 9, 12, 14, 16, 20].forEach((A, i) => i ? ctx.lineTo(X(A), Y(beaPlot(A))) : ctx.moveTo(X(A), Y(beaPlot(A)))); for (let A = 22; A <= 240; A += 2) ctx.lineTo(X(A), Y(beaPlot(A))); ctx.stroke();
      const b = beaPlot(S.A); ctx.fillStyle = COL.r; ctx.beginPath(); ctx.arc(X(S.A), Y(b), 6, 0, 7); ctx.fill(); text(ctx, (NAMES[S.A] || 'A = ' + S.A) + ': ' + fmt(b, 2) + ' MeV', X(S.A) + (S.A > 150 ? -10 : 10), Y(b) - 10, { a: S.A > 150 ? 'right' : 'left', b: 1, fs: 12 });
      let rows = [['binding energy per nucleon', fmt(b, 2) + ' MeV', 'hl'], ['total binding energy', fmt(b * S.A, 0) + ' MeV']];
      const arrow = (A1, A2, col) => { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(A1), Y(beaPlot(A1))); ctx.lineTo(X(A2), Y(beaPlot(A2))); ctx.stroke(); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(X(A2), Y(beaPlot(A2)), 5, 0, 7); ctx.fill(); };
      if (S.mode === 'fis') { arrow(236, 141, COL.o); arrow(236, 92, COL.o); const Eb0 = 236 * beaPlot(236), Eb1 = 141 * beaPlot(141) + 92 * beaPlot(92); rows.push(['B.E. of U-236', fmt(Eb0, 0) + ' MeV'], ['B.E. of Ba-141 + Kr-92', fmt(Eb1, 0) + ' MeV'], ['energy released ≈', fmt(Eb1 - Eb0, 0) + ' MeV', 'hl']); }
      if (S.mode === 'fus') { arrow(2, 4, COL.gr); arrow(3, 4, COL.gr); const E0 = 2 * 1.11 + 3 * 2.83, E1 = 4 * 7.07; rows.push(['B.E. of H-2 + H-3', fmt(E0, 1) + ' MeV'], ['B.E. of He-4', fmt(E1, 1) + ' MeV'], ['energy released ≈', fmt(E1 - E0, 1) + ' MeV (3.5 MeV per nucleon)', 'hl']); }
      ro(rows);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 3. chain reaction ----------
  window.PhysiQSims.add('chain', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, loop, readouts } = window.PhysiQSims.U;
    const S = { rods: 0.3, nuc: [], neu: [], fis: 0, hist: [], t: 0 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'control rods inserted', 0, 0.9, 0.05, S.rods, '× (absorption)', v => { S.rods = v; });
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    button(bar, '➤ Fire a neutron', 'sm-main', () => { fire(); });
    button(bar, '↺ Reset', '', reset);
    const cv = canvas(root); const ro = readouts(root);
    let W = 600, H = 300;
    function reset() { S.nuc = []; S.neu = []; S.fis = 0; S.hist = []; S.t = 0; for (let i = 0; i < 260; i++) S.nuc.push({ x: Math.random(), y: Math.random(), on: true }); }
    function fire() { S.neu.push({ x: 0.02, y: 0.5, vx: 0.35, vy: (Math.random() - 0.5) * 0.1, life: 4 }); }
    reset();
    function step(dt) {
      S.t += dt; const absorbP = S.rods * 1.6 * dt; const out = [];
      S.neu.forEach(n => { n.x += n.vx * dt; n.y += n.vy * dt; n.life -= dt; if (n.x < 0 || n.x > 1 || n.y < 0 || n.y > 1 || n.life < 0) return; if (Math.random() < absorbP) return;
        const hit = S.nuc.find(u => u.on && Math.abs(u.x - n.x) < 0.018 && Math.abs(u.y - n.y) < 0.03);
        if (hit) { hit.on = false; S.fis++; const k = Math.random() < 0.5 ? 2 : 3; for (let j = 0; j < k; j++) { const a = Math.random() * 6.283; out.push({ x: hit.x, y: hit.y, vx: 0.3 * Math.cos(a), vy: 0.3 * Math.sin(a), life: 4 }); } return; }
        out.push(n); });
      S.neu = out.slice(0, 400); if (Math.floor(S.t * 4) > S.hist.length) S.hist.push(S.neu.length);
    }
    function draw() {
      const ctx = cv.ctx, sz = cv.size(0.5, 240, 340); W = sz.w; H = sz.h; ctx.clearRect(0, 0, W, H); ctx.fillStyle = '#1C222B'; ctx.fillRect(0, 0, W, H);
      const pw = W, ph = H - 40;
      for (let i = 0; i < 6; i++) { const x = (i + 0.5) / 6 * pw; ctx.fillStyle = 'rgba(160,165,175,' + (0.15 + 0.6 * S.rods) + ')'; ctx.fillRect(x - 4, 0, 8, ph * S.rods); }
      S.nuc.forEach(u => { ctx.fillStyle = u.on ? '#E7B54A' : 'rgba(231,181,74,.18)'; ctx.beginPath(); ctx.arc(u.x * pw, u.y * ph, 4, 0, 7); ctx.fill(); });
      S.neu.forEach(n => { ctx.fillStyle = '#7FD4FF'; ctx.beginPath(); ctx.arc(n.x * pw, n.y * ph, 2.2, 0, 7); ctx.fill(); });
      // population strip
      ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, ph, W, 40); ctx.strokeStyle = COL.o; ctx.lineWidth = 1.6; ctx.beginPath(); S.hist.slice(-120).forEach((v, i) => { const x = 10 + i * (W - 20) / 120, y = ph + 36 - Math.min(30, v / 6); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke(); text(ctx, 'neutrons in flight', 10, ph + 12, { fs: 10.5, c: COL.sub });
      const hh = S.hist, n1 = hh[hh.length - 1] || 0, n0 = hh[hh.length - 5] || 0, live = S.nuc.filter(u => u.on).length; const k = !S.neu.length ? (S.fis ? 'the chain has stopped' : 'fire a neutron to start') : live < 40 ? 'fuel used up' : n0 < 3 ? 'starting…' : n1 > n0 * 1.25 ? 'supercritical: growing' : n1 < n0 * 0.8 ? 'subcritical: dying out' : 'about critical: steady';
      ro([['fissions so far', String(S.fis), 'hl'], ['neutrons in flight', String(S.neu.length)], ['neutron population', k, 'hl']]);
    }
    loop(cv, dt => { step(Math.min(dt, 0.05)); draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });
  // ---------- nuclear power station ----------
  window.PhysiQSims.add('reactor', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts, loop } = window.PhysiQSims.U;
    const S = { rod: 0.5, P: 1.0, scram: false, t: 0, turb: 0, flow: 0, hist: [], k: 1, nb: [] };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    const rs = slider(ctl, 'control rods pushed in', 0, 100, 1, 50, '%', x => { if (!S.scram) S.rod = x / 100; });
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    button(bar, '🛑 Emergency shutdown', '', () => { S.scram = true; });
    button(bar, 'Restart', '', () => { S.scram = false; S.rod = 0.5; S.P = 1; S.hist = []; S.ht = 0; const i = root.querySelector('input[type=range]'); if (i) { i.value = 50; i.dispatchEvent(new Event('input')); } });
    const cv = canvas(root); const ro = readouts(root);
    function frame(dt) {
      if (dt < 0) dt = 0; dt = Math.min(dt, 0.05); S.t += dt;
      const rod = S.scram ? 1 : S.rod;
      S.k = 1 + 0.04 * (0.5 - rod);   // neutron multiplication factor
      // power changes slowly because of delayed neutrons
      S.P *= Math.exp((S.k - 1) / 0.4 * dt);
      S.P = Math.max(S.scram ? 0.0 : 0.001, Math.min(S.P, 1.6));
      if (S.P > 1.2 && !S.scram) S.scram = true;
      if (S.scram) S.P = Math.max(0, S.P - S.P * 1.2 * dt);
      S.ht = (S.ht || 0) + dt; if (S.ht > 0.05) { S.ht = 0; S.hist.push(S.P); if (S.hist.length > 400) S.hist.shift(); }
      const P = Math.min(S.P, 1.6);
      S.turb += dt * 8 * Math.min(P, 1.3); S.flow += dt * (0.3 + 0.7 * Math.min(P, 1.2));
      const ctx = cv.ctx, narrow = root.clientWidth < 520, { w, h } = narrow ? cv.size(0.88, 340, 420) : cv.size(0.4, 300, 380); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const sc = narrow ? w / 640 : Math.min(w / 900, h / 330); ctx.save(); ctx.scale(sc, sc);
      const W = w / sc, H = h / sc;
      // reactor vessel
      const vx = 30, vy = 78, vw = 150, vh = 190;
      ctx.fillStyle = '#5A6170'; ctx.fillRect(vx - 8, vy - 8, vw + 16, vh + 16);
      const hot = Math.min(1, P / 1.6); ctx.fillStyle = `rgb(${Math.round(150 + 90 * hot)},${Math.round(200 - 90 * hot)},${Math.round(235 - 150 * hot)})`; ctx.fillRect(vx, vy, vw, vh);
      // fuel rods and control rods
      for (let i = 0; i < 5; i++) { const x = vx + 18 + i * 28; ctx.fillStyle = '#3E8E1E'; ctx.fillRect(x, vy + 70, 12, 110); }
      for (let i = 0; i < 4; i++) { const x = vx + 34 + i * 28, d = 110 * rod; ctx.fillStyle = '#222'; ctx.fillRect(x - 1, vy - 40, 10, 40 + 30 + d); }
      ctx.fillStyle = '#444'; ctx.fillRect(vx + 20, vy - 46, vw - 40, 8);
      // neutrons flashing in the core (more when the power is higher)
      const nN = Math.round(4 + 26 * Math.min(P, 1.4)); ctx.fillStyle = '#FFE34D';
      for (let i = 0; i < nN; i++) { const r1 = (Math.sin(i * 91.7 + S.t * 7.3) + 1) / 2, r2 = (Math.sin(i * 37.1 + S.t * 5.1) + 1) / 2; ctx.beginPath(); ctx.arc(vx + 10 + r1 * (vw - 20), vy + 70 + r2 * 110, 2.2, 0, 7); ctx.fill(); }
      text(ctx, 'reactor core', vx + vw / 2, vy + vh + 26, { a: 'center', fs: 14, b: 1 });
      text(ctx, 'control rods', vx + vw + 10, vy - 30, { fs: 13, c: COL.sub }); text(ctx, 'fuel rods', vx + vw / 2, vy + vh - 4, { a: 'center', fs: 12, c: '#fff' });
      // primary loop to the heat exchanger
      const hx = 250, hy = 98, hw = 110, hh = 150;
      const loopPts = [[vx + vw, vy + 30], [hx, vy + 30], [hx, hy + hh - 20], [vx + vw, hy + hh - 20]];
      ctx.lineWidth = 9; ctx.strokeStyle = `rgba(220,${Math.round(120 - 60 * hot)},60,.85)`; ctx.beginPath(); ctx.moveTo(vx + vw + 8, vy + 30); ctx.lineTo(hx + 30, vy + 30); ctx.stroke();
      ctx.strokeStyle = 'rgba(60,120,220,.85)'; ctx.beginPath(); ctx.moveTo(hx + 30, hy + hh - 20); ctx.lineTo(vx + vw + 8, hy + hh - 20); ctx.stroke();
      // flowing dots
      ctx.fillStyle = '#fff'; for (let i = 0; i < 4; i++) { const f = (S.flow + i / 4) % 1; ctx.beginPath(); ctx.arc(vx + vw + 8 + f * (hx + 22 - vx - vw), vy + 30, 2.5, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(hx + 30 - f * (hx + 22 - vx - vw), hy + hh - 20, 2.5, 0, 7); ctx.fill(); }
      ctx.fillStyle = '#E3E6EA'; ctx.fillRect(hx, hy, hw, hh); ctx.strokeStyle = '#7D848F'; ctx.lineWidth = 2; ctx.strokeRect(hx, hy, hw, hh);
      ctx.strokeStyle = 'rgba(220,90,60,.8)'; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i <= 6; i++) { const y = vy + 30 + i * ((hy + hh - 20 - vy - 30) / 6); ctx.lineTo(hx + (i % 2 ? hw - 20 : 30), y); } ctx.stroke();
      text(ctx, 'heat exchanger', hx + hw / 2, hy + hh + 22, { a: 'center', fs: 13, b: 1 }); text(ctx, '(steam generator)', hx + hw / 2, hy + hh + 38, { a: 'center', fs: 12, c: COL.sub });
      // steam to turbine
      const tx = 430, ty = 88;
      ctx.lineWidth = 7; ctx.strokeStyle = 'rgba(160,160,170,.9)'; ctx.beginPath(); ctx.moveTo(hx + hw, hy + 15); ctx.lineTo(tx + 30, hy + 15); ctx.lineTo(tx + 30, ty + 30); ctx.stroke();
      for (let i = 0; i < 5; i++) { const f = (S.flow * 1.4 + i / 5) % 1; ctx.fillStyle = 'rgba(255,255,255,' + (0.4 + 0.5 * Math.min(P, 1)) + ')'; ctx.beginPath(); ctx.arc(hx + hw + f * (tx + 30 - hx - hw), hy + 15, 3, 0, 7); ctx.fill(); }
      text(ctx, 'steam', (hx + hw + tx) / 2 + 10, hy + 6, { a: 'center', fs: 12, c: COL.sub });
      // turbine and generator
      const tcx = tx + 30, tcy = ty + 80;
      ctx.fillStyle = '#C9CDD3'; ctx.beginPath(); ctx.moveTo(tcx - 30, tcy - 30); ctx.lineTo(tcx + 30, tcy - 45); ctx.lineTo(tcx + 30, tcy + 45); ctx.lineTo(tcx - 30, tcy + 30); ctx.closePath(); ctx.fill();
      ctx.save(); ctx.translate(tcx, tcy); ctx.rotate(S.turb); ctx.strokeStyle = '#555'; ctx.lineWidth = 4; for (let i = 0; i < 6; i++) { ctx.rotate(Math.PI / 3); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 26); ctx.stroke(); } ctx.restore();
      text(ctx, 'turbine', tcx, tcy + 66, { a: 'center', fs: 13, b: 1 });
      ctx.fillStyle = '#555'; ctx.fillRect(tcx + 30, tcy - 4, 50, 8);
      const gx = tcx + 80; ctx.fillStyle = '#2C6BB3'; ctx.fillRect(gx, tcy - 32, 70, 64); text(ctx, 'generator', gx + 35, tcy + 66, { a: 'center', fs: 13, b: 1 });
      const Pe = 1000 * Math.min(P, 1.6); text(ctx, fmt(Pe, 0) + ' MW', gx + 35, tcy + 5, { a: 'center', fs: 13, b: 1, c: '#fff' });
      // condenser
      const cx0 = tx - 10, cy0 = tcy + 90; ctx.fillStyle = '#DCEBF5'; ctx.fillRect(cx0, cy0, 120, 34); ctx.strokeStyle = '#7D848F'; ctx.lineWidth = 1.5; ctx.strokeRect(cx0, cy0, 120, 34); text(ctx, 'condenser', cx0 + 60, cy0 + 22, { a: 'center', fs: 12, b: 1 });
      ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(60,120,220,.7)'; ctx.beginPath(); ctx.moveTo(cx0, cy0 + 17); ctx.lineTo(hx + hw, cy0 + 17); ctx.lineTo(hx + hw, hy + hh - 10); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(tcx, tcy + 45); ctx.lineTo(tcx, cy0); ctx.stroke();
      // power graph
      const px = narrow ? 30 : 640, py = narrow ? 335 : 60, pw = narrow ? W - 60 : W - px - 20, phh = narrow ? Math.min(220, H - py - 20) : 220;
      if (pw > 60 && phh > 40) {
        ctx.fillStyle = '#fff'; ctx.fillRect(px, py, pw, phh); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + phh); ctx.lineTo(px + pw, py + phh); ctx.stroke();
        const Y = v => py + phh - Math.min(v, 1.6) / 1.6 * phh;
        ctx.setLineDash([4, 4]); ctx.strokeStyle = COL.sub; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(px, Y(1)); ctx.lineTo(px + pw, Y(1)); ctx.stroke(); ctx.strokeStyle = COL.r; ctx.beginPath(); ctx.moveTo(px, Y(1.2)); ctx.lineTo(px + pw, Y(1.2)); ctx.stroke(); ctx.setLineDash([]);
        text(ctx, '100%', px + 4, Y(1) - 4, { fs: 11, c: COL.sub }); text(ctx, 'shutdown at 120%', px + pw - 4, Y(1.2) - 4, { a: 'right', fs: 11, c: COL.r });
        ctx.strokeStyle = COL.o; ctx.lineWidth = 2.4; ctx.beginPath(); S.hist.forEach((v, i) => { const x = px + pw * i / 400; i ? ctx.lineTo(x, Y(v)) : ctx.moveTo(x, Y(v)); }); ctx.stroke();
        text(ctx, 'reactor power', px + 4, py + 14, { fs: 12, b: 1 });
      }
      if (S.scram) text(ctx, narrow ? 'EMERGENCY SHUTDOWN: rods fully in' : 'SHUTDOWN: rods fully in', narrow ? 20 : px, narrow ? 22 : py - 14, { fs: narrow ? 14 : 13, b: 1, c: COL.r });
      ctx.restore();
      const state = S.scram ? 'shut down' : Math.abs(S.k - 1) < 0.002 ? 'steady (critical)' : S.k > 1 ? 'power rising (supercritical)' : 'power falling (subcritical)';
      ro([['neutrons from each fission causing another fission, k', fmt(S.k, 3), 'hl'], ['state', state, 'hl'], ['thermal power', fmt(3000 * P, 0) + ' MW'], ['electrical power (33%)', fmt(1000 * P, 0) + ' MW']]);
    }
    loop(cv, frame);
  });

})();
