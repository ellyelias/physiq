/* Full solutions: Semester 3 chapter-note exercises (Teacher Dashboard only).
   h = 6.63 × 10^-34 J s, c = 3.00 × 10^8 m s^-1, e = 1.60 × 10^-19 C unless stated. */
(function () {
  const add = window.PhysiQSolutions.add;

  // ---------- Chapter 20: Oscillations ----------
  add('LESSON-S3-20', [
    [ // kinematics and energy of SHM
      ['y = A sin ωt with A = 10 m and T = 30 s, so ω = 2π/T = 2π/30 = 0.2094 rad s^(-1)',
        '(a) A = **10 m**',
        '(b) v_(max) = Aω = 10 × 0.2094',
        '= **2.1 m s^(-1)**',
        '(c) a_(max) = Aω^(2) = 10 × (0.2094)^(2)',
        '= **0.44 m s^(-2)**',
        '(d) At t = 15 s (= T/2), ωt = π:',
        'y = 10 sin π = **0**',
        'v = Aω cos ωt = 2.09 cos π = **−2.1 m s^(-1)**',
        'a = −ω^(2)y = **0**'],
      ['A = 2 cm = 0.02 m, f = 20 Hz, ω = 2πf = 125.7 rad s^(-1)',
        '(a) T = 1/f = 1/20',
        '= **0.05 s**',
        '(b) a = −ω^(2)x. Middle (x = 0): a = **0**',
        'End (x = A): |a| = ω^(2)A = (125.7)^(2)(0.02) = **316 m s^(-2)**',
        '(c) v = ω√(A^(2) − x^(2)). Middle (x = 0): v = ωA = 125.7 × 0.02 = **2.5 m s^(-1)**',
        'End (x = A): v = **0**'],
      ['m = 0.25 kg, k = 180 N m^(-1), A = 0.15 m',
        '(a) E = ½kA^(2) = ½(180)(0.15)^(2)',
        '= **2.0 J** (2.03 J)',
        '(b) Energy is conserved: ½mv^(2) + ½kx^(2) = ½kA^(2) ⇒ v = √[(k/m)(A^(2) − x^(2))]',
        'v = √[(180/0.25)(0.15^(2) − 0.10^(2))] = √(720 × 0.0125)',
        '= **3.0 m s^(-1)**'],
      ['m = 0.050 kg, A = 0.12 m, T = 1.70 s',
        '(a) f = 1/T = 1/1.70',
        '= **0.588 Hz**',
        '(b) ω = 2πf = 3.696 rad s^(-1); ω^(2) = k/m ⇒ k = mω^(2) = 0.050 × (3.696)^(2)',
        '= **0.68 N m^(-1)**',
        '(c) v_(max) = ωA = 3.696 × 0.12',
        '= **0.44 m s^(-1)**',
        '(d) a_(max) = ω^(2)A = (3.696)^(2)(0.12)',
        '= **1.6 m s^(-2)**',
        '(e) v = ω√(A^(2) − x^(2)) = 3.696√(0.12^(2) − 0.060^(2))',
        '= **0.38 m s^(-1)**',
        '(f) a = −ω^(2)x = −(3.696)^(2)(0.060)',
        '= **−0.82 m s^(-2)**'],
      ['For SHM, a = −ω^(2)x: the acceleration is largest where the displacement is largest (A and C) and zero at the equilibrium position (B). The speed is largest at B and zero at the turning points A and C.',
        '(a) Acceleration maximum: **A and C**',
        '(b) Acceleration zero: **B**',
        '(c) Speed maximum: **B**',
        '(d) Velocity zero: **A and C**',
        '(e) Kinetic energy maximum: **B**',
        '(f) Potential energy maximum: **A and C**']
    ]
  ]);

  // ---------- Chapter 21: Wave Motion ----------
  add('LESSON-S3-21', [
    [
      ['Compare with y = A sin(ωt + kx): ω = 30 rad s^(-1), k = 4 m^(-1)',
        'λ = 2π/k = 2π/4',
        '= **1.57 m**',
        'f = ω/2π = 30/2π',
        '= **4.77 Hz**',
        'v = ω/k = 30/4',
        '= **7.5 m s^(-1)**',
        'The + sign between ωt and kx means the wave travels **in the −x direction**.'],
      ['Phase difference φ = (2π/λ)Δx = (2π/1.2)(0.30)',
        '= **π/2 rad** (90°)'],
      ['Point source: I ∝ 1/r^(2)',
        'I_(2) = I_(1)(r_(1)/r_(2))^(2) = 0.80 × (2.0/8.0)^(2)',
        '= **0.050 W m^(-2)**'],
      ['Adjacent nodes are λ/2 apart: λ/2 = 0.25 m ⇒ λ = **0.50 m**',
        'f = v/λ = 100 / 0.50',
        '= **200 Hz**'],
      ['Any two of:',
        '• An EM wave **can travel through a vacuum**; a sound wave **needs a medium**.',
        '• An EM wave is **transverse**; a sound wave is **longitudinal**.',
        '• An EM wave travels at **3.00 × 10^(8) m s^(-1)** in a vacuum, much faster than sound (about 340 m s^(-1) in air).',
        '• An EM wave consists of oscillating electric and magnetic fields; a sound wave consists of oscillating particles of the medium (compressions and rarefactions).']
    ]
  ]);

  // ---------- Chapter 22: Sound Waves ----------
  add('LESSON-S3-22', [
    [ // strings and pipes
      ['Adjacent antinodes are λ/2 apart, so from the 1st to the 4th antinode is 3(λ/2).',
        '3(λ/2) = 0.15 m ⇒ λ = 0.10 m',
        'v = fλ = 50 × 0.10',
        '= **5 m s^(-1)**'],
      ['Five loops: each loop is λ/2, so 5(λ/2) = 2.0 m',
        '(a) λ = 2(2.0)/5',
        '= **0.8 m**',
        '(b) v = fλ = 85.0 × 0.8',
        '= **68 m s^(-1)**',
        '(c) Fundamental (one loop): λ_(1) = 2L = 4.0 m, f_(1) = v/λ_(1) = 68/4.0',
        '= **17 Hz** (or f_(1) = 85.0/5)']
    ],
    [ // Doppler effect and beats
      ['v = 340 m s^(-1), u_(s) = 20 m s^(-1), f_(s) = 100 Hz. S moves away from O and towards the wall T.',
        '(a) In front of the source (towards T), the waves are squashed: λ = (v − u_(s))/f_(s) = (340 − 20)/100',
        '= **3.2 m**',
        'Behind the source (towards O), the waves are stretched: λ = (v + u_(s))/f_(s) = (340 + 20)/100',
        '= **3.6 m**',
        '(b) Directly from S (source moving away from O): f = f_(s)v/(v + u_(s)) = 100 × 340/360',
        '= **94 Hz** (94.4 Hz)',
        '(c) The wall receives sound from a source approaching it: f_(T) = f_(s)v/(v − u_(s)) = 100 × 340/320 = 106 Hz; the stationary wall reflects this frequency to the stationary O.',
        'f = **106 Hz** (106.25 Hz)',
        '(d) Beat frequency = |f_(1) − f_(2)| = 106.25 − 94.44',
        '= **12 Hz**']
    ]
  ]);
  // ---------- Chapter 23: Geometrical Optics ----------
  // Sign convention (as in the notes): real is positive. u > 0 for a real object, v > 0 for a real image,
  // v < 0 for a virtual image; f > 0 for a concave mirror / converging lens, f < 0 for a convex mirror / diverging lens.
  add('LESSON-S3-23', [
    [ // spherical mirrors
      ['f = +10 cm; 1/u + 1/v = 1/f and m = −v/u. Image twice the height of the object: |m| = 2.',
        'Real, inverted image (m = −2 ⇒ v = 2u): 1/u + 1/2u = 1/10 ⇒ 3/(2u) = 1/10',
        'u = **15 cm** (real, inverted image at v = 30 cm)',
        'Virtual, upright image (m = +2 ⇒ v = −2u): 1/u − 1/2u = 1/10 ⇒ 1/(2u) = 1/10',
        'u = **5.0 cm** (virtual, upright image at v = −10 cm)'],
      ['Convex mirror: f = −r/2 = −20 cm. A convex mirror always gives a virtual, upright image, so m = +½ ⇒ v = −u/2.',
        '1/u + 1/v = 1/f ⇒ 1/u − 2/u = −1/20 ⇒ −1/u = −1/20',
        'u = **20 cm** (object 20 cm in front)',
        'v = −20/2 = **−10 cm** (image 10 cm behind the mirror)'],
      ['u = 5.0 cm, f = +10.0 cm',
        '1/v = 1/f − 1/u = 1/10.0 − 1/5.0 = −1/10.0',
        'v = **−10 cm** (10 cm behind the mirror)',
        'm = −v/u = −(−10)/5.0 = **+2**',
        'The image is **virtual, upright and twice the height** of the object.'],
      ['Upright and diminished ⇒ m = +1/5, so v = −u/5 = −15/5 = −3.0 cm (virtual)',
        '1/f = 1/u + 1/v = 1/15 − 1/3.0 = −4/15',
        'f = −3.75 cm (negative ⇒ convex)',
        'r = 2f = −7.5 cm: a **convex mirror of radius of curvature 7.5 cm**'],
      ['The image is on a wall (real): u = 10 cm, v = 300 cm',
        '(a) 1/f = 1/10 + 1/300 = 31/300 ⇒ f = 9.68 cm',
        'r = 2f = **19.4 cm**',
        '(b) m = −v/u = −300/10 = −30',
        'Image height = 30 × 5 mm = 150 mm = **15 cm (inverted)**'],
      ['u = 15 cm, f = +20 cm (the object is inside the focal length)',
        '1/v = 1/20 − 1/15 = −1/60 ⇒ v = **−60 cm** (60 cm behind the mirror)',
        'm = −v/u = 60/15 = **+4**',
        'Image height = 4 × 6 cm = **24 cm**',
        'Nature: **virtual, upright, magnified**'],
      ['The image is on a card, so it is real: v = +540 mm, m = −v/u = −0.333',
        'u = v/0.333 = 540/0.333 = 1622 mm = **1.62 m**',
        '1/f = 1/u + 1/v = 1/1622 + 1/540',
        'f = **+405 mm (concave mirror)**']
    ],
    [ // refraction at spherical surfaces
      ['Refraction at a spherical surface: n_(1)/u + n_(2)/v = (n_(2) − n_(1))/r (r > 0 when the centre of curvature is on the outgoing side).',
        '(a) First surface: the object is 25.0 − 5.0 = 20.0 cm from it; n_(1) = 1, n_(2) = 1.50, r = +5.0 cm',
        '1/20.0 + 1.50/v_(1) = (1.50 − 1)/5.0 = 0.100',
        '1.50/v_(1) = 0.100 − 0.050 = 0.050 ⇒ v_(1) = **+30.0 cm** (inside the glass direction, 20.0 cm beyond the sphere)',
        '(b) Second surface: the sphere is 10.0 cm across, so the first image lies 30.0 − 10.0 = 20.0 cm beyond the back surface. It acts as a virtual object: u_(2) = −20.0 cm; n_(1) = 1.50, n_(2) = 1, r = −5.0 cm',
        '1.50/(−20.0) + 1/v_(2) = (1 − 1.50)/(−5.0) = 0.100',
        '1/v_(2) = 0.100 + 0.075 = 0.175 ⇒ v_(2) = **+5.71 cm**',
        'A **real image 5.71 cm from the back surface** of the sphere.']
    ],
    [ // thin lens formula
      ['u = 30 cm, f = +12 cm',
        '1/v = 1/12 − 1/30 = 1/20 ⇒ v = **+20 cm** (on the other side of the lens)',
        'm = −v/u = −20/30 = −0.667',
        'h′ = −0.667 × 8 = **−5.33 cm**',
        'The image is **real, inverted and 5.33 cm high**.'],
      ['u = 2.50 m, f = 0.0500 m',
        '1/v = 1/0.0500 − 1/2.50 = 20.0 − 0.40 = 19.6 ⇒ v = **0.0510 m**',
        'm = −v/u = −0.0510/2.50 = **−0.0204**',
        'h′ = 0.0204 × 1.70 = **0.0347 m**',
        'The image is **real, inverted and diminished**.'],
      ['Diverging lens, f = −12 cm. For a lens, m = −v/u = f/(f − u) (from v = uf/(u − f)).',
        'At u = 18 cm: m = −12/(−12 − 18) = 0.40',
        'Half the size: m = 0.20 ⇒ −12/(−12 − u) = 0.20 ⇒ −12 − u = −60',
        'u = **48 cm** in front of the lens'],
      ['f = 50.0 mm. m = −v/u ⇒ v = −mu',
        'Real image, m = −3.00 (inverted): v = 3u ⇒ 1/u + 1/(3u) = 1/50.0 ⇒ 4/(3u) = 1/50.0',
        'u = **66.7 mm**',
        'Virtual image, m = +3.00 (upright): v = −3u ⇒ 1/u − 1/(3u) = 1/50.0 ⇒ 2/(3u) = 1/50.0',
        'u = **33.3 mm**'],
      ['The image is on the other side of the lens, so it is real: u = 22.5 cm, v = +33.0 cm',
        '1/f = 1/22.5 + 1/33.0 ⇒ f = **+13.4 cm**',
        'f is positive, so the lens is **converging**, and the image is **real**.'],
      ['u = 2.20 m = 2200 mm, h = 2.70 cm = 27.0 mm',
        '(a) f = +135 mm: 1/v = 1/135 − 1/2200 ⇒ v = **+144 mm** (behind the lens)',
        'm = −v/u = −144/2200 = −0.0654; h′ = 0.0654 × 27.0 = **1.77 mm**',
        'The image is **real and inverted**.',
        '(b) f = −135 mm: 1/v = −1/135 − 1/2200 ⇒ v = **−127 mm** (127 mm in front of the lens)',
        'm = −v/u = 127/2200 = +0.0578; h′ = 0.0578 × 27.0 = **1.56 mm**',
        'The image is **virtual and upright**.']
    ],
    [ // power and lenses in contact
      ['P = 1/f (f in metres) = 1/0.125',
        '= **+8.0 D**'],
      ['P is negative, so the lens is **diverging**.',
        'f = 1/P = 1/(−4.0) = −0.25 m = **−25 cm**'],
      ['Lenses in contact: P = P_(1) + P_(2) = +6.0 + (−2.0)',
        '= **+4.0 D**',
        'f = 1/P = 1/4.0 = 0.25 m = **+25 cm**'],
      ['1/f = 1/f_(1) + 1/f_(2) = 1/20.0 + 1/30.0 = 5/60',
        'f = **+12.0 cm**',
        'P = 1/0.120 = **+8.33 D**'],
      ['Lensmaker’s equation: 1/f = (n − 1)(1/r_(1) − 1/r_(2))',
        '1/f = (1.50 − 1)(1/15.0 − 1/(−15.0)) = 0.50 × (2/15.0)',
        'f = **+15.0 cm**',
        'P = 1/0.150 = **+6.67 D**']
    ],
    [ // two lenses
      ['Lens 1: u_(1) = 4.0 cm, f = 8.0 cm: 1/v_(1) = 1/8.0 − 1/4.0 ⇒ v_(1) = −8.0 cm (virtual, 8.0 cm to the left of lens 1); m_(1) = −v_(1)/u_(1) = +2.00',
        'Lens 2: this image is 12.0 + 8.0 = 20.0 cm to the left of lens 2, so u_(2) = 20.0 cm',
        '1/v_(2) = 1/8.0 − 1/20.0 ⇒ v_(2) = +13.3 cm',
        'Final image: **0.133 m to the right of lens 2** (real)',
        'm_(2) = −13.3/20.0 = −0.667; overall m = (+2.00)(−0.667) = **−1.33** (inverted)'],
      ['Lens 1: u_(1) = 20.0 cm, f = 16.0 cm: 1/v_(1) = 1/16.0 − 1/20.0 ⇒ v_(1) = 80.0 cm; m_(1) = −80.0/20.0 = −4.00',
        'Same size and orientation as the coin ⇒ overall m = +1, so m_(2) = 1/(−4.00) = −0.250 ⇒ v_(2) = 0.250u_(2)',
        '1/u_(2) + 1/(0.250u_(2)) = 1/16.0 ⇒ 5/u_(2) = 1/16.0 ⇒ u_(2) = 80.0 cm',
        'Separation = v_(1) + u_(2) = 80.0 + 80.0',
        '= **160 cm**'],
      ['Lens 1: u_(1) = 20 cm, f_(1) = 10 cm: 1/v_(1) = 1/10 − 1/20 ⇒ v_(1) = 20 cm; m_(1) = −1.00',
        'Lens 2: u_(2) = 60 − 20 = 40 cm, f_(2) = 15.0 cm: 1/v_(2) = 1/15.0 − 1/40 ⇒ v_(2) = **24 cm beyond lens 2**',
        'm_(2) = −24/40 = −0.600; m = (−1.00)(−0.600) = +0.600',
        'h′ = 0.600 × 6.0 = **3.6 cm** (upright relative to the object)',
        'v_(2) is positive, so the final image is **real**.']
    ],
    [ // lens and mirror
      ['Lens: u_(1) = 30.0 cm, f = 15.0 cm ⇒ v_(1) = 30.0 cm, m_(1) = −1.00',
        'Mirror: the image is 40.0 − 30.0 = 10.0 cm in front of it, u_(2) = 10.0 cm; convex, f = −10.0 cm',
        '1/v_(2) = −1/10.0 − 1/10.0 ⇒ v_(2) = −5.0 cm (5.0 cm behind the mirror); m_(2) = +0.500',
        'Lens again (light now travels back): this image is 40.0 + 5.0 = 45.0 cm from the lens, u_(3) = 45.0 cm',
        '1/v_(3) = 1/15.0 − 1/45.0 ⇒ v_(3) = 22.5 cm; m_(3) = −22.5/45.0 = −0.500',
        'Final image **22.5 cm from the lens**, on the same side as the original object (the light is now travelling back through the lens); real',
        'm = (−1.00)(+0.500)(−0.500) = **+0.25** (upright)'],
      ['Lens: u_(1) = 15.0 cm, f = 10.0 cm ⇒ v_(1) = 30.0 cm, m_(1) = −2.00',
        'Mirror: u_(2) = 80.0 − 30.0 = 50.0 cm, f = 20.0 cm ⇒ 1/v_(2) = 1/20.0 − 1/50.0 ⇒ v_(2) = 33.3 cm, m_(2) = −0.667',
        'Lens again: u_(3) = 80.0 − 33.3 = 46.7 cm ⇒ 1/v_(3) = 1/10.0 − 1/46.7 ⇒ v_(3) = 12.7 cm, m_(3) = −0.272',
        'Final image **12.7 cm from the lens**, on the same side as the original object (the light is travelling back through the lens); real',
        'm = (−2.00)(−0.667)(−0.272) = **−0.36** (inverted)']
    ]
  ]);
  // ---------- Chapter 24: Wave Optics ----------
  add('LESSON-S3-24', [
    [
      ['**Two-slit interference:** the bright fringes are **equally spaced, of almost equal width and of almost equal intensity**.',
        '**Single-slit diffraction:** the **central maximum is much brighter** than the other maxima and **twice as wide** as each of them; the intensity of the other maxima falls off quickly.'],
      ['Fringe separation Δx = λD/a = (589 × 10^(-9))(1.5) / (0.20 × 10^(-3))',
        '= 4.4 × 10^(-3) m = **4.4 mm**',
        'In water the wavelength becomes λ/n = 589/1.33 = 443 nm, so Δx is divided by 1.33:',
        'Δx = 4.42/1.33 = **3.3 mm** (the fringes move closer together)'],
      ['d = 1/600 mm = 1.667 × 10^(-6) m',
        'd sin θ = nλ, and sin θ ≤ 1 ⇒ n ≤ d/λ = 1.667 × 10^(-6) / (500 × 10^(-9)) = 3.33',
        'n must be a whole number, so the highest order is the **third order (n = 3)**'],
      ['After the first polariser: I_(1) = ½I_(0) (unpolarised light)',
        'After the second (Malus’s law): I = I_(1) cos^(2) θ = ½I_(0) cos^(2) θ = I_(0)/8',
        'cos^(2) θ = 1/4 ⇒ cos θ = ½',
        'θ = **60°**'],
      ['Brewster’s law: tan θ_(B) = n_(2)/n_(1) = 1.33/1.00',
        'θ_(B) = **53.1°**']
    ]
  ]);

  // ---------- Chapter 25: Quantum Physics ----------
  add('LESSON-S3-25', [
    [ // Bragg's law
      ['Bragg’s law: 2d sin θ = nλ, with n = 1',
        'λ = 2(2.65 × 10^(-10)) sin 8.0°',
        '= **7.38 × 10^(-11) m**']
    ],
    [
      ['Photon energy: E = hc/λ = (6.63 × 10^(-34))(3.00 × 10^(8)) / (250 × 10^(-9)) = 7.96 × 10^(-19) J',
        'In eV: 7.96 × 10^(-19) / 1.60 × 10^(-19) = 4.97 eV',
        'Einstein’s equation: eV_(s) = hf − W = 4.97 − 3.0 = 1.97 eV',
        'V_(s) = **1.97 V**'],
      ['In the photoelectric effect **each electron absorbs the energy of one photon**, E = hf.',
        'Below the threshold frequency, hf < W (the work function), so **no single photon has enough energy to free an electron**.',
        'Increasing the intensity only increases the **number** of photons per second; each photon still has the same, too small, energy. So **no electrons are emitted**, however bright the light.'],
      ['λ = h/p = h/(mv) = 6.63 × 10^(-34) / (0.15 × 40)',
        '= **1.1 × 10^(-34) m**',
        'Diffraction is only noticeable when the gap or obstacle is about the same size as λ. This wavelength is **far smaller than any gap or obstacle** (even a nucleus is about 10^(-15) m), so **no diffraction can be observed**.'],
      ['Energy levels of hydrogen: E_(n) = −13.6/n^(2) eV',
        'E_(2) = −13.6/4 = −3.40 eV',
        'Ionisation energy from n = 2 = 0 − (−3.40)',
        '= **3.40 eV**'],
      ['The most energetic X-ray photon gets all the kinetic energy of one electron: eV = hf_(max)',
        'f_(max) = eV/h = (1.60 × 10^(-19))(30 × 10^(3)) / (6.63 × 10^(-34))',
        '= **7.24 × 10^(18) Hz**']
    ]
  ]);

  // ---------- Chapter 26: Nuclear Physics ----------
  add('LESSON-S3-26', [
    [ // binding energy
      ['¹⁴₇N has 7 protons and 7 neutrons. Use the mass of ¹H (it includes the electrons, as does the atomic mass of N).',
        'Mass of separate particles = 7(1.007825) + 7(1.008665) = 14.115430 u',
        'Mass defect Δm = 14.115430 − 14.003074 = **0.11236 u**',
        'Binding energy = Δm × 931.5 MeV u^(-1) = 0.11236 × 931.5',
        '= **104.6 MeV**',
        'Per nucleon = 104.6/14',
        '= **7.47 MeV per nucleon**']
    ],
    [
      ['Number of half-lives = 20/5.0 = 4',
        'Fraction remaining = (½)^(4)',
        '= **1/16**'],
      ['800 → 400 → 200 → 100 Bq is 3 half-lives',
        '3T_(½) = 30 min ⇒ T_(½) = **10 minutes**'],
      ['Radioactive decay is random because **it is impossible to predict which nucleus will decay next, or when** a particular nucleus will decay.',
        'Each nucleus has the **same probability of decaying per unit time** (the decay constant λ), and this is not affected by external conditions such as temperature or pressure.'],
      ['**Moderator** (e.g. graphite or water): slows down the fast neutrons from fission to thermal speeds, so that they are more likely to cause further fission of U-235.',
        '**Control rods** (e.g. boron or cadmium): absorb neutrons, so that on average **one neutron from each fission goes on to cause another fission**, keeping the rate of fission (and the power) steady.'],
      ['On the graph of binding energy per nucleon against nucleon number, the curve **rises to a peak near A ≈ 56 (iron)**.',
        '**Fission:** a heavy nucleus (e.g. U-235) splits into two medium nuclei that are **nearer the peak**, so they have a greater binding energy per nucleon.',
        '**Fusion:** light nuclei (e.g. hydrogen isotopes) join to form a heavier nucleus that is also **higher up the curve**.',
        'In both cases the products are **more tightly bound**, so their total mass is **less** than that of the original nuclei. The mass lost is released as energy, **E = Δmc^(2)**.']
    ]
  ]);
})();
