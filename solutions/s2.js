/* Full solutions: Semester 2 chapter-note exercises (Teacher Dashboard only).
   k = 1/(4πε₀) = 9.0 × 10^9 N m^2 C^-2, e = 1.60 × 10^-19 C, ε₀ = 8.85 × 10^-12 F m^-1 unless stated. */
(function () {
  const add = window.PhysiQSolutions.add;

  // ---------- Chapter 13: Electrostatics ----------
  add('LESSON-S2-13', [
    [ // Coulomb's law
      ['F = kq_(1)q_(2)/r^(2) = (9.0 × 10^(9))(1.0 × 10^(-6))(2.0 × 10^(-6)) / (0.30)^(2)',
        '= **0.20 N**',
        'The charges are opposite, so the force is attractive: **each force is directed towards the other charge** (Newton’s third law: equal and opposite).'],
      ['q_(1) = +5 μC at x = 0, q_(2) = +2 μC at 4.0 cm, q_(3) = −3 μC at 6.0 cm.',
        'F_(12) = (9.0 × 10^(9))(5 × 10^(-6))(2 × 10^(-6)) / (0.040)^(2) = 56.25 N (repulsive)',
        'F_(13) = (9.0 × 10^(9))(5 × 10^(-6))(3 × 10^(-6)) / (0.060)^(2) = 37.5 N (attractive)',
        'F_(23) = (9.0 × 10^(9))(2 × 10^(-6))(3 × 10^(-6)) / (0.020)^(2) = 135 N (attractive)',
        '(i) On q_(1): q_(2) repels it to the left (56.25 N), q_(3) attracts it to the right (37.5 N)',
        'F = 56.25 − 37.5 = **18.75 N to the left**',
        '(ii) On q_(2): q_(1) repels it to the right (56.25 N), q_(3) attracts it to the right (135 N)',
        'F = 56.25 + 135 = **191.25 N to the right**',
        '(iii) On q_(3): q_(1) and q_(2) both attract it to the left',
        'F = 37.5 + 135 = **172.5 N to the left**'],
      ['Place q_(1) at the origin, q_(2) at (4 m, 0) and q_(3) at (0, −3 m). Distance q_(2) to q_(3) = √(4^(2) + 3^(2)) = 5 m.',
        'F_(12) = (9.0 × 10^(9))(5 × 10^(-6))(2 × 10^(-6)) / 4^(2) = 5.625 × 10^(-3) N, repulsive, in the +x direction',
        'F_(32) = (9.0 × 10^(9))(3 × 10^(-6))(2 × 10^(-6)) / 5^(2) = 2.16 × 10^(-3) N, attractive, towards q_(3), along (−4, −3)/5',
        'F_(x) = 5.625 × 10^(-3) − 2.16 × 10^(-3)(0.8) = 3.897 × 10^(-3) N',
        'F_(y) = −2.16 × 10^(-3)(0.6) = −1.296 × 10^(-3) N',
        'F = √(F_(x)^(2) + F_(y)^(2))',
        '= **4.11 × 10^(-3) N**',
        'tan θ = 1.296/3.897 ⇒ θ = **18.4° below the +x direction**'],
      ['Distance of q_(1) (and of q_(2)) from q_(3): r = √(0.30^(2) + 0.40^(2)) = 0.50 m',
        'Each force: F = (9.0 × 10^(9))(2.5 × 10^(-6))(3 × 10^(-6)) / (0.50)^(2) = 0.27 N (repulsive)',
        'By symmetry the y components cancel; each x component = 0.27 × (0.40/0.50) = 0.216 N',
        'F = 2 × 0.216',
        '= **0.43 N in the +x direction**'],
      ['Put the lower-left charge at the origin; the others are at (0.600, 0), (0, 0.150) and (0.600, 0.150) m. All forces are repulsive. kq^(2) = (9.0 × 10^(9))(10.0 × 10^(-6))^(2) = 0.90 N m^(2).',
        'Lower-right: F = 0.90 / 0.600^(2) = 2.50 N in the −x direction',
        'Upper-left: F = 0.90 / 0.150^(2) = 40.0 N in the −y direction',
        'Upper-right: r^(2) = 0.600^(2) + 0.150^(2) = 0.3825 m^(2), F = 0.90/0.3825 = 2.35 N along (−0.600, −0.150)/0.6185',
        '   components: (−2.28, −0.571) N',
        'ΣF_(x) = −2.50 − 2.28 = −4.78 N; ΣF_(y) = −40.0 − 0.571 = −40.57 N',
        'F = √(4.78^(2) + 40.57^(2))',
        '= **40.9 N**',
        'tan φ = 40.57/4.78 ⇒ φ = 83.3° below the −x direction, i.e. **263° anticlockwise from +x** (almost straight down)']
    ],
    [ // electric field
      ['E = kQ/r^(2) for each charge; compare the charges in pairs on each line through P.',
        'The two +5.0q charges are both at distance d from P on opposite sides: their fields are equal and opposite, so they cancel.',
        'On the other line: +3.0q at distance d gives E = k(3.0q)/d^(2) = 3kq/d^(2), pointing away from it.',
        '−12q at distance 2d gives E = k(12q)/(2d)^(2) = 3kq/d^(2), pointing towards it, i.e. in the opposite direction.',
        'These also cancel, so E at P = **zero**.'],
      ['Distance from each corner to the centre: r = a/√2 = 0.050/√2 = 0.0354 m',
        'For charge q: E_(0) = kq/r^(2) = (9.0 × 10^(9))(1.0 × 10^(-8)) / (0.0354)^(2) = 7.2 × 10^(4) N C^(-1)',
        'Fields at the centre (away from + charges, towards − charges):',
        '+q (top left): E_(0) towards the bottom right',
        '−2q (top right): 2E_(0) towards the top right',
        '−q (bottom left): E_(0) towards the bottom left',
        '+2q (bottom right): 2E_(0) towards the top left',
        'Horizontal components: (E_(0) + 2E_(0) − E_(0) − 2E_(0))/√2 = 0',
        'Vertical components: (−E_(0) + 2E_(0) − E_(0) + 2E_(0))/√2 = 2E_(0)/√2 = √2E_(0)',
        'E = √2 × 7.2 × 10^(4)',
        '= **1.02 × 10^(5) N C^(-1), upwards**']
    ],
    [ // electric potential
      ['E = V/d = 100 / (5.0 × 10^(-3))',
        '= **2.0 × 10^(4) V m^(-1)**',
        'F = eE = (1.60 × 10^(-19))(2.0 × 10^(4))',
        '= **3.2 × 10^(-15) N, towards the positive plate** (the electron is negative)'],
      ['The work done equals the electric potential energy of the pair: W = U = ke^(2)/r',
        'W = (9.0 × 10^(9))(1.60 × 10^(-19))^(2) / (1.0 × 10^(-14))',
        '= **2.3 × 10^(-14) J**'],
      ['Work done moving charge q from A to B: W = qΔV = q(V_(B) − V_(A)).',
        'All points on an equipotential surface have the same potential, so ΔV = 0 and **W = 0**.',
        'If E had a component along the surface, a force qE would act along the surface and work would be done when the charge moves along it, which contradicts W = 0.',
        'So **E has no component along the surface: field lines cross equipotentials at right angles**.']
    ]
  ]);

  // ---------- Chapter 14: Capacitors ----------
  add('LESSON-S2-14', [
    [ // parallel plate capacitors
      ['A = 4.0 cm^(2) = 4.0 × 10^(-4) m^(2), d = 8.0 × 10^(-3) m, V = 2.0 × 10^(3) V',
        '(a) C = ε_(0)A/d = (8.85 × 10^(-12))(4.0 × 10^(-4)) / (8.0 × 10^(-3))',
        '= **4.4 × 10^(-13) F** (0.44 pF)',
        '(b) Q = CV = (4.43 × 10^(-13))(2.0 × 10^(3))',
        '= **8.9 × 10^(-10) C**',
        '(c) E = V/d = 2.0 × 10^(3) / (8.0 × 10^(-3))',
        '= **2.5 × 10^(5) V m^(-1)**'],
      ['(a) C = ε_(0)A/d: doubling d makes **C halve**.',
        '(b) The capacitor is isolated, so no charge can flow on or off: **Q is unchanged**.',
        '(c) V = Q/C: Q is constant and C halves, so **V doubles**.']
    ],
    [ // combinations
      ['C_(1) and C_(2) are in parallel (between a and d); this combination is in series with C_(3) (between d and b).',
        'C_(12) = 2.00 + 4.00 = 6.00 μF',
        'C_(eq) = C_(12)C_(3)/(C_(12) + C_(3)) = (6.00)(9.00)/15.0 = 3.60 μF',
        'Total charge Q = C_(eq)V_(ab) = 3.60 × 61.5 = 221 μC (this is the charge on C_(3) and on the C_(12) combination)',
        '(b) V_(3) = Q/C_(3) = 221.4 / 9.00 = **24.6 V**',
        'V_(1) = V_(2) = Q/C_(12) = 221.4 / 6.00 = **36.9 V**',
        '(a) Q_(1) = C_(1)V_(1) = 2.00 × 36.9 = **73.8 μC**',
        'Q_(2) = C_(2)V_(2) = 4.00 × 36.9 = **148 μC**',
        'Q_(3) = **221 μC**',
        '(c) V_(ad) = V_(1) = **36.9 V**'],
      ['15.0 μF and 3.00 μF are in series; that branch is in parallel with 6.00 μF; the combination is in series with 20.0 μF.',
        '(a) Series pair: (15.0)(3.00)/(15.0 + 3.00) = 2.50 μF',
        'Parallel with 6.00 μF: 2.50 + 6.00 = 8.50 μF',
        'In series with 20.0 μF: C_(ab) = (8.50)(20.0)/(8.50 + 20.0)',
        '= **5.96 μF**',
        '(b) Q = C_(ab)V_(ab) = 5.965 × 15.0 = 89.5 μC',
        'Charge on 20.0 μF = **89.5 μC**',
        'P.d. across the parallel part = 89.5 / 8.50 = 10.53 V',
        'Charge on 6.00 μF = 6.00 × 10.53 = **63.2 μC**',
        'Charge on 15.0 μF and on 3.00 μF (series, same charge) = 2.50 × 10.53 = **26.3 μC**'],
      ['(a) 3.00 μF and 4.00 μF in series: (3.00)(4.00)/7.00 = 1.714 μF',
        'In parallel with 2.00 μF: C_(eq) = 1.714 + 2.00',
        '= **3.71 μF**',
        '(b) The 2.00 μF capacitor is directly across the supply: V = **26.0 V**',
        'Series branch: Q = 1.714 × 26.0 = 44.6 μC',
        'V_(3) = 44.6 / 3.00 = **14.9 V**; V_(4) = 44.6 / 4.00 = **11.1 V** (check: 14.9 + 11.1 = 26.0 V)']
    ],
    [ // energy
      ['(a) Series: C_(eq) = C_(1)C_(2)/(C_(1) + C_(2)) = (3.00)(6.00)/9.00',
        '= **2.00 μF**',
        '(b) Q = C_(eq)V = 2.00 × 4.00',
        '= **8.00 μC** on each capacitor (series)',
        '(c) V_(1) = Q/C_(1) = 8.00 / 3.00 = **2.67 V**; V_(2) = 8.00 / 6.00 = **1.33 V**',
        '(d) U = ½QV: U_(1) = ½(8.00 × 10^(-6))(2.67) = **1.07 × 10^(-5) J**',
        'U_(2) = ½(8.00 × 10^(-6))(1.33) = **5.33 × 10^(-6) J**',
        '(e) C_(1) = ε_(0)A/d ⇒ A = C_(1)d/ε_(0) = (3.00 × 10^(-6))(0.010 × 10^(-3)) / (8.85 × 10^(-12))',
        '= **3.39 m^(2)**']
    ],
    [ // RC circuits
      ['C = 1000 μF = 1.0 × 10^(-3) F, R = 10 kΩ = 1.0 × 10^(4) Ω, V_(0) = 12 V',
        '(a) τ = RC = (1.0 × 10^(4))(1.0 × 10^(-3))',
        '= **10 s**',
        '(b) I_(0) = V_(0)/R = 12 / (1.0 × 10^(4))',
        '= 1.2 × 10^(-3) A = **1.2 mA**',
        '(c) V = V_(0)e^(-t/τ) = 12e^(-5.0/10) = 12e^(-0.5)',
        '= **7.3 V**',
        '(d) Q = Q_(0)e^(-t/τ) = ½Q_(0) ⇒ e^(-t/τ) = ½ ⇒ t = τ ln 2 = 10 × 0.693',
        '= **6.9 s**'],
      ['Charging current: I = I_(0)e^(-t/RC), with I_(0) = V_(0)/R.',
        '(a) With R: the curve **starts at I_(0) = V_(0)/R** and decays exponentially with time constant τ = RC.',
        '(b) With 2R: the curve **starts at I_(0)/2** and decays **more slowly** (τ = 2RC), so it lies above curve (a) at later times.',
        'The area under an I–t graph is the charge. Both end with the same charge Q_(0) = CV_(0), so **the areas under the two graphs are equal**.']
    ]
  ]);

  // ---------- Chapter 15: Electric Current ----------
  add('LESSON-S2-15', [
    [
      ['I = nAev, so for the same current and the same material (same n): v ∝ 1/A',
        'A = πd^(2)/4 ∝ d^(2), and d_(A) = 2d_(B) ⇒ A_(A) = 4A_(B)',
        'v_(A)/v_(B) = A_(B)/A_(A) = 1/4',
        'v_(A) : v_(B) = **1 : 4**'],
      ['Conductivity σ = ne^(2)t/m, where n is the number of charge carriers per unit volume and t the mean time between collisions; ρ = 1/σ.',
        '**Metal:** n is already very large and does not change with temperature. When heated, the lattice ions vibrate with larger amplitude, so electrons collide more often and t decreases. σ falls, so **ρ (and R) increases**.',
        '**Semiconductor:** heating gives more electrons enough energy to break free, so n increases greatly. This increase is much larger than the small decrease in t, so σ rises and **ρ (and R) decreases**.'],
      ['A = 2.0 mm^(2) = 2.0 × 10^(-6) m^(2)',
        'Current density J = I/A = 4.0 / (2.0 × 10^(-6)) = 2.0 × 10^(6) A m^(-2)',
        'J = σE = E/ρ ⇒ E = ρJ = (2.8 × 10^(-8))(2.0 × 10^(6))',
        '= **0.056 V m^(-1)**']
    ]
  ]);

  // ---------- Chapter 16: Direct Current Circuits ----------
  add('LESSON-S2-16', [
    [
      ['ε = 12 V, r = 0.50 Ω, R = 5.5 Ω',
        '(a) I = ε/(R + r) = 12 / (5.5 + 0.50)',
        '= **2.0 A**',
        '(b) V = IR = 2.0 × 5.5 (= ε − Ir = 12 − 1.0)',
        '= **11 V**',
        '(c) P = I^(2)r = (2.0)^(2)(0.50)',
        '= **2.0 W**'],
      ['A cell of e.m.f. ε and internal resistance r has terminal p.d. V = ε − Ir when a current I flows.',
        'A voltmeter must draw a small current to work, so it reads ε − Ir, which is **slightly less than ε**.',
        'At the balance point of a potentiometer, the galvanometer shows no deflection: **no current flows through the cell**, so there is no p.d. across r and the balance length measures **ε itself**.'],
      ['R_(g) = 20 Ω, I_(g) = 5.0 mA = 5.0 × 10^(-3) A',
        '(a) Ammeter: a small shunt S **in parallel** with the galvanometer carries the rest of the current.',
        'I_(g)R_(g) = (I − I_(g))S ⇒ S = (5.0 × 10^(-3))(20) / (5.0 − 0.0050)',
        'S = **0.020 Ω, connected in parallel**',
        '(b) Voltmeter: a large resistance R **in series** with the galvanometer.',
        'V = I_(g)(R_(g) + R) ⇒ R = 15 / (5.0 × 10^(-3)) − 20 = 3000 − 20',
        'R = **2980 Ω, connected in series**']
    ]
  ]);
  // ---------- Chapter 17: Magnetic Fields ----------
  add('LESSON-S2-17', [
    [ // force on a moving charge
      ['The magnetic force provides the centripetal force: evB = mv^(2)/r',
        'r = mv/(eB) = (9.11 × 10^(-31))(4.0 × 10^(6)) / [(1.60 × 10^(-19))(0.50 × 10^(-3))]',
        '= 4.6 × 10^(-2) m = **4.6 cm**'],
      ['The magnetic force F = qvB sin θ is always **perpendicular to the velocity**.',
        'So it has no component along the direction of motion and does **no work** (W = Fs cos 90° = 0).',
        'By the work–energy theorem the kinetic energy does not change: the force changes the **direction** of motion but **not the speed**.'],
      ['qvB = mv^(2)/r ⇒ r = mv/(qB), so with the same v and B, r ∝ m/q',
        'Proton: m/q = m/e; alpha particle: m/q = 4m/2e = 2(m/e)',
        'r_(α) : r_(p) = 2 : 1',
        '= **2 : 1**']
    ],
    [ // fields due to currents
      ['B = μ_(0)I/(2πr) for a long straight wire.',
        'Nearer wire (r = 0.10 m): B_(1) = (4π × 10^(-7))(20) / (2π × 0.10) = 4.0 × 10^(-5) T',
        'Farther wire (r = 0.20 m): B_(2) = (4π × 10^(-7))(20) / (2π × 0.20) = 2.0 × 10^(-5) T',
        '(a) Same direction: between the wires the two fields are in opposite directions.',
        'B = 4.0 × 10^(-5) − 2.0 × 10^(-5) = **2.0 × 10^(-5) T**, in the direction of the nearer wire’s field',
        '(b) Opposite directions: between the wires the two fields are in the same direction.',
        'B = 4.0 × 10^(-5) + 2.0 × 10^(-5) = **6.0 × 10^(-5) T**',
        'In both cases the field is **perpendicular to the plane of the wires**.'],
      ['B = μ_(0)I/(2πr) ⇒ r = μ_(0)I/(2πB)',
        'r = (4π × 10^(-7))(12) / (2π × 3.0 × 10^(-5))',
        '= 0.080 m = **8.0 cm**']
    ],
    [ // crossed fields and the Hall effect
      ['Hall voltage V_(H) = BI/(nte), so V_(H) ∝ 1/n.',
        'A metal has a very large number of free electrons per unit volume, so V_(H) is **too small to measure**.',
        'A semiconductor has far fewer charge carriers, so **V_(H) is much larger** and easy to measure.'],
      ['Undeflected: electric force = magnetic force, eE = evB',
        'E = vB = (3.0 × 10^(7))(2.0 × 10^(-3))',
        '= **6.0 × 10^(4) V m^(-1)**'],
      ['With both fields adjusted so the beam is undeflected: eE = evB ⇒ v = E/B',
        'With the magnetic field only, the beam moves in a circle of radius r: evB = mv^(2)/r ⇒ e/m = v/(Br)',
        'Substitute v = E/B:',
        '**e/m = E/(B^(2)r)**']
    ]
  ]);

  // ---------- Chapter 18: Electromagnetic Induction ----------
  add('LESSON-S2-18', [
    [ // Faraday's and Lenz's laws
      ['Plane perpendicular to B: Φ_(1) = BA; plane parallel to B: Φ_(2) = 0. A = 4.0 cm^(2) = 4.0 × 10^(-4) m^(2)',
        'ΔΦ = BA − 0 = (0.30)(4.0 × 10^(-4)) = 1.2 × 10^(-4) Wb',
        '|ε| = NΔΦ/Δt = (200)(1.2 × 10^(-4)) / 0.050',
        '= **0.48 V**'],
      ['Suppose the induced current **helped** the change (e.g. attracted an approaching magnet). The magnet would speed up by itself, and more and more electrical energy would appear without any work being done. This would **break the principle of conservation of energy**.',
        'Because the induced current **opposes** the change, an external agent must do work against it, and **that work is converted into the electrical energy** of the induced current. This is Lenz’s law.'],
      ['The wings cut the vertical component of the Earth’s field: ε = Blv',
        'ε = (4.0 × 10^(-5))(40)(250)',
        '= **0.40 V**']
    ],
    [ // inductance
      ['N = 1000, l = 0.25 m, A = 4.0 × 10^(-4) m^(2)',
        '(a) L = μ_(0)N^(2)A/l = (4π × 10^(-7))(1000)^(2)(4.0 × 10^(-4)) / 0.25',
        '= **2.0 × 10^(-3) H**',
        '(b) U = ½LI^(2) = ½(2.01 × 10^(-3))(3.0)^(2)',
        '= **9.0 × 10^(-3) J**'],
      ['|ε| = M(ΔI/Δt) = (0.15)(4.0 − 0) / 0.020',
        '= **30 V**'],
      ['**Self induction:** the e.m.f. is induced **in the same coil** whose current is changing, and it opposes the change of that current (only one coil is needed).',
        '**Mutual induction:** the e.m.f. is induced **in a second coil** by a changing current in the first coil; it needs **two coils linked by magnetic flux**.']
    ]
  ]);

  // ---------- Chapter 19: Alternating Current Circuits ----------
  add('LESSON-S2-19', [
    [ // single elements
      ['X_(C) = 1/(2πfC) ⇒ f = 1/(2πX_(C)C)',
        'f = 1 / [2π(400)(2.0 × 10^(-6))]',
        '= **199 Hz**'],
      ['X_(L) = 2πfL, so doubling f **doubles X_(L)**.',
        'I_(rms) = V_(rms)/X_(L), with V_(rms) unchanged',
        'The r.m.s. current is **halved**.'],
      ['In a pure capacitor the current leads the voltage by 90°, so P = IV changes sign every quarter-cycle.',
        'In one quarter-cycle the capacitor **charges and stores energy** taken from the supply; in the next quarter-cycle it **discharges and returns the same energy** to the supply.',
        'Over a whole cycle the net energy taken is zero, so the **average power is zero** (P = I_(rms)V_(rms) cos 90° = 0).']
    ],
    [ // series circuits
      ['X_(L) = 2πfL = 2π(50)(0.10) = 31.4 Ω',
        'Z = √(R^(2) + X_(L)^(2)) = √(40^(2) + 31.4^(2)) = 50.9 Ω',
        'I = V/Z = 100 / 50.9',
        '= **1.97 A**',
        'tan φ = X_(L)/R = 31.4/40',
        'φ = **38.1°, with the voltage leading the current**'],
      ['At resonance X_(L) = X_(C): 2πf_(0)L = 1/(2πf_(0)C)',
        'C = 1/(4π^(2)f_(0)^(2)L) = 1 / [4π^(2)(1.0 × 10^(3))^(2)(25 × 10^(-3))]',
        '= **1.0 × 10^(-6) F (1.0 μF)**'],
      ['Draw the current phasor I as the reference (horizontal), because I is the same through R, L and C in series.',
        'V_(R) is in phase with I; V_(L) leads I by 90° (up); V_(C) lags I by 90° (down).',
        'Below the resonance frequency X_(C) > X_(L), so **V_(C) is longer than V_(L)**. The net reactive p.d. (V_(C) − V_(L)) points down.',
        'The resultant V = √[V_(R)^(2) + (V_(C) − V_(L))^(2)] lies **below the current phasor**.',
        'So **the current leads the voltage**: the circuit behaves as a capacitive circuit.']
    ]
  ]);
})();
