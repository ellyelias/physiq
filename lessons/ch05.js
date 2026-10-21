/* Chapter 5 Circular Motion: full notes by Cikgu Suhaili (from unit_6_circular_motion.pdf).
   Numbered as Chapter 5 to follow the STPM 2026 syllabus (5.1 angular displacement and velocity, 5.2 centripetal acceleration, 5.3 centripetal force). */
(function () {
  'use strict';
  const { card, fr, sq, vec, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4 } = window.PhysiQLessons.H;

  const F = {};
  F.arc = () => svg(260, 200, `<circle cx="110" cy="110" r="80" fill="none" stroke="${C.sub}" stroke-width="1.4"/>` + dot(110, 110, 4, C.ink) +
    L(110, 110, 190, 110, 'k', '', { w: 1.6 }) + L(110, 110, 166.6, 53.4, 'k', '', { w: 1.6 }) + dot(190, 110, 6, '#E05A5A') + dot(166.6, 53.4, 6, '#E05A5A') +
    P('M190,110 A80,80 0 0 0 166.6,53.4', 'v', { w: 3.4 }) + P('M140,110 A30,30 0 0 0 131,89', 'ink', { w: 1.2 }) + T(148, 100, 'θ', { it: 1, b: 1, a: 'start' }) +
    T(200, 114, 'A', { b: 1, a: 'start' }) + T(172, 46, 'B', { b: 1, a: 'start' }) + T(196, 78, 's', { it: 1, b: 1, c: C.v, a: 'start' }) + T(150, 74, 'r', { it: 1 }) + T(150, 126, 'r', { it: 1 }));
  F.dv = () => svg(380, 190, `<circle cx="100" cy="100" r="75" fill="none" stroke="${C.sub}" stroke-width="1.2"/>` + dot(100, 100, 3, C.ink) +
    L(100, 100, 165, 62.5, 'k', '', { w: 1.2 }) + L(100, 100, 165, 137.5, 'k', '', { w: 1.2 }) + dot(165, 62.5, 5, C.ball) + dot(165, 137.5, 5, C.ball) +
    L(165, 137.5, 210, 59.6, 'v', 'e', { w: 2.4 }) + L(165, 62.5, 120, -15.4 + 62.5 + 62.5 - 47, 'r', 'e', { w: 2.4 }) + T(214, 62, 'v₁', { it: 1, a: 'start', c: C.v }) + T(118, 40, 'v₂', { it: 1, c: C.r }) +
    T(122, 92, 'Δθ', { fs: 12 }) + T(100, 182, 'Δv points towards the centre', { fs: 12, c: C.sub }) +
    L(270, 160, 300, 70, 'v', 'e', { w: 2.4 }) + L(270, 160, 240, 70, 'r', 'e', { w: 2.4 }) + L(300, 70, 242, 72, 'g', 'e', { w: 2.6 }) + T(300, 120, 'v₁', { it: 1, c: C.v, a: 'start' }) + T(240, 120, 'v₂', { it: 1, c: C.r, a: 'end' }) + T(272, 60, 'Δv = v₂ − v₁', { fs: 12, c: C.g, b: 1 }));
  F.belt = () => svg(320, 150, `<circle cx="90" cy="75" r="60" fill="#E8EEF7" stroke="${C.ink}" stroke-width="1.6"/><circle cx="250" cy="75" r="15" fill="#E8EEF7" stroke="${C.ink}" stroke-width="1.6"/>` +
    L(90, 15, 250, 60, 'k', '', { w: 1.6 }) + L(90, 135, 250, 90, 'k', '', { w: 1.6 }) + T(90, 80, 'r₁ = 0.5 m', { fs: 12 }) + T(250, 116, 'r₂ = 0.125 m', { fs: 12 }));
  F.horiz = () => svg(320, 150, `<ellipse cx="160" cy="70" rx="140" ry="40" fill="none" stroke="${C.g}" stroke-width="1.4" stroke-dasharray="6 5"/>` + dot(160, 70, 4, C.ink) +
    L(160, 70, 290, 70, 'k', '', { w: 1.4 }) + dot(292, 70, 9, '#E7B54A') + L(282, 70, 220, 70, 'r', 'e', { w: 2.8 }) + T(240, 62, 'T', { it: 1, b: 1, c: C.r }) + L(292, 80, 292, 130, 'v', 'e', { w: 2.4 }) + T(300, 120, 'mg', { it: 1, b: 1, a: 'start', c: C.v }));
  F.flat = () => svg(260, 180, `<rect x="90" y="70" width="80" height="40" rx="8" fill="#E05A5A"/>` + L(30, 118, 230, 118, 'k', '', { w: 2 }) + L(130, 90, 130, 20, 'v', 'e', { w: 2.4 }) + T(138, 28, 'R', { it: 1, b: 1, a: 'start' }) +
    L(130, 90, 130, 165, 'v', 'e', { w: 2.4 }) + T(138, 160, 'mg', { it: 1, b: 1, a: 'start' }) + L(130, 112, 50, 112, 'r', 'e', { w: 2.8 }) + T(56, 104, 'fₛ (towards centre)', { fs: 11, a: 'start', c: C.r }));
  F.bank = () => svg(280, 200, `<path d="M20,170 L250,170 L250,70 Z" fill="#D9D9D9" stroke="${C.ink}"/>` + `<g transform="rotate(-23.5 150 128)"><rect x="115" y="110" width="70" height="30" rx="6" fill="#E05A5A"/></g>` +
    L(150, 125, 116, 47, 'v', 'e', { w: 2.6 }) + T(108, 42, 'R', { it: 1, b: 1 }) + L(150, 125, 150, 195, 'v', 'e', { w: 2.4 }) + T(158, 192, 'mg', { it: 1, b: 1, a: 'start' }) +
    L(116, 47, 116, 125, 's', '', { d: '3 3', w: 1 }) + L(150, 125, 116, 125, 'r', 'e', { w: 2 }) + T(76, 130, 'R sin θ', { fs: 11, c: C.r }) + T(124, 82, 'R cos θ', { fs: 11, a: 'start', c: C.sub }) + P('M70,170 A50,50 0 0 0 66,151', 'ink', { w: 1.2 }) + T(80, 162, 'θ', { it: 1, a: 'start' }));
  F.cone = () => svg(260, 220, L(80, 15, 180, 15, 'k', '', { w: 3 }) + L(130, 15, 130, 175, 's', '', { d: '3 3', w: 1 }) + L(130, 15, 70, 160, 'k', '', { w: 1.6 }) +
    `<ellipse cx="130" cy="160" rx="60" ry="14" fill="none" stroke="${C.g}" stroke-dasharray="5 4"/>` + dot(70, 160, 9, '#2A2A2A') + L(70, 160, 130, 160, 'r', 'e', { w: 2 }) + T(100, 152, 'r', { it: 1, c: C.r }) +
    L(70, 160, 70, 210, 'v', 'e', { w: 2.2 }) + T(78, 208, 'mg', { it: 1, a: 'start' }) + P('M130,55 A40,40 0 0 1 114,52', 'ink', { w: 1.2 }) + T(120, 70, 'θ', { it: 1 }) + T(90, 80, 'L', { it: 1, a: 'end' }) + T(170, 120, 'r = L sin θ', { fs: 12, a: 'start' }));
  F.vert = () => two(svg(180, 180, `<circle cx="90" cy="95" r="65" fill="none" stroke="${C.g}" stroke-dasharray="4 4"/>` + dot(90, 95, 3, C.ink) + dot(90, 30, 8, '#9CCF4A') + L(90, 38, 90, 80, 'r', 'e', { w: 2.4 }) + T(98, 66, 'T', { it: 1, b: 1, c: C.r, a: 'start' }) + L(84, 38, 84, 80, 'v', 'e', { w: 2.4 }) + T(78, 66, 'mg', { it: 1, b: 1, c: C.v, a: 'end' }) + T(90, 16, 'top (A)', { fs: 12, b: 1 }), 180),
    svg(180, 180, `<circle cx="90" cy="85" r="65" fill="none" stroke="${C.g}" stroke-dasharray="4 4"/>` + dot(90, 85, 3, C.ink) + dot(90, 150, 8, '#9CCF4A') + L(90, 142, 90, 100, 'r', 'e', { w: 2.4 }) + T(98, 116, 'T', { it: 1, b: 1, c: C.r, a: 'start' }) + L(90, 158, 90, 178, 'v', 'e', { w: 2.4 }) + T(98, 176, 'mg', { it: 1, b: 1, c: C.v, a: 'start' }) + T(150, 150, 'bottom (B)', { fs: 12, b: 1 }), 180));

  const S = `
${sec('5-0', 'Circular motion', `
${def('Circular motion', `is the motion of a body ${red('along a circular path')}.`)}
${table(['Uniform circular motion (horizontal plane)', 'Non-uniform circular motion (vertical plane)'], [['a ball swung in a horizontal circle', 'a bucket of water swung in a vertical circle'], ['a car or motorcycle turning a corner (flat or banked)', 'a roller coaster car on a loop'], ['a conical pendulum; a merry-go-round', '']])}
${def('Uniform circular motion', `is the motion of an object in a circle with a ${red('constant speed')}: the magnitude of its velocity stays constant but the ${red('direction of its velocity changes continually')}.`)}
${table(['Linear motion', 'Circular motion'], [['displacement, <i>s</i> (m)', 'angular displacement, θ (rad)'], [`velocity, <i>v</i> = ${fr('d<i>s</i>', 'd<i>t</i>')} (m s<sup>−1</sup>)`, `angular velocity, ω = ${fr('dθ', 'd<i>t</i>')} (rad s<sup>−1</sup>)`]])}
`)}

${sec('5-1', '5.1 Angular displacement and angular velocity', `
${two(`${def('Angular displacement, θ', `is the ${red('angle subtended at the centre by the arc length')} travelled. Unit: radian (rad).`)}${def('Linear distance, <i>s</i>', 'is the arc length between A and B.')}${key(`<i>s</i> = <i>r</i>θ`)}<p class="ls-small">1 rad is the angle subtended at the centre by an arc equal in length to the radius; 2π rad = 360°.</p>`, fig(F.arc()))}
${def('Angular velocity, ω', `is the ${red('rate of change of angular displacement')}: ω = ${fr('dθ', 'd<i>t</i>')}.`)}
${ul(['Unit: rad s<sup>−1</sup>; other units: revolutions per second (rps) and revolutions per minute (rpm).', 'It is a vector; its direction is perpendicular to the plane of motion (right-hand rule) and depends on whether the rotation is clockwise or anticlockwise.'])}
${h4('Relationship between v and ω')}
${steps([`<i>s</i> = <i>r</i>θ. Divide both sides by <i>t</i>: ${fr('<i>s</i>', '<i>t</i>')} = <i>r</i>${fr('θ', '<i>t</i>')}`])}
${key(`<i>v</i> = <i>r</i>ω`, 'The linear velocity at every point is along the tangent to the circle.')}
${def('Period, <i>T</i>', 'is the time taken to make one complete revolution (unit: s).')}
${def('Frequency, <i>f</i>', 'is the number of complete revolutions per second: <i>f</i> = 1/<i>T</i> (unit: s<sup>−1</sup> or Hz).')}
${key(`<i>v</i> = ${fr('2π<i>r</i>', '<i>T</i>')} = 2π<i>rf</i> &nbsp;&nbsp; ω = ${fr('2π', '<i>T</i>')} = 2π<i>f</i>`)}
${example('5.1.1', `An object moves in a circle with a uniform angular speed of 100 rpm. Calculate (a) the period, <i>T</i>, (b) the frequency, <i>f</i>.`,
  steps([`ω = ${fr('100 rev', '1 min')} = ${fr('100 × 2π', '60')} = 10.47 rad s<sup>−1</sup>`, `(a) <i>T</i> = ${fr('2π', 'ω')} = ${fr('2π', '10.47')} = <b>0.60 s</b>`, `(b) <i>f</i> = ${fr('1', '<i>T</i>')} = ${fr('1', '0.60')} = <b>1.67 Hz</b>`]))}
${example('5.1.2', `An object travels round a circle of radius 6 m at 30 rev min<sup>−1</sup>. Calculate (a) its angular speed in rad s<sup>−1</sup>, (b) its linear speed.`,
  steps([`(a) ω = ${fr('30 × 2π', '60')} = <b>π rad s<sup>−1</sup></b> (3.14 rad s<sup>−1</sup>)`, `(b) <i>v</i> = <i>r</i>ω = 6π = <b>18.85 m s<sup>−1</sup></b>`]))}
${exercises('Exercises: angular velocity', [
  { q: `A particle moves on a circular path of radius 0.5 m at a constant speed of 10 m s<sup>−1</sup>. Calculate the time taken to complete 20 revolutions.`, a: `6.28 s` },
  { q: `Two wheels of a machine are connected by a belt. The radius of the first wheel is 0.5 m and of the second 0.125 m. The bigger wheel turns at 3.5 Hz. What is the frequency of the smaller wheel?`, f: fig(F.belt()), a: `14 Hz (the belt gives both rims the same linear speed: <i>f</i>₁<i>r</i>₁ = <i>f</i>₂<i>r</i>₂)` }])}
`)}

${sec('5-2', '5.2 Centripetal acceleration', `
<p>An object moving in a circle of radius <i>r</i> at constant speed <i>v</i> keeps changing direction, so its velocity changes and it has an acceleration: the <b>centripetal acceleration</b>.</p>
${def('Centripetal acceleration, <i>a</i><sub>c</sub>', `is the acceleration of an object moving in a circular path, ${red('directed towards the centre of the circle')}.`)}
${two(`<p>Direction, graphically: <i>a</i> = ${fr('Δ<b>v</b>', 'Δ<i>t</i>')}. As Δ<i>t</i> → 0, the change Δ<b>v</b> = <b>v</b>₂ − <b>v</b>₁ points towards the centre.</p>`, fig(F.dv()))}
${card('Additional derivation (syllabus 5.2(b)) · a = v²/r', `Derive the formula for centripetal acceleration.`,
  steps([`In a short time Δ<i>t</i> the object moves through an arc Δ<i>s</i> = <i>v</i>Δ<i>t</i> and the radius turns through Δθ.`, `The velocity vectors <b>v</b>₁ and <b>v</b>₂ (both of magnitude <i>v</i>) also turn through Δθ, so the velocity triangle and the radius triangle are similar: ${fr('Δ<i>v</i>', '<i>v</i>')} = ${fr('Δ<i>s</i>', '<i>r</i>')}`, `Δ<i>v</i> = ${fr('<i>v</i>Δ<i>s</i>', '<i>r</i>')} = ${fr('<i>v</i>(<i>v</i>Δ<i>t</i>)', '<i>r</i>')} ⇒ <i>a</i> = ${fr('Δ<i>v</i>', 'Δ<i>t</i>')} = <b>${fr('<i>v</i><sup>2</sup>', '<i>r</i>')}</b>`, `Since <i>v</i> = <i>r</i>ω: <i>a</i> = ${fr('(<i>r</i>ω)<sup>2</sup>', '<i>r</i>')} = <b><i>r</i>ω<sup>2</sup></b>`]))}
${key(`<i>a</i><sub>c</sub> = ${fr('<i>v</i><sup>2</sup>', '<i>r</i>')} = <i>r</i>ω<sup>2</sup> = <i>v</i>ω = ${fr('4π<sup>2</sup><i>r</i>', '<i>T</i><sup>2</sup>')}`)}
${sim('circular', 'Uniform circular motion: velocity and acceleration', 'Change the radius and the angular velocity. The velocity arrow is always along the tangent and the acceleration arrow always points to the centre. Press "Cut the string" to see the object fly off along the tangent.')}
${example('5.2.1', `Calculate the centripetal acceleration of a car travelling on a circular racetrack of radius 1000 m at 180 km h<sup>−1</sup>.`,
  steps([`<i>v</i> = ${fr('180(1000)', '60(60)')} = 50 m s<sup>−1</sup>`, `<i>a</i><sub>c</sub> = ${fr('<i>v</i><sup>2</sup>', '<i>r</i>')} = ${fr('50<sup>2</sup>', '1000')} = <b>2.5 m s<sup>−2</sup></b>`]))}
`)}

${sec('5-3', '5.3 Centripetal force', `
${def('Centripetal force, <i>F</i><sub>c</sub>', `is the ${red('net force required to keep an object of mass <i>m</i> moving at speed <i>v</i> on a circular path')} of radius <i>r</i>.`)}
${key(`<i>F</i><sub>c</sub> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} = <i>mr</i>ω<sup>2</sup> = <i>mv</i>ω`)}
${ul([`Direction: towards the centre of the circle.`, `<i>F</i><sub>c</sub> is perpendicular to <b>v</b>, so it does <b>no work</b> on the object.`, `It is not a new kind of force: it is provided by another force. For the Moon orbiting the Earth, gravity provides it; for a car turning a corner, friction on the tyres provides it.`])}

${h4('Uniform circular motion in a horizontal plane')}
${two(`<p><b>Case 1: object whirled in a horizontal circle at steady speed.</b> Two forces act: the weight <i>mg</i>, and the tension in the string. The tension is the only force in the radial direction, so it provides the centripetal force.</p>${eq(`Σ<i>F</i> = <i>ma</i><sub>c</sub> ⇒ <i>T</i> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')}`)}`, fig(F.horiz()))}
${example('5.3.1', `A 0.25 kg rock on a string 1.0 m long is whirled in a horizontal circle at a constant 10.0 m s<sup>−1</sup>. Neglecting gravity, find the tension.`,
  eq(`<i>T</i> = <i>F</i><sub>c</sub> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} = ${fr('0.25(10)<sup>2</sup>', '1.0')} = <b>25 N</b>`))}
${h4('Case 2: a car going round a curve')}
${two(`<p><b>(a) Flat curve.</b> Static friction provides the centripetal force; <i>f</i><sub>s</sub> = µ<i>R</i>.</p>${steps([`Vertical: Σ<i>F</i><sub>y</sub> = 0 ⇒ <i>R</i> = <i>mg</i> <span class="ls-tag">(1)</span>`, `Horizontal: <i>f</i><sub>s</sub> = <i>F</i><sub>c</sub> ⇒ µ<i>R</i> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} <span class="ls-tag">(2)</span>`, `(1) into (2): µ<i>mg</i> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')}`])}${key(`<i>v</i><sub>max</sub> = ${sq('µ<i>rg</i>')}`, 'maximum speed without slipping')}`, fig(F.flat()))}
${example('5.3.2', `A car travels round a flat curve of radius 50 m. µ<sub>s</sub> between the tyres and the road is 0.75. Calculate the maximum speed without skidding.`,
  eq(`<i>f</i><sub>s</sub> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} and <i>f</i><sub>s</sub> = µ<sub>s</sub><i>mg</i> ⇒ <i>v</i> = ${sq('µ<sub>s</sub><i>rg</i>')} = ${sq('(0.75)(50)(9.81)')} = <b>19.18 m s<sup>−1</sup></b>`))}
${example('5.3.3', `A 1200 kg car at 8.0 m s<sup>−1</sup> goes round a flat curve of radius 9.0 m. (a) What horizontal force must the road exert on the tyres? (b) What coefficient of friction is needed for the car not to slip?`,
  steps([`(a) <i>f</i><sub>s</sub> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} = ${fr('1200(8.0)<sup>2</sup>', '9.0')} = <b>8533 N</b>`, `(b) µ<i>mg</i> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} ⇒ µ = ${fr('<i>v</i><sup>2</sup>', '<i>rg</i>')} = ${fr('(8.0)<sup>2</sup>', '9.0(9.81)')} = <b>0.72</b>`]))}
${two(`<p><b>(b) Frictionless banked road.</b> The horizontal component of the normal reaction provides the centripetal force.</p>${steps([`x: <i>R</i> sin θ = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} <span class="ls-tag">(1)</span>`, `y: <i>R</i> cos θ = <i>mg</i> <span class="ls-tag">(2)</span>`, `(1) ÷ (2): tan θ = ${fr('<i>v</i><sup>2</sup>', '<i>rg</i>')}`])}${key(`<i>v</i> = ${sq('<i>rg</i> tan θ')}`)}`, fig(F.bank()))}
${example('5.3.4', `A curve of radius 30 m is to be banked so that a car can take it at 13 m s<sup>−1</sup> without depending on friction. What must the banking angle be?`,
  eq(`tan θ = ${fr('<i>v</i><sup>2</sup>', '<i>rg</i>')} ⇒ θ = tan<sup>−1</sup> ${fr('13<sup>2</sup>', '30(9.81)')} = <b>30°</b>`))}
${h4('Case 3: conical pendulum')}
${two(`<p>The bob moves in a horizontal circle of radius <i>r</i> = <i>L</i> sin θ. <b><i>T</i> sin θ provides the centripetal force.</b></p>${steps([`x: <i>T</i> sin θ = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} <span class="ls-tag">(1)</span>`, `y: <i>T</i> cos θ = <i>mg</i> <span class="ls-tag">(2)</span>`, `(1) ÷ (2): tan θ = ${fr('<i>v</i><sup>2</sup>', '<i>rg</i>')}`])}${key(`<i>v</i> = ${sq('<i>rg</i> tan θ')} = ${sq('<i>Lg</i> sin θ tan θ')}`)}`, fig(F.cone()))}
${example('5.3.5', `A 0.15 kg ball on a 1.2 m string moves in a horizontal circle; the string makes 30° with the vertical. Find the tension and the speed of the ball.`,
  steps([`y: <i>T</i> cos 30° = <i>mg</i> ⇒ <i>T</i> = ${fr('0.15(9.81)', 'cos 30°')} = <b>1.70 N</b>`, `x: <i>T</i> sin θ = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} with <i>r</i> = <i>L</i> sin θ = 0.60 m ⇒ <i>v</i> = ${sq(fr('<i>rT</i> sin θ', '<i>m</i>'))} = <b>1.84 m s<sup>−1</sup></b>`]))}
${exercises('Exercise: conical pendulum', [{ q: `A pendulum bob of mass 1 kg on a string 1 m long revolves in a horizontal circle of radius 60 cm. Calculate the period of the motion and the tension in the string.`, a: `<i>T</i> = 12.26 N; period = ${fr('2π<i>r</i>', '<i>v</i>')} = 1.8 s` }])}

${h4('Circular motion in a vertical plane (non-uniform)')}
<p><b>Case 1: a ball on a string moving in a vertical circle.</b></p>
${F.vert()}
${two(`<p><b>At the top (A)</b>: <i>T</i> and <i>mg</i> both point down, towards the centre.</p>${eq(`<i>T</i> + <i>mg</i> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} ⇒ <i>T</i> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} − <i>mg</i>`)}<p class="ls-small"><i>T</i> is minimum at the top.</p>`, `<p><b>At the bottom (B)</b>: <i>T</i> points up (to the centre), <i>mg</i> down.</p>${eq(`<i>T</i> − <i>mg</i> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} ⇒ <i>T</i> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} + <i>mg</i>`)}<p class="ls-small"><i>T</i> is maximum at the bottom.</p>`)}
${example('5.3.6', `A 1.2 kg rock tied to a 90 cm string is whirled in a vertical circle at a constant 8 m s<sup>−1</sup>. What are the tensions at the top and bottom of the circle?`,
  steps([`<i>m</i> = 1.2 kg, <i>r</i> = 0.90 m, ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} = ${fr('1.2(8)<sup>2</sup>', '0.90')} = 85.3 N`, `Top: <i>T</i> = 85.3 − (1.2)(9.81) = <b>73.6 N</b>`, `Bottom: <i>T</i> = 85.3 + (1.2)(9.81) = <b>97.1 N</b>`]))}
${h4('Minimum (critical) speed at the top')}
<p>Circular motion is possible only while the string stays taut. If the string just becomes slack at the top, <i>T</i> = 0:</p>
${key(`<i>mg</i> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} ⇒ <i>v</i><sub>min</sub> = ${sq('<i>rg</i>')}`)}
${sim('vcircle', 'Vertical circle: tension and the minimum speed', 'Set the speed at the top. The ball keeps its total energy, so it moves faster at the bottom. Watch the tension around the circle: below √(rg) at the top, the string goes slack.')}
${example('5.3.7', `A 2 kg ball on an 80 cm string is whirled in a vertical circle and has a speed of 5 m s<sup>−1</sup> at the top. (a) What is the tension at that instant? (b) What is the minimum speed at the top needed to keep moving in the circle?`,
  steps([`(a) <i>T</i> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} − <i>mg</i> = ${fr('2(5)<sup>2</sup>', '0.8')} − 2(9.81) = <b>42.9 N</b>`, `(b) For <i>v</i><sub>min</sub>, <i>T</i> = 0: <i>v</i><sub>min</sub> = ${sq('<i>rg</i>')} = ${sq('(0.8)(9.81)')} = <b>2.8 m s<sup>−1</sup></b>`]))}
${example('5.3.8', `A bucket of water is swung in a vertical circle of radius 0.70 m. Calculate the minimum speed at the top so that the water does not spill.`,
  eq(`The water does not spill if <i>T</i> ≥ 0; at the limit <i>T</i> = 0: <i>v</i><sub>min</sub> = ${sq('<i>rg</i>')} = ${sq('(0.7)(9.81)')} = <b>2.62 m s<sup>−1</sup></b>`))}
<p><b>Case 2: roller coaster on a circular track.</b> The normal reaction <i>R</i> of the track replaces the tension.</p>
${two(eq(`Top: <i>R</i> + <i>mg</i> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} ⇒ <i>R</i> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} − <i>mg</i>`), eq(`Bottom: <i>R</i> − <i>mg</i> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} ⇒ <i>R</i> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} + <i>mg</i>`))}
<p>A minimum speed (when <i>R</i> = 0) is needed to keep the car on the track: <i>v</i><sub>min</sub> = ${sq('<i>rg</i>')}.</p>
${example('5.3.9', `What minimum speed must a roller coaster have when upside down at the top of a loop of radius 8.0 m if the passengers are not to fall out?`,
  eq(`At the top, for <i>v</i><sub>min</sub>, <i>R</i> = 0: <i>v</i><sub>min</sub> = ${sq('<i>rg</i>')} = ${sq('(8.0)(9.81)')} = <b>8.9 m s<sup>−1</sup></b>`))}
`)}`;

  // ---------- simulation: uniform circular motion ----------
  window.PhysiQSims.add('circular', function (root) {
    const { COL, fmt, el, slider, button, canvas, arrow, text, loop, readouts } = window.PhysiQSims.U;
    const S = { r: 2, w: 1.5, th: 0, cut: null, m: 0.5 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'radius <i>r</i>', 0.5, 4, 0.1, S.r, 'm', v => { S.r = v; S.cut = null; });
    slider(ctl, 'angular velocity ω', 0.3, 4, 0.1, S.w, 'rad/s', v => { S.w = v; S.cut = null; });
    slider(ctl, 'mass', 0.1, 2, 0.1, S.m, 'kg', v => { S.m = v; });
    const cv = canvas(root);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    button(bar, '✂ Cut the string', 'sm-main', () => { const x = S.r * Math.cos(S.th), y = S.r * Math.sin(S.th), v = S.r * S.w; S.cut = { x, y, vx: -v * Math.sin(S.th), vy: v * Math.cos(S.th), t: 0 }; });
    button(bar, '↺ Reset', '', () => { S.cut = null; });
    const ro = readouts(root);
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.6, 280, 440), sc = Math.min(w, h) / 2 / 5.2, cx = w / 2, cy = h / 2, X = x => cx + x * sc, Y = y => cy - y * sc;
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      ctx.setLineDash([5, 5]); ctx.strokeStyle = COL.gr; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(cx, cy, S.r * sc, 0, 7); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = COL.ink; ctx.beginPath(); ctx.arc(cx, cy, 4, 0, 7); ctx.fill();
      const v = S.r * S.w, a = v * v / S.r, k = 26, ka = 14;
      if (!S.cut) {
        const x = S.r * Math.cos(S.th), y = S.r * Math.sin(S.th);
        ctx.strokeStyle = COL.sub; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(X(x), Y(y)); ctx.stroke();
        arrow(ctx, X(x), Y(y), X(x) - Math.sin(S.th) * v * k / sc * 1, Y(y) - Math.cos(S.th) * v * k / sc * 1, COL.v, 3); text(ctx, 'v', X(x) - Math.sin(S.th) * v * k / sc - 4, Y(y) - Math.cos(S.th) * v * k / sc - 6, { it: 1, b: 1, c: COL.v });
        const al = Math.min(a * ka, S.r * sc - 8); arrow(ctx, X(x), Y(y), X(x) - Math.cos(S.th) * al, Y(y) + Math.sin(S.th) * al, COL.r, 3); text(ctx, 'a꜀', X(x) - Math.cos(S.th) * al * 0.6 + 6, Y(y) + Math.sin(S.th) * al * 0.6 - 6, { b: 1, c: COL.r });
        ctx.beginPath(); ctx.arc(X(x), Y(y), 10, 0, 7); ctx.fillStyle = '#E7B54A'; ctx.fill(); ctx.strokeStyle = COL.ink; ctx.stroke();
      } else {
        const c = S.cut, x = c.x + c.vx * c.t, y = c.y + c.vy * c.t;
        ctx.setLineDash([3, 4]); ctx.strokeStyle = COL.v; ctx.beginPath(); ctx.moveTo(X(c.x), Y(c.y)); ctx.lineTo(X(x), Y(y)); ctx.stroke(); ctx.setLineDash([]);
        ctx.beginPath(); ctx.arc(X(x), Y(y), 10, 0, 7); ctx.fillStyle = '#E7B54A'; ctx.fill(); ctx.strokeStyle = COL.ink; ctx.stroke();
        text(ctx, 'No centripetal force: the object moves off along the tangent at constant velocity', 12, 18, { b: 1, fs: 12, c: COL.o });
      }
      ro([['speed v = rω', fmt(v, 2) + ' m/s'], ['period T = 2π/ω', fmt(2 * Math.PI / S.w, 2) + ' s'], ['centripetal acceleration v²/r', fmt(a, 2) + ' m/s²', 'hl'], ['centripetal force mv²/r', fmt(S.m * a, 2) + ' N', 'hl']]);
    }
    loop(cv, dt => { if (S.cut) { S.cut.t += dt; if (S.cut.t > 6) S.cut = null; } else S.th += S.w * dt; draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- simulation: vertical circle ----------
  window.PhysiQSims.add('vcircle', function (root) {
    const { COL, fmt, clamp, el, slider, button, canvas, arrow, text, loop, readouts } = window.PhysiQSims.U;
    const g = 9.81, S = { r: 0.8, m: 2, vt: 5, phi: Math.PI / 2, dir: 1, slack: null, play: true };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    const sr = slider(ctl, 'radius', 0.5, 1.5, 0.05, S.r, 'm', v => { S.r = v; reset(); });
    const sm = slider(ctl, 'mass', 0.5, 3, 0.1, S.m, 'kg', v => { S.m = v; });
    const sv = slider(ctl, 'speed at the top', 0.5, 7, 0.1, S.vt, 'm/s', v => { S.vt = v; reset(); });
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    button(pre, 'Example 5.3.7 (2 kg, 0.80 m, 5 m/s)', 'sm-chip', () => { S.r = 0.8; S.m = 2; S.vt = 5; sr.set(0.8); sm.set(2); sv.set(5); reset(); });
    button(pre, 'Exactly √(rg) at the top', 'sm-chip', () => { S.vt = Math.sqrt(S.r * g); sv.set(S.vt); reset(); });
    const cv = canvas(root), gv = canvas(root);
    const ro = readouts(root);
    // phi: angle from the bottom, measured anticlockwise; top = π
    const vAt = phi => Math.sqrt(Math.max(0, S.vt * S.vt + 2 * g * S.r * (1 + Math.cos(phi))));
    const tension = phi => S.m * vAt(phi) ** 2 / S.r + S.m * g * Math.cos(phi);
    function reset() { S.phi = 0; S.slack = null; }
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.55, 260, 380), R = Math.min(w * 0.3, h * 0.38), cx = w * 0.32, cy = h / 2;
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      ctx.setLineDash([5, 5]); ctx.strokeStyle = COL.gr; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke(); ctx.setLineDash([]);
      let bx, by;
      if (S.slack) { bx = S.slack.x; by = S.slack.y; } else { bx = cx + R * Math.sin(S.phi); by = cy + R * Math.cos(S.phi); }
      const Tn = S.slack ? 0 : tension(S.phi);
      ctx.strokeStyle = S.slack ? '#C9B48A' : COL.ink; ctx.lineWidth = 1.6; ctx.setLineDash(S.slack ? [3, 3] : []); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = COL.ink; ctx.beginPath(); ctx.arc(cx, cy, 4, 0, 7); ctx.fill();
      if (!S.slack) { const L = clamp(Tn / (S.m * g) * 14, 0, R - 10), ux = (cx - bx) / R, uy = (cy - by) / R; arrow(ctx, bx, by, bx + ux * L, by + uy * L, COL.r, 3); }
      arrow(ctx, bx + 14, by, bx + 14, by + 34, COL.v, 2.4); text(ctx, 'mg', bx + 20, by + 30, { it: 1, b: 1, c: COL.v, fs: 12 });
      ctx.beginPath(); ctx.arc(bx, by, 10, 0, 7); ctx.fillStyle = '#9CCF4A'; ctx.fill(); ctx.strokeStyle = COL.ink; ctx.stroke();
      text(ctx, 'top', cx, cy - R - 10, { a: 'center', fs: 11, c: COL.sub }); text(ctx, 'bottom', cx, cy + R + 20, { a: 'center', fs: 11, c: COL.sub });
      const vmin = Math.sqrt(S.r * g), ok = S.vt >= vmin - 1e-9;
      text(ctx, ok ? 'String stays taut all the way round' : 'Speed at the top is below √(rg): the string goes slack', w * 0.62, 24, { b: 1, fs: 12, c: ok ? COL.gr : COL.o });
      // tension around the circle
      const p = gv.ctx, { w: W, h: H } = gv.size(0.3, 170, 220); p.clearRect(0, 0, W, H);
      const Tmax = tension(0) * 1.1, Tmin = Math.min(0, tension(Math.PI)) * 1.1;
      const pan = window.PhysiQSims.U.panel(p, { x: 50, y: 22, w: W - 70, h: H - 56 }, 0, 360, Tmin, Tmax, 'position round the circle (0° = bottom, 180° = top)', 'T', '/ N');
      p.strokeStyle = COL.r; p.lineWidth = 2.4; p.beginPath(); for (let d = 0; d <= 360; d += 3) { const t = tension(d * Math.PI / 180); d ? p.lineTo(pan.X(d), pan.Y(t)) : p.moveTo(pan.X(d), pan.Y(t)); } p.stroke();
      const dd = ((S.phi * 180 / Math.PI) % 360 + 360) % 360; p.beginPath(); p.arc(pan.X(dd), pan.Y(S.slack ? 0 : Tn), 4.5, 0, 7); p.fillStyle = COL.r; p.fill();
      ro([['speed now', fmt(S.slack ? 0 : vAt(S.phi), 2) + ' m/s'], ['tension now', fmt(Tn, 1) + ' N'], ['T at top = mv²/r − mg', fmt(tension(Math.PI), 1) + ' N', 'hl'], ['T at bottom = mv²/r + mg', fmt(tension(0), 1) + ' N', 'hl'], ['minimum speed at top √(rg)', fmt(vmin, 2) + ' m/s', ok ? '' : 'ao']]);
    }
    loop(cv, dt => {
      if (S.slack) { S.slack.t += dt; S.slack.vy += 9.81 * 40 * dt; S.slack.x += S.slack.vx * dt; S.slack.y += S.slack.vy * dt; if (S.slack.t > 1.6) reset(); }
      else {
        const sc = cv.c.clientWidth ? Math.min(cv.c.clientWidth * 0.3, cv.c.clientHeight * 0.38) / S.r : 100;
        S.phi += vAt(S.phi) / S.r * dt * 0.6;
        if (tension(S.phi) < 0) { const R = S.r * sc, cx = cv.c.clientWidth * 0.32, cy = cv.c.clientHeight / 2, v = vAt(S.phi) * sc * 0.6; S.slack = { x: cx + R * Math.sin(S.phi), y: cy + R * Math.cos(S.phi), vx: v * Math.cos(S.phi), vy: -v * Math.sin(S.phi), t: 0 }; }
      }
      draw();
    });
    new ResizeObserver(() => draw()).observe(root);
    reset(); draw();
  });

  window.PhysiQLessons.register('LESSON-5', { html: () => S });
})();
