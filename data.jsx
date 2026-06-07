/* ============================================================ *
 *  HomeschoolKit · data + content engine
 *  Generator metadata, library seed, places dataset, and the
 *  "AI" generation functions (deterministic simulated output).
 * ============================================================ */

const GENERATORS = [
  { id: 'worksheet', icon: 'worksheet', title: 'Worksheet', plural: 'Worksheets',
    desc: 'Practice problems for any topic and level', meta: 'Math · ELA · Science', tone: 'accent' },
  { id: 'quiz', icon: 'quiz', title: 'Quiz', plural: 'Quizzes',
    desc: 'Auto-graded checks with answer keys', meta: 'MCQ · Short answer', tone: 'accent' },
  { id: 'wordsearch', icon: 'wordsearch', title: 'Word Search', plural: 'Word Searches',
    desc: 'Themed letter-grid puzzles from your word list', meta: 'Printable', tone: 'accent' },
  { id: 'vocab', icon: 'vocab', title: 'Vocabulary', plural: 'Vocabulary Sets',
    desc: 'Definitions, example sentences & flashcards', meta: 'Builder', tone: 'accent' },
  { id: 'reading', icon: 'reading', title: 'Reading Passage', plural: 'Reading Passages',
    desc: 'Leveled passages with comprehension questions', meta: 'Lexile-aware', tone: 'accent' },
];
const GEN_BY_ID = Object.fromEntries(GENERATORS.map((g) => [g.id, g]));

const SUBJECTS = ['Math', 'Science', 'Language Arts', 'Social Studies', 'Geography', 'Art'];
const GRADES = ['Pre-K', 'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'];

/* ---- Topic knowledge bank (drives realistic generated content) ---- */
const TOPIC_BANK = {
  'water cycle': {
    subject: 'Science',
    vocab: [
      ['evaporation', 'The process where the sun heats water and turns it into vapor that rises into the air.'],
      ['condensation', 'When water vapor cools high in the sky and forms tiny droplets that make clouds.'],
      ['precipitation', 'Water that falls from clouds as rain, snow, sleet, or hail.'],
      ['collection', 'When fallen water gathers in oceans, lakes, rivers, and underground.'],
      ['runoff', 'Water that flows over the land into streams and rivers after it rains.'],
      ['groundwater', 'Water stored beneath the ground in the spaces between rocks and soil.'],
    ],
    facts: [
      'The water cycle has no beginning and no end — it repeats forever.',
      'The same water has been cycling on Earth for billions of years.',
      'The sun provides the energy that powers the entire water cycle.',
      'About 97% of Earth\u2019s water is salt water in the oceans.',
    ],
    fill: [
      ['The sun causes water to ___ from oceans and lakes.', 'evaporate'],
      ['Water vapor turns back into liquid through ___.', 'condensation'],
      ['Rain, snow, and hail are all forms of ___.', 'precipitation'],
      ['Clouds are made of tiny droplets of ___.', 'water'],
    ],
    mc: [
      ['Which step happens when the sun heats the ocean?', ['Evaporation', 'Precipitation', 'Collection', 'Runoff'], 0],
      ['Clouds form during which process?', ['Runoff', 'Condensation', 'Evaporation', 'Erosion'], 1],
      ['Which is NOT a form of precipitation?', ['Snow', 'Hail', 'Fog', 'Rain'], 2],
      ['What gives the water cycle its energy?', ['The moon', 'The wind', 'The sun', 'The tides'], 2],
    ],
    short: [
      'In your own words, describe what happens to a raindrop after it lands in a river.',
      'Why do you think the water cycle is important for living things?',
    ],
    passage: 'Every drop of water on Earth is part of a never-ending journey called the water cycle. It begins when the sun warms the surface of oceans, lakes, and rivers. The heat turns liquid water into an invisible gas called water vapor, which floats up into the sky. This step is called evaporation.\n\nHigh in the cooler air, the vapor turns back into tiny droplets. Millions of these droplets cluster together to form clouds — a process called condensation. When the droplets grow heavy enough, they fall back to the ground as rain, snow, sleet, or hail. We call this precipitation.\n\nOnce the water reaches the ground, it collects in rivers, lakes, and oceans, or soaks down to become groundwater. Then the sun heats it again, and the whole journey starts over. The water you drank today may once have floated in a cloud over the ocean — or even been sipped by a dinosaur millions of years ago!',
  },
  'fractions': {
    subject: 'Math',
    vocab: [
      ['numerator', 'The top number in a fraction; it tells how many parts you have.'],
      ['denominator', 'The bottom number in a fraction; it tells how many equal parts make a whole.'],
      ['equivalent fractions', 'Different fractions that name the same amount, like 1/2 and 2/4.'],
      ['mixed number', 'A whole number combined with a fraction, such as 2 1/3.'],
    ],
    facts: [
      'A fraction shows part of a whole or part of a group.',
      'When the numerator and denominator are equal, the fraction equals one whole.',
      'You can find equivalent fractions by multiplying the top and bottom by the same number.',
    ],
    fill: [
      ['In the fraction 3/4, the number 4 is called the ___.', 'denominator'],
      ['The fraction 2/2 is equal to ___ whole.', 'one'],
      ['1/2 and 2/4 are called ___ fractions.', 'equivalent'],
    ],
    mc: [
      ['Which fraction is equivalent to 1/2?', ['2/3', '3/6', '1/4', '5/8'], 1],
      ['In 5/8, which number is the numerator?', ['8', '5', '13', '3'], 1],
      ['Which fraction is the largest?', ['1/4', '1/2', '1/8', '1/3'], 1],
      ['What is 2/4 in simplest form?', ['1/2', '2/2', '1/4', '4/2'], 0],
    ],
    short: [
      'Draw a circle and shade 3/4 of it. Explain how you knew how much to shade.',
      'Write two fractions that are equivalent to 1/3 and explain how you found them.',
    ],
    compute: [
      ['1/4 + 2/4 =', '3/4'], ['3/8 + 2/8 =', '5/8'], ['2/5 + 1/5 =', '3/5'],
      ['Shade 2/3 of the boxes:', '\u2588\u2588\u2591 (2 of 3)'], ['Is 4/4 equal to one whole?', 'Yes'],
    ],
    passage: 'Fractions are all around us, even when we don\u2019t notice them. When you cut a pizza into equal slices and take a few, you are using fractions. A fraction is a way to describe part of a whole.\n\nEvery fraction has two parts. The bottom number, called the denominator, tells you how many equal pieces the whole is divided into. The top number, called the numerator, tells you how many of those pieces you have. So if a pizza is cut into 8 slices and you eat 3, you have eaten 3/8 of the pizza.\n\nSometimes two fractions that look different are actually equal. For example, 1/2 of a chocolate bar is the same amount as 2/4 of it. These are called equivalent fractions. Learning to see these connections makes working with fractions much easier.',
  },
  'solar system': {
    subject: 'Science',
    vocab: [
      ['planet', 'A large round object that orbits a star and has cleared its path of other objects.'],
      ['orbit', 'The curved path one object takes around another in space.'],
      ['star', 'A giant ball of hot gas that gives off its own light and heat, like our Sun.'],
      ['asteroid', 'A small rocky object that orbits the Sun, mostly found in the asteroid belt.'],
      ['moon', 'A natural object that orbits a planet.'],
    ],
    facts: [
      'There are eight planets in our solar system.',
      'The Sun makes up more than 99% of all the mass in the solar system.',
      'Jupiter is the largest planet; Mercury is the smallest.',
      'A year on Mercury is just 88 Earth days long.',
    ],
    fill: [
      ['The ___ is the star at the center of our solar system.', 'Sun'],
      ['There are ___ planets in our solar system.', 'eight'],
      ['The path a planet takes around the Sun is called its ___.', 'orbit'],
    ],
    mc: [
      ['Which planet is closest to the Sun?', ['Earth', 'Mercury', 'Mars', 'Venus'], 1],
      ['Which is the largest planet?', ['Saturn', 'Earth', 'Jupiter', 'Neptune'], 2],
      ['What is at the center of our solar system?', ['The Moon', 'Earth', 'The Sun', 'Jupiter'], 2],
      ['How many planets orbit our Sun?', ['Seven', 'Eight', 'Nine', 'Ten'], 1],
    ],
    short: [
      'If you could visit any planet, which would you choose and why?',
      'Explain the difference between a star and a planet.',
    ],
    passage: 'Our solar system is an enormous neighborhood in space with the Sun at its center. The Sun is a star — a giant ball of glowing gas so large that more than a million Earths could fit inside it. Its gravity holds everything else in place.\n\nEight planets travel around the Sun, each following its own path called an orbit. The four planets closest to the Sun — Mercury, Venus, Earth, and Mars — are small and rocky. The four farthest — Jupiter, Saturn, Uranus, and Neptune — are huge balls of gas and ice.\n\nBetween the planets you can find moons, asteroids, comets, and dust. Earth is the only planet we know of where living things can survive, which makes our place in the solar system very special indeed.',
  },
  'photosynthesis': {
    subject: 'Science',
    vocab: [
      ['photosynthesis', 'The process plants use to make food from sunlight, water, and air.'],
      ['chlorophyll', 'The green substance in leaves that captures sunlight.'],
      ['carbon dioxide', 'A gas in the air that plants take in to make food.'],
      ['oxygen', 'The gas plants release that animals and people need to breathe.'],
      ['glucose', 'The sugar plants make and use as food for energy.'],
    ],
    facts: [
      'Plants make their own food using sunlight — animals cannot do this.',
      'Photosynthesis releases the oxygen we breathe.',
      'Chlorophyll is what makes leaves green.',
    ],
    fill: [
      ['Plants make food using energy from ___.', 'sunlight'],
      ['The green substance that captures light is ___.', 'chlorophyll'],
      ['Plants release ___ into the air during photosynthesis.', 'oxygen'],
    ],
    mc: [
      ['What do plants use to capture sunlight?', ['Roots', 'Chlorophyll', 'Petals', 'Bark'], 1],
      ['Which gas do plants release?', ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Helium'], 2],
      ['Where does most photosynthesis happen?', ['Roots', 'Stem', 'Leaves', 'Flowers'], 2],
    ],
    short: ['Why do you think plants are important for animals and people?',
      'Describe what a plant needs in order to make its own food.'],
    passage: 'Plants are amazing living factories. Unlike animals, they make their own food in a process called photosynthesis. To do it, a plant needs three simple ingredients: sunlight, water, and a gas from the air called carbon dioxide.\n\nThe magic happens mostly in the leaves. Inside them is a green substance called chlorophyll, which captures the energy in sunlight. The plant uses that energy to turn water and carbon dioxide into a sugar called glucose, which is its food.\n\nAs the plant makes its food, it gives off a gas called oxygen — the very same gas that you and I breathe. So every time you take a breath, you can thank a plant!',
  },
  'american revolution': {
    subject: 'Social Studies',
    vocab: [
      ['colony', 'A settlement ruled by a country far away.'],
      ['independence', 'Freedom from the control of another country.'],
      ['Declaration of Independence', 'The 1776 document that announced the colonies were free from Britain.'],
      ['patriot', 'A colonist who wanted independence from Britain.'],
      ['taxes', 'Money people must pay to a government.'],
    ],
    facts: [
      'The American Revolution was a war between Britain and its 13 American colonies.',
      'The Declaration of Independence was signed in 1776.',
      'Colonists were angry about being taxed without representation.',
    ],
    fill: [
      ['The Declaration of Independence was signed in the year ___.', '1776'],
      ['There were ___ original American colonies.', '13'],
      ['A colonist who wanted freedom was called a ___.', 'patriot'],
    ],
    mc: [
      ['In what year was the Declaration of Independence signed?', ['1492', '1620', '1776', '1812'], 2],
      ['How many original colonies were there?', ['10', '13', '15', '50'], 1],
      ['What were colonists angry about?', ['Too much rain', 'Taxes without representation', 'Long winters', 'Bad roads'], 1],
    ],
    short: ['Why did the colonists want to be independent from Britain?',
      'Imagine you lived in 1776. Would you be a patriot? Explain your choice.'],
    passage: 'In the 1700s, thirteen colonies along the eastern coast of North America were ruled by Britain, a country across the ocean. For many years the colonists were proud to be British. But over time, they grew frustrated.\n\nBritain began making the colonists pay new taxes on everyday things like paper and tea. The colonists had no representatives in the British government to speak for them, so they felt the taxes were unfair. \u201CNo taxation without representation!\u201D became their rallying cry.\n\nIn 1776, the colonies took a bold step. They signed the Declaration of Independence, announcing to the world that they were now free and would govern themselves. This brave decision led to the American Revolution and the birth of a brand-new country: the United States of America.',
  },
  'ocean animals': {
    subject: 'Science',
    vocab: [
      ['mammal', 'An animal that breathes air and feeds its babies milk, like a whale or dolphin.'],
      ['gills', 'Body parts that fish use to breathe underwater.'],
      ['camouflage', 'Colors or patterns that help an animal blend into its surroundings.'],
      ['predator', 'An animal that hunts other animals for food.'],
      ['coral reef', 'A colorful underwater habitat built by tiny animals called coral.'],
    ],
    facts: [
      'The blue whale is the largest animal that has ever lived.',
      'Octopuses have three hearts and blue blood.',
      'Most fish breathe through gills, but whales and dolphins breathe air.',
    ],
    fill: [
      ['Fish breathe underwater using their ___.', 'gills'],
      ['A ___ whale is the largest animal on Earth.', 'blue'],
      ['An animal that hunts others is called a ___.', 'predator'],
    ],
    mc: [
      ['How do dolphins breathe?', ['With gills', 'Through skin', 'They breathe air', 'They don\u2019t breathe'], 2],
      ['How many hearts does an octopus have?', ['One', 'Two', 'Three', 'Four'], 2],
      ['What is the largest animal on Earth?', ['Shark', 'Blue whale', 'Elephant', 'Giant squid'], 1],
    ],
    short: ['Choose your favorite ocean animal and describe how it survives.',
      'How is a dolphin different from a fish?'],
    passage: 'The ocean is the largest habitat on Earth, and it is full of incredible animals. Some, like fish, breathe underwater using special body parts called gills. Others, like whales and dolphins, are mammals — they must swim to the surface to breathe air, just like we do.\n\nOcean animals have clever ways to survive. An octopus can change color to hide from predators, and it has three hearts pumping blue blood through its body! The blue whale, the largest animal that has ever lived, is so big that its heart alone is the size of a small car.\n\nFrom the sunlit coral reefs near the surface to the dark, cold waters far below, every part of the ocean is home to creatures perfectly suited to their watery world.',
  },
};

/* Generic vocab/fact generation for unknown topics */
function genericTopic(topic, subject) {
  const T = topic.trim() || 'this topic';
  const cap = T.charAt(0).toUpperCase() + T.slice(1);
  return {
    subject: subject || 'Science',
    vocab: [
      [T.toLowerCase(), `A key idea you will explore while studying ${T}.`],
      ['observe', `To watch ${T} carefully and notice important details.`],
      ['describe', `To use clear words to tell about ${T}.`],
      ['compare', `To find ways that parts of ${T} are alike or different.`],
    ],
    facts: [
      `${cap} is an interesting topic to explore through reading and hands-on activities.`,
      `Asking good questions is the best way to learn more about ${T}.`,
      `Drawing and labeling can help you understand ${T} better.`,
    ],
    fill: [
      [`One important thing about ${T} is that it ___.`, '(answers will vary)'],
      [`A word that relates to ${T} is ___.`, '(answers will vary)'],
      [`You can learn about ${T} by ___.`, '(answers will vary)'],
    ],
    mc: [
      [`Which of these best relates to ${T}?`, ['All of the below', 'Observing', 'Asking questions', 'Reading'], 0],
      [`What is a good way to study ${T}?`, ['Ignore it', 'Read and explore', 'Guess randomly', 'Skip it'], 1],
      [`Learning about ${T} helps you ___.`, ['Understand the world', 'Nothing', 'Forget facts', 'Get confused'], 0],
    ],
    short: [
      `Write three things you already know or wonder about ${T}.`,
      `Describe one way ${T} connects to your everyday life.`,
    ],
    passage: `${cap} is a wonderful subject to discover. When we slow down to observe carefully, we begin to notice details we might have missed before. Each new detail leads to a new question, and each question leads us deeper into understanding.\n\nThe best learners are curious learners. They ask "why" and "how," they look closely, and they aren\u2019t afraid to be surprised by what they find. As you explore ${T}, keep a notebook of your questions and discoveries.\n\nLearning is not about memorizing facts and forgetting them. It is about building a picture of the world piece by piece. Every time you study something like ${T}, you add another piece to that picture.`,
  };
}

function topicData(topic, subject) {
  const key = (topic || '').trim().toLowerCase();
  for (const k of Object.keys(TOPIC_BANK)) {
    if (key.includes(k) || k.includes(key) && key.length > 3) return { ...TOPIC_BANK[k], _matched: true };
  }
  return { ...genericTopic(topic, subject), _matched: false };
}

/* ---- The simulated generator ---- */
function generateMaterial(type, cfg) {
  const td = topicData(cfg.topic, cfg.subject);
  const title = cfg.topic ? cfg.topic.trim() : GEN_BY_ID[type].title;
  const grade = cfg.grade || 'Grade 3';
  const base = { id: 'm' + Math.random().toString(36).slice(2, 9), type, title,
    subject: cfg.subject || td.subject, grade, createdAt: Date.now(),
    matched: td._matched };

  if (type === 'worksheet') {
    const count = cfg.count || 8;
    const items = [];
    const pool = [...(td.compute || []), ...td.fill.map((f) => ({ q: f[0], a: f[1], kind: 'fill' }))];
    const computed = (td.compute || []).map((c) => ({ q: c[0], a: c[1], kind: 'solve' }));
    const fills = td.fill.map((f) => ({ q: f[0], a: f[1], kind: 'fill' }));
    let seq = [...computed, ...fills];
    while (seq.length < count) seq = [...seq, ...fills];
    items.push(...seq.slice(0, count).map((x, i) => ({ ...x, n: i + 1 })));
    return { ...base, instructions: `Read each item carefully and write your answer in the space provided. Show your work where needed.`,
      sections: cfg.includeWordBank && td.vocab ? [{ kind: 'wordbank', words: td.vocab.map((v) => v[0]) }] : [],
      items, vocab: td.vocab };
  }
  if (type === 'quiz') {
    const mcCount = cfg.mcCount ?? 4, saCount = cfg.saCount ?? 2;
    let mc = [...td.mc]; while (mc.length < mcCount) mc = [...mc, ...td.mc];
    let sa = [...td.short]; while (sa.length < saCount) sa = [...sa, ...td.short];
    return { ...base, instructions: 'Choose the best answer for each multiple-choice question. Answer short-response questions in complete sentences.',
      mc: mc.slice(0, mcCount).map((m, i) => ({ q: m[0], opts: m[1], correct: m[2], n: i + 1 })),
      sa: sa.slice(0, saCount).map((q, i) => ({ q, n: i + 1 })),
      points: mcCount + saCount * 2 };
  }
  if (type === 'wordsearch') {
    const words = (cfg.words && cfg.words.length ? cfg.words : td.vocab.map((v) => v[0]))
      .map((w) => w.replace(/[^a-zA-Z]/g, '').toUpperCase()).filter((w) => w.length >= 3 && w.length <= 11).slice(0, 8);
    const size = cfg.size || 13;
    const grid = buildWordSearch(words, size);
    return { ...base, words, grid: grid.grid, size, placed: grid.placed,
      instructions: `Find and circle all ${words.length} hidden words. Words can go across, down, or diagonally.` };
  }
  if (type === 'vocab') {
    return { ...base, instructions: 'Study each word, its meaning, and the example sentence. Use the flashcard side to quiz yourself.',
      words: td.vocab.map((v) => ({ word: v[0], def: v[1], sentence: exampleSentence(v[0], v[1]) })) };
  }
  if (type === 'reading') {
    return { ...base, instructions: 'Read the passage carefully, then answer the comprehension questions below.',
      passage: td.passage, lexile: lexileFor(grade),
      questions: [
        ...td.mc.slice(0, 3).map((m, i) => ({ kind: 'mc', q: m[0], opts: m[1], correct: m[2], n: i + 1 })),
        ...td.short.slice(0, 2).map((q, i) => ({ kind: 'short', q, n: i + 4 })),
      ], vocab: td.vocab.slice(0, 4) };
  }
  return base;
}

function exampleSentence(word, def) {
  return `Our class learned that "${word}" means ${def.charAt(0).toLowerCase() + def.slice(1).replace(/\.$/, '')}.`;
}
function lexileFor(grade) {
  const map = { 'Pre-K': 'BR', 'Kindergarten': 'BR–100L', 'Grade 1': '190–530L', 'Grade 2': '420–650L',
    'Grade 3': '520–820L', 'Grade 4': '740–940L', 'Grade 5': '830–1010L', 'Grade 6': '925–1070L',
    'Grade 7': '970–1120L', 'Grade 8': '1010–1185L' };
  return map[grade] || '520–820L';
}

/* Word-search grid builder — places words in 8 directions, fills rest with letters */
function buildWordSearch(words, size) {
  const grid = Array.from({ length: size }, () => Array(size).fill(''));
  const dirs = [[0,1],[1,0],[1,1],[1,-1],[0,-1],[-1,0],[-1,-1],[-1,1]];
  const placed = [];
  const fits = (w, r, c, dr, dc) => {
    for (let i = 0; i < w.length; i++) {
      const rr = r + dr*i, cc = c + dc*i;
      if (rr < 0 || cc < 0 || rr >= size || cc >= size) return false;
      if (grid[rr][cc] && grid[rr][cc] !== w[i]) return false;
    }
    return true;
  };
  for (const w of words) {
    let done = false;
    for (let tries = 0; tries < 200 && !done; tries++) {
      const [dr, dc] = dirs[Math.floor(Math.random()*dirs.length)];
      const r = Math.floor(Math.random()*size), c = Math.floor(Math.random()*size);
      if (fits(w, r, c, dr, dc)) {
        for (let i = 0; i < w.length; i++) grid[r+dr*i][c+dc*i] = w[i];
        placed.push({ word: w, r, c, dr, dc });
        done = true;
      }
    }
  }
  const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < size; r++) for (let c = 0; c < size; c++)
    if (!grid[r][c]) grid[r][c] = A[Math.floor(Math.random()*26)];
  return { grid, placed };
}

/* ---- Library seed ---- */
const seedLibrary = () => ([
  { id: 'lib1', type: 'worksheet', title: 'Fractions: Adding Unlike Denominators', subject: 'Math', grade: 'Grade 4', createdAt: Date.now()-86400000*2, fav: true },
  { id: 'lib2', type: 'quiz', title: 'The Water Cycle', subject: 'Science', grade: 'Grade 3', createdAt: Date.now()-86400000*4 },
  { id: 'lib3', type: 'wordsearch', title: 'Ocean Animals', subject: 'Science', grade: 'Kindergarten', createdAt: Date.now()-86400000*6 },
  { id: 'lib4', type: 'reading', title: 'The American Revolution', subject: 'Social Studies', grade: 'Grade 5', createdAt: Date.now()-86400000*9 },
  { id: 'lib5', type: 'vocab', title: 'Solar System Vocabulary', subject: 'Science', grade: 'Grade 2', createdAt: Date.now()-86400000*12 },
  { id: 'lib6', type: 'worksheet', title: 'Photosynthesis Basics', subject: 'Science', grade: 'Grade 5', createdAt: Date.now()-86400000*14 },
]);

const SHARED = [
  { id: 'sh1', type: 'quiz', title: 'States & Capitals Challenge', subject: 'Geography', grade: 'Grade 5', by: 'Dana Whitfield', group: 'Cedar Co-op' },
  { id: 'sh2', type: 'reading', title: 'Tide Pools of Monterey Bay', subject: 'Science', grade: 'Grade 4', by: 'Priya Nair', group: 'Cedar Co-op' },
  { id: 'sh3', type: 'worksheet', title: 'Money & Making Change', subject: 'Math', grade: 'Grade 2', by: 'Tomás Vela', group: 'Bayside Learners' },
];

Object.assign(window, {
  GENERATORS, GEN_BY_ID, SUBJECTS, GRADES, TOPIC_BANK,
  generateMaterial, topicData, buildWordSearch, lexileFor, seedLibrary, SHARED,
});
