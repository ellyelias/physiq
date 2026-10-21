/* Chapter 11 Thermodynamics of Gases: full notes by Cikgu Suhaili (from STPM_2027_unit_11_thermodynamics_TEACHERS_VERSION.pptx).
   Process names follow the teacher's wording: "constant pressure (isobaric)", "constant volume (isochoric)". */
(function () {
  'use strict';
  const { card, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4 } = window.PhysiQLessons.H;
  const Cv = '<i>C</i><sub>V,m</sub>', Cp = '<i>C</i><sub>p,m</sub>', g = 'γ';
  const stpm = (t, q, s, f) => card(t, q, s, f).replace('class="ls-ex"', 'class="ls-ex ls-stpm"');

  const F = {};
  // p-V diagram with isotherms and the four processes from A
  F.pv4 = () => {
    const X = v => 50 + v * 70, Y = p => 210 - p * 45, iso = (k, c) => { let d = ''; for (let i = 0; i <= 40; i++) { const v = 0.55 + i * 0.09, p = k / v; if (p > 4.3) continue; d += (d ? ' L' : 'M') + X(v).toFixed(1) + ',' + Y(p).toFixed(1); } return P(d, c, { w: 1.2 }); };
    const A = [1.4, 3.0], ad = []; for (let i = 0; i <= 30; i++) { const v = 1.4 + i * 0.05; ad.push([v, 3.0 * Math.pow(1.4 / v, 1.67)]); }
    return svg(380, 240, axes(50, 210, 310, 195, 'V', 'p') + iso(2.6, '#8CCFE0') + iso(4.2, '#8CCFE0') + iso(6.2, '#8CCFE0') + iso(8.2, '#8CCFE0') +
      L(X(1.4), Y(3.0), X(2.9), Y(3.0), 'o', 'e', { w: 2.4 }) + L(X(1.4), Y(3.0), X(1.4), Y(1.6), 'o', 'e', { w: 2.4 }) +
      P('M' + ad.map(p => X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1)).join(' L'), 'o', { w: 2.4, a: 'o' }) + P('M' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(i => { const v = 1.4 + i * 0.075; return X(v).toFixed(1) + ',' + Y(4.2 / v).toFixed(1); }).join(' L'), 'o', { w: 2.4, a: 'o' }) +
      dot(X(1.4), Y(3.0), 4, C.ink) + T(X(1.4) - 6, Y(3.0) - 8, 'A', { b: 1, a: 'end' }) + T(X(2.9) + 4, Y(3.0) - 6, 'E', { b: 1, a: 'start' }) + T(X(1.4) - 6, Y(1.6) + 4, 'D', { b: 1, a: 'end' }) + T(X(2.9) + 4, Y(4.2 / 2.9) + 4, 'B', { b: 1, a: 'start' }) + T(X(2.9) + 4, Y(3.0 * Math.pow(1.4 / 2.9, 1.67)) + 12, 'C', { b: 1, a: 'start' }) +
      L(50, Y(3.0), X(1.4), Y(3.0), 's', '', { d: '3 3', w: 1 }) + T(44, Y(3.0) + 4, 'pₐ', { fs: 11, a: 'end' }) + T(350, 40, 'T₄ > T₃ > T₂ > T₁', { fs: 11, a: 'end', c: C.sub }), 380);
  };
  F.cyl = (out) => svg(300, 130, `<rect x="30" y="30" width="200" height="70" fill="#F2F6FB" stroke="${C.ink}" stroke-width="2"/>` + `<rect x="${out ? 160 : 120}" y="32" width="14" height="66" fill="#9AA6B8"/>` + L(out ? 174 : 134, 65, out ? 250 : 210, 65, 'k', '', { w: 3 }) +
    T(80, 70, 'gas', { fs: 13 }) + (out ? L(176, 112, 226, 112, 'r', 'e', { w: 2.4 }) + T(200, 126, 'gas expands: +W', { fs: 11, c: C.r }) : L(220, 112, 170, 112, 'v', 'e', { w: 2.4 }) + T(196, 126, 'gas compressed: −W', { fs: 11, c: C.v })) + L(120, 18, 174, 18, 'k', 'b', { w: 1 }) + T(147, 14, 'dx', { fs: 11, it: 1 }) + T(40, 24, 'A', { it: 1, fs: 12 }));
  F.box = () => svg(380, 220, axes(50, 190, 310, 170, 'V × 10⁻³ / m³', 'p × 10⁴ / Pa') + `<rect x="110" y="50" width="150" height="100" fill="none" stroke="${C.r}" stroke-width="2.4"/>` +
    L(110, 150, 190, 150, 'r', 'e', { w: 2.4 }) + L(110, 150, 110, 95, 'r', 'e', { w: 2.4 }) + L(110, 50, 190, 50, 'r', 'e', { w: 2.4 }) + L(260, 150, 260, 95, 'r', 'e', { w: 2.4 }) +
    T(104, 160, 'A', { b: 1, a: 'end' }) + T(104, 46, 'B', { b: 1, a: 'end' }) + T(266, 160, 'C', { b: 1, a: 'start' }) + T(266, 46, 'D', { b: 1, a: 'start' }) + T(42, 154, '3.0', { fs: 11, a: 'end' }) + T(42, 54, '8.0', { fs: 11, a: 'end' }) + T(110, 206, '2.0', { fs: 11 }) + T(260, 206, '5.0', { fs: 11 }));
  F.diesel = () => {
    const X = v => 50 + v * 25, Y = p => 200 - p * 10.5;
    let ad1 = '', ad2 = ''; for (let i = 0; i <= 30; i++) { const v = 1.4 + (10 - 1.4) * i / 30; ad1 += (i ? ' L' : 'M') + X(v).toFixed(1) + ',' + Y(1.0 * Math.pow(10 / v, 1.4)).toFixed(1); }
    for (let i = 0; i <= 30; i++) { const v = 6 + 4 * i / 30; ad2 += (i ? ' L' : 'M') + X(v).toFixed(1) + ',' + Y(16 * Math.pow(6 / v, 1.4)).toFixed(1); }
    return svg(360, 230, axes(50, 200, 290, 190, 'V × 10⁻⁴ / m³', 'p × 10⁵ / Pa') + P(ad1, 'r', { w: 2.2 }) + P(ad2, 'r', { w: 2.2 }) + L(X(1.4), Y(16), X(6), Y(16), 'r', 'e', { w: 2.2 }) + L(X(10), Y(16 * Math.pow(0.6, 1.4)), X(10), Y(1), 'r', 'e', { w: 2.2 }) +
      [['B', 1.4, 16], ['C', 6, 16], ['D', 10, 7.8], ['A', 10, 1]].map(([n, v, p]) => dot(X(v), Y(p), 3.5, C.ink) + T(X(v) + 6, Y(p) - 6, n, { b: 1, a: 'start' })).join('') +
      [['16.0', 16], ['7.8', 7.8], ['1.0', 1]].map(([t, p]) => T(44, Y(p) + 4, t, { fs: 10, a: 'end' })).join('') + [['1.40', 1.4], ['6.00', 6], ['10.0', 10]].map(([t, v]) => T(X(v), 214, t, { fs: 10 })).join(''));
  };

  const S = `
${sec('11-1', '11.1 Molar heat capacity', `
${two(`${def('Molar heat capacity at constant pressure, ' + Cp, `is the ${red('heat required to raise the temperature of 1 mole of gas by 1 K')} (or 1 °C) at ${red('constant pressure')}.`)}${key(`${Cp} = ${fr('<i>Q</i>', '<i>n</i>Δ<i>T</i>')} &nbsp; ⇒ &nbsp; <i>Q</i> = <i>n</i>${Cp}Δ<i>T</i>`)}`,
  `${def('Molar heat capacity at constant volume, ' + Cv, `is the ${red('heat required to raise the temperature of 1 mole of gas by 1 K')} (or 1 °C) at ${red('constant volume')}.`)}${key(`${Cv} = ${fr('<i>Q</i>', '<i>n</i>Δ<i>T</i>')} &nbsp; ⇒ &nbsp; <i>Q</i> = <i>n</i>${Cv}Δ<i>T</i>`)}`)}
${key(`${Cp} − ${Cv} = <i>R</i> &nbsp;&nbsp; ${g} = ${fr(Cp, Cv)}`, 'γ is dimensionless and always greater than 1: monatomic 1.67, diatomic 1.40, polyatomic 1.33')}
${example('11.1', `440.0 J of heat raises the temperature of 2.0 mol of hydrogen by 10 K at constant volume. Treating hydrogen as an ideal gas, find its molar heat capacity at constant pressure.`,
  steps([`${Cv} = ${fr('<i>Q</i>', '<i>n</i>Δ<i>T</i>')} = ${fr('440.0', '2.0(10)')} = 22.0 J mol<sup>−1</sup> K<sup>−1</sup>`, `Hydrogen is diatomic, γ = 1.40: ${Cp} = γ${Cv} = (1.40)(22.0) = <b>30.8 J mol<sup>−1</sup> K<sup>−1</sup></b>`]))}
${example('11.2', `One mole of an ideal gas in a closed container at constant volume is heated until its pressure doubles. The heat supplied is 3735 J and the final temperature is 600 K. Find the molar heat capacity at constant pressure. (<i>R</i> = 8.31 J K<sup>−1</sup> mol<sup>−1</sup>)`,
  steps([`Constant volume: ${fr('<i>p</i><sub>1</sub>', '<i>T</i><sub>1</sub>')} = ${fr('<i>p</i><sub>2</sub>', '<i>T</i><sub>2</sub>')} with <i>p</i><sub>2</sub> = 2<i>p</i><sub>1</sub> ⇒ <i>T</i><sub>1</sub> = 300 K`, `<i>Q</i> = <i>n</i>${Cv}(<i>T</i><sub>2</sub> − <i>T</i><sub>1</sub>) ⇒ ${Cv} = ${fr('3735', '(1)(300)')} = 12.45 J K<sup>−1</sup> mol<sup>−1</sup>`, `${Cp} = ${Cv} + <i>R</i> = 12.45 + 8.31 = <b>20.76 J K<sup>−1</sup> mol<sup>−1</sup></b>`]))}
`)}

${sec('11-2', '11.2 Work done by a gas', `
${two(steps([`A gas at pressure <i>p</i> in a cylinder of cross-sectional area <i>A</i> pushes the piston with force <i>F</i> = <i>pA</i>.`, `When the piston moves out a small distance d<i>x</i>, the work done by the gas is d<i>W</i> = <i>F</i> d<i>x</i> = <i>pA</i> d<i>x</i> = <i>p</i> d<i>V</i>`, `When the volume changes from <i>V</i><sub>1</sub> to <i>V</i><sub>2</sub>:`]) + key(`<i>W</i> = ∫<sub><i>V</i>₁</sub><sup><i>V</i>₂</sup> <i>p</i> d<i>V</i>`, 'Work done by the gas = area under the <i>p</i>–<i>V</i> graph'), fig(F.cyl(true)) + fig(F.cyl(false)))}
${ul([`Gas <b>expands</b> (volume increases): work is done <b>by</b> the gas, <i>W</i> positive.`, `Gas is <b>compressed</b> (volume decreases): work is done <b>on</b> the gas, <i>W</i> negative.`])}
${h4('Work done in each process')}
${table(['Process', 'Work done by the gas'], [
  ['constant temperature (isothermal): <i>pV</i> = <i>nRT</i> = constant', `<i>W</i> = ∫ ${fr('<i>nRT</i>', '<i>V</i>')} d<i>V</i> = <i>nRT</i> ln ${fr('<i>V</i><sub>2</sub>', '<i>V</i><sub>1</sub>')} = <i>nRT</i> ln ${fr('<i>p</i><sub>1</sub>', '<i>p</i><sub>2</sub>')}`],
  ['constant volume (isochoric)', '<i>W</i> = 0 (d<i>V</i> = 0)'],
  ['constant pressure (isobaric)', '<i>W</i> = <i>p</i>(<i>V</i><sub>2</sub> − <i>V</i><sub>1</sub>) = <i>p</i>Δ<i>V</i> = <i>nR</i>Δ<i>T</i>'],
  ['adiabatic: <i>pV</i><sup>γ</sup> = constant', `<i>W</i> = ${fr('<i>p</i><sub>1</sub><i>V</i><sub>1</sub> − <i>p</i><sub>2</sub><i>V</i><sub>2</sub>', 'γ − 1')}`]])}
${steps([`<b>Adiabatic work.</b> <i>pV</i><sup>γ</sup> = <i>p</i><sub>1</sub><i>V</i><sub>1</sub><sup>γ</sup>, so <i>p</i> = ${fr('<i>p</i><sub>1</sub><i>V</i><sub>1</sub><sup>γ</sup>', '<i>V</i><sup>γ</sup>')}`, `<i>W</i> = <i>p</i><sub>1</sub><i>V</i><sub>1</sub><sup>γ</sup> ∫<sub><i>V</i>₁</sub><sup><i>V</i>₂</sup> <i>V</i><sup>−γ</sup> d<i>V</i> = <i>p</i><sub>1</sub><i>V</i><sub>1</sub><sup>γ</sup> ${fr('<i>V</i><sub>2</sub><sup>1−γ</sup> − <i>V</i><sub>1</sub><sup>1−γ</sup>', '1 − γ')}`, `Using <i>p</i><sub>1</sub><i>V</i><sub>1</sub><sup>γ</sup> = <i>p</i><sub>2</sub><i>V</i><sub>2</sub><sup>γ</sup>: <i>W</i> = ${fr('<i>p</i><sub>2</sub><i>V</i><sub>2</sub> − <i>p</i><sub>1</sub><i>V</i><sub>1</sub>', '1 − γ')} = ${fr('<i>p</i><sub>1</sub><i>V</i><sub>1</sub> − <i>p</i><sub>2</sub><i>V</i><sub>2</sub>', 'γ − 1')}`])}
${example('11.3', `How much work is done by an ideal gas expanding at constant temperature (isothermally) from 3.00 L at 20.0 atm to 24.0 L? (1 L = 1 × 10<sup>−3</sup> m<sup>3</sup>, 1 atm = 1.013 × 10<sup>5</sup> Pa)`,
  eq(`<i>W</i> = <i>p</i><sub>1</sub><i>V</i><sub>1</sub> ln ${fr('<i>V</i><sub>2</sub>', '<i>V</i><sub>1</sub>')} = (20.0 × 1.013 × 10<sup>5</sup>)(3.00 × 10<sup>−3</sup>) ln ${fr('24.0', '3.00')} = <b>1.26 × 10<sup>4</sup> J</b>`))}
${example('11.4', `2.00 L of an ideal gas at 300 K and 20.0 atm expands at constant pressure (isobaric) while its temperature rises to 500 K. What work is done by the gas?`,
  steps([`<i>V</i><sub>2</sub> = <i>V</i><sub>1</sub>${fr('<i>T</i><sub>2</sub>', '<i>T</i><sub>1</sub>')} = 2.00 × ${fr('500', '300')} = 3.33 L`, `<i>W</i> = <i>p</i>(<i>V</i><sub>2</sub> − <i>V</i><sub>1</sub>) = (20.0 × 1.013 × 10<sup>5</sup>)(1.33 × 10<sup>−3</sup>) = <b>2.70 × 10<sup>3</sup> J</b>`]))}
`)}

${sec('11-3', '11.3 First law of thermodynamics', `
${ul([`Thermodynamics is the study of energy relationships involving heat, mechanical work and other forms of energy transfer.`, `The first law extends the principle of conservation of energy to include heat as well as mechanical energy.`, `Three quantities: heat <i>Q</i>, change in internal energy Δ<i>U</i>, and work <i>W</i>.`])}
${def('First law of thermodynamics', `The ${red('heat supplied to a system')} is equal to the ${red('increase in its internal energy plus the work done by the system')}.`)}
${key(`<i>Q</i> = Δ<i>U</i> + <i>W</i> &nbsp; or &nbsp; Δ<i>U</i> = <i>Q</i> − <i>W</i>`)}
${table(['Quantity', 'Positive (+)', 'Negative (−)'], [['<i>Q</i>', 'heat supplied to the gas', 'heat released by the gas'], ['<i>W</i>', 'work done <b>by</b> the gas (expansion)', 'work done <b>on</b> the gas (compression)'], ['Δ<i>U</i>', 'internal energy increases (temperature rises)', 'internal energy decreases (temperature falls)']])}
<p>When heat is supplied to a gas its temperature rises, so its internal energy increases; at the same time it may expand and do work on its surroundings.</p>
${h4('Δ<i>U</i> = <i>n</i>C<sub>V,m</sub>Δ<i>T</i> for any process')}
${steps([`At constant volume (isochoric), <i>W</i> = 0, so Δ<i>U</i> = <i>Q</i> = <i>n</i>${Cv}Δ<i>T</i>`, `The internal energy of an ideal gas depends only on its temperature, not on its pressure or volume. So the same Δ<i>T</i> always gives the same Δ<i>U</i>:`])}
${key(`Δ<i>U</i> = <i>n</i>${Cv}Δ<i>T</i>`, 'valid for any process of an ideal gas')}
${card('Additional derivation (syllabus 11.3(e)) · C<sub>p,m</sub> − C<sub>V,m</sub> = R', `Derive the relationship between the two molar heat capacities.`,
  steps([`Heat the gas at constant pressure (isobaric) through Δ<i>T</i>: <i>Q</i> = <i>n</i>${Cp}Δ<i>T</i>, <i>W</i> = <i>p</i>Δ<i>V</i> = <i>nR</i>Δ<i>T</i>, Δ<i>U</i> = <i>n</i>${Cv}Δ<i>T</i>`, `First law: <i>n</i>${Cp}Δ<i>T</i> = <i>n</i>${Cv}Δ<i>T</i> + <i>nR</i>Δ<i>T</i>`, `<b>${Cp} − ${Cv} = <i>R</i></b>. More heat is needed at constant pressure because part of it is used to do work as the gas expands.`]))}
${card('Additional derivation (syllabus 11.3(f)) · C<sub>V,m</sub> = (f/2)R', `Use the law of equipartition of energy.`,
  steps([`<i>U</i> = ${fr('<i>f</i>', '2')}<i>nRT</i> (Chapter 10), so Δ<i>U</i> = ${fr('<i>f</i>', '2')}<i>nR</i>Δ<i>T</i>`, `Δ<i>U</i> = <i>n</i>${Cv}Δ<i>T</i> ⇒ <b>${Cv} = ${fr('<i>f</i>', '2')}<i>R</i></b>, and ${Cp} = ${Cv} + <i>R</i> = <b>${fr('<i>f</i> + 2', '2')}<i>R</i></b>`, `γ = ${fr(Cp, Cv)} = ${fr('<i>f</i> + 2', '<i>f</i>')}: monatomic (<i>f</i> = 3) 5/3 = 1.67; diatomic (<i>f</i> = 5) 7/5 = 1.40; polyatomic (<i>f</i> = 6) 8/6 = 1.33. So γ identifies the type of molecule.`]))}
${example('11.5', `2500 J of heat is added to a system and 1800 J of work is done on the system. Calculate the change in internal energy.`,
  eq(`<i>Q</i> = +2500 J, <i>W</i> = −1800 J: Δ<i>U</i> = <i>Q</i> − <i>W</i> = 2500 − (−1800) = <b>4300 J</b>`))}
${example('11.6', `1 mol of a monatomic ideal gas is compressed with 6200 J of work done on it; its temperature changes from 350 K to 550 K. (a) How much heat flows between the gas and its surroundings? (b) Does the heat flow into or out of the gas?`,
  steps([`Δ<i>U</i> = <i>n</i>${Cv}Δ<i>T</i> = (1)(${fr('3', '2')})(8.31)(200) = 2493 J; <i>W</i> = −6200 J`, `(a) <i>Q</i> = Δ<i>U</i> + <i>W</i> = 2493 − 6200 = <b>−3.71 × 10<sup>3</sup> J</b>`, `(b) <i>Q</i> is negative: <b>heat flows out of the gas</b>`]))}
${example('11.7', `A gas in a cylinder expands from 0.400 m<sup>3</sup> to 0.700 m<sup>3</sup> at a constant pressure of 2.00 × 10<sup>5</sup> Pa. The heat added is 1.40 × 10<sup>5</sup> J. Calculate the work done by the gas and the change in its internal energy.`,
  steps([`<i>W</i> = <i>p</i>Δ<i>V</i> = (2.00 × 10<sup>5</sup>)(0.300) = <b>6.00 × 10<sup>4</sup> J</b>`, `Δ<i>U</i> = <i>Q</i> − <i>W</i> = 1.40 × 10<sup>5</sup> − 6.00 × 10<sup>4</sup> = <b>8.00 × 10<sup>4</sup> J</b>`]))}
${exercises('Exercises: first law', [
  { q: `A system absorbs 200 J of heat while its internal energy increases by 150 J. What work is done by the gas?`, a: `<i>W</i> = <i>Q</i> − Δ<i>U</i> = 50 J` },
  { q: `A technician supplies 340 J of heat to a gas while the surroundings do 140 J of work on the gas. What is the change in internal energy?`, a: `Δ<i>U</i> = 340 − (−140) = 480 J` }])}
`)}

${sec('11-4', '11.4 Constant-temperature (isothermal) and adiabatic changes', `
${table(['Process', 'Condition', 'First law, Δ<i>U</i> = <i>Q</i> − <i>W</i>'], [
  ['<b>constant temperature (isothermal)</b>', '<i>T</i><sub>1</sub> = <i>T</i><sub>2</sub>; <i>pV</i> = constant (Boyle’s law)', 'Δ<i>U</i> = 0 ⇒ <i>Q</i> = <i>W</i>'],
  ['<b>constant volume (isochoric)</b>', '<i>V</i><sub>1</sub> = <i>V</i><sub>2</sub>', '<i>W</i> = 0 ⇒ Δ<i>U</i> = <i>Q</i>'],
  ['<b>constant pressure (isobaric)</b>', '<i>p</i><sub>1</sub> = <i>p</i><sub>2</sub>', 'Δ<i>U</i> = <i>Q</i> − <i>p</i>(<i>V</i><sub>2</sub> − <i>V</i><sub>1</sub>)'],
  ['<b>adiabatic</b>', 'no heat transfer into or out of the system, <i>Q</i> = 0', 'Δ<i>U</i> = −<i>W</i>']])}
${ul([`A <b>constant-temperature (isothermal)</b> process occurs at constant temperature: slowly, in a container with good thermal contact with its surroundings.`, `An <b>adiabatic</b> process occurs without heat transfer: quickly, or in a well-insulated container. Adiabatic expansion cools the gas; adiabatic compression heats it.`])}
${two(fig(F.pv4()), table(['Path from A', 'Process', 'Temperature'], [['A → B', 'constant temperature (isothermal)', '<i>T</i><sub>B</sub> = <i>T</i><sub>A</sub>'], ['A → C', 'adiabatic', '<i>T</i><sub>C</sub> &lt; <i>T</i><sub>A</sub>'], ['A → D', 'constant volume (isochoric)', '<i>T</i><sub>D</sub> &lt; <i>T</i><sub>A</sub>'], ['A → E', 'constant pressure (isobaric)', '<i>T</i><sub>E</sub> &gt; <i>T</i><sub>A</sub>']]) + `<p class="ls-small">The adiabatic curve is steeper than the isotherm through the same point.</p>`)}
${h4('Equations for an adiabatic process')}
${steps([`Δ<i>U</i> = <i>n</i>${Cv}d<i>T</i> for any process <span class="ls-tag">(1)</span>. Adiabatic, <i>Q</i> = 0: Δ<i>U</i> = −<i>W</i> = −<i>p</i> d<i>V</i> <span class="ls-tag">(2)</span>`, `(1) = (2): <i>n</i>${Cv}d<i>T</i> = −<i>p</i> d<i>V</i> = −${fr('<i>nRT</i>', '<i>V</i>')}d<i>V</i> ⇒ ${fr('d<i>T</i>', '<i>T</i>')} + ${fr('<i>R</i>', Cv)}${fr('d<i>V</i>', '<i>V</i>')} = 0`, `With <i>R</i> = ${Cp} − ${Cv}: ${fr('<i>R</i>', Cv)} = γ − 1, so ${fr('d<i>T</i>', '<i>T</i>')} + (γ − 1)${fr('d<i>V</i>', '<i>V</i>')} = 0`, `Integrating: ln <i>T</i> + (γ − 1) ln <i>V</i> = constant ⇒ ln(<i>TV</i><sup>γ−1</sup>) = constant ⇒ <b><i>TV</i><sup>γ−1</sup> = constant</b>`, `Substitute <i>T</i> = ${fr('<i>pV</i>', '<i>nR</i>')} (<i>n</i>, <i>R</i> constant): ${fr('<i>pV</i>', '<i>nR</i>')}<i>V</i><sup>γ−1</sup> = constant ⇒ <b><i>pV</i><sup>γ</sup> = constant</b>`])}
${key(`<i>pV</i><sup>γ</sup> = constant: <i>p</i><sub>1</sub><i>V</i><sub>1</sub><sup>γ</sup> = <i>p</i><sub>2</sub><i>V</i><sub>2</sub><sup>γ</sup><br><i>TV</i><sup>γ−1</sup> = constant: <i>T</i><sub>1</sub><i>V</i><sub>1</sub><sup>γ−1</sup> = <i>T</i><sub>2</sub><i>V</i><sub>2</sub><sup>γ−1</sup>`, 'adiabatic change; compare <i>p</i><sub>1</sub><i>V</i><sub>1</sub> = <i>p</i><sub>2</sub><i>V</i><sub>2</sub> for a constant-temperature change')}
${sim('pv', 'p–V explorer: four thermodynamic processes', 'Start from the same state and choose a process. Drag the final volume (or, for constant volume, the final pressure). The shaded area is the work done by the gas; the bars show Q, W and ΔU, which always satisfy Q = ΔU + W.')}
${example('11.8', `1 mol of an ideal gas at 400 K and 8 atm occupies 4 m<sup>3</sup>. It expands adiabatically until its pressure is 1 atm. Calculate (a) the final volume, (b) the final temperature. (${Cv} = 12.5 J mol<sup>−1</sup> K<sup>−1</sup>)`,
  steps([`γ = 1 + ${fr('<i>R</i>', Cv)} = 1 + ${fr('8.31', '12.5')} = 1.67`, `(a) <i>p</i><sub>1</sub><i>V</i><sub>1</sub><sup>γ</sup> = <i>p</i><sub>2</sub><i>V</i><sub>2</sub><sup>γ</sup> ⇒ <i>V</i><sub>2</sub> = 4(8)<sup>1/1.67</sup> = <b>13.9 m<sup>3</sup></b>`, `(b) <i>T</i><sub>1</sub><i>V</i><sub>1</sub><sup>γ−1</sup> = <i>T</i><sub>2</sub><i>V</i><sub>2</sub><sup>γ−1</sup> ⇒ <i>T</i><sub>2</sub> = 400(${fr('4', '13.9')})<sup>0.67</sup> = <b>174 K</b>`]))}
${example('11.9', `A fixed mass of gas at 7 °C and 1.00 × 10<sup>5</sup> Pa is compressed at constant temperature (isothermally) to one third of its volume, then expanded adiabatically back to its original volume. Find the final temperature and pressure (γ = 1.40).`,
  steps([`Constant temperature: <i>p</i><sub>1</sub><i>V</i> = <i>p</i>(<i>V</i>/3) ⇒ <i>p</i> = 3.00 × 10<sup>5</sup> Pa, <i>T</i> = 280.15 K`, `Adiabatic: <i>p</i><sub>2</sub> = (3.00 × 10<sup>5</sup>)(${fr('1', '3')})<sup>1.40</sup> = <b>6.44 × 10<sup>4</sup> Pa</b>`, `<i>T</i><sub>2</sub> = 280.15(${fr('1', '3')})<sup>0.40</sup> = <b>181 K</b> (the slide gives 180.1 K)`]))}
${exercises('Exercises: adiabatic changes', [
  { q: `20 cm<sup>3</sup> of a monatomic gas at 12 °C and 100 kPa is suddenly (adiabatically) compressed to 0.50 cm<sup>3</sup>. Find its new pressure and temperature. (γ = 1.67)`, a: `4.74 × 10<sup>7</sup> Pa; 3.38 × 10<sup>3</sup> K` },
  { q: `A monatomic ideal gas at 1.50 × 10<sup>5</sup> Pa and 0.0800 m<sup>3</sup> is compressed adiabatically to 0.0400 m<sup>3</sup>. Find (a) the final pressure, (b) the ratio of the final temperature to the initial temperature.`, a: `(a) 1.50 × 10<sup>5</sup> × 2<sup>5/3</sup> = 4.76 × 10<sup>5</sup> Pa &nbsp; (b) 2<sup>2/3</sup> = 1.59` }])}
${h4('Examination-style questions')}
${stpm('Example 11.10', `(a) Write (i) the first law of thermodynamics, stating the meaning of each symbol, (ii) the work done by an ideal gas at variable pressure. [3] (b) Sketch a <i>p</i>–<i>V</i> graph for 1 mol of an ideal gas showing the four thermodynamic processes. [5] (c) A monatomic ideal gas at pressure <i>P</i> and volume <i>V</i> is compressed at constant temperature until its pressure is 3<i>P</i>. It then expands adiabatically until its volume is 9<i>V</i>. With <i>P</i> = 1.2 × 10<sup>5</sup> Pa, <i>V</i> = 1 × 10<sup>−2</sup> m<sup>3</sup> and γ = 1.67, find (i) the final pressure, (ii) the work done on the gas during the compression. [7]`,
  steps([`(a)(i) <i>Q</i> = Δ<i>U</i> + <i>W</i>: <i>Q</i> = heat supplied to the gas, Δ<i>U</i> = increase in internal energy, <i>W</i> = work done by the gas. (ii) <i>W</i> = ∫<sub><i>V</i>₁</sub><sup><i>V</i>₂</sup> <i>p</i> d<i>V</i>`, `(b) See the <i>p</i>–<i>V</i> diagram above with the four labelled paths from A.`, `(c)(i) Constant temperature: <i>P</i><i>V</i> = 3<i>P</i><i>V</i>′ ⇒ <i>V</i>′ = <i>V</i>/3. Adiabatic: <i>p</i><sub>f</sub> = 3<i>P</i>(${fr('<i>V</i>/3', '9<i>V</i>')})<sup>1.67</sup> = (3.6 × 10<sup>5</sup>)(${fr('1', '27')})<sup>1.67</sup> = <b>1.47 × 10<sup>3</sup> Pa</b>`, `(ii) Work done on the gas = <i>nRT</i> ln ${fr('<i>V</i>', '<i>V</i>/3')} = <i>PV</i> ln 3 = (1.2 × 10<sup>5</sup>)(1 × 10<sup>−2</sup>)(1.099) = <b>1.32 × 10<sup>3</sup> J</b>`]))}
${example('11.11', `A system changes state as shown. In process AB, 150 J of heat is added; in process BD, 600 J is added. Find (a) Δ<i>U</i> in AB, (b) Δ<i>U</i> in ABD, (c) the total heat added in ACD.`,
  steps([`(a) AB is at constant volume: <i>W</i><sub>AB</sub> = 0, Δ<i>U</i><sub>AB</sub> = <i>Q</i><sub>AB</sub> = <b>150 J</b>`, `(b) <i>W</i><sub>ABD</sub> = <i>p</i><sub>B</sub>(<i>V</i><sub>D</sub> − <i>V</i><sub>B</sub>) = (8 × 10<sup>4</sup>)(3.0 × 10<sup>−3</sup>) = 240 J; <i>Q</i><sub>ABD</sub> = 750 J ⇒ Δ<i>U</i><sub>ABD</sub> = 750 − 240 = <b>510 J</b>`, `(c) Same end points, so Δ<i>U</i><sub>ACD</sub> = 510 J; <i>W</i><sub>ACD</sub> = <i>p</i><sub>A</sub>(<i>V</i><sub>C</sub> − <i>V</i><sub>A</sub>) = (3 × 10<sup>4</sup>)(3.0 × 10<sup>−3</sup>) = 90 J ⇒ <i>Q</i><sub>ACD</sub> = 510 + 90 = <b>600 J</b>`]), fig(F.box()))}
${example('11.12', `A gas in a diesel engine goes round the cycle ABCDA shown. <i>T</i><sub>A</sub> = 300 K and <i>T</i><sub>B</sub> = 660 K. (a) Find the temperatures at C and D. (b) Find the work done by the gas in process BC.`,
  steps([`(a) ${fr('<i>pV</i>', '<i>T</i>')} = constant. B → C at constant pressure: <i>T</i><sub>C</sub> = 660 × ${fr('6.00', '1.40')} = <b>2829 K</b>`, `D → A at constant volume: <i>T</i><sub>D</sub> = 300 × ${fr('7.8', '1.0')} = <b>2340 K</b>`, `(b) <i>W</i><sub>BC</sub> = <i>p</i><sub>B</sub>(<i>V</i><sub>C</sub> − <i>V</i><sub>B</sub>) = (16.0 × 10<sup>5</sup>)(4.60 × 10<sup>−4</sup>) = <b>736 J</b>`]), fig(F.diesel()))}
${stpm('Example 11.13', `(a) Define (i) an adiabatic compression, (ii) a reversible process. [2] (b) 1 mol of an ideal monatomic gas at 650 K, pressure <i>P</i><sub>0</sub> and volume <i>V</i><sub>0</sub> expands at constant temperature to 2<i>V</i><sub>0</sub>, then changes at constant volume back to pressure <i>P</i><sub>0</sub>, then is compressed at constant pressure back to its initial state. (i) Sketch the <i>p</i>–<i>V</i> graph. [4] (ii) Using the first law, show that the total heat is <i>Q</i> = <i>nRT</i><sub>0</sub> ln 2 − <i>P</i><sub>0</sub><i>V</i><sub>0</sub>, and calculate it. [8] (iii) State whether heat is absorbed or released. [1]`,
  steps([`(a)(i) A process in which the volume of the system decreases without any heat transfer into or out of the system. (ii) A process in which the variables that define the state of the system can be made to change so that they pass through the same values in reverse order when the process is reversed.`, `(b)(ii) A → B (constant temperature): Δ<i>U</i> = 0, <i>Q</i><sub>AB</sub> = <i>nRT</i><sub>0</sub> ln 2`, `B → C (constant volume): pressure doubles from <i>P</i><sub>0</sub>/2 to <i>P</i><sub>0</sub>, so <i>T</i> rises from <i>T</i><sub>0</sub> to 2<i>T</i><sub>0</sub>: <i>Q</i><sub>BC</sub> = <i>n</i>(${fr('3', '2')}<i>R</i>)<i>T</i><sub>0</sub>`, `C → A (constant pressure): <i>T</i> falls from 2<i>T</i><sub>0</sub> to <i>T</i><sub>0</sub>: <i>Q</i><sub>CA</sub> = <i>n</i>(${fr('5', '2')}<i>R</i>)(−<i>T</i><sub>0</sub>)`, `Total: <i>Q</i> = <i>nRT</i><sub>0</sub> ln 2 + ${fr('3', '2')}<i>nRT</i><sub>0</sub> − ${fr('5', '2')}<i>nRT</i><sub>0</sub> = <i>nRT</i><sub>0</sub> ln 2 − <i>nRT</i><sub>0</sub> = <b><i>nRT</i><sub>0</sub> ln 2 − <i>P</i><sub>0</sub><i>V</i><sub>0</sub></b> (proved)`, `<i>Q</i> = (1)(8.31)(650)(ln 2 − 1) = <b>−1.66 × 10<sup>3</sup> J</b>`, `(iii) <i>Q</i> is negative: heat is <b>released</b> to the surroundings.`]))}
${stpm('Test on thermodynamics', `(a) State (i) a constant-pressure (isobaric) process, (ii) a constant-temperature (isothermal) process, (iii) an adiabatic process. [3] (b) State the first law of thermodynamics. [2] (c) 2 mol of helium at 27 °C occupy 0.02 m<sup>3</sup>. The gas expands at constant pressure to twice its volume, then expands adiabatically until its temperature returns to its initial value. (${Cv} = 12.47, ${Cp} = 20.78, <i>R</i> = 8.31 J mol<sup>−1</sup> K<sup>−1</sup>) (i) Sketch both processes on one <i>p</i>–<i>V</i> graph. (ii) Find the temperature at the end of the constant-pressure expansion. (iii) Find the total heat supplied. (iv) Find the total work done by the gas. [10]`,
  steps([`(a)(i) A process that occurs at constant pressure. (ii) A process that occurs at constant temperature. (iii) A process that occurs without heat transfer into or out of the system.`, `(b) The heat supplied to a system equals the increase in its internal energy plus the work done by the system: <i>Q</i> = Δ<i>U</i> + <i>W</i>.`, `(c)(ii) Charles’s law: <i>T</i><sub>1</sub> = 300.15 × 2 = <b>600.3 K</b>`, `(iii) <i>Q</i><sub>AB</sub> = <i>n</i>${Cp}Δ<i>T</i> = 2(20.78)(300.15) = 1.25 × 10<sup>4</sup> J; <i>Q</i><sub>BC</sub> = 0 (adiabatic). Total <b>1.25 × 10<sup>4</sup> J</b>`, `(iv) <i>W</i><sub>AB</sub> = <i>nR</i>Δ<i>T</i> = 2(8.31)(300.15) = 4.99 × 10<sup>3</sup> J; <i>W</i><sub>BC</sub> = −Δ<i>U</i> = <i>n</i>${Cv}(<i>T</i><sub>1</sub> − <i>T</i><sub>0</sub>) = 2(12.47)(300.15) = 7.49 × 10<sup>3</sup> J. Total <b>1.25 × 10<sup>4</sup> J</b> (equal to <i>Q</i>, since the gas ends at its initial temperature, Δ<i>U</i> = 0)`]))}
`)}`;

  // ---------- simulation: p-V explorer ----------
  window.PhysiQSims.add('pv', function (root) {
    const { COL, fmt, clamp, el, slider, button, canvas, text, readouts, panel } = window.PhysiQSims.U;
    const R = 8.31, n = 1, p1 = 2e5, V1 = 0.0125; // T1 = p1V1/nR ≈ 301 K
    const S = { proc: 'iso', V2: 0.025, p2f: 0.5, f: 3 };
    const NAMES = { iso: 'Constant temperature (isothermal)', adi: 'Adiabatic', bar: 'Constant pressure (isobaric)', cho: 'Constant volume (isochoric)' };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const pb = Object.keys(NAMES).map(k => { const b = button(pre, NAMES[k], 'sm-chip', () => { S.proc = k; pb.forEach(x => x.classList.toggle('on', x === b)); slV.wrap.style.display = k === 'cho' ? 'none' : ''; slP.wrap.style.display = k === 'cho' ? '' : 'none'; draw(); }); return b; });
    pb[0].classList.add('on');
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    const slV = { wrap: null }, slP = { wrap: null };
    const a = slider(ctl, 'final volume', 5, 40, 0.5, S.V2 * 1000, '× 10⁻³ m³', v => { S.V2 = v / 1000; draw(); }); slV.wrap = ctl.lastChild;
    const b = slider(ctl, 'final pressure ÷ initial', 0.2, 2, 0.05, S.p2f, '×', v => { S.p2f = v; draw(); }); slP.wrap = ctl.lastChild; slP.wrap.style.display = 'none';
    const gb = el('div', 'sm-row sm-pre'); root.appendChild(gb);
    const gbs = [['Monatomic (f = 3)', 3], ['Diatomic (f = 5)', 5]].map(([nm, f]) => { const x = button(gb, nm, 'sm-chip', () => { S.f = f; gbs.forEach(y => y.classList.toggle('on', y === x)); draw(); }); return x; });
    gbs[0].classList.add('on');
    const cv = canvas(root), bars = canvas(root); const ro = readouts(root);
    function state() {
      const cv_ = S.f / 2 * R, gam = (S.f + 2) / S.f, T1 = p1 * V1 / (n * R);
      let pts = [], V2 = S.V2, p2, W, dU, Q;
      if (S.proc === 'iso') { p2 = p1 * V1 / V2; for (let i = 0; i <= 60; i++) { const v = V1 + (V2 - V1) * i / 60; pts.push([v, p1 * V1 / v]); } W = n * R * T1 * Math.log(V2 / V1); dU = 0; }
      else if (S.proc === 'adi') { p2 = p1 * Math.pow(V1 / V2, gam); for (let i = 0; i <= 60; i++) { const v = V1 + (V2 - V1) * i / 60; pts.push([v, p1 * Math.pow(V1 / v, gam)]); } W = (p1 * V1 - p2 * V2) / (gam - 1); dU = -W; }
      else if (S.proc === 'bar') { p2 = p1; pts = [[V1, p1], [V2, p1]]; W = p1 * (V2 - V1); dU = n * cv_ * (p1 * V2 - p1 * V1) / (n * R); }
      else { V2 = V1; p2 = p1 * S.p2f; pts = [[V1, p1], [V1, p2]]; W = 0; dU = n * cv_ * (p2 - p1) * V1 / (n * R); }
      Q = dU + W; return { pts, V2, p2, W, dU, Q, T1, T2: p2 * V2 / (n * R), gam };
    }
    function draw() {
      const s = state(), ctx = cv.ctx, { w, h } = cv.size(0.5, 260, 360);
      ctx.clearRect(0, 0, w, h);
      const pan0 = panel(ctx, { x: 60, y: 22, w: w - 80, h: h - 66 }, 0, 42, 0, 4.2, 'V / 10⁻³ m³', 'p', '/ 10⁵ Pa'), pan = { X: v => pan0.X(v * 1000), Y: pan0.Y };
      // isotherms
      [150, 300, 450, 600].forEach(Tk => { ctx.strokeStyle = 'rgba(106,99,236,.25)'; ctx.lineWidth = 1; ctx.beginPath(); for (let i = 0; i <= 80; i++) { const v = 0.003 + 0.039 * i / 80, p = n * R * Tk / v / 1e5; if (p > 4.2) continue; ctx.lineTo(pan.X(v), pan.Y(p)); } ctx.stroke(); text(ctx, Tk + ' K', pan.X(0.041), pan.Y(n * R * Tk / 0.041 / 1e5) - 4, { fs: 10, c: '#8C86F0', a: 'right' }); });
      // shaded work
      if (s.W !== 0) { ctx.beginPath(); ctx.moveTo(pan.X(s.pts[0][0]), pan.Y(0)); s.pts.forEach(p => ctx.lineTo(pan.X(p[0]), pan.Y(p[1] / 1e5))); ctx.lineTo(pan.X(s.pts[s.pts.length - 1][0]), pan.Y(0)); ctx.closePath(); ctx.fillStyle = s.W > 0 ? 'rgba(106,99,236,.2)' : 'rgba(242,102,27,.22)'; ctx.fill(); }
      ctx.strokeStyle = COL.r; ctx.lineWidth = 3; ctx.beginPath(); s.pts.forEach((p, i) => i ? ctx.lineTo(pan.X(p[0]), pan.Y(p[1] / 1e5)) : ctx.moveTo(pan.X(p[0]), pan.Y(p[1] / 1e5))); ctx.stroke();
      const e = s.pts[s.pts.length - 1], e0 = s.pts[s.pts.length - 2] || s.pts[0];
      const ang = Math.atan2(pan.Y(e[1] / 1e5) - pan.Y(e0[1] / 1e5), pan.X(e[0]) - pan.X(e0[0])); ctx.fillStyle = COL.r; ctx.beginPath(); ctx.moveTo(pan.X(e[0]), pan.Y(e[1] / 1e5)); ctx.lineTo(pan.X(e[0]) - 11 * Math.cos(ang - 0.4), pan.Y(e[1] / 1e5) - 11 * Math.sin(ang - 0.4)); ctx.lineTo(pan.X(e[0]) - 11 * Math.cos(ang + 0.4), pan.Y(e[1] / 1e5) - 11 * Math.sin(ang + 0.4)); ctx.fill();
      ctx.beginPath(); ctx.arc(pan.X(V1), pan.Y(p1 / 1e5), 5, 0, 7); ctx.fillStyle = COL.ink; ctx.fill(); text(ctx, '1', pan.X(V1) - 8, pan.Y(p1 / 1e5) - 6, { b: 1, a: 'right' }); text(ctx, '2', pan.X(e[0]) + 8, pan.Y(e[1] / 1e5) - 6, { b: 1 });
      // bars Q, dU, W
      const bc = bars.ctx, { w: W } = bars.size(0, 140, 140); bc.clearRect(0, 0, W, 140);
      const m = Math.max(Math.abs(s.Q), Math.abs(s.dU), Math.abs(s.W), 1), mid = 70, bw = Math.min(110, (W - 60) / 3 - 20);
      bc.strokeStyle = COL.sub; bc.beginPath(); bc.moveTo(10, mid); bc.lineTo(W - 10, mid); bc.stroke();
      [['Q (heat in)', s.Q, COL.o], ['ΔU', s.dU, COL.gr], ['W (by gas)', s.W, COL.v]].forEach(([nm, v, c], i) => { const x = 30 + i * (bw + 30), hh = v / m * 52; bc.fillStyle = c; bc.fillRect(x, hh > 0 ? mid - hh : mid, bw, Math.abs(hh)); text(bc, nm, x + bw / 2, 136, { a: 'center', fs: 11, c: COL.sub }); text(bc, fmt(v, 0) + ' J', x + bw / 2, hh > 0 ? mid - hh - 4 : mid - hh + 14, { a: 'center', fs: 11, b: 1 }); if (i < 2) text(bc, i === 0 ? '=' : '+', x + bw + 15, mid - 6, { a: 'center', fs: 16, b: 1 }); });
      ro([['process', NAMES[S.proc]], ['T₁ → T₂', fmt(s.T1, 0) + ' K → ' + fmt(s.T2, 0) + ' K', 'hl'], ['p₂', fmt(s.p2 / 1e5, 2) + ' × 10⁵ Pa'], ['γ = (f + 2)/f', fmt(s.gam, 2)]]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw(); void a; void b; void clamp;
  });

  window.PhysiQLessons.register('LESSON-11', { html: () => S });
})();
