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

  'multiplication': {
    subject: 'Math',
    vocab: [
      ['factor', 'A number that is multiplied by another number.'],
      ['product', 'The answer you get when you multiply two numbers.'],
      ['array', 'Objects arranged in equal rows and columns to show multiplication.'],
      ['skip counting', 'Counting by a number other than 1, like 2, 4, 6, 8.'],
    ],
    facts: [
      'Multiplication is a fast way to add the same number many times.',
      'The order of factors does not change the product: 3 × 4 = 4 × 3.',
      'Any number multiplied by zero equals zero.',
      'Any number multiplied by one equals itself.',
    ],
    fill: [
      ['The answer to a multiplication problem is called the ___.', 'product'],
      ['3 × 4 = ___ because it is the same as 3 groups of 4.', '12'],
      ['The numbers you multiply together are called ___.', 'factors'],
    ],
    mc: [
      ['What is 6 × 7?', ['40', '42', '43', '48'], 1],
      ['What is 8 × 9?', ['63', '70', '72', '81'], 2],
      ['Which is the product of 5 × 5?', ['10', '20', '25', '30'], 2],
      ['What is 0 × 99?', ['99', '0', '1', '9'], 1],
    ],
    short: ['Write a word problem that can be solved using 4 × 6.', 'Draw an array to show 3 × 5 and explain how it works.'],
    compute: [
      ['4 × 6 =', '24'], ['7 × 8 =', '56'], ['9 × 3 =', '27'], ['5 × 7 =', '35'], ['6 × 6 =', '36'],
    ],
    passage: 'Multiplication is one of the most useful tools in all of mathematics. At its heart, multiplication is just a quicker way to add. Instead of writing 5 + 5 + 5 + 5, you can simply write 5 × 4 and get the same answer: 20.\n\nWhen you multiply, the numbers you work with are called factors, and the answer is called the product. One helpful way to picture multiplication is to draw an array — rows and columns of dots or squares. Three rows of four dots gives you 12 dots in all, so 3 × 4 = 12.\n\nOne of the great shortcuts in multiplication is the commutative property: the order of the factors doesn\'t matter. 3 × 4 gives the same product as 4 × 3. Learning your times tables opens a door to faster math in every subject.',
  },
  'plants': {
    subject: 'Science',
    vocab: [
      ['roots', 'The part of a plant that grows underground and absorbs water and nutrients.'],
      ['stem', 'The part of a plant that supports leaves and carries water from roots to leaves.'],
      ['chlorophyll', 'The green substance in leaves that captures sunlight for food-making.'],
      ['pollination', 'The process of moving pollen from one flower to another so seeds can form.'],
      ['germination', 'The process of a seed sprouting and beginning to grow into a plant.'],
    ],
    facts: [
      'Plants make their own food using sunlight, water, and air.',
      'Roots anchor plants in the soil and absorb water.',
      'Flowers help plants reproduce by attracting pollinators.',
    ],
    fill: [
      ['The ___ absorbs water and nutrients from the soil.', 'root'],
      ['Leaves are green because they contain ___.', 'chlorophyll'],
      ['A seed sprouting is called ___.', 'germination'],
    ],
    mc: [
      ['Which part carries water from roots to leaves?', ['Flower', 'Stem', 'Root', 'Seed'], 1],
      ['What do plants need to make their own food?', ['Dirt only', 'Sunlight, water, and air', 'Animals', 'Darkness'], 1],
      ['Which part of a plant helps it reproduce?', ['Root', 'Stem', 'Flower', 'Bark'], 2],
    ],
    short: ['Describe what would happen to a plant if it had no roots.', 'Explain why flowers are important to plants.'],
    passage: 'Plants are living things that have many different parts, each with an important job. The roots grow underground, anchoring the plant firmly in the soil and soaking up the water and nutrients it needs to survive. The stem rises from the roots, acting like a pipeline that carries water and food throughout the plant.\n\nThe leaves are the plant\'s food factory. They contain a green substance called chlorophyll that captures energy from sunlight. The plant uses that energy, along with water and carbon dioxide from the air, to make its own food in a process called photosynthesis.\n\nFlowers are the plant\'s way of making seeds. Pollinators like bees and butterflies carry pollen from flower to flower. Once a flower is pollinated, it can form seeds. Each seed holds the instructions for a brand-new plant, waiting for the right conditions to germinate.',
  },
  'weather': {
    subject: 'Science',
    vocab: [
      ['atmosphere', 'The layers of air and gases that surround Earth.'],
      ['precipitation', 'Water that falls from clouds as rain, snow, sleet, or hail.'],
      ['temperature', 'A measure of how hot or cold the air is.'],
      ['wind', 'Moving air caused by differences in air pressure and temperature.'],
      ['humidity', 'The amount of water vapor in the air.'],
    ],
    facts: [
      'Weather describes what the atmosphere is doing right now.',
      'The sun drives Earth\'s weather by heating air unevenly.',
      'Meteorologists study and forecast weather using instruments.',
    ],
    fill: [
      ['Rain, snow, and hail are all forms of ___.', 'precipitation'],
      ['___ is a measure of how warm or cold the air is.', 'temperature'],
      ['A scientist who studies weather is called a ___.', 'meteorologist'],
    ],
    mc: [
      ['What causes wind?', ['The moon pulling air', 'Differences in air pressure', 'Clouds moving', 'Ocean waves'], 1],
      ['Which tool measures temperature?', ['Barometer', 'Thermometer', 'Rain gauge', 'Wind vane'], 1],
      ['What is humidity?', ['Speed of wind', 'Amount of rain', 'Water vapor in air', 'Cloud height'], 2],
    ],
    short: ['Describe the weather outside today and explain what causes it.', 'Why do you think weather forecasts are sometimes wrong?'],
    passage: 'Look outside your window and you can observe weather happening right now. Weather is the condition of the atmosphere at a particular place and time. It includes temperature, wind, clouds, and precipitation like rain and snow.\n\nThe sun is the engine that drives all weather. Because the sun heats different parts of Earth unevenly, the air moves around. Warm air rises, cool air rushes in to replace it, and that movement creates wind. When warm, moist air rises and cools, water vapor condenses into clouds. When droplets in clouds grow heavy enough, they fall as precipitation.\n\nScientists who study weather are called meteorologists. They use thermometers, barometers, and radar to measure what the atmosphere is doing and predict what it will do next. Understanding weather helps people stay safe and plan their days.',
  },
  'human body': {
    subject: 'Science',
    vocab: [
      ['organ', 'A body part that does a specific job, like the heart or lungs.'],
      ['skeleton', 'The framework of bones that supports and protects the body.'],
      ['muscle', 'Tissue that contracts and relaxes to move parts of the body.'],
      ['circulatory system', 'The system of heart and blood vessels that moves blood through the body.'],
      ['digestive system', 'The organs that break down food so the body can use it for energy.'],
    ],
    facts: [
      'The human body has more than 200 bones.',
      'The heart beats about 100,000 times every day.',
      'The brain controls everything the body does.',
    ],
    fill: [
      ['The ___ is the organ that pumps blood through the body.', 'heart'],
      ['Bones form the body\'s ___, which supports and protects organs.', 'skeleton'],
      ['The stomach is part of the ___ system.', 'digestive'],
    ],
    mc: [
      ['How many bones does an adult human body have?', ['50', '106', '206', '300'], 2],
      ['Which system moves blood throughout the body?', ['Digestive', 'Circulatory', 'Skeletal', 'Nervous'], 1],
      ['What does the brain do?', ['Pumps blood', 'Digests food', 'Controls the body', 'Breathes air'], 2],
    ],
    short: ['Choose one body system and explain how it keeps you healthy.', 'Why do you think bones are important even though they feel hard and stiff?'],
    passage: 'Your body is an amazing machine made of trillions of tiny cells that work together as a team. Groups of cells form tissues, tissues form organs, and organs work together in systems.\n\nThe skeletal system gives your body its shape and protects your brain, heart, and lungs. Your skeleton is connected to muscles, which pull on your bones to help you move, run, and jump. The circulatory system — your heart and blood vessels — delivers oxygen and nutrients to every cell and carries away waste.\n\nThe digestive system breaks food into tiny pieces the body can absorb. The nervous system, led by the brain and spinal cord, receives information from the world and sends signals that control everything you do. Each system depends on the others, so taking care of your body keeps all the systems running smoothly.',
  },
  'ancient egypt': {
    subject: 'Social Studies',
    vocab: [
      ['pharaoh', 'The title for the ruler of ancient Egypt, considered a god-king.'],
      ['pyramid', 'A massive stone structure built as a tomb for Egyptian pharaohs.'],
      ['hieroglyphics', 'The ancient Egyptian writing system using pictures and symbols.'],
      ['mummy', 'A body preserved through a special drying process for the afterlife.'],
      ['Nile River', 'The great river in Egypt whose annual floods made farmland fertile.'],
    ],
    facts: [
      'Ancient Egypt lasted for over 3,000 years.',
      'The Great Pyramid of Giza is one of the Seven Wonders of the Ancient World.',
      'Egyptians invented one of the world\'s first writing systems.',
    ],
    fill: [
      ['The ruler of ancient Egypt was called a ___.', 'pharaoh'],
      ['Egyptians used ___ as a writing system made of pictures.', 'hieroglyphics'],
      ['The ___ River flooded each year and made the soil rich for farming.', 'Nile'],
    ],
    mc: [
      ['What was a pharaoh?', ['A type of pyramid', 'The ruler of Egypt', 'A writing symbol', 'A preserved body'], 1],
      ['Why were pyramids built?', ['As schools', 'As markets', 'As tombs for pharaohs', 'As bridges'], 2],
      ['What did the Nile floods bring?', ['Destruction', 'Fertile soil', 'Dry air', 'Ocean fish'], 1],
    ],
    short: ['Why do you think the Nile River was so important to ancient Egyptians?', 'What would be hard about building a pyramid with only ancient tools?'],
    passage: 'Ancient Egypt was one of the greatest civilizations the world has ever known. For more than 3,000 years, it flourished along the banks of the Nile River in northeastern Africa. Every year the Nile flooded, leaving behind rich, dark soil perfect for growing crops. This reliable food supply allowed Egypt to grow powerful.\n\nAt the top of Egyptian society was the pharaoh, a god-king who ruled over everything. When pharaohs died, Egyptians believed they traveled to an afterlife. To prepare for this journey, their bodies were carefully preserved as mummies, and enormous stone pyramids were built as tombs to protect them forever.\n\nEgyptians also developed one of the world\'s earliest writing systems called hieroglyphics, using hundreds of pictures and symbols to record stories, laws, and history. Thanks to these writings, carved into stone walls and temples, we can still read about ancient Egyptian life today.',
  },
  'civil war': {
    subject: 'Social Studies',
    vocab: [
      ['secession', 'When a state leaves the Union to form a separate government.'],
      ['Confederacy', 'The group of southern states that left the Union in 1861.'],
      ['Union', 'The northern states that stayed together during the Civil War.'],
      ['emancipation', 'The act of freeing enslaved people.'],
      ['Reconstruction', 'The period after the war when the South rejoined the Union.'],
    ],
    facts: [
      'The Civil War was fought from 1861 to 1865.',
      'President Abraham Lincoln issued the Emancipation Proclamation in 1863.',
      'More Americans died in the Civil War than in any other U.S. conflict.',
    ],
    fill: [
      ['The Civil War lasted from 1861 to ___.', '1865'],
      ['The southern states that left the Union formed the ___.', 'Confederacy'],
      ['President Lincoln\'s order to free enslaved people was called the ___ Proclamation.', 'Emancipation'],
    ],
    mc: [
      ['When did the Civil War begin?', ['1776', '1812', '1861', '1898'], 2],
      ['What was the main cause of the Civil War?', ['Taxes on tea', 'Slavery and states\' rights', 'A foreign invasion', 'A gold rush'], 1],
      ['Who was president during the Civil War?', ['George Washington', 'Thomas Jefferson', 'Abraham Lincoln', 'Ulysses Grant'], 2],
    ],
    short: ['Why do you think the Civil War was called a war "between the states"?', 'Describe what emancipation meant for enslaved people.'],
    passage: 'The American Civil War was the bloodiest conflict in United States history. It began in 1861 when eleven southern states, calling themselves the Confederacy, left the Union over the issues of slavery and states\' rights. President Abraham Lincoln led the Union — the remaining northern states — determined to hold the country together.\n\nFor four terrible years, families were torn apart as brothers sometimes fought on opposite sides. Hundreds of thousands of soldiers died on battlefields across the nation. In 1863, Lincoln issued the Emancipation Proclamation, declaring enslaved people in Confederate states to be free. This gave the war a new moral purpose: not just to preserve the Union, but to end slavery.\n\nThe war ended in 1865 when Confederate General Robert E. Lee surrendered. The long, difficult work of Reconstruction began — healing the nation\'s wounds and figuring out how formerly enslaved people would live as free citizens.',
  },

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

/* ---- Real AI generation via /api/generate proxy ---- */
async function generateMaterialAsync(type, cfg) {
  try { return await _claudeGenerate(type, cfg); }
  catch (err) { console.warn('AI generation failed, using template:', err.message); }
  return generateMaterial(type, cfg);
}

async function _claudeGenerate(type, cfg) {
  const grade = cfg.grade || 'Grade 3';
  const topic = (cfg.topic || '').trim() || GEN_BY_ID[type].title;
  const subject = cfg.subject || 'Science';
  const base = { id: 'm' + Math.random().toString(36).slice(2, 9), type, title: topic, subject, grade, createdAt: Date.now(), matched: true };

  const prompts = {
    worksheet: `Create a ${grade} worksheet about "${topic}" (${subject}).
Return ONLY valid JSON: {"title":"...","instructions":"...","items":[{"n":1,"kind":"fill","q":"The ___ is...","a":"answer"},...],"vocab":[["word","definition"],...]}
Generate ${cfg.count || 8} items, mix fill-in-the-blank (kind:"fill") and problems (kind:"solve"). Age-appropriate for ${grade}.`,

    quiz: `Create a ${grade} quiz about "${topic}" (${subject}).
Return ONLY valid JSON: {"title":"...","instructions":"...","mc":[{"q":"...","opts":["A","B","C","D"],"correct":0,"n":1},...], "sa":[{"q":"...","n":1},...]}
Generate ${cfg.mcCount ?? 4} MC and ${cfg.saCount ?? 2} short-answer. "correct" = 0-based index of correct option.`,

    vocab: `Create a ${grade} vocabulary set about "${topic}" (${subject}).
Return ONLY valid JSON: {"title":"...","instructions":"...","words":[{"word":"...","def":"...","sentence":"..."},...]}
Generate 6–8 words with kid-friendly definitions for ${grade} level.`,

    reading: `Create a ${grade} reading passage about "${topic}" (${subject}) at Lexile ${lexileFor(grade)}.
Return ONLY valid JSON: {"title":"...","instructions":"...","passage":"...","lexile":"${lexileFor(grade)}","questions":[{"kind":"mc","q":"...","opts":["A","B","C","D"],"correct":0,"n":1},{"kind":"mc","q":"...","opts":["A","B","C","D"],"correct":0,"n":2},{"kind":"mc","q":"...","opts":["A","B","C","D"],"correct":0,"n":3},{"kind":"short","q":"...","n":4},{"kind":"short","q":"...","n":5}],"vocab":[["word","definition"],...]}
Passage: 3–4 vivid paragraphs, age-appropriate. Include 3 MC + 2 short-answer questions, 4 vocab words.`,

    wordsearch: `List vocabulary words about "${topic}" for a word search puzzle.
Return ONLY valid JSON: {"words":["WORD1","WORD2",...]}
Provide ${Math.min(8, Math.floor((cfg.size || 13) * 0.55))} words: all-caps, no spaces, 3–11 letters, no proper nouns.`,
  };

  const resp = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      system: 'You are a homeschool curriculum assistant. Respond with ONLY valid JSON — no markdown, no code fences, no explanation.',
      messages: [{ role: 'user', content: prompts[type] }],
    }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.error?.message || `HTTP ${resp.status}`);
  }
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.error?.message || `HTTP ${resp.status}`);
  }
  const data = await resp.json();
  const text = data.content[0].text.trim().replace(/^```json\s*/i, '').replace(/```\s*$/, '');
  const parsed = JSON.parse(text);

  if (type === 'wordsearch') {
    const words = (parsed.words || []).map(w => w.replace(/[^a-zA-Z]/g, '').toUpperCase()).filter(w => w.length >= 3 && w.length <= 11).slice(0, 8);
    const grid = buildWordSearch(words, cfg.size || 13);
    return { ...base, words, grid: grid.grid, size: cfg.size || 13, placed: grid.placed,
      instructions: `Find and circle all ${words.length} hidden words. Words can go across, down, or diagonally.` };
  }
  if (type === 'quiz' && !parsed.points) {
    parsed.points = (parsed.mc?.length || 0) + (parsed.sa?.length || 0) * 2;
  }
  return { ...base, ...parsed };
}

Object.assign(window, {
  GENERATORS, GEN_BY_ID, SUBJECTS, GRADES, TOPIC_BANK,
  generateMaterial, generateMaterialAsync, topicData, buildWordSearch, lexileFor, seedLibrary, SHARED,
});
