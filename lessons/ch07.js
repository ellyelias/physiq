/* Chapter 7 Rotation of Rigid Bodies: full notes by Cikgu Suhaili (from STPM_2027_unit_7_Rotational_of_rigid_body_TEACHERS_VERSION.pptx). */
(function () {
  'use strict';
  const { card, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4 } = window.PhysiQLessons.H;
  const img = (src, alt, w) => `<figure class="ls-figw"><img src="lessons/${src}" alt="${alt}" style="max-width:${w || 420}px;width:100%;height:auto"></figure>`;

  const F = {};
  F.rod = (axisX, lab) => svg(360, 110, L(60, 55, 300, 55, 'k', '', { w: 3 }) + dot(60, 55, 16, '#7FB9E0') + dot(300, 55, 18, '#7FB9E0') + T(60, 92, '5 kg', { fs: 12, b: 1 }) + T(300, 92, '7 kg', { fs: 12, b: 1 }) +
    L(axisX, 15, axisX, 95, 'r', '', { w: 1.6, d: '5 4' }) + T(axisX, 12, lab, { fs: 11, c: C.r }) + L(60, 104, 300, 104, 'k', 'b', { w: 1.2 }) + T(180, 100, '4.0 m', { fs: 11 }));
  F.rect = () => svg(330, 190, `<rect x="50" y="40" width="230" height="110" fill="none" stroke="${C.v}" stroke-dasharray="4 3"/>` + L(50, 40, 280, 150, 'v', '', { w: 1 }) + L(280, 40, 50, 150, 'v', '', { w: 1 }) +
    dot(50, 40, 7, '#2244DD') + dot(280, 40, 7, '#2244DD') + dot(50, 150, 9, '#2244DD') + dot(280, 150, 8, '#2244DD') + T(50, 28, '2 kg', { fs: 12, b: 1 }) + T(280, 28, '3 kg', { fs: 12, b: 1 }) + T(50, 172, '5 kg', { fs: 12, b: 1 }) + T(280, 172, '4 kg', { fs: 12, b: 1 }) +
    T(165, 34, 'B ×', { b: 1 }) + T(165, 102, 'A', { b: 1 }) + T(165, 164, '250 cm', { fs: 11 }) + T(288, 98, '120 cm', { fs: 11, a: 'start' }));
  F.torque = () => svg(280, 200, `<circle cx="120" cy="110" r="70" fill="none" stroke="${C.sub}" stroke-dasharray="4 4"/>` + dot(120, 110, 4, C.ink) + L(120, 110, 190, 110, 'k', '', { w: 1.6 }) + T(155, 102, 'r', { it: 1, b: 1 }) +
    dot(190, 110, 6, '#2244DD') + L(190, 110, 190, 40, 'r', 'e', { w: 2.8 }) + T(198, 50, 'F (tangential)', { fs: 12, a: 'start', c: C.r }) + T(120, 196, 'axis out of the page', { fs: 11, c: C.sub }) + P('M80,70 A55,55 0 0 0 66,118', 'v', { w: 2, a: 'v' }) + T(56, 92, 'α', { it: 1, b: 1, c: C.v }));
  F.wheel2 = () => svg(260, 220, `<circle cx="120" cy="120" r="80" fill="#D7F5D0" stroke="#B5361C"/><circle cx="120" cy="120" r="48" fill="#E3F07A" stroke="#2244DD"/>` + dot(120, 120, 3, C.ink) +
    L(120, 120, 120, 40, 'k', '', { w: 1.2 }) + L(120, 120, 168, 120, 'k', '', { w: 1.2 }) + T(108, 80, 'r<tspan font-size="9" dy="3">B</tspan>', { fs: 12, it: 1 }) + T(146, 136, 'r<tspan font-size="9" dy="3">A</tspan>', { fs: 12, it: 1 }) +
    L(72, 120, 72, 210, 'r', 'e', { w: 2.6 }) + T(60, 210, 'F<tspan font-size="9" dy="3">A</tspan>', { fs: 12, it: 1, b: 1, a: 'end' }) + L(120, 40, 200, 13, 'r', 'e', { w: 2.6 }) + T(206, 16, 'F<tspan font-size="9" dy="3">B</tspan>', { fs: 12, it: 1, b: 1, a: 'start' }) + L(120, 40, 220, 40, 's', '', { d: '3 3', w: 1 }) + T(176, 36, '30°', { fs: 11 }));
  F.hang = (labM) => svg(220, 220, `<circle cx="110" cy="70" r="50" fill="#DDE7F2" stroke="${C.ink}"/><circle cx="110" cy="70" r="5" fill="${C.ink}"/>` + L(60, 70, 60, 160, 'k', '', { w: 1.6 }) + `<path d="M44,160 L76,160 L84,196 L36,196 Z" fill="#2244DD"/>` +
    T(60, 214, labM, { fs: 12, b: 1 }) + L(30, 120, 30, 170, 'k', 'e', { w: 2 }) + T(22, 148, 'a', { it: 1, b: 1, a: 'end' }) + L(110, 70, 160, 70, 'k', '', { w: 1 }) + T(140, 64, 'r', { it: 1 }) + P('M140,40 A42,42 0 0 0 90,32', 'r', { w: 2, a: 'r' }) + T(124, 26, 'α', { it: 1, c: C.r, b: 1 }));
  F.twoMass = () => svg(220, 220, `<circle cx="110" cy="50" r="34" fill="#DDE7F2" stroke="${C.ink}"/>` + L(76, 50, 76, 150, 'k', '', { w: 1.4 }) + L(144, 50, 144, 175, 'k', '', { w: 1.4 }) +
    `<rect x="62" y="150" width="28" height="28" fill="#BDE3E8" stroke="${C.ink}"/><rect x="128" y="175" width="32" height="36" fill="#BDE3E8" stroke="${C.ink}"/>` + T(54, 168, 'm₁', { a: 'end', b: 1 }) + T(168, 196, 'm₂', { a: 'start', b: 1 }) + L(190, 140, 190, 190, 'k', 'e', { w: 2 }) + T(196, 170, 'a', { it: 1, a: 'start' }));
  F.skater = () => two(svg(200, 150, `<circle cx="100" cy="30" r="12" fill="#F2C48D"/>` + L(100, 42, 100, 110, 'k', '', { w: 3 }) + L(30, 60, 170, 60, 'k', '', { w: 3 }) + L(100, 110, 80, 145, 'k', '', { w: 3 }) + L(100, 110, 120, 145, 'k', '', { w: 3 }) + T(100, 148, '', {}) + T(100, 14, 'arms out: large I, small ω', { fs: 11, c: C.sub }), 200),
    svg(200, 150, `<circle cx="100" cy="30" r="12" fill="#F2C48D"/>` + L(100, 42, 100, 110, 'k', '', { w: 3 }) + L(88, 55, 88, 90, 'k', '', { w: 3 }) + L(112, 55, 112, 90, 'k', '', { w: 3 }) + L(100, 110, 92, 145, 'k', '', { w: 3 }) + L(100, 110, 108, 145, 'k', '', { w: 3 }) + T(100, 14, 'arms in: small I, large ω', { fs: 11, c: C.sub }), 200));
  F.table = () => svg(300, 170, `<path d="M40,60 L240,60 L280,20 L80,20 Z" fill="#EAF1FB" stroke="#2244DD"/>` + L(60, 60, 60, 150, 'v', '', { w: 2 }) + L(220, 60, 220, 150, 'v', '', { w: 2 }) + `<ellipse cx="160" cy="40" rx="70" ry="14" fill="none" stroke="${C.r}" stroke-dasharray="4 3"/>` +
    dot(90, 40, 6, '#2244DD') + L(90, 40, 160, 40, 'r', '', { w: 1.6 }) + T(124, 34, 'r₁', { fs: 11, it: 1 }) + L(160, 40, 160, 120, 'g', 'e', { w: 2.4 }) + T(168, 116, 'F (pull)', { fs: 12, a: 'start', c: C.g }));

  const S = `
${sec('7-1', '7.1 Centre of mass and centre of gravity', `
${def('Centre of mass (CM)', `of a system is the ${red('point at which the entire mass of the system may be considered to be concentrated')}.`)}
${def('Centre of gravity (CG)', `of a body is the ${red('point at which the entire weight of the body may be considered to act')}. The resultant of the gravitational forces on all the particles of the body passes through this point.`)}
${h4('Centre of mass of a system of particles in a plane')}
<p>The centre of mass is the mass-weighted average position of the particles:</p>
${key(`<i>x̄</i> = ${fr('Σ<i>m</i><sub>i</sub><i>x</i><sub>i</sub>', 'Σ<i>m</i><sub>i</sub>')} &nbsp;&nbsp; <i>ȳ</i> = ${fr('Σ<i>m</i><sub>i</sub><i>y</i><sub>i</sub>', 'Σ<i>m</i><sub>i</sub>')}`, '<i>m</i><sub>i</sub> = mass of the i-th particle at (<i>x</i><sub>i</sub>, <i>y</i><sub>i</sub>)')}
${card('Additional example (syllabus 7.1(b)) · centre of mass of particles', `Masses of 1 kg at (0, 0), 2 kg at (3 m, 0) and 2 kg at (0, 4 m) lie in a plane. Find the centre of mass.`,
  steps([`<i>x̄</i> = ${fr('(1)(0) + (2)(3) + (2)(0)', '1 + 2 + 2')} = ${fr('6', '5')} = <b>1.2 m</b>`, `<i>ȳ</i> = ${fr('(1)(0) + (2)(0) + (2)(4)', '5')} = ${fr('8', '5')} = <b>1.6 m</b>`, `Centre of mass at <b>(1.2 m, 1.6 m)</b>`]))}
${h4('Path of the centre of mass of a two-particle system')}
${ul([`Consider two particles <i>m</i><sub>1</sub> and <i>m</i><sub>2</sub> moving under their mutual interaction only (an explosion, or a collision), with no external force on the system.`, `The internal forces are equal and opposite (Newton’s third law), so they cancel and do not affect the motion of the centre of mass.`, `The centre of mass therefore <b>keeps moving in a straight line at constant velocity</b> (or stays at rest), however complicated the paths of the individual particles are.`, `If an external force acts, the centre of mass moves as if it were a single particle of mass (<i>m</i><sub>1</sub> + <i>m</i><sub>2</sub>) acted on by that force. Example: after a shell explodes in flight, the centre of mass of the fragments continues along the original parabola.`])}
${h4('When is the centre of mass also the centre of gravity?')}
${ul([`The centre of mass depends only on how the mass is distributed; the centre of gravity depends on how the weight is distributed.`, `They <b>coincide when the gravitational field strength <i>g</i> is uniform</b> over the whole body (same magnitude and direction at every particle).`, `This holds for everyday objects, which are tiny compared with the Earth. They would differ only for a very large body (a mountain, a very tall tower) over which <i>g</i> varies noticeably.`])}
`)}

${sec('7-2', '7.2 Moment of inertia', `
${two(`<p><b>Inertia</b> (linear motion) opposes a change in motion. <b>Moment of inertia</b> (rotational motion) opposes a change in rotation.</p>${def('Moment of inertia, <i>I</i>', `of a body about an axis is the ${red('sum of the products of the mass of each particle and the square of its perpendicular distance from the axis')}. It measures the body’s resistance to a change in its rotational motion.`)}`,
  ul([`It depends on (i) the mass, (ii) how the mass is distributed about the axis, and (iii) the position and orientation of the axis.`, `It is a <b>scalar</b>; unit kg m<sup>2</sup>.`]))}
${key(`Particle: <i>I</i> = <i>mr</i><sup>2</sup> &nbsp;&nbsp; System of particles: <i>I</i> = Σ<i>m</i><sub>i</sub><i>r</i><sub>i</sub><sup>2</sup> = <i>m</i><sub>1</sub><i>r</i><sub>1</sub><sup>2</sup> + <i>m</i><sub>2</sub><i>r</i><sub>2</sub><sup>2</sup> + … + <i>m</i><sub>n</sub><i>r</i><sub>n</sub><sup>2</sup>`, '<i>r</i> = perpendicular distance of each particle from the axis of rotation')}
${example('7.2.1', `Particles of 5 kg and 7 kg are mounted 4.0 m apart on a light rod. Calculate the moment of inertia of the system (a) about an axis halfway between the masses, (b) about an axis 0.50 m to the left of the 5 kg mass.`,
  steps([`(a) <i>I</i> = <i>m</i><sub>1</sub><i>r</i><sub>1</sub><sup>2</sup> + <i>m</i><sub>2</sub><i>r</i><sub>2</sub><sup>2</sup> = (5)(2)<sup>2</sup> + (7)(2)<sup>2</sup> = <b>48 kg m<sup>2</sup></b>`, `(b) Axis 0.50 m to the left of the 5 kg mass: <i>I</i> = (5)(0.50)<sup>2</sup> + (7)(4.50)<sup>2</sup> = <b>143 kg m<sup>2</sup></b>`]) +
  note(`The slide gives 87 kg m<sup>2</sup> for (b). That is the answer for an axis 0.50 m to the <b>right</b> of the 5 kg mass (between the masses): (5)(0.50)<sup>2</sup> + (7)(3.50)<sup>2</sup> = 87 kg m<sup>2</sup>.`), fig(F.rod(180, 'axis')))}
${example('7.2.2', `Calculate the moment of inertia of the system about the axis PP′ and about the axis QQ′. (<i>m</i><sub>A</sub> = 2 kg, <i>m</i><sub>B</sub> = 1 kg, <i>m</i><sub>C</sub> = 1.5 kg, <i>m</i><sub>D</sub> = 3 kg)`,
  steps([`Masses on an axis contribute nothing (<i>r</i> = 0).`, `<i>I</i><sub>PP′</sub> = <i>m</i><sub>B</sub><i>r</i><sub>B</sub><sup>2</sup> + <i>m</i><sub>C</sub><i>r</i><sub>C</sub><sup>2</sup> = (1)(1)<sup>2</sup> + (1.5)(1)<sup>2</sup> = <b>2.5 kg m<sup>2</sup></b>`, `<i>I</i><sub>QQ′</sub> = <i>m</i><sub>B</sub><i>r</i><sub>B</sub><sup>2</sup> + <i>m</i><sub>C</sub><i>r</i><sub>C</sub><sup>2</sup> + <i>m</i><sub>D</sub><i>r</i><sub>D</sub><sup>2</sup> = <b>7 kg m<sup>2</sup></b>`]), img('ch07-ex722.png', 'Masses A, B, C, D at the corners of a rhombus of side 1 m, with axes PP′ and QQ′', 420))}
${exercises('Exercise: moment of inertia', [{ q: `Masses of 2 kg, 3 kg, 4 kg and 5 kg are at the corners of a 250 cm × 120 cm rectangle. Calculate their moment of inertia about an axis perpendicular to the page through (a) the centre A, (b) the midpoint B of the top edge.`, f: fig(F.rect()),
  a: `(a) <i>d</i> = ${sq('1.25<sup>2</sup> + 0.60<sup>2</sup>')} = 1.39 m for all four masses: <i>I</i><sub>A</sub> = 14 × 1.92 = <b>27 kg m<sup>2</sup></b><br>(b) top masses <i>d</i> = 1.25 m; bottom masses <i>d</i> = ${sq('1.25<sup>2</sup> + 1.2<sup>2</sup>')} = 1.73 m: <i>I</i><sub>B</sub> = (2 + 3)(1.25)<sup>2</sup> + (5 + 4)(1.73)<sup>2</sup> = <b>34.8 kg m<sup>2</sup></b> (the printed answer is 33 kg m<sup>2</sup>)` }])}
${h4('Moments of inertia of some uniform bodies')}
${note('STPM: the moment of inertia of these shapes is given in the question; you do not need to derive them.')}
${table(['Body', 'Axis', 'Moment of inertia'], [['particle', 'distance <i>r</i> from the axis', '<i>mr</i><sup>2</sup>'], ['thin ring, hoop or cylindrical shell', 'through the centre, perpendicular to the plane', '<i>mr</i><sup>2</sup>'], ['thin rod, length <i>L</i>', 'through the centre, perpendicular to the rod', `${fr('1', '12')}<i>mL</i><sup>2</sup>`], ['solid cylinder or disc', 'along the cylinder axis', '½<i>mr</i><sup>2</sup>'], ['solid sphere', 'through the centre', `${fr('2', '5')}<i>mr</i><sup>2</sup>`], ['thin spherical shell', 'through the centre', `${fr('2', '3')}<i>mr</i><sup>2</sup>`]])}
${example('7.2.3', `Calculate the moment of inertia of a 10.8 kg solid sphere of radius 0.648 m about an axis through its centre.`,
  eq(`<i>I</i> = ${fr('2', '5')}<i>mr</i><sup>2</sup> = ${fr('2', '5')}(10.8)(0.648)<sup>2</sup> = <b>1.81 kg m<sup>2</sup></b>`))}
`)}

${sec('7-3', '7.3 Torque and angular acceleration', `
${def('Torque, τ', `is the ${red('tendency of a force to rotate a body about an axis')}: the quantitative measure of the ability of a force to cause or change rotational motion.`)}
${two(key(`${'<b>τ</b>'} = <b>r</b> × <b>F</b> &nbsp;&nbsp; τ = <i>rF</i> sin θ`), ul([`A <b>vector</b>; unit N m.`, `Sign convention: clockwise negative, anticlockwise positive.`, `<i>r</i> sin θ is the perpendicular distance from the axis to the line of action of <b>F</b>.`]))}
${def('Angular acceleration, α', `is the ${red('rate of change of angular velocity')}: α = ${fr('dω', 'd<i>t</i>')} (rad s<sup>−2</sup>). For a point at radius <i>r</i>, the tangential acceleration is <i>a</i><sub>t</sub> = <i>r</i>α.`)}
${h4('A net torque produces an angular acceleration: τ = Iα')}
${two(steps([`A constant tangential force <i>F</i> acts on a particle of mass <i>m</i> at radius <i>r</i>: <i>F</i> = <i>ma</i><sub>t</sub> and <i>a</i><sub>t</sub> = <i>r</i>α, so <i>F</i> = <i>mr</i>α`, `Torque of this force (θ = 90°): τ = <i>rF</i> = <i>mr</i><sup>2</sup>α = <i>I</i>α (<i>I</i> = <i>mr</i><sup>2</sup> for a particle)`, `A rigid body is made of <i>n</i> particles: τ = <i>m</i><sub>1</sub><i>r</i><sub>1</sub><sup>2</sup>α + <i>m</i><sub>2</sub><i>r</i><sub>2</sub><sup>2</sup>α + … = (Σ<i>m</i><sub>i</sub><i>r</i><sub>i</sub><sup>2</sup>)α`]), fig(F.torque()))}
${key(`τ<sub>net</sub> = <i>I</i>α`, 'the rotational form of Newton’s second law, <i>F</i> = <i>ma</i>; τ<sub>net</sub> is the net torque on the body')}
${example('7.3.1', `A force of 200 N acts tangentially on the rim of a wheel of radius 25 cm. (a) Calculate the torque. (b) Repeat if the force makes an angle of 40° with the spoke of the wheel.`,
  steps([`(a) τ = <i>rF</i> sin θ = (0.25)(200 sin 90°) = <b>50 N m</b>`, `(b) τ = (0.25)(200 sin 40°) = <b>32 N m</b>`]))}
${example('7.3.2', `Two thin discs of radius <i>r</i><sub>A</sub> = 30 cm and <i>r</i><sub>B</sub> = 50 cm are fixed together on an axle through their centres. Calculate the net torque due to the two forces shown, each of 50 N.`,
  steps([`τ<sub>net</sub> = <i>r</i><sub>A</sub><i>F</i><sub>A</sub> sin 90° − <i>r</i><sub>B</sub><i>F</i><sub>B</sub> sin 60°`, `= (0.30)(50) − (0.50)(50) sin 60° = <b>−6.7 N m</b> (6.7 N m clockwise)`]), fig(F.wheel2()))}
${example('7.3.3', `An 8.0 kg wheel has a radius of 30 cm. (a) What is its moment of inertia? (b) What torque gives it an angular acceleration of 3.0 rad s<sup>−2</sup>? (Treat it as a uniform disc.)`,
  steps([`(a) <i>I</i> = ½<i>mr</i><sup>2</sup> = ½(8.0)(0.30)<sup>2</sup> = <b>0.36 kg m<sup>2</sup></b>`, `(b) τ = <i>I</i>α = (0.36)(3.0) = <b>1.08 N m</b>`]))}
${example('7.3.4', `A grinding disc of radius 0.6 m and mass 90 kg rotates at 460 rev min<sup>−1</sup>. What frictional force, applied tangentially at the edge, stops it in 20 s?`,
  steps([`<i>I</i> = ½<i>mr</i><sup>2</sup> = ½(90)(0.6)<sup>2</sup> = 16.2 kg m<sup>2</sup>`, `ω<sub>0</sub> = ${fr('460 × 2π', '60')} = 48.2 rad s<sup>−1</sup>; α = ${fr('0 − 48.2', '20')} = −2.41 rad s<sup>−2</sup>`, `<i>rF</i> = <i>I</i>α ⇒ <i>F</i> = ${fr('<i>I</i>α', '<i>r</i>')} = ${fr('16.2(−2.41)', '0.6')} = −65.1 N: a force of <b>65.1 N</b> opposing the rotation`]))}
${example('7.3.5', `What tangential force applied to the rim of a 2 kg disc-shaped wheel of radius 0.5 m gives it an angular acceleration of 4.8 rad s<sup>−2</sup>? (Neglect friction.)`,
  steps([`<i>I</i> = ½<i>mr</i><sup>2</sup> = ½(2)(0.5)<sup>2</sup> = 0.25 kg m<sup>2</sup>`, `<i>rF</i> = <i>I</i>α ⇒ <i>F</i> = ${fr('0.25(4.8)', '0.5')} = <b>2.4 N</b>`]))}
${example('7.3.6', `A 15.0 N force is applied to a cord wrapped round a pulley of mass 4.00 kg and radius 33.0 cm. There is a friction torque of 1.10 N m at the axle. Calculate the angular acceleration of the pulley.`,
  steps([`<i>I</i> = ½<i>mR</i><sub>0</sub><sup>2</sup> = ½(4.00)(0.33)<sup>2</sup> = 0.22 kg m<sup>2</sup>`, `τ<sub>net</sub> = <i>I</i>α: <i>rF</i> − τ<sub>fr</sub> = <i>I</i>α`, `α = ${fr('(0.33)(15.0) − 1.10', '0.22')} = <b>17.5 rad s<sup>−2</sup></b>`]))}
${example('7.3.7', `A 400 g mass hangs from a cord wound on a wheel of radius 15 cm. When released from rest it falls 2.0 m in 2 s. Calculate the moment of inertia of the wheel.`,
  steps([`Mass (linear): <i>s</i> = <i>ut</i> + ½<i>at</i><sup>2</sup> ⇒ 2.0 = ½<i>a</i>(2)<sup>2</sup> ⇒ <i>a</i> = 1 m s<sup>−2</sup>`, `<i>mg</i> − <i>T</i> = <i>ma</i> ⇒ <i>T</i> = 0.4(9.81 − 1) = 3.52 N`, `Wheel (rotation): <i>Tr</i> = <i>I</i>α with α = ${fr('<i>a</i>', '<i>r</i>')} = ${fr('1', '0.15')} = 6.67 rad s<sup>−2</sup>`, `<i>I</i> = ${fr('<i>Tr</i>', 'α')} = ${fr('(3.52)(0.15)', '6.67')} = <b>0.079 kg m<sup>2</sup></b>`]), fig(F.hang('m = 0.4 kg')))}
${example('7.3.8', `A uniform disc of mass 2.5 kg and radius 20 cm is mounted on a fixed horizontal axle. A 1.2 kg block hangs from a light cord wrapped round its rim. Calculate (a) the acceleration of the block, (b) the angular acceleration of the disc, (c) the tension in the cord.`,
  steps([`Disc (rotation): <i>TR</i> = <i>I</i>α = (½<i>MR</i><sup>2</sup>)(<i>a</i>/<i>R</i>) ⇒ <i>T</i> = ½<i>Ma</i> <span class="ls-tag">(1)</span>`, `Block (translation): <i>mg</i> − <i>T</i> = <i>ma</i> <span class="ls-tag">(2)</span>`, `(1) into (2): <i>a</i> = ${fr('<i>mg</i>', '<i>m</i> + ½<i>M</i>')} = ${fr('(1.2)(9.81)', '1.2 + 1.25')} = <b>4.80 m s<sup>−2</sup></b>`, `(b) α = ${fr('<i>a</i>', '<i>R</i>')} = ${fr('4.80', '0.20')} = <b>24.0 rad s<sup>−2</sup></b>`, `(c) <i>T</i> = ½<i>Ma</i> = ½(2.5)(4.80) = <b>6.0 N</b>`]), fig(F.hang('m = 1.2 kg')))}
${exercises('Exercise: pulley with friction', [{ q: `Masses <i>m</i><sub>1</sub> = 0.40 kg and <i>m</i><sub>2</sub> = 0.80 kg hang from a pulley of mass 0.20 kg and radius 0.15 m. A constant friction torque of 0.35 N m acts at the axle. What is the acceleration of the masses?`, f: fig(F.twoMass()),
  a: `<i>m</i><sub>2</sub><i>g</i> − <i>T</i><sub>2</sub> = <i>m</i><sub>2</sub><i>a</i>; <i>T</i><sub>1</sub> − <i>m</i><sub>1</sub><i>g</i> = <i>m</i><sub>1</sub><i>a</i>; (<i>T</i><sub>2</sub> − <i>T</i><sub>1</sub>)<i>R</i> − τ<sub>fr</sub> = ½<i>MR</i><sup>2</sup>(<i>a</i>/<i>R</i>)<br><i>a</i> = ${fr('(<i>m</i><sub>2</sub> − <i>m</i><sub>1</sub>)<i>g</i> − τ<sub>fr</sub>/<i>R</i>', '<i>m</i><sub>1</sub> + <i>m</i><sub>2</sub> + ½<i>M</i>')} = ${fr('3.92 − 2.33', '1.30')} = <b>1.2 m s<sup>−2</sup></b>` }])}

${h4('Rotational motion with constant angular acceleration')}
${steps([`If ω increases uniformly from ω<sub>0</sub> to ω in time <i>t</i>: ω = ω<sub>0</sub> + α<i>t</i> <span class="ls-tag">(1)</span>`, `Angular displacement = average angular velocity × time: θ = ½(ω<sub>0</sub> + ω)<i>t</i> <span class="ls-tag">(2)</span>`, `(1) into (2): θ = ω<sub>0</sub><i>t</i> + ½α<i>t</i><sup>2</sup> <span class="ls-tag">(3)</span>`, `From (1), <i>t</i> = (ω − ω<sub>0</sub>)/α; substitute into (2): ω<sup>2</sup> = ω<sub>0</sub><sup>2</sup> + 2αθ <span class="ls-tag">(4)</span>`])}
${table(['Linear motion', 'Rotational motion'], [['<i>v</i> = <i>u</i> + <i>at</i>', 'ω = ω<sub>0</sub> + α<i>t</i>'], ['<i>s</i> = ½(<i>u</i> + <i>v</i>)<i>t</i>', 'θ = ½(ω<sub>0</sub> + ω)<i>t</i>'], ['<i>s</i> = <i>ut</i> + ½<i>at</i><sup>2</sup>', 'θ = ω<sub>0</sub><i>t</i> + ½α<i>t</i><sup>2</sup>'], ['<i>v</i><sup>2</sup> = <i>u</i><sup>2</sup> + 2<i>as</i>', 'ω<sup>2</sup> = ω<sub>0</sub><sup>2</sup> + 2αθ']])}
${example('7.3.9', `A wheel rotates with constant angular acceleration 2.5 rad s<sup>−2</sup>. At <i>t</i> = 0 its angular velocity is 3.0 rad s<sup>−1</sup>. Calculate (a) the angle turned in the first 2 s, (b) the angular velocity at <i>t</i> = 2 s.`,
  steps([`(a) θ = ω<sub>0</sub><i>t</i> + ½α<i>t</i><sup>2</sup> = (3.0)(2) + ½(2.5)(2)<sup>2</sup> = <b>11 rad</b>`, `(b) ω = ω<sub>0</sub> + α<i>t</i> = 3.0 + (2.5)(2) = <b>8.0 rad s<sup>−1</sup></b>`]))}
${example('7.3.10', `A car wheel speeds up from rest to 100 rad s<sup>−1</sup> in 9 s. Calculate (a) the angular acceleration, (b) the angular speed at <i>t</i> = 10 s, (c) the angle turned in 20 s (the acceleration continues).`,
  steps([`(a) α = ${fr('100', '9')} = <b>11.11 rad s<sup>−2</sup></b>`, `(b) ω = (11.11)(10) = <b>111.1 rad s<sup>−1</sup></b>`, `(c) θ = ½(11.11)(20)<sup>2</sup> = <b>2222 rad</b>`]))}
${example('7.3.11', `A wheel turns with constant angular acceleration 0.45 rad s<sup>−2</sup>. (a) How long does it take to reach 8.00 rad s<sup>−1</sup> from rest? (b) Through how many revolutions does it turn in this time?`,
  steps([`(a) <i>t</i> = ${fr('ω − ω<sub>0</sub>', 'α')} = ${fr('8.00', '0.45')} = <b>17.8 s</b>`, `(b) θ = ${fr('ω<sup>2</sup>', '2α')} = ${fr('64', '0.90')} = 71.1 rad = ${fr('71.1', '2π')} = <b>11.3 rev</b>`]))}
${exercises('Exercises: uniform angular acceleration', [
  { q: `The angular speed of a disc decreases uniformly from 12.00 to 4.00 rad s<sup>−1</sup> in 16.0 s. Calculate the angular acceleration and the number of revolutions made in this time.`, a: `α = −0.500 rad s<sup>−2</sup>; θ = ½(12 + 4)(16) = 128 rad = 20.4 rev` },
  { q: `A flywheel of radius 0.08 m speeds up from 5 rpm to 11 rpm in 100 s. Calculate (a) its angular acceleration, (b) the tangential acceleration of a point on the rim.`, a: `(a) 6.3 × 10<sup>−3</sup> rad s<sup>−2</sup> &nbsp; (b) <i>a</i><sub>t</sub> = α<i>r</i> = 5.04 × 10<sup>−4</sup> m s<sup>−2</sup>` }])}
`)}

${sec('7-4', '7.4 Angular momentum and its conservation', `
${def('Angular momentum, <b>L</b>', `of a particle about an axis is the ${red('cross product of its position vector <b>r</b> and its linear momentum <b>p</b>')}: <b>L</b> = <b>r</b> × <b>p</b>.`)}
${steps([`Magnitude: <i>L</i> = <i>rp</i> sin θ. For circular motion, <b>r</b> ⊥ <b>v</b> (θ = 90°) and <i>p</i> = <i>mv</i>, so <i>L</i> = <i>mvr</i>`, `With <i>v</i> = <i>r</i>ω: <i>L</i> = <i>mr</i><sup>2</sup>ω`, `A rigid body is made of many particles: <i>L</i> = (Σ<i>m</i><sub>i</sub><i>r</i><sub>i</sub><sup>2</sup>)ω = <i>I</i>ω`])}
${key(`<i>L</i> = <i>I</i>ω`, 'vector (right-hand rule, along the axis); unit kg m<sup>2</sup> s<sup>−1</sup>')}
${example('7.4.1', `A 10 kg disc of radius 0.25 m has an angular momentum of 0.45 kg m<sup>2</sup> s<sup>−1</sup>. What is its angular speed?`,
  eq(`<i>I</i> = ½(10)(0.25)<sup>2</sup> = 0.3125 kg m<sup>2</sup>; &nbsp; ω = ${fr('<i>L</i>', '<i>I</i>')} = ${fr('0.45', '0.3125')} = <b>1.44 rad s<sup>−1</sup></b>`))}
${example('7.4.2', `A 500 g steel rod 30 cm long is pivoted about its centre and rotates at 300 rev min<sup>−1</sup>. What is its angular momentum?`,
  eq(`<i>I</i> = ${fr('1', '12')}<i>mL</i><sup>2</sup> = ${fr('1', '12')}(0.5)(0.3)<sup>2</sup> = 3.75 × 10<sup>−3</sup> kg m<sup>2</sup>; ω = ${fr('300 × 2π', '60')} = 31.4 rad s<sup>−1</sup>; <i>L</i> = <i>I</i>ω = <b>0.118 kg m<sup>2</sup> s<sup>−1</sup></b>`))}
${def('Principle of conservation of angular momentum', `If ${red('no external torque')} acts on a system, its ${red('total angular momentum is conserved')} (constant).`)}
${key(`<i>I</i><sub>1</sub>ω<sub>1</sub> = <i>I</i><sub>2</sub>ω<sub>2</sub>`)}
${two(`<p>An ice skater starts spinning with her arms stretched out. Bringing her arms close to the axis reduces her moment of inertia <i>I</i>; since <i>I</i>ω is constant, her angular velocity ω increases. Divers, acrobats and gymnasts use the same idea.</p>`, F.skater())}
${sim('spin', 'Conservation of angular momentum: the spinning skater', 'Pull the arms in and out. L = Iω stays the same, so when I gets smaller ω gets bigger. The kinetic energy ½Iω² is not conserved: the skater does work pulling her arms in.')}
${example('7.4.3', `A horizontal disc rotates at 100 rpm about a vertical axis through its centre. A 10 g particle is dropped onto the disc 9.0 cm from the axis and sticks. The angular velocity falls to 90 rpm. Find the moment of inertia of the disc.`,
  steps([`No external torque: <i>I</i>ω<sub>0</sub> = (<i>I</i> + <i>mr</i><sup>2</sup>)ω`, `<i>mr</i><sup>2</sup> = (0.010)(0.090)<sup>2</sup> = 8.1 × 10<sup>−5</sup> kg m<sup>2</sup>`, `<i>I</i>(100) = (<i>I</i> + 8.1 × 10<sup>−5</sup>)(90) ⇒ <b><i>I</i> = 7.3 × 10<sup>−4</sup> kg m<sup>2</sup></b>`]))}
${example('7.4.4', `A flywheel (moment of inertia 95 kg m<sup>2</sup>) rotates at 60 rad s<sup>−1</sup>. A coaxial gear wheel (5.0 kg m<sup>2</sup>) is initially at rest. The two are joined together. Calculate the common angular velocity and the heat generated.`,
  steps([`(a) <i>I</i><sub>1</sub>ω<sub>01</sub> + <i>I</i><sub>2</sub>ω<sub>02</sub> = (<i>I</i><sub>1</sub> + <i>I</i><sub>2</sub>)ω ⇒ (95)(60) + 0 = (100)ω ⇒ <b>ω = 57 rad s<sup>−1</sup></b>`, `(b) Heat = loss in rotational kinetic energy = ½(95)(60)<sup>2</sup> − ½(100)(57)<sup>2</sup> = 171 000 − 162 450 = <b>8550 J</b>`]))}
${example('7.4.5', `A mass on a string moves in a circle on a frictionless table; the string passes through a hole in the table. Initially the speed is 2.4 m s<sup>−1</sup> at radius 0.80 m. The string is pulled slowly until the radius is 0.48 m. What is the new speed?`,
  steps([`The pull acts through the axis, so there is no torque: <i>L</i><sub>initial</sub> = <i>L</i><sub>final</sub>`, `<i>mr</i><sub>1</sub><sup>2</sup>ω<sub>1</sub> = <i>mr</i><sub>2</sub><sup>2</sup>ω<sub>2</sub> and <i>v</i> = <i>r</i>ω ⇒ <i>v</i><sub>1</sub><i>r</i><sub>1</sub> = <i>v</i><sub>2</sub><i>r</i><sub>2</sub>`, `<i>v</i><sub>2</sub> = ${fr('(2.4)(0.80)', '0.48')} = <b>4.0 m s<sup>−1</sup></b>`]), fig(F.table()))}
${exercises('Exercise: conservation of angular momentum', [{ q: `A merry-go-round of diameter 4.5 m rotates freely at 0.70 rad s<sup>−1</sup>; its moment of inertia is 1750 kg m<sup>2</sup>. Four people of 65 kg each step onto its edge. What is the new angular velocity?`,
  a: `Δ<i>I</i> = 4(65)(2.25)<sup>2</sup> = 1316 kg m<sup>2</sup>; <i>I</i><sub>2</sub> = 3066 kg m<sup>2</sup>; ω<sub>2</sub> = ${fr('(1750)(0.70)', '3066')} = <b>0.40 rad s<sup>−1</sup></b>` }])}
`)}

${sec('7-5', '7.5 Rotational kinetic energy', `
${def('Rotational kinetic energy', `is the ${red('kinetic energy of a body due to its rotation')}: the sum of the kinetic energies of all its particles, for rotation about a fixed axis (no translation).`)}
${steps([`<i>K</i><sub>R</sub> = ½<i>m</i><sub>1</sub><i>v</i><sub>1</sub><sup>2</sup> + ½<i>m</i><sub>2</sub><i>v</i><sub>2</sub><sup>2</sup> + … + ½<i>m</i><sub>n</sub><i>v</i><sub>n</sub><sup>2</sup>, with <i>v</i> = <i>r</i>ω`, `= ½ω<sup>2</sup>(<i>m</i><sub>1</sub><i>r</i><sub>1</sub><sup>2</sup> + <i>m</i><sub>2</sub><i>r</i><sub>2</sub><sup>2</sup> + … ) = ½(Σ<i>m</i><sub>i</sub><i>r</i><sub>i</sub><sup>2</sup>)ω<sup>2</sup>`])}
${key(`<i>K</i> = ½<i>I</i>ω<sup>2</sup>`)}
${example('7.5.1', `A wheel (uniform disc) of mass 6.0 kg and radius 40 cm rotates at 300 rpm. Calculate its moment of inertia and its rotational kinetic energy.`,
  steps([`ω = ${fr('300 × 2π', '60')} = 31.4 rad s<sup>−1</sup>`, `<i>I</i> = ½<i>mr</i><sup>2</sup> = ½(6.0)(0.40)<sup>2</sup> = <b>0.48 kg m<sup>2</sup></b>`, `<i>K</i> = ½<i>I</i>ω<sup>2</sup> = ½(0.48)(31.4)<sup>2</sup> = <b>2.37 × 10<sup>2</sup> J</b>`]))}
${h4('Linear and rotational quantities compared')}
${table(['Linear motion', 'Rotational motion'], [['displacement, <i>s</i>', 'angular displacement, θ'], ['velocity, <i>v</i>', 'angular velocity, ω'], ['acceleration, <i>a</i>', 'angular acceleration, α'], ['mass, <i>m</i>', 'moment of inertia, <i>I</i>'], ['force, <i>F</i>', 'torque, τ'], ['<i>F</i> = <i>ma</i>', 'τ = <i>I</i>α'], ['momentum, <i>p</i> = <i>mv</i>', 'angular momentum, <i>L</i> = <i>I</i>ω'], ['work, <i>W</i> = <i>Fs</i>', 'work, <i>W</i> = τθ'], ['<i>K</i> = ½<i>mv</i><sup>2</sup>', '<i>K</i> = ½<i>I</i>ω<sup>2</sup>']])}
<p class="ls-small">Relationships: <i>s</i> = <i>r</i>θ, <i>v</i> = <i>r</i>ω, <i>a</i> = <i>r</i>α; ω<sub>ave</sub> = θ/<i>t</i> = (ω + ω<sub>0</sub>)/2.</p>
`)}`;

  // ---------- simulation: spinning skater ----------
  window.PhysiQSims.add('spin', function (root) {
    const { COL, fmt, el, slider, canvas, text, loop, readouts } = window.PhysiQSims.U;
    const S = { L: 6, arm: 1, th: 0, Ibody: 1.0, m: 3 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'arm position (in ↔ out)', 0.15, 1, 0.01, S.arm, '', v => { S.arm = v; });
    slider(ctl, 'angular momentum L', 2, 10, 0.5, S.L, 'kg m²/s', v => { S.L = v; });
    const cv = canvas(root); const ro = readouts(root);
    const I = () => S.Ibody + 2 * S.m * (0.9 * S.arm) ** 2;
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.5, 240, 340), cx = w / 2, cy = h * 0.55, R = Math.min(w, h) * 0.35;
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#EAF3FA'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#D6E4EF'; ctx.beginPath(); ctx.ellipse(cx, cy + R * 0.35, R * 1.2, R * 0.25, 0, 0, 7); ctx.fill();
      const a = 0.9 * S.arm * R, c = Math.cos(S.th), s = Math.sin(S.th);
      // body
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, cy - R * 0.55); ctx.lineTo(cx, cy + R * 0.3); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy - R * 0.68, R * 0.12, 0, 7); ctx.fillStyle = '#F2C48D'; ctx.fill();
      // arms rotate about the vertical axis: show as foreshortened horizontal line
      const y = cy - R * 0.35, x1 = cx + a * c, x2 = cx - a * c, z = s;
      ctx.lineWidth = 5; ctx.strokeStyle = '#B5361C'; ctx.beginPath(); ctx.moveTo(x2, y + 6 * z); ctx.lineTo(x1, y - 6 * z); ctx.stroke();
      [[x1, -z], [x2, z]].forEach(([x, zz]) => { ctx.beginPath(); ctx.arc(x, y - 6 * zz, 8 + 3 * zz, 0, 7); ctx.fillStyle = '#E7B54A'; ctx.fill(); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.2; ctx.stroke(); });
      ctx.setLineDash([4, 4]); ctx.strokeStyle = COL.v; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(cx, cy - R * 0.95); ctx.lineTo(cx, cy + R * 0.5); ctx.stroke(); ctx.setLineDash([]);
      text(ctx, 'axis', cx + 6, cy - R * 0.9, { fs: 11, c: COL.v });
      const om = S.L / I();
      ro([['moment of inertia I', fmt(I(), 2) + ' kg m²'], ['angular velocity ω = L/I', fmt(om, 2) + ' rad/s', 'hl'], ['L = Iω (constant)', fmt(S.L, 2) + ' kg m²/s', 'hl'], ['rotational KE ½Iω²', fmt(0.5 * I() * om * om, 1) + ' J']]);
    }
    loop(cv, dt => { S.th += S.L / I() * dt; draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  window.PhysiQLessons.register('LESSON-7', { html: () => S });
})();
