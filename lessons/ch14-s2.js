/* Semester 2 Chapter 14 Electric Current: full notes by Cikgu Suhaili (from the Chapter 14 Electric Current notes).
   App chapter 14 = STPM 2026 syllabus chapter 15. The slides are short, so the conduction mechanism, the derivation
   of σ = ne²t/m and the temperature effects were written from the syllabus. */
(function () {
  'use strict';
  const { card, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4, pq } = window.PhysiQLessons.H;
  const ms = 'm&#8239;s<sup>−1</sup>';

  // ---------- figures ----------
  const F = {};
  F.circuit = () => svg(320, 150, `<rect x="40" y="30" width="240" height="90" rx="4" fill="none" stroke="${C.ink}" stroke-width="1.8"/>` +
    `<line x1="40" y1="68" x2="40" y2="82" stroke="#F7F8F0" stroke-width="4"/>` + L(28, 68, 52, 68, 'k', '', { w: 1.8 }) + L(33, 82, 47, 82, 'k', '', { w: 4 }) + T(22, 64, '+', { fs: 12, b: 1, c: C.r }) + T(22, 92, '−', { fs: 12, b: 1, c: '#2C6BB3' }) +
    `<circle cx="280" cy="75" r="12" fill="#FFF6D6" stroke="${C.ink}" stroke-width="1.8"/><path d="M272,67 L288,83 M288,67 L272,83" stroke="${C.ink}" stroke-width="1.4"/>` +
    L(110, 22, 200, 22, 'r', 'e', { w: 2.4 }) + T(155, 12, 'conventional current I (and E in the wire)', { fs: 10.5, c: C.r }) + L(200, 134, 110, 134, 'v', 'e', { w: 2.4 }) + T(155, 148, 'electron flow (− to +)', { fs: 10.5, c: C.v }), 320);
  F.rod = () => { let b = `<path d="M60,40 L260,40 A12,30 0 0 1 260,100 L60,100" fill="#F4F1E6" stroke="${C.ink}" stroke-width="1.6"/><ellipse cx="60" cy="70" rx="12" ry="30" fill="#EEEAFD" stroke="${C.v}" stroke-width="1.6"/>`;
    [[100, 58], [130, 82], [160, 54], [190, 76], [220, 60], [240, 88], [115, 90], [175, 92], [205, 50], [145, 66]].forEach(([x, y]) => { b += `<circle cx="${x}" cy="${y}" r="4" fill="#D9E7F7" stroke="#2C6BB3"/>` + L(x - 6, y, x - 20, y, 'v', 'e', { w: 1.2 }); });
    b += L(62, 120, 260, 120, 's', 'b', { w: 1 }) + T(160, 134, 'L', { it: 1 }) + T(60, 28, 'A', { it: 1, b: 1, c: C.v }) + L(150, 14, 230, 14, 'o', 'e', { w: 2 }) + T(244, 18, 'E, I', { fs: 12, it: 1, b: 1, c: C.o, a: 'start' }) + T(20, 74, 'v_d', { fs: 12, it: 1, c: C.v });
    return svg(320, 140, b, 320); };
  F.path = () => { const pts = [[30, 60], [58, 34], [80, 70], [70, 96], [104, 84], [126, 50], [150, 78], [140, 104], [176, 92], [196, 58], [224, 80], [236, 46], [270, 70]]; let a = '', b = '';
    pts.forEach((p, i) => { a += (i ? 'L' : 'M') + p[0] + ',' + p[1]; }); pts.forEach((p, i) => { const q = [p[0] - i * 8, p[1]]; b += (i ? 'L' : 'M') + q[0] + ',' + q[1]; });
    return two(svg(300, 130, P(a, 'v', { w: 1.6 }) + pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="2.5" fill="${C.ink}"/>`).join('') + T(150, 124, 'no field: random motion, no net drift', { fs: 11, c: C.sub }), 300),
      svg(300, 130, P(b, 'v', { w: 1.6 }) + L(240, 18, 160, 18, 'o', 'e', { w: 2 }) + T(250, 22, 'E', { fs: 12, it: 1, b: 1, c: C.o, a: 'start' }) + L(130, 112, 40, 112, 'r', 'e', { w: 2.4 }) + T(150, 116, 'net drift v_d (opposite to E)', { fs: 11, c: C.r, a: 'start' }), 300)); };
  F.RT = () => { const g = (title, d, col, extra = '') => svg(150, 145, axes(26, 105, 110, 85, 'T', title.startsWith('superconductor') ? 'R' : 'ρ', { noO: 1 }) + P(d, col, { w: 2.4 }) + extra + T(80, 140, title, { fs: 10.5, c: C.sub }), 150);
    return `<div class="ls-two" style="grid-template-columns:repeat(3,minmax(0,1fr))">${[g('metal', 'M30,82 L130,36', 'v'), g('semiconductor', 'M32,26 Q48,92 130,98', 'o'), g('superconductor', 'M26,105 L60,105 L60,70 L130,50', 'g', L(60, 108, 60, 112, 'k', '', { w: 1 }) + T(60, 120, 'T_c', { fs: 10, it: 1 }))].map(x => `<div>${x}</div>`).join('')}</div>`; };
  F.VI = () => svg(200, 150, axes(30, 125, 150, 105, 'I', 'V', { noO: 1 }) + L(30, 125, 165, 35, 'v', '', { w: 2.4 }) + T(120, 110, 'gradient = R', { fs: 11, it: 1 }) + T(100, 50, 'metal at constant T', { fs: 11, c: C.sub }), 200);

  const S = `
${sec('14-1', '14.1 Conduction of electricity', `
${def('Electric current, <i>I</i>', `the ${red('rate of flow of electric charge')} through a cross-section of a conductor.`)}
${key(`<i>I</i> = ${fr('d<i>Q</i>', 'd<i>t</i>')} &nbsp;&nbsp;&nbsp; steady current: <i>Q</i> = <i>It</i>`, 'unit: ampere (A) = C s<sup>−1</sup>. 1 A is a flow of 1 C of charge per second.')}
${fig(F.circuit(), 'Figure 14.1: the conventional current flows from the positive to the negative terminal outside the cell; electrons flow the other way.')}
${h4('Charge carriers')}
${table(['Material', 'Charge carriers'], [['Metals', 'free (conduction) electrons'], ['Semiconductors', 'electrons and holes (a hole behaves like a positive charge)'], ['Electrolytes and gases (for comparison)', 'positive and negative ions (and electrons in gases)']])}
${h4('How a metal conducts')}
${steps([`A metal is a lattice of positive ions with many <b>free electrons</b> that are not bound to any atom.`, `Without a p.d., the free electrons move randomly at high speed (about 10<sup>6</sup> ${ms}), colliding with the vibrating ions. Their average velocity is zero, so there is no current.`, `When a p.d. is applied, an electric field <i>E</i> is set up in the metal. Each electron feels a force <i>eE</i> opposite to the field and accelerates between collisions.`, `At each collision with an ion the electron loses the velocity it gained. The result is a slow average <b>drift</b> opposite to the field, added to the random motion. This drift is the current.`])}
${fig(F.path(), 'Figure 14.2: the path of a free electron without a field and with a field.')}
${sim('drift', 'Free electrons in a metal', 'Turn the field on and watch the electrons drift slowly against the field while still moving randomly. Raise the temperature: the ions vibrate more, collisions are more frequent, and the drift becomes slower.')}
${example('14.1.1', `A silver wire carries a current of 3.0 A. Find (a) the number of electrons passing a cross-section each second, (b) the charge that flows through a cross-section in 55 s. (<i>e</i> = 1.60 × 10<sup>−19</sup> C)`,
  steps([`(a) <i>N</i> = ${fr('<i>I</i>', '<i>e</i>')} = ${fr('3.0', '1.60 × 10<sup>−19</sup>')} = <b>1.9 × 10<sup>19</sup> electrons per second</b>`, `(b) <i>Q</i> = <i>It</i> = (3.0)(55) = <b>165 C</b>`]))}
`)}

${sec('14-2', '14.2 Drift velocity', `
${def('Drift velocity, <i>v</i>', `the ${red('average velocity of the charge carriers along the conductor')} when an electric field is applied.`)}
${ul([`For electrons it is opposite to the field (and to the conventional current).`, `It is very small (about 10<sup>−4</sup> ${ms}) compared with the random speed of the electrons. A lamp lights at once because the field is set up along the whole wire almost immediately and all the electrons start drifting together.`])}
${fig(F.rod(), 'Figure 14.3: a conductor of cross-sectional area A and length L.')}
${h4('Deriving I = Anev')}
${steps([`Let <i>n</i> = number of free electrons per unit volume. The volume of the length <i>L</i> is <i>AL</i>, so it holds <i>N</i> = <i>nAL</i> free electrons.`, `Total charge of these electrons: <i>Q</i> = <i>Ne</i> = <i>nALe</i>`, `They all pass through the end face in the time <i>t</i> = ${fr('<i>L</i>', '<i>v</i>')}`, `<i>I</i> = ${fr('<i>Q</i>', '<i>t</i>')} = ${fr('<i>nALe</i>', '<i>L</i>/<i>v</i>')} &nbsp; ⇒ &nbsp; <i>I</i> = <i>Anev</i>`])}
${key(`<i>I</i> = <i>Anev</i>`, '<i>n</i> = number density of free electrons (m<sup>−3</sup>); copper: <i>n</i> ≈ 8.5 × 10<sup>28</sup> m<sup>−3</sup>')}
${ul([`For the same current, a thinner wire (smaller <i>A</i>) has a larger drift velocity.`, `A semiconductor has a much smaller <i>n</i>, so for the same current its carriers drift much faster.`])}
${example('14.2.1', `A copper wire of cross-sectional area 1.0 mm<sup>2</sup> carries a current of 2.0 A. Copper has 8.5 × 10<sup>28</sup> free electrons per m<sup>3</sup>. Find the drift velocity.`,
  steps([`<i>v</i> = ${fr('<i>I</i>', '<i>Ane</i>')} = ${fr('2.0', '(1.0 × 10<sup>−6</sup>)(8.5 × 10<sup>28</sup>)(1.60 × 10<sup>−19</sup>)')} = <b>1.5 × 10<sup>−4</sup> ${ms}</b>`]))}
${example('14.2.2', `A transmission line of diameter 3.00 cm and length 100 km carries a steady current of 1500 A. The copper has 8.49 × 10<sup>28</sup> free electrons per m<sup>3</sup>. How long does one electron take to travel the full length of the line?`,
  steps([`<i>A</i> = π(0.0150)<sup>2</sup> = 7.07 × 10<sup>−4</sup> m<sup>2</sup>`, `<i>v</i> = ${fr('1500', '(7.07 × 10<sup>−4</sup>)(8.49 × 10<sup>28</sup>)(1.60 × 10<sup>−19</sup>)')} = 1.56 × 10<sup>−4</sup> ${ms}`, `<i>t</i> = ${fr('<i>L</i>', '<i>v</i>')} = ${fr('1.00 × 10<sup>5</sup>', '1.56 × 10<sup>−4</sup>')} = <b>6.4 × 10<sup>8</sup> s</b> (about 20 years)`]))}
`)}

${sec('14-3', '14.3 Current density', `
${def('Current density, <i>J</i>', `the ${red('current per unit cross-sectional area')} of a conductor, the area being perpendicular to the current.`)}
${key(`<i>J</i> = ${fr('<i>I</i>', '<i>A</i>')} = <i>nev</i>`, 'vector, in the direction of the conventional current; unit A m<sup>−2</sup>')}
${example('14.3.1', `A copper wire carries 10.0 A. Its cross-section is a square of side 2.0 mm. Copper has 8.49 × 10<sup>28</sup> free electrons per m<sup>3</sup>. Find (a) the current density, (b) the drift velocity.`,
  steps([`(a) <i>J</i> = ${fr('<i>I</i>', '<i>A</i>')} = ${fr('10.0', '(2.0 × 10<sup>−3</sup>)<sup>2</sup>')} = <b>2.5 × 10<sup>6</sup> A m<sup>−2</sup></b>`, `(b) <i>v</i> = ${fr('<i>J</i>', '<i>ne</i>')} = ${fr('2.5 × 10<sup>6</sup>', '(8.49 × 10<sup>28</sup>)(1.60 × 10<sup>−19</sup>)')} = <b>1.8 × 10<sup>−4</sup> ${ms}</b>`]))}
`)}

${sec('14-4', '14.4 Electrical conductivity and resistivity', `
${h4('Resistance and Ohm’s law')}
${def('Resistance, <i>R</i>', `the ${red('ratio of the potential difference across a conductor to the current in it')}: <i>R</i> = <i>V</i>/<i>I</i>. Unit: ohm (Ω) = V A<sup>−1</sup>.`)}
${def('Ohm’s law', `The current in a metallic conductor is ${red('directly proportional to the potential difference across it')}, provided the temperature and other physical conditions are constant.`)}
${fig(F.VI(), 'Figure 14.4: an ohmic conductor gives a straight line through the origin.')}
${h4('Resistivity and conductivity')}
${def('Resistivity, ρ', `of a material: the ${red('resistance of a sample of unit length and unit cross-sectional area')}. It depends on the material and its temperature, not on its shape.`)}
${key(`ρ = ${fr('<i>RA</i>', '<i>l</i>')} &nbsp;&nbsp;&nbsp; (<i>R</i> = ${fr('ρ<i>l</i>', '<i>A</i>')})`, 'unit: Ω m. Good conductors have a small ρ (copper 1.7 × 10<sup>−8</sup> Ω m); insulators a very large ρ.')}
${def('Electrical conductivity, σ', `the ${red('ratio of the current density to the electric field strength')} in a conductor.`)}
${key(`<i>J</i> = σ<i>E</i> &nbsp;&nbsp;&nbsp; σ = ${fr('1', 'ρ')}`, 'unit of σ: Ω<sup>−1</sup> m<sup>−1</sup> (S m<sup>−1</sup>). Conductivity is the reciprocal of resistivity.')}
${h4('Ohm’s law and J = σE are the same law')}
${steps([`For a uniform conductor of length <i>l</i> and area <i>A</i>: <i>V</i> = <i>El</i> and <i>I</i> = <i>JA</i>.`, `Ohm’s law <i>V</i> = <i>IR</i> with <i>R</i> = ρ<i>l</i>/<i>A</i>: &nbsp; <i>El</i> = (<i>JA</i>)${fr('ρ<i>l</i>', '<i>A</i>')} = <i>J</i>ρ<i>l</i>`, `So <i>E</i> = ρ<i>J</i>, i.e. <i>J</i> = ${fr('1', 'ρ')}<i>E</i> = σ<i>E</i>. A constant σ (at constant temperature) means <i>J</i> ∝ <i>E</i>, which is Ohm’s law for the material.`])}
${h4('Deriving σ = ne²t/m')}
${steps([`Between collisions, a free electron in the field <i>E</i> has acceleration <i>a</i> = ${fr('<i>eE</i>', '<i>m</i>')}.`, `Let <i>t</i> be the <b>mean time between collisions</b>. Each collision wipes out the velocity gained, so the average (drift) velocity gained is <i>v</i> = <i>at</i> = ${fr('<i>eEt</i>', '<i>m</i>')}.`, `<i>J</i> = <i>nev</i> = <i>ne</i>${fr('<i>eEt</i>', '<i>m</i>')} = ${fr('<i>ne</i><sup>2</sup><i>t</i>', '<i>m</i>')}<i>E</i>`, `Compare with <i>J</i> = σ<i>E</i>: &nbsp; σ = ${fr('<i>ne</i><sup>2</sup><i>t</i>', '<i>m</i>')} &nbsp; and &nbsp; ρ = ${fr('<i>m</i>', '<i>ne</i><sup>2</sup><i>t</i>')}`])}
${key(`σ = ${fr('<i>ne</i><sup>2</sup><i>t</i>', '<i>m</i>')} &nbsp;&nbsp;&nbsp; ρ = ${fr('1', 'σ')} = ${fr('<i>m</i>', '<i>ne</i><sup>2</sup><i>t</i>')}`, '<i>n</i> = free electrons per unit volume; <i>t</i> = mean time between collisions; <i>m</i>, <i>e</i> = mass and charge of an electron')}
${h4('Temperature and the resistivity of a metal')}
${steps([`In a metal, <i>n</i> does <b>not</b> change with temperature: every atom already gives its free electrons.`, `When the temperature rises, the ions vibrate with larger amplitude, so the free electrons collide with them more often: the mean time between collisions <i>t</i> <b>decreases</b>.`, `From σ = <i>ne</i><sup>2</sup><i>t</i>/<i>m</i>, σ decreases, so the resistivity ρ = <i>m</i>/<i>ne</i><sup>2</sup><i>t</i> <b>increases</b> (roughly linearly) with temperature.`])}
${def('Superconductivity', `the ${red('property of some materials whose resistivity falls to zero when they are cooled below a critical temperature, T<sub>c</sub>')}.`)}
${table(['Material', 'When the temperature rises', 'Reason'], [
  ['Metal', 'ρ increases', '<i>n</i> constant; more collisions with the vibrating ions, so <i>t</i> decreases'],
  ['Semiconductor', 'ρ decreases (quickly)', 'more electrons and holes are released, so <i>n</i> increases greatly; this outweighs the fall in <i>t</i>'],
  ['Superconductor', 'ρ = 0 below <i>T</i><sub>c</sub>; above <i>T</i><sub>c</sub> it behaves like a normal conductor', 'mechanism not required']])}
${fig(F.RT(), 'Figure 14.5: how resistivity (or resistance) varies with temperature.')}
${sim('rtemp', 'Resistivity and temperature', 'Choose a material and change the temperature. Watch the number of carriers n and the mean time between collisions t, and see how they decide the resistivity.')}
${example('14.4.1', `A wire 2.0 m long with a diameter of 0.50 mm has a resistance of 0.171 Ω. Find (a) the resistivity, (b) the conductivity of the material.`,
  steps([`<i>A</i> = π(0.25 × 10<sup>−3</sup>)<sup>2</sup> = 1.96 × 10<sup>−7</sup> m<sup>2</sup>`, `(a) ρ = ${fr('<i>RA</i>', '<i>l</i>')} = ${fr('(0.171)(1.96 × 10<sup>−7</sup>)', '2.0')} = <b>1.68 × 10<sup>−8</sup> Ω m</b>`, `(b) σ = 1/ρ = <b>5.95 × 10<sup>7</sup> Ω<sup>−1</sup> m<sup>−1</sup></b>`]))}
${example('14.4.2', `A p.d. of 240 V is applied across a wire 200 cm long. The current density in the wire is 7.14 × 10<sup>9</sup> A m<sup>−2</sup>. Find (a) the resistivity, (b) the conductivity of the wire.`,
  steps([`<i>E</i> = <i>V</i>/<i>l</i> = 240/2.00 = 120 V m<sup>−1</sup>`, `(a) ρ = ${fr('<i>E</i>', '<i>J</i>')} = ${fr('120', '7.14 × 10<sup>9</sup>')} = <b>1.68 × 10<sup>−8</sup> Ω m</b>`, `(b) σ = 1/ρ = <b>5.95 × 10<sup>7</sup> Ω<sup>−1</sup> m<sup>−1</sup></b>`]))}
${example('14.4.3', `Copper has 8.5 × 10<sup>28</sup> free electrons per m<sup>3</sup> and a resistivity of 1.7 × 10<sup>−8</sup> Ω m. Find the mean time between collisions of the free electrons. (<i>m</i><sub>e</sub> = 9.11 × 10<sup>−31</sup> kg, <i>e</i> = 1.60 × 10<sup>−19</sup> C)`,
  steps([`<i>t</i> = ${fr('<i>m</i>', '<i>ne</i><sup>2</sup>ρ')} = ${fr('9.11 × 10<sup>−31</sup>', '(8.5 × 10<sup>28</sup>)(1.60 × 10<sup>−19</sup>)<sup>2</sup>(1.7 × 10<sup>−8</sup>)')} = <b>2.5 × 10<sup>−14</sup> s</b>`]))}
${example('14.4.4', `The copper wire in Example 14.3.1 (10.0 A, square cross-section of side 2.0 mm) is 50 m long. ρ = 1.68 × 10<sup>−8</sup> Ω m. Find (a) the electric field in the wire, (b) the p.d. across it, (c) its resistance.`,
  steps([`(a) <i>E</i> = ρ<i>J</i> = (1.68 × 10<sup>−8</sup>)(2.5 × 10<sup>6</sup>) = <b>0.042 V m<sup>−1</sup></b>`, `(b) <i>V</i> = <i>El</i> = (0.042)(50) = <b>2.1 V</b>`, `(c) <i>R</i> = <i>V</i>/<i>I</i> = 2.1/10.0 = <b>0.21 Ω</b> (check: ρ<i>l</i>/<i>A</i> = (1.68 × 10<sup>−8</sup>)(50)/(4.0 × 10<sup>−6</sup>) = 0.21 Ω)`]))}
${pq('Section A practice', `The resistivity of a wire depends on its`, ['length', 'material', 'cross-sectional area', 'shape'], 1, `<p>Resistivity is a property of the material (and its temperature). Changing the length or area changes the resistance, not the resistivity.</p>`)}
${exercises('Exercise: electric current', [
  { q: `Two wires A and B of the same material and length carry the same current. The diameter of A is twice that of B. Find the ratio of the drift velocities <i>v</i><sub>A</sub> : <i>v</i><sub>B</sub>.`, a: `<i>v</i> ∝ 1/<i>A</i> ∝ 1/<i>d</i><sup>2</sup>, so <i>v</i><sub>A</sub> : <i>v</i><sub>B</sub> = 1 : 4` },
  { q: `Explain why the resistance of a metal wire increases when it gets hotter, but the resistance of a semiconductor decreases.`, a: `Metal: <i>n</i> stays the same but the ions vibrate more, so the mean time between collisions <i>t</i> falls; σ = <i>ne</i><sup>2</sup><i>t</i>/<i>m</i> falls and ρ rises. Semiconductor: heating frees many more charge carriers, so <i>n</i> rises greatly; this outweighs the small fall in <i>t</i>, so ρ falls.` },
  { q: `An aluminium wire of resistivity 2.8 × 10<sup>−8</sup> Ω m and cross-sectional area 2.0 mm<sup>2</sup> carries 4.0 A. Find the electric field in the wire.`, a: `<i>J</i> = 4.0/2.0 × 10<sup>−6</sup> = 2.0 × 10<sup>6</sup> A m<sup>−2</sup>; <i>E</i> = ρ<i>J</i> = 0.056 V m<sup>−1</sup>` }])}
`)}
`;
  window.PhysiQLessons.register('LESSON-S2-14', { html: () => S });

  // ===================== simulations =====================
  // ---------- 1. free electrons drifting in a metal ----------
  window.PhysiQSims.add('drift', function (root) {
    const { COL, fmt, el, slider, button, toggle, canvas, text, arrow, loop, readouts } = window.PhysiQSims.U;
    const S = { E: 0.6, T: 300, on: true, play: true };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'electric field (relative)', 0, 1, 0.05, S.E, '', v => { S.E = v; });
    slider(ctl, 'temperature', 100, 600, 10, S.T, 'K', v => { S.T = v; });
    const cv = canvas(root); const ro = readouts(root);
    const N = 40, ions = [], el2 = [];
    let W = 600, H = 260;
    function init(w, h) { ions.length = 0; el2.length = 0; for (let i = 0; i < 9; i++) for (let j = 0; j < 4; j++) ions.push({ x0: (i + 0.5) * w / 9, y0: 40 + (j + 0.5) * (h - 60) / 4, p: Math.random() * 7 });
      for (let i = 0; i < N; i++) { const a = Math.random() * 7; el2.push({ x: Math.random() * w, y: 40 + Math.random() * (h - 60), vx: Math.cos(a), vy: Math.sin(a), hl: i === 0, trail: [] }); } W = w; H = h; }
    let t = 0, coll = 0, collT = 0, driftSum = 0, driftT = 0;
    function draw(dt) {
      const ctx = cv.ctx, { w, h } = cv.size(0.45, 230, 320); if (w !== W || h !== H || !ions.length) init(w, h);
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const amp = 2 + (S.T / 600) * 7, speed = 120 * Math.sqrt(S.T / 300), acc = -S.E * 260, rIon = 9 + amp * 0.5;
      t += dt;
      ions.forEach(o => { o.x = o.x0 + amp * Math.sin(t * 13 + o.p); o.y = o.y0 + amp * Math.cos(t * 11 + o.p * 1.3); ctx.beginPath(); ctx.arc(o.x, o.y, 9, 0, 7); ctx.fillStyle = '#F9D9C8'; ctx.fill(); ctx.strokeStyle = COL.r; ctx.lineWidth = 1.4; ctx.stroke(); text(ctx, '+', o.x, o.y + 4, { a: 'center', b: 1, fs: 11, c: COL.r }); });
      let dsum = 0;
      el2.forEach(e => {
        e.vx += acc / speed * dt; // the field pushes electrons to the left (against E)
        e.x += e.vx * speed * dt; e.y += e.vy * speed * dt;
        if (e.y < 34 || e.y > h - 16) { e.vy = -e.vy; e.y = Math.max(34, Math.min(h - 16, e.y)); }
        if (e.x < 0) { e.x += w; e.trail = []; } if (e.x > w) { e.x -= w; e.trail = []; }
        for (const o of ions) { const dx = e.x - o.x, dy = e.y - o.y; if (dx * dx + dy * dy < rIon * rIon) { const a = Math.random() * 7; e.vx = Math.cos(a); e.vy = Math.sin(a); e.x = o.x + (rIon + 1) * dx / Math.hypot(dx, dy); e.y = o.y + (rIon + 1) * dy / Math.hypot(dx, dy); coll++; break; } }
        dsum += e.vx * speed;
        if (e.hl) { e.trail.push([e.x, e.y]); if (e.trail.length > 160) e.trail.shift(); ctx.strokeStyle = 'rgba(192,57,43,.6)'; ctx.lineWidth = 1.4; ctx.beginPath(); e.trail.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
        ctx.beginPath(); ctx.arc(e.x, e.y, e.hl ? 5 : 3.5, 0, 7); ctx.fillStyle = e.hl ? COL.r : '#2C6BB3'; ctx.fill();
      });
      collT += dt; driftSum += dsum / N * dt; driftT += dt;
      if (S.E > 0) { arrow(ctx, w * 0.35, 16, w * 0.65, 16, COL.o, 2.4, 9); text(ctx, 'E', w * 0.67, 20, { it: 1, b: 1, c: COL.o }); }
      text(ctx, 'red: one electron and its path', 8, h - 4, { fs: 10, c: COL.sub });
      if (driftT > 1.5) { S.vd = -driftSum / driftT; S.rate = coll / collT; driftSum = 0; driftT = 0; coll = 0; collT = 0; }
      ro([['drift (average velocity)', S.E ? (S.vd != null ? fmt(Math.max(0, S.vd), 0) + ' units to the left' : 'measuring…') : 'zero: random motion only', 'hl'], ['collisions per second', S.rate != null ? fmt(S.rate, 0) : '…'], ['mean time between collisions t', S.rate ? fmt(N / S.rate * 1000, 0) + ' ms (simulated)' : '…'], ['what to notice', S.T > 400 ? 'hot: more collisions, smaller t, slower drift' : 'drift is tiny compared with the random speed']]);
    }
    loop(cv, dt => { if (S.play) draw(dt); });
    new ResizeObserver(() => draw(0)).observe(root);
    draw(0);
  });

  // ---------- 2. resistivity and temperature ----------
  window.PhysiQSims.add('rtemp', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts } = window.PhysiQSims.U;
    const S = { m: 'metal', T: 300 };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const ms = [['metal', 'metal (copper)'], ['semi', 'semiconductor (silicon)'], ['super', 'superconductor']];
    const chips = ms.map(([k, n]) => { const b = button(pre, n, 'sm-chip' + (k === S.m ? ' on' : ''), () => { S.m = k; chips.forEach(x => x.classList.toggle('on', x === b)); draw(); }); return b; });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'temperature <i>T</i>', 4, 600, 2, S.T, 'K', v => { S.T = v; draw(); });
    const cv = canvas(root); const ro = readouts(root);
    // simple models: relative n and t
    const model = (m, T) => {
      if (m === 'metal') return { n: 1, t: 1 / (0.12 + T / 300 * 0.88) };
      if (m === 'semi') return { n: Math.exp(-1500 / T + 5), t: 1 / (0.2 + T / 300 * 0.8) };
      return T < 92 ? { n: 1, t: Infinity } : { n: 1, t: 1 / (0.3 + (T - 92) / 300) };
    };
    const rho = (m, T) => { const q = model(m, T); return q.t === Infinity ? 0 : 1 / (q.n * q.t); };
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.5, 240, 340); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const b = { x: 54, y: 24, w: w - 80, h: h - 70 }, Tmax = 600;
      let rmax = 0; for (let T = 4; T <= Tmax; T += 4) rmax = Math.max(rmax, rho(S.m, T)); if (S.m === 'semi') rmax = rho('semi', 200);
      ctx.fillStyle = '#fff'; ctx.fillRect(b.x, b.y, b.w, b.h); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x, b.y + b.h); ctx.lineTo(b.x + b.w, b.y + b.h); ctx.stroke();
      text(ctx, 'resistivity ρ (relative)', b.x, b.y - 8, { b: 1, fs: 12, c: COL.v }); text(ctx, 'T / K', b.x + b.w, b.y + b.h + 30, { a: 'right', fs: 11, it: 1, c: COL.sub });
      for (let T = 0; T <= Tmax; T += 100) text(ctx, String(T), b.x + b.w * T / Tmax, b.y + b.h + 14, { a: 'center', fs: 10, c: COL.sub });
      ctx.strokeStyle = COL.v; ctx.lineWidth = 2.6; ctx.beginPath(); let first = true;
      for (let T = 4; T <= Tmax; T += 2) { const r = Math.min(1.05, rho(S.m, T) / rmax), X = b.x + b.w * T / Tmax, Y = b.y + b.h * (1 - r / 1.05); if (r >= 1.05) { first = true; continue; } first ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y); first = false; } ctx.stroke();
      if (S.m === 'super') { const X = b.x + b.w * 92 / Tmax; ctx.setLineDash([3, 3]); ctx.strokeStyle = COL.sub; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X, b.y); ctx.lineTo(X, b.y + b.h); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'Tc = 92 K', X + 4, b.y + 14, { fs: 11, b: 1, c: COL.gr }); }
      const r = rho(S.m, S.T), X = b.x + b.w * S.T / Tmax, Y = b.y + b.h * (1 - Math.min(1.05, r / rmax) / 1.05); ctx.beginPath(); ctx.arc(X, Y, 6, 0, 7); ctx.fillStyle = COL.o; ctx.fill();
      const q = model(S.m, S.T), q0 = model(S.m, 300);
      ro([['carriers per unit volume n', S.m === 'semi' ? fmt(q.n / q0.n, 2) + ' × the value at 300 K' : 'constant', 'hl'], ['mean time between collisions t', q.t === Infinity ? 'no resistance (superconducting)' : fmt(q.t / q0.t, 2) + ' × the value at 300 K', 'hl'], ['resistivity ρ = m/ne²t', r === 0 ? 'zero' : fmt(r / rho(S.m, 300), 2) + ' × the value at 300 K'], ['note', S.m === 'super' ? 'the material shown is a high-Tc ceramic (YBCO)' : 'curves are sketches, not data']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });
})();
