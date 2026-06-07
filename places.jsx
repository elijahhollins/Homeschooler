/* ============================================================ *
 *  HomeschoolKit · places data for Place Explorer
 *  Each place: meta, info, a generated unit study, and nearby
 *  homeschool deals / resources.
 * ============================================================ */

const PLACE_TYPES = [
  { id: 'aquarium', label: 'Aquariums', icon: 'reading' },
  { id: 'zoo', label: 'Zoos', icon: 'users' },
  { id: 'museum', label: 'Museums', icon: 'book' },
  { id: 'park', label: 'State Parks', icon: 'flag' },
  { id: 'science', label: 'Science Centers', icon: 'spark' },
  { id: 'history', label: 'Historic Sites', icon: 'compass' },
];

const PLACES = [
  {
    id: 'mba', name: 'Bay Aquarium', type: 'aquarium', typeLabel: 'Aquarium',
    city: 'Monterey, CA', lat: 36.6177, lng: -121.9023, dist: 2.4, rating: 4.8, reviews: 12480,
    hours: '10:00 AM – 5:00 PM', price: '$$', priceNote: '$49 adult · $39 child',
    blurb: 'A world-renowned aquarium on the edge of the bay, famous for its kelp forest, sea otters, and touch pools.',
    grades: 'K–8', subjects: ['Science', 'Geography'], duration: '2–4 hrs',
    highlights: ['Three-story kelp forest tank', 'Live sea otter feedings', 'Open-top touch tide pools', 'Jellyfish gallery'],
    unit: {
      title: 'Life in the Kelp Forest',
      overview: 'Use a visit to the Bay Aquarium to explore ocean ecosystems up close. This unit study turns a single trip into a week of science: before you go, during your visit, and follow-up activities at home.',
      objectives: [
        'Identify at least five animals that live in a kelp forest ecosystem.',
        'Explain how sea otters help keep the kelp forest healthy (a keystone species).',
        'Describe how animals are adapted to survive in tide pools.',
        'Record observations using scientific drawing and labeling.',
      ],
      vocab: [
        ['ecosystem', 'A community of living things and their environment, working together.'],
        ['kelp forest', 'An underwater habitat made of tall seaweed where many animals live.'],
        ['keystone species', 'An animal that many others depend on, like the sea otter.'],
        ['tide pool', 'A pool of seawater left behind on rocks when the tide goes out.'],
        ['adaptation', 'A body part or behavior that helps an animal survive.'],
      ],
      activities: [
        { when: 'Before', text: 'Map the route to the aquarium and calculate the drive time. Read one book about ocean animals together.' },
        { when: 'During', text: 'Complete the "Kelp Forest Scavenger Hunt" — sketch three animals and note one adaptation for each.' },
        { when: 'During', text: 'Visit the touch tide pool. Gently feel a sea star and describe its texture in your notebook.' },
        { when: 'After', text: 'Build a model food chain: kelp → urchin → otter. Discuss what happens if otters disappear.' },
        { when: 'After', text: 'Write a postcard "from" your favorite animal describing a day in its life.' },
      ],
      discussion: [
        'Why do you think sea otters are called a "keystone species"?',
        'How are the animals in a tide pool adapted to waves crashing over them twice a day?',
        'What surprised you most about the kelp forest?',
      ],
      materials: ['Field notebook & pencil', 'Printed scavenger hunt (generate below)', 'Colored pencils', 'A book on ocean habitats'],
    },
    deals: [
      { name: 'Homeschool Days', org: 'Bay Aquarium', save: '50% off admission', detail: 'Second Tuesday monthly for registered homeschool families.', tag: 'Admission', icon: 'ticket' },
      { name: 'Educator Membership', org: 'Bay Aquarium', save: '$20 off', detail: 'Annual pass discount with proof of homeschool enrollment.', tag: 'Membership', icon: 'star' },
      { name: 'Tide Pool Workshop', org: 'Coastal Learning Co-op', save: 'Free', detail: 'Ranger-led beach walk, Saturdays 9 AM. Ages 6+.', tag: 'Workshop', icon: 'users' },
    ],
  },
  {
    id: 'cityzoo', name: 'Greenwood Zoo', type: 'zoo', typeLabel: 'Zoo',
    city: 'Portland, OR', lat: 45.5136, lng: -122.6828, dist: 4.1, rating: 4.6, reviews: 8210,
    hours: '9:30 AM – 4:00 PM', price: '$$', priceNote: '$24 adult · $18 child',
    blurb: 'A 64-acre zoo organized by world habitats, with a celebrated elephant family and a hands-on nature discovery center.',
    grades: 'Pre-K–8', subjects: ['Science', 'Geography'], duration: '3–5 hrs',
    highlights: ['Africa savanna habitat', 'Elephant lands', 'Nature discovery center', 'Endangered species talks'],
    unit: {
      title: 'Animals & Their Habitats',
      overview: 'A zoo visit is a passport to the whole planet. This unit helps learners connect each animal to the habitat it evolved in, and to the work of protecting endangered species.',
      objectives: [
        'Match at least six animals to their native continents and habitats.',
        'Define "endangered" and name two reasons animals become endangered.',
        'Compare adaptations of animals from two different habitats (e.g., savanna vs. rainforest).',
        'Explain one thing zoos do to protect species.',
      ],
      vocab: [
        ['habitat', 'The natural home of an animal or plant.'],
        ['adaptation', 'A feature that helps a living thing survive in its habitat.'],
        ['endangered', 'A type of animal that is at risk of disappearing forever.'],
        ['conservation', 'The work of protecting animals, plants, and wild places.'],
        ['native', 'Naturally living or growing in a particular place.'],
      ],
      activities: [
        { when: 'Before', text: 'Print a world map. As you visit each habitat, mark where those animals come from.' },
        { when: 'During', text: 'Pick one endangered animal. Attend its keeper talk and write down three facts.' },
        { when: 'During', text: 'Sketch one animal and label two adaptations you can actually see.' },
        { when: 'After', text: 'Make a poster: "How You Can Help" one endangered species you met.' },
        { when: 'After', text: 'Compare two animals from different continents in a Venn diagram.' },
      ],
      discussion: [
        'Why might an animal from the savanna look so different from one in the rainforest?',
        'What is the hardest part of keeping a wild animal healthy in a zoo?',
        'How can a family help protect endangered animals from home?',
      ],
      materials: ['World map printout', 'Field notebook', 'Venn diagram sheet (generate below)', 'Colored pencils'],
    },
    deals: [
      { name: 'Homeschool Wednesdays', org: 'Greenwood Zoo', save: '$8 admission', detail: 'Reduced rate every Wednesday during the school year.', tag: 'Admission', icon: 'ticket' },
      { name: 'Zoo Family Membership', org: 'Greenwood Zoo', save: '15% off', detail: 'Co-op group rate for 5+ families enrolling together.', tag: 'Membership', icon: 'users' },
      { name: 'Junior Zookeeper Day', org: 'Greenwood Zoo', save: '$15', detail: 'Behind-the-scenes program, ages 8–12. Pre-register.', tag: 'Program', icon: 'star' },
    ],
  },
  {
    id: 'natsci', name: 'Hall of Natural History', type: 'museum', typeLabel: 'Natural History Museum',
    city: 'Denver, CO', lat: 39.7392, lng: -104.9903, dist: 6.7, rating: 4.7, reviews: 15300,
    hours: '9:00 AM – 5:00 PM', price: '$$', priceNote: '$22 adult · $16 child',
    blurb: 'Towering dinosaur skeletons, a gems-and-minerals vault, and a planetarium under one roof.',
    grades: 'K–8', subjects: ['Science', 'Social Studies'], duration: '3–4 hrs',
    highlights: ['Dinosaur hall with full T. rex cast', 'Gem & mineral vault', 'Planetarium shows', 'Egyptian mummies exhibit'],
    unit: {
      title: 'Reading the Fossil Record',
      overview: 'Natural history museums are time machines. This unit uses the dinosaur and fossil halls to teach how scientists learn about life from long ago — and how Earth itself has changed.',
      objectives: [
        'Explain what a fossil is and how one forms.',
        'Put three major prehistoric eras in order on a timeline.',
        'Describe how scientists figure out what a dinosaur ate from its teeth.',
        'Identify three common rocks or minerals and one use for each.',
      ],
      vocab: [
        ['fossil', 'The preserved remains or trace of a living thing from long ago.'],
        ['paleontologist', 'A scientist who studies fossils and ancient life.'],
        ['extinct', 'No longer existing anywhere on Earth.'],
        ['mineral', 'A natural solid material that makes up rocks.'],
        ['era', 'A very long period of time in Earth\u2019s history.'],
      ],
      activities: [
        { when: 'Before', text: 'Make a paper timeline of Earth\u2019s history with three eras marked.' },
        { when: 'During', text: 'Find a meat-eater and a plant-eater. Sketch their teeth and predict each diet.' },
        { when: 'During', text: 'In the gem vault, choose three minerals and record their color and one use.' },
        { when: 'After', text: 'Make your own "fossil" by pressing a shell or leaf into modeling clay.' },
        { when: 'After', text: 'Write a paragraph: "If I were a paleontologist, I would want to dig for…"' },
      ],
      discussion: [
        'How can a single bone tell scientists so much about an animal?',
        'Why do you think some animals became extinct while others survived?',
        'What is the difference between a rock and a mineral?',
      ],
      materials: ['Paper timeline strip', 'Field notebook', 'Modeling clay (for home activity)', 'Colored pencils'],
    },
    deals: [
      { name: 'Free First Saturdays', org: 'Hall of Natural History', save: 'Free admission', detail: 'No-cost entry the first Saturday of each month.', tag: 'Admission', icon: 'ticket' },
      { name: 'Homeschool Science Series', org: 'Museum Education Dept.', save: '$5 / class', detail: 'Drop-in lab classes on fossils & rocks, monthly.', tag: 'Class', icon: 'book' },
      { name: 'Planetarium Group Rate', org: 'Hall of Natural History', save: '30% off', detail: 'Star-show tickets for homeschool groups of 8+.', tag: 'Show', icon: 'star' },
    ],
  },
  {
    id: 'redwood', name: 'Tall Pines State Park', type: 'park', typeLabel: 'State Park',
    city: 'Felton, CA', lat: 37.0512, lng: -122.0644, dist: 11.3, rating: 4.9, reviews: 5640,
    hours: 'Sunrise – Sunset', price: '$', priceNote: '$10 / vehicle',
    blurb: 'Old-growth forest with easy interpretive trails, a creek, and a junior ranger program.',
    grades: 'Pre-K–8', subjects: ['Science', 'Art'], duration: '2–3 hrs',
    highlights: ['Old-growth giant trees', 'Creek & banana slugs', 'Junior Ranger program', 'Interpretive nature trail'],
    unit: {
      title: 'A Forest Is a Community',
      overview: 'Take learning outside. This unit uses a forest walk to explore how trees, animals, soil, and water all depend on one another — and to practice careful observation in nature.',
      objectives: [
        'Identify the layers of a forest, from the canopy to the forest floor.',
        'Explain the job a decomposer (like a banana slug) does in the forest.',
        'Measure and compare the size of trees using a simple hug-and-count method.',
        'Create a nature journal entry with a drawing and three observations.',
      ],
      vocab: [
        ['canopy', 'The leafy top layer of a forest where branches spread out.'],
        ['decomposer', 'A living thing that breaks down dead plants and animals.'],
        ['understory', 'The plants growing below the tallest trees.'],
        ['ecosystem', 'A community of living things and their environment.'],
        ['old-growth', 'A forest with very old, large trees that has never been cut down.'],
      ],
      activities: [
        { when: 'Before', text: 'Learn the four forest layers and draw them in your nature journal.' },
        { when: 'During', text: 'Find a decomposer at work. Sketch it and describe what it is breaking down.' },
        { when: 'During', text: 'Hug the biggest tree you can find. Count how many "arm-spans" around it is.' },
        { when: 'After', text: 'Press a leaf you found and label which tree it came from.' },
        { when: 'After', text: 'Earn the Junior Ranger badge by completing the park activity book.' },
      ],
      discussion: [
        'What would happen to the forest if there were no decomposers?',
        'Why do the tallest trees have their leaves way up high?',
        'How did being quiet in the forest change what you noticed?',
      ],
      materials: ['Nature journal', 'Pencil & colored pencils', 'Leaf-pressing book', 'Water & sturdy shoes'],
    },
    deals: [
      { name: 'Free Junior Ranger Kit', org: 'State Parks Dept.', save: 'Free', detail: 'Activity book + badge at the visitor center. All ages.', tag: 'Program', icon: 'flag' },
      { name: 'Annual Parks Pass', org: 'State Parks Dept.', save: '$30 off', detail: 'Family pass covers all state parks for a year.', tag: 'Pass', icon: 'ticket' },
      { name: 'Forest Ecology Walk', org: 'Sierra Homeschool Network', save: 'Free', detail: 'Naturalist-led hike, first Friday each month.', tag: 'Workshop', icon: 'users' },
    ],
  },
  {
    id: 'scictr', name: 'Discovery Science Center', type: 'science', typeLabel: 'Science Center',
    city: 'Austin, TX', lat: 30.2672, lng: -97.7431, dist: 3.9, rating: 4.5, reviews: 9870,
    hours: '10:00 AM – 6:00 PM', price: '$$', priceNote: '$19 all ages',
    blurb: 'Hands-on exhibits on physics, electricity, and the human body, plus a maker space and live science demos.',
    grades: 'Pre-K–8', subjects: ['Science', 'Math'], duration: '2–4 hrs',
    highlights: ['Giant lever & pulley wall', 'Static electricity dome', 'Maker space', 'Live chemistry demos'],
    unit: {
      title: 'Forces You Can Feel',
      overview: 'A science center is the perfect place to feel physics in action. This unit turns play at the exhibits into an investigation of forces, simple machines, and energy.',
      objectives: [
        'Name three simple machines and give an example of each from the exhibits.',
        'Describe how a lever makes lifting easier.',
        'Explain what static electricity is in your own words.',
        'Record a simple experiment using the steps: question, guess, test, result.',
      ],
      vocab: [
        ['force', 'A push or a pull that can make something move.'],
        ['simple machine', 'A basic tool like a lever or pulley that makes work easier.'],
        ['lever', 'A stiff bar that turns on a point to lift or move a load.'],
        ['friction', 'A force that slows things down when they rub together.'],
        ['energy', 'The ability to do work or make something happen.'],
      ],
      activities: [
        { when: 'Before', text: 'Hunt for three simple machines around your home and list them.' },
        { when: 'During', text: 'At the lever wall, test lifting a weight close to and far from the pivot. Which is easier?' },
        { when: 'During', text: 'Touch the static dome (if able). Draw what happens to your hair and explain why.' },
        { when: 'After', text: 'Build a simple lever at home with a ruler and pencil. Lift a stack of coins.' },
        { when: 'After', text: 'Write up one exhibit as an experiment: question, guess, test, result.' },
      ],
      discussion: [
        'Why is it easier to lift something when you push far from the pivot point?',
        'Where do you use simple machines in everyday life?',
        'What is one thing you tested today that surprised you?',
      ],
      materials: ['Science notebook', 'Pencil', 'Ruler & coins (for home lever)', 'Curiosity!'],
    },
    deals: [
      { name: 'Homeschool Mornings', org: 'Discovery Science Center', save: '40% off', detail: 'Discounted entry Thursdays before noon.', tag: 'Admission', icon: 'ticket' },
      { name: 'Maker Space Pass', org: 'Discovery Science Center', save: 'Free with entry', detail: 'Hands-on build sessions included on homeschool days.', tag: 'Program', icon: 'spark' },
      { name: 'STEM Co-op Bundle', org: 'Austin Homeschool Alliance', save: '$12 / family', detail: 'Group classes monthly — robotics, circuits, chemistry.', tag: 'Class', icon: 'book' },
    ],
  },
  {
    id: 'fort', name: 'Old Harbor Fort', type: 'history', typeLabel: 'Historic Site',
    city: 'Charleston, SC', lat: 32.7765, lng: -79.9311, dist: 8.2, rating: 4.7, reviews: 6420,
    hours: '9:00 AM – 5:00 PM', price: '$', priceNote: '$15 adult · free under 16',
    blurb: 'A restored coastal fort with costumed interpreters, cannon demonstrations, and harbor-history exhibits.',
    grades: 'Grade 2–8', subjects: ['Social Studies', 'Geography'], duration: '2–3 hrs',
    highlights: ['Costumed living-history guides', 'Cannon firing demos', 'Original ramparts & barracks', 'Harbor history museum'],
    unit: {
      title: 'Life at the Fort',
      overview: 'Step back in time at a real historic fort. This unit helps learners imagine daily life in the past and understand why forts were built where they were.',
      objectives: [
        'Explain why a fort was built at this harbor location (geography + defense).',
        'Describe two parts of a soldier\u2019s daily routine at the fort.',
        'Read a primary source (a letter or order) and say what it tells us.',
        'Compare life then and now in three ways.',
      ],
      vocab: [
        ['fort', 'A strong building made to defend a place from attack.'],
        ['rampart', 'A thick protective wall around a fort.'],
        ['primary source', 'A record made by someone who was actually there.'],
        ['harbor', 'A sheltered place by the coast where ships can stay safely.'],
        ['garrison', 'The group of soldiers who lived in and defended a fort.'],
      ],
      activities: [
        { when: 'Before', text: 'Find the fort on a harbor map. Why is this a good spot to defend?' },
        { when: 'During', text: 'Interview a costumed guide. Write down two facts about daily life.' },
        { when: 'During', text: 'Watch the cannon demo and sketch how it works step by step.' },
        { when: 'After', text: 'Write a diary entry as a young person living at the fort for one day.' },
        { when: 'After', text: 'Make a "then vs. now" chart comparing fort life to your life.' },
      ],
      discussion: [
        'Why was controlling the harbor so important long ago?',
        'What would be the hardest part of living at the fort?',
        'How do primary sources help us know what really happened?',
      ],
      materials: ['History notebook', 'Pencil', 'Printed harbor map', 'Then-vs-now chart (generate below)'],
    },
    deals: [
      { name: 'Kids Free Year-Round', org: 'Old Harbor Fort', save: 'Free under 16', detail: 'Children always free with a paying adult.', tag: 'Admission', icon: 'ticket' },
      { name: 'Living History Saturdays', org: 'Old Harbor Fort', save: 'Included', detail: 'Costumed reenactments & drills, weekends.', tag: 'Program', icon: 'flag' },
      { name: 'Colonial Life Workshop', org: 'Lowcountry Homeschoolers', save: '$8', detail: 'Hands-on candle-making & writing with a quill, monthly.', tag: 'Workshop', icon: 'users' },
    ],
  },
];

/* Pre-typed suggestions to make the search feel alive */
const PLACE_SUGGESTIONS = ['Bay Aquarium', 'Greenwood Zoo', 'Hall of Natural History', 'Tall Pines State Park', 'Discovery Science Center', 'Old Harbor Fort'];

Object.assign(window, { PLACE_TYPES, PLACES, PLACE_SUGGESTIONS });
