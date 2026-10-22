/* Chapter 4 Work, Energy and Power: full notes by Cikgu Suhaili (from chapter_4_work.ppt). */
(function () {
  'use strict';
  const { card, dim, fr, sq, vec, half, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4, rw } = window.PhysiQLessons.H;

  const F = {};
  F.work = () => svg(320, 150,
    `<rect x="60" y="70" width="70" height="44" fill="#BDE3E8" stroke="${C.ink}"/>` + L(20, 114, 300, 114, 'k', '', { w: 2 }) +
    L(130, 92, 230, 30, 'r', 'e', { w: 3 }) + L(130, 92, 230, 92, 'o', 'e', { w: 2.4 }) + L(230, 30, 230, 92, 's', '', { d: '3 3', w: 1 }) +
    T(240, 30, 'F', { it: 1, b: 1, a: 'start', c: C.r }) + T(180, 108, 'F cos θ', { fs: 12, c: C.o, b: 1 }) + P('M165,92 A35,35 0 0 0 160,74', 'ink', { w: 1.2 }) + T(170, 84, 'θ', { it: 1, a: 'start' }) +
    L(60, 134, 200, 134, 'v', 'e', { w: 2.4 }) + T(130, 148, 's', { it: 1, b: 1, c: C.v }));
  F.caseArrow = (ang, lab) => svg(200, 90, `<rect x="40" y="40" width="44" height="30" fill="#BDE3E8" stroke="${C.ink}"/>` + L(10, 70, 190, 70, 'k', '', { w: 1.6 }) +
    L(62, 55, 62 + 60 * Math.cos(ang * Math.PI / 180), 55 - 60 * Math.sin(ang * Math.PI / 180), 'r', 'e', { w: 2.6 }) + T(150, 30, lab, { fs: 12 }) + L(100, 84, 170, 84, 'v', 'e', { w: 2 }) + T(178, 88, 's', { it: 1, a: 'start', c: C.v }), 200);
  F.fs1 = () => svg(300, 170, axes(40, 140, 240, 110, 's / m', 'F / N') + P('M40,140 L80,80 L160,80 L200,140', 'r', { w: 2.6 }) + `<path d="M40,140 L80,80 L160,80 L200,140 Z" fill="${C.fill}"/>` +
    L(80, 80, 80, 140, 's', '', { d: '3 3', w: 1 }) + L(160, 80, 160, 140, 's', '', { d: '3 3', w: 1 }) + T(32, 84, '5', { fs: 12, a: 'end' }) + T(80, 156, '5', { fs: 12 }) + T(160, 156, '15', { fs: 12 }) + T(200, 156, '20', { fs: 12 }));
  F.fs2 = () => svg(320, 200, axes(40, 100, 260, 80, 'x / m', 'F / N', { yb: 190 }) +
    `<path d="M40,100 L80,40 L120,100 Z" fill="${C.fill}"/><path d="M120,100 L160,160 L280,100 Z" fill="rgba(242,102,27,.18)"/>` + P('M40,100 L80,40 L120,100 L160,160 L280,100', 'r', { w: 2.6 }) +
    T(32, 44, '6.0', { fs: 11, a: 'end' }) + T(32, 164, '−6.0', { fs: 11, a: 'end' }) + L(36, 160, 160, 160, 's', '', { d: '3 3', w: 1 }) + [['1.0', 80], ['2.0', 120], ['3.0', 160], ['6.0', 280]].map(([t, x]) => T(x, 116, t, { fs: 11 })).join(''));
  F.spring = () => svg(300, 170, axes(40, 140, 230, 110, 'x / m', 'F / N') + `<path d="M40,140 L200,50 L200,140 Z" fill="${C.fill}"/>` + P('M40,140 L200,50', 'r', { w: 2.6 }) +
    L(200, 50, 200, 140, 's', '', { d: '3 3', w: 1 }) + L(40, 50, 200, 50, 's', '', { d: '3 3', w: 1 }) + T(32, 54, 'F', { it: 1, a: 'end' }) + T(200, 156, 'x', { it: 1 }) + T(150, 120, 'area = ½Fx', { fs: 12, c: C.v, b: 1 }));
  F.slope = () => svg(300, 150, L(20, 130, 280, 130, 'k', '', { w: 1.6 }) + L(60, 130, 260, 15, 'k', '', { w: 2 }) +
    `<g transform="rotate(-30 120 96)"><rect x="104" y="80" width="32" height="20" fill="#C8691A" stroke="${C.ink}"/></g>` + L(40, 100, 104, 100, 'k', 'e', { w: 2.6 }) + T(44, 92, '80 N', { fs: 12, b: 1 }) +
    L(130, 88, 210, 42, 'v', 'e', { w: 1.6, d: '4 3' }) + T(176, 52, '2 m', { fs: 12, b: 1 }) + P('M100,130 A40,40 0 0 0 95,111', 'ink', { w: 1.2 }) + T(106, 124, '30°', { fs: 11, a: 'start' }));
  F.incl3 = () => svg(300, 180, `<path d="M40,170 L260,170 L260,40 Z" fill="#BDE3E8" stroke="${C.ink}"/>` + `<g transform="rotate(-30.6 150 105)"><rect x="128" y="88" width="44" height="28" fill="#F5A3E8" stroke="${C.ink}"/></g>` +
    L(60, 116, 128, 116, 'v', 'e', { w: 2.2 }) + T(52, 112, 'F₁', { b: 1, a: 'end' }) + L(118, 52, 140, 86, 'v', 'e', { w: 2.2 }) + T(112, 46, 'F₂', { b: 1 }) + L(172, 92, 222, 64, 'v', 'e', { w: 2.2 }) + T(230, 60, 'F₃', { b: 1, a: 'start' }) + T(84, 164, '30°', { fs: 12, b: 1 }));
  F.track = () => svg(340, 170, L(20, 150, 330, 150, 'g', '', { w: 2 }) + P('M40,40 C70,30 90,140 140,128 C190,116 200,10 230,12 C260,14 290,120 310,150', 'ink', { w: 2.6 }) + dot(40, 38, 8, '#BDE3E8') +
    L(48, 30, 78, 30, 'r', 'e', { w: 2.2 }) + T(64, 22, 'u', { it: 1, b: 1 }) + T(32, 30, 'A', { b: 1, a: 'end' }) + T(140, 146, 'B', { b: 1 }) + T(230, 8, 'C', { b: 1 }) + T(318, 146, 'D', { b: 1, a: 'start' }) + L(26, 40, 26, 150, 'v', 'b', { w: 1.4 }) + T(20, 100, '10 m', { fs: 12, a: 'end' }));
  F.pend = () => svg(260, 200, L(60, 15, 200, 15, 'k', '', { w: 3 }) + L(130, 15, 130, 170, 's', '', { d: '3 3', w: 1 }) + L(130, 15, 60, 125, 'k', '', { w: 1.6 }) + dot(60, 125, 9, '#BDE3E8') + dot(130, 172, 9, '#BDE3E8') +
    L(60, 125, 160, 125, 's', '', { d: '3 3', w: 1 }) + L(170, 125, 170, 172, 'k', 'b', { w: 1.2 }) + T(178, 152, 'h', { it: 1, a: 'start' }) + P('M130,55 A40,40 0 0 1 108,49', 'ink', { w: 1.2 }) + T(116, 70, 'θ', { it: 1 }) + T(86, 70, '180 cm', { fs: 11, a: 'end' }) + L(140, 182, 180, 182, 'r', 'e', { w: 2 }) + T(200, 186, '400 cm/s', { fs: 11, a: 'start' }));

  const S = `
${sec('4-1', '4.1 Work and energy', `
${h4('Work done by a constant force')}
${def('Work done', `is the ${red('product of the component of the force parallel to the displacement and the magnitude of the displacement')}.`)}
${two(key(`<i>W</i> = ${vec('F')} · ${vec('s')} = (<i>F</i> cos θ)<i>s</i>`, '<i>F</i> = magnitude of the constant force, <i>s</i> = magnitude of the displacement, θ = angle between <b>F</b> and <b>s</b>'), fig(F.work()))}
${ul([`Work is a <b>scalar</b>.`, `Dimension: [<i>W</i>] = [<i>F</i>][<i>s</i>] = ${dim('M L^2 T^-2')}.`, `Unit: joule (J); 1 J = 1 N m = 1 kg m<sup>2</sup> s<sup>−2</sup>.`])}
${h4('Work done by a variable force')}
${two(`${key(`<i>W</i> = ∫<sub><i>s</i>₁</sub><sup><i>s</i>₂</sup> <i>F</i> d<i>s</i>`)}<p><b>Work done = area under the <i>F</i>–<i>s</i> graph.</b></p>`, fig(F.fs1()))}
${h4('Applications of W = F s cos θ for a constant force')}
${table(['Case', 'Angle', 'Work done'], [['<b>F</b> in the same direction as <b>s</b>', 'θ = 0°', '<i>W</i> = <i>Fs</i>'], ['Two forces <b>F</b>₁ and <b>F</b>₂ both along <b>s</b>', 'θ = 0°', '<i>W</i> = (<i>F</i>₁ + <i>F</i>₂)<i>s</i> = <i>F</i><sub>net</sub><i>s</i> = <i>ma s</i>'], ['<b>F</b> perpendicular to <b>s</b>', 'θ = 90°', '<i>W</i> = 0'], ['<b>F</b> opposite to <b>s</b>', 'θ = 180°', '<i>W</i> = −<i>Fs</i>']])}
${note('<b>W = 0</b> when <i>F</i> = 0, or <i>s</i> = 0, or θ = 90°.')}
${example('4.1.1', `A physics reference book is pushed 1.20 m along a horizontal table by a horizontal force of 3.00 N. The frictional force is 0.60 N. Calculate the work done by (a) the 3.00 N force, (b) the frictional force, (c) the normal force, and (d) the total work done on the book.`,
  steps([`(a) <i>F</i> = 3.00 N, θ = 0°: <i>W</i> = 3.00 cos 0° (1.20) = <b>3.60 J</b>`, `(b) <i>f</i> = 0.60 N, θ = 180°: <i>W</i> = 0.60 cos 180° (1.20) = <b>−0.72 J</b>`, `(c) <i>R</i>, θ = 90°: <i>W</i> = <i>R</i> cos 90° (1.20) = <b>0 J</b>`, `(d) Σ<i>W</i> = 3.60 − 0.72 + 0 = <b>2.88 J</b>, or Σ<i>W</i> = (<i>F</i> − <i>f</i>) cos 0° <i>s</i> = (3.00 − 0.60)(1.20) = 2.88 J`]))}
${example('4.1.2', `An object is pulled along the ground by a 75 N force directed 28° above the horizontal. How much work does the force do in pulling the object 8.0 m?`,
  eq(`<i>W</i> = <i>F</i> cos θ <i>s</i> = 75 cos 28° (8.0) = <b>0.53 kJ</b>`), fig(F.caseArrow(28, 'F at 28°')))}
${example('4.1.3', `A particle of mass 5 kg lies on a rough slope of angle 30°. A horizontal force of 80 N is applied to it. Find the work done by this force in pushing the particle 2 m up the slope.`,
  `${eq(`The angle between the horizontal force and the displacement up the slope is 30°.<br><i>W</i><sub>F</sub> = <i>F</i> cos θ <i>s</i> = 80 cos 30° (2) = <b>139 J</b>`)}`, fig(F.slope()))}
${exercises('Exercises: work done by a constant force', [
  { q: `A 300 g object slides 80 cm along a horizontal tabletop. How much work is done by friction if the coefficient of kinetic friction is 0.20?`, a: `−0.47 J` },
  { q: `A force of (2<b>i</b> + 3<b>j</b>) N acts through a displacement of (4<b>i</b> + 5<b>j</b>) m. Find the work done.`, a: `23 J` },
  { q: `A block moves 80 cm up a 30° incline under three forces: <i>F</i>₁ = 40 N (horizontal), <i>F</i>₂ = 20 N (perpendicular to the incline) and <i>F</i>₃ = 30 N (along the incline). Calculate the work done by each force.`, f: fig(F.incl3()), a: `<i>W</i>₁ = 28 J, <i>W</i>₂ = 0, <i>W</i>₃ = 24 J` },
  { q: `A 5.00 kg package slides 1.50 m down a ramp inclined at 12.0° below the horizontal; µ<sub>k</sub> = 0.310. Calculate the work done on the package by (a) friction, (b) gravity, (c) the normal force, (d) the total work. (e) If its speed at the top is 2.20 m s<sup>−1</sup>, what is its speed after sliding 1.50 m? (<i>g</i> = 9.81 m s<sup>−2</sup>)`, a: `(a) −22.3 J &nbsp; (b) 15.3 J &nbsp; (c) 0 &nbsp; (d) −7.0 J &nbsp; (e) 1.4 m s<sup>−1</sup>` },
  { q: `A 2.50 kg block is pushed 2.20 m along a frictionless horizontal table by a constant 16.0 N force directed 25.0° below the horizontal. Find the work done by (a) the applied force, (b) the normal force, (c) the gravitational force, (d) all the forces together.`, a: `(a) 31.9 J &nbsp; (b) 0 &nbsp; (c) 0 (both are perpendicular to the displacement) &nbsp; (d) 31.9 J` }])}
${example('4.1.4', `Determine the work done on an object by the force <i>F</i> shown, if the object is displaced from <i>s</i> = 0 to <i>s</i> = 20 m.`,
  eq(`Work done = area under the graph = ½(5)(5) + (10)(5) + ½(5)(5) = <b>75 J</b>`), fig(F.fs1()))}
${example('4.1.5', `Calculate the work done by the variable force shown in the <i>F</i>–<i>x</i> graph.`,
  steps([`Area above the axis (0 to 2.0 m) = ½(2.0)(6.0) = +6.0 J`, `Area below the axis (2.0 to 6.0 m) = ½(4.0)(−6.0) = −12 J`, `Total work = 6.0 − 12 = <b>−6 J</b>`]), fig(F.fs2()))}
`)}

${sec('4-2', '4.2 Conservation of energy', `
${def('Energy', `is ${red('the ability to do work')}. Dimension ${dim('M L^2 T^-2')}, unit joule (J), a scalar.`)}
<p>Two types of <b>mechanical energy</b>: potential energy, <i>U</i>, and kinetic energy, <i>K</i>. Two types of potential energy: gravitational, <i>U</i> = <i>mgh</i>, and elastic (spring), <i>U</i><sub>s</sub> = ½<i>kx</i><sup>2</sup>.</p>
${h4('Gravitational potential energy, U')}
${def('Gravitational potential energy', `is the ${red('energy stored in a body or system because of its position')}.`)}
${key(`<i>U</i> = <i>mgh</i>`, '<i>h</i> = height of the body above the initial (reference) position')}
${h4('Elastic potential energy, U<sub>s</sub>')}
${def('Elastic potential energy', `is the ${red('energy stored in an elastic material as a result of stretching or compressing')} it. Springs store elastic potential energy when compressed or extended.`)}
${def('Hooke’s law', `The restoring force, <i>F</i><sub>s</sub>, of a spring is ${red('directly proportional to the extension or compression')}, <i>x</i>, if the limit of proportionality is not exceeded.`)}
${eq(`<i>F</i><sub>s</sub> ∝ −<i>x</i> &nbsp;⇒&nbsp; <b><i>F</i><sub>s</sub> = −<i>kx</i></b>`)}
${ul([`<i>k</i> = spring constant (force constant); <i>x</i> = <i>x</i><sub>f</sub> − <i>x</i><sub>i</sub>.`, `For calculation, if the object is stationary: <i>F</i><sub>s</sub> = <i>kx</i> = <i>F</i> (the applied force).`, `[<i>k</i>] = ${fr('[<i>F</i><sub>s</sub>]', '[<i>x</i>]')} = ${dim('M T^-2')}; unit kg s<sup>−2</sup> or N m<sup>−1</sup>.`])}
${two(steps([`Work done by <i>F</i> to stretch the spring from its natural length by <i>x</i>: <i>W</i> = ∫<sub>0</sub><sup><i>x</i></sup> <i>F</i> d<i>x</i>, with <i>F</i> = <i>kx</i>`, `<i>W</i> = ∫<sub>0</sub><sup><i>x</i></sup> <i>kx</i> d<i>x</i> = ½<i>kx</i><sup>2</sup>`]) + key(`<i>U</i><sub>s</sub> = ½<i>kx</i><sup>2</sup> = ½<i>F</i><sub>s</sub><i>x</i>`, 'The work done equals the area under the straight-line <i>F</i>–<i>x</i> graph.'), fig(F.spring()))}
${example('4.2.1', `A force of 600 N causes an extension of 10 cm in a spring. Find the elastic potential energy of the spring when (a) the extension is 12 cm, (b) a mass of 20 kg hangs vertically from it. (<i>g</i> = 9.81 m s<sup>−2</sup>)`,
  steps([`<i>k</i> = ${fr('<i>F</i>', '<i>x</i>')} = ${fr('600', '0.1')} = 6000 N m<sup>−1</sup>`, `(a) <i>U</i><sub>s</sub> = ½<i>kx</i><sup>2</sup> = ½(6000)(0.12)<sup>2</sup> = <b>43.2 J</b>`, `(b) <i>mg</i> = <i>kx</i> ⇒ <i>x</i> = ${fr('(20)(9.81)', '6000')} = 3.27 × 10<sup>−2</sup> m; <i>U</i><sub>s</sub> = ½(6000)(3.27 × 10<sup>−2</sup>)<sup>2</sup> = <b>3.21 J</b>`]))}
${exercises('Exercises: springs', [
  { q: `A 10 N force compresses a spring of spring constant 4.0 × 10<sup>2</sup> N m<sup>−1</sup>. What is the compression?`, a: `2.5 cm` },
  { q: `It takes 400 J of work to stretch a spring by 8.00 cm. What is the spring constant?`, a: `1.25 × 10<sup>5</sup> N m<sup>−1</sup>` }])}

${h4('Kinetic energy, K')}
${def('Kinetic energy', `is the ${red('energy of a body due to its motion')}.`)}
${key(`<i>K</i> = ½<i>mv</i><sup>2</sup>`)}
${h4('Work–energy theorem')}
${def('Work–energy theorem', `The ${red('work done by the net force')} on an object (the total work done on it) ${red('equals the change in its kinetic energy')}.`)}
${key(`<i>W</i><sub>total</sub> = Δ<i>K</i> = ½<i>mv</i><sup>2</sup> − ½<i>mu</i><sup>2</sup>`)}
${steps([`A constant net force <i>F</i> acts on mass <i>m</i> through displacement <i>s</i>: <i>F</i> = <i>ma</i>`, `From <i>v</i><sup>2</sup> = <i>u</i><sup>2</sup> + 2<i>as</i>: <i>a</i> = ${fr('<i>v</i><sup>2</sup> − <i>u</i><sup>2</sup>', '2<i>s</i>')}`, `<i>F</i> = <i>m</i>${fr('<i>v</i><sup>2</sup> − <i>u</i><sup>2</sup>', '2<i>s</i>')} ⇒ <i>Fs</i> = ½<i>mv</i><sup>2</sup> − ½<i>mu</i><sup>2</sup> ⇒ <b><i>W</i> = <i>K</i><sub>f</sub> − <i>K</i><sub>i</sub> = Δ<i>K</i></b>`])}
${h4('Work done by a conservative force: W = −ΔU')}
${def('', `The work done by a conservative force is equal to the ${red('negative of the change in potential energy')}.`)}
${ul([`The work done by a <b>conservative</b> force (gravity, a spring) depends only on the initial and final positions; it is independent of the path.`, `The work done against a <b>non-conservative</b> force (friction) depends on the path: the longer the path, the more work is done against friction.`])}
${steps([`When an object falls from <i>h</i>₁ to <i>h</i>₂, gravity does positive work and the potential energy decreases: <i>W</i><sub>g</sub> = <i>mg</i>(<i>h</i>₁ − <i>h</i>₂) = <i>U</i><sub>i</sub> − <i>U</i><sub>f</sub> = −(<i>U</i><sub>f</sub> − <i>U</i><sub>i</sub>) = −Δ<i>U</i>`, `When an object is lifted, gravity does negative work and the potential energy increases: <i>W</i><sub>g</sub> = −<i>mg</i>(<i>h</i>₂ − <i>h</i>₁) = −Δ<i>U</i>`, `For a spring: <i>W</i> = −Δ<i>U</i><sub>s</sub> = −(½<i>kx</i><sub>f</sub><sup>2</sup> − ½<i>kx</i><sub>i</sub><sup>2</sup>)`])}
${example('4.2.2', `A 5.0 kg body is initially at rest on a horizontal frictionless surface. A 15 N force accelerates it to 12 m s<sup>−1</sup>. Calculate (a) the distance travelled, (b) the work done by the force, (c) the final kinetic energy.`,
  steps([`(a) <i>a</i> = ${fr('15', '5.0')} = 3.0 m s<sup>−2</sup>; 12<sup>2</sup> = 0 + 2(3.0)<i>s</i> ⇒ <i>s</i> = <b>24 m</b>`, `(b) <i>W</i> = 15 cos 0° (24) = <b>360 J</b>`, `(c) <i>K</i> = ½(5.0)(12)<sup>2</sup> = <b>360 J</b>, equal to the work done, as the work–energy theorem says`]))}
${example('4.2.3', `How much work is needed for a 65 kg runner to accelerate from rest to 10.0 m s<sup>−1</sup>?`,
  eq(`<i>W</i> = ½<i>mv</i><sup>2</sup> − ½<i>mu</i><sup>2</sup> = ½(65)(10.0)<sup>2</sup> − 0 = <b>3.25 kJ</b>`))}
${example('4.2.4', `A 4.1 kg box of books is lifted vertically from rest through 1.6 m by an upward force of 60.0 N. Find (a) the work done by the applied force, (b) the work done by gravity, (c) the final speed of the box.`,
  steps([`(a) <i>W</i> = 60.0 cos 0° (1.6) = <b>96 J</b>`, `(b) <i>W</i> = (4.1 × 9.81) cos 180° (1.6) = <b>−64 J</b>`, `(c) <i>W</i><sub>total</sub> = 96 − 64 = 32 J = ½(4.1)<i>v</i><sup>2</sup> − 0 ⇒ <b><i>v</i> = 3.9 m s<sup>−1</sup></b>`]))}
${exercises('Exercises: work–energy theorem', [
  { q: `Calculate the force required to stop a 1500 kg car travelling at 10 m s<sup>−1</sup> within 500 m.`, a: `150 N` },
  { q: `A 6.0 kg block initially at rest is pulled along a horizontal frictionless surface by a constant horizontal force of 12 N. Find its speed after it has moved 3.0 m.`, a: `3.5 m s<sup>−1</sup>` },
  { q: `A boy exerts a force of 11.0 N at 29.0° above the horizontal on a 6.40 kg box. Find the work done by the boy and the final speed of the box after it moves 2.00 m, if it starts at 0.500 m s<sup>−1</sup> and slides without friction.`, a: `19.2 J; 2.50 m s<sup>−1</sup>` },
  { q: `An object is released from rest at P on a smooth plane inclined at 30°. At Q its speed is 3.2 m s<sup>−1</sup>. Calculate the length PQ. (<i>g</i> = 9.81 m s<sup>−2</sup>)`, a: `1.0 m` },
  { q: `A 2.00 kg block of ice slides 0.750 m from rest down a frictionless plane inclined at 36.9° below the horizontal. What is its final speed?`, a: `2.97 m s<sup>−1</sup>` }])}

${h4('Principle of conservation of energy')}
${def('Principle of conservation of energy', `In an ${red('isolated (closed) system')}, the ${red('total energy of the system is constant')}. Energy may change form or be transferred from one system to another, but the total remains the same.`)}
${key(`Σ<i>E</i><sub>i</sub> = Σ<i>E</i><sub>f</sub> &nbsp;&nbsp; (no external force)<br>Without friction: <i>E</i> = <i>K</i> + <i>U</i> = constant, so <i>K</i><sub>i</sub> + <i>U</i><sub>i</sub> = <i>K</i><sub>f</sub> + <i>U</i><sub>f</sub>`)}
${note('With friction, part of the mechanical energy becomes heat: <i>K</i><sub>i</sub> + <i>U</i><sub>i</sub> = <i>K</i><sub>f</sub> + <i>U</i><sub>f</sub> + (work done against friction, <i>fs</i>).')}
${sim('energy', 'Energy on a track: kinetic, potential and heat', 'Release the ball from A and watch the energy bars. Without friction the total stays the same and the ball always reaches the same height. Turn on friction and the "heat" bar grows: that is the work done against friction.')}
${example('4.2.5', `A cricket ball of mass 0.156 kg is thrown upward with a kinetic energy of 45 J. What is the maximum height it can reach?`,
  steps([`Σ<i>E</i><sub>i</sub> = Σ<i>E</i><sub>f</sub>: <i>K</i><sub>i</sub> + <i>U</i><sub>i</sub> = <i>K</i><sub>f</sub> + <i>U</i><sub>f</sub> ⇒ 45 + 0 = 0 + <i>mgh</i>`, `<i>h</i> = ${fr('45', '(0.156)(9.81)')} = <b>29.4 m</b>`]))}
${example('4.2.6', `A 1.20 kg piece of cheese is placed on a vertical spring of negligible mass and force constant 1800 N m<sup>−1</sup> that is compressed 15.0 cm. When the spring is released, how high does the cheese rise from its initial position? (The cheese and spring are not attached; <i>g</i> = 9.81 m s<sup>−2</sup>.)`,
  steps([`<i>K</i><sub>i</sub> + <i>U</i><sub>i</sub> + <i>U</i><sub>si</sub> = <i>K</i><sub>f</sub> + <i>U</i><sub>f</sub> + <i>U</i><sub>sf</sub> ⇒ 0 + <i>mgh</i>₁ + ½<i>kx</i><sup>2</sup> = 0 + <i>mgh</i>₂ + 0`, `½<i>kx</i><sup>2</sup> = <i>mg</i>(<i>h</i>₂ − <i>h</i>₁) = <i>mg</i>Δ<i>h</i>`, `Δ<i>h</i> = ${fr('½(1800)(0.15)<sup>2</sup>', '(1.20)(9.81)')} = <b>1.72 m</b>`]))}
${h4('A real example: the bungee jump')}
${ul([`From the platform to the point where the cord becomes tight, the jumper falls freely: gravitational potential energy → kinetic energy.`, `After that, the cord stretches like a spring: kinetic and gravitational potential energy → <b>elastic potential energy</b> ½<i>kx</i><sup>2</sup>.`, `The jumper is fastest where the cord's pull equals the weight (<i>kx</i> = <i>mg</i>), not where the cord first tightens. At the lowest point the speed is zero and all the energy lost from gravitational PE is stored in the cord.`])}
${sim('bungee', 'Bungee jump: where does the energy go?', 'Change the jumper\'s mass and the stiffness of the cord, then jump. Watch the energy bars: the total stays the same (apart from a little lost to air resistance) while it moves between gravitational, kinetic and elastic potential energy.')}
${example('4.2.7', `A 60 kg jumper uses a bungee cord of unstretched length 20 m and force constant 200 N m<sup>−1</sup>. Ignoring air resistance, find (a) how far the cord stretches at the lowest point, (b) the jumper's greatest speed.`,
  steps([`(a) Lowest point (speed zero): loss of GPE = elastic PE: <i>mg</i>(20 + <i>x</i>) = ½<i>kx</i><sup>2</sup> ⇒ (60)(9.81)(20 + <i>x</i>) = 100<i>x</i><sup>2</sup>`, `100<i>x</i><sup>2</sup> − 589<i>x</i> − 11 772 = 0 ⇒ <i>x</i> = <b>14.2 m</b> (total fall 34.2 m)`, `(b) Greatest speed where <i>kx</i> = <i>mg</i>: <i>x</i> = ${fr('(60)(9.81)', '200')} = 2.94 m`, `½<i>mv</i><sup>2</sup> = <i>mg</i>(20 + 2.94) − ½<i>kx</i><sup>2</sup> = 13 503 − 864 = 12 639 J ⇒ <i>v</i> = <b>20.5 m s<sup>−1</sup></b>`]))}
${exercises('Exercises: conservation of energy', [
  { q: `A body of mass 5 kg slides from rest down a smooth slope. Find its speed after it has fallen a vertical distance of 10 m.`, a: `14 m s<sup>−1</sup>` },
  { q: `A smooth wire is bent into a circle of radius <i>a</i> held in a vertical plane. A bead threaded on the wire is released from rest at the highest point. Find its speed at the lowest point.`, a: `${sq('4<i>ag</i>')}` },
  { q: `A 1.70 kg block slides on a horizontal frictionless surface into a spring of force constant 955 N m<sup>−1</sup>. The block stops after compressing the spring 4.60 cm. Find its initial speed.`, a: `1.09 m s<sup>−1</sup>` },
  { q: `A 0.50 kg ball is at A, 10 m high, with initial speed 4 m s<sup>−1</sup> (no friction). Calculate (a) the total energy at A, (b) the speed at B, 3 m high, (c) the speed at D on the ground, (d) the maximum height of C so that the ball can pass over it.`, f: fig(F.track()), a: `(a) 53.1 J &nbsp; (b) 12.4 m s<sup>−1</sup> &nbsp; (c) 14.6 m s<sup>−1</sup> &nbsp; (d) 10.8 m` },
  { q: `A ball on the end of a 180 cm string swings as a pendulum. Its speed at the lowest position is 400 cm s<sup>−1</sup>. (a) To what height <i>h</i> above this position does it rise before stopping? (b) What angle does the string then make with the vertical?`, f: fig(F.pend()), a: `(a) 0.816 m &nbsp; (b) 56.9°` },
  { q: `A 0.50 kg ball is thrown vertically upward with an initial kinetic energy of 80 J. Taking the launch point as the zero of potential energy, find (a) its kinetic and potential energies when it has travelled three-quarters of the way to its maximum height, (b) its speed there.`, a: `(a) <i>K</i> = 20 J, <i>U</i> = 60 J &nbsp; (b) 8.9 m s<sup>−1</sup>` }])}
`)}

${sec('4-3', '4.3 Power and mechanical efficiency', `
${def('Power', `is the ${red('rate of doing work')} or the ${red('rate of energy transfer')}.`)}
${two(key(`<i>P</i><sub>av</sub> = ${fr('Δ<i>W</i>', 'Δ<i>t</i>')} = ${fr('Δ<i>E</i>', 'Δ<i>t</i>')}`, 'Average power'), key(`<i>P</i> = lim<sub style="font-size:.7em">Δ<i>t</i>→0</sub> ${fr('Δ<i>W</i>', 'Δ<i>t</i>')} = ${fr('d<i>W</i>', 'd<i>t</i>')}`, 'Instantaneous power'))}
${ul([`Power is a <b>scalar</b>.`, `[<i>P</i>] = ${fr('[Δ<i>W</i>]', '[Δ<i>t</i>]')} = ${fr(dim('M L^2 T^-2'), dim('T'))} = ${dim('M L^2 T^-3')}; unit kg m<sup>2</sup> s<sup>−3</sup> = J s<sup>−1</sup> = watt (W).`])}
${steps([`<i>P</i> = ${fr('d<i>W</i>', 'd<i>t</i>')} = ${fr('(<i>F</i> cos θ) d<i>s</i>', 'd<i>t</i>')} and ${fr('d<i>s</i>', 'd<i>t</i>')} = <i>v</i>`])}
${key(`<i>P</i> = <i>Fv</i> cos θ = ${vec('F')} · ${vec('v')}`)}
${example('4.3.1', `A 1200 kg car can accelerate from rest to 25 m s<sup>−1</sup> in 8.0 s. What average power must the motor produce? (Ignore friction.)`,
  eq(`<i>P</i><sub>av</sub> = ${fr('<i>K</i><sub>f</sub> − <i>K</i><sub>i</sub>', 'Δ<i>t</i>')} = ${fr('½(1200)(25)<sup>2</sup> − 0', '8.0')} = <b>47 kW</b>`))}
${example('4.3.2', `An elevator of mass 1 Mg carries 10 passengers through a height of 15 m in 40 s. Calculate the average power required by the motor if no energy is lost. (<i>g</i> = 9.81 m s<sup>−2</sup>; average mass per passenger 60 kg)`,
  steps([`<i>M</i> = 1000 + (60 × 10) = 1600 kg`, `Work done = change in potential energy = <i>mgh</i><sub>f</sub> − <i>mgh</i><sub>i</sub>, with <i>h</i><sub>i</sub> = 0`, `<i>P</i> = ${fr('<i>Mgh</i>', 'Δ<i>t</i>')} = ${fr('(1600)(9.81)(15)', '40')} = <b>5886 W</b>`]))}
${example('4.3.3', `A 100 kg block is pulled at a constant 5.0 m s<sup>−1</sup> across a horizontal floor by a 122 N force at 37° above the horizontal. At what rate does the force do work on the block?`,
  eq(`<i>P</i> = <i>Fv</i> cos θ = (122)(5.0) cos 37° = <b>487 W</b>`))}
${exercises('Exercises: power', [
  { q: `A 50 kg person runs 200 m up a straight road inclined at 20° in 50 s. Neglecting friction and air resistance, calculate (a) the work done, (b) the average power. (<i>g</i> = 9.81 m s<sup>−2</sup>)`, a: `(a) 3.36 × 10<sup>4</sup> J &nbsp; (b) 672 W` },
  { q: `You push a 75 kg box across a floor where µ<sub>k</sub> = 0.65 with a horizontal force. (a) How much power is needed to push it at 0.50 m s<sup>−1</sup>? (b) How much work do you do in 35.0 s?`, a: `(a) 240 W &nbsp; (b) 8.4 kJ` }])}
${h4('Mechanical efficiency')}
${def('Efficiency, η', `is the ${red('ratio of the useful work done (output) to the energy input')}.`)}
${key(`η = ${fr('<i>W</i><sub>out</sub>', '<i>E</i><sub>in</sub>')} × 100% = ${fr('<i>P</i><sub>out</sub>', '<i>P</i><sub>in</sub>')} × 100%`)}
${example('4.3.4', `An electric motor with a 2.0 horsepower input drives a machine with an efficiency of 45%. What is the energy output of the machine per second? (1 hp = 746 W)`,
  eq(`0.45 = ${fr('<i>P</i><sub>out</sub>', '2.0 × 746')} ⇒ <i>P</i><sub>out</sub> = 6.71 × 10<sup>2</sup> W, so <b>6.71 × 10<sup>2</sup> J</b> per second`))}
${example('4.3.5', `A machine lifts a 10 kg load through 2.5 m. The machine needs a force of 150 N to move 2 m. Determine its efficiency.`,
  steps([`<i>W</i><sub>in</sub> = <i>F</i> cos θ <i>s</i> = 150 cos 0° (2) = 300 J`, `<i>W</i><sub>out</sub> = <i>mgh</i> = (10)(9.81)(2.5) = 245 J`, `η = ${fr('245', '300')} × 100% = <b>81.7%</b>`]))}
${exercises('Exercises: efficiency', [
  { q: `The motor of an electric drill with an efficiency of 80% has a power input of 600 W. How much useful work is done by the drill in 30 s?`, a: `1.4 × 10<sup>4</sup> J` },
  { q: `A hoist lifts a 3000 kg load through 8.00 m in 20.0 s. The power supplied to the engine is 18.0 hp. Calculate (a) the work output, (b) the power output and power input, (c) the efficiency of the engine and hoist. (1 hp = 746 W)`, a: `(a) 235 kJ &nbsp; (b) 11.8 kW; 13.4 kW &nbsp; (c) 87.7%` }])}
`)}

${sec('4-rw', 'Real-World Physics: the Nepal glacier collapse', rw({
  id: 'ls-4-rw-nepal',
  meta: 'Langtang, Nepal · 26 August 2026',
  title: 'When a glacier falls 1200 m: energy on a mountain scale',
  lead: `<p>On 26 August 2026 a large section of glacier ice and rock broke away from Langtang Lirung, north of Kathmandu, at about 5200 m and plunged about <b>1200 m</b> to the valley floor. It became a debris flow and flash flood that travelled almost 100 km down the Bhote Koshi–Trishuli valley, destroying roads, bridges and hydropower plants. More than 1400 people died.</p><p>The impact was so violent that seismometers recorded it like a magnitude 5.2 earthquake. Scientists estimate the falling mass at about <b>5 × 10<sup>8</sup> tonnes</b> of rock and ice.</p>`,
  video: { id: 'Ss9fMd9C8os', title: 'Why Nepal’s 2026 Flood Was Too Big for Any Single Defense', channel: 'DT Terra', len: '19:04' },
  watch: 'look for the moment the rock and ice accelerate down the slope, and notice how the debris carries enough energy and momentum to destroy bridges far downstream.',
  physics: ul([`Falling through height <i>h</i>, the mass loses gravitational potential energy <i>mgh</i>. The <b>work done by gravity</b> is converted mostly into kinetic energy.`, `Work is also done <b>against friction</b> with the slope and the air, so part of the energy becomes internal energy (heat) and sound. This is why the real debris is slower than the “no friction” value.`, `<b>Power</b> = rate of energy transfer. Releasing an enormous amount of energy in only minutes gives an enormous power.`]) + note(`Data used below: <i>m</i> ≈ 5.0 × 10<sup>11</sup> kg, <i>h</i> ≈ 1200 m, <i>g</i> = 9.81 m s<sup>−2</sup>. These are reported estimates, rounded for calculation.`),
  qs: [
    { q: `Calculate the loss of gravitational potential energy of the falling rock and ice.`, opts: ['5.9 × 10<sup>12</sup> J', '5.9 × 10<sup>14</sup> J', '5.9 × 10<sup>15</sup> J', '7.1 × 10<sup>18</sup> J'], ans: 2,
      why: steps([`Δ<i>U</i> = <i>mgh</i>`, `= (5.0 × 10<sup>11</sup>)(9.81)(1200)`, `= <b>5.9 × 10<sup>15</sup> J</b>`]) },
    { q: `If all the potential energy lost became kinetic energy, what would be the speed of the debris at the valley floor?`, opts: ['49 m s<sup>−1</sup>', '110 m s<sup>−1</sup>', '153 m s<sup>−1</sup>', '2.35 × 10<sup>4</sup> m s<sup>−1</sup>'], ans: 2,
      why: steps([`½<i>mv</i><sup>2</sup> = <i>mgh</i> &nbsp;⇒&nbsp; <i>v</i> = √(2<i>gh</i>) (the mass cancels)`, `= √(2 × 9.81 × 1200)`, `= <b>153 m s<sup>−1</sup></b>`]) },
    { q: `The actual speed of the debris was much less than the value in Quick check 2. Which statement best explains this?`, opts: ['Work is done against friction and air resistance, so part of the potential energy is converted into internal energy and sound.', 'The total energy of the system decreases as the debris falls.', 'Gravitational potential energy depends on the speed of the falling object.', 'The kinetic energy of the debris is converted back into gravitational potential energy.'], ans: 0,
      why: `<p>Energy is conserved: loss of potential energy = gain in kinetic energy + work done against friction (internal energy, sound, and energy transferred to the ground). Only part of <i>mgh</i> appears as kinetic energy.</p>` },
    { q: `Assume the energy in Quick check 1 is released over 2.0 minutes. What is the average power?`, opts: ['4.9 × 10<sup>10</sup> W', '4.9 × 10<sup>13</sup> W', '2.9 × 10<sup>15</sup> W', '7.1 × 10<sup>17</sup> W'], ans: 1,
      why: steps([`<i>P</i> = ${fr('<i>E</i>', '<i>t</i>')}`, `= ${fr('5.9 × 10<sup>15</sup>', '2.0 × 60')}`, `= <b>4.9 × 10<sup>13</sup> W</b>`]) }
  ],
  src: `Sources: Reuters; BBC Verify; Al Jazeera; USGS (reports from August–October 2026). Video by an independent channel: preview before use in class. <a href="https://www.youtube.com/watch?v=Ss9fMd9C8os" target="_blank" rel="noopener">youtube.com/watch?v=Ss9fMd9C8os</a>`
}))}`;

  // ---------- simulation: energy on a track ----------
  window.PhysiQSims.add('energy', function (root) {
    const { COL, fmt, clamp, el, slider, toggle, button, canvas, text, loop, readouts } = window.PhysiQSims.U;
    const g = 9.81, m = 0.5;
    const S = { u: 4, hC: 9, f: 0, fric: false, s: 0, dir: 1, v: 0, heat: 0, play: false, done: false };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'speed at A', 0, 8, 0.5, S.u, 'm/s', v => { S.u = v; reset(); });
    slider(ctl, 'height of hill C', 4, 14, 0.5, S.hC, 'm', v => { S.hC = v; build(); reset(); });
    const sf = slider(ctl, 'friction force', 0, 1.5, 0.05, 0.3, 'N', v => { S.f = v; if (S.fric) reset(); });
    const cv = canvas(root), bars = canvas(root);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const playB = button(bar, '▶ Release', 'sm-main', () => { if (S.done) reset(); S.play = !S.play; upd(); });
    button(bar, '↺ Reset', '', () => reset());
    toggle(bar, 'Friction', S.fric, v => { S.fric = v; reset(); });
    const ro = readouts(root);
    S.f = 0.3;
    let pts = [], len = 0;
    function build() {
      const ctrl = [[0, 10], [8, 9.4], [20, 3], [31, S.hC], [42, 1], [50, 0], [56, 0]];
      pts = []; // Catmull-Rom through control points
      for (let i = 0; i < ctrl.length - 1; i++) {
        const p0 = ctrl[Math.max(0, i - 1)], p1 = ctrl[i], p2 = ctrl[i + 1], p3 = ctrl[Math.min(ctrl.length - 1, i + 2)];
        for (let k = 0; k < 40; k++) { const t = k / 40, t2 = t * t, t3 = t2 * t; const f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3); pts.push([f(p0[0], p1[0], p2[0], p3[0]), Math.max(0, f(p0[1], p1[1], p2[1], p3[1]))]); }
      }
      pts.push(ctrl[ctrl.length - 1]);
      let acc = 0; pts[0][2] = 0; for (let i = 1; i < pts.length; i++) { acc += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); pts[i][2] = acc; } len = acc;
    }
    function at(s) { s = clamp(s, 0, len); let i = pts.findIndex(p => p[2] >= s); if (i <= 0) return pts[0]; const a = pts[i - 1], b = pts[i], t = (s - a[2]) / ((b[2] - a[2]) || 1); return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; }
    const E0 = () => 0.5 * m * S.u * S.u + m * g * 10;
    function upd() { playB.textContent = S.play ? '❚❚ Pause' : (S.done ? '▶ Release again' : '▶ Release'); }
    function reset() { S.s = 0; S.dir = 1; S.v = S.u; S.heat = 0; S.lastTurn = null; S.play = false; S.done = false; upd(); draw(); }
    function step(dt) {
      for (let n = 0; n < 20; n++) {
        const h = dt / 20;
        S.s += S.dir * Math.max(S.v, 0.15) * h; const fr = S.fric ? S.f : 0; S.heat += fr * Math.max(S.v, 0.15) * h;
        if (S.s >= len) { S.s = len; S.done = true; break; }
        if (S.s <= 0) { S.s = 0; S.dir = 1; }
        const K = E0() - m * g * at(S.s)[1] - S.heat;
        if (K <= 0) { S.v = 0; S.dir = -S.dir; if (S.lastTurn != null && Math.abs(S.s - S.lastTurn) < 0.08) { S.done = true; break; } S.lastTurn = S.s; } else S.v = Math.sqrt(2 * K / m);
      }
      if (S.done) { S.play = false; upd(); }
    }
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.45, 220, 360);
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#EEF5FB'; ctx.fillRect(0, 0, w, h);
      const sc = Math.min((w - 60) / 56, (h - 50) / 15), X = x => 40 + x * sc, Y = y => h - 26 - y * sc;
      ctx.fillStyle = '#7BAE4E'; ctx.fillRect(0, Y(0), w, h - Y(0));
      ctx.strokeStyle = COL.grid || '#E3E6D8'; ctx.lineWidth = 1; for (let y = 0; y <= 14; y += 2) { ctx.beginPath(); ctx.moveTo(30, Y(y)); ctx.lineTo(w - 6, Y(y)); ctx.stroke(); text(ctx, y + '', 26, Y(y) + 4, { a: 'right', fs: 10, c: COL.sub }); }
      text(ctx, 'height / m', 6, 12, { fs: 10, c: COL.sub, it: 1 });
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 3; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(X(p[0]), Y(p[1])) : ctx.moveTo(X(p[0]), Y(p[1]))); ctx.stroke();
      [['A', 0], ['B', 20], ['C', 31], ['D', 50]].forEach(([n, x]) => { const p = pts.reduce((b, q) => Math.abs(q[0] - x) < Math.abs(b[0] - x) ? q : b); text(ctx, n, X(p[0]), Y(p[1]) - 10, { a: 'center', b: 1 }); });
      const hReach = (E0() - S.heat) / (m * g);
      ctx.setLineDash([5, 4]); ctx.strokeStyle = COL.v; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(30, Y(Math.min(hReach, 15))); ctx.lineTo(w - 6, Y(Math.min(hReach, 15))); ctx.stroke(); ctx.setLineDash([]);
      text(ctx, 'highest point the ball can reach now: ' + fmt(hReach, 1) + ' m', w - 8, Y(Math.min(hReach, 15)) - 5, { a: 'right', fs: 11, c: COL.v, b: 1 });
      const p = at(S.s); ctx.beginPath(); ctx.arc(X(p[0]), Y(p[1]) - 8, 8, 0, 7); ctx.fillStyle = '#BDE3E8'; ctx.fill(); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.4; ctx.stroke();
      if (S.done) text(ctx, S.s >= len ? 'reached D' : 'stopped: all energy left as heat and PE', 12, 18, { b: 1, fs: 12, c: COL.o });
      // bars
      const b = bars.ctx, { w: W } = bars.size(0, 130, 130); b.clearRect(0, 0, W, 130);
      const K = 0.5 * m * S.v * S.v, U = m * g * p[1], items = [['kinetic K', K, COL.r], ['potential U', U, COL.v], ['heat (work against friction)', S.heat, COL.o], ['total', K + U + S.heat, COL.ink]];
      const bw = Math.min(140, (W - 40) / 4 - 14), max = E0();
      items.forEach(([n, v2, c], i) => { const x = 20 + i * (bw + 14), hh = clamp(v2 / max, 0, 1) * 80; b.fillStyle = c; b.fillRect(x, 100 - hh, bw, hh); text(b, fmt(v2, 1) + ' J', x + bw / 2, 94 - hh, { a: 'center', fs: 11, b: 1 }); text(b, n, x + bw / 2, 116, { a: 'center', fs: 11, c: COL.sub }); });
      ro([['speed', fmt(S.v, 2) + ' m/s'], ['height', fmt(p[1], 2) + ' m'], ['total energy at A', fmt(E0(), 1) + ' J', 'hl'], ['work done against friction', fmt(S.heat, 1) + ' J', S.fric ? 'ao' : '']]);
    }
    build();
    loop(cv, dt => { if (S.play) { step(dt * 1.2); draw(); } });
    new ResizeObserver(() => draw()).observe(root);
    sf.set(0.3); reset();
  });

  window.PhysiQLessons.register('LESSON-4', { html: () => S });
  // ---------- bungee jump ----------
  window.PhysiQSims.add('bungee', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts, loop } = window.PhysiQSims.U;
    const g = 9.81, L0 = 20, H = 60;
    const S = { m: 60, k: 200, y: 0, v: 0, run: false, t: 0, trail: [] };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'mass of the jumper', 40, 100, 5, S.m, 'kg', x => { S.m = x; reset(); });
    slider(ctl, 'stiffness of the cord k', 100, 400, 20, S.k, 'N m⁻¹', x => { S.k = x; reset(); });
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    button(bar, '🪂 Jump', '', () => { reset(); S.run = true; });
    button(bar, 'Reset', '', () => reset());
    const cv = canvas(root); const ro = readouts(root);
    function reset() { S.y = 0; S.v = 0; S.run = false; S.t = 0; S.trail = []; }
    const xmax = () => { const a = S.k / 2, b = -S.m * g, c = -S.m * g * L0; return (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a); };
    function frame(dt) {
      if (dt < 0) dt = 0;
      if (S.run) { const n = 8, h = Math.min(dt, 0.05) * 1.5 / n; for (let i = 0; i < n; i++) { const x = Math.max(0, S.y - L0), a = g - (S.k * x) / S.m - 0.02 * S.v * Math.abs(S.v) / S.m * 2; S.v += a * h; S.y += S.v * h; } S.t += dt; S.trail.push(S.y); if (S.trail.length > 300) S.trail.shift(); }
      const x = Math.max(0, S.y - L0), Ug = S.m * g * (H - S.y), K = 0.5 * S.m * S.v * S.v, Ue = 0.5 * S.k * x * x, Etot = S.m * g * H;
      const ctx = cv.ctx, narrow = root.clientWidth < 520, { w, h } = narrow ? cv.size(1.45, 540, 620) : cv.size(0.55, 300, 380); ctx.clearRect(0, 0, w, h);
      const sky = ctx.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, '#BFE0F5'); sky.addColorStop(1, '#EAF4E0'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
      const top = 30, bot = narrow ? h - 175 : h - 20, sc = (bot - top) / H, bx = narrow ? w * 0.3 : w * 0.22;
      // bridge, river
      ctx.fillStyle = '#8A6A4A'; ctx.fillRect(bx - 60, top - 10, 120, 10); ctx.fillStyle = '#4A90C2'; ctx.fillRect(0, bot - 6, w, 26);
      // marks
      ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(bx - 50, top + L0 * sc); ctx.lineTo(bx + 60, top + L0 * sc); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'cord tight below here', bx + 62, top + L0 * sc + 4, { fs: 10, c: COL.sub });
      const xm = xmax(); ctx.strokeStyle = 'rgba(192,57,43,.5)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(bx - 50, top + (L0 + xm) * sc); ctx.lineTo(bx + 60, top + (L0 + xm) * sc); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'lowest point', bx + 62, top + (L0 + xm) * sc + 4, { fs: 10, c: COL.r });
      // cord (wavy when slack) and jumper
      const jy = top + S.y * sc;
      ctx.strokeStyle = x > 0 ? '#C0392B' : '#E07B39'; ctx.lineWidth = x > 0 ? 2.2 : 1.6; ctx.beginPath(); ctx.moveTo(bx, top);
      if (x > 0) ctx.lineTo(bx, jy - 10); else { const segs = 10; for (let i = 1; i <= segs; i++) { const yy = top + (jy - 10 - top) * i / segs; ctx.lineTo(bx + (i % 2 ? 6 : -6) * (1 - S.y / L0), yy); } }
      ctx.stroke();
      ctx.fillStyle = '#F1C27D'; ctx.beginPath(); ctx.arc(bx, jy + 14, 7, 0, 7); ctx.fill(); ctx.strokeStyle = '#2C6BB3'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(bx, jy - 10); ctx.lineTo(bx, jy + 6); ctx.stroke();
      // energy bars
      const ex = narrow ? 30 : w * 0.5, ew = narrow ? w - 60 : w * 0.45, eh = narrow ? 105 : h * 0.5, ey = narrow ? bot + 45 : top + 20;
      if (!narrow || true) { const bars = [['GPE', Ug, '#6A63EC'], ['KE', K, '#F2661B'], ['elastic PE', Ue, '#3E8E1E'], ['total', Ug + K + Ue, '#1C2230']]; const bw = ew / bars.length;
        ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fillRect(ex - 8, ey - 18, ew + 16, eh + 40);
        bars.forEach(([n, E, c], i) => { const hh = Math.max(0, E / Etot) * eh; ctx.fillStyle = c; ctx.fillRect(ex + i * bw + 8, ey + eh - hh, bw - 16, hh); text(ctx, n, ex + i * bw + bw / 2, ey + eh + 14, { a: 'center', fs: 10.5, b: 1, c }); });
        text(ctx, 'energy (relative to the river)', ex, ey - 4, { fs: 11, b: 1 }); }
      ro([['fallen so far', fmt(S.y, 1) + ' m', 'hl'], ['speed', fmt(Math.abs(S.v), 1) + ' m s⁻¹', 'hl'], ['cord stretch x', fmt(x, 1) + ' m'], ['lowest point: stretch from mg(L+x) = ½kx²', fmt(xm, 1) + ' m'], ['fastest where kx = mg, at stretch', fmt(S.m * g / S.k, 2) + ' m']]);
    }
    loop(cv, frame);
  });
})();
