/* Chapter 3 Dynamics (Force, momentum and impulse): full notes by Cikgu Suhaili (from chapter_3_Dynamics__2025_latest.pdf, figures from the 2021 slides). */
(function () {
  'use strict';
  const { card, fr, sq, vec, half, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, ms, ms2, svg, L, T, P, dot, axes, C, table, sec, h4 } = window.PhysiQLessons.H;
  const sub = (a, b) => `<i>${a}</i><sub>${b}</sub>`;

  // ---------- figures ----------
  const F = {};
  // free-body diagram: a block (on a surface tilted by tilt degrees) with force arrows [angleDeg, length, label, colourKey]
  F.fbd = (forces, o = {}) => {
    const cx = 170, cy = 110, tilt = o.tilt || 0, r = tilt * Math.PI / 180;
    let b = '';
    if (o.surface !== false) { const dx = Math.cos(r) * 150, dy = Math.sin(r) * 150; b += L(cx - dx, cy + 18 + dy, cx + dx, cy + 18 - dy, 'k', '', { w: 2.4 }); if (tilt) b += L(cx - dx, cy + 18 + dy, cx + dx, cy + 18 + dy, 's', '', { d: '3 3', w: 1 }) + T(cx - dx + 44, cy + 12 + dy, tilt + '°', { fs: 12 }); }
    b += `<g transform="rotate(${-tilt} ${cx} ${cy})"><rect x="${cx - 26}" y="${cy - 18}" width="52" height="36" rx="3" fill="#BDE3E8" stroke="${C.ink}" stroke-width="1.4"/>${o.m ? T(cx, cy + 5, o.m, { fs: 13, b: 1 }) : ''}</g>`;
    forces.forEach(([ang, len, lab, c, lx, ly]) => {
      const a = ang * Math.PI / 180, x2 = cx + Math.cos(a) * len, y2 = cy - Math.sin(a) * len;
      b += L(cx, cy, x2, y2, c || 'r', 'e', { w: 2.6 }) + T(x2 + (lx != null ? lx : Math.cos(a) * 14), y2 - (ly != null ? ly : Math.sin(a) * 14) + 5, lab, { fs: 13, b: 1, it: 1, c: C[c] || C.ink });
    });
    if (o.a) b += L(o.a[0], o.a[1], o.a[2], o.a[3], 'k', 'e', { w: 2.4 }) + T((o.a[0] + o.a[2]) / 2, Math.min(o.a[1], o.a[3]) - 6, 'a', { it: 1, b: 1 });
    return svg(340, 220, b, o.maxw || 320);
  };
  F.netforce = () => svg(460, 160,
    T(85, 20, 'A (initially at rest)', { fs: 12, b: 1 }) + L(20, 70, 160, 70, 'k', '', { w: 2 }) + dot(60, 60, 10, '#F3A6E4') + T(60, 64, 'A', { fs: 11, b: 1 }) + L(70, 52, 120, 52, 'k', 'e') + T(95, 46, '3 N', { fs: 12, b: 1 }) + T(90, 96, 'Net force = 3 N, A moves right', { fs: 11 }) +
    T(330, 20, 'B (initially at rest)', { fs: 12, b: 1 }) + L(250, 70, 420, 70, 'k', '', { w: 2 }) + dot(320, 60, 10, '#A6E4F3') + T(320, 64, 'B', { fs: 11, b: 1 }) + L(310, 52, 270, 52, 'k', 'e') + L(330, 52, 390, 52, 'r', 'e') + T(285, 46, '3 N', { fs: 12, b: 1 }) + T(365, 46, '5 N', { fs: 12, b: 1, c: C.r }) + T(335, 96, 'Net force = 5 − 3 = 2 N, B moves right', { fs: 11 }) +
    dot(150, 140, 8, '#FFF59D') + L(160, 140, 190, 140, 'k', 'e') + dot(200, 140, 8, '#FFF59D') + L(200, 160, 200, 150, 'r', 'e') + P('M210,138 Q245,130 262,108', 'k', { w: 1.6, d: '4 4', a: 'k' }) + T(270, 124, 'C moves to the right; a 5 N', { fs: 11, a: 'start' }) + T(270, 140, 'force changes its direction', { fs: 11, a: 'start' }));
  F.pulley = (m1, m2) => svg(220, 220,
    L(60, 15, 160, 15, 'k', '', { w: 3 }) + L(110, 15, 110, 50, 'k', '', { w: 2 }) + `<circle cx="110" cy="70" r="30" fill="#E2B6F8" stroke="${C.ink}" stroke-width="1.6"/>` +
    L(80, 70, 80, 170, 'k', '', { w: 1.6 }) + L(140, 70, 140, 160, 'k', '', { w: 1.6 }) + `<rect x="62" y="170" width="36" height="30" fill="#FFF59D" stroke="${C.ink}"/><rect x="120" y="160" width="40" height="40" fill="#B9F6B0" stroke="${C.ink}"/>` +
    T(80, 190, m1, { fs: 12, b: 1 }) + T(140, 185, m2, { fs: 12, b: 1 }));
  F.tablePulley = (mA, mB, lA = 'A', lB = 'B') => svg(320, 210,
    `<rect x="40" y="90" width="200" height="110" fill="#BDE3E8" stroke="${C.ink}"/><rect x="90" y="40" width="70" height="50" fill="#FFF59D" stroke="${C.ink}"/>` + T(125, 70, mA, { fs: 13, b: 1 }) + T(125, 32, lA, { fs: 13, b: 1 }) +
    L(160, 62, 262, 62, 'k', '', { w: 1.6 }) + `<circle cx="262" cy="76" r="14" fill="#14A0A0" stroke="${C.ink}"/>` + L(276, 76, 276, 140, 'k', '', { w: 1.6 }) + `<rect x="262" y="140" width="28" height="30" fill="#6D0F3A"/>` + T(298, 152, lB, { fs: 12, b: 1, a: 'start' }) + T(298, 168, mB, { fs: 12, b: 1, a: 'start' }));
  F.incline = (deg, lab) => {
    const r = deg * Math.PI / 180, x0 = 30, y0 = 180, L1 = 260, x1 = x0 + L1 * Math.cos(r), y1 = y0 - L1 * Math.sin(r);
    return svg(320, 200, `<path d="M${x0},${y0} L${x1},${y1} L${x1},${y0} Z" fill="#BDE3E8" stroke="${C.ink}" stroke-width="1.4"/>` +
      `<g transform="rotate(${-deg} ${x0 + 150 * Math.cos(r)} ${y0 - 150 * Math.sin(r)})"><rect x="${x0 + 150 * Math.cos(r) - 22}" y="${y0 - 150 * Math.sin(r) - 32}" width="44" height="32" fill="#9FD8DD" stroke="${C.ink}"/></g>` +
      P(`M${x0 + 46},${y0} A46,46 0 0 0 ${x0 + 46 * Math.cos(r)},${y0 - 46 * Math.sin(r)}`, 'ink', { w: 1.2 }) + T(x0 + 56, y0 - 8, deg + '°', { fs: 12, a: 'start' }) + (lab || ''));
  };
  F.tri3 = () => svg(330, 190,
    `<rect x="90" y="60" width="150" height="110" fill="#FBCFFB" stroke="${C.ink}"/><rect x="125" y="30" width="80" height="30" fill="#BDE3E8" stroke="${C.ink}"/>` + T(165, 50, '10 kg', { fs: 12, b: 1 }) +
    L(125, 45, 72, 45, 'k', '', { w: 1.4 }) + L(205, 45, 258, 45, 'k', '', { w: 1.4 }) + `<circle cx="72" cy="55" r="10" fill="#BDE3E8" stroke="${C.ink}"/><circle cx="258" cy="55" r="10" fill="#BDE3E8" stroke="${C.ink}"/>` +
    L(62, 55, 62, 110, 'k', '', { w: 1.4 }) + L(268, 55, 268, 130, 'k', '', { w: 1.4 }) + `<rect x="50" y="110" width="24" height="24" fill="#BDE3E8" stroke="${C.ink}"/><rect x="254" y="130" width="28" height="50" fill="#BDE3E8" stroke="${C.ink}"/>` +
    T(40, 128, '6.0 kg', { fs: 12, b: 1, a: 'end' }) + T(290, 160, '9.0 kg', { fs: 12, b: 1, a: 'start' }));
  F.twoBoxes = () => svg(320, 150,
    L(20, 70, 170, 70, 'k', '', { w: 2 }) + `<rect x="60" y="40" width="50" height="30" fill="#BDE3E8" stroke="${C.ink}"/>` + T(85, 60, 'A', { b: 1 }) + L(110, 52, 170, 52, 'k', '', { w: 1.4 }) + `<circle cx="174" cy="60" r="8" fill="#888" stroke="${C.ink}"/>` +
    L(170, 70, 290, 140, 'k', '', { w: 2 }) + L(150, 140, 290, 140, 's', '', { d: '3 3', w: 1 }) + `<g transform="rotate(30 215 95)"><rect x="190" y="75" width="50" height="30" fill="#BDE3E8" stroke="${C.ink}"/></g>` + T(215, 102, 'B', { b: 1 }) + T(258, 134, '30°', { fs: 12 }));
  F.blocks = () => svg(340, 110,
    L(20, 80, 320, 80, 'k', '', { w: 2.4 }) + `<rect x="60" y="55" width="40" height="25" fill="#BDE3E8" stroke="${C.ink}"/><rect x="180" y="35" width="60" height="45" fill="#BDE3E8" stroke="${C.ink}"/>` +
    T(80, 48, 'A', { b: 1 }) + T(210, 28, 'B', { b: 1 }) + L(100, 68, 180, 68, 'r', '', { w: 1.6 }) + L(240, 58, 300, 58, 'v', 'e', { w: 2.6 }) + T(300, 50, '12 N', { fs: 12, b: 1 }) + T(170, 100, 'rough surface', { fs: 12, c: C.sub }));
  F.collide = () => svg(480, 120,
    T(80, 16, 'Before collision', { fs: 12, b: 1 }) + T(240, 16, 'During collision', { fs: 12, b: 1 }) + T(400, 16, 'After collision', { fs: 12, b: 1 }) +
    L(10, 90, 150, 90, 'k', '', { w: 1.4 }) + dot(40, 80, 9, '#BDE3E8') + dot(110, 70, 20, '#86C232') + L(52, 64, 80, 64, 'k', 'e') + T(66, 56, 'u₁', { fs: 12, it: 1 }) + L(130, 50, 150, 50, 'k', 'e') + T(140, 42, 'u₂', { fs: 12, it: 1 }) + T(30, 62, 'A', { fs: 12, b: 1 }) + T(110, 44, 'B', { fs: 12, b: 1 }) +
    L(170, 90, 310, 90, 'k', '', { w: 1.4 }) + dot(226, 80, 9, '#BDE3E8') + dot(255, 70, 20, '#86C232') + L(250, 56, 222, 56, 'v', 'e') + T(212, 52, 'F_B', { fs: 11, it: 1, c: C.v }) + L(230, 100, 258, 100, 'r', 'e') + T(266, 112, 'F_A', { fs: 11, it: 1, c: C.r }) +
    L(330, 90, 470, 90, 'k', '', { w: 1.4 }) + dot(360, 80, 9, '#BDE3E8') + dot(430, 70, 20, '#86C232') + L(372, 64, 392, 64, 'k', 'e') + T(382, 56, 'v₁', { fs: 12, it: 1 }) + L(452, 50, 476, 50, 'k', 'e') + T(462, 42, 'v₂', { fs: 12, it: 1 }));
  F.ballistic = () => svg(320, 200,
    `<rect x="40" y="10" width="240" height="12" fill="#F2C48D" stroke="${C.ink}"/>` + L(150, 22, 150, 120, 'k', '', { w: 1.2 }) + L(170, 22, 170, 120, 'k', '', { w: 1.2 }) +
    `<rect x="140" y="120" width="40" height="36" fill="#E05A86" stroke="${C.ink}"/>` + T(160, 143, 'M', { fs: 13, b: 1, c: '#fff' }) +
    L(150, 22, 222, 102, 's', '', { d: '3 3', w: 1 }) + L(170, 22, 242, 102, 's', '', { d: '3 3', w: 1 }) + `<rect x="212" y="102" width="40" height="36" fill="none" stroke="${C.sub}" stroke-dasharray="3 3"/>` +
    P('M160,160 Q205,165 232,140', 'ink', { w: 1.2, d: '4 3' }) + L(272, 120, 272, 156, 'k', 'b', { w: 1.2 }) + T(280, 142, 'h', { it: 1, a: 'start' }) +
    `<rect x="70" y="134" width="22" height="9" rx="4" fill="#E7B54A" stroke="${C.ink}"/>` + L(96, 138, 132, 138, 'r', 'e', { w: 2.4 }) + T(80, 128, 'm', { it: 1, b: 1 }) + T(112, 160, 'u', { it: 1, b: 1 }));
  F.impulseG = () => svg(260, 170, axes(40, 140, 200, 120, 't', 'F', { noO: 1 }) + `<path d="M40,110 C70,105 80,40 100,40 C120,40 120,80 140,100 L160,140 L40,140 Z" fill="${C.fill}" stroke="none"/>` + P('M40,110 C70,105 80,40 100,40 C120,40 120,80 140,100 L160,140', 'r', { w: 2.6 }) + T(40, 156, 't₀', { fs: 12, it: 1 }) + T(160, 156, 't₁', { fs: 12, it: 1 }) + T(100, 110, 'area = impulse', { fs: 12, c: C.v, b: 1 }));
  F.ex3217 = () => svg(300, 170, axes(40, 140, 240, 120, 't / s', 'F / N') + P('M40,50 L130,50 L175,140', 'r', { w: 2.6 }) + `<path d="M40,140 L40,50 L130,50 L175,140 Z" fill="${C.fill}"/>` + L(130, 50, 130, 140, 's', '', { d: '3 3', w: 1 }) + T(32, 54, '20', { fs: 12, a: 'end' }) + T(130, 156, '4', { fs: 12 }) + T(175, 156, '6', { fs: 12 }) + T(220, 156, '8', { fs: 12 }));
  F.fvsF = () => svg(360, 220,
    axes(40, 190, 300, 170, 'applied force F', 'f', { noO: 1 }) + P('M40,190 L170,70', 'r', { w: 2.8 }) + L(170, 70, 170, 105, 'r', '', { w: 1.6, d: '3 3' }) + P('M170,105 L330,105', 'r', { w: 2.8 }) +
    L(40, 70, 170, 70, 's', '', { d: '3 3', w: 1 }) + L(170, 70, 170, 190, 's', '', { d: '3 3', w: 1 }) + T(34, 74, 'f_s max', { fs: 11, a: 'end', it: 1 }) + T(170, 206, 'F = f_s max', { fs: 11, it: 1 }) +
    T(105, 150, 'static: f = F', { fs: 12, c: C.v, b: 1 }) + T(250, 96, 'kinetic friction (constant)', { fs: 12, c: C.v, b: 1 }));

  const S = `
${sec('3-1', '3.1 Newton’s laws of motion', `
${h4('Newton’s first law')}
${def('Newton’s first law', `Every body ${red('continues in its state of rest or uniform motion')} in a straight line unless a ${red('net force')} acts on it. In equation form, Σ<i>F</i> = 0.`)}
${ul([`A stationary particle starts to move because a net external force acts on it.`, `A moving particle stops, or changes direction, because of a net external force.`, `The first law tells us what a force does: it changes the state of motion.`])}
${fig(F.netforce())}
${def('Inertia', `is ${red('the tendency of a body to maintain its state of rest or of uniform motion in a straight line')}. Newton’s first law is also called the law of inertia.`)}
${ul([`Inertia is a body’s reluctance to start moving ("lazy") and its reluctance to stop once it is moving ("hardworking"), so a force is needed to move a body or to stop it.`, `Inertia depends on <b>mass</b>: <b>mass is a measure of the inertia of a body</b>. A heavy body is harder to move, and harder to stop, than a light one.`, `When a car stops suddenly the passenger continues to move forward because of his inertia, so a safety belt is needed during emergency braking.`, `Classic inertia experiments: pulling a sheet from under a pile of books, and pushing two hanging tins, one empty and one full of sand.`])}

${h4('Newton’s second law')}
${def('Newton’s second law', `The ${red('rate of change of momentum')} is ${red('proportional to the resultant force')} (net force).`)}
${eq(`${fr('d<i>p</i>', 'd<i>t</i>')} ∝ <i>F</i> &nbsp;⇒&nbsp; ${fr('<i>mv</i> − <i>mu</i>', '<i>t</i>')} ∝ <i>F</i> &nbsp;⇒&nbsp; <i>ma</i> ∝ <i>F</i> &nbsp;⇒&nbsp; <i>F</i> = <i>kma</i>`)}
${ul([`If <i>m</i> = 1 kg, <i>a</i> = 1 m s<sup>−2</sup> and <i>k</i> = 1, then <i>F</i> = 1 N.`, `The <b>direction of the acceleration</b> is the same as the direction of the applied net force.`, `<b>1 newton</b> is the force that produces an acceleration of 1 m s<sup>−2</sup> when acting on a 1 kg mass: <b>1 N = 1 kg m s<sup>−2</sup></b>.`])}
${two(eq(`<i>F</i> = ${fr('d(<i>mv</i>)', 'd<i>t</i>')} = <i>v</i>${fr('d<i>m</i>', 'd<i>t</i>')} + <i>m</i>${fr('d<i>v</i>', 'd<i>t</i>')}`), `<p>If the mass does not change, ${fr('d<i>m</i>', 'd<i>t</i>')} = 0 and the acceleration is <i>a</i> = ${fr('d<i>v</i>', 'd<i>t</i>')} = ${fr('<i>v</i> − <i>u</i>', '<i>t</i>')}, so</p>${key(`<i>F</i> = <i>ma</i> &nbsp; or &nbsp; <i>F</i> = ${fr('<i>m</i>(<i>v</i> − <i>u</i>)', '<i>t</i>')}`)}`)}
${example('3.1.1', `The velocity of a particle of mass <b>200 g</b> moving in a straight line increases from <b>10 to 50 cm s<sup>−1</sup> in 2 s</b>. Find the <b>force</b> acting on the particle.`,
  steps([`<i>m</i> = 200 × 10<sup>−3</sup> kg, <i>v</i> = 50 × 10<sup>−2</sup> m s<sup>−1</sup>, <i>u</i> = 10 × 10<sup>−2</sup> m s<sup>−1</sup>`, `<i>F</i> = ${fr('<i>m</i>(<i>v</i> − <i>u</i>)', '<i>t</i>')} = ${fr('200 × 10<sup>−3</sup>[(50 − 10) × 10<sup>−2</sup>]', '2')} = <b>4.0 × 10<sup>−2</sup> N</b>`]))}
${example('3.1.2', `A sprinter accelerates constantly from <b>rest</b> and covers <b>50 m</b> in <b>6 s</b>. Her mass is <b>54 kg</b>. Ignoring all resistance, what <b>horizontal force</b> is she producing?`,
  steps([`<i>m</i> = 54 kg, <i>u</i> = 0, <i>s</i> = 50 m, <i>t</i> = 6 s`, `<i>s</i> = <i>ut</i> + ½<i>at</i><sup>2</sup> ⇒ <i>a</i> = ${fr('<i>s</i> − <i>ut</i>', '½<i>t</i><sup>2</sup>')} = ${fr('50 − 0', '½(6)<sup>2</sup>')} = 2.8 m s<sup>−2</sup>`, `<i>F</i> = <i>ma</i> = (54)(2.8) = <b>151 N</b>`]))}
${example('3.1.3', `At time <i>t</i> seconds, the acceleration of a body of mass 5 kg is (10 + 70<i>t</i> − 20<i>t</i><sup>2</sup>) m s<sup>−2</sup>. Find the <b>force</b> on the body at <b><i>t</i> = 0</b>, and the <b>maximum force</b> on the body.`,
  steps([`At <i>t</i> = 0: <i>a</i> = 10 + 0 − 0 = 10 m s<sup>−2</sup>, so <i>F</i> = <i>ma</i> = (5)(10) = <b>50 N</b>`, `Maximum force: <i>F</i><sub>max</sub> = <i>ma</i><sub>max</sub>. For <i>a</i><sub>max</sub>, ${fr('d<i>a</i>', 'd<i>t</i>')} = 0: 70 − 2(20)<i>t</i> = 0 ⇒ <i>t</i> = 1.75 s`, `<i>a</i> = 10 + 70(1.75) − 20(1.75)<sup>2</sup> = 71.25 m s<sup>−2</sup>`, `<i>F</i><sub>max</sub> = 5(71.25) = <b>356.3 N</b>`]))}
${h4('Using <i>F</i> = <i>m</i> d<i>v</i>/d<i>t</i> + <i>v</i> d<i>m</i>/d<i>t</i> when the velocity is constant')}
<p>When the <b>velocity is constant</b>, d<i>v</i>/d<i>t</i> = 0 and the force is needed only to change the mass that is moving:</p>
${key(`<i>F</i> = <i>v</i>${fr('d<i>m</i>', 'd<i>t</i>')}`, 'd<i>m</i>/d<i>t</i> = rate at which mass is added to (or removed from) the moving stream')}
${card('Additional example (syllabus 3.1(d)) · conveyor belt', `Sand falls vertically onto a conveyor belt at a rate of 2.0 kg s<sup>−1</sup>. The belt moves horizontally at a constant speed of 3.0 m s<sup>−1</sup>. Find the extra horizontal force needed to keep the belt moving at this speed.`,
  steps([`The sand lands with no horizontal velocity and must be brought up to 3.0 m s<sup>−1</sup>. The belt’s speed is constant, so d<i>v</i>/d<i>t</i> = 0.`, `<i>F</i> = <i>m</i>${fr('d<i>v</i>', 'd<i>t</i>')} + <i>v</i>${fr('d<i>m</i>', 'd<i>t</i>')} = 0 + (3.0)(2.0) = <b>6.0 N</b>`]))}
${card('Additional example (syllabus 3.1(d)) · water jet', `Water leaves a hose at 20 m s<sup>−1</sup> at a rate of 0.50 kg s<sup>−1</sup> and hits a wall horizontally without bouncing back. Find the force exerted by the water on the wall.`,
  steps([`Each second, 0.50 kg of water changes its velocity from 20 m s<sup>−1</sup> to 0. The jet speed is constant, so the force is <i>F</i> = <i>v</i>${fr('d<i>m</i>', 'd<i>t</i>')}.`, `<i>F</i> = (20)(0.50) = 10 N. The wall exerts 10 N on the water, so by Newton’s third law <b>the water exerts 10 N on the wall</b>, in the direction of the jet.`]))}
${exercises('Exercises: F = ma', [
  { q: `A lorry of mass 5000 kg can accelerate at 1 m s<sup>−2</sup> when it is unloaded. What will its acceleration be when it carries a load of 3000 kg?`, a: `0.625 m s<sup>−2</sup>` },
  { q: `A car of mass 1000 kg experiences a net horizontal force of 4000 N, which accelerates it from rest to 10 m s<sup>−1</sup>. How far does it travel during the acceleration?`, a: `12.5 m` },
  { q: `A car of mass 800 kg experiences a force of 1200 N. How long does it take to reach 30 m s<sup>−1</sup> from rest?`, a: `20 s` },
  { q: `At time <i>t</i> seconds, the force on a body of mass 10 kg is (4<i>t</i> − <i>t</i><sup>2</sup>) N. Find the acceleration at <i>t</i> = 1 s and the maximum acceleration.`, a: `0.3 m s<sup>−2</sup>; 0.4 m s<sup>−2</sup> (at <i>t</i> = 2 s)` }])}
${example('3.1.4', `Two forces act on an object P of mass 5 kg: 20 N to the right and 10 N to the left. Find the <b>acceleration</b>.`,
  steps([`Net force, <i>F</i> = 20 − 10 = 10 N to the right`, `<i>F</i> = <i>ma</i>: 10 = 5<i>a</i> ⇒ <b><i>a</i> = 2 m s<sup>−2</sup></b> (to the right)`]), fig(F.fbd([[0, 80, '20 N', 'r', 0, 10], [180, 70, '10 N', 'o', 0, 10]], { m: '5 kg', a: [140, 40, 200, 40] })))}
${exercises('Exercises: net force and acceleration', [
  { q: `Calculate the acceleration of a 10.0 kg box that moves horizontally when acted on by: (a) 3 N and 5 N, both to the right; (b) 3 N at 45° above the horizontal and 5 N, both towards the right; (c) 3 N vertically upward and 5 N to the right; (d) 3 N at 45° above the horizontal to the right and 5 N to the left.`, a: `(a) 0.8 m s<sup>−2</sup> to the right &nbsp; (b) 0.71 m s<sup>−2</sup> to the right &nbsp; (c) 0.5 m s<sup>−2</sup> to the right &nbsp; (d) 0.29 m s<sup>−2</sup> to the left<br><span class="ls-small">Only horizontal components accelerate a box that moves horizontally: (b) 3 cos 45° + 5 = 7.12 N; (c) the vertical 3 N does not count, so 5 N; (d) 5 − 3 cos 45° = 2.88 N.</span>` },
  { q: `Find the acceleration of (a) a 6 kg body pulled by 12 N along a smooth floor; (b) a body of weight 49 N pulled up by two vertical forces of 12 N and 30 N.`, a: `(a) 2 m s<sup>−2</sup> to the right &nbsp; (b) 1.4 m s<sup>−2</sup> downward` },
  { q: `Find the unknown forces: (a) force A gives a 6 kg body an acceleration of 3 m s<sup>−2</sup> on a smooth floor; (b) force C lifts a 20 kg body (weight 196 N) with an upward acceleration of 1 m s<sup>−2</sup>.`, a: `(a) A = 18 N &nbsp; (b) C = 216 N` }])}

${h4('Newton’s third law')}
${def('Newton’s third law', `For ${red('every action (force)')} there is a ${red('reaction (opposing force)')} of ${red('equal magnitude but opposite direction')}.`)}
${ul([`If object A exerts a force on object B (<b>F</b><sub>AB</sub>), then B exerts a force of the same size on A (<b>F</b><sub>BA</sub>), in the opposite direction.`, `The action and reaction act on <b>different bodies</b>.`])}
${eq(`<b>F</b><sub>AB</sub> = −<b>F</b><sub>BA</sub> &nbsp; (action) &nbsp; (reaction)`)}
${ul([`A hand pushes on a wall (action); the wall pushes on the hand (reaction).`, `A hand presses on a desk (action); the desk pushes up on the hand (reaction).`, `We can walk forward because, when one foot pushes backward on the ground, the ground pushes forward on the foot.`])}
`)}

${sec('3-2', '3.2 Conservation of linear momentum and impulse', `
${def('Linear momentum, <i>p</i>', `is the product of the ${red('mass')} of a particle, <i>m</i>, and its ${red('velocity')}, <i>v</i>: <b><i>p</i> = <i>mv</i></b>.`)}
${ul([`A <b>vector</b>, in the same direction as the velocity.`, `Unit: kg m s<sup>−1</sup> or N s.`])}
${def('Principle of conservation of linear momentum', `When the ${red('net external force')} on a system is ${red('zero')}, the total ${red('momentum')} of the system is constant. Or: if there are ${red('no external forces')} acting on a system, the total momentum before a collision ${red('equals')} the total momentum after it.`)}
${eq(`Newton’s second law: <i>F</i> = ${fr('Δ<i>p</i>', 'Δ<i>t</i>')}. If Σ<i>F</i> = 0 then Δ<i>p</i> = 0, so <i>p</i> = constant`)}
${key(`Σ<i>p</i><sub>i</sub> = Σ<i>p</i><sub>f</sub><br>${sub('m', '1')}${sub('u', '1')} + ${sub('m', '2')}${sub('u', '2')} = ${sub('m', '1')}${sub('v', '1')} + ${sub('m', '2')}${sub('v', '2')}`, 'For a collision between two bodies')}
${h4('Newton’s third law proves the principle')}
${fig(F.collide())}
${steps([`During the collision: <i>F</i><sub>A</sub> = ${sub('m', '1')}${fr(`${sub('v', '1')} − ${sub('u', '1')}`, '<i>t</i>')} and <i>F</i><sub>B</sub> = ${sub('m', '2')}${fr(`${sub('v', '2')} − ${sub('u', '2')}`, '<i>t</i>')}`, `By Newton’s third law, <i>F</i><sub>A</sub> = −<i>F</i><sub>B</sub> (the minus sign: <i>F</i><sub>B</sub> is opposite to <i>F</i><sub>A</sub>), so ${sub('m', '1')}${fr(`${sub('v', '1')} − ${sub('u', '1')}`, '<i>t</i>')} = −${sub('m', '2')}${fr(`${sub('v', '2')} − ${sub('u', '2')}`, '<i>t</i>')}`, `Rearranging: <b>${sub('m', '1')}${sub('u', '1')} + ${sub('m', '2')}${sub('u', '2')} = ${sub('m', '1')}${sub('v', '1')} + ${sub('m', '2')}${sub('v', '2')}</b>. With no external force, Newton’s third law proves the principle of conservation of linear momentum.`])}

${h4('Elastic and inelastic collisions')}
${two(`${def('Elastic collision', `is one in which the ${red('total kinetic energy is conserved')}.`)}${ul(['Total momentum is conserved.', 'Total kinetic energy is conserved.'])}`,
  `${def('Inelastic collision', `is one in which the ${red('total kinetic energy is not conserved')}.`)}${ul(['Total momentum is conserved.', 'Total kinetic energy is not conserved (some is changed to heat, sound and deformation).', 'In a <b>perfectly inelastic</b> collision the bodies stick together after the collision.'])}`)}
${h4('Elastic collision in one dimension (head-on)')}
${eq(`Momentum: ${sub('m', '1')}${sub('u', '1')} + ${sub('m', '2')}${sub('u', '2')} = ${sub('m', '1')}${sub('v', '1')} + ${sub('m', '2')}${sub('v', '2')}<br>Kinetic energy: ½${sub('m', '1')}${sub('u', '1')}<sup>2</sup> + ½${sub('m', '2')}${sub('u', '2')}<sup>2</sup> = ½${sub('m', '1')}${sub('v', '1')}<sup>2</sup> + ½${sub('m', '2')}${sub('v', '2')}<sup>2</sup>`)}
${steps([`If <i>m</i><sub>2</sub> is at rest (${sub('u', '2')} = 0): from momentum, ${sub('m', '1')}(${sub('u', '1')} − ${sub('v', '1')}) = ${sub('m', '2')}${sub('v', '2')} <span class="ls-tag">(1)</span>`, `From kinetic energy, ${sub('m', '1')}(${sub('u', '1')}<sup>2</sup> − ${sub('v', '1')}<sup>2</sup>) = ${sub('m', '2')}${sub('v', '2')}<sup>2</sup> <span class="ls-tag">(2)</span>`, `(2) ÷ (1): ${sub('u', '1')} + ${sub('v', '1')} = ${sub('v', '2')} <span class="ls-tag">(3)</span>`, `Solving (3) and (1):`])}
${key(`${sub('v', '1')} = ${fr(`${sub('m', '1')} − ${sub('m', '2')}`, `${sub('m', '1')} + ${sub('m', '2')}`)}${sub('u', '1')} &nbsp;&nbsp; ${sub('v', '2')} = ${fr(`2${sub('m', '1')}`, `${sub('m', '1')} + ${sub('m', '2')}`)}${sub('u', '1')}`, 'Elastic collision, <i>m</i><sub>2</sub> initially at rest')}
${table(['Masses', 'After the collision'], [[`${sub('m', '1')} = ${sub('m', '2')}`, `${sub('v', '1')} = 0, ${sub('v', '2')} = ${sub('u', '1')} (they exchange velocities)`], [`${sub('m', '1')} &gt; ${sub('m', '2')}`, `${sub('v', '1')} &lt; ${sub('u', '1')}; ${sub('v', '2')} &gt; ${sub('u', '1')}: <i>m</i><sub>1</sub> slows down`], [`${sub('m', '1')} &lt; ${sub('m', '2')}`, `${sub('v', '1')} &lt; 0; ${sub('v', '2')} &lt; ${sub('u', '1')}: <i>m</i><sub>1</sub> recoils`], [`${sub('m', '1')} ≫ ${sub('m', '2')}`, `${sub('v', '1')} ≈ ${sub('u', '1')}; ${sub('v', '2')} ≈ 2${sub('u', '1')}`], [`${sub('m', '1')} ≪ ${sub('m', '2')}`, `${sub('v', '1')} ≈ −${sub('u', '1')}; ${sub('v', '2')} ≈ 0`]])}
${example('3.2.1', `A 3000 kg truck moving at 10 m s<sup>−1</sup> hits a 1000 kg parked car. The impact sets the car in motion at 15 m s<sup>−1</sup>. Determine the <b>velocity</b> of the truck after the collision.`,
  steps([`(Σ<i>p</i><sub>before</sub>)<sub>x</sub> = (Σ<i>p</i><sub>after</sub>)<sub>x</sub>: ${sub('m', '1')}${sub('u', '1')} + ${sub('m', '2')}${sub('u', '2')} = ${sub('m', '1')}${sub('v', '1')} + ${sub('m', '2')}${sub('v', '2')}`, `(3000)(10) + (1000)(0) = (3000)${sub('v', '1')} + (1000)(15) ⇒ 30 000 − 15 000 = 3000${sub('v', '1')}`, `<b>${sub('v', '1')} = 5.0 m s<sup>−1</sup></b> (to the right)`, `Check with the elastic-collision formula: ${sub('v', '1')} = ${fr('3000 − 1000', '3000 + 1000')}(10) = 5.0 m s<sup>−1</sup>`]))}

${h4('Perfectly inelastic collision in one dimension')}
<p>After the collision the two objects stick together. By conservation of momentum:</p>
${key(`${sub('m', '1')}${sub('u', '1')} + ${sub('m', '2')}${sub('u', '2')} = (${sub('m', '1')} + ${sub('m', '2')})<i>v</i> &nbsp;⇒&nbsp; <i>v</i> = ${fr(`${sub('m', '1')}${sub('u', '1')} + ${sub('m', '2')}${sub('u', '2')}`, `${sub('m', '1')} + ${sub('m', '2')}`)}`)}
<p>But kinetic energy is <b>not conserved</b>: ½${sub('m', '1')}${sub('u', '1')}<sup>2</sup> + ½${sub('m', '2')}${sub('u', '2')}<sup>2</sup> ≠ ½(${sub('m', '1')} + ${sub('m', '2')})<i>v</i><sup>2</sup>. If <i>m</i><sub>2</sub> is at rest:</p>
${eq(`K.E.<sub>i</sub> = ½${sub('m', '1')}${sub('u', '1')}<sup>2</sup>, &nbsp; K.E.<sub>f</sub> = ½(${sub('m', '1')} + ${sub('m', '2')})<i>v</i><sup>2</sup>, &nbsp; ${fr('K.E.<sub>f</sub>', 'K.E.<sub>i</sub>')} = ${fr(sub('m', '1'), `${sub('m', '1')} + ${sub('m', '2')}`)} &lt; 1`)}
${h4('Ballistic pendulum')}
${two(`${def('Ballistic pendulum', `is a ${red('device which measures the speed of a bullet')}.`)}${ul(['<i>M</i> = mass of the block; <i>m</i> = mass of the bullet', '<i>u</i> = velocity of the bullet before the collision', '<i>v</i> = velocity of the block and bullet just after the collision', '<i>h</i> = maximum height reached by the block containing the bullet'])}`, fig(F.ballistic()))}
${steps([`The block is at rest. By conservation of momentum (perfectly inelastic): <b><i>mu</i> = (<i>M</i> + <i>m</i>)<i>v</i></b> <span class="ls-tag">(i)</span>`, `After the collision, by conservation of energy (kinetic energy → gravitational potential energy): ½(<i>M</i> + <i>m</i>)<i>v</i><sup>2</sup> = (<i>M</i> + <i>m</i>)<i>gh</i> ⇒ <b><i>v</i> = ${sq('2<i>gh</i>')}</b> <span class="ls-tag">(ii)</span>`, `Substitute (ii) into (i) to get the speed of the bullet:`])}
${key(`<i>u</i> = ${fr('<i>m</i> + <i>M</i>', '<i>m</i>')}${sq('2<i>gh</i>')}`)}
${note('Momentum is conserved during the collision (it is too quick for the block to rise), but kinetic energy is not. Energy is conserved only afterwards, while the block swings up.')}
${example('3.2.7', `In a ballistic pendulum experiment, <i>h</i> = 5.00 cm, <i>m</i> = 5.00 g and <i>M</i> = 1.00 kg. Find (a) the initial speed of the bullet, <i>u</i>, (b) the loss in kinetic energy due to the collision.`,
  steps([`(a) <i>u</i> = ${fr('<i>m</i> + <i>M</i>', '<i>m</i>')}${sq('2<i>gh</i>')} = ${fr('(5 × 10<sup>−3</sup>) + 1', '5 × 10<sup>−3</sup>')}${sq('2(9.81)(5 × 10<sup>−2</sup>)')} = <b>199 m s<sup>−1</sup></b>`, `(b) Δ<i>K</i> = <i>K</i><sub>i</sub> − <i>K</i><sub>f</sub> = ½<i>mu</i><sup>2</sup> − ½(<i>m</i> + <i>M</i>)<i>v</i><sup>2</sup> = ½<i>mu</i><sup>2</sup> − ½(<i>m</i> + <i>M</i>)(2<i>gh</i>)`, `= ½(5 × 10<sup>−3</sup>)(199)<sup>2</sup> − ½(5 × 10<sup>−3</sup> + 1.00)(2)(9.81)(5 × 10<sup>−2</sup>) = 99.0 − 0.5 = <b>98.5 J</b>`]))}
${sim('collisions', 'Collisions: elastic, inelastic and perfectly inelastic', 'Set the two masses and their velocities, choose the type of collision, then press Play. The bars show that total momentum is always the same before and after, while kinetic energy is conserved only in an elastic collision.')}
${example('3.2.3', `A 1800 kg truck stopped at a traffic light is struck from the rear by a 900 kg car and the two become entangled. If the car was moving at 20 m s<sup>−1</sup> before the collision, what is the speed of the entangled mass after the collision?`,
  steps([`<i>m</i><sub>1</sub> = 900 kg, <i>u</i><sub>1</sub> = 20 m s<sup>−1</sup>; <i>m</i><sub>2</sub> = 1800 kg, <i>u</i><sub>2</sub> = 0`, `Σ<i>p</i><sub>i</sub> = Σ<i>p</i><sub>f</sub>: ${sub('m', '1')}${sub('u', '1')} = (${sub('m', '1')} + ${sub('m', '2')})<i>v</i>`, `(900)(20) = (1800 + 900)<i>v</i> ⇒ <b><i>v</i> = 6.67 m s<sup>−1</sup></b>`]))}
${exercises('Exercises: perfectly inelastic collisions', [
  { q: `<b>Example 3.2.4</b> A truck of mass 3000 kg travelling at 3 m s<sup>−1</sup> runs into a stationary truck of mass 5000 kg. The trucks couple together. Find their common speed.`, a: `1.13 m s<sup>−1</sup>` },
  { q: `<b>Example 3.2.5</b> A 16 g mass moves in the +x-direction at 30 cm s<sup>−1</sup> while a 4.0 g mass moves in the −x-direction at 50 cm s<sup>−1</sup>. They collide head on and stick together. Find their velocity after the collision.`, a: `0.14 m s<sup>−1</sup> in the +x-direction` },
  { q: `<b>Example 3.2.6</b> A railway engine of mass 20 000 kg moving at 3 m s<sup>−1</sup> collides with and couples to a stationary train of wagons of total mass 10 000 kg. Calculate (a) the speed just after impact, (b) the loss of kinetic energy.`, a: `(a) 2 m s<sup>−1</sup> &nbsp; (b) 30 000 J` }])}

${h4('Collisions in two dimensions')}
<p>Momentum is a vector, so in two dimensions it is conserved <b>separately in the x-direction and in the y-direction</b>:</p>
${key(`Σ<i>p</i><sub>x</sub> before = Σ<i>p</i><sub>x</sub> after &nbsp;&nbsp; Σ<i>p</i><sub>y</sub> before = Σ<i>p</i><sub>y</sub> after`)}
${card('Additional example (syllabus 3.3(c)) · collision in two dimensions', `A ball A of mass 2.0 kg moving east at 5.0 m s<sup>−1</sup> collides with a stationary ball B of mass 3.0 kg. After the collision A moves at 3.0 m s<sup>−1</sup> at 30° north of east. Find (a) the velocity of B after the collision, (b) whether the collision is elastic.`,
  steps([`Take east as +x and north as +y. Before: <i>p</i><sub>x</sub> = (2.0)(5.0) = 10 kg m s<sup>−1</sup>, <i>p</i><sub>y</sub> = 0`, `x: 10 = (2.0)(3.0 cos 30°) + 3.0<i>v</i><sub>Bx</sub> ⇒ <i>v</i><sub>Bx</sub> = ${fr('10 − 5.20', '3.0')} = 1.60 m s<sup>−1</sup>`, `y: 0 = (2.0)(3.0 sin 30°) + 3.0<i>v</i><sub>By</sub> ⇒ <i>v</i><sub>By</sub> = −1.00 m s<sup>−1</sup>`, `(a) <i>v</i><sub>B</sub> = ${sq('1.60<sup>2</sup> + 1.00<sup>2</sup>')} = <b>1.89 m s<sup>−1</sup></b> at θ = tan<sup>−1</sup> ${fr('1.00', '1.60')} = <b>32° south of east</b>`, `(b) K.E. before = ½(2.0)(5.0)<sup>2</sup> = 25 J; K.E. after = ½(2.0)(3.0)<sup>2</sup> + ½(3.0)(1.89)<sup>2</sup> = 9.0 + 5.3 = 14.3 J. Kinetic energy is not conserved, so the collision is <b>inelastic</b>.`]), fig(svg(320, 170,
    L(20, 90, 110, 90, 'k', 'e', { w: 2.4 }) + T(65, 82, '5.0 m/s', { fs: 12 }) + dot(130, 90, 12, '#BDE3E8') + T(130, 94, 'A', { fs: 11, b: 1 }) + dot(160, 90, 14, '#9CCF4A') + T(160, 94, 'B', { fs: 11, b: 1 }) +
    L(170, 80, 270, 22, 'v', 'e', { w: 2.4 }) + T(278, 22, 'A: 3.0 m/s', { fs: 12, a: 'start', c: C.v }) + T(212, 70, '30°', { fs: 11 }) +
    L(180, 100, 280, 160, 'r', 'e', { w: 2.4 }) + T(286, 162, 'B: ?', { fs: 12, a: 'start', c: C.r }) + L(150, 90, 300, 90, 's', '', { d: '3 3', w: 1 }))))}
${h4('Impulse of a force')}
${def('Impulse', `is the product of the ${red('applied force')}, <i>F</i>, and the ${red('time interval')} Δ<i>t</i> for which it acts (for a constant force): <b><i>I</i> = <i>F</i>Δ<i>t</i></b>.`)}
${two(`${eq(`From Newton’s second law, <i>F</i> = ${fr('Δ(<i>mv</i>)', 'Δ<i>t</i>')} = ${fr('Δ<i>p</i>', 'Δ<i>t</i>')}`)}${key(`<i>F</i>Δ<i>t</i> = Δ<i>p</i> = <i>m</i>(<i>v</i> − <i>u</i>)`, 'Impulse = change of momentum')}${ul(['<i>F</i> is the impulsive force.', 'A vector, in the direction of the force.', 'Unit: kg m s<sup>−1</sup> or N s.'])}`, `${fig(F.impulseG())}<p><b>Impulse = area under the graph of <i>F</i> against <i>t</i></b> = ∫<sub><i>t</i>₀</sub><sup><i>t</i>₁</sup> <i>F</i> d<i>t</i></p>`)}
${h4('Applications')}
${eq(`From <i>F</i>Δ<i>t</i> = <i>m</i>(<i>v</i> − <i>u</i>): &nbsp; <i>F</i> = ${fr('<i>m</i>(<i>v</i> − <i>u</i>)', 'Δ<i>t</i>')}`)}
${ul([`To <b>increase</b> the impulsive force, the change of momentum must happen in a <b>very short time</b>: a karate chop, smashing a shuttlecock, kicking a ball, squash and golf.`, `In a car accident, to <b>reduce</b> the impulsive force, the collision time is increased by using softer bodies (crumple zones, airbags).`])}
${example('3.2.15', `A car of mass 800 kg is travelling at 25 m s<sup>−1</sup>. Find the <b>constant force</b> needed to stop it in 4 s.`,
  steps([`<i>u</i> = 25 m s<sup>−1</sup>, <i>v</i> = 0, <i>t</i> = 4 s, <i>m</i> = 800 kg`, `<i>F</i> = ${fr('<i>m</i>(<i>v</i> − <i>u</i>)', '<i>t</i>')} = ${fr('800(0 − 25)', '4')} = −5000 N, so a force of <b>5000 N</b> opposite to the motion`]))}
${example('3.2.16', `A ball of mass 0.2 kg is dropped from a height of 20 m. It rebounds to a height of 10 m. Find the <b>impulse</b> exerted by the ground on the ball.`,
  steps([`Speed just before impact: <i>u</i> = ${sq('2<i>gh</i>')} = ${sq('2(9.81)(20)')} = 19.81 m s<sup>−1</sup> (downward)`, `Speed just after: <i>v</i> = ${sq('2(9.81)(10)')} = 14.01 m s<sup>−1</sup> (upward)`, `Taking upward as positive: impulse = <i>m</i>(<i>v</i> − <i>u</i>) = 0.2[14.01 − (−19.81)] = <b>6.76 N s</b> upward`]))}
${example('3.2.17', `The force acting on an object is shown below. Find the impulse at (a) <i>t</i> = 6 s, (b) <i>t</i> = 8 s.`,
  steps([`(a) Impulse = area = ½(4 + 6)(20) = <b>100 N s</b>`, `(b) No force acts after 6 s, so the total area is still 100 + 0 = <b>100 N s</b>`]), fig(F.ex3217()))}
`)}

${sec('3-3', '3.3 Reaction and frictional force', `
${h4('Normal (reaction) force, <i>N</i> or <i>R</i>')}
${ul([`Newton’s third law example: the weight of an object presses on a table (action); the table pushes up on the object with a normal force (reaction).`, `"Normal" means perpendicular.`])}
${def('Normal force', `is ${red('the contact force exerted by the surface of one object on the surface of another, which prevents the objects from passing through each other')}. It acts <b>perpendicular to the surface</b>.`)}
${two(fig(F.fbd([[90, 70, 'N', 'r', 14, 0], [270, 70, 'W', 'v', 14, 0]], { maxw: 220 })), fig(F.fbd([[110, 70, 'N', 'r', 14, 0], [270, 70, 'W', 'v', 14, 0], [290, 66, 'W cos θ', 'g', 30, 6]], { tilt: 20, maxw: 220 })))}
${def('Free-body diagram', `is a diagram of a body showing ${red('all the forces acting on it')}.`)}
${example('3.3.1', `A man of mass 50 kg stands on the floor of a lift which is descending with a downward acceleration of 0.8 m s<sup>−2</sup>. Find the <b>reaction</b> of the floor of the lift on the man.`,
  steps([`Free-body diagram: <i>R</i> upward, <i>W</i> = <i>mg</i> downward, <i>a</i> downward`, `Σ<i>F</i><sub>y</sub> = <i>ma</i> (downward positive): <i>ma</i> = <i>mg</i> − <i>R</i>`, `<i>R</i> = <i>mg</i> − <i>ma</i> = 50(9.81 − 0.8) = <b>450.5 N</b>`]), fig(F.fbd([[90, 70, 'R', 'r', 14, 0], [270, 70, 'W = mg', 'v', 30, 0]], { surface: false, m: '50 kg', a: [250, 70, 250, 130], maxw: 220 })))}
${example('3.3.2', `A cord passing over an easily turned pulley (massless and frictionless) has a 7.0 kg mass hanging from one end and a 9.0 kg mass from the other. Find the <b>acceleration</b> of the masses and the <b>tension</b> in the cord.`,
  steps([`7.0 kg (accelerates up): <i>ma</i> = <i>T</i> − <i>mg</i> ⇒ <i>T</i> = 7.0(<i>a</i> + 9.81) <span class="ls-tag">(1)</span>`, `9.0 kg (accelerates down): <i>ma</i> = <i>mg</i> − <i>T</i> ⇒ <i>T</i> = 9.0(9.81 − <i>a</i>) <span class="ls-tag">(2)</span>`, `(1) = (2): <b><i>a</i> = 1.23 m s<sup>−2</sup></b>, <b><i>T</i> = 77.3 N</b>`]), fig(F.pulley('7 kg', '9 kg')))}
${exercises('Exercises: normal force and connected bodies', [
  { q: `A force of 15.0 N is applied at 30° below the horizontal (pushing down on the block) on a 0.750 kg block resting on a frictionless surface. Calculate (a) the magnitude of the resulting acceleration, (b) the magnitude of the normal force.`, a: `(a) 17.3 m s<sup>−2</sup> &nbsp; (b) 14.85 N` },
  { q: `A 10.0 kg mass is supported on a friction-free plane inclined at 37° and connected to a second mass M by an ideal string and pulley. M accelerates upward at 3.00 m s<sup>−2</sup>. Calculate (a) the reaction force of the plane on the 10.0 kg mass, (b) the tension in the string, (c) the mass M.`, f: fig(F.incline(37)), a: `(a) <i>R</i> = 78.3 N &nbsp; (b) <i>T</i> = 29.0 N &nbsp; (c) <i>M</i> = 2.27 kg<br><span class="ls-small">The slide answers 78.4 N, 28.8 N and 2.25 kg come from using g = 9.8 m s<sup>−2</sup> with sin 37° ≈ 0.6 and cos 37° ≈ 0.8.</span>` }])}

${h4('Frictional force, <i>f</i>')}
${def('Frictional force', `is the contact force exerted ${red('between the surfaces')} of two objects, ${red('directed parallel to the surface')}, that acts to ${red('prevent (oppose) the objects')} from slipping on each other. It results from forces between atoms and molecules when surfaces are in contact.`)}
${ul([`The frictional force is <b>proportional to the normal force</b>: <i>f</i> ∝ <i>N</i>.`, `Friction occurs when an object moves on a rough surface or through a fluid.`, `Three types: (a) static friction, (b) kinetic friction, (c) rolling friction.`])}
${h4('Static friction')}
${ul([`If the applied force <i>F</i> is increased gradually, at a certain value the book starts to move.`, `The book just begins to move when <i>F</i> is slightly greater than the maximum static frictional force, <i>f</i><sub>s</sub><sup>max</sup>.`, `The maximum frictional force produced by the rough surface is called the <b>limiting frictional force</b>.`])}
${table(['Applied force', 'Static friction', 'Result'], [['<i>F</i> = 3 N', '<i>f</i><sub>s</sub> = 3 N', 'no movement'], ['<i>F</i> = 5 N', '<i>f</i><sub>s</sub> = 5 N', 'no movement'], ['<i>F</i> = 7 N', '<i>f</i><sub>s</sub><sup>max</sup> = 7 N', 'just about to move']])}
${key(`<i>f</i><sub>s</sub> ≤ <i>f</i><sub>s</sub><sup>max</sup> &nbsp;&nbsp; <i>f</i><sub>s</sub><sup>max</sup> = µ<sub>s</sub><i>N</i>`, 'µ<sub>s</sub> = coefficient of static friction, <i>N</i> = normal force')}
${fig(F.fvsF(), 'Static friction grows with the applied force up to f<sub>s</sub><sup>max</sup>; once the body slides, the kinetic friction is constant and smaller.')}
${sim('friction', 'Friction: push the block until it slides', 'Increase the applied force slowly. Static friction matches your push exactly until it reaches µ<sub>s</sub>N; then the block breaks away and the friction drops to µ<sub>k</sub>N. The graph of f against F builds up as you go.')}
${def('Coefficient of static friction, µ<sub>s</sub>', `is a ${red('dimensionless constant, characteristic of the two surfaces')}, which gives the relative strength of the force: µ<sub>s</sub> = ${fr('<i>f</i><sub>s</sub><sup>max</sup>', '<i>N</i>')}, where <i>f</i><sub>s</sub><sup>max</sup> is the limiting frictional force and <i>N</i> the normal force.`)}
${ul([`µ<sub>s</sub> depends on the <b>type</b> of material (wood on wood, rubber on concrete), the <b>condition</b> of the surfaces (polished, rough, lubricated) and other variables such as temperature.`, `For smooth surfaces, µ<sub>s</sub> = 0.`, `The maximum frictional force is <b>independent of the area of contact</b> if the normal reaction is the same.`])}
<p class="ls-small"><b>Table 3.1</b> Coefficients of static and kinetic friction</p>
${table(['Surfaces', 'Static, µ<sub>s</sub>', 'Kinetic, µ<sub>k</sub>'], [['Rubber on dry concrete', '1.0', '0.7'], ['Shoes on wood', '0.9', '0.7'], ['Rubber on wet concrete', '0.7', '0.5'], ['Steel on steel (dry)', '0.6', '0.3'], ['Metal on wood', '0.5', '0.3'], ['Wood on wood', '0.4', '0.2'], ['Shoes on ice', '0.1', '0.05'], ['Steel on steel (oiled)', '0.05', '0.03']])}
${example('3.3.3', `A body of mass 1.2 kg lies on a horizontal surface. A horizontal force of 2.8 N can just shift the body. Find the <b>coefficient of static friction</b>.`,
  steps([`Σ<i>F</i><sub>y</sub> = 0: <i>R</i> = <i>mg</i>; &nbsp; Σ<i>F</i><sub>x</sub> = 0: <i>f</i><sub>s</sub> = 2.8 N`, `<i>f</i><sub>s</sub> = µ<sub>s</sub><i>R</i> = µ<sub>s</sub><i>mg</i> ⇒ µ<sub>s</sub> = ${fr('2.8', '(1.2)(9.81)')} = <b>0.24</b>`]), fig(F.fbd([[90, 60, 'R', 'r', 14, 0], [270, 60, 'mg', 'v', 18, 0], [0, 80, '2.8 N', 'v', 4, 10], [180, 70, 'fₛ', 'r', 0, 10]], { maxw: 240 })))}
${example('3.3.4', `A body of mass 20 kg lies on a horizontal floor. A string attached to it at 30° to the horizontal has a tension of 40 N when the body begins to move. Find the coefficient of static friction.`,
  steps([`Σ<i>F</i><sub>y</sub> = 0: <i>R</i> + 40 sin 30° = <i>mg</i> ⇒ <i>R</i> = <i>mg</i> − 40 sin 30° = 176.2 N`, `Σ<i>F</i><sub>x</sub> = 0: 40 cos 30° = <i>f</i><sub>s</sub> = µ<sub>s</sub><i>R</i>`, `µ<sub>s</sub> = ${fr('40 cos 30°', '176.2')} = <b>0.197</b>`]), fig(F.fbd([[90, 60, 'R', 'r', 14, 0], [270, 60, 'mg', 'v', 18, 0], [30, 80, 'T = 40 N', 'v', 30, 6], [180, 70, 'fₛ', 'r', 0, 10]], { maxw: 240 })))}
${h4('Kinetic friction')}
${ul([`Kinetic friction always <b>opposes the motion</b> of a moving object.`, `It is less than the limiting static friction: the force needed to start motion is more than the force needed to keep it going, so <i>f</i><sub>k</sub> &lt; <i>f</i><sub>s</sub><sup>max</sup> and µ<sub>k</sub> &lt; µ<sub>s</sub>.`, `µ<sub>k</sub> is independent of the velocity.`])}
${key(`µ<sub>k</sub> = ${fr('<i>f</i><sub>k</sub>', '<i>N</i>')}, &nbsp; <i>f</i><sub>k</sub> = µ<sub>k</sub><i>N</i>`)}
${example('3.3.5', `A body is slid along a horizontal floor. It decelerates from 10 m s<sup>−1</sup> to 5 m s<sup>−1</sup> in 2 s. Find the <b>coefficient of friction</b> between the body and the floor.`,
  steps([`Σ<i>F</i><sub>y</sub> = 0: <i>R</i> = <i>mg</i>; Σ<i>F</i><sub>x</sub> = <i>ma</i>: <i>ma</i> = <i>f</i><sub>k</sub> = µ<sub>k</sub><i>mg</i>`, `<i>a</i> = ${fr('<i>v</i> − <i>u</i>', '<i>t</i>')} = ${fr('5 − 10', '2')} = −2.5 m s<sup>−2</sup> (a deceleration of 2.5 m s<sup>−2</sup>)`, `µ<sub>k</sub> = ${fr('<i>a</i>', '<i>g</i>')} = ${fr('2.5', '9.81')} = <b>0.255</b>`]))}
${example('3.3.6', `A 70 kg box is slid along the floor by a 400 N force. The coefficient of kinetic friction is 0.50. Find the <b>acceleration</b> of the box.`,
  steps([`Σ<i>F</i><sub>y</sub> = 0: <i>R</i> = <i>mg</i>; Σ<i>F</i><sub>x</sub> = <i>ma</i>: <i>ma</i> = 400 − µ<sub>k</sub><i>mg</i>`, `70<i>a</i> = 400 − (0.50)(70)(9.81) ⇒ <b><i>a</i> = 0.81 m s<sup>−2</sup></b>`]))}
${example('3.3.7', `The 70 kg box is now pulled by a 400 N force at 30° to the horizontal. µ<sub>k</sub> = 0.50. Find the acceleration.`,
  steps([`Σ<i>F</i><sub>y</sub> = 0: <i>R</i> + 400 sin 30° = <i>mg</i> ⇒ <i>R</i> = 486.7 N`, `Σ<i>F</i><sub>x</sub> = <i>ma</i>: <i>ma</i> = 400 cos 30° − µ<sub>k</sub><i>R</i>`, `70<i>a</i> = 346.4 − (0.50)(486.7) ⇒ <b><i>a</i> = 1.47 m s<sup>−2</sup></b>`]))}
${example('3.3.8', `A 20 kg box sits on a 30° incline. µ<sub>k</sub> between box and incline is 0.30. Find the acceleration of the box down the incline.`,
  steps([`Perpendicular to the plane: <i>R</i> = <i>mg</i> cos 30° = 170 N`, `Along the plane: <i>ma</i> = <i>mg</i> sin 30° − <i>f</i><sub>k</sub> = <i>mg</i> sin 30° − µ<sub>k</sub><i>R</i>`, `20<i>a</i> = (20)(9.81)(0.5) − (0.30)(170) ⇒ <b><i>a</i> = 2.36 m s<sup>−2</sup></b>`]), fig(F.fbd([[120, 70, 'R', 'r', 0, 16], [30, 60, 'fₖ', 'r', 14, 4], [270, 80, 'mg', 'k', 16, 0], [210, 62, 'mg sin 30°', 'v', -50, 10], [300, 60, 'mg cos 30°', 'v', 40, 0]], { tilt: 30, maxw: 260 })))}
${exercises('Exercises: friction on slopes and floors', [
  { q: `A 10 kg block is placed on a plane inclined at 37°. µ = 0.4. When released, find (a) the normal force on the block, (b) its acceleration down the plane.`, a: `(a) 78.3 N &nbsp; (b) 2.77 m s<sup>−2</sup>` },
  { q: `A 2 kg block is on a plane inclined at 30°; µ = 0.4. Find its acceleration (a) when pushed up the plane by a constant force of 20 N, (b) when pulled down the plane by the same force.`, a: `(a) 1.7 m s<sup>−2</sup> &nbsp; (b) 11.51 m s<sup>−2</sup>` },
  { q: `A horizontal force of 500 N pushes a 25 kg box up a 40° incline with an acceleration of 0.75 m s<sup>−2</sup>. Find the coefficient of kinetic friction. (<i>g</i> = 9.81 m s<sup>−2</sup>)`, f: fig(F.incline(40, '')), a: `µ<sub>k</sub> = 0.41` },
  { q: `A body on a rough 30° slope slides down with an acceleration of 4 m s<sup>−2</sup>. Find the coefficient of friction.`, a: `0.106` },
  { q: `A horizontal force of 140 N pulls a 60 kg box across a horizontal floor at constant speed. What is the coefficient of friction?`, a: `0.24` }])}
${example('3.3.9', `Blocks A (2 kg) and B (4 kg) are connected by a rope on a rough surface. The frictional forces on A and B are 2 N and 4 N. Find the acceleration and the tension in the rope if B is pulled by a force of 12 N.`,
  steps([`For A: <i>T</i> − <i>f</i><sub>s</sub> = <i>ma</i> ⇒ <i>T</i> − 2 = 2<i>a</i> <span class="ls-tag">(1)</span>`, `For B: 12 − <i>T</i> − <i>f</i><sub>s</sub> = <i>ma</i> ⇒ 8 − <i>T</i> = 4<i>a</i> <span class="ls-tag">(2)</span>`, `(1) + (2): 6 = 6<i>a</i> ⇒ <b><i>a</i> = 1 m s<sup>−2</sup></b>; from (1): <b><i>T</i> = 4 N</b>`]), fig(F.blocks()))}
${example('3.3.10', `Object A (4 kg) on a rough table is connected to object B (2 kg) by a string over a pulley. The frictional force on A is 10 N. Find the acceleration, the tension in the string and µ<sub>k</sub>.`,
  steps([`For B: <i>m</i><sub>B</sub><i>g</i> − <i>T</i> = <i>m</i><sub>B</sub><i>a</i>; for A: <i>T</i> − 10 = <i>m</i><sub>A</sub><i>a</i>`, `Adding: 2(9.81) − 10 = 6<i>a</i> ⇒ <b><i>a</i> = 1.60 m s<sup>−2</sup></b>`, `<i>T</i> = 2(9.81 − 1.60) = <b>16.4 N</b>`, `µ<sub>k</sub> = ${fr('<i>f</i><sub>k</sub>', '<i>m</i><sub>A</sub><i>g</i>')} = ${fr('10', '4(9.81)')} = <b>0.25</b>`]), fig(F.tablePulley('4 kg', '2 kg')))}
${exercises('Exercises: connected bodies with friction', [
  { q: `The coefficient of kinetic friction between block A (25 kg) and the table is 0.20. Block B (15 kg) hangs from a string over a pulley. How far will B drop in the first 3.0 s after the system is released?`, f: fig(F.tablePulley('25 kg', '15 kg')), a: `11 m` },
  { q: `Three objects are connected by strings over massless, friction-free pulleys: 6.0 kg hanging on the left, 10 kg on the table, 9.0 kg hanging on the right. µ<sub>k</sub> between the middle object and the table is 0.2. (a) What is the acceleration? (b) Calculate the tension in each string.`, f: fig(F.tri3()), a: `(a) 0.39 m s<sup>−2</sup> &nbsp; (b) 61 N and 85 N` },
  { q: `Two boxes of identical mass 40 kg are tied together: A on a horizontal surface, B on a 30° slope. Both experience sliding friction with µ<sub>k</sub> = 0.15. Find the acceleration and the tension in the tie cord.`, f: fig(F.twoBoxes()), a: `1.1 m s<sup>−2</sup>; 0.10 kN` }])}
`)}`;

  // ---------- simulation: collisions ----------
  window.PhysiQSims.add('collisions', function (root) {
    const { COL, fmt, clamp, el, slider, button, canvas, text, loop, readouts } = window.PhysiQSims.U;
    const S = { m1: 3, m2: 1, u1: 10, u2: 0, e: 1, t: -1.6, play: false };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const types = [['Elastic', 1], ['Inelastic', 0.5], ['Perfectly inelastic (stick together)', 0]];
    const tb = types.map(([n, e]) => button(pre, n, 'sm-chip', () => { S.e = e; markT(); reset(true); }));
    const markT = () => tb.forEach((b, i) => b.classList.toggle('on', types[i][1] === S.e));
    const pre2 = el('div', 'sm-row sm-pre'); root.appendChild(pre2);
    [['Ex 3.2.1 truck hits car', 3000, 1000, 10, 0, 1], ['Ex 3.2.3 car hits truck', 900, 1800, 20, 0, 0], ['Equal masses', 1, 1, 8, 0, 1], ['Light hits heavy', 1, 10, 8, 0, 1]].forEach(([n, m1, m2, u1, u2, e]) => button(pre2, n, 'sm-chip', () => {
      const k = m1 >= 100 ? 1000 : 1; Object.assign(S, { m1: m1 / k, m2: m2 / k, u1, u2, e, unit: k === 1000 ? 't' : 'kg' }); sm1.set(S.m1); sm2.set(S.m2); su1.set(u1); su2.set(u2); markT(); reset(true);
    }));
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    const sm1 = slider(ctl, '<i>m</i>₁', 0.5, 10, 0.5, S.m1, 'units', v => { S.m1 = v; reset(); });
    const sm2 = slider(ctl, '<i>m</i>₂', 0.5, 10, 0.5, S.m2, 'units', v => { S.m2 = v; reset(); });
    const su1 = slider(ctl, '<i>u</i>₁', -10, 20, 1, S.u1, 'm/s', v => { S.u1 = v; reset(); });
    const su2 = slider(ctl, '<i>u</i>₂', -10, 20, 1, S.u2, 'm/s', v => { S.u2 = v; reset(); });
    const cv = canvas(root);
    const bars = canvas(root);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const playB = button(bar, '▶ Play', 'sm-main', () => { if (S.t >= 2) S.t = -1.6; S.play = !S.play; upd(); });
    button(bar, '↺ Reset', '', () => reset(true));
    const ro = readouts(root);
    const after = () => { const { m1, m2, u1, u2, e } = S, M = m1 + m2, v1 = (m1 * u1 + m2 * u2 - m2 * e * (u1 - u2)) / M, v2 = (m1 * u1 + m2 * u2 + m1 * e * (u1 - u2)) / M; return { v1, v2 }; };
    function upd() { playB.textContent = S.play ? '❚❚ Pause' : (S.t >= 2 ? '▶ Replay' : '▶ Play'); }
    function reset(go) { S.t = -1.6; S.play = !!go && S.u1 > S.u2; upd(); draw(); }
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.3, 150, 200), { v1, v2 } = after(), r1 = 12 + 8 * Math.cbrt(S.m1), r2 = 12 + 8 * Math.cbrt(S.m2);
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(10, h - 30); ctx.lineTo(w - 10, h - 30); ctx.stroke();
      const vmax = Math.max(1, Math.abs(S.u1), Math.abs(S.u2), Math.abs(v1), Math.abs(v2)), sc = (w * 0.22) / vmax / 1.0;
      const t = S.t, x1 = w / 2 - r1 + (t < 0 ? S.u1 * t : v1 * t) * sc, x2 = w / 2 + r2 + (t < 0 ? S.u2 * t : v2 * t) * sc;
      const ball = (x, r, c, lab, v) => { ctx.beginPath(); ctx.arc(x, h - 30 - r, r, 0, 7); ctx.fillStyle = c; ctx.fill(); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.4; ctx.stroke(); text(ctx, lab, x, h - 30 - r + 4, { a: 'center', b: 1, fs: 12 });
        if (Math.abs(v) > 0.05) { const L = clamp(v * 6, -90, 90), y = h - 36 - 2 * r - 10; ctx.strokeStyle = COL.r; ctx.fillStyle = COL.r; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + L, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + L + Math.sign(L) * 7, y); ctx.lineTo(x + L, y - 5); ctx.lineTo(x + L, y + 5); ctx.fill(); text(ctx, fmt(v, 1) + ' m/s', x, y - 8, { a: 'center', fs: 11, c: COL.r, b: 1 }); } };
      ball(x1, r1, '#BDE3E8', 'm₁', t < 0 ? S.u1 : v1); ball(x2, r2, '#9CCF4A', 'm₂', t < 0 ? S.u2 : v2);
      text(ctx, t < 0 ? 'before the collision' : 'after the collision', 14, 18, { fs: 12, c: COL.sub, b: 1 });
      // momentum and KE bars
      const b = bars.ctx, { w: W } = bars.size(0, 150, 150); b.clearRect(0, 0, W, 150);
      const p0 = S.m1 * S.u1 + S.m2 * S.u2, p1 = S.m1 * v1 + S.m2 * v2, K0 = 0.5 * S.m1 * S.u1 ** 2 + 0.5 * S.m2 * S.u2 ** 2, K1 = 0.5 * S.m1 * v1 ** 2 + 0.5 * S.m2 * v2 ** 2;
      const group = (x0, title, a0, a1, col, unit) => {
        const m = Math.max(Math.abs(a0), Math.abs(a1), 1e-6), bw = (W / 2 - 60) / 2;
        text(b, title, x0, 16, { b: 1, fs: 12 });
        [[a0, 'before'], [a1, 'after']].forEach(([v, lab], i) => { const x = x0 + i * (bw + 16), hh = Math.abs(v) / m * 76; b.fillStyle = i ? col : '#C9CDBD'; b.fillRect(x, 120 - hh, bw, hh); text(b, lab, x + bw / 2, 136, { a: 'center', fs: 11, c: COL.sub }); text(b, fmt(v, 1) + unit, x + bw / 2, 114 - hh, { a: 'center', fs: 11, b: 1 }); });
      };
      group(20, 'Total momentum (kg m/s)', p0, p1, COL.v, ''); group(W / 2 + 20, 'Total kinetic energy (J)', K0, K1, COL.o, '');
      const lost = K0 - K1;
      ro([['v₁ after', fmt(v1, 2) + ' m/s', 'hl'], ['v₂ after', fmt(v2, 2) + ' m/s', 'hl'], ['momentum before → after', `${fmt(p0, 1)} → ${fmt(p1, 1)}`], ['KE lost', fmt(lost, 1) + ' J  (' + fmt(K0 ? lost / K0 * 100 : 0, 0) + '%)', lost > 1e-6 ? 'ao' : '']]);
    }
    loop(cv, dt => { if (S.play) { S.t = Math.min(2, S.t + dt * 0.9); if (S.t >= 2) { S.play = false; upd(); } draw(); } });
    new ResizeObserver(() => draw()).observe(root);
    markT(); reset(false);
  });

  // ---------- simulation: static to kinetic friction ----------
  window.PhysiQSims.add('friction', function (root) {
    const { COL, fmt, clamp, el, slider, button, canvas, text, loop, readouts, panel } = window.PhysiQSims.U;
    const S = { m: 2, us: 0.6, uk: 0.4, F: 0, x: 0, v: 0, slid: false, hist: [], auto: false };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    [['Wood on wood', 0.4, 0.2], ['Rubber on dry concrete', 1.0, 0.7], ['Steel on steel (dry)', 0.6, 0.3], ['Shoes on ice', 0.1, 0.05]].forEach(([n, us, uk]) => button(pre, n, 'sm-chip', () => { S.us = us; S.uk = uk; sus.set(us); suk.set(uk); reset(); }));
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    const sF = slider(ctl, 'applied force <i>F</i>', 0, 30, 0.1, 0, 'N', v => { S.F = v; S.auto = false; step(0); });
    const sm = slider(ctl, 'mass', 0.5, 5, 0.1, S.m, 'kg', v => { S.m = v; reset(); });
    const sus = slider(ctl, 'µ<sub>s</sub>', 0.05, 1, 0.01, S.us, '', v => { S.us = v; if (S.uk > v) { S.uk = v; suk.set(v); } reset(); });
    const suk = slider(ctl, 'µ<sub>k</sub>', 0.02, 1, 0.01, S.uk, '', v => { S.uk = Math.min(v, S.us); reset(); });
    const cv = canvas(root), gv = canvas(root);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const autoB = button(bar, '▶ Increase F slowly', 'sm-main', () => { if (S.slid) reset(); S.auto = !S.auto; autoB.textContent = S.auto ? '❚❚ Stop' : '▶ Increase F slowly'; });
    button(bar, '↺ Reset', '', () => reset());
    const ro = readouts(root);
    const N = () => S.m * 9.81, fsmax = () => S.us * N(), fk = () => S.uk * N();
    function friction() { if (!S.slid) return Math.min(S.F, fsmax()); return fk(); }
    function reset() { S.F = 0; S.x = 0; S.v = 0; S.slid = false; S.hist = []; S.auto = false; sF.set(0); autoB.textContent = '▶ Increase F slowly'; draw(); }
    function step(dt) {
      if (!S.slid && S.F > fsmax()) S.slid = true;
      if (S.slid) { const a = (S.F - fk()) / S.m; S.v = Math.max(0, S.v + a * dt); S.x += S.v * dt; if (S.v === 0 && S.F <= fk()) { /* stays stopped but kinetic friction regime ends */ } }
      const last = S.hist[S.hist.length - 1]; if (!last || Math.abs(last[0] - S.F) > 0.05 || last[1] !== friction()) S.hist.push([S.F, friction()]);
      draw();
    }
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0, 150, 150);
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const gy = 110; ctx.fillStyle = '#C9B48A'; ctx.fillRect(0, gy, w, 14); for (let i = 0; i < w; i += 10) { ctx.strokeStyle = '#A88E5F'; ctx.beginPath(); ctx.moveTo(i, gy + 14); ctx.lineTo(i + 8, gy); ctx.stroke(); }
      const bx = 120 + ((S.x * 40) % Math.max(1, w - 240)), bw = 80, bh = 50;
      ctx.fillStyle = S.slid ? '#F9D9C4' : '#BDE3E8'; ctx.fillRect(bx - bw / 2, gy - bh, bw, bh); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.4; ctx.strokeRect(bx - bw / 2, gy - bh, bw, bh);
      text(ctx, fmt(S.m, 1) + ' kg', bx, gy - bh / 2 + 4, { a: 'center', b: 1 });
      const k = 6, f = friction();
      const arr = (x1, y, L, col, lab) => { if (Math.abs(L) < 1) return; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x1 + L, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x1 + L + Math.sign(L) * 9, y); ctx.lineTo(x1 + L, y - 6); ctx.lineTo(x1 + L, y + 6); ctx.fill(); text(ctx, lab, x1 + L / 2 + Math.sign(L) * 8, y - 10, { a: L > 0 ? 'left' : 'right', fs: 12, b: 1, c: col }); };
      arr(bx + bw / 2, gy - bh / 2, clamp(S.F * k, 0, w), COL.v, 'F = ' + fmt(S.F, 1) + ' N');
      arr(bx - bw / 2, gy - 6, -clamp(f * k, 0, w), COL.r, (S.slid ? 'fₖ' : 'fₛ') + ' = ' + fmt(f, 1) + ' N');
      text(ctx, S.slid ? 'SLIDING: kinetic friction' : (S.F > 0 ? 'NOT MOVING: static friction = applied force' : 'at rest, no applied force'), 12, 20, { b: 1, fs: 12, c: S.slid ? COL.o : COL.gr });
      // f against F
      const g = gv.ctx, { w: W, h: H } = gv.size(0.45, 220, 300); g.clearRect(0, 0, W, H);
      const Fmax = Math.max(10, fsmax() * 1.6, S.F * 1.1);
      const p = panel(g, { x: 50, y: 24, w: W - 70, h: H - 60 }, 0, Fmax, 0, Math.max(5, fsmax() * 1.25), 'applied force F / N', 'f', '/ N');
      g.setLineDash([4, 4]); g.strokeStyle = COL.sub; g.lineWidth = 1; g.beginPath(); g.moveTo(p.X(0), p.Y(fsmax())); g.lineTo(p.X(Fmax), p.Y(fsmax())); g.stroke(); g.beginPath(); g.moveTo(p.X(0), p.Y(fk())); g.lineTo(p.X(Fmax), p.Y(fk())); g.stroke(); g.setLineDash([]);
      text(g, 'fₛ max = µₛN = ' + fmt(fsmax(), 1) + ' N', p.X(Fmax) - 4, p.Y(fsmax()) - 5, { a: 'right', fs: 11, c: COL.sub }); text(g, 'fₖ = µₖN = ' + fmt(fk(), 1) + ' N', p.X(Fmax) - 4, p.Y(fk()) + 14, { a: 'right', fs: 11, c: COL.sub });
      g.strokeStyle = COL.r; g.lineWidth = 2.6; g.beginPath(); S.hist.forEach(([a, b2], i) => i ? g.lineTo(p.X(a), p.Y(b2)) : g.moveTo(p.X(a), p.Y(b2))); g.stroke();
      g.beginPath(); g.arc(p.X(S.F), p.Y(f), 4.5, 0, 7); g.fillStyle = COL.r; g.fill();
      ro([['normal force N = mg', fmt(N(), 1) + ' N'], ['limiting friction µₛN', fmt(fsmax(), 1) + ' N', 'hl'], ['kinetic friction µₖN', fmt(fk(), 1) + ' N', 'hl'], ['friction now', fmt(f, 1) + ' N'], ['acceleration', S.slid ? fmt((S.F - fk()) / S.m, 2) + ' m/s²' : '0']]);
    }
    loop(cv, dt => { if (S.auto) { S.F = Math.min(30, S.F + dt * Math.max(0.6, fsmax() / 6)); sF.set(S.F); if (S.F >= 30) { S.auto = false; autoB.textContent = '▶ Increase F slowly'; } } if (S.auto || S.slid) step(dt); });
    new ResizeObserver(() => draw()).observe(root);
    reset();
  });

  window.PhysiQLessons.register('LESSON-3', { html: () => S });
})();
