/* Chapter 1 Physical Quantities and Measurements: full notes by Cikgu Suhaili
   (from DIMENSION_STPM_2027_TEACHERS_VERSION.pptx). */
(function () {
  'use strict';
  const { card, dim, fr, sq, vec, half, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, ms, ms2, svg, L, T, P, dot, axes, C, table, sec, h4, pq } = window.PhysiQLessons.H;
  const stpm = (t, q, s, f) => card(t, q, s, f).replace('class="ls-ex"', 'class="ls-ex ls-stpm"');
  const V = x => `<b><i>${x}</i></b>`;

  // ---------- figures ----------
  const F = {};
  F.equal = () => svg(300, 110, L(30, 35, 150, 35, 'k', 'e', { w: 3 }) + L(30, 85, 150, 85, 'k', 'e', { w: 3 }) + T(90, 24, 'A', { b: 1, fs: 16 }) + T(90, 74, 'B', { b: 1, fs: 16 }) + T(220, 66, 'A = B', { fs: 17, it: 1 }) + T(220, 88, '(parallel)', { fs: 13, c: C.sub }));
  F.neg = () => svg(300, 130, L(30, 115, 90, 25, 'k', 'e', { w: 3 }) + L(150, 25, 90, 115, 'k', 'e', { w: 3 }) + T(40, 60, 'A', { b: 1, fs: 16 }) + T(140, 80, '−A', { b: 1, fs: 16 }) + T(230, 66, '−A: same size,', { fs: 13 }) + T(230, 84, 'opposite direction', { fs: 13 }) + T(230, 104, '(antiparallel)', { fs: 13, c: C.sub }));
  F.comm = () => svg(360, 150,
    L(20, 30, 110, 30, 'k', 'e', { w: 2.6 }) + L(110, 30, 110, 120, 'k', 'e', { w: 2.6 }) + L(20, 30, 108, 118, 'v', 'e', { w: 2.6 }) + T(65, 22, 'A', { b: 1 }) + T(122, 80, 'B', { b: 1 }) + T(45, 92, 'A + B', { c: C.v, fs: 13 }) +
    T(170, 82, '=', { fs: 22 }) +
    L(220, 30, 220, 120, 'k', 'e', { w: 2.6 }) + L(220, 120, 310, 120, 'k', 'e', { w: 2.6 }) + L(220, 30, 308, 118, 'v', 'e', { w: 2.6 }) + T(208, 80, 'B', { b: 1 }) + T(265, 138, 'A', { b: 1 }) + T(290, 66, 'B + A', { c: C.v, fs: 13 }));
  F.assoc = () => svg(420, 210,
    L(40, 190, 20, 100, 'k', 'e', { w: 2.4 }) + L(20, 100, 150, 40, 'k', 'e', { w: 2.4 }) + L(150, 40, 190, 90, 'k', 'e', { w: 2.4 }) + L(40, 190, 188, 92, 'r', 'e', { w: 2.6 }) + L(40, 190, 148, 42, 'v', 'e', { w: 1.8, d: '5 4' }) +
    T(18, 150, 'v₁', { b: 1 }) + T(80, 62, 'v₂', { b: 1 }) + T(182, 60, 'v₃', { b: 1 }) + T(80, 128, 'v₁ + v₂', { c: C.v, fs: 12 }) + T(150, 168, '(v₁ + v₂) + v₃', { c: C.r, fs: 12 }) +
    L(250, 190, 230, 100, 'k', 'e', { w: 2.4 }) + L(230, 100, 360, 40, 'k', 'e', { w: 2.4 }) + L(360, 40, 400, 90, 'k', 'e', { w: 2.4 }) + L(250, 190, 398, 92, 'r', 'e', { w: 2.6 }) + L(230, 100, 398, 90, 'v', 'e', { w: 1.8, d: '5 4' }) +
    T(228, 150, 'v₁', { b: 1 }) + T(290, 62, 'v₂', { b: 1 }) + T(392, 60, 'v₃', { b: 1 }) + T(320, 84, 'v₂ + v₃', { c: C.v, fs: 12 }) + T(360, 168, 'v₁ + (v₂ + v₃)', { c: C.r, fs: 12 }));
  F.dist = () => svg(440, 170,
    L(20, 150, 90, 150, 'k', 'e', { w: 2.6 }) + L(90, 150, 130, 100, 'k', 'e', { w: 2.6 }) + L(20, 150, 128, 102, 'r', 'e', { w: 2.6 }) + T(55, 166, 'A', { b: 1 }) + T(122, 132, 'B', { b: 1 }) + T(60, 112, 'A + B', { fs: 13, c: C.r }) +
    L(190, 150, 330, 150, 'k', 'e', { w: 2.6 }) + L(330, 150, 410, 50, 'k', 'e', { w: 2.6 }) + L(190, 150, 408, 52, 'r', 'e', { w: 2.6 }) + T(260, 166, 'mA', { b: 1 }) + T(386, 108, 'mB', { b: 1 }) + T(280, 86, 'm(A + B)', { fs: 13, c: C.r }));
  F.para = () => svg(400, 150,
    L(20, 110, 120, 110, 'v', 'e', { w: 3 }) + T(70, 132, 'V₁', { b: 1 }) + T(140, 108, '+', { fs: 20 }) + L(160, 130, 190, 60, 'v', 'e', { w: 3 }) + T(196, 110, 'V₂', { b: 1, a: 'start' }) + T(225, 108, '=', { fs: 20 }) +
    L(250, 120, 280, 50, 'v', 'e', { w: 3 }) + L(250, 120, 350, 120, 'v', 'e', { w: 3 }) + L(280, 50, 380, 50, 's', '', { d: '4 3', w: 1.4 }) + L(350, 120, 380, 50, 's', '', { d: '4 3', w: 1.4 }) + L(250, 120, 378, 52, 'k', 'e', { w: 3.2 }) +
    T(258, 82, 'V₂', { b: 1, a: 'end' }) + T(300, 140, 'V₁', { b: 1 }) + T(386, 46, 'V<tspan font-size="10" dy="3">R</tspan>', { b: 1, a: 'start' }));
  F.resolve = (lab) => svg(300, 190,
    L(50, 160, 270, 160, 'k', 'e', { w: 1.4 }) + L(50, 175, 50, 20, 'k', 'e', { w: 1.4 }) + T(280, 164, 'x', { it: 1, a: 'start' }) + T(50, 14, 'y', { it: 1 }) +
    L(50, 160, 230, 60, 'v', 'e', { w: 3 }) + L(50, 160, 228, 160, 'o', 'e', { w: 2.6 }) + L(50, 160, 50, 62, 'g', 'e', { w: 2.6 }) +
    L(230, 60, 230, 160, 's', '', { d: '4 3', w: 1.2 }) + L(50, 60, 230, 60, 's', '', { d: '4 3', w: 1.2 }) + P('M95,160 A45,45 0 0 0 89,138', 'ink', { w: 1.3 }) + T(102, 150, 'θ', { it: 1, a: 'start' }) +
    T(140, 98, lab ? lab[0] : 'V', { b: 1 }) + T(140, 180, lab ? lab[1] : 'V<tspan font-size="10" dy="3">x</tspan>', { b: 1, c: C.o }) + T(44, 110, lab ? lab[2] : 'V<tspan font-size="10" dy="3">y</tspan>', { b: 1, c: C.g, a: 'end' }));
  F.ex113 = () => svg(320, 170,
    L(30, 140, 300, 140, 's', '', { d: '3 3', w: 1.2 }) + L(160, 160, 160, 20, 's', '', { d: '3 3', w: 1.2 }) + T(306, 144, 'x', { it: 1, a: 'start' }) + T(160, 14, 'y', { it: 1 }) +
    L(160, 140, 265, 35, 'k', 'e', { w: 3 }) + L(160, 140, 70, 92, 'k', 'e', { w: 3 }) + T(272, 32, '10 N', { b: 1, a: 'start' }) + T(64, 88, '5 N', { b: 1, a: 'end' }) +
    P('M200,140 A40,40 0 0 0 188,112', 'ink', { w: 1.3 }) + T(206, 128, '45°', { fs: 13, a: 'start' }) + P('M115,140 A45,45 0 0 1 120,122', 'ink', { w: 1.3 }) + T(108, 132, '30°', { fs: 13, a: 'end' }));
  F.ex113r = () => svg(220, 190,
    L(40, 170, 90, 170, 'o', 'e', { w: 2.6 }) + L(90, 170, 90, 30, 'g', 'e', { w: 2.6 }) + L(40, 170, 88, 32, 'r', 'e', { w: 3 }) +
    T(65, 186, 'ΣFₓ = 2.74 N', { fs: 12 }) + T(98, 100, 'ΣF<tspan font-size="9" dy="3">y</tspan><tspan dy="-3"> = 9.57 N</tspan>', { fs: 12, a: 'start' }) + T(40, 100, 'F = 9.95 N', { fs: 12, a: 'end', c: C.r, b: 1 }) +
    P('M58,170 A18,18 0 0 0 46,153', 'ink', { w: 1.2 }) + T(64, 158, '74°', { fs: 12, a: 'start' }));
  F.ex112 = () => svg(300, 170,
    L(40, 140, 250, 140, 'o', 'e', { w: 2.6 }) + L(40, 140, 40, 30, 'g', 'e', { w: 2.6 }) + L(40, 140, 250, 32, 'k', 'e', { w: 3 }) +
    L(250, 32, 250, 140, 's', '', { d: '3 3', w: 1.2 }) + L(40, 32, 250, 32, 's', '', { d: '3 3', w: 1.2 }) +
    T(258, 30, '50 N', { b: 1, a: 'start' }) + T(150, 160, '50 cos 40°', { fs: 13, c: C.o, b: 1 }) + T(46, 22, '50 sin 40°', { fs: 13, c: C.g, b: 1, a: 'start' }) + P('M90,140 A50,50 0 0 0 84,117', 'ink', { w: 1.3 }) + T(98, 128, '40°', { fs: 13, a: 'start' }));
  F.tube = () => svg(260, 150,
    `<circle cx="130" cy="75" r="62" fill="#E3F4D5" stroke="${C.g}" stroke-width="2"/><circle cx="130" cy="75" r="50" fill="#fff" stroke="${C.g}" stroke-width="2"/>` +
    L(68, 75, 192, 75, 'k', 'b', { w: 1.4 }) + T(130, 69, 'D', { it: 1, b: 1 }) + L(80, 98, 180, 98, 'v', 'b', { w: 1.4 }) + T(130, 114, 'd', { it: 1, b: 1, c: C.v }) +
    L(192, 30, 192, 120, 's', '', { d: '2 3', w: 1 }) + T(222, 32, 't', { it: 1, b: 1 }) + L(214, 36, 186, 52, 'o', 'e', { w: 1.4 }));

  const S = `
${sec('1-1', '1.1 Dimensions of physical quantities', `
${def('Physical quantity', `is a quantity that can be ${red('observed and measured')}.`)}
${def('Basic (base) quantity', `is a quantity that ${red('cannot be derived from any other quantity')}.`)}
${def('Derived quantity', `is a quantity that is ${red('derived from a combination of base quantities')} by mathematical operations (multiplication and division).`)}

${h4('SI units')}
${ul([`In 1960 the General Conference of Weights and Measures recommended one metric system of measurement for everyone: the International System of Units, abbreviated <b>SI</b> in all languages.`, `SI comes from its French name, <b>Système International</b>.`, `<b>Prefixes</b> represent larger or smaller values.`])}
${two(`<p class="ls-small"><b>Table 1.1</b> SI base units</p>` + table(['Base quantity', 'Unit', 'Symbol'], [['length', 'metre', 'm'], ['mass', 'kilogram', 'kg'], ['time', 'second', 's'], ['electric current', 'ampere', 'A'], ['temperature', 'kelvin', 'K'], ['amount of substance', 'mole', 'mol'], ['luminous intensity', 'candela', 'cd']]),
  `<p class="ls-small"><b>Table 1.2</b> Prefixes for powers of ten</p>` + table(['Power', 'Prefix', 'Symbol'], [['10<sup>−12</sup>', 'pico', 'p'], ['10<sup>−9</sup>', 'nano', 'n'], ['10<sup>−6</sup>', 'micro', 'µ'], ['10<sup>−3</sup>', 'milli', 'm'], ['10<sup>−2</sup>', 'centi', 'c'], ['10<sup>−1</sup>', 'deci', 'd'], ['10<sup>3</sup>', 'kilo', 'k'], ['10<sup>6</sup>', 'mega', 'M'], ['10<sup>9</sup>', 'giga', 'G']]))}
<p class="ls-small"><b>Table 1.3</b> Derived units</p>
${table(['Quantity', 'Unit', 'In terms of base units'], [['Velocity, <i>v</i>', `m s<sup>−1</sup>`, `m s<sup>−1</sup>`], ['Acceleration, <i>a</i>', `m s<sup>−2</sup>`, `m s<sup>−2</sup>`], ['Frequency, <i>f</i>', 'hertz, Hz', 's<sup>−1</sup>'], ['Force, <i>F</i>', 'newton, N', 'kg m s<sup>−2</sup>'], ['Energy and work, <i>W</i>', 'joule, J', 'kg m<sup>2</sup> s<sup>−2</sup>'], ['Power, <i>P</i>', 'watt, W', 'kg m<sup>2</sup> s<sup>−3</sup>'], ['Pressure, <i>p</i>', 'pascal, Pa', 'kg m<sup>−1</sup> s<sup>−2</sup>']])}
`)}

${sec('1-1-u', 'Unit conversion', `
${def('Unit conversion', `is a ${red('procedure')} of changing a physical quantity from one system of units to another. It is sometimes necessary, or more useful, to change from one set of units to another.`)}
<p>Conversions in the metric (mks) system you must be able to do:</p>
<div class="ls-flow"><span>km h<sup>−1</sup> → m s<sup>−1</sup></span><span>mm<sup>3</sup> → m<sup>3</sup></span><span>g cm<sup>−3</sup> → kg m<sup>−3</sup></span><span>K ↔ °C</span></div>
${example('1.1', `The speed of a car is <b>72 km/h</b>. What is the speed in <b>m s<sup>−1</sup></b>?`,
  eq(`72 km h<sup>−1</sup> = ${fr('72 km', '1 hour')} = ${fr('72 (1000 m)', '3600 s')} = <b>20 ${ms}</b>`))}
${example('1.2', `The density of lead is 11.3 g cm<sup>−3</sup>. What is the value in kilograms per cubic metre?`,
  eq(`11.3 ${fr('g', 'cm<sup>3</sup>')} = ${fr('11.3 × 10<sup>−3</sup> kg', '(10<sup>−2</sup> m)<sup>3</sup>')} = <b>1.13 × 10<sup>4</sup> kg m<sup>−3</sup></b>`))}
${example('1.3', `How many nanoseconds does it take for light to travel 1.00 km in vacuum?`,
  eq(`time = ${fr('distance', 'speed')} = ${fr('10<sup>3</sup> m', '3.00 × 10<sup>8</sup> m s<sup>−1</sup>')} = 3.33 × 10<sup>−6</sup> s = <b>3.33 × 10<sup>3</sup> ns</b>`))}
${exercises('Exercises: unit conversion', [
  { q: `A rectangular metal plate of thickness 2.5 mm is 50 mm long and 65 mm wide. Its mass is 60 g. Calculate (a) the distance round its edge, in metres, (b) the area of one of its flat faces, in m<sup>2</sup>, (c) its volume, in m<sup>3</sup>, (d) its density, in kg m<sup>−3</sup>.`, a: `(a) 0.230 m &nbsp; (b) 3.25 × 10<sup>−3</sup> m<sup>2</sup> &nbsp; (c) 8.13 × 10<sup>−6</sup> m<sup>3</sup> &nbsp; (d) 7380 kg m<sup>−3</sup>` },
  { q: `A solid aluminium rod of length 0.2 m has a uniform diameter of 52 mm. The density of aluminium is 2700 kg m<sup>−3</sup>. Calculate (a) its volume, in m<sup>3</sup>, (b) its mass, in kg.`, a: `(a) 4.25 × 10<sup>−4</sup> m<sup>3</sup> &nbsp; (b) 1.15 kg` },
  { q: `(a) Calculate the volume of a steel sphere of diameter 12 mm. (b) Calculate the diameter of a steel sphere of volume 4.80 cm<sup>3</sup>.`, a: `(a) 9.0 × 10<sup>−7</sup> m<sup>3</sup> &nbsp; (b) 2.09 × 10<sup>−2</sup> m` }])}
`)}

${sec('1-1-d', 'Dimensions', `
${def('Dimension', `of a physical quantity shows ${red('how that quantity is related to the base quantities')}.`)}
${ul([`Symbol: [quantity] or [symbol of quantity].`, `Example: [mass] = M or [<i>m</i>] = M. We say "the dimension of mass is M".`])}
${table(['Base quantity', 'Dimension'], [['[length] or [<i>l</i>]', dim('L')], ['[mass] or [<i>m</i>]', dim('M')], ['[time] or [<i>t</i>]', dim('T')], ['[current] or [<i>I</i>]', dim('I')], ['[temperature] or [<i>T</i>]', dim('θ')], ['[luminous intensity]', dim('J')], ['[amount of substance]', dim('N')]])}
${def('Dimensionless quantities', `are quantities that have ${red('no dimension and no unit')}. All numerical values (numbers) and coefficients have no dimensions.`)}
${eq(`[2] = [π] = [µ] = 1`)}
${example('1.4', `What are the dimensions of volume and velocity?`,
  steps([`[volume] = [length] × [width] × [height] = L × L × L = <b>${dim('L^3')}</b>`, `[velocity] = [displacement] ÷ [time] = <b>${dim('L T^-1')}</b>`]))}
${exercises('Exercise: dimensions', [{ q: `Find the dimensions of (a) density, (b) pressure, (c) work, (d) power.`, a: `(a) ${dim('M L^-3')} &nbsp; (b) ${dim('M L^-1 T^-2')} &nbsp; (c) ${dim('M L^2 T^-2')} &nbsp; (d) ${dim('M L^2 T^-3')}` }])}
`)}

${sec('1-1-a', 'Applications of dimensions', `
<p>Dimensional analysis can be used to</p>
${ul([`<b>(a) verify (check) the homogeneity of an equation</b>. However, an equation that is dimensionally correct is not necessarily correct.`, `<b>(b) construct an equation</b> from the given quantities.`, `<b>(c) determine the dimension and unit</b> of a physical quantity in an equation.`])}
${tip(`Dimension on the left-hand side = dimension on the right-hand side, and <b>each term in the equation has the same dimension</b>.`)}

${h4('Rules for adding, multiplying and dividing')}
${two(`<p><b>Addition or subtraction</b>: A + B = C − D</p>${eq(`[A] = [B] = [C] = [D]`)}`, `<p><b>Multiplication</b>: A = B × C</p>${eq(`[A] = [B] × [C]`)}<p class="ls-small">[B] and [C] may be equal or different. Distance <i>x</i> = <i>vt</i>: [<i>x</i>] = [<i>v</i>][<i>t</i>] although [<i>v</i>] ≠ [<i>t</i>].</p>`)}
<p><b>Division</b>: A = ${fr('B', 'C')} ⇒ [A] = ${fr('[B]', '[C]')}, and in general [B] ≠ [C] ≠ [A].</p>
${example('1.5', `Which is correct: (a) 2 m + 3 m = 8 m − 3 m &nbsp; or &nbsp; (b) 2 s + 3 kg = 8 m − 3 cm?`, `<p><b>(a)</b> is correct: every term is a length, so every term has the same dimension, L. In (b) a time is added to a mass, which is meaningless.</p>`)}
${example('1.6', `Multiplication: 1 m<sup>2</sup> = 1 m × 1 m, and distance <i>x</i> = <i>vt</i>.`, `<p>[<i>x</i>] = [<i>v</i>][<i>t</i>] = (${dim('L T^-1')})(${dim('T')}) = ${dim('L')}, even though [<i>v</i>] ≠ [<i>t</i>].</p>`)}
${example('1.7', `Division: (i) 1 m<sup>2</sup> = ${fr('1 m<sup>3</sup>', '1 m')} &nbsp; (ii) 1 m s<sup>−1</sup> = ${fr('1 m', '1 s')}`, `<p>The dimension of a quotient is the quotient of the dimensions: ${fr(dim('L^3'), dim('L'))} = ${dim('L^2')} and ${fr(dim('L'), dim('T'))} = ${dim('L T^-1')}.</p>`)}

${h4('(a) To verify (check) the homogeneity of an equation')}
${steps([`<b>Step 1. Identify</b> all the physical quantities in the equation.`, `<b>Step 2. Write</b> the dimension of each known physical quantity.`, `<b>Step 3. Equate</b> the dimensions of the quantities on both sides of the equation.`, `<b>Step 4.</b> The equation is <b>homogeneous</b> if the dimensions on both sides are <b>equal</b>.`])}
${example('1.8', `Show that the equation <i>v</i><sup>2</sup> = <i>u</i><sup>2</sup> + 2<i>as</i> is homogeneous.`,
  steps([`[<i>v</i>]<sup>2</sup> = [velocity]<sup>2</sup> = ${fr('[displacement]<sup>2</sup>', '[time]<sup>2</sup>')} = ${fr(dim('L^2'), dim('T^2'))} = <b>${dim('L^2 T^-2')}</b>`, `[<i>u</i>]<sup>2</sup> = [velocity]<sup>2</sup> = <b>${dim('L^2 T^-2')}</b>`, `[2][<i>a</i>][<i>s</i>] = (1)[acceleration][displacement] = ${fr('[velocity]', '[time]')}[displacement] = ${fr(dim('L T^-1'), dim('T'))} ${dim('L')} = <b>${dim('L^2 T^-2')}</b>`, `[<i>v</i>]<sup>2</sup> = [<i>u</i>]<sup>2</sup> = [2][<i>a</i>][<i>s</i>]: each term on both sides has the same dimension, so the equation is <b>dimensionally correct (homogeneous)</b>.`]))}

${h4('(b) To construct an equation from given quantities')}
${steps([`<b>Step 1. Write a general equation</b> that relates all the quantities.`, `<b>Step 2. Identify the dimensionless</b> quantities.`, `<b>Step 3. Write the dimension</b> of every quantity on both sides.`, `<b>Step 4. Equate the indices</b> of each dimension on both sides.`, `<b>Step 5. Determine</b> the values of the indices.`, `<b>Step 6. Rewrite</b> the equation with the indices.`])}
${example('1.10', `Construct an expression for the period <i>t</i> of a simple pendulum which shows how <i>t</i> is related to the mass <i>m</i> of the bob, the length <i>l</i> of the string and the acceleration due to gravity <i>g</i>.`,
  steps([`<b>Step 1</b>: let <i>t</i> ∝ <i>m<sup>x</sup> l<sup>y</sup> g<sup>z</sup></i>, so <i>t</i> = <i>k m<sup>x</sup> l<sup>y</sup> g<sup>z</sup></i>`, `<b>Step 2</b>: <i>k</i> is a dimensionless constant; <i>x</i>, <i>y</i>, <i>z</i> are unknowns.`, `<b>Step 3</b>: [<i>t</i>] = [<i>k</i>][<i>m</i>]<sup><i>x</i></sup>[<i>l</i>]<sup><i>y</i></sup>[<i>g</i>]<sup><i>z</i></sup> ⇒ T = M<sup><i>x</i></sup> L<sup><i>y</i></sup> (L T<sup>−2</sup>)<sup><i>z</i></sup> = M<sup><i>x</i></sup> L<sup><i>y</i>+<i>z</i></sup> T<sup>−2<i>z</i></sup>`, `<b>Step 4</b>: M: 0 = <i>x</i>; &nbsp; L: 0 = <i>y</i> + <i>z</i>; &nbsp; T: 1 = −2<i>z</i>`, `<b>Step 5</b>: <i>z</i> = −½, <i>y</i> = ½, <i>x</i> = 0`, `<b>Step 6</b>: <i>t</i> = <i>k m</i><sup>0</sup><i>l</i><sup>½</sup><i>g</i><sup>−½</sup>, so <b><i>t</i> = <i>k</i>${sq(fr('<i>l</i>', '<i>g</i>'))}</b>`]))}
${example('1.11', `The frequency of a simple pendulum depends only on its <b>length</b> and the <b>gravitational field strength</b>. Use dimensions to derive a possible form of the equation for the frequency.`,
  steps([`Let <i>f</i> ∝ <i>l<sup>x</sup> g<sup>y</sup></i>, so <i>f</i> = <i>k l<sup>x</sup> g<sup>y</sup></i> (<i>k</i> dimensionless; <i>x</i>, <i>y</i> unknown)`, `[<i>f</i>] = [<i>k</i>][<i>l</i>]<sup><i>x</i></sup>[<i>g</i>]<sup><i>y</i></sup> ⇒ T<sup>−1</sup> = (1)(L)<sup><i>x</i></sup>(L T<sup>−2</sup>)<sup><i>y</i></sup> = L<sup><i>x</i>+<i>y</i></sup> T<sup>−2<i>y</i></sup>`, `T: −1 = −2<i>y</i>; &nbsp; L: 0 = <i>x</i> + <i>y</i> ⇒ <i>y</i> = ½, <i>x</i> = −½`, `<i>f</i> = <i>k l</i><sup>−½</sup><i>g</i><sup>½</sup>, so <b><i>f</i> = <i>k</i>${sq(fr('<i>g</i>', '<i>l</i>'))}</b>`]))}
${exercises('Exercises: homogeneity and constructing equations', [
  { q: `The speed of a wave on a rope is <i>C</i> = ${sq(fr('<i>F</i>', '<i>m</i>'))}. Check its homogeneity using dimensional analysis.`, a: `It is homogeneous when <i>m</i> is the mass per unit length (kg m<sup>−1</sup>): [<i>F</i>/<i>m</i>] = ${fr(dim('M L T^-2'), dim('M L^-1'))} = ${dim('L^2 T^-2')}, so [√(<i>F</i>/<i>m</i>)] = ${dim('L T^-1')} = [<i>C</i>].` },
  { q: `Show whether each equation is homogeneous: <i>v</i> = <i>u</i> + <i>at</i><sup>2</sup> and <i>s</i> = <i>ut</i> + ½<i>at</i><sup>2</sup>.`, a: `<i>v</i> = <i>u</i> + <i>at</i><sup>2</sup> is <b>not</b> homogeneous ([<i>at</i><sup>2</sup>] = ${dim('L')}, but [<i>v</i>] = ${dim('L T^-1')}). <i>s</i> = <i>ut</i> + ½<i>at</i><sup>2</sup> <b>is</b> homogeneous (every term ${dim('L')}).` },
  { q: `A student suggests that the force <i>F</i> on a vertical wall due to a horizontal jet of liquid striking it is <i>F</i> = <i>k</i>ρ<i>Av</i>, where <i>k</i> is a dimensionless constant and ρ, <i>A</i> and <i>v</i> are the density of the liquid, the cross-sectional area of the jet and the speed of the jet. Is the expression dimensionally correct?`, a: `No. [ρ<i>Av</i>] = (${dim('M L^-3')})(${dim('L^2')})(${dim('L T^-1')}) = ${dim('M T^-1')}, but [<i>F</i>] = ${dim('M L T^-2')}. (<i>F</i> = <i>k</i>ρ<i>Av</i><sup>2</sup> would be homogeneous.)` },
  { q: `The time <i>t</i> taken by a body to fall freely from rest through a height <i>h</i> depends only on <i>h</i> and the acceleration due to gravity <i>g</i>. Using dimensions, find the equation relating <i>t</i> with <i>h</i> and <i>g</i>.`, a: `<i>t</i> = <i>k</i>${sq(fr('<i>h</i>', '<i>g</i>'))}` }])}

${h4('(c) To determine the dimension and unit of a quantity in an equation')}
${steps([`<b>Step 1. Identify</b> all the physical quantities in the equation.`, `<b>Step 2. Write the dimension</b> of each <b>known</b> physical quantity.`, `<b>Step 3. Solve</b> the equation to get the dimension of the <b>unknown</b> physical quantity.`])}
${example('1.9', `Find the dimension and unit of acceleration in the equation <i>v</i> = <i>u</i> + <i>at</i>.`,
  steps([`[<i>v</i>] = [<i>u</i>] = ${dim('L T^-1')} and [<i>t</i>] = ${dim('T')}`, `<i>v</i> = <i>u</i> + <i>at</i> ∴ <i>a</i> = ${fr('<i>v</i> − <i>u</i>', '<i>t</i>')}, so [<i>a</i>] = ${fr('[<i>v</i> − <i>u</i>]', '[<i>t</i>]')} = ${fr(dim('L T^-1'), dim('T'))}`, `[<i>a</i>] = <b>${dim('L T^-2')}</b>; unit of <i>a</i> = <b>m s<sup>−2</sup></b>`]))}

${h4('Limitations of dimensional analysis')}
${ul([`It cannot determine numerical constants such as 2, π, ½ or e. For <i>T</i> = 2π${sq(fr('<i>l</i>', '<i>g</i>'))} it gives only <i>T</i> ∝ ${sq(fr('<i>l</i>', '<i>g</i>'))}.`, `It cannot tell whether terms are added or subtracted. In <i>s</i> = <i>ut</i> + ½<i>at</i><sup>2</sup>, the factor ½ cannot be obtained.`, `It cannot distinguish scalar quantities from vector quantities.`, `It cannot handle trigonometric functions (sin θ, cos θ, tan θ).`, `A dimensionally correct equation may still be physically incorrect.`])}
${note(`<b>Exam note:</b> dimensional analysis only tests the homogeneity of an equation; it cannot prove that the equation is physically correct.`)}

${stpm('STPM Practice 1.1 · Question 1', `A sphere moving through a fluid experiences a viscous drag force <i>F</i> = 6πη<i>rv</i>, where <i>r</i> is the radius, <i>v</i> the speed and η the coefficient of viscosity. Determine the dimensions and the SI base unit of η. <span class="ls-small">[4 marks]</span>`,
  steps([`[<i>F</i>] = ${dim('M L T^-2')}, [<i>r</i>] = ${dim('L')}, [<i>v</i>] = ${dim('L T^-1')} (6π is dimensionless)`, `[η] = ${fr('[<i>F</i>]', '[<i>r</i>][<i>v</i>]')} = ${fr(dim('M L T^-2'), dim('L · L T^-1'))} = ${dim('M L^-1 T^-1')}`, `Dimension of η = <b>${dim('M L^-1 T^-1')}</b>; SI unit = <b>kg m<sup>−1</sup> s<sup>−1</sup></b>`]))}
${stpm('STPM Practice 1.1 · Question 2', `Using dimensional analysis, show that <i>p</i> = ρ<i>gh</i> + ½ρ<i>v</i><sup>2</sup> is homogeneous, where <i>p</i> is pressure, ρ density, <i>g</i> the acceleration of free fall, <i>h</i> height and <i>v</i> speed. <span class="ls-small">[4 marks]</span>`,
  steps([`[<i>p</i>] = force/area = ${fr(dim('M L T^-2'), dim('L^2'))} = ${dim('M L^-1 T^-2')}`, `[ρ<i>gh</i>] = (${dim('M L^-3')})(${dim('L T^-2')})(${dim('L')}) = ${dim('M L^-1 T^-2')}`, `[½ρ<i>v</i><sup>2</sup>] = (${dim('M L^-3')})(${dim('L T^-1')})<sup>2</sup> = ${dim('M L^-1 T^-2')}`, `All three terms have the same dimension, ${dim('M L^-1 T^-2')}, so the equation is <b>homogeneous</b>.`]))}
${stpm('STPM Practice 1.1 · Question 3', `The period <i>T</i> of a small liquid drop oscillating under surface tension may depend on its density ρ, radius <i>r</i> and surface tension σ (SI unit N m<sup>−1</sup>). Use dimensional analysis to derive an expression for <i>T</i>. <span class="ls-small">[6 marks]</span>`,
  steps([`Let <i>T</i> = <i>k</i>ρ<sup><i>a</i></sup><i>r</i><sup><i>b</i></sup>σ<sup><i>c</i></sup> (<i>k</i> dimensionless)`, `[σ] = N m<sup>−1</sup> = ${fr(dim('M L T^-2'), dim('L'))} = ${dim('M T^-2')}`, `${dim('T')} = (${dim('M L^-3')})<sup><i>a</i></sup>(${dim('L')})<sup><i>b</i></sup>(${dim('M T^-2')})<sup><i>c</i></sup> = M<sup><i>a</i>+<i>c</i></sup> L<sup><i>b</i>−3<i>a</i></sup> T<sup>−2<i>c</i></sup>`, `M: <i>a</i> + <i>c</i> = 0; &nbsp; T: −2<i>c</i> = 1; &nbsp; L: <i>b</i> − 3<i>a</i> = 0 ⇒ <i>c</i> = −½, <i>a</i> = ½, <i>b</i> = 3/2`, `<b><i>T</i> = <i>k</i>ρ<sup>½</sup><i>r</i><sup>3/2</sup>σ<sup>−½</sup> = <i>k</i>${sq(fr('ρ<i>r</i><sup>3</sup>', 'σ'))}</b>`]))}
`)}

${sec('1-2', '1.2 Scalars and vectors', `
${def('Scalar quantity', `is a quantity which has ${red('magnitude only')}. Examples: mass, temperature, kinetic energy, time and density.`)}
${def('Vector quantity', `is a quantity which has ${red('both magnitude and direction')}. Examples: displacement, velocity, acceleration, force and momentum.`)}
${h4('Properties of two vectors')}
${two(`<p><b>(a) Equality of two vectors</b>: two vectors are equal only when they have the ${red('same magnitude')} and the ${red('same direction')}.</p>${fig(F.equal())}`, `<p><b>(b) Negative of a vector</b>: it has the ${red('same magnitude')} as the original vector but the ${red('opposite direction')}.</p>${fig(F.neg())}`)}
${h4('Vector addition')}
<p>Two methods of finding the resultant vector:</p>
${ul([`<b>(a) Graphical method</b>: (i) tail to tip (triangle and polygon methods); (ii) parallelogram.`, `<b>(b) Component method</b>: by calculation.`, `The graphical (tail-to-tip) method obeys the <b>commutative</b>, <b>associative</b> and <b>distributive</b> laws.`])}
${two(`<p><b>Commutative law</b>: ${V('A')} + ${V('B')} = ${V('B')} + ${V('A')}</p><p class="ls-small">The arrow drawn from the <b>tail</b> of the first vector to the <b>tip</b> of the second represents the sum (resultant). This is the <b>triangle method</b>.</p>`, fig(F.comm()))}
<p><b>Associative law</b> (more than two vectors): (${V('v')}<sub>1</sub> + ${V('v')}<sub>2</sub>) + ${V('v')}<sub>3</sub> = ${V('v')}<sub>1</sub> + (${V('v')}<sub>2</sub> + ${V('v')}<sub>3</sub>). This is the <b>polygon method</b>.</p>
${fig(F.assoc(), 'Either grouping gives the same resultant (red).')}
${two(`<p><b>Distributive law</b>: <i>m</i>(${V('A')} + ${V('B')}) = <i>m</i>${V('A')} + <i>m</i>${V('B')}</p>`, fig(F.dist()))}
${two(`<p><b>Parallelogram method</b> (for two vectors): ${V('V')}<sub>R</sub> is the <b>diagonal</b> of the parallelogram and represents the sum, or resultant, of the two vectors.</p>`, fig(F.para()))}
${sim('vectors', 'Vector addition: tail to tip, parallelogram and components', 'Drag the sliders to change the two vectors. Switch between the triangle and parallelogram methods, and watch the component table add up to the same resultant.')}
`)}

${sec('1-2-p', 'Scalar (dot) product and vector (cross) product', `
${two(`${def('Scalar (dot) product', `of two vectors ${V('A')} and ${V('B')} is a <b>scalar</b>.`)}${key(`${V('A')} · ${V('B')} = <i>AB</i> cos θ`)}<p class="ls-small">θ is the angle between ${V('A')} and ${V('B')} (0° ≤ θ ≤ 180°). Component form: ${V('A')} · ${V('B')} = <i>A</i><sub>x</sub><i>B</i><sub>x</sub> + <i>A</i><sub>y</sub><i>B</i><sub>y</sub>.</p>${ul([`${V('A')} · ${V('B')} = ${V('B')} · ${V('A')} (commutative)`, `${V('A')} · ${V('B')} = 0 when ${V('A')} ⊥ ${V('B')} (θ = 90°)`, `Maximum when θ = 0° (parallel); ${V('A')} · ${V('A')} = <i>A</i><sup>2</sup>`])}`,
  `${def('Vector (cross) product', `of two vectors ${V('A')} and ${V('B')} is a <b>vector</b>.`)}${key(`|${V('A')} × ${V('B')}| = <i>AB</i> sin θ`)}<p class="ls-small">Its direction is perpendicular to the plane of ${V('A')} and ${V('B')}, given by the right-hand rule. In the x-y plane: ${V('A')} × ${V('B')} = (<i>A</i><sub>x</sub><i>B</i><sub>y</sub> − <i>A</i><sub>y</sub><i>B</i><sub>x</sub>) ${V('k')}.</p>${ul([`${V('A')} × ${V('B')} = −(${V('B')} × ${V('A')}) (anti-commutative)`, `${V('A')} × ${V('B')} = 0 when ${V('A')} ∥ ${V('B')} (θ = 0° or 180°)`, `Maximum when θ = 90°; |${V('A')} × ${V('B')}| = area of the parallelogram`])}`)}
${card('Worked example · scalar product', `Two coplanar vectors ${V('A')} and ${V('B')} have magnitudes <i>A</i> = 5.0 N and <i>B</i> = 4.0 N. The angle between them is 60°. Find ${V('A')} · ${V('B')}.`,
  steps([`${V('A')} · ${V('B')} = <i>AB</i> cos θ = (5.0)(4.0) cos 60° = 20 × 0.5 = <b>10</b> (a scalar)`]))}
${card('Worked example · vector product', `For the same two vectors (5.0 N and 4.0 N at 60°), find the magnitude of ${V('A')} × ${V('B')}.`,
  steps([`|${V('A')} × ${V('B')}| = <i>AB</i> sin θ = (5.0)(4.0) sin 60° = 20 × 0.866 = <b>17.3</b> (a vector)`, `Direction: perpendicular to the plane of ${V('A')} and ${V('B')} (right-hand rule).`]))}
${table(['Scalar product', 'Vector product'], [['A · B = AB cos θ', '|A × B| = AB sin θ'], ['Result is a scalar', 'Result is a vector'], ['Used in work done', 'Used in torque'], ['A · B = B · A', 'A × B ≠ B × A'], ['Zero when θ = 90°', 'Zero when θ = 0°'], ['Maximum at θ = 0°', 'Maximum at θ = 90°']])}
`)}

${sec('1-2-c', 'Component method', `
${two(`<p>A vector ${V('V')} is resolved into <i>x</i> and <i>y</i> components, ${V('V')}<sub>x</sub> and ${V('V')}<sub>y</sub>. From simple trigonometry:</p>${key(`<i>V</i><sub>x</sub> = <i>V</i> cos θ<br><i>V</i><sub>y</sub> = <i>V</i> sin θ`)}`, fig(F.resolve()))}
${two(`<p>The <b>magnitude</b> of the resultant:</p>${eq(`<i>V</i> = ${sq('<i>V</i><sub>x</sub><sup>2</sup> + <i>V</i><sub>y</sub><sup>2</sup>')}`)}`, `<p>The <b>direction</b> of the resultant is the angle θ between ${V('V')} and the positive x-axis:</p>${eq(`tan θ = ${fr('<i>V</i><sub>y</sub>', '<i>V</i><sub>x</sub>')}`)}`)}
${example('1.12', `Calculate the horizontal and vertical components of a force of 50 N acting at 40° to the horizontal.`,
  steps([`<b>Step 1</b>: sketch the force on the Cartesian axes. <b>Step 2</b>: find the x and y components.`, `Horizontal component = 50 cos 40° = <b>38 N</b>`, `Vertical component = 50 sin 40° = <b>32 N</b>`]) + fig(F.ex112()))}
${example('1.13', `Find the resultant of the forces shown.`,
  steps([`<b>Step 1</b>: find the x and y components of each force.` + table(['Force', 'x-component', 'y-component'], [['10 N', '10 cos 45° = +7.07 N', '10 sin 45° = +7.07 N'], ['5 N', '−5 cos 30° = −4.33 N', '5 sin 30° = +2.50 N']]),
    `<b>Step 2</b>: Σ<i>F</i><sub>x</sub> = +7.07 − 4.33 = 2.74 N; &nbsp; Σ<i>F</i><sub>y</sub> = +7.07 + 2.50 = 9.57 N`,
    `<b>Step 3</b>: <i>F</i> = ${sq('(Σ<i>F</i><sub>x</sub>)<sup>2</sup> + (Σ<i>F</i><sub>y</sub>)<sup>2</sup>')} = ${sq('(2.74)<sup>2</sup> + (9.57)<sup>2</sup>')} = <b>9.95 N</b>`,
    `<b>Step 4</b>: θ = tan<sup>−1</sup> ${fr('9.57', '2.74')} = 74°. <b>The resultant is 9.95 N at 74° to the positive x-axis.</b>`]) + fig(F.ex113r()), fig(F.ex113()))}
${stpm('STPM Practice 1.2 · Question 1', `Two forces of 8.0 N and 6.0 N act at a point. The angle between them is 60°. Determine the magnitude and direction of the resultant force. <span class="ls-small">[5 marks]</span>`,
  steps([`Resolve along the 8.0 N force (x-axis): <i>F</i><sub>x</sub> = 8.0 + 6.0 cos 60° = 11.0 N; <i>F</i><sub>y</sub> = 6.0 sin 60° = 5.20 N`, `<i>R</i> = ${sq('11.0<sup>2</sup> + 5.20<sup>2</sup>')} = ${sq('148')} = <b>12.2 N</b>`, `θ = tan<sup>−1</sup> ${fr('5.20', '11.0')} = <b>25.3°</b> from the 8.0 N force`]))}
${stpm('STPM Practice 1.2 · Question 2', `Two vectors are ${V('A')} = 3${V('i')} + 4${V('j')} and ${V('B')} = 5${V('i')} − 12${V('j')}. Find (a) the scalar product ${V('A')} · ${V('B')}, (b) the angle between ${V('A')} and ${V('B')}. <span class="ls-small">[5 marks]</span>`,
  steps([`(a) ${V('A')} · ${V('B')} = <i>A</i><sub>x</sub><i>B</i><sub>x</sub> + <i>A</i><sub>y</sub><i>B</i><sub>y</sub> = (3)(5) + (4)(−12) = 15 − 48 = <b>−33</b>`, `(b) |${V('A')}| = ${sq('3<sup>2</sup> + 4<sup>2</sup>')} = 5; |${V('B')}| = ${sq('5<sup>2</sup> + 12<sup>2</sup>')} = 13`, `cos θ = ${fr('−33', '(5)(13)')} = −0.508 ⇒ θ = <b>120.5°</b>`]))}
${stpm('STPM Practice 1.2 · Question 3', `A force ${V('F')} = (3${V('i')} + 4${V('j')}) N acts at a point with position vector ${V('r')} = (2${V('i')} − ${V('j')}) m from a fixed axis. Using the vector product, calculate the torque of the force about the axis. <span class="ls-small">[4 marks]</span>`,
  steps([`τ = ${V('r')} × ${V('F')} = (<i>r</i><sub>x</sub><i>F</i><sub>y</sub> − <i>r</i><sub>y</sub><i>F</i><sub>x</sub>) ${V('k')}`, `= [(2)(4) − (−1)(3)] ${V('k')} = (8 + 3) ${V('k')} = <b>11 ${V('k')} N m</b>`, `Magnitude 11 N m, directed out of the plane (anticlockwise rotation).`]))}
`)}

${sec('1-3', '1.3 Uncertainties in measurements', `
<p class="ls-small"><b>Learning outcome (a)</b>: explain systematic errors and random errors in measurements.</p>
<p>The error in a measurement is decided by the instruments used and the physical constraints of the observer. The two main types are <b>systematic error</b> and <b>random error</b>.</p>
${two(`${def('Random error', `(chance error) is a deviation between an observed value and the true value due to ${red('unpredictable and fluctuating factors')} during measurement.`)}${ul([`It makes readings <b>scatter</b> about the true value.`, `Individual readings may be higher or lower than the true value.`, `<b>Reduced</b> by taking repeated measurements and using the mean, and by increasing the sample size.`])}<p class="ls-small">Common sources: parallax errors, the sensitivity of an instrument, the physical constraints of the observer, poorly controlled procedures.</p>`,
  `${def('Systematic error', `is an error that ${red('occurs consistently')}, or changes in a predictable way, every time a measurement is made.`)}${ul([`All readings are shifted from the true value by the same amount in the same direction.`, `<b>Eliminated</b> by improving the measurement method, e.g. using a different instrument.`])}<p class="ls-small">Common sources: zero errors, instrumental error, incorrect assumptions.</p>`)}
<p>Every measurement has an uncertainty, limited by the instrument and the observer. For example, the length of A4 paper measured with a metre ruler (error 0.1 cm) is written <b>29.7 ± 0.1 cm</b>.</p>

${h4('(b) Uncertainty from repeated measurements: standard deviation')}
${def('Standard deviation', `expresses ${red('by how much the members of a group differ from the mean value')} of the group.`)}
${key(`σ = ${sq(fr('Σ(<i>x</i> − <i>x̄</i>)<sup>2</sup>', '<i>N</i> − 1'))}`)}
${card('Standard deviation · Example', `The diameter of a boiling tube is measured five times: 31.33, 31.15, 31.26, 31.02 and 31.20 mm. Find the mean, the average deviation and the standard deviation.`,
  steps([`Mean = ${fr('sum of readings', 'number of readings')} = ${fr('155.96 mm', '5')} = <b>31.19 mm</b>`, table(['Reading', 'Diameter / mm', 'Deviation / mm'], [['1', '31.33', '+0.14'], ['2', '31.15', '−0.04'], ['3', '31.26', '+0.07'], ['4', '31.02', '−0.17'], ['5', '31.20', '+0.01']]), `Average deviation, <i>d</i> = <b>0.086 mm</b>`,
    `σ = ${sq(fr('(0.14)<sup>2</sup> + (−0.04)<sup>2</sup> + (0.07)<sup>2</sup> + (−0.17)<sup>2</sup> + (0.01)<sup>2</sup>', '5 − 1'))} = <b>0.12 mm</b>`]))}

${h4('(c) Uncertainty in a derived quantity')}
<p class="ls-small">Trigonometric functions are not required. (d) Give a derived quantity to an appropriate number of significant figures.</p>
${key(`<i>Z</i> = <i>A</i> ± <i>B</i> &nbsp;⇒&nbsp; Δ<i>Z</i> = Δ<i>A</i> + Δ<i>B</i><br><i>Z</i> = <i>AB</i> or ${fr('<i>A</i>', '<i>B</i>')} &nbsp;⇒&nbsp; ${fr('Δ<i>Z</i>', '<i>Z</i>')} = ${fr('Δ<i>A</i>', '<i>A</i>')} + ${fr('Δ<i>B</i>', '<i>B</i>')}<br><i>Z</i> = <i>A</i><sup><i>n</i></sup> &nbsp;⇒&nbsp; ${fr('Δ<i>Z</i>', '<i>Z</i>')} = <i>n</i>${fr('Δ<i>A</i>', '<i>A</i>')}`, 'Adding or subtracting: add the absolute uncertainties. Multiplying or dividing: add the fractional uncertainties.')}
${card('Addition and subtraction · Example 1', `Mass of beaker with liquid, <i>m</i><sub>1</sub> = (32.0 ± 0.1) g; mass of beaker, <i>m</i><sub>2</sub> = (3.0 ± 0.1) g. Calculate the mass of the liquid.`,
  steps([`Mass of liquid = <i>m</i><sub>1</sub> − <i>m</i><sub>2</sub> = 32.0 − 3.0 = 29.0 g`, `Absolute uncertainty = 0.1 + 0.1 = 0.2 g`, `<b>Mass of liquid = (29.0 ± 0.2) g</b>`]))}
${card('Addition and subtraction · Example 2', `External diameter of a test tube, <i>D</i> = (1.23 ± 0.01) cm; internal diameter, <i>d</i> = (1.13 ± 0.01) cm. Calculate the thickness of the wall.`,
  steps([`Thickness, <i>t</i> = ${fr('<i>D</i> − <i>d</i>', '2')} = ${fr('1.23 − 1.13', '2')} = 0.05 cm`, `Δ<i>t</i> = ½Δ<i>D</i> + ½Δ<i>d</i> = ½(0.01) + ½(0.01) = 0.01 cm`, `<b>Thickness = (0.05 ± 0.01) cm</b>`]), fig(F.tube()))}
${card('Multiplication and division · Example', `The dimensions of a piece of A4 paper are <i>x</i> = (297 ± 1) mm and <i>y</i> = (209 ± 1) mm. Calculate the area.`,
  steps([`Area <i>A</i> = <i>xy</i> = 297 × 209 = 62 073 mm<sup>2</sup>`, `${fr('Δ<i>A</i>', '<i>A</i>')} = ${fr('Δ<i>x</i>', '<i>x</i>')} + ${fr('Δ<i>y</i>', '<i>y</i>')} ⇒ Δ<i>A</i> = (${fr('1', '297')} + ${fr('1', '209')})(62 073) = 506 mm<sup>2</sup> = 5 × 10<sup>2</sup> mm<sup>2</sup> (1 s.f.)`, `<b>Area, <i>A</i> = (6.21 ± 0.05) × 10<sup>4</sup> mm<sup>2</sup></b>`]))}
${stpm('STPM Practice 1.3 · Question 1', `A student records five readings of the diameter of a wire (in mm): 0.52, 0.54, 0.53, 0.55, 0.51. Determine (a) the mean diameter, (b) the standard deviation, (c) the diameter with its uncertainty. <span class="ls-small">[6 marks]</span>`,
  steps([`(a) <i>x̄</i> = ${fr('0.52 + 0.54 + 0.53 + 0.55 + 0.51', '5')} = <b>0.530 mm</b>`, `(b) Deviations: −0.01, +0.01, 0.00, +0.02, −0.02; Σ(<i>x</i> − <i>x̄</i>)<sup>2</sup> = 0.0010 mm<sup>2</sup><br>σ = ${sq(fr('0.0010', '4'))} = <b>0.016 mm</b>`, `(c) <b>Diameter = (0.530 ± 0.016) mm</b>`]))}
${stpm('STPM Practice 1.3 · Question 2', `A small cube has mass <i>m</i> = (24.0 ± 0.1) g and side <i>L</i> = (2.00 ± 0.01) cm. Calculate its density ρ = <i>m</i>/<i>L</i><sup>3</sup> and the uncertainty in the density. <span class="ls-small">[6 marks]</span>`,
  steps([`<i>V</i> = <i>L</i><sup>3</sup> = 8.00 cm<sup>3</sup>; ρ = ${fr('24.0', '8.00')} = 3.00 g cm<sup>−3</sup>`, `${fr('Δρ', 'ρ')} = ${fr('Δ<i>m</i>', '<i>m</i>')} + 3${fr('Δ<i>L</i>', '<i>L</i>')} = ${fr('0.1', '24.0')} + 3(${fr('0.01', '2.00')}) = 0.00417 + 0.0150 = 0.0192`, `Δρ = 0.0192 × 3.00 = 0.06 g cm<sup>−3</sup>; <b>ρ = (3.00 ± 0.06) g cm<sup>−3</sup></b>`]))}
${stpm('STPM Practice 1.3 · Question 3', `In a cooling experiment the initial temperature is θ<sub>1</sub> = (75.5 ± 0.5) °C and the final temperature is θ<sub>2</sub> = (28.0 ± 0.5) °C. Calculate the temperature change and its uncertainty, to an appropriate number of significant figures. <span class="ls-small">[4 marks]</span>`,
  steps([`Δθ = θ<sub>1</sub> − θ<sub>2</sub> = 75.5 − 28.0 = 47.5 °C`, `For subtraction the absolute uncertainties add: 0.5 + 0.5 = 1.0 °C`, `<b>Δθ = (47.5 ± 1.0) °C</b>`]))}
${pq('STPM specimen question', `In determining the density of a solid sphere, a student measures its diameter and its mass. The percentage errors in the diameter and the mass are 2.0% and 3.0% respectively. What is the percentage error in the density of the sphere?`, ['5.0%', '8.0%', '9.0%', '11%'], 2,
  steps([`ρ = ${fr('<i>m</i>', '<i>V</i>')} and <i>V</i> = ${fr('4', '3')}π<i>r</i><sup>3</sup>. Since <i>r</i> = <i>d</i>/2, <i>V</i> ∝ <i>d</i><sup>3</sup>, so ρ ∝ ${fr('<i>m</i>', '<i>d</i><sup>3</sup>')}`, `${fr('Δρ', 'ρ')} = ${fr('Δ<i>m</i>', '<i>m</i>')} + 3${fr('Δ<i>d</i>', '<i>d</i>')} = 3.0% + 3(2.0%) = <b>9.0%</b>`]))}
`)}

${sec('1-tips', 'STPM examination tips', two(
  `<ul class="ls-checks"><li><b>Dimensions</b>: express dimensions using base quantities (M, L, T) only.</li><li><b>Homogeneity</b>: every term in an equation must have the same dimensions.</li><li><b>Constructing equations</b>: equate the indices of M, L and T separately.</li><li><b>Uncertainties</b>: for × and ÷, add the percentage uncertainties.</li><li><b>Significant figures</b>: the answer is no more accurate than the least accurate measurement.</li></ul>`,
  `<p><b>Common mistakes</b></p><ul class="ls-checks x"><li>mixing dimensions with units</li><li>using T for the temperature dimension (it is θ)</li><li>forgetting powers in uncertainty calculations</li><li>assuming a homogeneous equation is automatically correct</li></ul>`))}
`;


  // ---------- simulation: vector addition ----------
  window.PhysiQSims.add('vectors', function (root) {
    const { COL, fmt, el, slider, toggle, button, canvas, arrow, text, loop, readouts } = window.PhysiQSims.U;
    const S = { A: 6, a: 30, B: 4, b: 120, mode: 'tri', comp: false };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const presets = [['Example 1.13 (10 N at 45°, 5 N at 150°)', 10, 45, 5, 150], ['Practice 1.2 Q1 (8 N and 6 N at 60°)', 8, 0, 6, 60], ['Perpendicular (3 and 4)', 3, 0, 4, 90], ['Opposite directions', 6, 0, 4, 180]];
    const pb = presets.map(([n, A, a, B, b]) => button(pre, n, 'sm-chip', () => { Object.assign(S, { A, a, B, b }); sA.set(A); sa.set(a); sB.set(B); sb.set(b); mark(n); draw(); }));
    const mark = n => pb.forEach(x => x.classList.toggle('on', x.textContent === n));
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    const sA = slider(ctl, '|<b>A</b>|', 1, 10, 0.5, S.A, '', v => { S.A = v; mark(''); draw(); });
    const sa = slider(ctl, 'angle of <b>A</b>', 0, 360, 5, S.a, '°', v => { S.a = v; mark(''); draw(); });
    const sB = slider(ctl, '|<b>B</b>|', 1, 10, 0.5, S.B, '', v => { S.B = v; mark(''); draw(); });
    const sb = slider(ctl, 'angle of <b>B</b>', 0, 360, 5, S.b, '°', v => { S.b = v; mark(''); draw(); });
    const cv = canvas(root);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const mb = [['tri', 'Triangle (tail to tip)'], ['par', 'Parallelogram']].map(([m, n]) => { const b = button(bar, n, 'sm-chip', () => { S.mode = m; mb.forEach(x => x.classList.toggle('on', x === b)); draw(); }); return b; });
    mb[0].classList.add('on');
    toggle(bar, 'Show components', S.comp, v => { S.comp = v; draw(); });
    const tb = el('div', 'sm-tablew'); root.appendChild(tb);
    const ro = readouts(root);
    function draw() {
      const r = d => d * Math.PI / 180, Ax = S.A * Math.cos(r(S.a)), Ay = S.A * Math.sin(r(S.a)), Bx = S.B * Math.cos(r(S.b)), By = S.B * Math.sin(r(S.b)), Rx = Ax + Bx, Ry = Ay + By;
      const ctx = cv.ctx, { w, h } = cv.size(0.62, 280, 460);
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const xs = [0, Ax, Bx, Rx], ys = [0, Ay, By, Ry], span = Math.max(4, Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
      const sc = Math.min(w, h) * 0.8 / span, cx = w / 2 - (Math.max(...xs) + Math.min(...xs)) / 2 * sc, cy = h / 2 + (Math.max(...ys) + Math.min(...ys)) / 2 * sc;
      const X = x => cx + x * sc, Y = y => cy - y * sc;
      ctx.strokeStyle = '#E3E6D8'; ctx.lineWidth = 1;
      for (let i = -30; i <= 30; i++) { ctx.beginPath(); ctx.moveTo(X(i), 0); ctx.lineTo(X(i), h); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, Y(i)); ctx.lineTo(w, Y(i)); ctx.stroke(); }
      ctx.strokeStyle = '#9AA08C'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(0, Y(0)); ctx.lineTo(w, Y(0)); ctx.moveTo(X(0), 0); ctx.lineTo(X(0), h); ctx.stroke();
      text(ctx, 'x', w - 12, Y(0) - 6, { it: 1, c: COL.sub }); text(ctx, 'y', X(0) + 6, 14, { it: 1, c: COL.sub });
      const dash = (x1, y1, x2, y2, col) => { ctx.setLineDash([5, 4]); ctx.strokeStyle = col; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(X(x1), Y(y1)); ctx.lineTo(X(x2), Y(y2)); ctx.stroke(); ctx.setLineDash([]); };
      const lab = (s, x, y, col, dx, dy) => { const L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L; text(ctx, s, X(x) + nx * 14, Y(y) - ny * 14 + 5, { b: 1, it: 1, fs: 14, c: col, a: 'center' }); };
      const CA = COL.v, CB = COL.gr, CR = COL.r;
      if (S.mode === 'tri') {
        arrow(ctx, X(0), Y(0), X(Ax), Y(Ay), CA, 3.2); arrow(ctx, X(Ax), Y(Ay), X(Rx), Y(Ry), CB, 3.2);
        lab('A', Ax / 2, Ay / 2, CA, Ax, Ay); lab('B', Ax + Bx / 2, Ay + By / 2, CB, Bx, By);
      } else {
        dash(Ax, Ay, Rx, Ry, '#9AA08C'); dash(Bx, By, Rx, Ry, '#9AA08C');
        arrow(ctx, X(0), Y(0), X(Ax), Y(Ay), CA, 3.2); arrow(ctx, X(0), Y(0), X(Bx), Y(By), CB, 3.2);
        lab('A', Ax / 2, Ay / 2, CA, Ax, Ay); lab('B', Bx / 2, By / 2, CB, Bx, By);
      }
      arrow(ctx, X(0), Y(0), X(Rx), Y(Ry), CR, 3.6); lab('R = A + B', Rx * 0.55, Ry * 0.55, CR, -Rx, -Ry);
      if (S.comp) { arrow(ctx, X(0), Y(0), X(Rx), Y(0), COL.o, 2.4); arrow(ctx, X(Rx), Y(0), X(Rx), Y(Ry), COL.o, 2.4); text(ctx, 'Rx', X(Rx / 2), Y(0) + (Ry >= 0 ? 16 : -8), { c: COL.o, b: 1, a: 'center' }); text(ctx, 'Ry', X(Rx) + 6, Y(Ry / 2), { c: COL.o, b: 1 }); }
      const R = Math.hypot(Rx, Ry); let th = Math.atan2(Ry, Rx) * 180 / Math.PI; if (th < 0) th += 360;
      tb.innerHTML = `<table class="sm-table"><thead><tr><th>Vector</th><th>x-component</th><th>y-component</th></tr></thead><tbody>
        <tr><td><b style="color:${CA}">A</b></td><td>${fmt(S.A)} cos ${S.a}° = ${fmt(Ax)}</td><td>${fmt(S.A)} sin ${S.a}° = ${fmt(Ay)}</td></tr>
        <tr><td><b style="color:${CB}">B</b></td><td>${fmt(S.B)} cos ${S.b}° = ${fmt(Bx)}</td><td>${fmt(S.B)} sin ${S.b}° = ${fmt(By)}</td></tr>
        <tr class="sum"><td><b style="color:${CR}">R</b></td><td>ΣFx = ${fmt(Rx)}</td><td>ΣFy = ${fmt(Ry)}</td></tr></tbody></table>`;
      const dth = Math.abs(((S.b - S.a) % 360 + 540) % 360 - 180);
      ro([['|R| = √(Rx² + Ry²)', fmt(R), 'hl'], ['direction from +x axis', fmt(th, 1) + '°', 'hl'], ['angle between A and B', fmt(dth, 0) + '°'], ['A · B = AB cos θ', fmt(S.A * S.B * Math.cos(r(dth)))], ['|A × B| = AB sin θ', fmt(S.A * S.B * Math.sin(r(dth)))]]);
    }
    new ResizeObserver(() => draw()).observe(root);
    mark('Example 1.13 (10 N at 45°, 5 N at 150°)'); Object.assign(S, { A: 10, a: 45, B: 5, b: 150 }); sA.set(10); sa.set(45); sB.set(5); sb.set(150);
    draw(); void loop;
  });

  window.PhysiQLessons.register('LESSON-1', { html: () => S });
})();
