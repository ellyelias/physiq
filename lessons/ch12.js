/* Chapter 12 Heat Transfer: full notes by Cikgu Suhaili (from STPM_2027_UNIT_12_HEAT_TRANSFER_TEACHERS_VERSION.pptx). */
(function () {
  'use strict';
  const { card, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4, rw } = window.PhysiQLessons.H;
  const dQ = fr('d<i>Q</i>', 'd<i>t</i>'), dT = fr('dθ', 'd<i>x</i>');

  const F = {};
  F.rod = () => svg(360, 130, `<rect x="40" y="30" width="280" height="40" fill="url(#gradRod)" stroke="${C.ink}"/><defs><linearGradient id="gradRod"><stop offset="0" stop-color="#E5533D"/><stop offset="1" stop-color="#7FB2E5"/></linearGradient></defs>` +
    `<rect x="40" y="22" width="280" height="8" fill="#CFC6A8"/><rect x="40" y="70" width="280" height="8" fill="#CFC6A8"/>` + [90, 150, 210, 270].map(x => L(x - 20, 50, x + 20, 50, 'r', 'e', { w: 2 })).join('') +
    T(36, 56, 'θ₁', { a: 'end', it: 1, b: 1 }) + T(326, 56, 'θ₂', { a: 'start', it: 1, b: 1 }) + L(40, 98, 320, 98, 'k', 'b', { w: 1.2 }) + T(180, 114, 'x', { it: 1 }) + T(180, 16, 'insulation (lagging)', { fs: 11, c: C.sub }) + T(350, 30, 'A', { it: 1, b: 1 }));
  F.profiles = () => two(svg(240, 170, axes(40, 140, 180, 120, 'x', 'θ', { noO: 1 }) + P('M40,40 L200,120', 'r', { w: 2.6 }) + T(40, 160, 'X', { b: 1 }) + T(200, 160, 'Y', { b: 1 }) + T(130, 60, 'lagged: straight line,', { fs: 11 }) + T(130, 74, 'constant gradient', { fs: 11 }), 240),
    svg(240, 170, axes(40, 140, 180, 120, 'x', 'θ', { noO: 1 }) + P('M40,40 C80,85 140,118 200,124', 'r', { w: 2.6 }) + T(40, 160, 'X', { b: 1 }) + T(200, 160, 'Y', { b: 1 }) + T(140, 60, 'unlagged: curve, gradient', { fs: 11 }) + T(140, 74, 'decreases from X to Y', { fs: 11 }), 240));
  F.comp = () => svg(320, 170, axes(40, 140, 260, 120, 'x', 'θ', { noO: 1 }) + `<rect x="40" y="148" width="110" height="14" fill="#E9B7A8"/><rect x="150" y="148" width="130" height="14" fill="#A8C8E9"/>` + T(95, 159, 'C', { fs: 11, b: 1 }) + T(215, 159, 'D', { fs: 11, b: 1 }) +
    P('M40,30 L150,60 L280,125', 'r', { w: 2.6 }) + L(150, 60, 150, 140, 's', '', { d: '3 3', w: 1 }) + T(156, 56, 'interface', { fs: 11, a: 'start' }) + T(70, 30, 'smaller gradient', { fs: 11, a: 'start' }) + T(230, 90, 'larger gradient', { fs: 11, a: 'start' }));
  F.spectra = () => {
    const X = l => 40 + l / 3000 * 300, Y = I => 170 - I * 140, b = 2.898e-3, plk = (lnm, Tk) => { const l = lnm * 1e-9; return 1 / (Math.pow(l, 5) * (Math.exp(1.4388e-2 / (l * Tk)) - 1)); };
    const Ts = [[6000, '#3F6AE8'], [5000, '#2F9E44'], [4000, '#E8A23F'], [3000, '#C0392B']], m = plk(b / 6000 * 1e9, 6000);
    let body = axes(40, 170, 320, 155, 'λ / nm', 'I', { noO: 1 });
    Ts.forEach(([Tk, c]) => { let d = ''; for (let l = 100; l <= 3000; l += 20) d += (d ? ' L' : 'M') + X(l).toFixed(1) + ',' + Y(plk(l, Tk) / m).toFixed(1); body += P(d, c, { w: 2.2 }); const lp = b / Tk * 1e9; body += dot(X(lp), Y(plk(lp, Tk) / m), 3, c) + T(X(lp) + 6, Y(plk(lp, Tk) / m) - 4, Tk + ' K', { fs: 11, c, a: 'start' }); });
    body += `<rect x="${X(400)}" y="172" width="${X(700) - X(400)}" height="6" fill="url(#vis)"/><defs><linearGradient id="vis"><stop offset="0" stop-color="#7B2FF7"/><stop offset=".3" stop-color="#2F6FE0"/><stop offset=".55" stop-color="#2FBF3F"/><stop offset=".8" stop-color="#F2D92F"/><stop offset="1" stop-color="#E5332F"/></linearGradient></defs>` + [500, 1000, 1500, 2000, 2500].map(l => T(X(l), 192, l, { fs: 10, c: C.sub })).join('');
    return svg(380, 200, body, 420);
  };
  F.pot = () => svg(220, 180, `<path d="M40,40 L40,150 L180,150 L180,40" fill="#DDEBFA" stroke="${C.ink}" stroke-width="2"/>` + P('M70,140 C60,90 70,70 110,60 C150,70 160,90 150,140 C140,120 120,110 110,110 C100,110 80,120 70,140 Z', 'r', { w: 2 }) + L(110, 145, 110, 75, 'r', 'e', { w: 2 }) + `<path d="M60,160 Q70,150 80,160 T100,160 T120,160 T140,160 T160,160" fill="none" stroke="#F2661B" stroke-width="3"/>` + T(110, 176, 'heat from below', { fs: 11, c: C.o }));

  const S = `
${sec('12-0', 'Heat', `
${def('Heat', `is the ${red('energy transferred from one body to another because of a temperature difference')}.`)}
${ul([`Heat always flows from a region of higher temperature to a region of lower temperature, until thermal equilibrium is reached.`, `Heat is a scalar; unit joule (J).`, `Heat is transferred by three mechanisms: <b>conduction</b>, <b>convection</b> and <b>radiation</b>.`])}
`)}

${sec('12-1', '12.1 Conduction', `
${def('Conduction', `is the process by which ${red('heat is transferred through a substance from a region of high temperature to a region of lower temperature')}, without any movement of the substance as a whole.`)}
${h4('Mechanism of conduction')}
${two(`<p><b>In a non-metal (insulator) rod</b></p>${ul([`At the hot end A, the molecules receive heat and vibrate faster, with larger amplitude.`, `They collide with neighbouring, colder molecules and pass energy to them.`, `The energy is passed along molecule by molecule (lattice vibrations) until the cold end B becomes hot.`])}`,
  `<p><b>In a metal rod</b></p>${ul([`A metal has many <b>free electrons</b>.`, `At the heated end A the free electrons gain thermal energy and move faster.`, `They travel quickly through the metal and collide with atoms in the colder regions, transferring energy to them (in addition to the lattice vibrations).`, `Free electrons are light and fast, so this transfer is much quicker: <b>metals conduct heat much faster than insulators</b>.`])}`)}
${h4('Rate of heat flow')}
${fig(F.rod(), 'A lagged rod of cross-sectional area A and length x, ends at θ₁ > θ₂. No heat is lost from the sides.')}
${def('Steady state', `is reached when the ${red('temperature at every point of the rod no longer changes with time')}; the rate of heat flow is then the same through every cross-section.`)}
<p>The rate of heat flow through the rod depends on (a) the cross-sectional area <i>A</i>, (b) the temperature gradient, and (c) the material of the rod (e.g. copper or iron).</p>
${def('Temperature gradient', `is the ${red('change in temperature per unit length')} along the direction of heat flow: ${dT} (unit K m<sup>−1</sup> or °C m<sup>−1</sup>).`)}
${key(`${dQ} ∝ <i>A</i> ${dT} &nbsp; ⇒ &nbsp; ${dQ} = −<i>kA</i>${dT}`, 'the minus sign: heat flows in the direction of decreasing temperature. Unit of the rate of heat flow: J s<sup>−1</sup> = W')}
${def('Thermal conductivity, <i>k</i>', `is the ${red('rate of heat flow per unit cross-sectional area per unit temperature gradient')}, perpendicular to the area: <i>k</i> = −${fr('d<i>Q</i>/d<i>t</i>', '<i>A</i>(dθ/d<i>x</i>)')}. Unit W m<sup>−1</sup> K<sup>−1</sup>. Good conductors have large <i>k</i>.`)}
${table(['Substance', '<i>k</i> / W m<sup>−1</sup> K<sup>−1</sup>'], [['Silver', '406.0'], ['Copper', '385.0'], ['Steel', '50.2'], ['Glass', '0.8'], ['Wood', '0.08']])}
${h4('Insulated (lagged) and non-insulated (unlagged) rods')}
${F.profiles()}
${ul([`<b>Unlagged</b> bar XY: heat is lost from the sides, so less heat reaches the far end. The rate of heat flow decreases along the bar and the temperature gradient decreases from X to Y: the θ–<i>x</i> graph is a <b>curve</b>.`, `<b>Lagged</b> bar: no heat is lost from the sides. The rate of heat flow is the same everywhere and, with <i>A</i> and <i>k</i> constant, the temperature gradient is <b>constant</b>: the θ–<i>x</i> graph is a <b>straight line</b>, ${dT} = ${fr('θ<sub>2</sub> − θ<sub>1</sub>', '<i>x</i>')}.`])}
${h4('Heat conduction through layers of different materials')}
${two(fig(F.comp()), ul([`In a lagged composite bar of materials C and D at steady state, the <b>rate of heat flow is the same through both</b>: <i>k</i><sub>C</sub><i>A</i>${fr('Δθ<sub>C</sub>', '<i>x</i><sub>C</sub>')} = <i>k</i><sub>D</sub><i>A</i>${fr('Δθ<sub>D</sub>', '<i>x</i><sub>D</sub>')}.`, `With the same <i>A</i>: <i>k</i><sub>C</sub>(dθ/d<i>x</i>)<sub>C</sub> = <i>k</i><sub>D</sub>(dθ/d<i>x</i>)<sub>D</sub>, so the material with the <b>smaller <i>k</i> has the larger temperature gradient</b> (the steeper line).`]))}
${sim('conduct', 'Conduction through a composite bar', 'Choose the two materials and their lengths, and set the end temperatures. The graph shows the steady-state temperature along the bar, the interface temperature and the rate of heat flow. Switch off the lagging to see the curve of an unlagged bar.')}
${example('12.1', `A metal cube of side 8 cm has thermal conductivity 250 W m<sup>−1</sup> K<sup>−1</sup>. Two opposite faces are at 90 °C and 10 °C. Calculate (a) the temperature gradient in the cube, (b) the heat that flows through it in 10 minutes. (Steady flow, no heat lost to the surroundings.)`,
  steps([`<i>A</i> = (8 × 10<sup>−2</sup>)<sup>2</sup> = 64 × 10<sup>−4</sup> m<sup>2</sup>`, `(a) ${dT} = ${fr('10 − 90', '8 × 10<sup>−2</sup>')} = <b>−1.0 × 10<sup>3</sup> K m<sup>−1</sup></b>`, `(b) ${dQ} = −<i>kA</i>${dT} = (250)(64 × 10<sup>−4</sup>)(1.0 × 10<sup>3</sup>) = 1600 W; <i>Q</i> = 1600 × 600 = <b>9.6 × 10<sup>5</sup> J</b>`]))}
${example('12.2', `A 5 mm copper plate is sealed to a 10 mm aluminium plate; both have area 1 m<sup>2</sup>. The outer face of the copper is at 100 °C and that of the aluminium at 80 °C. (a) Find the temperature of the copper–aluminium interface. (b) Calculate the rate of heat flow. (<i>k</i><sub>Cu</sub> = 400, <i>k</i><sub>Al</sub> = 200 W m<sup>−1</sup> °C<sup>−1</sup>)`,
  steps([`(a) Same rate through both: ${fr('400(1)(100 − θ)', '5 × 10<sup>−3</sup>')} = ${fr('200(1)(θ − 80)', '10 × 10<sup>−3</sup>')} ⇒ 4(100 − θ) = θ − 80 ⇒ <b>θ = 96 °C</b>`, `(b) ${dQ} = ${fr('400(1)(100 − 96)', '5 × 10<sup>−3</sup>')} = <b>3.2 × 10<sup>5</sup> W</b>`]))}
${exercises('Exercises: conduction', [
  { q: `A metal plate 5.0 cm thick has area 300 cm<sup>2</sup>. One face is kept at 100 °C (steam) and the other at 30 °C (flowing water). The rate of heat flow is 9 kW. Find the thermal conductivity of the metal.`, a: `214 W m<sup>−1</sup> K<sup>−1</sup>` },
  { q: `A 1.300 m rod is made of 0.800 m of aluminium joined end to end to 0.500 m of brass. The free end of the aluminium is at 150.0 °C and that of the brass at 20.0 °C; no heat is lost from the sides. Find the temperature of the junction. (<i>k</i><sub>Al</sub> = 205, <i>k</i><sub>brass</sub> = 109 W m<sup>−1</sup> °C<sup>−1</sup>)`, a: `90.2 °C` }])}
`)}

${sec('12-2', '12.2 Convection', `
${two(`${def('Convection', `is the process by which ${red('heat is transferred from one part of a fluid to another by the movement of the fluid itself')}. It occurs in liquids and gases.`)}${ul([`The fluid moves because its density changes when it is heated.`, `In a pot of water heated from below, the heated water at the bottom expands, its density falls and it rises; cooler, denser water sinks to take its place. The water circulates in a <b>convection current</b>.`])}`, fig(F.pot()))}
${table(['Natural (free) convection', 'Forced convection'], [['The fluid moves because of density differences caused by heating.', 'The fluid is made to move by a pump or a fan.'], ['e.g. warm and cold ocean currents, land and sea breezes, water heated in a pot', 'e.g. air heated and blown into a room by a fan; car radiator cooling']])}
`)}

${sec('12-3', '12.3 Radiation', `
${def('Radiation', `is the process by which ${red('heat is transferred by electromagnetic waves')} (infrared, visible light, ultraviolet). It can take place in a vacuum.`)}
${ul([`All objects radiate energy continuously as electromagnetic waves produced by the thermal motion of their particles.`, `The wavelengths emitted depend on the temperature: the lower the temperature, the longer the wavelength at which most energy is emitted.`])}
${def('Stefan–Boltzmann law', `The ${red('rate of energy radiated per unit surface area of a body is proportional to the fourth power of its absolute temperature')}.`)}
${key(`${dQ} = <i>P</i> = <i>e</i>σ<i>AT</i><sup>4</sup>`, 'σ = 5.67 × 10<sup>−8</sup> W m<sup>−2</sup> K<sup>−4</sup> (Stefan–Boltzmann constant); <i>A</i> = surface area; <i>T</i> in kelvin; <i>e</i> = emissivity, 0 ≤ <i>e</i> ≤ 1 (dimensionless)')}
${ul([`<i>e</i> = 0: ideal reflector; <i>e</i> = 1: ideal absorber (a black body). A good absorber is also a good emitter.`, `An object at <i>T</i><sub>0</sub> in surroundings at <i>T</i><sub>s</sub> also absorbs radiation from them. The <b>net</b> rate of energy radiated is <i>P</i><sub>net</sub> = <i>e</i>σ<i>A</i>(<i>T</i><sub>0</sub><sup>4</sup> − <i>T</i><sub>s</sub><sup>4</sup>).`, `<i>P</i><sub>net</sub> positive: net heat flows out and the body cools. Negative: net heat flows in and the body warms.`])}
${example('12.3', `Tungsten has emissivity 0.35. A tungsten sphere of radius 3.00 cm hangs in a large evacuated enclosure whose walls are at 300 K. What power input keeps the sphere at 2500 K? (Ignore conduction along the supports; σ = 5.67 × 10<sup>−8</sup> W m<sup>−2</sup> K<sup>−4</sup>)`,
  steps([`<i>A</i> = 4π<i>r</i><sup>2</sup> = 4π(3.00 × 10<sup>−2</sup>)<sup>2</sup> = 1.13 × 10<sup>−2</sup> m<sup>2</sup>`, `<i>P</i><sub>net</sub> = <i>e</i>σ<i>A</i>(<i>T</i><sub>0</sub><sup>4</sup> − <i>T</i><sub>s</sub><sup>4</sup>) = (0.35)(5.67 × 10<sup>−8</sup>)(1.13 × 10<sup>−2</sup>)(2500<sup>4</sup> − 300<sup>4</sup>) = <b>8.77 kW</b>`]))}
${exercises('Exercise: radiation', [{ q: `(a) Find the power radiated by a tungsten sphere (<i>e</i> = 0.35) of radius 18.0 cm at 25 °C. (b) If the sphere is in a room whose walls are at −5 °C, find the net rate of energy flow out of the sphere.`, a: `(a) 64 W &nbsp; (b) 22 W` }])}
${h4('Black body and its emission spectra')}
${def('Black body', `is an ${red('ideal body that absorbs all the radiation incident on it')} (<i>e</i> = 1); it is also the best possible emitter of thermal radiation at every wavelength.`)}
${two(fig(F.spectra(), 'Black-body emission spectra at four temperatures (same vertical scale).'), ul([`At a given temperature a black body emits a <b>continuous spectrum</b> over a range of wavelengths, with a peak at λ<sub>max</sub>.`, `As the temperature increases, the <b>total energy radiated</b> (the area under the curve) increases (∝ <i>T</i><sup>4</sup>).`, `The <b>peak shifts to shorter wavelengths</b>, and the curve becomes taller and narrower.`]))}
${def('Wien’s displacement law', `The ${red('wavelength at which a black body emits most strongly is inversely proportional to its absolute temperature')}.`)}
${key(`λ<sub>max</sub><i>T</i> = <i>b</i>`, '<i>b</i> = 2.898 × 10<sup>−3</sup> m K (Wien’s constant)')}
${sim('blackbody', 'Black-body spectrum and Wien’s law', 'Change the temperature. The peak wavelength follows λmax = b/T and the total power grows as T⁴. Compare a hot star, the Sun, a light bulb filament and a human body.')}
${card('Example · Wien’s law', `The Sun’s surface is at about 5800 K. Estimate the wavelength at which it radiates most strongly.`,
  eq(`λ<sub>max</sub> = ${fr('<i>b</i>', '<i>T</i>')} = ${fr('2.898 × 10<sup>−3</sup>', '5800')} ≈ <b>5.0 × 10<sup>−7</sup> m = 500 nm</b> (visible light)`))}
`)}

${sec('12-4', '12.4 Global warming', `
${h4('The greenhouse effect')}
${ul([`The Sun sends energy as light and heat. Some is reflected back into space; the rest passes through the atmosphere and warms the Earth.`, `The Earth radiates heat back towards space as <b>infrared</b> radiation (longer wavelength, because the Earth is much cooler than the Sun).`, `Some gases in the atmosphere (<b>greenhouse gases</b>) absorb this infrared radiation and re-emit part of it back towards the Earth, trapping heat like a blanket. This is the <b>natural greenhouse effect</b>; without it the Earth would be much colder and could not support life.`])}
${def('Global warming', `is the ${red('increase in the average temperature of the Earth')} caused by the <b>enhanced greenhouse effect</b>: human activities increase the amount of greenhouse gases, so more heat is trapped and less escapes to space.`)}
${table(['Natural greenhouse effect', 'Enhanced greenhouse effect'], [['The atmosphere traps some of the heat radiated by the Earth.', 'More greenhouse gases trap more heat.'], ['Some heat still escapes to space.', 'Less heat escapes to space.'], ['The Earth stays warm enough for life.', 'The Earth heats up and the climate changes.']])}
${h4('Greenhouse gases and human activity')}
${ul([`The atmosphere is 78% nitrogen and 21% oxygen, which do not trap heat. The greenhouse gases make up less than 1%: <b>carbon dioxide, methane, nitrous oxide, ozone, water vapour and halocarbons</b>.`, `<b>Carbon dioxide</b>: burning fossil fuels (the largest source) and deforestation (fewer trees to absorb CO<sub>2</sub>).`, `<b>Methane</b>: livestock farming, flooded rice fields and decomposing rubbish in landfills; the amount has increased about two and a half times since the Industrial Revolution.`])}
${h4('Ways to reduce global warming')}
${ul([`Switch to renewable energy: solar, wind and hydroelectric power instead of fossil fuels.`, `Improve energy efficiency: energy-saving appliances, insulated buildings, less wasted electricity.`, `Reduce, reuse and recycle: less waste in landfills, so less methane.`, `Plant trees (reforestation and afforestation) to absorb carbon dioxide.`, `Use public transport and electric vehicles to cut emissions.`, `Support sustainable policies and international agreements to limit greenhouse gas emissions.`])}
`)}

${sec('12-rw', 'Real-World Physics: warming and the Nepal glacier collapse', rw({
  id: 'ls-12-rw-nepal',
  meta: 'Langtang, Nepal · 26 August 2026',
  title: 'Can a warmer Earth bring a mountain down?',
  lead: `<p>On 26 August 2026 part of a glacier on Langtang Lirung, Nepal, collapsed and fell about 1200 m. The ice and rock turned into a debris flow and flash flood that travelled almost 100 km downstream and killed more than 1400 people. Six weeks later, on 11 October, a suspected landslide dam burst on the Budhi Gandaki river and swept away homes and bridges in Gorkha.</p><p>The exact cause of the glacier collapse is <b>still being investigated</b>, but scientists are studying the role of warming: the Langtang Lirung glacier retreated by roughly 460 m between 1990 and 2020, and unusually warm conditions were detected around the glacier in the days before it failed.</p>`,
  video: { id: 'gowCz9olnhk', title: 'How a Mountain Collapse Became Nepal’s Catastrophic Flood', channel: 'Project Quantum', len: '5:45' },
  watch: 'note how the collapse started high on the mountain, and listen for why scientists say risks in the Himalayas are growing.',
  physics: ul([`The <b>enhanced greenhouse effect</b> traps more infrared radiation, so the average temperature of the Earth rises. High mountains are warming faster than the global average.`, `Warmer air melts more ice. Meltwater seeps into cracks in the glacier, and thawing <b>permafrost</b> (frozen ground that acts like glue on steep slopes) weakens the bond between ice and rock.`, `A weakened slope can fail suddenly. Gravitational potential energy is then converted into the kinetic energy of a fast debris flow (Chapter 4).`]),
  qs: [
    { q: `Which statement best explains why glaciers on steep mountains may become more likely to collapse as the Earth warms?`, opts: ['Meltwater seeps into cracks and thawing permafrost weakens the bond between the ice and the rock.', 'Greenhouse gases increase the weight of the ice on the slope.', 'Higher temperatures increase the gravitational field strength on mountain slopes.', 'Infrared radiation makes the ice denser so it slides more easily.'], ans: 0,
      why: `<p>Warming adds liquid water and removes the frozen “glue” that holds ice and rock to steep slopes. The weight of the ice and <i>g</i> do not change.</p>` },
    { q: `The Sun emits mostly visible light but the Earth emits mostly infrared radiation. This is because`, opts: ['the Earth has a higher emissivity than the Sun.', 'greenhouse gases convert visible light into infrared radiation.', 'the Earth’s surface temperature is much lower, so its peak wavelength is much longer.', 'the Earth is much smaller than the Sun.'], ans: 2,
      why: `<p>Wien’s displacement law: λ<sub>max</sub><i>T</i> = <i>b</i>. A lower <i>T</i> gives a longer λ<sub>max</sub>. For the Earth (<i>T</i> ≈ 288 K), λ<sub>max</sub> = ${fr('2.898 × 10<sup>−3</sup>', '288')} ≈ 1.0 × 10<sup>−5</sup> m, which is in the infrared.</p>` },
    { q: `Which action directly reduces the enhanced greenhouse effect?`, opts: ['Clearing forests to open new farmland.', 'Replacing coal-fired power stations with solar and wind power.', 'Sending more household rubbish to open landfills.', 'Using air-conditioners at a lower temperature setting.'], ans: 1,
      why: `<p>Burning fossil fuels is the largest source of carbon dioxide. Renewable energy cuts CO<sub>2</sub> emissions. Deforestation and landfills increase greenhouse gases, and lower air-conditioner settings use more electricity.</p>` }
  ],
  src: `Sources: Reuters; BBC; Yale Environment 360; The Conversation; ICIMOD (reports from August–October 2026). Video by an independent channel: preview before use in class. <a href="https://www.youtube.com/watch?v=gowCz9olnhk" target="_blank" rel="noopener">youtube.com/watch?v=gowCz9olnhk</a>`
}))}`;

  // ---------- simulation: conduction through a composite bar ----------
  window.PhysiQSims.add('conduct', function (root) {
    const { COL, fmt, el, slider, toggle, button, canvas, text, panel, readouts } = window.PhysiQSims.U;
    const MAT = [['Copper', 385], ['Aluminium', 205], ['Brass', 109], ['Steel', 50.2], ['Glass', 0.8]];
    const S = { k1: 205, k2: 109, x1: 0.8, x2: 0.5, T1: 150, T2: 20, lag: true };
    const r1 = el('div', 'sm-row sm-pre'); root.appendChild(r1); text;
    const lab1 = el('span', 'sm-sl-l', 'material C:'); r1.appendChild(lab1);
    const b1 = MAT.map(([n, k]) => { const b = button(r1, n, 'sm-chip', () => { S.k1 = k; b1.forEach(x => x.classList.toggle('on', x === b)); draw(); }); if (k === S.k1) b.classList.add('on'); return b; });
    const r2 = el('div', 'sm-row sm-pre'); root.appendChild(r2); r2.appendChild(el('span', 'sm-sl-l', 'material D:'));
    const b2 = MAT.map(([n, k]) => { const b = button(r2, n, 'sm-chip', () => { S.k2 = k; b2.forEach(x => x.classList.toggle('on', x === b)); draw(); }); if (k === S.k2) b.classList.add('on'); return b; });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'length of C', 0.1, 1, 0.05, S.x1, 'm', v => { S.x1 = v; draw(); });
    slider(ctl, 'length of D', 0.1, 1, 0.05, S.x2, 'm', v => { S.x2 = v; draw(); });
    slider(ctl, 'hot end θ₁', 50, 300, 5, S.T1, '°C', v => { S.T1 = v; draw(); });
    slider(ctl, 'cold end θ₂', 0, 50, 5, S.T2, '°C', v => { S.T2 = v; draw(); });
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    toggle(bar, 'Lagged (insulated) bar', S.lag, v => { S.lag = v; draw(); });
    const cv = canvas(root); const ro = readouts(root);
    function draw() {
      const A = 1e-4, Ti = (S.k1 * S.T1 / S.x1 + S.k2 * S.T2 / S.x2) / (S.k1 / S.x1 + S.k2 / S.x2), rate = S.k1 * A * (S.T1 - Ti) / S.x1, L0 = S.x1 + S.x2;
      const ctx = cv.ctx, { w, h } = cv.size(0.45, 240, 340); ctx.clearRect(0, 0, w, h);
      const p = panel(ctx, { x: 56, y: 24, w: w - 76, h: h - 100 }, 0, L0, 0, Math.max(S.T1, 60) * 1.08, 'x / m', 'θ', '/ °C');
      // bar picture
      const by = h - 46; const g = ctx.createLinearGradient(p.X(0), 0, p.X(L0), 0); g.addColorStop(0, '#E5533D'); g.addColorStop(1, '#7FB2E5');
      ctx.fillStyle = '#E9B7A8'; ctx.fillRect(p.X(0), by, p.X(S.x1) - p.X(0), 14); ctx.fillStyle = '#A8C8E9'; ctx.fillRect(p.X(S.x1), by, p.X(L0) - p.X(S.x1), 14);
      text(ctx, 'C', (p.X(0) + p.X(S.x1)) / 2, by + 11, { a: 'center', b: 1, fs: 11 }); text(ctx, 'D', (p.X(S.x1) + p.X(L0)) / 2, by + 11, { a: 'center', b: 1, fs: 11 });
      if (S.lag) { ctx.fillStyle = '#CFC6A8'; ctx.fillRect(p.X(0), by - 4, p.X(L0) - p.X(0), 4); ctx.fillRect(p.X(0), by + 14, p.X(L0) - p.X(0), 4); }
      ctx.strokeStyle = COL.r; ctx.lineWidth = 3; ctx.beginPath();
      if (S.lag) { ctx.moveTo(p.X(0), p.Y(S.T1)); ctx.lineTo(p.X(S.x1), p.Y(Ti)); ctx.lineTo(p.X(L0), p.Y(S.T2)); }
      else { // unlagged: side losses to a 20 °C room give a sagging curve (fin equation with both ends fixed)
        const room = 20, m = 3 / L0, sh = Math.sinh(m * L0);
        for (let i = 0; i <= 80; i++) { const x = L0 * i / 80, y = room + (S.T1 - room) * Math.sinh(m * (L0 - x)) / sh + (S.T2 - room) * Math.sinh(m * x) / sh; i ? ctx.lineTo(p.X(x), p.Y(y)) : ctx.moveTo(p.X(x), p.Y(y)); }
      }
      ctx.stroke();
      if (S.lag) { ctx.fillStyle = COL.ink; ctx.beginPath(); ctx.arc(p.X(S.x1), p.Y(Ti), 4.5, 0, 7); ctx.fill(); text(ctx, fmt(Ti, 1) + ' °C', p.X(S.x1) + 8, p.Y(Ti) - 8, { b: 1, fs: 12 }); }
      text(ctx, S.lag ? 'Lagged: straight lines; the material with smaller k has the steeper gradient' : 'Unlagged: heat escapes from the sides, so the gradient decreases along the bar', w - 10, 16, { a: 'right', fs: 11, b: 1, c: COL.gr });
      ro(S.lag ? [['interface temperature', fmt(Ti, 1) + ' °C', 'hl'], ['gradient in C', fmt((Ti - S.T1) / S.x1, 1) + ' °C/m'], ['gradient in D', fmt((S.T2 - Ti) / S.x2, 1) + ' °C/m'], ['rate of heat flow (A = 1 cm²)', fmt(rate, 2) + ' W', 'hl']] : [['lagging', 'none: rate of flow falls along the bar']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- simulation: black-body spectrum ----------
  window.PhysiQSims.add('blackbody', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, panel, readouts } = window.PhysiQSims.U;
    const b = 2.898e-3, sig = 5.67e-8, S = { T: 5800 };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const sl = { set() {} };
    [['Hot blue star 10 000 K', 10000], ['Sun 5800 K', 5800], ['Bulb filament 3000 K', 3000], ['Red-hot iron 1000 K', 1000], ['Human body 310 K', 310]].forEach(([n, T]) => button(pre, n, 'sm-chip', () => { S.T = T; sl.set(T); draw(); }));
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    Object.assign(sl, slider(ctl, 'temperature', 300, 12000, 10, S.T, 'K', v => { S.T = v; draw(); }));
    const cv = canvas(root); const ro = readouts(root);
    const plk = (l, T) => 3.7418e-16 / (Math.pow(l, 5) * (Math.expm1(1.4388e-2 / (l * T))));
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.5, 260, 360); ctx.clearRect(0, 0, w, h);
      const lp = b / S.T, lmax = Math.min(Math.max(3000e-9, lp * 4), 40e-6), Imax = plk(lp, S.T);
      const p = panel(ctx, { x: 56, y: 24, w: w - 76, h: h - 64 }, 0, lmax * 1e9, 0, 1.1, 'λ / nm', 'I', '(relative)');
      if (lmax <= 5000e-9) { const g = ctx.createLinearGradient(p.X(380), 0, p.X(750), 0); [['#7B2FF7', 0], ['#2F6FE0', .25], ['#2FBF3F', .5], ['#F2D92F', .75], ['#E5332F', 1]].forEach(([c, o]) => g.addColorStop(o, c)); ctx.fillStyle = g; ctx.globalAlpha = 0.25; ctx.fillRect(p.X(380), p.Y(1.1), p.X(750) - p.X(380), p.Y(0) - p.Y(1.1)); ctx.globalAlpha = 1; text(ctx, 'visible', p.X(565), p.Y(1.05), { a: 'center', fs: 11, c: COL.sub }); }
      ctx.beginPath(); ctx.moveTo(p.X(0), p.Y(0)); for (let i = 1; i <= 300; i++) { const l = lmax * i / 300; ctx.lineTo(p.X(l * 1e9), p.Y(plk(l, S.T) / Imax)); } ctx.lineTo(p.X(lmax * 1e9), p.Y(0)); ctx.closePath(); ctx.fillStyle = 'rgba(242,102,27,.18)'; ctx.fill();
      ctx.strokeStyle = COL.o; ctx.lineWidth = 2.8; ctx.beginPath(); for (let i = 1; i <= 300; i++) { const l = lmax * i / 300; i > 1 ? ctx.lineTo(p.X(l * 1e9), p.Y(plk(l, S.T) / Imax)) : ctx.moveTo(p.X(l * 1e9), p.Y(plk(l, S.T) / Imax)); } ctx.stroke();
      ctx.setLineDash([4, 4]); ctx.strokeStyle = COL.v; ctx.beginPath(); ctx.moveTo(p.X(lp * 1e9), p.Y(0)); ctx.lineTo(p.X(lp * 1e9), p.Y(1)); ctx.stroke(); ctx.setLineDash([]);
      text(ctx, 'λmax = ' + fmt(lp * 1e9, 0) + ' nm', p.X(lp * 1e9) + 6, p.Y(1) + 14, { b: 1, fs: 12, c: COL.v });
      text(ctx, 'each curve is scaled to its own peak; the real peak height grows as T⁵', w - 10, h - 4, { a: 'right', fs: 10, c: COL.sub });
      const region = lp < 380e-9 ? 'ultraviolet' : lp <= 750e-9 ? 'visible' : 'infrared';
      ro([['temperature', fmt(S.T, 0) + ' K'], ['λmax = b/T', fmt(lp * 1e9, 0) + ' nm (' + region + ')', 'hl'], ['power per m² σT⁴', fmt(sig * Math.pow(S.T, 4) / 1e6, 3) + ' MW/m²', 'hl'], ['compared with 5800 K', fmt(Math.pow(S.T / 5800, 4), 3) + ' ×']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  window.PhysiQLessons.register('LESSON-12', { html: () => S });
})();
