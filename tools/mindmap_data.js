// Content of the chapter mind-map posters. Built by tools/build_mindmaps.js.
// Each chapter: idea (hub text), boxes [{t,c,col:'L'|'M'|'R',body}], hubAt (index in M column), rows [{cols, boxes}], tips.
// Body items: ['f',tex] ['fs',[tex..]] ['b',[html..]] ['p',html] ['note',html] ['kv',[[k,v]..]] ['tbl',[[head..],[row..]..]]
//             ['num',[..]] ['row',[[items],[items]],cols] ['sub',[title, ...items],color] ['svg',markup]   ($..$ = inline TeX)
module.exports = K => ({

  'S2-18': {
    hubTitle: 'Alternating<br>Current',
    hubIcon: K.svg(160, 44, K.curve(10, 150, x => 22 - 15 * Math.sin((x - 10) / 140 * 4 * Math.PI), '#EA580C', 3), 160),
    idea: '**Key idea:** the current and voltage vary sinusoidally and reverse direction every half cycle.',
    hubAt: 1,
    boxes: [
      { t: 'Basic equations', c: 'blue', col: 'L', body: [
        ['svg', K.waves(0)],
        ['p', 'Pure resistor: $V$ and $I$ in phase'],
        ['fs', ['I = I_0\\sin\\omega t', 'V = V_0\\sin\\omega t']],
        ['kv', [['$I_0,V_0$', 'peak values'], ['$\\omega$', '$= 2\\pi f$ (rad s⁻¹)'], ['$T$', '$= \\dfrac{1}{f}$ (s)']]],
      ] },
      { t: 'R.m.s. (effective) value', c: 'green', col: 'M', body: [
        ['fs', ['I_{\\text{rms}} = \\dfrac{I_0}{\\sqrt2}', 'V_{\\text{rms}} = \\dfrac{V_0}{\\sqrt2}']],
        ['b', ['The steady d.c. that dissipates heat in a resistor **at the same rate** as the a.c.', 'Mean value over one cycle $= 0$', 'Mains 240 V is r.m.s.: $V_0 = 339$ V']],
      ] },
      { t: 'Power in a.c.', c: 'pink', col: 'R', body: [
        ['f', '\\langle P\\rangle = I_{\\text{rms}}V_{\\text{rms}} = I_{\\text{rms}}^2R = \\tfrac12 I_0V_0'],
        ['svg', K.powerGraph()],
        ['b', ['Peak power $P_0 = I_0^2R = 2\\langle P\\rangle$', 'Instantaneous $P$ varies at **twice** the supply frequency, never negative']],
        ['note', 'Pure $L$ and pure $C$: mean power $= 0$. Energy is stored, then returned to the source.'],
      ] },
      { t: 'Components', c: 'purple', col: 'L', body: [
        ['sub', ['Resistor $R$', ['row', [[['svg', K.sym('R', '#7C3AED')]], [['b', ['$V$ and $I$ **in phase**, $\\phi = 0$', '$R$ independent of $f$', 'Dissipates energy as heat']]]], '70px 1fr']], '#7C3AED'],
        ['sub', ['Inductor $L$', ['row', [[['svg', K.sym('L', '#0F766E')]], [['b', ['$X_L = \\omega L = 2\\pi fL$', '$V$ **leads** $I$ by 90°', 'd.c.: $X_L = 0$']]]], '70px 1fr']], '#0F766E'],
        ['sub', ['Capacitor $C$', ['row', [[['svg', K.sym('C', '#2563EB')]], [['b', ['$X_C = \\dfrac{1}{\\omega C} = \\dfrac{1}{2\\pi fC}$', '$I$ **leads** $V$ by 90°', 'Blocks d.c.: $X_C\\to\\infty$']]]], '70px 1fr']], '#2563EB'],
      ] },
      { t: 'Reactance and frequency', c: 'orange', col: 'M', body: [
        ['svg', K.reactanceGraph()],
        ['b', ['$X_L \\propto f$: straight line through origin, gradient $2\\pi L$', '$X_C \\propto \\dfrac1f$: falls towards zero, never touches the axis', '$f$ doubled: $X_L$ doubles, $X_C$ halves']],
      ] },
      { t: 'Phase (phasors)', c: 'teal', col: 'R', body: [
        ['row', [[['svg', K.phasor(0, 'R: in phase')]], [['svg', K.phasor(-90, 'L: I lags V')]]]],
        ['svg', K.phasor(90, 'C: I leads V')],
        ['p', 'Series R–L or R–C: phase angle $0 < \\phi < 90°$'],
        ['note', '**ELI the ICE man:** in L, e.m.f. leads I; in C, I leads e.m.f.'],
      ] },
    ],
    rows: [
      { cols: '1.55fr 1fr', boxes: [
        { t: 'R–L and R–C series circuits', c: 'red', body: [
          ['row', [
            [['svg', K.loop(['R', 'L'], ['R', 'L'])], ['fs', ['Z = \\sqrt{R^2 + X_L^2}', '\\tan\\phi = \\dfrac{X_L}{R}']], ['p', '**R–L:** current **lags** voltage by $\\phi$']],
            [['svg', K.loop(['R', 'C'], ['R', 'C'])], ['fs', ['Z = \\sqrt{R^2 + X_C^2}', '\\tan\\phi = \\dfrac{X_C}{R}']], ['p', '**R–C:** current **leads** voltage by $\\phi$']],
            [['svg', K.zTriangle()], ['fs', ['V^2 = V_R^2 + V_L^2', '\\cos\\phi = \\dfrac{R}{Z}']]],
          ], '1fr 1fr 1.05fr'],
          ['note', '$V_{\\text{rms}} = I_{\\text{rms}}Z$ and mean power $\\langle P\\rangle = I_{\\text{rms}}V_{\\text{rms}}\\cos\\phi = I_{\\text{rms}}^2R$ (only $R$ dissipates power).'],
        ] },
        { t: 'Unit check', c: 'navy', body: [
          ['tbl', [['Quantity', 'Formula', 'Unit'],
            ['Period', '$T = 1/f$', 's'],
            ['Angular frequency', '$\\omega = 2\\pi f$', 'rad s⁻¹'],
            ['R.m.s. current', '$I_{\\text{rms}} = I_0/\\sqrt2$', 'A'],
            ['Inductive reactance', '$X_L = \\omega L$', 'Ω'],
            ['Capacitive reactance', '$X_C = 1/\\omega C$', 'Ω'],
            ['Impedance', '$Z = \\sqrt{R^2+X^2}$', 'Ω'],
            ['Power factor', '$\\cos\\phi = R/Z$', 'no unit'],
            ['Mean power', '$I_{\\text{rms}}^2R$', 'W']]],
        ] },
      ] },
      { cols: '1fr 1fr', boxes: [
        { t: 'Key points to memorise', c: 'green', body: [
          ['num', ['R.m.s. value $=$ peak value $\\div\\sqrt2$ (sine wave only).', 'Only the resistor dissipates mean power.', 'Inductor stores energy in its **magnetic** field; capacitor in its **electric** field.', 'Voltages across $R$ and $X$ are 90° apart: add as **phasors**, not arithmetically.']],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Reading $\\omega$ (314 rad s⁻¹) as the frequency: $f = \\omega/2\\pi = 50$ Hz.', 'Using $V_0$ in $P = V^2/R$ gives the **peak** power, twice the mean.', 'Forgetting µF → ×10⁻⁶ F or mH → ×10⁻³ H.', 'Stating that current leads voltage in an inductor (that is the capacitor).']],
        ] },
      ] },
    ],
    tips: ['Convert peak values to r.m.s. before finding power.', 'Find $X_L$ or $X_C$ first, then $Z$, then $I$.', 'Draw the phasor (impedance) triangle: $R$ across, $X$ up, $Z$ hypotenuse.', 'State the phase relation in words: "current leads/lags voltage by …".'],
  },

});
