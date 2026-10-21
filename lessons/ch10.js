/* Chapter 10 Kinetic Theory of Gases: full notes by Cikgu Suhaili (from STPM_2027_unit_10_kinetic_theory_of_gases_TEACHERS_VERSION.pptx). */
(function () {
  'use strict';
  const { card, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4 } = window.PhysiQLessons.H;
  const cbar = '<span style="text-decoration:overline">c<sup>2</sup></span>';
  const c2 = `⟨<i>c</i><sup>2</sup>⟩`;

  const F = {};
  const mini = (x0, y0, body, xl, yl) => axes(x0, y0, 130, 110, xl, yl, { noO: 1 }) + body;
  F.boyle = () => svg(520, 160,
    mini(30, 135, P('M45,30 C60,95 100,120 155,125', 'v', { w: 2.4 }) + P('M45,10 C70,90 110,112 155,115', 'r', { w: 2.4 }), 'V', 'p') + T(150, 106, 'T₂', { fs: 11, c: C.r }) + T(150, 137, 'T₁', { fs: 11, c: C.v }) +
    mini(200, 135, L(200, 90, 320, 90, 'v', '', { w: 2.4 }) + L(200, 60, 320, 60, 'r', '', { w: 2.4 }), 'p', 'pV') + T(326, 64, 'T₂', { fs: 11, c: C.r, a: 'start' }) + T(326, 94, 'T₁', { fs: 11, c: C.v, a: 'start' }) +
    mini(370, 135, L(370, 135, 470, 60, 'v', '', { w: 2.4 }) + L(370, 135, 440, 30, 'r', '', { w: 2.4 }), '1/V', 'p') + T(444, 28, 'T₂', { fs: 11, c: C.r, a: 'start' }) + T(474, 62, 'T₁', { fs: 11, c: C.v, a: 'start' }) + T(260, 156, 'T₂ > T₁', { fs: 11, c: C.sub }));
  F.charles = (yl) => svg(380, 160, axes(150, 130, 210, 110, 'θ / °C', yl, { noO: 1 }) + L(30, 130, 150, 130, 'k', '', { w: 1.6 }) + L(40, 130, 330, 40, 'v', '', { w: 2.2, d: '0' }) + L(40, 130, 150, 96, 'v', '', { w: 1.4, d: '4 3' }) + T(40, 148, '−273.15', { fs: 11 }) + T(150, 148, '0', { fs: 11 }));
  F.box = () => svg(300, 210, `<path d="M60,60 L180,60 L230,30 L110,30 Z" fill="#EEF3FA" stroke="${C.ink}"/><path d="M180,60 L230,30 L230,150 L180,180 Z" fill="#E3EAF5" stroke="${C.ink}"/><rect x="60" y="60" width="120" height="120" fill="#F6F9FD" stroke="${C.ink}"/>` +
    dot(120, 120, 5, C.r) + L(120, 120, 165, 104, 'r', 'e', { w: 2.2 }) + T(168, 100, 'v', { it: 1, b: 1, c: C.r, a: 'start' }) + L(120, 120, 165, 120, 'v', 'e', { w: 1.6 }) + T(150, 134, 'vₓ', { fs: 12, c: C.v }) +
    T(56, 124, 'A', { b: 1, a: 'end' }) + T(240, 100, 'B', { b: 1, a: 'start' }) + L(60, 196, 180, 196, 'k', 'b', { w: 1.2 }) + T(120, 208, 'd', { it: 1 }));

  const S = `
${sec('10-1', '10.1 Ideal gas equation', `
${def('Boyle’s law', `The pressure of a fixed mass of gas at constant temperature is ${red('inversely proportional to its volume')}: <i>p</i> ∝ ${fr('1', '<i>V</i>')}, so <i>pV</i> = constant and <i>p</i><sub>1</sub><i>V</i><sub>1</sub> = <i>p</i><sub>2</sub><i>V</i><sub>2</sub>.`)}
${fig(F.boyle(), 'Graphs of Boyle’s law at two temperatures (T₂ > T₁).')}
${two(def('Charles’s law', `The volume of a fixed mass of gas at constant pressure is ${red('directly proportional to its absolute temperature')}: <i>V</i> ∝ <i>T</i>, so ${fr('<i>V</i><sub>1</sub>', '<i>T</i><sub>1</sub>')} = ${fr('<i>V</i><sub>2</sub>', '<i>T</i><sub>2</sub>')}.`) + fig(F.charles('V')),
  def('Pressure (Gay-Lussac’s) law', `The pressure of a fixed mass of gas at constant volume is ${red('directly proportional to its absolute temperature')}: <i>p</i> ∝ <i>T</i>, so ${fr('<i>p</i><sub>1</sub>', '<i>T</i><sub>1</sub>')} = ${fr('<i>p</i><sub>2</sub>', '<i>T</i><sub>2</sub>')}.`) + fig(F.charles('p')))}
<p class="ls-small">Plotted against temperature in °C, both lines extrapolate to −273.15 °C (0 K, absolute zero); plotted against kelvin they pass through the origin.</p>
${def('Ideal gas', `is a gas that ${red('obeys the ideal gas equation <i>pV</i> = <i>nRT</i> exactly')} at all pressures and temperatures.`)}
<p>Combining the three gas laws gives the <b>ideal gas equation</b> (no derivation needed):</p>
${key(`<i>pV</i> = <i>nRT</i> = <i>NkT</i>`, '<i>n</i> = number of moles, <i>p</i> in Pa, <i>V</i> in m<sup>3</sup>, <i>T</i> in K, <i>R</i> = 8.31 J mol<sup>−1</sup> K<sup>−1</sup> (molar gas constant), <i>N</i> = number of molecules, <i>k</i> = <i>R</i>/<i>N</i><sub>A</sub> = 1.38 × 10<sup>−23</sup> J K<sup>−1</sup> (Boltzmann constant)')}
${ul([`<i>n</i> = ${fr('<i>N</i>', '<i>N</i><sub>A</sub>')} = ${fr('<i>m</i>', '<i>M</i>')}, where <i>N</i><sub>A</sub> = 6.02 × 10<sup>23</sup> mol<sup>−1</sup> and <i>M</i> is the molar mass.`, `For a fixed mass of gas: ${fr('<i>p</i><sub>1</sub><i>V</i><sub>1</sub>', '<i>T</i><sub>1</sub>')} = ${fr('<i>p</i><sub>2</sub><i>V</i><sub>2</sub>', '<i>T</i><sub>2</sub>')}.`])}
${example('10.1', `Estimate the number of molecules in a 5 × 10<sup>−4</sup> m<sup>3</sup> flask of oxygen at 2 × 10<sup>5</sup> Pa and 300 K. (<i>R</i> = 8.31 J mol<sup>−1</sup> K<sup>−1</sup>, <i>N</i><sub>A</sub> = 6 × 10<sup>23</sup> mol<sup>−1</sup>)`,
  eq(`<i>N</i> = <i>nN</i><sub>A</sub> = ${fr('<i>pV</i>', '<i>RT</i>')}<i>N</i><sub>A</sub> = ${fr('(2 × 10<sup>5</sup>)(5 × 10<sup>−4</sup>)', '(8.31)(300)')}(6 × 10<sup>23</sup>) = <b>2.41 × 10<sup>22</sup> molecules</b>`))}
${example('10.2', `Bulbs X and Y, kept at constant temperature, contain an ideal gas at 100 kPa and 300 kPa. The volume of X is three times that of Y. When tap T is opened the gases mix. Find the final pressure.`,
  steps([`The total number of moles is constant: <i>p</i><sub>X</sub><i>V</i><sub>X</sub> + <i>p</i><sub>Y</sub><i>V</i><sub>Y</sub> = <i>p</i>(<i>V</i><sub>X</sub> + <i>V</i><sub>Y</sub>), with <i>V</i><sub>X</sub> = 3<i>V</i><sub>Y</sub>`, `(100)(3<i>V</i><sub>Y</sub>) + (300)<i>V</i><sub>Y</sub> = <i>p</i>(4<i>V</i><sub>Y</sub>) ⇒ <b><i>p</i> = 150 kPa</b>`]))}
${example('10.3', `At constant pressure an ideal gas has volume 0.00308 m<sup>3</sup> at 273 K. Find its temperature when its volume is 0.00783 m<sup>3</sup>.`,
  eq(`${fr('<i>V</i><sub>1</sub>', '<i>T</i><sub>1</sub>')} = ${fr('<i>V</i><sub>2</sub>', '<i>T</i><sub>2</sub>')} ⇒ <i>T</i> = 273 × ${fr('0.00783', '0.00308')} = <b>694 K</b>`))}
${exercises('Exercises: gas laws', [
  { q: `Vessel X has twice the volume of vessel Y. Both contain an ideal gas at the same pressure; X is at 200 K and Y at 400 K. If the mass of gas in X is <i>m</i>, find the mass of gas in Y.`, a: `<i>m</i> ∝ ${fr('<i>pV</i>', '<i>T</i>')}: ${fr('<i>m</i><sub>Y</sub>', '<i>m</i><sub>X</sub>')} = (½)(${fr('200', '400')}) = ¼, so <b><i>m</i>/4</b>` },
  { q: `A cylinder with a movable piston contains gas at 27 °C, 0.50 × 10<sup>5</sup> Pa and 1.25 m<sup>3</sup>. Find the final temperature if it is compressed to 0.80 m<sup>3</sup> and the pressure rises to 0.82 × 10<sup>5</sup> Pa.`, a: `<i>T</i><sub>2</sub> = 300 × ${fr('(0.82)(0.80)', '(0.50)(1.25)')} = 314.9 K = 41.9 °C` },
  { q: `A 24 L tank contains helium at 27 °C and 22.0 atm. How many moles are in the tank? (<i>R</i> = 0.0821 L atm mol<sup>−1</sup> K<sup>−1</sup>)`, a: `<i>n</i> = ${fr('(22.0)(24)', '(0.0821)(300)')} = 21.5 mol` },
  { q: `Oxygen occupies 0.0200 m<sup>3</sup> at 101 kPa and 5.0 °C. Find its volume at 108 kPa and 30 °C.`, a: `<i>V</i><sub>2</sub> = 0.0200 × ${fr('101', '108')} × ${fr('303', '278')} = 0.0204 m<sup>3</sup>` }])}
`)}

${sec('10-2', '10.2 Pressure of a gas', `
<p>The kinetic theory explains the large-scale (macroscopic) properties of a gas from the behaviour of its molecules.</p>
${h4('Assumptions of the kinetic theory for an ideal gas')}
<ol class="ls-ul">
<li>A gas is made up of a large number of identical atoms or molecules.</li>
<li>The molecules move randomly in all directions.</li>
<li>The volume of the molecules is negligible compared with the volume occupied by the gas.</li>
<li>Intermolecular forces are negligible except during collisions.</li>
<li>Collisions between molecules, and with the walls, are perfectly elastic.</li>
<li>The duration of a collision is negligible compared with the time between collisions.</li>
<li>Between collisions molecules move with constant velocity; gravity has no effect on their motion.</li></ol>
${h4('Ideal gas and real gas')}
${table(['Ideal gas', 'Real gas'], [['no intermolecular forces', 'intermolecular forces exist (attraction at moderate range, repulsion at very short range)'], ['molecules have negligible volume', 'molecules have a finite volume'], ['obeys <i>pV</i> = <i>nRT</i> exactly at all pressures and temperatures', 'obeys <i>pV</i> = <i>nRT</i> only approximately, at <b>low pressure and high temperature</b>'], ['collisions perfectly elastic', 'collisions may lose a little kinetic energy because of intermolecular forces']])}
${h4('Derivation of p = ⅓ρ⟨c²⟩')}
${two(steps([`A cubic box of side <i>d</i> contains <i>N</i> molecules, each of mass <i>m</i>. A molecule has velocity <i>c</i> with components <i>c</i><sub>x</sub>, <i>c</i><sub>y</sub>, <i>c</i><sub>z</sub>.`, `It hits wall A and rebounds elastically with −<i>c</i><sub>x</sub>. Change in momentum: Δ<i>p</i> = −<i>mc</i><sub>x</sub> − <i>mc</i><sub>x</sub> = −2<i>mc</i><sub>x</sub> (the wall receives +2<i>mc</i><sub>x</sub>).`, `Time to travel to wall B and back to A: Δ<i>t</i> = ${fr('2<i>d</i>', '<i>c</i><sub>x</sub>')}`]), fig(F.box()))}
${steps([`Average force of one molecule on wall A (impulse = change of momentum): <i>F</i><sub>x1</sub> = ${fr('2<i>mc</i><sub>x</sub>', '2<i>d</i>/<i>c</i><sub>x</sub>')} = ${fr('<i>mc</i><sub>x</sub><sup>2</sup>', '<i>d</i>')}`, `For <i>N</i> molecules: <i>F</i><sub>x</sub> = ${fr('<i>m</i>', '<i>d</i>')}(<i>c</i><sub>x1</sub><sup>2</sup> + <i>c</i><sub>x2</sub><sup>2</sup> + … + <i>c</i><sub>xN</sub><sup>2</sup>) = ${fr('<i>Nm</i>', '<i>d</i>')}⟨<i>c</i><sub>x</sub><sup>2</sup>⟩, where ⟨<i>c</i><sub>x</sub><sup>2</sup>⟩ is the mean of <i>c</i><sub>x</sub><sup>2</sup>`, `Since <i>c</i><sup>2</sup> = <i>c</i><sub>x</sub><sup>2</sup> + <i>c</i><sub>y</sub><sup>2</sup> + <i>c</i><sub>z</sub><sup>2</sup> and the motion is random, ⟨<i>c</i><sub>x</sub><sup>2</sup>⟩ = ⟨<i>c</i><sub>y</sub><sup>2</sup>⟩ = ⟨<i>c</i><sub>z</sub><sup>2</sup>⟩ = ⅓${c2}`, `<i>F</i> = ${fr('<i>Nm</i>', '3<i>d</i>')}${c2}; pressure <i>p</i> = ${fr('<i>F</i>', '<i>d</i><sup>2</sup>')} = ${fr('<i>Nm</i>', '3<i>d</i><sup>3</sup>')}${c2} = ${fr('<i>Nm</i>', '3<i>V</i>')}${c2}`, `Density ρ = ${fr('<i>Nm</i>', '<i>V</i>')}, so:`])}
${key(`<i>p</i> = ⅓ρ${c2} = ${fr('<i>Nm</i>', '3<i>V</i>')}${c2}`, `${c2} = mean square speed; the root mean square speed is <i>c</i><sub>rms</sub> = ${sq(c2)}`)}
${steps([`Compare <i>pV</i> = ⅓<i>Nm</i>${c2} with <i>pV</i> = <i>nRT</i>, and use <i>Nm</i> = total mass = <i>nM</i>:`])}
${key(`<i>c</i><sub>rms</sub> = ${sq(fr('3<i>p</i>', 'ρ'))} = ${sq(fr('3<i>RT</i>', '<i>M</i>'))} = ${sq(fr('3<i>kT</i>', '<i>m</i>'))}`, '<i>M</i> = molar mass (kg mol<sup>−1</sup>), <i>m</i> = mass of one molecule')}
${sim('gas', 'Gas in a box: molecules, pressure and temperature', 'Each dot is a molecule. Raise the temperature: the molecules move faster, hit the walls harder and more often, so the pressure rises. Halve the volume at constant temperature: the pressure doubles (Boyle’s law).')}
${example('10.4', `Ten gas molecules have speeds of 1, 1, 2, 2, 3, 3, 4, 4, 5 and 5 m s<sup>−1</sup>. Find (a) the mean square speed, (b) the root mean square speed.`,
  steps([`(a) ${c2} = ${fr('2(1<sup>2</sup> + 2<sup>2</sup> + 3<sup>2</sup> + 4<sup>2</sup> + 5<sup>2</sup>)', '10')} = ${fr('110', '10')} = <b>11 m<sup>2</sup> s<sup>−2</sup></b>`, `(b) <i>c</i><sub>rms</sub> = ${sq('11')} = <b>3.32 m s<sup>−1</sup></b> (note the mean speed is 3.0 m s<sup>−1</sup>: the rms speed is larger)`]))}
${example('10.5', `Air at room temperature has density about 1.29 kg m<sup>−3</sup>. Treating it as one gas at 100 kPa, find <i>c</i><sub>rms</sub> for its molecules.`,
  eq(`<i>c</i><sub>rms</sub> = ${sq(fr('3<i>p</i>', 'ρ'))} = ${sq(fr('3(1.00 × 10<sup>5</sup>)', '1.29'))} = <b>482 m s<sup>−1</sup></b>`))}
${example('10.6', `A gas is at 20 °C. To what temperature must it be raised to double the rms speed of its molecules?`,
  steps([`<i>c</i><sub>rms</sub> ∝ ${sq('<i>T</i>')}, so doubling <i>c</i><sub>rms</sub> needs 4<i>T</i>`, `<i>T</i> = 4(293.15) = <b>1172.6 K = 899.5 °C</b>`]))}
${example('10.7', `A 0.08 m<sup>3</sup> cylinder contains oxygen at 280 K and 90 kPa. Find (a) the mass of oxygen, (b) the number of molecules, (c) the rms speed. (<i>R</i> = 8.31 J mol<sup>−1</sup> K<sup>−1</sup>, <i>M</i> = 0.032 kg mol<sup>−1</sup>, <i>N</i><sub>A</sub> = 6.02 × 10<sup>23</sup> mol<sup>−1</sup>)`,
  steps([`<i>n</i> = ${fr('<i>pV</i>', '<i>RT</i>')} = ${fr('(90 × 10<sup>3</sup>)(0.08)', '(8.31)(280)')} = 3.09 mol`, `(a) <i>m</i> = <i>nM</i> = (3.09)(0.032) = <b>0.099 kg</b>`, `(b) <i>N</i> = <i>nN</i><sub>A</sub> = <b>1.86 × 10<sup>24</sup></b>`, `(c) <i>c</i><sub>rms</sub> = ${sq(fr('3<i>RT</i>', '<i>M</i>'))} = ${sq(fr('3(8.31)(280)', '0.032'))} = <b>467 m s<sup>−1</sup></b>`]))}
${exercises('Exercises: pressure and rms speed', [
  { q: `What is the rms speed of nitrogen molecules in an 8.0 m<sup>3</sup> volume at 2.1 atm if there are 1300 mol of nitrogen? (<i>M</i> = 28 g mol<sup>−1</sup>)`, a: `3.7 × 10<sup>2</sup> m s<sup>−1</sup>` },
  { q: `An object needs at least 11.2 km s<sup>−1</sup> to escape from the Earth. At what temperature does <i>c</i><sub>rms</sub> for H<sub>2</sub> molecules equal this speed? Repeat for N<sub>2</sub>. (<i>M</i><sub>H₂</sub> = 2 g mol<sup>−1</sup>, <i>M</i><sub>N₂</sub> = 28 g mol<sup>−1</sup>)`, a: `1.0 × 10<sup>4</sup> K; 1.4 × 10<sup>5</sup> K` },
  { q: `Outer space has about one hydrogen atom per cm<sup>3</sup> at about 3.5 K. Calculate the rms speed of these atoms and the pressure they exert. (<i>M</i> = 1 g mol<sup>−1</sup>)`, a: `295 m s<sup>−1</sup>; <i>p</i> = <i>NkT</i>/<i>V</i> ≈ 5 × 10<sup>−17</sup> Pa` }])}
`)}

${sec('10-3', '10.3 Molecular kinetic energy', `
${steps([`From <i>pV</i> = ⅓<i>Nm</i>${c2} and <i>pV</i> = <i>NkT</i>: ⅓<i>m</i>${c2} = <i>kT</i>`, `Multiply by ${fr('3', '2')}: ½<i>m</i>${c2} = ${fr('3', '2')}<i>kT</i>`])}
${key(`⟨<i>K</i>⟩ = ½<i>m</i>${c2} = ${fr('3', '2')}<i>kT</i>`, 'mean translational kinetic energy of one molecule; it depends only on the absolute temperature')}
${ul([`<i>k</i> = ${fr('<i>R</i>', '<i>N</i><sub>A</sub>')} = ${fr('8.31', '6.02 × 10<sup>23</sup>')} = 1.38 × 10<sup>−23</sup> J K<sup>−1</sup> (Boltzmann constant: the gas constant per molecule).`, `Total translational kinetic energy of <i>N</i> molecules: <i>E</i> = ${fr('3', '2')}<i>NkT</i> = ${fr('3', '2')}<i>nRT</i>.`])}
${example('10.8', `What is the average translational kinetic energy of a molecule of an ideal gas at 27 °C?`,
  eq(`⟨<i>K</i>⟩ = ${fr('3', '2')}<i>kT</i> = ${fr('3', '2')}(1.38 × 10<sup>−23</sup>)(300) = <b>6.21 × 10<sup>−21</sup> J</b>`))}
${example('10.9', `One mole of oxygen (32 g) behaves as an ideal gas at 273 K and 1.01 × 10<sup>5</sup> Pa. Calculate (a) its volume, (b) its density, (c) the rms speed of its molecules, (d) the average translational kinetic energy of a molecule.`,
  steps([`(a) <i>V</i> = ${fr('<i>nRT</i>', '<i>p</i>')} = ${fr('(1)(8.31)(273)', '1.01 × 10<sup>5</sup>')} = <b>2.25 × 10<sup>−2</sup> m<sup>3</sup></b>`, `(b) ρ = ${fr('0.032', '2.25 × 10<sup>−2</sup>')} = <b>1.42 kg m<sup>−3</sup></b>`, `(c) <i>c</i><sub>rms</sub> = ${sq(fr('3<i>p</i>', 'ρ'))} = ${sq(fr('3(1.01 × 10<sup>5</sup>)', '1.42'))} = <b>461 m s<sup>−1</sup></b>`, `(d) ⟨<i>K</i>⟩ = ${fr('3', '2')}(1.38 × 10<sup>−23</sup>)(273) = <b>5.65 × 10<sup>−21</sup> J</b>`]) + note('The slide answer for (c), 5.94 × 10<sup>−10</sup> m s<sup>−1</sup>, is a slip; the rms speed of oxygen at 273 K is about 461 m s<sup>−1</sup>.'))}
`)}

${sec('10-4', '10.4 Degrees of freedom and equipartition of energy', `
${def('Degrees of freedom, <i>f</i>', `of a molecule is the ${red('number of independent ways (modes of motion) in which it can store energy')}: translational, rotational and vibrational.`)}
${def('Law of equipartition of energy', `Each degree of freedom of a molecule has an ${red('average energy of ½<i>kT</i>')}.`)}
${key(`⟨<i>K</i>⟩ = ${fr('<i>f</i>', '2')}<i>kT</i>`, 'average kinetic energy per molecule')}
${table(['Molecule (at about 300 K)', 'Translational', 'Rotational', 'Total <i>f</i>', 'Average energy per molecule'], [['monatomic (He, Ne, Ar)', '3', '0', '3', `${fr('3', '2')}<i>kT</i>`], ['diatomic (H<sub>2</sub>, O<sub>2</sub>, N<sub>2</sub>)', '3', '2', '5', `${fr('5', '2')}<i>kT</i>`], ['polyatomic, non-linear (H<sub>2</sub>O, NH<sub>3</sub>)', '3', '3', '6', '3<i>kT</i>']])}
${ul([`A monatomic molecule moves in three independent directions (<i>x</i>, <i>y</i>, <i>z</i>): 3 translational degrees of freedom.`, `A diatomic molecule also rotates about two axes perpendicular to its bond (rotation about the bond itself has negligible energy): 3 + 2 = 5.`, `A non-linear polyatomic molecule rotates about three axes: 3 + 3 = 6.`])}
${h4('Variation of the degrees of freedom of a diatomic molecule with temperature')}
${table(['Temperature', 'Modes of motion active', '<i>f</i>'], [['very low (about 30 K)', 'translational only', '3'], ['room temperature (about 300 K)', 'translational + rotational', '5'], ['very high (about 3000 K)', 'translational + rotational + vibrational', '7']])}
<p>Rotational and vibrational modes are "frozen out" at low temperature because the energy gaps between their quantum levels are large compared with <i>kT</i>. As the temperature rises, <i>kT</i> becomes large enough to excite them, so the degrees of freedom, and the molar heat capacity, increase. (Vibration adds 2: kinetic and potential energy of the vibration.)</p>
`)}

${sec('10-5', '10.5 Internal energy of an ideal gas', `
${def('Internal energy, <i>U</i>', `of an ideal gas is the ${red('total kinetic energy of all its molecules')}. There are no intermolecular forces, so there is no potential energy between molecules.`)}
${steps([`For <i>N</i> molecules each with <i>f</i> degrees of freedom: <i>U</i> = <i>N</i> × ${fr('<i>f</i>', '2')}<i>kT</i>`, `With <i>Nk</i> = <i>nR</i>:`])}
${key(`<i>U</i> = ${fr('<i>f</i>', '2')}<i>NkT</i> = ${fr('<i>f</i>', '2')}<i>nRT</i>`, `monatomic: <i>U</i> = ${fr('3', '2')}<i>nRT</i>; diatomic at room temperature: <i>U</i> = ${fr('5', '2')}<i>nRT</i>`)}
${note('The internal energy of an ideal gas depends only on its temperature (and the amount of gas), not on its pressure or volume.')}
${example('10.10', `Neon is a monatomic gas. Find the internal energy of 1 kg of neon at 293 K. (Molar mass 20 g mol<sup>−1</sup>)`,
  steps([`<i>n</i> = ${fr('1000', '20')} = 50 mol`, `<i>U</i> = ${fr('3', '2')}<i>nRT</i> = ${fr('3', '2')}(50)(8.31)(293) = <b>1.83 × 10<sup>5</sup> J</b>`]))}
${example('10.11', `A 0.30 m<sup>3</sup> tank contains 1.50 mol of neon at 22 °C. Find (a) the total internal energy, (b) the total translational kinetic energy, (c) the average translational kinetic energy per molecule, (d) the rms speed. (<i>M</i> = 0.020 kg mol<sup>−1</sup>)`,
  steps([`<i>T</i> = 295 K. (a) <i>U</i> = ${fr('3', '2')}<i>nRT</i> = ${fr('3', '2')}(1.50)(8.31)(295) = <b>5.52 kJ</b>`, `(b) Neon is monatomic, so all its kinetic energy is translational: <b>5.52 kJ</b>`, `(c) ${fr('3', '2')}<i>kT</i> = ${fr('3', '2')}(1.38 × 10<sup>−23</sup>)(295) = <b>6.10 × 10<sup>−21</sup> J</b>`, `(d) <i>c</i><sub>rms</sub> = ${sq(fr('3<i>RT</i>', '<i>M</i>'))} = ${sq(fr('3(8.31)(295)', '0.020'))} = <b>606 m s<sup>−1</sup></b>`]))}
`)}`;

  // ---------- simulation: gas in a box ----------
  window.PhysiQSims.add('gas', function (root) {
    const { COL, fmt, el, slider, canvas, text, loop, readouts } = window.PhysiQSims.U;
    const S = { T: 300, V: 1, N: 80, mol: [], imp: 0, tAcc: 0, pHist: [] };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'temperature', 50, 900, 10, S.T, 'K', v => { const f = Math.sqrt(v / S.T); S.mol.forEach(m => { m.vx *= f; m.vy *= f; }); S.T = v; S.pHist = []; });
    slider(ctl, 'volume (box width)', 0.4, 1, 0.05, S.V, '× V₀', v => { S.V = v; S.pHist = []; });
    slider(ctl, 'number of molecules', 20, 200, 10, S.N, '', v => { S.N = v; seed(); });
    const cv = canvas(root); const ro = readouts(root);
    const vScale = () => Math.sqrt(S.T / 300) * 90; // px per second for rms
    function seed() { S.mol = []; for (let i = 0; i < S.N; i++) { const a = Math.random() * 2 * Math.PI, sp = vScale() * Math.sqrt(-2 * Math.log(Math.random() + 1e-9)) / Math.SQRT2; S.mol.push({ x: Math.random(), y: Math.random(), vx: sp * Math.cos(a), vy: sp * Math.sin(a) }); } S.pHist = []; }
    function draw(dt) {
      const ctx = cv.ctx, { w, h } = cv.size(0.5, 240, 360), H = h - 30, W0 = Math.min(w - 40, H * 1.8), Wb = W0 * S.V, x0 = 20, y0 = 10;
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      let imp = 0;
      S.mol.forEach(m => {
        let px = x0 + m.x * Wb, py = y0 + m.y * H;
        px += m.vx * dt; py += m.vy * dt;
        if (px < x0) { px = 2 * x0 - px; m.vx = -m.vx; imp += 2 * Math.abs(m.vx); }
        if (px > x0 + Wb) { px = 2 * (x0 + Wb) - px; m.vx = -m.vx; imp += 2 * Math.abs(m.vx); }
        if (py < y0) { py = 2 * y0 - py; m.vy = -m.vy; imp += 2 * Math.abs(m.vy); }
        if (py > y0 + H) { py = 2 * (y0 + H) - py; m.vy = -m.vy; imp += 2 * Math.abs(m.vy); }
        m.x = Math.min(1, Math.max(0, (px - x0) / Wb)); m.y = Math.min(1, Math.max(0, (py - y0) / H));
      });
      S.imp += imp; S.tAcc += dt;
      if (S.tAcc > 0.5) { const per = 2 * (Wb + H); S.pHist.push(S.imp / S.tAcc / per); if (S.pHist.length > 8) S.pHist.shift(); S.imp = 0; S.tAcc = 0; }
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 3; ctx.strokeRect(x0, y0, Wb, H);
      ctx.fillStyle = '#6A63EC'; ctx.fillRect(x0 + Wb, y0 - 4, 10, H + 8);
      S.mol.forEach(m => { const sp = Math.hypot(m.vx, m.vy) / vScale(); ctx.beginPath(); ctx.arc(x0 + m.x * Wb, y0 + m.y * H, 4, 0, 7); ctx.fillStyle = `hsl(${Math.max(0, 220 - sp * 110)},80%,50%)`; ctx.fill(); });
      text(ctx, 'colour: blue = slow, red = fast', x0, h - 8, { fs: 11, c: COL.sub });
      const pAvg = S.pHist.length ? S.pHist.reduce((a, b) => a + b, 0) / S.pHist.length : 0, ref = 80 * 90 * 90 / (2 * W0 * H), pTheory = (S.N / 80) * (S.T / 300) / S.V;
      ro([['temperature T', fmt(S.T, 0) + ' K'], ['c_rms compared with 300 K', fmt(Math.sqrt(S.T / 300), 2) + ' ×', 'hl'], ['pressure measured from wall hits', S.pHist.length > 2 ? fmt(pAvg / ref, 2) + ' p₀' : 'measuring…', 'hl'], ['ideal gas law: p = (N/80)(T/300)(V₀/V) p₀', fmt(pTheory, 2) + ' p₀']]);
    }
    let last = 0;
    loop(cv, dt => draw(dt));
    new ResizeObserver(() => draw(0)).observe(root);
    seed(); draw(0); void last;
  });

  window.PhysiQLessons.register('LESSON-10', { html: () => S });
})();
