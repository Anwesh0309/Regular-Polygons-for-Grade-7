// content.js — ALL narration-bearing text lives here (paragraphs & questions
// only, per the audio content policy: titles/labels are never narrated).
// Both the UI components and scripts/generate_audio.mjs import this file,
// so spoken audio and on-screen text can never drift out of sync.

/* ══════════════════════════════════════════════════════════════
   WONDER
══════════════════════════════════════════════════════════════ */
export const WONDER = {
  question: "Maya noticed the honeycomb in her science book was made of perfect six-sided cells — every side and every angle looked exactly the same. Then she spotted a stop sign on the way to school: eight equal sides, eight equal angles.",
  subtext: "Why do these shapes look so perfectly balanced? Let's become shape detectives and uncover the secrets of regular polygons!",
  emoji: "🔷",
  bgEmojis: ["△", "□", "⬠", "⬡", "n", "°", "⬢", "∠"],
};

/* ══════════════════════════════════════════════════════════════
   STORY — 5 slides
══════════════════════════════════════════════════════════════ */
export const STORY_SLIDES = [
  {
    n: 6, color: '#F59E0B',
    title: 'The Honeycomb Mystery',
    text: "On a school nature walk, Maya and her friend Arjun found a broken piece of honeycomb. Every single cell was a perfect hexagon — six equal sides, six equal angles, fitting together with no gaps at all. 'How do bees make every cell exactly the same?' Maya wondered. Their teacher smiled. 'That's a regular polygon, Maya — a shape where every side and every angle matches perfectly.'",
    highlight: '"A regular polygon has all sides equal AND all angles equal."',
    mascotText: "Equal sides, equal angles! 🔷",
  },
  {
    n: 8, color: '#EC4899',
    title: 'The Stop Sign Puzzle',
    text: "Walking home, Arjun stopped at the corner. 'Look — a stop sign! It has 8 sides, all the same length.' Maya counted the angles too. 'And all 8 angles look identical! If it's regular, each angle must be exactly the same size.' She remembered: to find the total of all the interior angles, you split the shape into triangles from one corner.",
    highlight: '"The interior angles of any polygon with n sides add up to (n − 2) × 180 degrees."',
    mascotText: "Splitting shapes into triangles! ➗",
  },
  {
    n: 5, color: '#7C3AED',
    title: "The Pentagon in the Park",
    text: "At the park, Maya spotted a pentagon-shaped flower bed — five equal sides and five equal angles. 'If the total of all the angles is 540 degrees,' she said, 'and there are 5 equal angles, then each one must be 540 divided by 5.' Arjun grinned. 'That's 108 degrees each! We just found the interior angle without even measuring it!'",
    highlight: '"Each interior angle of a regular polygon = angle sum ÷ number of sides."',
    mascotText: "108 degrees, every time! 📐",
  },
  {
    n: 4, color: '#10B981',
    title: 'The Exterior Angle Trick',
    text: "Back in class, their teacher showed a shortcut. 'Walk all the way around ANY regular polygon, turning the same amount at each corner. By the time you're back where you started, you've turned a full circle — 360 degrees, always!' Arjun tested it on a square: 360 divided by 4 corners equals a 90-degree turn at each one. It matched perfectly.",
    highlight: '"The exterior angles of any polygon always add up to 360 degrees."',
    mascotText: "A full circle, every time! 🔄",
  },
  {
    n: 12, color: '#4F46E5',
    title: 'Regular Polygons Everywhere',
    text: "That evening, Maya and Arjun looked around with new eyes: the hexagonal honeycomb, the octagonal stop sign, the pentagon flower bed, even a twelve-sided coin in Arjun's pocket. 'Once you know the pattern,' Maya said, 'regular polygons show up everywhere — in nature, on the road, and even in your pocket!'",
    highlight: '"Regular polygons balance sides, angles, and reasoning — and they are everywhere around us!"',
    mascotText: "Shape detectives, complete! 🚀",
  },
];

/* ══════════════════════════════════════════════════════════════
   SIMULATE — 4 station intro narrations
══════════════════════════════════════════════════════════════ */
export const SIM_NARRATION = {
  sim_0: "Welcome to the Honeycomb & Real-World Structure Builder! Explore how bees and engineers use regular polygons like hexagons, stop signs, and pentagons. Adjust the sides to see how nature balances equal sides and equal angles.",
  sim_1: "Welcome to the Stop Sign Triangulation Lab! Join Arjun at the street corner and fan out diagonals across the sign to split it into triangles. Discover why an 8-sided stop sign always has an interior angle sum of 1080 degrees.",
  sim_2: "Welcome to the Real-World Shape Detective! Grab your magnifying glass and protractor to inspect real objects Maya found. Test if each object meets both rules of a regular polygon — equal sides AND equal angles.",
  sim_3: "Welcome to Maya's Park Walk! Walk Maya around pentagon flower beds and stop signs. Watch her turn at each corner and prove that walking around any regular polygon completes a full 360-degree circle turn.",
};

/* ══════════════════════════════════════════════════════════════
   PRACTICE — 10 worlds × 10 questions, each with a hint
══════════════════════════════════════════════════════════════ */
export const WORLDS_DATA = [
  { id: 0, name: 'What Is a Regular Polygon?', icon: '🔷', color: '#7C3AED', desc: 'Questions 1–10' },
  { id: 1, name: 'Naming Polygons', icon: '🏷️', color: '#EC4899', desc: 'Questions 11–20' },
  { id: 2, name: 'Interior Angle Sum', icon: '➕', color: '#F59E0B', desc: 'Questions 21–30' },
  { id: 3, name: 'Interior Angles (Regular)', icon: '📐', color: '#10B981', desc: 'Questions 31–40' },
  { id: 4, name: 'Exterior Angles', icon: '🔄', color: '#4F46E5', desc: 'Questions 41–50' },
  { id: 5, name: 'Finding the Sides', icon: '🔍', color: '#E11D48', desc: 'Questions 51–60' },
  { id: 6, name: 'Diagonals & Triangles', icon: '✂️', color: '#D97706', desc: 'Questions 61–70' },
  { id: 7, name: 'Regular or Not? Reasoning', icon: '🧠', color: '#06B6D4', desc: 'Questions 71–80' },
  { id: 8, name: 'Polygons in the Real World', icon: '🌍', color: '#8B5CF6', desc: 'Questions 81–90' },
  { id: 9, name: 'Mixed Challenge', icon: '🌟', color: '#FACC15', desc: 'Questions 91–100' },
];

export const QUESTION_BANK = [
  // World 0 — What Is a Regular Polygon?
  [
    { q: "What makes a polygon a 'regular' polygon?", options: ['It has many sides', 'All its sides are equal in length', 'All its sides are equal AND all its angles are equal', 'It has at least one right angle'], correct: 2, hint: "Think about BOTH the sides and the angles — a regular polygon needs both to match." },
    { q: 'True or False: A square is a regular polygon.', options: ['True', 'False'], correct: 0, hint: 'Check: are all 4 sides equal? Are all 4 angles equal (90° each)?' },
    { q: 'True or False: A rectangle that is not a square is a regular polygon.', options: ['True', 'False'], correct: 1, explanation: 'Its sides are not all equal, only its angles are.', hint: 'Look at the sides — are the long and short sides the same length?' },
    { q: 'Which shape below is NOT regular even though all its angles are equal?', options: ['Equilateral triangle', 'A rectangle (non-square)', 'A square', 'A regular hexagon'], correct: 1, hint: "Equal angles isn't enough — check whether the sides are equal too." },
    { q: 'An equilateral triangle has all sides equal. What must also be true for it to be a regular polygon?', options: ['Nothing else is needed', 'All its angles must be equal too', 'It must have 4 sides', 'It must be drawn in blue'], correct: 1, hint: 'In every triangle, if the sides are equal, what happens to the angles opposite them?' },
    { q: 'True or False: Every equilateral triangle is also equiangular (60° each angle).', options: ['True', 'False'], correct: 0, hint: 'This is a special property of triangles — equal sides always give equal angles.' },
    { q: 'Which of these is a real-life example of a regular polygon?', options: ['A stop sign (regular octagon)', 'A door (rectangle shape)', 'A slice of pizza', 'A kite'], correct: 0, hint: 'Think of a shape where every side and every angle look identical.' },
    { q: 'Priya says a regular polygon must always have equal sides, but the angles can be different. Is she correct?', options: ['Yes, only sides matter', 'No — angles must be equal too', 'Yes, angles never matter in polygons', "No — sides don't matter at all"], correct: 1, hint: 'Recall the full definition: two conditions must BOTH be true.' },
    { q: 'Which shape can NEVER be a regular polygon no matter how you draw it?', options: ['A rectangle that is not a square', 'A square', 'An equilateral triangle', 'A regular pentagon'], correct: 0, hint: 'Can you make all 4 sides of a rectangle equal without it becoming a square?' },
    { q: "How many conditions must a polygon satisfy to be called 'regular'?", options: ['1', '2', '3', '4'], correct: 1, hint: 'Equal sides... and what else?' },
  ],
  // World 1 — Naming Polygons
  [
    { q: 'What is the name of a polygon with 5 sides?', options: ['Hexagon', 'Pentagon', 'Heptagon', 'Octagon'], correct: 1, hint: 'Penta- means five.' },
    { q: 'What is the name of a polygon with 8 sides?', options: ['Heptagon', 'Nonagon', 'Octagon', 'Decagon'], correct: 2, hint: "Octo- means eight, like an octopus's 8 legs." },
    { q: 'What is the name of a polygon with 6 sides?', options: ['Pentagon', 'Hexagon', 'Heptagon', 'Septagon'], correct: 1, hint: 'Hexa- means six.' },
    { q: 'True or False: A polygon with 4 sides is always called a square.', options: ['True', 'False'], correct: 1, explanation: '4-sided polygons are called quadrilaterals; a square is just one special type.', hint: 'Think of rectangles, kites, and trapeziums — they all have 4 sides too.' },
    { q: 'What is the name of a polygon with 10 sides?', options: ['Nonagon', 'Decagon', 'Dodecagon', 'Hendecagon'], correct: 1, hint: 'Deca- means ten, like a decade of years.' },
    { q: 'What is the name of a polygon with 9 sides?', options: ['Octagon', 'Nonagon', 'Decagon', 'Heptagon'], correct: 1, hint: 'Nona- means nine.' },
    { q: 'What is the name of a polygon with 7 sides?', options: ['Hexagon', 'Heptagon', 'Octagon', 'Nonagon'], correct: 1, hint: 'Hepta- means seven.' },
    { q: 'A stop sign has 8 equal sides and 8 equal angles. What shape is it?', options: ['Regular hexagon', 'Regular heptagon', 'Regular octagon', 'Regular nonagon'], correct: 2, hint: 'Count the sides on a stop sign next time you see one!' },
    { q: 'What is the name of a polygon with 12 sides?', options: ['Decagon', 'Hendecagon', 'Dodecagon', 'Icosagon'], correct: 2, hint: 'Dodeca- means twelve, like the 12 months in a year.' },
    { q: 'Which of these names does NOT match a polygon with the correct number of sides?', options: ['Pentagon = 5 sides', 'Hexagon = 6 sides', 'Heptagon = 9 sides', 'Octagon = 8 sides'], correct: 2, hint: 'Hepta- actually means seven, not nine.' },
  ],
  // World 2 — Interior Angle Sum
  [
    { q: 'What is the formula for the sum of interior angles of a polygon with n sides?', options: ['n × 180', '(n − 2) × 180', '(n + 2) × 180', '360 ÷ n'], correct: 1, hint: 'Think about how many triangles you can split the polygon into from one vertex.' },
    { q: 'Find the sum of interior angles of a pentagon (5 sides).', options: ['360°', '450°', '540°', '600°'], correct: 2, hint: 'Use (n − 2) × 180 with n = 5.' },
    { q: 'Find the sum of interior angles of a hexagon (6 sides).', options: ['600°', '720°', '800°', '900°'], correct: 1, hint: '(6 − 2) × 180 = ?' },
    { q: 'Find the sum of interior angles of a quadrilateral (4 sides).', options: ['180°', '270°', '360°', '540°'], correct: 2, hint: '(4 − 2) × 180 = ?' },
    { q: 'True or False: The sum of the interior angles of any triangle is 180°.', options: ['True', 'False'], correct: 0, hint: 'This is the simplest case: (3 − 2) × 180.' },
    { q: 'Find the sum of interior angles of an octagon (8 sides).', options: ['900°', '1080°', '1200°', '1440°'], correct: 1, hint: '(8 − 2) × 180 = ?' },
    { q: 'A polygon has an interior angle sum of 1260°. How many sides does it have?', options: ['7', '8', '9', '10'], correct: 2, hint: 'Set (n − 2) × 180 = 1260 and solve for n.' },
    { q: 'Find the sum of interior angles of a decagon (10 sides).', options: ['1260°', '1440°', '1600°', '1800°'], correct: 1, hint: '(10 − 2) × 180 = ?' },
    { q: 'True or False: The interior angle sum formula (n − 2) × 180 works for BOTH regular and irregular polygons.', options: ['True', 'False'], correct: 0, hint: 'The formula only depends on the number of sides, not whether the shape is regular.' },
    { q: 'A quadrilateral has three angles measuring 80°, 95°, and 100°. What is the fourth angle?', options: ['75°', '85°', '95°', '105°'], correct: 1, hint: 'All four angles must add up to 360° — subtract the three you know.' },
  ],
  // World 3 — Interior Angles of Regular Polygons
  [
    { q: 'What is the measure of each interior angle of a regular hexagon?', options: ['100°', '110°', '120°', '130°'], correct: 2, hint: 'Divide the interior angle sum (720°) by 6.' },
    { q: 'What is the measure of each interior angle of a regular pentagon?', options: ['100°', '108°', '110°', '120°'], correct: 1, hint: 'Divide 540° by 5.' },
    { q: 'What is the measure of each interior angle of an equilateral triangle?', options: ['45°', '60°', '90°', '120°'], correct: 1, hint: 'Divide 180° by 3.' },
    { q: 'What is the measure of each interior angle of a square?', options: ['60°', '90°', '100°', '120°'], correct: 1, hint: "A square's angles are all right angles." },
    { q: 'What is the measure of each interior angle of a regular octagon?', options: ['120°', '130°', '135°', '140°'], correct: 2, hint: 'Divide 1080° by 8.' },
    { q: 'What is the measure of each interior angle of a regular decagon?', options: ['135°', '140°', '144°', '150°'], correct: 2, hint: 'Divide 1440° by 10.' },
    { q: 'What is the measure of each interior angle of a regular nonagon (9 sides)?', options: ['130°', '135°', '140°', '150°'], correct: 2, hint: 'Divide 1260° by 9.' },
    { q: 'True or False: As the number of sides of a regular polygon increases, each interior angle gets larger.', options: ['True', 'False'], correct: 0, hint: "Compare a triangle's 60° angle to a decagon's 144° angle." },
    { q: 'A regular polygon has each interior angle equal to 150°. How many sides does it have?', options: ['10', '11', '12', '14'], correct: 2, hint: 'Set n × 150 equal to (n − 2) × 180 and solve for n.' },
    { q: 'Which regular polygon has interior angles closest to (but less than) 180°?', options: ['One with very few sides', 'One with very many sides', 'A triangle', 'A square'], correct: 1, hint: 'As a regular polygon gets more sides, it starts to look more like a circle.' },
  ],
  // World 4 — Exterior Angles
  [
    { q: 'What is the sum of the exterior angles of ANY convex polygon, one at each vertex?', options: ['180°', '270°', '360°', '540°'], correct: 2, hint: 'This is true no matter how many sides the polygon has!' },
    { q: 'What is the exterior angle of a regular hexagon?', options: ['45°', '60°', '72°', '90°'], correct: 1, hint: 'Divide 360° by 6.' },
    { q: 'What is the exterior angle of a regular pentagon?', options: ['60°', '72°', '80°', '90°'], correct: 1, hint: 'Divide 360° by 5.' },
    { q: 'What is the exterior angle of an equilateral triangle?', options: ['60°', '90°', '120°', '180°'], correct: 2, hint: 'Divide 360° by 3.' },
    { q: 'What is the exterior angle of a square?', options: ['45°', '60°', '90°', '120°'], correct: 2, hint: 'Divide 360° by 4.' },
    { q: 'True or False: Interior angle + exterior angle at the same vertex always add up to 180°.', options: ['True', 'False'], correct: 0, hint: 'They form a straight line together.' },
    { q: 'The exterior angle of a regular polygon is 40°. What is its interior angle?', options: ['120°', '130°', '140°', '150°'], correct: 2, hint: '180° − 40° = ?' },
    { q: 'What is the exterior angle of a regular decagon?', options: ['30°', '36°', '40°', '45°'], correct: 1, hint: 'Divide 360° by 10.' },
    { q: 'What is the exterior angle of a regular nonagon?', options: ['30°', '36°', '40°', '45°'], correct: 2, hint: 'Divide 360° by 9.' },
    { q: 'A regular polygon has an exterior angle of 45°. What is its interior angle?', options: ['110°', '120°', '135°', '140°'], correct: 2, hint: '180° − 45° = ?' },
  ],
  // World 5 — Finding the Sides
  [
    { q: 'A regular polygon has an exterior angle of 24°. How many sides does it have?', options: ['12', '14', '15', '18'], correct: 2, hint: 'Divide 360° by the exterior angle: 360 ÷ 24.' },
    { q: 'A regular polygon has an exterior angle of 20°. How many sides does it have?', options: ['15', '16', '18', '20'], correct: 2, hint: 'Divide 360° by 20°.' },
    { q: 'A regular polygon has each interior angle equal to 140°. How many sides does it have?', options: ['7', '8', '9', '10'], correct: 2, hint: 'Find the exterior angle first: 180° − 140° = 40°, then divide 360° by that.' },
    { q: 'A regular polygon has each interior angle equal to 144°. How many sides does it have?', options: ['9', '10', '11', '12'], correct: 1, hint: 'Exterior angle = 180° − 144° = 36°. Now divide 360° by 36°.' },
    { q: 'The sum of the interior angles of a regular polygon is 1800°. How many sides does it have?', options: ['10', '11', '12', '14'], correct: 2, hint: 'Solve (n − 2) × 180 = 1800 for n.' },
    { q: 'A regular polygon has an exterior angle of 90°. How many sides does it have?', options: ['3', '4', '5', '6'], correct: 1, hint: 'Divide 360° by 90°.' },
    { q: 'A regular polygon has an exterior angle of 30°. How many sides does it have?', options: ['10', '11', '12', '15'], correct: 2, hint: 'Divide 360° by 30°.' },
    { q: 'True or False: A regular polygon can have an exterior angle of 50°, since 360 ÷ 50 gives a whole number of sides.', options: ['True', 'False'], correct: 1, explanation: '360 ÷ 50 = 7.2, which is not a whole number, so no regular polygon has this exterior angle.', hint: 'Check: does 360 divide evenly by 50?' },
    { q: 'A regular polygon has each interior angle equal to 108°. How many sides does it have?', options: ['5', '6', '7', '8'], correct: 0, hint: 'Exterior angle = 180° − 108° = 72°. Divide 360° by 72°.' },
    { q: "Rahul says: 'If a regular polygon's exterior angle is 12°, it must have 30 sides.' Is he correct?", options: ['Yes, 360 ÷ 12 = 30', 'No, it should have 12 sides', 'No, it should have 40 sides', 'Cannot be determined'], correct: 0, hint: 'Check his division: 360 ÷ 12.' },
  ],
  // World 6 — Diagonals & Triangles
  [
    { q: 'If you draw all the diagonals from ONE vertex of a hexagon, how many triangles are formed?', options: ['3', '4', '5', '6'], correct: 1, hint: 'Triangles from one vertex = number of sides − 2.' },
    { q: 'Why does triangulating a polygon from one vertex help us find the interior angle sum?', options: ['Because triangles are colorful', 'Because each triangle contributes 180°, and we just add them up', 'Because it makes the polygon smaller', 'Because diagonals are always equal length'], correct: 1, hint: 'What do you know about the angle sum of a single triangle?' },
    { q: 'A pentagon is split into triangles from one vertex. How many triangles are formed, and what is the total angle sum?', options: ['2 triangles, 360°', '3 triangles, 540°', '4 triangles, 720°', '5 triangles, 900°'], correct: 1, hint: 'Triangles = 5 − 2 = 3. Multiply by 180° each.' },
    { q: 'How many diagonals can be drawn from a single vertex of an octagon?', options: ['3', '4', '5', '6'], correct: 2, hint: 'From one vertex, you can connect to every OTHER vertex except itself and its two neighbours: n − 3.' },
    { q: 'What is the total number of diagonals in a hexagon (using all vertices)?', options: ['6', '9', '12', '15'], correct: 1, hint: 'Use the formula n(n − 3) ÷ 2 with n = 6.' },
    { q: 'True or False: A triangle (3 sides) has zero diagonals.', options: ['True', 'False'], correct: 0, hint: 'Every vertex of a triangle is already connected to every other vertex by a side.' },
    { q: 'What is the total number of diagonals in a decagon?', options: ['25', '30', '35', '40'], correct: 2, hint: 'Use n(n − 3) ÷ 2 with n = 10.' },
    { q: 'Triangulating a polygon with n sides from one vertex always produces how many triangles?', options: ['n', 'n − 1', 'n − 2', 'n − 3'], correct: 2, hint: 'Check it for a quadrilateral: 2 triangles, and 4 − 2 = 2.' },
    { q: 'A polygon is split into 6 triangles by drawing diagonals from one vertex. How many sides does the polygon have?', options: ['6', '7', '8', '9'], correct: 2, hint: 'Number of triangles = n − 2, so n = triangles + 2.' },
    { q: "Why can't you draw a diagonal to a vertex's own two neighbouring vertices?", options: ['Because those connections are already sides of the polygon, not diagonals', 'Because it is against the rules of geometry', "Because neighbouring vertices don't exist", 'Because the diagonal would be too short'], correct: 0, hint: 'A diagonal connects two vertices that are NOT already joined by a side.' },
  ],
  // World 7 — Regular or Not? Reasoning
  [
    { q: 'A shape has 4 equal sides but its angles are 80°, 100°, 80°, 100°. Is it a regular polygon?', options: ['Yes, because the sides are equal', 'No, because the angles are not all equal', 'Yes, because it has 4 sides', 'Cannot be determined'], correct: 1, hint: 'Remember: BOTH sides and angles must be equal.' },
    { q: 'A shape has all equal angles of 120° but its sides are 3cm, 5cm, 3cm, 5cm, 3cm, 5cm. Is it a regular hexagon?', options: ['Yes, all angles are equal', 'No, the sides are not all equal', 'Yes, because it has 6 sides', 'Cannot be determined'], correct: 1, hint: 'Check both conditions — this one fails on sides.' },
    { q: 'True or False: Every square is a regular polygon, but not every rhombus is.', options: ['True', 'False'], correct: 0, explanation: "A rhombus has equal sides but not equal angles (unless it's a square).", hint: "Compare a rhombus's angles — are they always 90°?" },
    { q: "Which statement correctly explains why a regular pentagon looks 'balanced'?", options: ['It has 5 sides only', 'All sides and all angles are congruent, so no part looks different from another', 'It is drawn in the middle of the page', 'It has straight lines'], correct: 1, hint: 'Think about symmetry — congruent parts repeat evenly around the shape.' },
    { q: "A student claims: 'Any polygon with all equal angles must also have all equal sides.' Which shape proves this wrong?", options: ['A rectangle that is not a square', 'A square', 'An equilateral triangle', 'A regular hexagon'], correct: 0, hint: 'Think of a 4-sided shape with four 90° angles but different side lengths.' },
    { q: 'True or False: A regular polygon always has rotational and line symmetry.', options: ['True', 'False'], correct: 0, hint: 'Picture spinning a regular hexagon — does it look the same at several angles?' },
    { q: 'Which of these is NOT a valid reason a shape fails to be a regular polygon?', options: ['Its sides are unequal', 'Its angles are unequal', 'It has straight sides', 'It is curved instead of straight-sided'], correct: 2, hint: 'Having straight sides is actually required for something to be called a polygon at all.' },
    { q: "A regular polygon is folded exactly through its center along a line of symmetry. What can you say about the two halves?", options: ['They always match up perfectly (congruent)', 'They are never the same', 'One half always has more sides', 'Nothing can be determined'], correct: 0, hint: 'Think about the symmetry lines of a regular polygon.' },
    { q: 'Why is an equilateral triangle automatically a regular polygon, while an isosceles triangle is not?', options: ['Because equilateral triangles have all 3 sides AND all 3 angles equal, but isosceles triangles only guarantee 2 sides equal', 'Because isosceles triangles have more sides', 'Because equilateral triangles are always bigger', 'There is no difference'], correct: 0, hint: 'Compare how many sides must match in each type of triangle.' },
    { q: "A hexagon has 6 equal sides but is 'squashed' so its angles are not all equal. Is it regular?", options: ['Yes', 'No', 'Only if it is symmetrical', 'Only if it is convex'], correct: 1, hint: 'Equal sides alone are not enough.' },
  ],
  // World 8 — Polygons in the Real World
  [
    { q: 'Which regular polygon is used in the shape of a honeycomb cell?', options: ['Square', 'Pentagon', 'Hexagon', 'Octagon'], correct: 2, hint: '6-sided shape — bees are famous for building with it!' },
    { q: 'Which of these regular polygons CAN tessellate (tile a flat surface with no gaps) on its own?', options: ['Regular pentagon', 'Regular heptagon', 'Regular hexagon', 'Regular nonagon'], correct: 2, hint: 'Check: does its interior angle divide evenly into 360°? 120° does!' },
    { q: 'True or False: A regular pentagon can tessellate a flat surface on its own, with no gaps.', options: ['True', 'False'], correct: 1, explanation: "A regular pentagon's interior angle is 108°, and 360 ÷ 108 is not a whole number, so gaps are left.", hint: "Divide 360° by the pentagon's interior angle (108°) — is it a whole number?" },
    { q: 'Only three regular polygons can tessellate a plane by themselves. Which set is correct?', options: ['Triangle, square, hexagon', 'Triangle, pentagon, hexagon', 'Square, pentagon, octagon', 'Triangle, square, octagon'], correct: 0, hint: 'Their interior angles are 60°, 90°, and 120° — each divides evenly into 360°.' },
    { q: 'A stop sign is shaped like a regular octagon. What is the measure of each of its interior angles?', options: ['120°', '125°', '135°', '140°'], correct: 2, hint: 'Recall: regular octagon interior angle = 135°.' },
    { q: "Why can't a regular pentagon tile a floor with no gaps, while a square can?", options: ['Pentagons are always too big', "A pentagon's interior angle (108°) doesn't divide evenly into 360°, but a square's (90°) does", 'Squares are easier to cut', "Pentagons don't have straight sides"], correct: 1, hint: "Divide 360° by each shape's interior angle and compare." },
    { q: 'Soccer balls are traditionally stitched from which two polygon shapes?', options: ['Triangles and squares', 'Pentagons and hexagons', 'Circles and squares', 'Octagons and triangles'], correct: 1, hint: 'Look closely at the black and white patches on a classic soccer ball.' },
    { q: 'A road warning sign is often shaped like a regular polygon with 3 sides. What shape is it?', options: ['Square', 'Triangle', 'Pentagon', 'Hexagon'], correct: 1, hint: 'Think of a yield / give-way sign.' },
    { q: 'True or False: Regular hexagons appear in honeycombs partly because they tile efficiently with no wasted space.', options: ['True', 'False'], correct: 0, hint: 'Efficient tiling means bees use less wax for the same storage space.' },
    { q: 'A floor tiler wants to use only ONE type of regular polygon tile with no gaps or overlaps. Which is a valid choice?', options: ['Regular heptagon', 'Regular octagon', 'Regular hexagon', 'Regular nonagon'], correct: 2, hint: 'Only equilateral triangles, squares, and regular hexagons can do this alone.' },
  ],
  // World 9 — Mixed Challenge
  [
    { q: 'A regular polygon has 15 sides. What is the sum of its interior angles?', options: ['2160°', '2340°', '2520°', '2700°'], correct: 1, hint: '(15 − 2) × 180 = ?' },
    { q: 'A regular polygon has 15 sides. What is the measure of EACH interior angle (to the nearest whole degree)?', options: ['150°', '156°', '160°', '164°'], correct: 1, hint: 'Divide the interior angle sum by 15.' },
    { q: 'A regular polygon has an exterior angle of 18°. What is the sum of its interior angles?', options: ['2880°', '3060°', '3240°', '3420°'], correct: 2, hint: 'First find n (360 ÷ 18), then use (n − 2) × 180.' },
    { q: 'A logo uses a regular polygon where each interior angle is exactly double the exterior angle. How many sides does it have?', options: ['5', '6', '8', '10'], correct: 1, hint: 'Interior + exterior = 180°, and interior = 2 × exterior. Solve for the exterior angle first.' },
    { q: "A regular polygon's interior angle sum is 3600°. How many sides does it have?", options: ['18', '20', '22', '24'], correct: 2, hint: 'Divide 3600° by 180°, then add 2.' },
    { q: 'True or False: A regular polygon can have an interior angle of exactly 100°.', options: ['True', 'False'], correct: 1, explanation: 'Its exterior angle would be 80°, and 360 ÷ 80 = 4.5, not a whole number, so no such regular polygon exists.', hint: 'Find the exterior angle first (180° − 100°), then check if 360° divides evenly by it.' },
    { q: 'A regular polygon has an interior angle sum of 1440°, and each interior angle measures 144°. What shape is it?', options: ['9 sides — nonagon', '10 sides — decagon', '11 sides — hendecagon', '12 sides — dodecagon'], correct: 1, hint: 'Divide 1440° by 180°, then add 2 to find n.' },
    { q: 'A field is shaped like a regular polygon with an exterior angle of 40°. How many fence posts are needed, one at each vertex?', options: ['8', '9', '10', '12'], correct: 1, hint: 'Number of vertices = number of sides = 360° ÷ exterior angle.' },
    { q: "Compare a regular octagon's interior angle to a regular decagon's. Which is larger, and by how much?", options: ['Octagon is larger by 9°', 'Decagon is larger by 9°', 'They are equal', 'Octagon is larger by 15°'], correct: 1, hint: 'Interior angle 135° (octagon) vs 144° (decagon) — subtract to find the difference.' },
    { q: 'Challenge: a regular polygon has the SAME number of diagonals as sides. Which polygon is it?', options: ['Square (4 sides)', 'Pentagon (5 sides)', 'Hexagon (6 sides)', 'Heptagon (7 sides)'], correct: 1, hint: 'Set n(n − 3) ÷ 2 equal to n and solve for n.' },
  ],
];

/* ══════════════════════════════════════════════════════════════
   REFLECT — "Teach the mascot" recap questions
══════════════════════════════════════════════════════════════ */
export const REFLECT_QUESTIONS = [
  { q: 'What two things must be true for a polygon to be "regular"?', options: [
    { text: 'All sides equal AND all angles equal', correct: true, emoji: '🔷' },
    { text: 'It just needs to have straight sides', correct: false, emoji: '❌' },
    { text: 'It must have exactly 6 sides', correct: false, emoji: '❓' },
  ]},
  { q: 'A regular hexagon has an interior angle sum of 720°. What is each interior angle?', options: [
    { text: '120°', correct: true, emoji: '✅' },
    { text: '90°', correct: false, emoji: '❌' },
    { text: '720°', correct: false, emoji: '❓' },
  ]},
  { q: 'Why do the exterior angles of any convex polygon always add up to 360°?', options: [
    { text: "Walking all the way around the shape is one full turn — a full circle", correct: true, emoji: '✨' },
    { text: 'Because 360 is a round number', correct: false, emoji: '❌' },
    { text: 'It only works for squares', correct: false, emoji: '❓' },
  ]},
];

/* ══════════════════════════════════════════════════════════════
   INTRO / PRACTICE-INTRO / FEEDBACK (generic, reusable narration)
══════════════════════════════════════════════════════════════ */
export const MISC_NARRATION = {
  intro: "Welcome to Regular Polygons and Reasoning for Grade 7! Today, we'll explore what makes a polygon 'regular', uncover the secrets behind interior and exterior angles, and reason our way through some exciting shape puzzles. Get ready for an amazing adventure!",
  practice_intro: "Time to practice! Pick a world, answer the questions, and use the hint button anytime you get stuck. Let's put your reasoning skills to the test!",
  very_good: "Excellent reasoning! That's exactly right!",
  incorrect: "Not quite — let's look at this one again.",
};
