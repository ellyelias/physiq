// Content of the chapter mind-map posters. Built by tools/build_mindmaps.js.
// Each chapter: idea (hub text), boxes [{t,c,col:'L'|'M'|'R',body}], hubAt (index in M column), rows [{cols, boxes}], tips.
// Body items: ['f',tex] ['fs',[tex..]] ['b',[html..]] ['p',html] ['note',html] ['kv',[[k,v]..]] ['tbl',[[head..],[row..]..]]
//             ['num',[..]] ['row',[[items],[items]],cols] ['sub',[title, ...items],color] ['svg',markup]   ($..$ = inline TeX)
const r = String.raw;
module.exports = K => ({

  '1': {
    hubTitle: 'Physical<br>Quantities',
    idea: '**Key idea:** every quantity is a number × a unit, and every term in a correct equation has the same dimensions.',
    hubAt: 1,
    boxes: [
      { t: 'SI base quantities', c: 'blue', col: 'L', body: [
        ['tbl', [['Quantity', 'Unit', 'Dim.'], ['Length', 'metre, m', '[L]'], ['Mass', 'kilogram, kg', '[M]'], ['Time', 'second, s', '[T]'], ['Current', 'ampere, A', '[I]'], ['Temperature', 'kelvin, K', '[θ]'], ['Amount', 'mole, mol', '[N]'], ['Luminous intensity', 'candela, cd', '–']]],
        ['p', 'Derived units are products or quotients of base units.'],
      ] },
      { t: 'Dimensions & homogeneity', c: 'green', col: 'M', body: [
        ['fs', [r`[F] = \text{MLT}^{-2}`, r`[E] = \text{ML}^2\text{T}^{-2}`]],
        ['b', ['A correct equation is **homogeneous**: every term has the same dimensions.', 'Homogeneous does **not** mean correct: numbers such as ½ or 2π have no dimensions.', 'Angles (rad), strain and refractive index are dimensionless.']],
      ] },
      { t: 'Scalars & vectors', c: 'pink', col: 'R', body: [
        ['svg', K.fig('1.2', 0, 360)],
        ['fs', [r`F_x = F\cos\theta`, r`F_y = F\sin\theta`]],
        ['fs', [r`R = \sqrt{R_x^2 + R_y^2}`, r`\tan\theta = \dfrac{R_y}{R_x}`]],
        ['p', '**Scalar:** magnitude only. **Vector:** magnitude and direction.'],
      ] },
      { t: 'Prefixes', c: 'purple', col: 'L', body: [
        ['tbl', [['Prefix', '×', 'Prefix', '×'], ['tera T', '10¹²', 'centi c', '10⁻²'], ['giga G', '10⁹', 'milli m', '10⁻³'], ['mega M', '10⁶', 'micro µ', '10⁻⁶'], ['kilo k', '10³', 'nano n', '10⁻⁹'], ['deci d', '10⁻¹', 'pico p', '10⁻¹²']]],
        ['note', '1 cm² = 10⁻⁴ m², 1 cm³ = 10⁻⁶ m³, 1 km h⁻¹ = 1/3.6 m s⁻¹'],
      ] },
      { t: 'Accuracy & precision', c: 'orange', col: 'M', body: [
        ['svg', K.fig('1.3', 0, 360)],
        ['kv', [['Systematic', 'same size and sign each time (zero error); affects **accuracy**; correct by calibrating'], ['Random', 'scatter both ways (reaction time); affects **precision**; reduce by averaging']]],
      ] },
      { t: 'Uncertainty rules', c: 'teal', col: 'R', body: [
        ['kv', [['$Z = A \\pm B$', '$\\Delta Z = \\Delta A + \\Delta B$'], ['$Z = AB,\\ A/B$', r`$\dfrac{\Delta Z}{Z} = \dfrac{\Delta A}{A} + \dfrac{\Delta B}{B}$`], ['$Z = A^n$', r`$\dfrac{\Delta Z}{Z} = |n|\dfrac{\Delta A}{A}$`], ['$Z = kA$', '$\\Delta Z = k\\,\\Delta A$']]],
        ['b', ['Analogue scale: ± half the smallest division', 'Digital: ± one in the last digit', 'Repeated: $\\Delta x = \\tfrac12(x_{\\max} - x_{\\min})$']],
      ] },
    ],
    rows: [
      { cols: '1.25fr 1fr', boxes: [
        { t: 'Unit check: derived quantities', c: 'navy', body: [
          ['tbl', [['Quantity', 'Defining equation', 'SI base units', 'Dimensions'],
            ['Force', '$F = ma$', 'kg m s⁻² (N)', 'MLT⁻²'], ['Energy, work', '$W = Fs$', 'kg m² s⁻² (J)', 'ML²T⁻²'], ['Power', '$P = W/t$', 'kg m² s⁻³ (W)', 'ML²T⁻³'], ['Pressure', '$p = F/A$', 'kg m⁻¹ s⁻² (Pa)', 'ML⁻¹T⁻²'], ['Momentum', '$p = mv$', 'kg m s⁻¹', 'MLT⁻¹'], ['Density', '$\\rho = m/V$', 'kg m⁻³', 'ML⁻³']]],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Taking the newton or joule as a **base** unit; they are derived.', 'Adding **percentage** uncertainties for a sum; add absolute ones.', 'Forgetting to multiply by the power: $\\Delta(r^2)/r^2 = 2\\Delta r/r$.', 'Quoting the answer to more significant figures than the data.', 'Using cm in a formula that needs m.']],
        ] },
      ] },
    ],
    tips: ['Write the defining equation, then replace each quantity by its base units.', 'For dimensional analysis, equate the powers of M, L and T.', 'Quote the uncertainty to 1 s.f. and the value to the same decimal place.', 'Resolve every vector along two perpendicular axes before adding.'],
  },

  '2': {
    hubTitle: 'Kinematics',
    idea: '**Key idea:** describe motion with $s$, $v$, $a$ and $t$; for constant acceleration use the four equations of motion.',
    hubAt: 1,
    boxes: [
      { t: 'Definitions', c: 'blue', col: 'L', body: [
        ['kv', [['Displacement', 'straight-line distance in a stated direction (vector)'], ['Velocity', '$v = \\dfrac{ds}{dt}$, rate of change of displacement'], ['Acceleration', '$a = \\dfrac{dv}{dt}$, rate of change of velocity'], ['Speed, distance', 'scalars: magnitude only']]],
        ['note', 'Average velocity $= \\dfrac{\\Delta s}{\\Delta t}$; average speed $= \\dfrac{\\text{total distance}}{\\text{total time}}$'],
      ] },
      { t: 'Equations of motion', c: 'green', col: 'M', body: [
        ['fs', ['v = u + at', r`s = ut + \tfrac12 at^2`]],
        ['fs', ['v^2 = u^2 + 2as', r`s = \tfrac12(u+v)t`]],
        ['p', 'Constant acceleration in a straight line only.'],
      ] },
      { t: 'Projectile motion', c: 'pink', col: 'R', body: [
        ['svg', K.fig('2.2', 0, 360)],
        ['kv', [['Horizontal', 'constant velocity $u\\cos\\theta$, $a_x = 0$'], ['Vertical', 'acceleration $g$ downward, $u_y = u\\sin\\theta$'], ['Top', '$v_y = 0$; $v_x$ unchanged']]],
      ] },
      { t: 'Motion graphs', c: 'purple', col: 'L', body: [
        ['svg', K.fig('2.1', 0, 360)],
        ['tbl', [['Graph', 'Gradient', 'Area'], ['$s$–$t$', 'velocity', '–'], ['$v$–$t$', 'acceleration', 'displacement'], ['$a$–$t$', '–', 'change in $v$']]],
        ['p', 'Area below the $t$-axis on a $v$–$t$ graph is negative displacement.'],
      ] },
      { t: 'Free fall', c: 'orange', col: 'M', body: [
        ['f', r`a = -g = -9.81\ \text{m s}^{-2}`],
        ['b', ['Gravity only; air resistance neglected', 'Same $g$ for all masses', 'Choose **up** as positive and keep the sign', 'At the highest point $v = 0$, but $a = g$ still']],
      ] },
      { t: 'Projectile formulas', c: 'teal', col: 'R', body: [
        ['fs', [r`T = \dfrac{2u\sin\theta}{g}`, r`H = \dfrac{u^2\sin^2\theta}{2g}`]],
        ['fs', [r`R = \dfrac{u^2\sin 2\theta}{g}`]],
        ['b', ['$R_{\\max}$ at $\\theta = 45°$; $\\theta$ and $90° - \\theta$ give the same range', 'Path is a **parabola**: $y = x\\tan\\theta - \\dfrac{gx^2}{2u^2\\cos^2\\theta}$']],
      ] },
    ],
    rows: [
      { cols: '1fr 1fr', boxes: [
        { t: 'Horizontal launch from height h', c: 'red', body: [
          ['fs', [r`t = \sqrt{\dfrac{2h}{g}}`, 'x = ut', r`v = \sqrt{u^2 + (gt)^2}`]],
          ['b', ['Time of fall depends on $h$ only, not on $u$', 'Angle below horizontal: $\\tan\\phi = \\dfrac{gt}{u}$']],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Mixing signs: if up is +, then $g$ is −9.81 m s⁻².', 'Using $R = u^2\\sin2\\theta/g$ when landing at a **different** height.', 'Saying acceleration is zero at the top of the path.', 'Treating distance as displacement on a return journey.']],
        ] },
      ] },
    ],
    tips: ['List $s, u, v, a, t$; pick the equation without the unknown you do not need.', 'Split projectile motion into horizontal and vertical parts.', 'Time links the two directions.', 'State the direction of every vector answer.'],
  },

  '3': {
    hubTitle: 'Dynamics',
    idea: '**Key idea:** a resultant force changes momentum; in an isolated system the total momentum is conserved.',
    hubAt: 1,
    boxes: [
      { t: "Newton's laws", c: 'blue', col: 'L', body: [
        ['num', ['**1st:** a body stays at rest or at constant velocity unless a resultant force acts (inertia, measured by mass).', '**2nd:** rate of change of momentum ∝ resultant force, in its direction.', '**3rd:** A on B = − B on A; the pair act on **different** bodies.']],
        ['fs', [r`F = \dfrac{dp}{dt}`, 'F = ma']],
        ['p', '1 N gives 1 kg an acceleration of 1 m s⁻².'],
      ] },
      { t: 'Momentum & impulse', c: 'green', col: 'M', body: [
        ['fs', ['p = mv', r`J = F\Delta t = \Delta p`]],
        ['svg', K.fig('3.2', 0, 360)],
        ['b', ['Impulse = **area** under the $F$–$t$ graph', 'Unit: kg m s⁻¹ = N s']],
      ] },
      { t: 'Free-body diagrams', c: 'pink', col: 'R', body: [
        ['svg', K.fig('3.1', 0, 360)],
        ['b', ['Smooth incline: $a = g\\sin\\theta$, $N = mg\\cos\\theta$', 'Lift up: $R = m(g + a)$; down: $R = m(g - a)$', 'Free fall: $R = 0$ (weightless)']],
      ] },
      { t: 'Conservation of momentum', c: 'purple', col: 'L', body: [
        ['f', 'm_1u_1 + m_2u_2 = m_1v_1 + m_2v_2'],
        ['b', ['Isolated system: no resultant external force', 'Holds in **every** collision and explosion', 'Recoil from rest: $m_1v_1 + m_2v_2 = 0$', '2-D: conserve $p_x$ and $p_y$ separately']],
      ] },
      { t: 'Collisions', c: 'orange', col: 'M', body: [
        ['svg', K.fig('3.3', 0, 360)],
        ['tbl', [['Type', 'Momentum', 'Kinetic energy'], ['Elastic', 'conserved', 'conserved'], ['Inelastic', 'conserved', 'lost'], ['Perfectly inelastic', 'conserved', 'max. loss, stick']]],
      ] },
      { t: 'Friction', c: 'teal', col: 'R', body: [
        ['svg', K.fig('3.4', 0, 360)],
        ['fs', [r`f_s \le \mu_s N`, r`f_k = \mu_k N`]],
        ['b', ['Opposes (the tendency of) relative motion', '$\\mu_k < \\mu_s$; independent of contact area', 'About to slide on incline: $\\tan\\theta = \\mu_s$']],
      ] },
    ],
    rows: [
      { cols: '1.2fr 1fr', boxes: [
        { t: 'Useful results', c: 'red', body: [
          ['row', [
            [['p', '**Elastic, $m_2$ at rest:**'], ['fs', [r`v_1 = \dfrac{(m_1-m_2)u_1}{m_1+m_2}`, r`v_2 = \dfrac{2m_1u_1}{m_1+m_2}`]]],
            [['p', '**Elastic:** speed of approach = speed of separation'], ['f', 'u_1 - u_2 = v_2 - v_1'], ['p', '**Kinetic energy:** $E_k = \\dfrac{p^2}{2m}$']],
          ]],
          ['note', 'Pulley (light string): $a = \\dfrac{(m_1-m_2)g}{m_1+m_2}$, $T = \\dfrac{2m_1m_2g}{m_1+m_2}$. Stream on a wall: $F = \\dfrac{dm}{dt}(v - u)$.'],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Calling weight and normal reaction a 3rd-law pair (same body, different types).', 'Rebound: $\\Delta p = m(v + u)$, not $m(v - u)$.', 'Forgetting momentum is a vector: fix a positive direction.', 'Assuming $N = mg$ when the force pulls at an angle.']],
        ] },
      ] },
    ],
    tips: ['Draw a free-body diagram for each body first.', 'Apply $\\Sigma F = ma$ along the direction of motion.', 'State "no external force, so momentum is conserved".', 'Check kinetic energy to decide whether a collision is elastic.'],
  },

  '4': {
    hubTitle: 'Work, Energy<br>& Power',
    idea: '**Key idea:** work transfers energy; energy is never created or destroyed, only converted.',
    hubAt: 1,
    boxes: [
      { t: 'Work done', c: 'blue', col: 'L', body: [
        ['svg', K.fig('4.1', 0, 360)],
        ['f', r`W = Fs\cos\theta`],
        ['b', ['Scalar, unit J (1 J = 1 N × 1 m)', 'Variable force: $W = \\int F\\,dx$ = **area** under $F$–$s$', '$\\theta = 90°$ (centripetal force, normal reaction): $W = 0$', 'Friction does negative work']],
      ] },
      { t: 'Energy stores', c: 'green', col: 'M', body: [
        ['fs', [r`E_k = \tfrac12 mv^2`, r`\Delta U = mg\Delta h`]],
        ['fs', [r`U_{\text{spring}} = \tfrac12 kx^2`]],
        ['p', 'Elastic energy = area under the $F$–$x$ graph.'],
      ] },
      { t: 'Power', c: 'pink', col: 'R', body: [
        ['fs', [r`P = \dfrac{W}{t} = \dfrac{dW}{dt}`, 'P = Fv']],
        ['b', ['Rate of doing work, unit W = J s⁻¹', 'Constant speed against resistance $F$: $P = Fv$', '1 kW h = 3.6 × 10⁶ J']],
      ] },
      { t: 'Work–energy theorem', c: 'purple', col: 'L', body: [
        ['f', r`W_{\text{net}} = \tfrac12 mv^2 - \tfrac12 mu^2`],
        ['p', 'Net work done on a body = change in its kinetic energy.'],
        ['note', 'Against friction on a level surface: $W = \\mu mgs$.'],
      ] },
      { t: 'Conservation of energy', c: 'orange', col: 'M', body: [
        ['svg', K.fig('4.2', 0, 360)],
        ['f', r`\tfrac12 mu^2 + mgh_1 = \tfrac12 mv^2 + mgh_2 + F_f d`],
        ['b', ['No friction: mechanical energy constant', 'From rest through height $h$: $v = \\sqrt{2gh}$, any smooth path', 'Pendulum: $v = \\sqrt{2gL(1-\\cos\\theta)}$']],
      ] },
      { t: 'Efficiency', c: 'teal', col: 'R', body: [
        ['svg', K.fig('4.3', 0, 360)],
        ['f', r`\eta = \dfrac{\text{useful output}}{\text{input}} \times 100\%`],
        ['p', 'The rest is wasted, mostly as heat; $\\eta < 100\\%$.'],
      ] },
    ],
    rows: [
      { cols: '1fr 1fr', boxes: [
        { t: 'Conservative or not?', c: 'red', body: [
          ['kv', [['Conservative', 'work independent of path (gravity, spring); energy recoverable'], ['Non-conservative', 'work depends on path (friction, air resistance); energy → heat']]],
          ['note', 'Lifting through height $h$: $W = mgh$ by any route.'],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Using the full force instead of its component along $s$.', 'Taking $P = Fv$ with the **driving** force when speed changes; use the net force only for $\\Delta E_k$.', 'Forgetting the friction term in an energy equation.', 'Mixing kW h and J.']],
        ] },
      ] },
    ],
    tips: ['Write "loss of PE = gain in KE + work against friction".', 'Use energy methods when the path is curved.', 'Use $P = Fv$ for vehicles at constant speed.', 'Give efficiency as a percentage or a fraction, consistently.'],
  },


  '5': {
    hubTitle: 'Circular<br>Motion',
    idea: '**Key idea:** a resultant force towards the centre keeps changing the direction of the velocity.',
    hubAt: 1,
    boxes: [
      { t: 'Angular quantities', c: 'blue', col: 'L', body: [
        ['fs', [r`\theta = \dfrac{s}{r}`, r`\omega = \dfrac{d\theta}{dt}`]],
        ['fs', [r`\omega = \dfrac{2\pi}{T} = 2\pi f`, r`v = r\omega`]],
        ['p', '**1 radian:** the angle subtended at the centre by an arc equal in length to the radius.'],
        ['note', '360° $= 2\\pi$ rad; 1 rev s⁻¹ $= 2\\pi$ rad s⁻¹'],
      ] },
      { t: 'Centripetal acceleration', c: 'green', col: 'M', body: [
        ['f', r`a = \dfrac{v^2}{r} = r\omega^2`],
        ['b', ['Directed towards the **centre**', 'Speed constant, velocity changes direction, so the body accelerates']],
      ] },
      { t: 'Centripetal force', c: 'pink', col: 'R', body: [
        ['f', r`F = \dfrac{mv^2}{r} = mr\omega^2`],
        ['b', ['Not a new force: provided by tension, friction, gravity or normal reaction', 'Perpendicular to $v$: does **no work**; $E_k$ constant', 'Removed: body moves off along the **tangent**']],
      ] },
      { t: 'Horizontal circles', c: 'purple', col: 'L', body: [
        ['p', '**Level bend** (friction provides the force):'],
        ['fs', [r`\mu mg \ge \dfrac{mv^2}{r}`, r`v_{\max} = \sqrt{\mu gr}`]],
        ['p', '**Banked track, no friction:**'],
        ['f', r`\tan\theta = \dfrac{v^2}{rg}`],
        ['p', '**Conical pendulum:**'],
        ['fs', [r`T\cos\theta = mg`, r`T\sin\theta = \dfrac{mv^2}{r}`]],
        ['p', 'Resolve vertically (balance) and horizontally (centripetal).'],
      ] },
      { t: 'Vertical circle', c: 'orange', col: 'M', body: [
        ['svg', K.fig('5.2', 0, 340)],
        ['fs', [r`\text{Top: } T + mg = \dfrac{mv^2}{r}`, r`\text{Bottom: } T - mg = \dfrac{mv^2}{r}`]],
        ['b', ['Tension is greatest at the **bottom**', 'Just completes the loop: $T = 0$ at top, $v_{\\text{top}} = \\sqrt{gr}$', 'Convex bridge top: $mg - N = \\dfrac{mv^2}{r}$']],
      ] },
      { t: 'Uniform circular motion', c: 'teal', col: 'R', body: [
        ['svg', K.fig('5.1', 0, 300)],
        ['tbl', [['Quantity', 'Constant?'], ['speed, $\\omega$, $E_k$', 'yes'], ['velocity', 'no (direction)'], ['acceleration', 'no (direction)']]],
      ] },
    ],
    rows: [
      { cols: '1fr 1fr', boxes: [
        { t: 'Unit check', c: 'navy', body: [
          ['tbl', [['Quantity', 'Formula', 'Unit'], ['Angular displacement', '$\\theta = s/r$', 'rad'], ['Angular velocity', '$\\omega = 2\\pi f$', 'rad s⁻¹'], ['Centripetal acceleration', '$v^2/r$', 'm s⁻²'], ['Centripetal force', '$mr\\omega^2$', 'N']]],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Adding a "centrifugal force" to the free-body diagram.', 'Using degrees instead of radians in $s = r\\theta$.', 'Saying velocity is constant (only speed is).', 'Using the diameter instead of the radius.', 'At the top, forgetting that $T$ and $mg$ both point down.']],
        ] },
      ] },
    ],
    tips: ['Draw the forces, then mark the centre of the circle.', 'Net force towards centre $= mv^2/r$.', 'Use energy conservation to link top and bottom speeds.', 'Convert rev min⁻¹ to rad s⁻¹ first.'],
  },

  '6': {
    hubTitle: 'Gravitation',
    idea: '**Key idea:** every mass attracts every other mass; the force falls off as $1/r^2$.',
    hubAt: 1,
    boxes: [
      { t: "Newton's law of gravitation", c: 'blue', col: 'L', body: [
        ['svg', K.fig('6.1', 0, 320)],
        ['f', r`F = \dfrac{GMm}{r^2}`],
        ['b', ['Always attractive; $r$ between centres', '$G = 6.67\\times10^{-11}$ N m² kg⁻²', 'Equal and opposite on the two masses']],
      ] },
      { t: 'Field strength g', c: 'green', col: 'M', body: [
        ['fs', [r`g = \dfrac{F}{m} = \dfrac{GM}{r^2}`]],
        ['b', ['Force per unit mass, N kg⁻¹ (= m s⁻²)', 'Surface: $g_0 = \\dfrac{GM}{R^2}$, so $GM = g_0R^2$', 'Height $h$: $g = \\dfrac{GM}{(R+h)^2}$']],
      ] },
      { t: 'Gravitational potential', c: 'pink', col: 'R', body: [
        ['fs', [r`V = -\dfrac{GM}{r}`, r`U = -\dfrac{GMm}{r}`]],
        ['b', ['Work done per unit mass to bring a mass from **infinity**; unit J kg⁻¹', 'Zero at infinity, negative elsewhere', '$g = -\\dfrac{dV}{dr}$: field = −(potential gradient)', 'Moving $m$: $W = m\\Delta V$']],
      ] },
      { t: 'Inside and outside', c: 'purple', col: 'L', body: [
        ['svg', K.fig('6.2', 0, 340)],
        ['b', ['Inside (uniform Earth): $g \\propto r$', 'Outside: $g \\propto 1/r^2$; $V \\propto -1/r$', '$g = 0$ at the centre']],
      ] },
      { t: 'Satellite motion', c: 'orange', col: 'M', body: [
        ['svg', K.fig('6.3', 0, 300)],
        ['f', r`\dfrac{GMm}{r^2} = \dfrac{mv^2}{r}`],
        ['fs', [r`v = \sqrt{\dfrac{GM}{r}}`, r`T^2 = \dfrac{4\pi^2}{GM}r^3`]],
        ['p', 'Lower orbit: faster, shorter period.'],
      ] },
      { t: 'Energy of a satellite', c: 'teal', col: 'R', body: [
        ['tbl', [['', 'Expression'], ['Kinetic', '$+\\dfrac{GMm}{2r}$'], ['Potential', '$-\\dfrac{GMm}{r}$'], ['Total', '$-\\dfrac{GMm}{2r}$']]],
        ['fs', [r`v_{\text{esc}} = \sqrt{\dfrac{2GM}{R}} = \sqrt{2g_0R}`]],
        ['p', 'Escape speed does not depend on the mass of the object.'],
      ] },
    ],
    rows: [
      { cols: '1fr 1fr', boxes: [
        { t: 'Geostationary orbit', c: 'red', body: [
          ['b', ['Period 24 h, in the **equatorial plane**', 'Moves west to east with the Earth: stays above one point', 'Radius about $4.2\\times10^7$ m (height ≈ 36 000 km)', 'Astronauts feel weightless: they are in **free fall**, not free of gravity']],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Using the height $h$ instead of $r = R + h$.', 'Dropping the minus sign in $V$ and $U$.', 'Saying $g = 0$ in orbit.', 'Thinking escape speed depends on the projectile mass.', '$r$ doubled: $F$ becomes $\\tfrac14$, $V$ becomes $\\tfrac12$.']],
        ] },
      ] },
    ],
    tips: ['Start satellite questions with "gravitational force provides the centripetal force".', 'Replace $GM$ by $g_0R^2$ when $G$ and $M$ are not given.', 'Use ratios for "how many times" questions.', 'Energy needed between orbits $= \\Delta E_{\\text{total}}$.'],
  },

  '7': {
    hubTitle: 'Rotation of<br>Rigid Bodies',
    idea: '**Key idea:** torque, moment of inertia and angular momentum play the roles of force, mass and momentum.',
    hubAt: 1,
    boxes: [
      { t: 'Rotational kinematics', c: 'blue', col: 'L', body: [
        ['fs', [r`\omega = \omega_0 + \alpha t`, r`\theta = \omega_0t + \tfrac12\alpha t^2`]],
        ['fs', [r`\omega^2 = \omega_0^2 + 2\alpha\theta`]],
        ['p', 'Link to the rim:'],
        ['fs', [r`s = r\theta`, r`v = r\omega`, r`a = r\alpha`]],
      ] },
      { t: 'Torque', c: 'green', col: 'M', body: [
        ['svg', K.fig('7.1', 0, 300)],
        ['fs', [r`\tau = rF\sin\theta`, r`\tau = I\alpha`]],
        ['p', 'Unit N m; only the perpendicular component turns the body.'],
      ] },
      { t: 'Moment of inertia', c: 'pink', col: 'R', body: [
        ['f', r`I = \textstyle\sum mr^2`],
        ['tbl', [['Body (axis)', '$I$'], ['Ring, hoop', '$MR^2$'], ['Disc, cylinder', '$\\tfrac12MR^2$'], ['Solid sphere', '$\\tfrac25MR^2$'], ['Rod, centre', '$\\tfrac1{12}ML^2$'], ['Rod, end', '$\\tfrac13ML^2$']]],
        ['p', 'Depends on mass, its distribution and the axis.'],
      ] },
      { t: 'Linear ↔ rotational', c: 'purple', col: 'L', body: [
        ['tbl', [['Linear', 'Rotational'], ['$s$', '$\\theta$'], ['$v$, $a$', '$\\omega$, $\\alpha$'], ['$m$', '$I$'], ['$F = ma$', '$\\tau = I\\alpha$'], ['$p = mv$', '$L = I\\omega$'], ['$\\tfrac12mv^2$', '$\\tfrac12I\\omega^2$'], ['$W = Fs$, $P = Fv$', '$W = \\tau\\theta$, $P = \\tau\\omega$']]],
      ] },
      { t: 'Angular momentum', c: 'orange', col: 'M', body: [
        ['svg', K.fig('7.3', 0, 320)],
        ['fs', [r`L = I\omega`, r`\tau = \dfrac{dL}{dt}`]],
        ['note', '**Conservation:** no external torque, $I_1\\omega_1 = I_2\\omega_2$ (skater pulls arms in: $I$ ↓, $\\omega$ ↑).'],
      ] },
      { t: 'Rotational KE & rolling', c: 'teal', col: 'R', body: [
        ['svg', K.fig('7.2', 0, 300)],
        ['f', r`E_k = \tfrac12 mv^2 + \tfrac12 I\omega^2`],
        ['p', 'Rolling without slipping: $v = r\\omega$.'],
      ] },
    ],
    rows: [
      { cols: '1.15fr 1fr', boxes: [
        { t: 'Rolling down a slope from rest', c: 'red', body: [
          ['row', [[['f', r`mgh = \tfrac12mv^2\left(1 + \dfrac{I}{mr^2}\right)`]], [['tbl', [['Body', '$v^2$'], ['Ring', '$gh$'], ['Disc', '$\\tfrac43gh$'], ['Sphere', '$\\tfrac{10}{7}gh$']]]]], '1.3fr 1fr'],
          ['p', 'Smaller $I/mr^2$ reaches the bottom first: sphere, then disc, then ring.'],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Using rev or degrees: convert to rad (1 rev = 2π rad).', 'Forgetting the rotational KE of a rolling body.', 'Using $I$ about the centre when the axis is at the end.', 'Claiming kinetic energy is conserved when the skater pulls in (it increases).']],
        ] },
      ] },
    ],
    tips: ['Write $\\tau = I\\alpha$ for each rotating body and $F = ma$ for each hanging mass.', 'Link them with $a = r\\alpha$.', 'Use angular momentum when the shape changes.', 'Use energy when heights are given.'],
  },

  '8': {
    hubTitle: 'Statics',
    idea: '**Key idea:** a body is in equilibrium when the resultant force and the resultant torque are both zero.',
    hubAt: 1,
    boxes: [
      { t: 'Conditions of equilibrium', c: 'blue', col: 'L', body: [
        ['fs', [r`\textstyle\sum F_x = 0`, r`\textstyle\sum F_y = 0`]],
        ['f', r`\textstyle\sum\tau = 0 \text{ about any point}`],
        ['b', ['First: translational (no linear acceleration)', 'Second: rotational (no angular acceleration)']],
      ] },
      { t: 'Moment of a force', c: 'green', col: 'M', body: [
        ['f', r`\text{moment} = F \times d_\perp`],
        ['b', ['$d_\\perp$: perpendicular distance from the pivot to the **line of action**', 'Unit N m', '**Couple:** two equal, opposite, parallel forces; torque $= F \\times$ separation; no resultant force']],
      ] },
      { t: 'Three forces', c: 'pink', col: 'R', body: [
        ['svg', K.fig('8.1', 0, 320)],
        ['b', ['Lines of action **concurrent** (meet at a point)', 'Form a closed triangle, head to tail']],
        ['f', r`\dfrac{F_1}{\sin\alpha} = \dfrac{F_2}{\sin\beta} = \dfrac{F_3}{\sin\gamma}`],
        ['p', "Lami's theorem: angle opposite each force."],
      ] },
      { t: 'Centre of gravity', c: 'purple', col: 'L', body: [
        ['p', 'The point through which the whole **weight** appears to act.'],
        ['f', r`\bar{x} = \dfrac{\sum mx}{\sum m}`],
        ['b', ['Uniform regular body: at its geometric centre', 'Suspended freely: lies vertically below the pivot', 'Same as centre of mass in a uniform field']],
      ] },
      { t: 'Principle of moments', c: 'orange', col: 'M', body: [
        ['svg', K.fig('8.2', 0, 340)],
        ['p', '**Σ clockwise moments = Σ anticlockwise moments** about the same point.'],
        ['p', 'Take moments about the point with the **most unknown** forces.'],
      ] },
      { t: 'Stability & toppling', c: 'teal', col: 'R', body: [
        ['kv', [['Stable', 'CG rises when tilted; returns'], ['Unstable', 'CG falls; moves away'], ['Neutral', 'CG height unchanged']]],
        ['b', ['Topples when the vertical through the CG falls **outside the base**', 'Low CG and wide base give stability', 'Block on a slope topples when $\\tan\\theta > w/h$']],
      ] },
    ],
    rows: [
      { cols: '1.1fr 1fr', boxes: [
        { t: 'Method: ladder, beam, hinge', c: 'red', body: [
          ['num', ['Draw every force: weight at the CG, reactions, friction, tension.', 'Resolve horizontally and vertically: $\\sum F_x = 0$, $\\sum F_y = 0$.', 'Take moments about a point that removes an unknown.', 'Hinge force: find both components, then $R = \\sqrt{R_x^2 + R_y^2}$.']],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Using the length of the rod instead of the **perpendicular** distance.', 'Forgetting the weight of the beam itself.', 'Smooth wall: reaction is **perpendicular** to the wall, no friction.', 'Thinking a couple can be balanced by a single force.']],
        ] },
      ] },
    ],
    tips: ['Label the pivot and every distance on the diagram.', 'State the principle of moments in words before using it.', 'Check: upward forces = downward forces.', 'Give the direction of a hinge force as an angle.'],
  },

  '9': {
    hubTitle: 'Deformation<br>of Solids',
    idea: '**Key idea:** within the limit of proportionality, stress is proportional to strain.',
    hubAt: 1,
    boxes: [
      { t: 'Stress & strain', c: 'blue', col: 'L', body: [
        ['fs', [r`\sigma = \dfrac{F}{A}`, r`\varepsilon = \dfrac{x}{L_0}`]],
        ['kv', [['Stress', 'normal force per unit area, Pa (N m⁻²)'], ['Strain', 'extension ÷ original length, **no unit**']]],
        ['note', 'Wire of diameter $d$: $A = \\dfrac{\\pi d^2}{4}$'],
      ] },
      { t: "Young's modulus", c: 'green', col: 'M', body: [
        ['f', r`E = \dfrac{\sigma}{\varepsilon} = \dfrac{FL_0}{Ax}`],
        ['b', ['Gradient of the linear part of the $\\sigma$–$\\varepsilon$ graph', 'Unit Pa; a property of the **material**, not of the sample']],
      ] },
      { t: 'Stress–strain graph', c: 'pink', col: 'R', body: [
        ['svg', K.fig('9.1', 0, 360)],
        ['kv', [['P', 'limit of proportionality'], ['E', 'elastic limit'], ['Y', 'yield point: plastic flow'], ['UTS', 'maximum stress'], ['B', 'breaking point']]],
      ] },
      { t: "Hooke's law", c: 'purple', col: 'L', body: [
        ['fs', ['F = kx', r`k = \dfrac{EA}{L_0}`]],
        ['p', 'Extension ∝ force, provided the limit of proportionality is not exceeded.'],
        ['b', ['Elastic: returns to original length', 'Plastic: permanent extension remains']],
      ] },
      { t: 'Elastic potential energy', c: 'orange', col: 'M', body: [
        ['svg', K.fig('9.2', 0, 320)],
        ['f', r`U = \tfrac12 Fx = \tfrac12 kx^2`],
        ['f', r`\dfrac{U}{V} = \tfrac12\sigma\varepsilon = \dfrac{\sigma^2}{2E}`],
        ['p', 'Energy = **area** under the $F$–$x$ graph.'],
      ] },
      { t: 'Types of material', c: 'teal', col: 'R', body: [
        ['kv', [['Ductile', 'large plastic region before breaking (copper, mild steel)'], ['Brittle', 'breaks just after the elastic region (glass, cast iron)'], ['Rubber', 'large strain; unloading curve below loading: area between = heat lost (hysteresis)']]],
      ] },
    ],
    rows: [
      { cols: '1fr 1fr', boxes: [
        { t: 'Unit check', c: 'navy', body: [
          ['tbl', [['Quantity', 'Formula', 'Unit'], ['Stress', '$F/A$', 'Pa'], ['Strain', '$x/L_0$', '–'], ['Young modulus', '$\\sigma/\\varepsilon$', 'Pa'], ['Force constant', '$EA/L_0$', 'N m⁻¹'], ['Energy density', '$\\tfrac12\\sigma\\varepsilon$', 'J m⁻³']]],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Using the diameter as the radius in $A = \\pi r^2$.', 'Forgetting mm → m for extension and diameter.', 'Using $U = Fx$ instead of $\\tfrac12Fx$.', 'Thinking a thicker wire of the same metal has a larger $E$ (it has a larger $k$).', 'Applying $\\tfrac12Fx$ beyond the limit of proportionality.']],
        ] },
      ] },
    ],
    tips: ['Find $E$ from the gradient of the straight part of the graph.', 'Give strain as a pure number, e.g. $2.0\\times10^{-3}$.', 'Use ratios when two wires of the same material are compared.', 'Area under a curve: count squares or use trapezia.'],
  },

  '10': {
    hubTitle: 'Gases',
    idea: '**Key idea:** gas pressure comes from molecules hitting the walls; temperature measures their mean kinetic energy.',
    hubAt: 1,
    boxes: [
      { t: 'Ideal gas equation', c: 'blue', col: 'L', body: [
        ['f', 'pV = nRT = NkT'],
        ['kv', [['$R$', '8.31 J K⁻¹ mol⁻¹'], ['$k$', '$R/N_A = 1.38\\times10^{-23}$ J K⁻¹'], ['$N_A$', '$6.02\\times10^{23}$ mol⁻¹'], ['$n$', '$= \\dfrac{m}{M} = \\dfrac{N}{N_A}$']]],
        ['note', '$T$ in kelvin: $T = \\theta + 273$'],
      ] },
      { t: 'Gas laws', c: 'green', col: 'M', body: [
        ['tbl', [['Law', 'Constant', 'Relation'], ["Boyle's", '$T$', '$pV$ = constant'], ["Charles's", '$p$', '$V \\propto T$'], ['Pressure', '$V$', '$p \\propto T$']]],
        ['f', r`\dfrac{p_1V_1}{T_1} = \dfrac{p_2V_2}{T_2}`],
        ['svg', K.fig('10.1', 0, 320)],
      ] },
      { t: 'Kinetic theory assumptions', c: 'pink', col: 'R', body: [
        ['num', ['Very many identical molecules in **random** motion', 'Volume of molecules negligible', 'No forces except during collisions', 'Collisions are **elastic**; collision time negligible', 'Newtonian mechanics applies']],
      ] },
      { t: 'Pressure of a gas', c: 'purple', col: 'L', body: [
        ['svg', K.fig('10.2', 0, 320)],
        ['f', r`p = \tfrac13\rho\langle c^2\rangle = \tfrac13\dfrac{Nm}{V}\langle c^2\rangle`],
        ['p', 'Pressure = rate of change of momentum of molecules per unit area of wall.'],
      ] },
      { t: 'Molecular speeds', c: 'orange', col: 'M', body: [
        ['f', r`c_{\text{rms}} = \sqrt{\langle c^2\rangle} = \sqrt{\dfrac{3kT}{m}} = \sqrt{\dfrac{3RT}{M}}`],
        ['b', ['$c_{\\text{rms}} \\propto \\sqrt T$ and $\\propto 1/\\sqrt M$', 'Mean square: square first, then average']],
      ] },
      { t: 'Energy & equipartition', c: 'teal', col: 'R', body: [
        ['f', r`\langle E_k\rangle = \tfrac12 m\langle c^2\rangle = \tfrac32 kT`],
        ['p', 'Each degree of freedom: $\\tfrac12kT$ per molecule.'],
        ['tbl', [['Gas', '$f$', '$U$ for $n$ mol'], ['Monatomic', '3', '$\\tfrac32nRT$'], ['Diatomic', '5', '$\\tfrac52nRT$'], ['Polyatomic', '6', '$3nRT$']]],
      ] },
    ],
    rows: [
      { cols: '1fr 1fr', boxes: [
        { t: 'Unit check', c: 'navy', body: [
          ['tbl', [['Quantity', 'Unit'], ['Pressure $p$', 'Pa = N m⁻²'], ['Molar mass $M$', 'kg mol⁻¹ (not g mol⁻¹)'], ['$\\langle c^2\\rangle$', 'm² s⁻²'], ['Internal energy $U$', 'J']]],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Using °C instead of K.', 'Using $M$ in g mol⁻¹ in $\\sqrt{3RT/M}$.', 'Confusing $n$ (moles) with $N$ (molecules).', 'Mean KE depends only on $T$, not on the type of gas.', 'Doubling $T$ multiplies $c_{\\text{rms}}$ by $\\sqrt2$, not 2.']],
        ] },
      ] },
    ],
    tips: ['Convert cm³ → m³ (×10⁻⁶) and kPa → Pa.', 'Write $n = m/M$ before using $pV = nRT$.', 'Use ratios: $c_{\\text{rms}} \\propto \\sqrt{T/M}$.', 'List the assumptions in full sentences.'],
  },

  '11': {
    hubTitle: 'Thermo-<br>dynamics',
    idea: '**Key idea:** heat supplied = increase in internal energy + work done by the gas.',
    hubAt: 1,
    boxes: [
      { t: 'First law', c: 'blue', col: 'L', body: [
        ['f', r`\Delta U = Q - W`],
        ['tbl', [['Symbol', '+ when', '− when'], ['$Q$', 'heat into gas', 'heat out'], ['$W$', 'gas expands', 'gas compressed'], ['$\\Delta U$', '$T$ rises', '$T$ falls']]],
      ] },
      { t: 'Internal energy', c: 'green', col: 'M', body: [
        ['f', r`\Delta U = nC_V\Delta T = \tfrac f2 nR\Delta T`],
        ['b', ['Ideal gas: random KE only, so $U$ depends on $T$ only', 'True for **any** process between the same temperatures', 'Closed cycle: $\\Delta U = 0$']],
      ] },
      { t: 'Work done by a gas', c: 'pink', col: 'R', body: [
        ['fs', [r`W = \int p\,dV`, r`W = p\Delta V`]],
        ['b', ['$W$ = **area** under the $p$–$V$ graph', 'Constant pressure: $W = p\\Delta V$', 'Cycle: net work = area **enclosed** (clockwise: done by gas)']],
      ] },
      { t: 'Molar heat capacities', c: 'purple', col: 'L', body: [
        ['fs', [r`C_V = \tfrac f2 R`, r`C_p = C_V + R`]],
        ['f', r`\gamma = \dfrac{C_p}{C_V}`],
        ['tbl', [['Gas', '$C_V$', '$C_p$', '$\\gamma$'], ['Monatomic', '$\\tfrac32R$', '$\\tfrac52R$', '5/3'], ['Diatomic', '$\\tfrac52R$', '$\\tfrac72R$', '7/5']]],
        ['p', '$C_p > C_V$: extra heat does work as the gas expands.'],
      ] },
      { t: 'The four processes', c: 'orange', col: 'M', body: [
        ['svg', K.fig('11.2', 0, 330)],
        ['tbl', [['Process', 'Condition', 'First law'], ['Isothermal', '$\\Delta T = 0$', '$Q = W$'], ['Adiabatic', '$Q = 0$', '$\\Delta U = -W$'], ['Isobaric', '$\\Delta p = 0$', '$Q = \\Delta U + p\\Delta V$'], ['Isochoric', '$\\Delta V = 0$', '$Q = \\Delta U$']]],
      ] },
      { t: 'Isothermal vs adiabatic', c: 'teal', col: 'R', body: [
        ['sub', ['Isothermal', ['fs', ['pV = \\text{constant}', r`W = nRT\ln\dfrac{V_2}{V_1}`]]], '#0F766E'],
        ['sub', ['Adiabatic', ['fs', [r`pV^{\gamma} = \text{constant}`, r`TV^{\gamma-1} = \text{constant}`]], ['f', r`W = \dfrac{p_1V_1 - p_2V_2}{\gamma - 1}`]], '#B45309'],
        ['p', 'Adiabatic curve is **steeper** ($\\gamma > 1$); adiabatic expansion cools the gas.'],
      ] },
    ],
    rows: [
      { cols: '1fr 1fr', boxes: [
        { t: 'Energy flow picture', c: 'red', body: [
          ['svg', K.fig('11.1', 0, 380)],
          ['p', 'Isothermal: slow, good thermal contact. Adiabatic: fast, insulated.'],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Writing $\\Delta U = Q + W$ with $W$ done **by** the gas.', 'Using $nC_p\\Delta T$ for $\\Delta U$; it is always $nC_V\\Delta T$.', 'Taking $Q = 0$ as $\\Delta T = 0$ (that is isothermal).', 'Forgetting kPa → Pa or L → m³ in $p\\Delta V$.', 'Reading the area enclosed with the wrong sign for an anticlockwise cycle.']],
        ] },
      ] },
    ],
    tips: ['Make a table of $Q$, $W$, $\\Delta U$ for each stage of a cycle.', 'Check: around a cycle $\\sum\\Delta U = 0$.', 'Find the missing temperature with $pV = nRT$.', 'State the sign convention you use.'],
  },

  '12': {
    hubTitle: 'Transfer of<br>Thermal Energy',
    idea: '**Key idea:** heat flows from hot to cold by conduction, convection and radiation.',
    hubAt: 1,
    boxes: [
      { t: 'Three modes', c: 'blue', col: 'L', body: [
        ['b', ['**Conduction:** through a material without bulk movement, by lattice vibrations and, in metals, free electrons', '**Convection:** bulk movement of a fluid caused by density differences', '**Radiation:** electromagnetic waves (mainly infrared); no medium needed']],
      ] },
      { t: 'Conduction', c: 'green', col: 'M', body: [
        ['f', r`\dfrac{Q}{t} = -kA\dfrac{d\theta}{dx} = \dfrac{kA(\theta_1 - \theta_2)}{L}`],
        ['b', ['$k$: thermal conductivity, W m⁻¹ K⁻¹', '$d\\theta/dx$: temperature gradient, K m⁻¹', 'Minus sign: heat flows down the gradient']],
      ] },
      { t: 'Thermal resistance', c: 'pink', col: 'R', body: [
        ['fs', [r`R = \dfrac{L}{kA}`, r`\dfrac{Q}{t} = \dfrac{\Delta\theta}{R}`]],
        ['b', ['Layers in series: $R = R_1 + R_2 + \\dots$', 'Steady state: **same** rate of heat flow through every layer', 'Unit K W⁻¹']],
      ] },
      { t: 'Lagged & unlagged bars', c: 'purple', col: 'L', body: [
        ['svg', K.plot({ xl: 'x', yl: 'θ', c: [{ f: x => 0.92 - 0.72 * x, col: '#7C3AED', lab: 'lagged', lx: 0.55, ly: 0.66 }, { f: x => 0.2 + 0.72 * (Math.exp(-2.4 * x) - Math.exp(-2.4)) / (1 - Math.exp(-2.4)), col: '#EA580C', lab: 'unlagged', lx: 0.3, ly: 0.1 }], zero: false })],
        ['b', ['Lagged: no heat lost from the sides, uniform gradient (straight line)', 'Unlagged: heat lost from the sides, gradient decreases along the bar']],
      ] },
      { t: 'Composite wall', c: 'orange', col: 'M', body: [
        ['svg', K.fig('12.1', 0, 340)],
        ['f', r`\dfrac{k_1A(\theta_1 - \theta)}{L_1} = \dfrac{k_2A(\theta - \theta_2)}{L_2}`],
        ['p', 'Solve for the interface temperature $\\theta$ first.'],
      ] },
      { t: 'Radiation', c: 'teal', col: 'R', body: [
        ['fs', [r`P = e\sigma AT^4`, r`P_{\text{net}} = e\sigma A(T^4 - T_0^4)`]],
        ['b', ['$\\sigma = 5.67\\times10^{-8}$ W m⁻² K⁻⁴', 'Black body: perfect absorber and emitter, $e = 1$', '$T$ **must** be in kelvin']],
        ['svg', K.fig('12.1', 1, 300)],
      ] },
    ],
    rows: [
      { cols: '1fr 1fr', boxes: [
        { t: 'Stars and planets', c: 'red', body: [
          ['fs', [r`A = 4\pi r^2`, r`I = \dfrac{P}{4\pi d^2}`]],
          ['b', ['Intensity at distance $d$ from a source of power $P$', 'Equilibrium: power absorbed = power emitted']],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Using °C in $T^4$; a temperature **difference** may be in °C or K.', 'Using total length instead of each layer thickness.', 'Different rates in series layers: in steady state they are equal.', 'Saying radiation needs a medium.']],
        ] },
      ] },
    ],
    tips: ['Draw the temperature profile through a composite wall.', 'The layer with the smaller $k$ has the steeper gradient.', 'Use ratios for $P \\propto T^4$: doubling $T$ gives 16 times the power.', 'Quote $k$ with unit W m⁻¹ K⁻¹.'],
  },

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

  'S3-19': {
    hubTitle: 'Oscillations',
    idea: '**Key idea:** in SHM the acceleration is proportional to the displacement and directed towards equilibrium.',
    hubAt: 1,
    boxes: [
      { t: 'Simple harmonic motion', c: 'blue', col: 'L', body: [
        ['svg', K.fig('S3-19.1', 0, 340)],
        ['fs', [r`a = -\omega^2x`, r`F = -kx`]],
        ['b', ['$a$ ∝ $x$, always towards the equilibrium point', '$\\omega = 2\\pi f = \\dfrac{2\\pi}{T}$', '$a$–$x$ graph: straight line, gradient $-\\omega^2$']],
      ] },
      { t: 'Kinematics of SHM', c: 'green', col: 'M', body: [
        ['fs', [r`x = A\sin\omega t`, r`v = \omega A\cos\omega t`]],
        ['f', r`v = \pm\omega\sqrt{A^2 - x^2}`],
        ['fs', [r`v_{\max} = \omega A`, r`a_{\max} = \omega^2A`]],
        ['p', '$x = A\\cos\\omega t$ if timing starts at an extreme.'],
      ] },
      { t: 'Energy in SHM', c: 'pink', col: 'R', body: [
        ['svg', K.fig('S3-19.3', 0, 320)],
        ['f', r`E = \tfrac12 m\omega^2A^2 = \tfrac12 kA^2`],
        ['fs', [r`E_k = \tfrac12 m\omega^2(A^2 - x^2)`, r`E_p = \tfrac12 m\omega^2x^2`]],
        ['p', 'Total energy ∝ (amplitude)²; $E_k = E_p$ at $x = A/\\sqrt2$.'],
      ] },
      { t: 'Systems in SHM', c: 'purple', col: 'L', body: [
        ['sub', ['Mass–spring', ['fs', [r`T = 2\pi\sqrt{\dfrac mk}`, r`\omega = \sqrt{\dfrac km}`]]], '#7C3AED'],
        ['sub', ['Simple pendulum (small θ)', ['f', r`T = 2\pi\sqrt{\dfrac Lg}`], ['p', 'Independent of mass and amplitude; $\\theta \\lesssim 10°$.']], '#0F766E'],
        ['p', 'Springs: parallel $k = k_1 + k_2$; series $\\dfrac1k = \\dfrac1{k_1} + \\dfrac1{k_2}$'],
      ] },
      { t: 'Damped oscillation', c: 'orange', col: 'M', body: [
        ['svg', K.fig('S3-19.5', 0, 330)],
        ['kv', [['Light', 'oscillates, amplitude decays exponentially'], ['Critical', 'back to equilibrium fastest, no oscillation'], ['Heavy', 'slow return, no oscillation']]],
        ['f', r`A = A_0e^{-bt}`],
      ] },
      { t: 'Forced oscillation & resonance', c: 'teal', col: 'R', body: [
        ['svg', K.fig('S3-19.6', 0, 320)],
        ['b', ['Forced: oscillates at the **driving** frequency', 'Resonance: $f_{\\text{driver}} = f_0$, maximum amplitude', 'More damping: lower, broader peak, shifted slightly to lower $f$']],
      ] },
    ],
    rows: [
      { cols: '1fr 1fr', boxes: [
        { t: 'Phase relationships', c: 'red', body: [
          ['svg', K.fig('S3-19.2', 0, 380)],
          ['p', '$v$ leads $x$ by $\\pi/2$; $a$ is in antiphase ($\\pi$) with $x$.'],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Calculator in degrees for $\\sin\\omega t$: use **radians**.', 'Saying the period depends on amplitude (it does not).', 'Pendulum length: to the **centre** of the bob.', 'Doubling $A$ doubles $v_{\\max}$ but **quadruples** $E$.', 'Speed is maximum at $x = 0$, acceleration at $x = \\pm A$.']],
        ] },
      ] },
    ],
    tips: ['Prove SHM by showing $a = -(\\text{constant})x$.', 'Identify $\\omega$ as the coefficient of $t$.', 'Use energy for speed at a given $x$.', 'Sketch $x$, $v$, $a$ graphs one under another, $T/4$ apart.'],
  },

  'S3-20': {
    hubTitle: 'Wave Motion',
    idea: '**Key idea:** a progressive wave carries energy without carrying matter; overlapping waves add.',
    hubAt: 1,
    boxes: [
      { t: 'Progressive waves', c: 'blue', col: 'L', body: [
        ['svg', K.fig('S3-20.1', 0, 340)],
        ['fs', [r`v = f\lambda`, r`y = A\sin(\omega t - kx)`]],
        ['b', ['$k = \\dfrac{2\\pi}{\\lambda}$, $v = \\dfrac{\\omega}{k}$', '$+kx$: travels in the $-x$ direction', 'Transverse: ⟂ to travel; longitudinal: ∥']],
      ] },
      { t: 'Phase difference', c: 'green', col: 'M', body: [
        ['fs', [r`\phi = \dfrac{2\pi}{\lambda}\Delta x`, r`\phi = \dfrac{2\pi}{T}\Delta t`]],
        ['p', 'In phase: $\\Delta x = n\\lambda$. Antiphase: $\\Delta x = (n + \\tfrac12)\\lambda$.'],
      ] },
      { t: 'Intensity', c: 'pink', col: 'R', body: [
        ['svg', K.fig('S3-20.2', 0, 300)],
        ['fs', [r`I = \dfrac{P}{4\pi r^2}`, r`I \propto A^2`]],
        ['p', 'Power per unit area, W m⁻². Point source: $I \\propto 1/r^2$ so $A \\propto 1/r$.'],
      ] },
      { t: 'Superposition', c: 'purple', col: 'L', body: [
        ['svg', K.fig('S3-20.3', 0, 320)],
        ['kv', [['Constructive', 'path difference $n\\lambda$'], ['Destructive', 'path difference $(n + \\tfrac12)\\lambda$']]],
        ['p', '**Coherent:** same frequency, constant phase difference.'],
      ] },
      { t: 'Standing waves', c: 'orange', col: 'M', body: [
        ['f', r`y = 2A\sin kx\,\cos\omega t`],
        ['b', ['Two equal waves travelling in **opposite** directions', 'Node to node $= \\lambda/2$; node to antinode $= \\lambda/4$', 'String fixed both ends: $L = \\dfrac{n\\lambda}2$, $f_n = \\dfrac{nv}{2L}$']],
        ['f', r`v = \sqrt{\dfrac{T}{\mu}}`],
      ] },
      { t: 'Electromagnetic waves', c: 'teal', col: 'R', body: [
        ['svg', K.fig('S3-20.5', 0, 320)],
        ['fs', [r`c = \dfrac{1}{\sqrt{\mu_0\varepsilon_0}}`, r`E_0 = cB_0`]],
        ['p', '$E$ ⟂ $B$ ⟂ direction, in phase. Radio → microwave → IR → visible → UV → X-ray → γ (λ decreasing).'],
      ] },
    ],
    rows: [
      { cols: '1.15fr 1fr', boxes: [
        { t: 'Progressive vs standing', c: 'red', body: [
          ['tbl', [['', 'Progressive', 'Standing'], ['Energy', 'transferred', 'not transferred'], ['Amplitude', 'same everywhere', 'zero at nodes, max at antinodes'], ['Phase', 'changes along the wave', 'same within a loop; antiphase in next loop'], ['Wave profile', 'moves', 'does not move']]],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Node spacing is $\\lambda/2$, not $\\lambda$.', 'Reading $k$ as the wavelength; $\\lambda = 2\\pi/k$.', 'Doubling the distance quarters $I$ but halves $A$.', '$\\mu$ is mass per unit **length** (kg m⁻¹).']],
        ] },
      ] },
    ],
    tips: ['From $y = A\\sin(\\omega t - kx)$ read $A$, $\\omega$ and $k$ first.', 'Draw the harmonics with N and A labelled.', 'Use ratios for the inverse square law.', 'State the sources are coherent before discussing interference.'],
  },

  'S3-21': {
    hubTitle: 'Sound Waves',
    idea: '**Key idea:** sound is a longitudinal pressure wave; air columns and strings resonate at definite frequencies.',
    hubAt: 1,
    boxes: [
      { t: 'Propagation of sound', c: 'blue', col: 'L', body: [
        ['svg', K.fig('S3-21.1', 0, 340)],
        ['fs', [r`v = \sqrt{\dfrac{\gamma RT}{M}}`, r`v = \sqrt{\dfrac{E}{\rho}}`]],
        ['b', ['Longitudinal: compressions and rarefactions', 'Needs a medium; faster in solids', 'Gas: $v \\propto \\sqrt T$, independent of pressure']],
      ] },
      { t: 'Air columns', c: 'green', col: 'M', body: [
        ['svg', K.fig('S3-21.2', 0, 340)],
        ['tbl', [['Pipe', 'Ends', 'Harmonics', '$f_1$'], ['Open', 'A–A', 'all', '$v/2L$'], ['Closed', 'N–A', 'odd only', '$v/4L$']]],
      ] },
      { t: 'Intensity level', c: 'pink', col: 'R', body: [
        ['f', r`\beta = 10\log_{10}\dfrac{I}{I_0}`],
        ['b', ['$I_0 = 1.0\\times10^{-12}$ W m⁻² (threshold of hearing)', '+10 dB = intensity ×10; +3 dB ≈ ×2', '$N$ identical sources: $\\beta + 10\\log_{10}N$', 'Add intensities, **not** decibels']],
      ] },
      { t: 'Beats', c: 'purple', col: 'L', body: [
        ['svg', K.fig('S3-21.4', 0, 320)],
        ['fs', [r`f_{\text{beat}} = |f_1 - f_2|`, r`f = \dfrac{f_1 + f_2}{2}`]],
        ['p', 'Loudness rises and falls as the waves move in and out of phase.'],
      ] },
      { t: 'Doppler effect', c: 'orange', col: 'M', body: [
        ['f', r`f' = f\,\dfrac{v \pm v_o}{v \mp v_s}`],
        ['b', ['Upper signs: **approaching** (frequency rises)', 'Speeds relative to the air', 'Moving reflector: apply twice (observer, then source)']],
      ] },
      { t: 'Strings & end correction', c: 'teal', col: 'R', body: [
        ['f', r`f_n = \dfrac{n}{2L}\sqrt{\dfrac{T}{\mu}}`],
        ['b', ['Node at each fixed end; all harmonics', 'Closed pipe: $L + e = \\dfrac{\\lambda}{4}$', 'Antinode lies slightly **beyond** the open end']],
        ['svg', K.fig('S3-21.3', 0, 280)],
      ] },
    ],
    rows: [
      { cols: '1fr 1fr', boxes: [
        { t: 'Unit check', c: 'navy', body: [
          ['tbl', [['Quantity', 'Formula', 'Unit'], ['Intensity', '$P/4\\pi r^2$', 'W m⁻²'], ['Intensity level', '$10\\log(I/I_0)$', 'dB'], ['Beat frequency', '$|f_1 - f_2|$', 'Hz'], ['Mass per length', '$\\mu$', 'kg m⁻¹']]],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Closed pipe has **odd** harmonics only: 1st, 3rd, 5th…', 'Adding dB values directly.', 'Using °C in $v \\propto \\sqrt T$.', 'Doppler: the wrong sign for approach.', 'Displacement node = pressure **antinode**.']],
        ] },
      ] },
    ],
    tips: ['Sketch the air column with N and A before using a formula.', 'Convert dB to intensity, add, then convert back.', 'Write $f\'$ formula with signs explained in words.', 'Use $v = 4f(L + e)$ for resonance-tube data.'],
  },

  'S3-22': {
    hubTitle: 'Geometrical<br>Optics',
    idea: '**Key idea:** mirrors and lenses form images by reflection and refraction; use the real-is-positive convention.',
    hubAt: 1,
    boxes: [
      { t: 'Sign convention', c: 'blue', col: 'L', body: [
        ['b', ['Real object, real image: **positive**', 'Virtual image: $v$ **negative**', 'Concave mirror, convex lens: $f > 0$', 'Convex mirror, concave lens: $f < 0$', '$m = -\\dfrac vu$: negative = inverted, positive = upright']],
      ] },
      { t: 'Spherical mirrors', c: 'green', col: 'M', body: [
        ['svg', K.fig('S3-22.1', 0, 340)],
        ['fs', [r`\dfrac1u + \dfrac1v = \dfrac1f`, r`f = \dfrac R2`]],
      ] },
      { t: 'Refraction at a curved surface', c: 'pink', col: 'R', body: [
        ['svg', K.fig('S3-22.2', 0, 300)],
        ['f', r`\dfrac{n_1}{u} + \dfrac{n_2}{v} = \dfrac{n_2 - n_1}{R}`],
        ['b', ['$R > 0$ if the centre is on the **outgoing** side', 'Plane surface: apparent depth $= \\dfrac{\\text{real depth}}{n}$']],
      ] },
      { t: 'Image nature', c: 'purple', col: 'L', body: [
        ['tbl', [['Object (converging)', 'Image'], ['$u > 2f$', 'real, inverted, diminished'], ['$u = 2f$', 'real, inverted, same size'], ['$f < u < 2f$', 'real, inverted, magnified'], ['$u < f$', 'virtual, upright, magnified']]],
        ['p', 'Convex mirror / concave lens: always virtual, upright, diminished.'],
      ] },
      { t: 'Thin lenses', c: 'orange', col: 'M', body: [
        ['svg', K.fig('S3-22.3', 0, 340)],
        ['f', r`\dfrac1f = (n - 1)\left(\dfrac1{R_1} + \dfrac1{R_2}\right)`],
        ['fs', [r`\dfrac1u + \dfrac1v = \dfrac1f`, r`P = \dfrac1f`]],
        ['p', 'Biconvex: both $R$ positive. Power in dioptre (D), $f$ in metres.'],
      ] },
      { t: 'Useful results', c: 'teal', col: 'R', body: [
        ['b', ['Lenses in contact: $\\dfrac1f = \\dfrac1{f_1} + \\dfrac1{f_2}$, $P = P_1 + P_2$', 'Same-size real image: $u = v = 2f$', 'Minimum object–image distance: $4f$', 'Mirror: $f$ does not depend on the medium; lens: $f$ does']],
      ] },
    ],
    rows: [
      { cols: '1fr 1fr', boxes: [
        { t: 'Ray-diagram rules', c: 'red', body: [
          ['num', ['Ray parallel to the axis → through (or from) $F$.', 'Ray through the optical centre (lens) or $C$ (mirror) → undeviated / back on itself.', 'Ray through $F$ → emerges parallel to the axis.']],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Dropping the minus sign of a virtual image or a diverging lens.', 'Using $f = R$ instead of $R/2$ for a mirror.', 'Wrong sign of $R$ in the lensmaker\'s or surface equation.', 'Mixing cm and m when finding power in D.']],
        ] },
      ] },
    ],
    tips: ['State the sign convention at the start of the answer.', 'Draw a quick ray diagram to check the answer is sensible.', 'Use $m = -v/u$ and describe the image in three words.', 'Find each image in turn for two-lens systems.'],
  },


  'S3-23': {
    hubTitle: 'Wave Optics',
    idea: '**Key idea:** light shows interference, diffraction and polarisation, so it is a transverse wave.',
    hubAt: 1,
    boxes: [
      { t: "Huygens's principle", c: 'blue', col: 'L', body: [
        ['svg', K.fig('S3-23.1', 0, 320)],
        ['p', 'Every point on a wavefront is a source of secondary wavelets; the new wavefront is their **envelope**.'],
        ['f', r`n = \dfrac{c}{v} = \dfrac{\lambda_0}{\lambda}`],
        ['p', 'On refraction $f$ is unchanged; $v$ and $\\lambda$ change.'],
      ] },
      { t: "Young's double slit", c: 'green', col: 'M', body: [
        ['svg', K.fig('S3-23.2', 0, 320)],
        ['fs', [r`x = \dfrac{\lambda D}{a}`, r`a\sin\theta = n\lambda`]],
        ['b', ['Bright: path difference $n\\lambda$; dark: $(n+\\tfrac12)\\lambda$', 'White light: white centre, coloured fringes (violet nearest)']],
      ] },
      { t: 'Thin films', c: 'pink', col: 'R', body: [
        ['svg', K.fig('S3-23.4', 0, 300)],
        ['b', ['π phase change on reflection at a **denser** medium', 'Film in air (one change): bright $2nt = (m + \\tfrac12)\\lambda$', 'Coating on glass (two changes): dark $2nt = (m + \\tfrac12)\\lambda$', 'Minimum coating: $t = \\dfrac{\\lambda}{4n}$', 'Air wedge: $x = \\dfrac{\\lambda}{2\\theta}$, dark at contact']],
      ] },
      { t: 'Single-slit diffraction', c: 'purple', col: 'L', body: [
        ['svg', K.fig('S3-23.5', 0, 320)],
        ['fs', [r`a\sin\theta = m\lambda`, r`w = \dfrac{2\lambda D}{a}`]],
        ['p', 'Minima ($m = 1, 2, …$). Central maximum twice as wide as the others.'],
      ] },
      { t: 'Diffraction grating', c: 'orange', col: 'M', body: [
        ['svg', K.fig('S3-23.6', 0, 320)],
        ['fs', [r`d\sin\theta = m\lambda`, r`d = \dfrac1N`]],
        ['b', ['Highest order: largest integer below $d/\\lambda$', 'More lines: sharper, brighter maxima', 'Total maxima $= 2m_{\\max} + 1$']],
      ] },
      { t: 'Polarisation', c: 'teal', col: 'R', body: [
        ['svg', K.fig('S3-23.7', 0, 320)],
        ['fs', [r`I = I_0\cos^2\theta`, r`\tan\theta_B = n`]],
        ['b', ['Unpolarised through a polariser: $I_0/2$', 'At $\\theta_B$: reflected and refracted rays at 90°', 'Only **transverse** waves can be polarised']],
      ] },
    ],
    rows: [
      { cols: '1.2fr 1fr', boxes: [
        { t: 'Optical fibres', c: 'red', body: [
          ['row', [[['svg', K.fig('S3-23.8', 0, 300)]], [['fs', [r`\sin\theta_c = \dfrac{n_2}{n_1}`, r`\text{NA} = \sqrt{n_1^2 - n_2^2}`]]]]],
          ['p', 'Total internal reflection: $n_{\\text{core}} > n_{\\text{cladding}}$, angle > $\\theta_c$. Modal dispersion spreads pulses; attenuation $= \\dfrac{10}{L}\\log\\dfrac{P_{\\text{in}}}{P_{\\text{out}}}$ dB per unit length.'],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Mixing $a$ (slit separation or width) with $d$ (grating spacing).', 'Forgetting the extra λ/2 from a reflection at a denser medium.', 'Lines per mm → lines per m before $d = 1/N$.', 'Using Malus\'s law on **unpolarised** light.', 'Single slit: $a\\sin\\theta = m\\lambda$ gives **minima**.']],
        ] },
      ] },
    ],
    tips: ['State "coherent sources" and the path-difference condition.', 'For thin films, count the phase changes first.', 'Check $\\sin\\theta \\le 1$ for the highest grating order.', 'Fringe spacing ∝ λ: red fringes are wider than blue.'],
  },

  'S3-24': {
    hubTitle: 'Quantum<br>Physics',
    idea: '**Key idea:** light comes in photons of energy $hf$, and moving particles behave as waves of wavelength $h/p$.',
    hubAt: 1,
    boxes: [
      { t: 'Photon', c: 'blue', col: 'L', body: [
        ['fs', [r`E = hf = \dfrac{hc}{\lambda}`, r`p = \dfrac{h}{\lambda}`]],
        ['b', ['A quantum (packet) of electromagnetic energy', '1 eV $= 1.60\\times10^{-19}$ J', '$E$ (eV) ≈ 1240 ÷ λ (nm)']],
      ] },
      { t: 'Photoelectric effect', c: 'green', col: 'M', body: [
        ['svg', K.fig('S3-24.1', 0, 320)],
        ['fs', [r`hf = \phi + K_{\max}`, r`eV_s = K_{\max}`]],
        ['p', 'Graph of $K_{\\max}$ against $f$: gradient $h$, $f$-intercept $f_0 = \\phi/h$.'],
      ] },
      { t: 'Wave–particle duality', c: 'pink', col: 'R', body: [
        ['svg', K.fig('S3-24.2', 0, 280)],
        ['f', r`\lambda = \dfrac{h}{p} = \dfrac{h}{\sqrt{2mK}} = \dfrac{h}{\sqrt{2meV}}`],
        ['p', 'Electron diffraction rings show the wave nature of electrons.'],
      ] },
      { t: 'Wave theory fails', c: 'purple', col: 'L', body: [
        ['num', ['There is a **threshold frequency** $f_0$.', '$K_{\\max}$ depends on frequency, **not** intensity.', 'Emission is **instantaneous**.', 'Intensity changes only the number of photoelectrons.']],
      ] },
      { t: 'Atomic structure', c: 'orange', col: 'M', body: [
        ['svg', K.fig('S3-24.3', 0, 320)],
        ['fs', [r`E_n = -\dfrac{13.6}{n^2}\ \text{eV}`, r`hf = E_i - E_f`]],
        ['p', 'Lyman → $n = 1$ (UV); Balmer → $n = 2$ (visible); Paschen → $n = 3$ (IR). Bohr: $mvr = \\dfrac{nh}{2\\pi}$.'],
      ] },
      { t: 'X-rays', c: 'teal', col: 'R', body: [
        ['svg', K.fig('S3-24.4', 0, 300)],
        ['fs', [r`\lambda_{\min} = \dfrac{hc}{eV}`, r`2d\sin\theta = n\lambda`]],
        ['b', ['Continuous spectrum: braking (bremsstrahlung)', 'Sharp lines: characteristic of the target', 'Bragg angle $\\theta$ is measured from the **planes**']],
      ] },
    ],
    rows: [
      { cols: '1fr 1fr', boxes: [
        { t: 'Nanoscience', c: 'red', body: [
          ['b', ['Size 1–100 nm; huge surface-area-to-volume ratio ($3/r$ for a sphere)', 'Quantum confinement: $E_n = \\dfrac{n^2h^2}{8mL^2}$, smaller dot → bluer light', 'STM: tunnelling current depends exponentially on the gap']],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Using eV in $hf = \\phi + K$ while $h$ is in J s.', 'Saying brighter light gives faster photoelectrons.', 'Forgetting energy levels are **negative**.', 'Using the electron mass for a proton in $\\lambda = h/p$.', '$\\lambda_{\\min}$ depends on the voltage, not the target.']],
        ] },
      ] },
    ],
    tips: ['Convert every energy to joules (or every one to eV) before substituting.', 'Draw the transition arrow on the level diagram.', 'For $\\lambda_{\\min}$, all the electron KE becomes one photon.', 'Quote $h = 6.63\\times10^{-34}$ J s.'],
  },

  'S3-25': {
    hubTitle: 'Nuclear<br>Physics',
    idea: '**Key idea:** the mass defect of a nucleus is its binding energy; unstable nuclei decay randomly.',
    hubAt: 1,
    boxes: [
      { t: 'The nucleus', c: 'blue', col: 'L', body: [
        ['f', r`{}^{A}_{Z}\text{X}`],
        ['b', ['$Z$: protons; $A$: nucleons; $N = A - Z$', 'Isotopes: same $Z$, different $A$', '$R = R_0A^{1/3}$, $R_0 \\approx 1.2$ fm', 'Nuclear density the same for all nuclei']],
      ] },
      { t: 'Mass defect & binding energy', c: 'green', col: 'M', body: [
        ['f', r`\Delta m = Zm_p + (A - Z)m_n - m_{\text{nucleus}}`],
        ['fs', [r`B = \Delta m\,c^2`, r`1\ \text{u} = 931.5\ \text{MeV}`]],
        ['p', 'Binding energy: energy needed to separate a nucleus into its nucleons.'],
      ] },
      { t: 'Binding energy per nucleon', c: 'pink', col: 'R', body: [
        ['svg', K.fig('S3-25.1', 0, 340)],
        ['b', ['Peak ≈ 8.8 MeV near ⁵⁶Fe: most stable', 'Light nuclei → **fusion**; heavy nuclei → **fission**']],
      ] },
      { t: 'Radioactive decay', c: 'purple', col: 'L', body: [
        ['tbl', [['Emission', 'Change'], ['α (⁴₂He)', '$A - 4$, $Z - 2$'], ['β⁻', '$A$ same, $Z + 1$'], ['γ', 'no change']]],
        ['b', ['**Spontaneous**: not affected by conditions', '**Random**: cannot predict which nucleus decays next']],
      ] },
      { t: 'Decay law', c: 'orange', col: 'M', body: [
        ['svg', K.fig('S3-25.2', 0, 320)],
        ['fs', [r`N = N_0e^{-\lambda t}`, r`A = \lambda N`]],
        ['fs', [r`t_{1/2} = \dfrac{\ln 2}{\lambda}`, r`N = N_0\left(\tfrac12\right)^{t/t_{1/2}}`]],
        ['p', '$\\ln A$ against $t$: straight line, gradient $-\\lambda$. Activity in Bq.'],
      ] },
      { t: 'Nuclear reactions', c: 'teal', col: 'R', body: [
        ['svg', K.fig('S3-25.3', 0, 320)],
        ['f', r`Q = \left(\textstyle\sum m_{\text{reactants}} - \sum m_{\text{products}}\right)c^2`],
        ['p', 'Conserved: $A$, $Z$ (charge), energy, momentum. $Q > 0$: energy released.'],
      ] },
    ],
    rows: [
      { cols: '1.15fr 1fr', boxes: [
        { t: 'Fission vs fusion', c: 'red', body: [
          ['tbl', [['', 'Fission', 'Fusion'], ['Process', 'heavy nucleus splits (e.g. ²³⁵U + n)', 'light nuclei join (e.g. ²H + ³H)'], ['Needs', 'slow neutron; chain reaction', 'very high temperature'], ['Energy', '≈ 200 MeV per fission', 'more per kg of fuel'], ['Why', 'products have higher B/A', 'products have higher B/A']]],
        ] },
        { t: 'Common Section A traps', c: 'amber', body: [
          ['b', ['Using total binding energy instead of **per nucleon** for stability.', 'Forgetting electron masses when using atomic masses.', 'Taking $t_{1/2} = \\lambda\\ln2$ (it is $\\ln2/\\lambda$).', 'Mixing u, kg and MeV in one line.', 'Time in years with $\\lambda$ in s⁻¹.']],
        ] },
      ] },
    ],
    tips: ['Balance $A$ and $Z$ before finding $Q$.', 'Use 1 u = 931.5 MeV to skip $c^2$.', 'Count half-lives when $t$ is a whole multiple of $t_{1/2}$.', 'Answer "why energy is released" with binding energy per nucleon.'],
  },


});
