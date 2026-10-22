/* Chapter 8 Statics: full notes by Cikgu Suhaili (from STPM_2027_UNIT_8_statics_TEACHERS_VERSION.pptx,
   with the practice questions from STPM_2027_chapter_8_statics_Teachers_version.pptx). */
(function () {
  'use strict';
  const { card, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4, pq, rw } = window.PhysiQLessons.H;

  const F = {};
  F.concurrent = () => svg(300, 140, dot(150, 70, 5, C.ink) + L(150, 70, 240, 30, 'v', 'e', { w: 2.4 }) + L(150, 70, 70, 40, 'g', 'e', { w: 2.4 }) + L(150, 70, 170, 135, 'r', 'e', { w: 2.4 }) +
    T(248, 30, 'F₁', { b: 1, a: 'start' }) + T(62, 38, 'F₂', { b: 1, a: 'end' }) + T(178, 132, 'F₃', { b: 1, a: 'start' }) + T(160, 66, 'X', { b: 1, a: 'start' }));
  F.polygon = () => two(svg(220, 180, dot(110, 90, 5, C.ink) + [[0, 'F₁'], [55, 'F₂'], [120, 'F₃'], [180, 'F₄'], [235, 'F₅'], [300, 'F₆']].map(([a, n], i) => { const r = a * Math.PI / 180, x = 110 + 70 * Math.cos(r), y = 90 - 70 * Math.sin(r); return L(110, 90, x, y, ['v', 'g', 'r', 'o', 'v', 'g'][i], 'e', { w: 2.2 }) + T(110 + 84 * Math.cos(r), 94 - 84 * Math.sin(r), n, { fs: 12, b: 1 }); }).join('') + T(110, 176, 'forces on a point object', { fs: 11, c: C.sub }), 220),
    svg(220, 180, (() => { let x = 40, y = 120, s = ''; [[0, 'F₁'], [55, 'F₂'], [120, 'F₃'], [180, 'F₄'], [235, 'F₅'], [300, 'F₆']].forEach(([a, n], i) => { const r = a * Math.PI / 180, x2 = x + 50 * Math.cos(r), y2 = y - 50 * Math.sin(r); s += L(x, y, x2, y2, ['v', 'g', 'r', 'o', 'v', 'g'][i], 'e', { w: 2.2 }) + T((x + x2) / 2 + 8, (y + y2) / 2 - 4, n, { fs: 11, b: 1 }); x = x2; y = y2; }); return s; })() + T(110, 176, 'head to tail: a closed polygon', { fs: 11, c: C.sub }), 220));
  F.ex811 = () => svg(220, 180, L(80, 140, 80, 40, 'g', '', { w: 0 }) + L(80, 60, 80, 160, 'g', 'e', { w: 2.4 }) + T(88, 168, 'F₂ = 10 N', { fs: 12, a: 'start', c: C.g, b: 1 }) + L(80, 60, 130, 20, 'v', 'e', { w: 2.4 }) + T(136, 20, 'F₁ = 6 N', { fs: 12, a: 'start', c: C.v, b: 1 }) +
    L(80, 60, 130, 60, 's', '', { d: '3 3', w: 1 }) + P('M104,60 A24,24 0 0 0 99,45', 'ink', { w: 1.2 }) + T(108, 54, '70°', { fs: 11, a: 'start' }));
  F.ex812 = () => svg(220, 120, L(30, 90, 190, 90, 'k', 'e', { w: 2.4 }) + T(190, 108, '8 N', { fs: 12, b: 1 }) + L(30, 90, 140, 27, 'v', 'e', { w: 2.4 }) + T(146, 26, '6 N', { fs: 12, b: 1, a: 'start' }) + P('M70,90 A40,40 0 0 0 65,70', 'ink', { w: 1.2 }) + T(76, 82, '30°', { fs: 11, a: 'start' }) + T(24, 96, 'O', { b: 1, a: 'end' }));
  F.ex813 = () => svg(220, 190, L(60, 15, 60, 180, 's', '', { d: '3 3', w: 1 }) + L(60, 20, 140, 120, 'k', '', { w: 1.6 }) + dot(140, 120, 10, '#FFF200') + T(140, 124, 'P', { fs: 11, b: 1 }) + T(60, 12, 'Q', { b: 1 }) + L(150, 120, 200, 120, 'r', 'e', { w: 2.4 }) + T(200, 112, 'F', { it: 1, b: 1, c: C.r }) + P('M60,60 A40,40 0 0 0 85,51', 'ink', { w: 1.2 }) + T(66, 74, '40°', { fs: 11, a: 'start' }));
  F.ex814 = () => svg(300, 190, L(20, 20, 280, 20, 'k', '', { w: 3 }) + L(70, 20, 150, 115, 'k', '', { w: 1.6 }) + L(230, 20, 150, 115, 'k', '', { w: 1.6 }) + L(150, 115, 150, 145, 'k', '', { w: 1.6 }) + `<rect x="128" y="145" width="44" height="34" fill="#BDE3E8" stroke="${C.ink}"/>` + T(150, 167, '80 N', { fs: 11, b: 1 }) +
    P('M100,20 A30,30 0 0 1 89,43', 'ink', { w: 1.2 }) + T(104, 40, '50°', { fs: 11, a: 'start' }) + P('M206,20 A26,26 0 0 0 214,40', 'ink', { w: 1.2 }) + T(200, 42, '60°', { fs: 11, a: 'end' }) + T(100, 76, 'T₁', { it: 1, b: 1, a: 'end' }) + T(200, 76, 'T₂', { it: 1, b: 1, a: 'start' }));
  F.ex815 = () => svg(320, 190, `<path d="M20,170 L250,170 L250,30 Z" fill="#E6EEF5" stroke="${C.ink}"/>` + `<g transform="rotate(-31.3 140 100)"><rect x="118" y="80" width="44" height="30" fill="#BDE3E8" stroke="${C.ink}"/></g>` + T(140, 102, '200 N', { fs: 11, b: 1 }) +
    L(160, 88, 244, 36, 'k', '', { w: 1.4 }) + `<circle cx="252" cy="32" r="9" fill="#fff" stroke="${C.ink}"/>` + L(261, 34, 261, 110, 'k', '', { w: 1.4 }) + `<rect x="248" y="110" width="28" height="30" fill="#F3D9A6" stroke="${C.ink}"/>` + T(262, 130, 'W', { b: 1 }) +
    P('M64,170 A44,44 0 0 0 59,148', 'ink', { w: 1.2 }) + T(72, 162, '35°', { fs: 11, a: 'start' }));
  F.rods = (fs, len) => svg(320, 150, dot(40, 80, 5, '#FFFBAE') + L(40, 80, 220, 80, 'k', '', { w: 4 }) + T(40, 102, 'A', { b: 1 }) + T(130, 100, len, { fs: 12 }) + fs);
  F.seesaw = () => svg(340, 190, L(30, 80, 310, 80, '#C9C25A', '', { w: 8 }).replace(/stroke="[^"]*"/, 'stroke="#E8E08A"') + `<path d="M150,84 L134,102 L166,102 Z" fill="#1E8C8C"/>` + T(150, 118, 'pivot', { fs: 11 }) +
    L(40, 80, 40, 170, 'r', 'e', { w: 2.4 }) + T(40, 184, 'W', { b: 1 }) + L(253, 80, 253, 125, 'r', 'e', { w: 2.4 }) + T(253, 140, '300 N', { fs: 11, b: 1 }) + L(300, 80, 300, 155, 'r', 'e', { w: 2.4 }) + T(300, 170, '550 N', { fs: 11, b: 1 }) +
    L(40, 30, 150, 30, 'k', 'b', { w: 1.2 }) + T(95, 26, '1.5 m', { fs: 11 }) + L(150, 30, 300, 30, 'k', 'b', { w: 1.2 }) + T(225, 26, '1.5 m', { fs: 11 }) + L(150, 50, 253, 50, 'k', 'b', { w: 1.2 }) + T(200, 46, '1.0 m', { fs: 11 }));
  F.plank = () => svg(340, 170, L(40, 90, 300, 90, 'k', '', { w: 6 }) + L(40, 20, 40, 90, 'v', 'b', { w: 2 }) + L(300, 20, 300, 90, 'v', 'b', { w: 2 }) + T(32, 40, 'T_A', { it: 1, b: 1, a: 'end' }) + T(308, 40, 'T_B', { it: 1, b: 1, a: 'start' }) +
    L(127, 90, 127, 150, 'r', 'e', { w: 2.4 }) + T(127, 164, '150 N', { fs: 11, b: 1 }) + L(170, 90, 170, 140, 'r', 'e', { w: 2.4 }) + T(184, 140, '300 N', { fs: 11, b: 1, a: 'start' }) + T(40, 110, 'A', { b: 1 }) + T(127, 110, 'C', { b: 1, a: 'end' }) + T(300, 110, 'B', { b: 1 }) + T(170, 80, 'D', { b: 1 }) + L(40, 128, 127, 128, 'k', 'b', { w: 1 }) + T(84, 124, '2 m', { fs: 11 }));
  F.beam = () => svg(320, 190, `<rect x="20" y="10" width="14" height="170" fill="#C9D6F2"/>` + L(34, 130, 254, 130, 'k', '', { w: 6 }) + L(34, 30, 254, 130, 'k', '', { w: 1.6 }) + T(150, 72, 'rope', { fs: 11, c: C.sub }) + P('M210,130 A44,44 0 0 1 216,110', 'ink', { w: 1.2 }) + T(200, 118, '30°', { fs: 11, a: 'end' }) +
    L(144, 130, 144, 175, 'r', 'e', { w: 2.2 }) + T(150, 174, '60 N', { fs: 11, a: 'start' }) + L(254, 130, 254, 180, 'r', 'e', { w: 2.2 }) + T(262, 178, '100 N', { fs: 11, a: 'start' }) + T(144, 148, '1 m beam', { fs: 11, a: 'start', c: C.sub }) + T(40, 150, 'hinge', { fs: 11, a: 'start' }));
  F.ladder = () => svg(260, 220, L(220, 10, 220, 200, 'k', '', { w: 3 }) + T(214, 24, 'smooth wall', { fs: 11, a: 'end' }) + L(20, 200, 230, 200, 'k', '', { w: 3 }) + T(60, 216, 'rough floor', { fs: 11 }) + L(90, 200, 220, 45, '#1E8C8C', '', { w: 6 }).replace(/stroke="[^"]*"/, 'stroke="#1E8C8C"') +
    L(220, 45, 180, 45, 'r', 'e', { w: 2.4 }) + T(176, 40, 'N₁', { b: 1, a: 'end' }) + L(90, 200, 90, 120, 'r', 'e', { w: 2.4 }) + T(84, 126, 'N₂', { b: 1, a: 'end' }) + L(90, 200, 130, 200, 'r', 'e', { w: 2.4 }) + T(128, 194, 'fₛ', { b: 1 }) +
    L(155, 122, 155, 180, 'v', 'e', { w: 2.4 }) + T(162, 178, '50 N', { fs: 11, a: 'start' }) + P('M118,200 A28,28 0 0 0 108,179', 'ink', { w: 1.2 }) + T(124, 188, '50°', { fs: 11, a: 'start' }) + T(84, 214, 'A', { b: 1 }) + T(170, 100, '10 m', { fs: 11, a: 'start' }));
  F.board = () => svg(340, 150, L(30, 50, 310, 50, 'v', '', { w: 6 }) + T(30, 70, 'A', { b: 1 }) + L(123, 50, 123, 110, 'r', 'e', { w: 2.2 }) + T(123, 124, '300 N', { fs: 11, b: 1 }) + L(170, 50, 170, 95, 'r', 'e', { w: 2.2 }) + T(186, 98, '200 N', { fs: 11, b: 1, a: 'start' }) + L(240, 50, 240, 125, 'r', 'e', { w: 2.2 }) + T(240, 140, '400 N', { fs: 11, b: 1 }) +
    T(123, 40, 'L/3', { fs: 11 }) + T(170, 40, 'L/2', { fs: 11 }) + T(240, 40, '3L/4', { fs: 11 }));
  F.beam2 = () => svg(300, 200, `<rect x="16" y="10" width="14" height="185" fill="#C9D6F2"/>` + L(30, 175, 210, 24, 'v', '', { w: 5 }) + L(30, 62, 165, 62, 'k', '', { w: 1.6 }) + L(210, 24, 210, 80, 'k', '', { w: 1.4 }) + `<rect x="184" y="80" width="54" height="34" fill="#F7C7F2" stroke="${C.ink}"/>` + T(211, 102, '2000 N', { fs: 11, b: 1 }) +
    L(30, 175, 110, 175, 's', '', { d: '3 3', w: 1 }) + P('M70,175 A40,40 0 0 0 56,145', 'ink', { w: 1.2 }) + T(76, 166, '50°', { fs: 11, a: 'start' }) + T(30, 192, 'P', { b: 1 }) + T(84, 120, '3L/4', { fs: 11, a: 'end' }) + T(196, 52, 'L/4', { fs: 11, a: 'end' }) + T(100, 56, 'tie rope', { fs: 11, c: C.sub }));
  F.knot = (lab) => svg(260, 180, L(20, 15, 240, 15, 'k', '', { w: 3 }) + L(240, 15, 240, 160, 'k', '', { w: 3 }) + L(60, 15, 150, 95, 'k', '', { w: 1.6 }) + L(150, 95, 240, 95, 'k', '', { w: 1.6 }) + L(150, 95, 150, 130, 'k', '', { w: 1.6 }) + `<rect x="130" y="130" width="40" height="36" fill="#BDE3E8" stroke="${C.ink}"/>` + T(150, 152, lab[0], { fs: 11, b: 1 }) + P('M90,15 A30,30 0 0 1 82,35', 'ink', { w: 1.2 }) + T(96, 34, lab[1], { fs: 11, a: 'start' }) + T(196, 90, lab[2], { fs: 11 }));
  F.table30 = (lab) => svg(280, 190, `<rect x="20" y="70" width="90" height="10" fill="#fff" stroke="${C.ink}"/>` + L(65, 80, 65, 180, 'k', '', { w: 6 }) + `<rect x="30" y="38" width="44" height="32" fill="#9ACD32" stroke="${C.ink}"/>` + T(52, 59, '40 N', { fs: 11, b: 1 }) + L(74, 54, 170, 54, 'k', '', { w: 1.6 }) + L(170, 54, 225, 15, 'k', '', { w: 1.6 }) + L(140, 15, 260, 15, 'k', '', { w: 2.4 }) + L(170, 54, 170, 110, 'k', '', { w: 1.6 }) + `<rect x="152" y="110" width="36" height="36" fill="#F6C344" stroke="${C.ink}"/>` + T(170, 132, lab, { fs: 11, b: 1 }) + P('M200,15 A26,26 0 0 0 205,30', 'ink', { w: 1.2 }) + T(196, 32, '30°', { fs: 11, a: 'end' }));
  F.slopeStr = () => svg(260, 150, L(20, 130, 240, 50, 'k', '', { w: 2 }) + L(20, 130, 240, 130, 's', '', { d: '3 3', w: 1 }) + `<g transform="rotate(-20 120 92)"><rect x="98" y="78" width="46" height="20" fill="#FFF200" stroke="${C.ink}"/></g>` + L(142, 84, 190, 10, 'v', '', { w: 2 }) + P('M70,130 A50,50 0 0 0 67,113', 'ink', { w: 1.2 }) + T(76, 124, '20°', { fs: 11, a: 'start' }) + T(176, 62, '30°', { fs: 11 }));
  F.topple = () => svg(260, 180, L(20, 160, 240, 160, 's', '', { d: '3 3', w: 1 }) + L(20, 160, 230, 60, 'k', '', { w: 2 }) + `<g transform="rotate(-25.5 120 113)"><rect x="100" y="40" width="40" height="80" fill="#BDE3E8" stroke="${C.ink}"/></g>` + dot(102, 82, 4, C.r) + L(102, 82, 102, 140, 'r', 'e', { w: 2 }) + T(108, 140, 'W', { it: 1, a: 'start', c: C.r, b: 1 }) + P('M64,160 A44,44 0 0 0 60,140', 'ink', { w: 1.2 }) + T(70, 154, 'θ', { it: 1, a: 'start' }) + T(96, 78, 'G', { fs: 11, b: 1, a: 'end' }));

  const S = `
${sec('8-1', '8.1 Equilibrium of a particle', `
${ul([`<b>Statics</b> is the study of forces in equilibrium. In equilibrium all the forces on a body are balanced, so there is no net change in its motion.`, `An object is in <b>equilibrium</b> when there is no net force on it.`])}
${table(['Type of equilibrium', 'Meaning'], [['static equilibrium', 'at rest, <i>v</i> = 0'], ['dynamic equilibrium', 'moving with constant velocity, <i>a</i> = 0'], ['translational equilibrium', 'no linear acceleration'], ['rotational equilibrium', 'no angular acceleration']])}
${two(`${def('Particle', 'is an object which has mass and is small enough to be regarded as a point.')}${def('Coplanar forces', 'are forces that lie in (act in) the same plane.')}${def('Concurrent forces', 'are forces whose lines of action intersect at a single point.')}`, fig(F.concurrent()))}
${def('Condition for equilibrium of a particle', `The ${red('resultant (net) of the concurrent forces acting on the particle is zero')}: Σ<b>F</b> = 0, i.e. Σ<i>F</i><sub>x</sub> = 0 and Σ<i>F</i><sub>y</sub> = 0.`)}
${h4('Two methods for a particle in equilibrium')}
${ul(['(i) <b>closed polygon of forces</b> (a scale drawing); (ii) <b>resolving forces into components</b>, using a free-body diagram (a diagram of a body showing all the forces acting on it).'])}
${def('Polygon of forces', `A point object acted on by several forces is in equilibrium only if the force vectors, drawn head to tail, ${red('form a closed polygon')}.`)}
${F.polygon()}
${steps([`Draw arrows to show the magnitudes and directions of all the external forces.`, `Choose a scale, e.g. 1 cm : 2 N.`, `Add all the forces head to tail. The vector from the start to the end is the resultant (net) force; if the head of the last vector meets the tail of the first, the polygon is closed and the net force is zero.`])}
${note('<b>Triangle of forces</b> (STPM 8.1(e)): when a particle is in equilibrium under exactly three forces, the three force vectors drawn head to tail form a closed triangle.')}
${sim('knot', 'Three forces in equilibrium: the triangle of forces', 'A weight hangs from a knot held by two ropes. Change the angles and the weight: the tensions update, and the three forces drawn head to tail always close into a triangle.')}
${example('8.1.1', `A system of concurrent forces acts on a particle: <i>F</i><sub>1</sub> = 6 N at 70° above the horizontal and <i>F</i><sub>2</sub> = 10 N vertically downward. Find the force <i>F</i><sub>3</sub> that keeps the particle in equilibrium.`,
  steps([`<b>Closed polygon</b> (1 cm : 2 N): the closing side measures 2.4 cm, so <i>F</i><sub>3</sub> ≈ 4.8 N at about 117°.`, `<b>Components</b>: Σ<i>F</i><sub>y</sub> = 6 sin 70° − 10 = −4.4 N; Σ<i>F</i><sub>x</sub> = 6 cos 70° = 2.1 N`, `Resultant of <i>F</i><sub>1</sub> and <i>F</i><sub>2</sub>: <i>F</i> = ${sq('2.1<sup>2</sup> + 4.4<sup>2</sup>')} = 4.9 N at θ = tan<sup>−1</sup>(−4.4/2.1) = −64.5°`, `<i>F</i><sub>3</sub> must cancel it: <b><i>F</i><sub>3</sub> = 4.9 N at 115.5°</b> (from the positive x-axis)`]), fig(F.ex811()))}
${example('8.1.2', `A point object O is acted on by a 6 N force and an 8 N force at 30° to one another. What single third force will balance them?`,
  steps([`Take the 8 N force along +x: Σ<i>F</i><sub>x</sub> = 8 + 6 cos 30° = 13.20 N; Σ<i>F</i><sub>y</sub> = 6 sin 30° = 3.00 N`, `Resultant = ${sq('13.20<sup>2</sup> + 3.00<sup>2</sup>')} = 13.5 N at 12.8°`, `The balancing force is equal and opposite: <b>13.5 N at 192.8°</b>`]), fig(F.ex812()))}
${example('8.1.3', `A 5 kg body P hangs from a light string fixed at Q. A horizontal force is applied to P, and in equilibrium PQ makes 40° with the vertical. Find the horizontal force and the tension in the string.`,
  steps([`Resolve vertically: <i>T</i> cos 40° − <i>mg</i> = 0 ⇒ <i>T</i> = ${fr('(5)(9.81)', 'cos 40°')} = <b>64 N</b>`, `Resolve horizontally: <i>F</i> − <i>T</i> sin 40° = 0 ⇒ <i>F</i> = 64 sin 40° = <b>41 N</b>`]), fig(F.ex813()))}
${example('8.1.4', `The object shown weighs 80 N and is in equilibrium. Find <i>T</i><sub>1</sub> and <i>T</i><sub>2</sub>.`,
  steps([`Σ<i>F</i><sub>x</sub> = 0: <i>T</i><sub>2</sub> cos 60° − <i>T</i><sub>1</sub> cos 50° = 0 <span class="ls-tag">(1)</span>`, `Σ<i>F</i><sub>y</sub> = 0: <i>T</i><sub>2</sub> sin 60° + <i>T</i><sub>1</sub> sin 50° − 80 = 0 <span class="ls-tag">(2)</span>`, `Solving: <b><i>T</i><sub>1</sub> = 42.5 N, <i>T</i><sub>2</sub> = 54.8 N</b>`]), fig(F.ex814()))}
${example('8.1.5', `The pulley is frictionless and the friction between the block and the incline is negligible. Find the weight <i>W</i> needed to keep the 200 N block at rest on the 35° incline.`,
  steps([`For the 200 N block, along the incline: <i>T</i> − 200 sin 35° = 0 ⇒ <i>T</i> = 114.7 N`, `For <i>W</i>: <i>T</i> − <i>W</i> = 0 ⇒ <b><i>W</i> = 114.7 N</b>`]), fig(F.ex815()))}
${exercises('Exercises: equilibrium of a particle', [
  { q: `A wooden block of weight 7.2 N rests on a slope at 20° to the horizontal. Calculate (a) the frictional force on the block, (b) the normal force on the block, (c) the coefficient of static friction.`, a: `(a) 2.46 N &nbsp; (b) 6.77 N &nbsp; (c) 0.36` },
  { q: `An object hangs from a knot. One rope pulls horizontally with <i>T</i><sub>1</sub> = 30 N; the other goes up to the ceiling at 40° to the ceiling. Find the weight of the object.`, f: fig(F.knot(['W', '40°', 'T₁ = 30 N'])), a: `<i>W</i> = 30 tan 40° = <b>25.2 N</b>. (The slide answer, 30 N, would need the angle to be 45°.)` },
  { q: `A 40 N weight hangs from a knot held by a rope at 60° to the ceiling and a second rope at 70° to the vertical (going down to the wall). Find the two tensions.`, a: `58 N in the rope at 60° to the ceiling; 31 N in the rope at 70° to the vertical` },
  { q: `The system shown is in equilibrium. (a) What is the maximum value of <i>W</i> if the friction force on the 40 N block cannot exceed 12.0 N? (b) What is the coefficient of static friction between the block and the table?`, f: fig(F.table30('W')), a: `(a) 6.9 N &nbsp; (b) 0.30` },
  { q: `The same system is just on the point of slipping when <i>W</i> = 8.0 N. What is the coefficient of static friction?`, a: `0.35` },
  { q: `A 2 kg body rests on a smooth slope at 20° to the horizontal, held by a string at 30° to the slope. Find the tension in the string.`, f: fig(F.slopeStr()), a: `7.74 N` }])}
${example('8.1.6', `<b>Dynamic equilibrium.</b> A hanging 8.0 N block pulls a 20 N block along a table at constant velocity. Find µ<sub>k</sub> between the 20 N block and the table. (Frictionless pulley.)`,
  steps([`Constant velocity, so each block is in equilibrium. Hanging block: <i>T</i> = 8.0 N`, `20 N block: <i>T</i> = <i>f</i><sub>k</sub> = µ<sub>k</sub><i>R</i> and <i>R</i> = 20 N`, `µ<sub>k</sub> = ${fr('8.0', '20')} = <b>0.40</b>`]))}
${pq('Practice question · equilibrium on an incline', `A box of mass 10.0 kg rests in equilibrium on a smooth plane inclined at 35° to the horizontal, held by a string parallel to the incline. Calculate the tension in the string. (<i>g</i> = 9.81 m s<sup>−2</sup>)`, null, null,
  eq(`Along the incline: <i>T</i> = <i>mg</i> sin 35° = (10.0)(9.81)(0.574) = <b>56.2 N</b>`))}
`)}

${sec('8-2', '8.1 Equilibrium of a rigid body', `
${def('Rigid body', `is a body with a ${red('definite and unchanging shape and size')}. It can have translational motion and rotational motion.`)}
${h4('Torque (moment of a force)')}
${def('Torque, τ', `is the ${red('vector product of <b>r</b> and <b>F</b>')}, where <b>r</b> is the vector from the axis of rotation to the point where the force acts. It measures the tendency of a force to rotate a body about the axis.`)}
${key(`<b>τ</b> = <b>r</b> × <b>F</b> &nbsp;&nbsp; τ = <i>rF</i> sin θ = <i>Fd</i>`, 'θ = angle between <b>r</b> and <b>F</b>; <i>d</i> = <i>r</i> sin θ = lever arm (moment arm); unit N m')}
${ul([`The <b>lever arm</b> <i>d</i> is the perpendicular distance from the axis to the line of action of the force.`, `Torque is a vector; its direction is given by the right-hand rule (the thumb), along the axis.`, `Sign convention: <b>clockwise negative</b>, <b>anticlockwise positive</b>.`])}
${example('8.2.1', `Calculate the torque about axis A due to each force shown: <i>F</i><sub>1</sub> = 5 N downward at 0.5 m from A, <i>F</i><sub>2</sub> = 5 N along the rod, and <i>F</i><sub>3</sub> = 5 N at 25° to the rod.`,
  steps([`τ = <i>rF</i> sin θ`, `τ<sub>1A</sub> = −(0.5)(5 sin 90°) = <b>−2.5 N m</b>`, `τ<sub>2A</sub> = (0.5)(5 sin 0°) = <b>0</b> (the line of action passes through A)`, `τ<sub>3A</sub> = +(0.5)(5 sin 25°) = <b>+1.1 N m</b>`]),
  fig(F.rods(L(220, 80, 220, 140, 'v', 'e', { w: 2.4 }) + T(226, 140, 'F₁ = 5 N', { fs: 11, a: 'start' }) + L(220, 80, 290, 80, 'r', 'e', { w: 2.4 }) + T(296, 84, 'F₂ = 5 N', { fs: 11, a: 'start' }) + L(220, 80, 155, 52, 'g', 'e', { w: 2.4 }) + T(150, 46, 'F₃ = 5 N', { fs: 11, a: 'end' }) + T(196, 74, '25°', { fs: 11 }), '0.5 m')))}
${example('8.2.2', `Calculate the torque about A due to each force: 10 N downward, 20 N along the rod and 25 N at 65° to the rod, all acting 0.8 m from A.`,
  steps([`τ<sub>1A</sub> = −(0.8)(10 sin 90°) = <b>−8.0 N m</b>`, `τ<sub>2A</sub> = (0.8)(20 sin 0°) = <b>0</b>`, `τ<sub>3A</sub> = +(0.8)(25 sin 65°) = <b>+18.1 N m</b>`]))}
${example('8.2.3', `The torque about X is 25 N m. Find the angle θ when (a) an 8 N force acts 4 m from X, (b) a 60 N force acts 0.5 m from X.`,
  steps([`(a) 25 = (4)(8 sin θ) ⇒ sin θ = 0.781 ⇒ <b>θ = 51.4°</b>`, `(b) 25 = (0.5)(60 sin θ) ⇒ sin θ = 0.833 ⇒ θ = 56.4° or <b>124°</b> (the angle in the figure is obtuse)`]))}
${h4('Conditions for the equilibrium of a rigid body (coplanar forces)')}
${two(key(`Σ<b>F</b> = 0 &nbsp; (Σ<i>F</i><sub>x</sub> = 0, Σ<i>F</i><sub>y</sub> = 0)`, '<b>1st condition (force condition)</b>: no translational motion'), key(`Στ = 0 &nbsp; about any axis`, '<b>2nd condition (torque condition)</b>: no rotational motion'))}
${tip('Choose the axis for Στ = 0 at the point where an unknown force acts (a hinge, a pivot, the foot of a ladder): that force then has zero torque and disappears from the equation.')}
${example('8.2.4', `The see-saw shown is balanced. Calculate the weight <i>W</i>.`,
  steps([`Στ = 0 about the pivot: (1.5)(<i>W</i> sin 90°) − (1.0)(300 sin 90°) − (1.5)(550 sin 90°) = 0`, `<b><i>W</i> = 750 N</b>`]), fig(F.seesaw()))}
${example('8.2.5', `A uniform plank AB, 6 m long and of weight 300 N, is held horizontal by two vertical ropes at A and B. A 150 N weight rests on the plank at C, where AC = 2 m. Find the tension in each rope.`,
  steps([`Take A as the axis: Στ<sub>A</sub> = 0: (0)<i>T</i><sub>A</sub> − (2)(150) − (3)(300) + (6)<i>T</i><sub>B</sub> = 0 ⇒ <b><i>T</i><sub>B</sub> = 200 N</b>`, `Σ<i>F</i><sub>y</sub> = 0: <i>T</i><sub>A</sub> + <i>T</i><sub>B</sub> − 150 − 300 = 0 ⇒ <b><i>T</i><sub>A</sub> = 250 N</b>`]), fig(F.plank()))}
${example('8.2.6', `A uniform 1 m beam of weight 60 N is hinged to a wall and held horizontal by a rope at 30° to the beam, attached at its end. A 100 N load hangs from the end. Calculate (a) the tension in the rope, (b) the force of the hinge on the beam.`,
  steps([`(a) Στ = 0 about the hinge: −(0.5)(60) − (1)(100) + (1)(<i>T</i> sin 30°) = 0 ⇒ <b><i>T</i> = 260 N</b>`, `(b) Σ<i>F</i><sub>x</sub> = 0: <i>R</i><sub>x</sub> = <i>T</i> cos 30° = <b>225 N</b>; Σ<i>F</i><sub>y</sub> = 0: <i>R</i><sub>y</sub> = 160 − <i>T</i> sin 30° = <b>30 N</b>`, `Hinge force = ${sq('225<sup>2</sup> + 30<sup>2</sup>')} = <b>227 N</b> at tan<sup>−1</sup>(30/225) = 7.6° above the horizontal`]), fig(F.beam()))}
${example('8.2.7', `A 10 m ladder of weight 50 N leans against a smooth wall at 50° to the rough floor. (a) How large a friction force must act at the foot so that it does not slip? (b) What coefficient of static friction is needed?`,
  steps([`Σ<i>F</i><sub>x</sub> = 0: <i>f</i><sub>s</sub> = <i>N</i><sub>1</sub> <span class="ls-tag">(1)</span>; Σ<i>F</i><sub>y</sub> = 0: <i>N</i><sub>2</sub> = 50 N <span class="ls-tag">(2)</span>`, `Στ = 0 about the foot A: −5(50 sin 40°) + 10(<i>N</i><sub>1</sub> sin 50°) = 0 ⇒ <i>N</i><sub>1</sub> = 21 N`, `(a) <b><i>f</i><sub>s</sub> = 21 N</b> &nbsp; (b) <i>f</i><sub>s</sub> = µ<sub>s</sub><i>N</i><sub>2</sub> ⇒ µ<sub>s</sub> = ${fr('21', '50')} = <b>0.42</b>`]), fig(F.ladder()))}
${exercises('Exercises: equilibrium of a rigid body', [
  { q: `A uniform board of weight 0.20 kN and length <i>L</i> has 300 N hanging at <i>L</i>/3 from end A and 400 N at 3<i>L</i>/4 from A. What single additional force will keep the board in equilibrium?`, f: fig(F.board()), a: `0.90 kN upward, at 0.56<i>L</i> from A` },
  { q: `A uniform 0.40 kN beam is hinged at P and held at 50° to the horizontal by a horizontal tie rope attached 3<i>L</i>/4 along it; a 2000 N load hangs from its end. Calculate the tension in the rope and the force of the hinge on the beam.`, f: fig(F.beam2()), a: `<i>T</i> = 2460 N; hinge force 3.4 kN at 44° to the horizontal` }])}
${pq('Practice question · centre of gravity and toppling', `A rectangular block 4 cm wide and 8 cm long stands on a plane inclined at angle θ. Which statement is true?`, ['The block topples if θ = 25°.', 'The block does not topple because it has a higher centre of gravity.', 'The block does not topple while the line of action of its weight passes inside its base (through or before the pivot).', 'The block topples if its length lies along the plane at the same angle.'], 2,
  `<p>The block tips over the lower edge when the vertical line through its centre of gravity passes outside the base, i.e. when tan θ &gt; ${fr('4', '8')}, θ &gt; 26.6°. While the weight acts inside the base, its moment about the pivot edge restores the block. At θ = 25° it does not topple.</p>${fig(F.topple())}`)}
`)}

${sec('8-rw', 'Real-World Physics: why the Burj Khalifa doesn’t fall over', rw({
  id: 'ls-8-rw-burj',
  meta: 'Dubai · Richard Hammond’s BIG',
  title: 'Standing 828 m tall on sand and weak rock',
  lead: `<p>The Burj Khalifa in Dubai is 828 m tall, the tallest building on Earth. It stands on sand and weak rock, and must resist strong desert winds. In <i>Richard Hammond’s BIG</i>, Richard investigates how it stays standing.</p><p>Its weight rests on a thick concrete raft supported by about 190 deep concrete piles, which hold the tower up mainly by <b>friction</b> with the surrounding ground. Its Y-shaped plan, with three wings bracing a central core, gives a wide base, and the tower steps inwards (“setbacks”) as it rises.</p>`,
  video: { id: 'N5i3UsiSoYY', title: 'The Physics Behind The Burj Khalifa And Why It Doesn’t Fall Over', channel: 'Quest TV', len: '9:55' },
  watch: 'identify the forces acting on the tower (weight, upward forces from the piles, wind) and how the design keeps it in equilibrium.',
  physics: ul([`For a rigid body in <b>equilibrium</b>: the resultant force is zero <i>and</i> the resultant torque about any point is zero.`, `The upward friction and normal forces from the piles balance the weight of the tower.`, `A wide base and a low <b>centre of gravity</b> make the tower stable: the wind would have to tilt it a long way before the line of action of its weight moved outside the base.`]),
  qs: [
    { q: `What are the conditions for the Burj Khalifa to be in static equilibrium?`, opts: ['The resultant force on it is zero only.', 'The resultant torque on it is zero only.', 'The resultant force on it is zero and the resultant torque about any point is zero.', 'Its weight is equal to the wind force.'], ans: 2,
      why: `<p>A rigid body needs both conditions: Σ<b>F</b> = 0 (no linear acceleration) and Στ = 0 (no angular acceleration).</p>` },
    { q: `Assume the weight of the tower is 4.8 × 10<sup>9</sup> N and it is shared equally by 192 piles. What is the upward force provided by each pile?`, opts: ['2.5 × 10<sup>5</sup> N', '2.5 × 10<sup>6</sup> N', '2.5 × 10<sup>7</sup> N', '9.2 × 10<sup>11</sup> N'], ans: 2,
      why: steps([`Σ<i>F</i> = 0: 192<i>F</i> = <i>W</i>`, `<i>F</i> = ${fr('4.8 × 10<sup>9</sup>', '192')}`, `= <b>2.5 × 10<sup>7</sup> N</b>`]) },
    { q: `Why does a wide base and a low centre of gravity make a tall building more stable against wind?`, opts: ['They make the weight of the building smaller.', 'The line of action of the weight stays within the base for a larger tilt, so the weight gives a restoring torque.', 'They reduce the wind force to zero.', 'They move the centre of gravity outside the base.'], ans: 1,
      why: `<p>As long as the line of action of the weight passes through the base, the weight produces a torque that turns the building back. A wider base and lower centre of gravity increase the angle needed before it can topple.</p>` },
    { q: `(Link to Chapter 9) A pile of cross-sectional area 1.77 m<sup>2</sup> carries a force of 2.5 × 10<sup>7</sup> N. What is the compressive stress in the pile?`, opts: ['4.4 × 10<sup>7</sup> Pa', '1.4 × 10<sup>7</sup> Pa', '7.1 × 10<sup>−8</sup> Pa', '1.4 × 10<sup>5</sup> Pa'], ans: 1,
      why: steps([`σ = ${fr('<i>F</i>', '<i>A</i>')}`, `= ${fr('2.5 × 10<sup>7</sup>', '1.77')}`, `= <b>1.4 × 10<sup>7</sup> Pa</b>`]) }
  ],
  src: `Source: <i>Richard Hammond’s BIG</i>, Episode 7 “Tallest Building On Earth” (Discovery, 2020). Values in the calculations are rounded estimates for practice. Preview the clip before class. <a href="https://www.youtube.com/watch?v=N5i3UsiSoYY" target="_blank" rel="noopener">youtube.com/watch?v=N5i3UsiSoYY</a>`
}))}`;

  // ---------- simulation: knot and triangle of forces ----------
  window.PhysiQSims.add('knot', function (root) {
    const { COL, fmt, el, slider, canvas, arrow, text, readouts } = window.PhysiQSims.U;
    const S = { a1: 50, a2: 60, W: 80 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'left rope angle to ceiling', 10, 85, 1, S.a1, '°', v => { S.a1 = v; draw(); });
    slider(ctl, 'right rope angle to ceiling', 10, 85, 1, S.a2, '°', v => { S.a2 = v; draw(); });
    slider(ctl, 'weight W', 10, 150, 1, S.W, 'N', v => { S.W = v; draw(); });
    const cv = canvas(root); const ro = readouts(root);
    function draw() {
      const r = d => d * Math.PI / 180, a1 = r(S.a1), a2 = r(S.a2);
      // T1 cos a1 = T2 cos a2 ; T1 sin a1 + T2 sin a2 = W
      const T1 = S.W * Math.cos(a2) / Math.sin(a1 + a2), T2 = S.W * Math.cos(a1) / Math.sin(a1 + a2);
      const ctx = cv.ctx, { w, h } = cv.size(0.5, 260, 360);
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const half = w < 560, kx = half ? w * 0.5 : w * 0.3, ky = h * 0.55, top = 20, L1 = (ky - top) / Math.sin(a1), L2 = (ky - top) / Math.sin(a2);
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(10, top); ctx.lineTo(half ? w - 10 : w * 0.58, top); ctx.stroke();
      ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(kx - L1 * Math.cos(a1), top); ctx.lineTo(kx, ky); ctx.lineTo(kx + L2 * Math.cos(a2), top); ctx.moveTo(kx, ky); ctx.lineTo(kx, ky + 40); ctx.stroke();
      ctx.fillStyle = '#BDE3E8'; ctx.fillRect(kx - 22, ky + 40, 44, 34); ctx.strokeRect(kx - 22, ky + 40, 44, 34); text(ctx, fmt(S.W, 0) + ' N', kx, ky + 62, { a: 'center', b: 1, fs: 12 });
      text(ctx, S.a1 + '°', kx - L1 * Math.cos(a1) + 24, top + 16, { fs: 11 }); text(ctx, S.a2 + '°', kx + L2 * Math.cos(a2) - 30, top + 16, { fs: 11 });
      const k = Math.min(1.2, 120 / S.W);
      arrow(ctx, kx, ky, kx - T1 * k * Math.cos(a1), ky - T1 * k * Math.sin(a1), COL.v, 2.6); arrow(ctx, kx, ky, kx + T2 * k * Math.cos(a2), ky - T2 * k * Math.sin(a2), COL.gr, 2.6); arrow(ctx, kx, ky, kx, ky + S.W * k * 0.5, COL.r, 2.6);
      text(ctx, 'T₁', kx - T1 * k * Math.cos(a1) * 0.6 - 16, ky - T1 * k * Math.sin(a1) * 0.6, { b: 1, c: COL.v }); text(ctx, 'T₂', kx + T2 * k * Math.cos(a2) * 0.6 + 8, ky - T2 * k * Math.sin(a2) * 0.6, { b: 1, c: COL.gr });
      if (!half) {
        // triangle of forces: W down, then T2, then T1 back to start
        const ox = w * 0.72, oy = h * 0.15, s = (h * 0.7) / S.W;
        const p1 = [ox, oy], p2 = [ox, oy + S.W * s], p3 = [p2[0] + T2 * s * Math.cos(a2), p2[1] - T2 * s * Math.sin(a2)];
        arrow(ctx, p1[0], p1[1], p2[0], p2[1], COL.r, 3); arrow(ctx, p2[0], p2[1], p3[0], p3[1], COL.gr, 3); arrow(ctx, p3[0], p3[1], p1[0], p1[1], COL.v, 3);
        text(ctx, 'W', p1[0] - 8, (p1[1] + p2[1]) / 2, { a: 'right', b: 1, c: COL.r }); text(ctx, 'T₂', (p2[0] + p3[0]) / 2 + 6, (p2[1] + p3[1]) / 2 + 14, { b: 1, c: COL.gr }); text(ctx, 'T₁', (p3[0] + p1[0]) / 2 + 8, (p3[1] + p1[1]) / 2 - 4, { b: 1, c: COL.v });
        text(ctx, 'triangle of forces (closed)', ox - 10, h - 8, { fs: 11, c: COL.sub });
      }
      ro([['T₁', fmt(T1, 1) + ' N', 'hl'], ['T₂', fmt(T2, 1) + ' N', 'hl'], ['ΣFx = T₂cos − T₁cos', fmt(T2 * Math.cos(a2) - T1 * Math.cos(a1), 2) + ' N'], ['ΣFy = T₁sin + T₂sin − W', fmt(T1 * Math.sin(a1) + T2 * Math.sin(a2) - S.W, 2) + ' N']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  window.PhysiQLessons.register('LESSON-8', { html: () => S });
})();
