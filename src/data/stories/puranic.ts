import type { Story } from '../types';
import { ref } from '../helpers';

const BP = 'bhagavata-purana';
const VP = 'vishnu-purana';

export const puranicStories: Story[] = [
  {
    id: 'origins-of-creation',
    title: 'How the Universe Began',
    subtitle: 'Vedic hymns, the cosmic egg and Brahma on the lotus',
    category: 'creation',
    era: 'cosmic',
    readingMinutes: 14,
    introduction:
      'Hindu tradition does not have one creation story — it has many, layered across three thousand years. Early Vedic hymns ask questions; the Upanishads seek the Self behind the world; the Puranas tell rich narratives of gods who create, preserve and dissolve the cosmos in endless cycles.',
    chapters: [
      {
        id: 'ch1', title: 'Before Being and Non-Being',
        narrative: [
          'The oldest reflection on creation in the tradition is the Nasadiya Sukta, a short hymn in the tenth book of the [[source:rigveda|Rigveda]]. It begins in the deepest possible darkness: "There was neither non-existence nor existence then; there was neither the realm of space nor the sky beyond."',
          'In that undivided state, "That One" (tad ekam) breathed, windless, by its own nature. Darkness was hidden by darkness. Then, through the power of heat — [[term:tapas|tapas]] — the One came into being. Desire arose, the first seed of mind, and the sages "found the bond of existence in non-existence".',
          '> "Who really knows? Who will here proclaim it? Whence was it produced, whence is this creation? … He who surveys it in the highest heaven, he surely knows — or perhaps he does not know."',
          'Few sacred texts end their account of creation by questioning whether even God knows. This humility — an openness to mystery — remains part of the tradition\'s intellectual temperament.',
        ],
        events: ['nasadiya'], concepts: ['tapas'],
      },
      {
        id: 'ch2', title: 'The Golden Embryo and the Cosmic Person',
        narrative: [
          'Other Vedic hymns offer images rather than questions. Rigveda 10.121 sings of [[term:hiranyagarbha|Hiranyagarbha]], the Golden Embryo, who arose in the beginning in the primeval waters and became the sole lord of creation, upholding earth and sky. Each verse ends with the refrain "To which god shall we offer our oblation?"',
          'The Purusha Sukta (Rigveda 10.90) imagines creation as a [[term:yajna|sacrifice]]. The gods offer up a cosmic Person, Purusha, thousand-headed and thousand-eyed, who extends beyond the universe. From his mind came the moon, from his eye the sun, from his mouth Indra and Agni, from his breath the wind, from his navel the atmosphere, from his head the sky, from his feet the earth.',
          'The hymn also describes the four [[term:varna|varnas]] emerging from Purusha\'s body — a verse whose interpretation, and use to justify hierarchy, has been debated for centuries. Many scholars consider this hymn among the latest in the Rigveda.',
        ],
        events: ['hiranyagarbha', 'purusha-sukta'], concepts: ['hiranyagarbha', 'yajna', 'varna'],
      },
      {
        id: 'ch3', title: 'The Self Who Was Alone',
        narrative: [
          'The Upanishads turn inward. "In the beginning this world was the Self alone, in the form of a person," says the [[source:brihadaranyaka-upanishad|Brihadaranyaka Upanishad]]. Looking around, he saw nothing but himself. He was afraid — then realised there was nothing else to fear. He was lonely, and so divided himself into two, man and woman, and from them all beings arose.',
          'The [[source:chandogya-upanishad|Chandogya Upanishad]] teaches that in the beginning there was only Being (sat), one without a second. Being thought, "May I become many," and brought forth heat, water and food. The world is that Being in many forms — and so is the listener: "tat tvam asi", you are that.',
          'Here creation is less an event in the distant past than a truth about the present: the [[term:atman|Self]] within is identical with the [[term:brahman|ground of all being]].',
        ],
        concepts: ['atman', 'brahman'],
      },
      {
        id: 'ch4', title: 'Vishnu Dreams the World',
        narrative: [
          'The Puranas weave these ideas into narrative. At the end of a cosmic cycle, all is dissolved into a single ocean. Upon it floats [[char:vishnu|Vishnu]] as Narayana, asleep on the coils of the thousand-headed serpent Shesha (also called Ananta, "endless"), with [[char:lakshmi|Lakshmi]] at his feet.',
          'When the time comes to create again, a lotus grows from Vishnu\'s navel. Its petals open, and upon it sits [[char:brahma|Brahma]], four-faced, looking in every direction. He does not know where he came from. He climbs down the lotus stalk for a thousand years without finding its root. Then he hears a voice say "tapa" — practise austerity. He sits in meditation, and when he is ready, Vishnu grants him the vision of what he must create.',
          '> In the Shaiva tradition, by contrast, Brahma and Vishnu themselves are humbled before Shiva\'s infinite pillar of light; in the Shakta tradition, all three gods arise from the Goddess.',
        ],
        events: ['brahma-lotus', 'lingodbhava'],
      },
      {
        id: 'ch5', title: 'The First Beings',
        narrative: [
          'Brahma begins with mistakes. His first creations — ignorance, darkness, delusion — he casts away. The four Kumaras, eternal children, refuse to have descendants and remain ascetics. Brahma\'s frustration becomes Rudra, born from his brow in some accounts.',
          'Then he creates the mind-born sons who will father the world: [[char:marichi|Marichi]], [[char:atri|Atri]], [[char:angiras|Angiras]], [[char:pulastya|Pulastya]], Pulaha, Kratu, [[char:vashistha|Vashistha]], [[char:bhrigu|Bhrigu]], [[char:daksha|Daksha]] and [[char:narada|Narada]]. Lists vary between Puranas.',
          'Finally Brahma divides his own body into male and female — [[char:swayambhuva-manu|Swayambhuva Manu]] and Shatarupa — the first human couple, parents of the earliest royal lines. Through Daksha\'s daughters and Marichi\'s son [[char:kashyapa|Kashyapa]], gods, demons, serpents and birds all come into being as one great family.',
        ],
        events: ['mind-born-sons', 'swayambhuva', 'daksha-daughters'],
      },
      {
        id: 'ch6', title: 'Wheels Within Wheels of Time',
        narrative: [
          'Creation, the Puranas insist, is not a single event. It recurs. The basic unit is the mahayuga of four [[term:yuga|yugas]] — Satya, Treta, Dvapara and Kali — in which dharma steadily declines. A thousand mahayugas make a [[term:kalpa|kalpa]], a single day of Brahma; his night is as long, and at its start the worlds dissolve in [[term:pralaya|pralaya]].',
          'Each kalpa is divided into fourteen [[term:manvantara|manvantaras]], each ruled by its own Manu, Indra and seven sages. We live in the Kali Yuga of the seventh manvantara, that of [[char:vaivasvata-manu|Vaivasvata Manu]], in the first day of the fifty-first year of Brahma\'s life.',
          'This vast, cyclical time-scale gives Hindu mythology its distinctive perspective: Indra is an office held by different beings in different ages, Vishnu\'s avatars recur, and even Brahma eventually dies and is replaced.',
        ],
        events: ['yugas'], concepts: ['yuga', 'kalpa', 'manvantara', 'pralaya'],
      },
    ],
    characters: ['brahma', 'vishnu', 'shiva', 'devi', 'lakshmi', 'swayambhuva-manu', 'kashyapa', 'daksha'],
    events: ['nasadiya', 'hiranyagarbha', 'purusha-sukta', 'brahma-lotus', 'mind-born-sons', 'yugas'],
    consequences: ['The mind-born sons and Manu become progenitors of every later lineage.', 'The cyclical time-scale frames the avatars and the epics.'],
    whyItMatters: 'These narratives set up the cast and stage of the entire mythology — and show its comfort with multiple, coexisting explanations.',
    philosophicalMeaning: 'Creation accounts move from speculation (Rigveda) to inner realisation (Upanishads) to devotional narrative (Puranas). Each implies a different relationship between the world and the divine.',
    relatedStories: ['samudra-manthana', 'daksha-yajna'],
    familyTree: 'cosmic-divine',
    sources: [ref('rigveda', 'Mandala 10'), ref('brihadaranyaka-upanishad', 'Chapter 1'), ref('chandogya-upanishad', 'Chapter 6'), ref(BP, 'Skandha 3'), ref(VP, 'Book 1')],
    variations: [
      {
        title: 'Who is the first cause?',
        primary: { tradition: 'Vaishnava Puranas', account: 'Vishnu-Narayana is the source; Brahma is born on his navel lotus.' },
        alternate: { tradition: 'Shaiva Puranas / Devi Mahatmya', account: 'Shiva (as the infinite linga) or the Goddess is the source of both Brahma and Vishnu.' },
        difference: 'The identity of the supreme deity.',
        shared: 'Brahma as the demiurge; cyclical time; creation through austerity and thought.',
        whyItMatters: 'Hindu traditions share a narrative vocabulary while differing on theology.',
      },
    ],
    quizId: 'quiz-origins',
  },
  {
    id: 'samudra-manthana',
    title: 'The Churning of the Ocean',
    subtitle: 'Samudra Manthana — the quest for the nectar of immortality',
    category: 'deva-asura',
    era: 'puranic',
    readingMinutes: 18,
    introduction:
      'One of the most celebrated stories in Hindu mythology, the churning of the milky ocean brings together devas and asuras, Vishnu, Shiva, a mountain, a serpent king and a cascade of divine treasures. It is told in the Mahabharata\'s Adi Parva, the Vishnu Purana and the Bhagavata Purana, with differing details.',
    chapters: [
      {
        id: 'ch1', title: 'Why the Gods Lost Their Power',
        narrative: [
          'The devas, led by [[char:indra|Indra]], ruled the heavens in splendour. But splendour breeds carelessness. In the [[source:vishnu-purana|Vishnu Purana]]\'s telling, the gods had grown proud, and their fortune — personified as Shri, the goddess [[char:lakshmi|Lakshmi]] — depended on their virtue.',
          'In other tellings, such as the Mahabharata\'s, there is no curse at all: the gods simply desire [[term:amrita|amrita]], the nectar of immortality, and gather on Mount Meru to consider how to obtain it.',
        ],
      },
      {
        id: 'ch2', title: 'The Curse of Durvasa',
        narrative: [
          'The sage [[char:durvasa|Durvasa]], wandering in a state of ecstasy, received a garland of heavenly flowers from a celestial maiden. Seeing Indra riding his elephant Airavata, he offered him the garland. Indra placed it on the elephant\'s head; the elephant, irritated by its scent, threw it to the ground and trampled it.',
          'Durvasa\'s fury was terrible. "Because you have disdained my gift, your sovereignty over the three worlds will be lost." Lakshmi withdrew from the heavens. The plants withered, sacrifices ceased, and the devas grew weak. The asuras, led by [[char:bali|Bali]] in the Bhagavata, seized their chance and drove the gods from heaven.',
        ],
        events: ['samudra-manthana-event'],
      },
      {
        id: 'ch3', title: 'An Uneasy Alliance',
        narrative: [
          'Defeated, the gods went to [[char:brahma|Brahma]], who led them to [[char:vishnu|Vishnu]]. Vishnu\'s counsel was surprising: make peace with the asuras. Together, churn the Ocean of Milk, and from its depths will rise the amrita. "I will see," he promised, "that the asuras share in the labour but not in the nectar."',
          'Indra approached the asuras with an offer of partnership. Bali agreed. For the moment, the eternal half-brothers — all sons of [[char:kashyapa|Kashyapa]] — would work as one.',
        ],
      },
      {
        id: 'ch4', title: 'Mount Mandara and Vasuki',
        narrative: [
          'They needed a churning rod vast enough for an ocean. They uprooted Mount Mandara, but it was so heavy that many devas and asuras were crushed as they carried it; Vishnu, riding [[char:garuda|Garuda]], set it in the sea.',
          'For a rope they enlisted [[char:vasuki|Vasuki]], king of the serpents, promised a share of the nectar. He was wound around the mountain. Vishnu arranged that the asuras take the head end — they insisted, thinking the tail unworthy of them — and so it was the asuras who suffered the flames and fumes of Vasuki\'s breath, while the devas held the tail.',
        ],
      },
      {
        id: 'ch5', title: 'The Churning Begins',
        narrative: [
          'Pulling back and forth, they began to churn. But the mountain had no base and began to sink into the ocean floor. Vishnu then took the form of a vast tortoise, [[char:kurma|Kurma]], and dived beneath it, bearing Mandara on his shell — his second avatar. In some accounts he also took a third form, pressing down on the mountain\'s peak to hold it steady, and entered the gods and asuras to strengthen them.',
          'The churning went on for ages. Trees and creatures of the mountain were crushed, and their juices mixed into the ocean, which turned to milk and then to ghee.',
        ],
      },
      {
        id: 'ch6', title: 'The Halahala Poison',
        narrative: [
          'Before any treasure appeared, the ocean produced something terrible: [[term:halahala|halahala]], a poison so potent that its fumes began to destroy all the worlds. Devas and asuras fled.',
          'They prayed to [[char:shiva|Shiva]]. Out of compassion, he gathered the poison in his palm and drank it. [[char:parvati|Parvati]] pressed his throat so it would not descend into his body, where the universe resides. The poison stayed there, turning his throat blue — and so he is called Nilakantha, the blue-throated. A few drops that spilled became the venom of snakes, scorpions and poisonous plants.',
          '> This episode appears mainly in the Puranas; the Mahabharata\'s Adi Parva also mentions Shiva swallowing the poison.',
        ],
        concepts: ['halahala'],
      },
      {
        id: 'ch7', title: 'The Emergence of Divine Treasures',
        narrative: [
          'Now the ocean yielded wonders — traditionally fourteen ratnas (jewels), though lists vary. They included: Kamadhenu, the wish-fulfilling cow, given to the sages; Uchchaihshravas, the seven-headed white horse; Airavata, the white elephant, taken by Indra; the Kaustubha gem, which Vishnu wears on his chest; the Parijata tree and the Kalpavriksha, wish-granting trees placed in Indra\'s paradise; the apsaras, celestial dancers; Varuni, goddess of wine; and the moon, which Shiva placed on his head.',
          'Then, seated on a lotus, radiant, rose [[char:lakshmi|Lakshmi]] herself. The gods bathed her; the ocean gave her a garland of unfading lotuses. Looking at all present, she chose [[char:vishnu|Vishnu]] as her eternal consort. With her return, fortune returned to the gods.',
        ],
      },
      {
        id: 'ch8', title: 'Dhanvantari and the Amrita',
        narrative: [
          'At last there emerged Dhanvantari, the divine physician and father of Ayurveda, holding a pot of [[term:amrita|amrita]]. The moment the asuras saw it, they snatched it away and began quarrelling among themselves over who would drink first.',
        ],
      },
      {
        id: 'ch9', title: 'Mohini Distributes the Nectar',
        narrative: [
          'Vishnu then assumed the form of [[char:mohini|Mohini]], an enchantress of overwhelming beauty. The asuras, captivated, gave her the pot and agreed to let her distribute it, seating devas and asuras in two rows.',
          'Mohini served the devas first, beguiling the asuras with her glances. But one asura, Svarbhanu, disguised himself as a god and sat between [[char:surya|Surya]] and [[char:chandra|Chandra]]. As he drank, the Sun and Moon recognised him and cried out. Vishnu hurled his discus and severed his head. Since the amrita had touched his throat, the head (Rahu) and body (Ketu) became immortal — and to this day they pursue the sun and moon, swallowing them in eclipses.',
        ],
      },
      {
        id: 'ch10', title: 'The Consequences',
        narrative: [
          'Realising they had been cheated, the asuras attacked. Strengthened by the nectar, the devas won the great battle that followed, and Indra regained his throne.',
          'The story echoes everywhere: drops of amrita are said to have fallen at Prayagraj, Haridwar, Ujjain and Nashik, where the Kumbha Mela is held. Kurma and Mohini became recognised forms of Vishnu. And the eternal enmity of Rahu with the sun and moon became part of Indian astronomy and astrology.',
        ],
      },
    ],
    characters: ['indra', 'durvasa', 'brahma', 'vishnu', 'bali', 'vasuki', 'kurma', 'shiva', 'parvati', 'lakshmi', 'mohini', 'surya', 'chandra', 'garuda'],
    events: ['samudra-manthana-event'],
    consequences: ['The devas gain immortality and recover heaven.', 'Lakshmi becomes Vishnu\'s consort.', 'Rahu and Ketu cause eclipses.', 'Origin of the Kumbha Mela sites.'],
    whyItMatters: 'It connects many major figures and explains numerous cosmic and ritual realities.',
    philosophicalMeaning: 'Commonly read as an allegory of spiritual practice: the mind (ocean) must be churned through discipline (the mountain) with the cooperation of opposing tendencies; poison emerges before nectar, and grace (Shiva, Vishnu) is needed to bear it and to keep the reward from the ego.',
    relatedStories: ['vamana-bali', 'prahlada-narasimha'],
    sources: [ref('mahabharata', 'Adi Parva (Astika Parva)'), ref(VP, 'Book 1'), ref(BP, 'Skandha 8')],
    variations: [
      {
        title: 'Why did the churning happen?',
        primary: { tradition: 'Vishnu Purana & Bhagavata Purana', account: 'Durvasa\'s curse caused the gods to lose their fortune.' },
        alternate: { tradition: 'Mahabharata, Adi Parva', account: 'The gods simply wished to obtain amrita; no curse is mentioned.' },
        difference: 'The presence of a moral cause.',
        shared: 'The mountain, the serpent, the treasures, Mohini and Rahu.',
        whyItMatters: 'The Puranic version turns the story into a lesson about humility and fortune.',
      },
    ],
    quizId: 'quiz-samudra',
  },
  {
    id: 'prahlada-narasimha',
    title: 'Prahlada and Narasimha',
    subtitle: 'The child devotee and the man-lion',
    category: 'avatar',
    era: 'puranic',
    readingMinutes: 12,
    introduction: 'A tyrant king with an "unbreakable" boon, a child whose devotion cannot be shaken, and a god who appears from a pillar. This is the central narrative of the seventh skandha of the Bhagavata Purana.',
    chapters: [
      {
        id: 'ch1', title: 'The Gatekeepers\' Curse',
        narrative: [
          'The Bhagavata begins with a backstory. Jaya and Vijaya, gatekeepers of Vishnu\'s realm Vaikuntha, barred the four child-sages, the Kumaras, from entering. The sages cursed them to be born as demons. Vishnu offered a choice: seven births as devotees, or three as his enemies. To return to him sooner, they chose enmity.',
          'Their first birth was as [[char:hiranyaksha|Hiranyaksha]] and [[char:hiranyakashipu|Hiranyakashipu]], sons of [[char:diti|Diti]]. Hiranyaksha dragged the earth into the cosmic waters and was slain by [[char:varaha|Varaha]].',
        ],
        events: ['varaha-event'],
      },
      {
        id: 'ch2', title: 'An Almost Perfect Boon',
        narrative: [
          'Grieving and enraged, Hiranyakashipu went to Mount Mandara and practised austerities so intense that his body was eaten away by ants. Smoke rose from his head and threatened the heavens. [[char:brahma|Brahma]] came, restored his body and offered a boon.',
          'He asked for immortality. Brahma could not give it. So he asked for its legal equivalent: not to be killed by any being created by Brahma; not inside or outside; not by day or night; not on the ground or in the sky; not by any weapon; not by man or beast, god or demon.',
          'Armed with this, he conquered the three worlds and decreed that he alone be worshipped.',
        ],
        concepts: ['boon', 'tapas'],
      },
      {
        id: 'ch3', title: 'A Devotee in the Demon\'s House',
        narrative: [
          'While Hiranyakashipu was away doing penance, Indra carried off his pregnant queen Kayadhu. [[char:narada|Narada]] intervened and sheltered her in his hermitage, where he taught her about devotion to Vishnu. The child in her womb, [[char:prahlada|Prahlada]], absorbed every word.',
          'Back at the palace, the boy\'s teachers — sons of [[char:shukra|Shukra]] — taught him statecraft. When his father asked what was the best thing he had learned, Prahlada answered: to hear about Vishnu, to sing his praises, to remember him, to serve him. Hiranyakashipu was horrified.',
        ],
      },
      {
        id: 'ch4', title: 'The Trials of Prahlada',
        narrative: [
          'The king ordered his son killed. Demons stabbed him with spears; he felt nothing. He was thrown under elephants, bitten by serpents, thrown from cliffs, poisoned, starved — all failed, because Prahlada remained absorbed in Vishnu.',
          'In a popular telling, Hiranyakashipu\'s sister Holika, who could not be burned, sat in a fire holding Prahlada. Holika burned to ash, and Prahlada emerged untouched. This is remembered on the night before Holi with bonfires (Holika Dahan). The Holika episode is a folk and later Puranic tradition rather than part of the Bhagavata\'s core narrative.',
        ],
      },
      {
        id: 'ch5', title: 'The Pillar',
        narrative: [
          '"Where is this Vishnu of yours?" roared Hiranyakashipu. "He is everywhere," said Prahlada. "Is he in this pillar?" "Yes." The king struck the pillar with his fist.',
          'With a sound that shook the universe, the pillar split, and out came a form never seen before — [[char:narasimha|Narasimha]], with a lion\'s head and a man\'s body, blazing eyes and claws like thunderbolts.',
          'It was twilight — neither day nor night. Narasimha dragged Hiranyakashipu to the threshold of the hall — neither inside nor outside — placed him on his lap — neither earth nor sky — and tore him apart with his claws — no weapon. He was neither man nor beast, and not a being created by Brahma. Every condition of the boon was honoured, and every one was defeated.',
        ],
        events: ['narasimha-event'],
      },
      {
        id: 'ch6', title: 'Calming the Lion',
        narrative: [
          'Narasimha\'s fury did not subside. The gods, even Lakshmi, were afraid to approach. Brahma sent the boy Prahlada, who sang hymns of praise. Narasimha licked the child lovingly and offered him any boon. Prahlada asked only that he never desire anything for himself, and that his father be forgiven. Narasimha assured him that twenty-one generations of his family were purified.',
          'Prahlada became a righteous king. His grandson was [[char:bali|Bali]], the generous emperor whom [[char:vamana|Vamana]] would humble.',
        ],
      },
    ],
    characters: ['prahlada', 'hiranyakashipu', 'hiranyaksha', 'narasimha', 'varaha', 'brahma', 'narada', 'vishnu', 'diti'],
    events: ['varaha-event', 'narasimha-event'],
    whyItMatters: 'Prahlada is the archetypal bhakta; Narasimha embodies the idea that divine protection will find a way through any obstacle.',
    philosophicalMeaning: 'The boon shows the limits of legalistic cleverness: every category the ego can devise has a "between". Devotion, not power, is what endures.',
    relatedStories: ['vamana-bali', 'samudra-manthana'],
    sources: [ref(BP, 'Skandha 7'), ref(VP, 'Book 1'), ref('folk', undefined, 'regional-folk', 'Holika episode')],
    quizId: 'quiz-avatars',
  },
  {
    id: 'vamana-bali',
    title: 'Vamana and Bali',
    subtitle: 'Three steps that measured the universe',
    category: 'avatar',
    era: 'puranic',
    readingMinutes: 9,
    introduction: 'The generous asura emperor Bali has conquered heaven. Vishnu comes not as a warrior but as a small boy asking for a little land.',
    chapters: [
      {
        id: 'ch1', title: 'The Emperor of Three Worlds',
        narrative: [
          '[[char:bali|Bali]], grandson of [[char:prahlada|Prahlada]], was revived by [[char:shukra|Shukra]] after his defeat at the churning of the ocean and, through the sacrifices Shukra performed, grew invincible. He drove [[char:indra|Indra]] from heaven. Yet he ruled justly and was famous for never refusing a request.',
          'Distraught, [[char:aditi|Aditi]], mother of the gods, performed the payovrata vow. Vishnu promised to be born as her son.',
        ],
      },
      {
        id: 'ch2', title: 'The Dwarf at the Sacrifice',
        narrative: [
          'Vishnu was born as [[char:vamana|Vamana]], a brahmin boy of radiant short stature, younger brother of Indra. Bali was performing a great ashvamedha on the banks of the Narmada. The boy came and was welcomed. "Ask anything," Bali said.',
          '"Only as much land as I can cover in three steps." Shukra recognised Vishnu and warned Bali that he would lose everything. Bali replied that he would not break his word — if it was Vishnu, so much the greater the honour. He poured water to seal the gift. (A popular story says Shukra, as a bee, blocked the spout of the vessel and was blinded in one eye by Vamana\'s blade of grass.)',
        ],
      },
      {
        id: 'ch3', title: 'Trivikrama',
        narrative: [
          'Vamana grew. His body filled the universe. With his first step he covered the earth; with his second, the heavens and beyond, his toe piercing the shell of the cosmos — from which, some Puranas say, the heavenly Ganga began to flow. There was no room for a third step.',
          'Bali bowed and offered his head. Vamana placed his foot on it and pushed him down to Sutala, a netherworld more splendid than heaven, where he was made king. Vishnu himself became his doorkeeper, and Bali was promised the throne of Indra in a future manvantara.',
          'In Kerala, Mahabali is remembered as a beloved king whose reign was a golden age; Onam celebrates his annual visit to his people.',
        ],
        events: ['vamana-event'],
      },
    ],
    characters: ['vamana', 'bali', 'shukra', 'aditi', 'indra', 'prahlada', 'vishnu'],
    events: ['vamana-event'],
    whyItMatters: 'A Vedic image — Vishnu\'s three strides — becomes a moral tale of generosity, humility and the limits of power.',
    philosophicalMeaning: 'Bali\'s surrender of his head (ego) is seen as complete self-offering. The story also asks whether a just "demon" was wronged — a question Kerala\'s tradition answers by honouring him.',
    relatedStories: ['prahlada-narasimha'],
    sources: [ref('rigveda', 'Mandala 1', 'tradition', 'Three strides'), ref(BP, 'Skandha 8'), ref('folk', undefined, 'regional-folk', 'Onam')],
    variations: [
      {
        title: 'Villain or hero?',
        primary: { tradition: 'Bhagavata Purana', account: 'Bali is a devotee whose surrender is rewarded; Vamana restores cosmic order.' },
        alternate: { tradition: 'Kerala folk tradition', account: 'Mahabali is the ideal king of a golden age, unjustly removed, who returns each Onam.' },
        difference: 'Whose loss is emphasised.',
        shared: 'Bali\'s generosity and his honoured place in the netherworld.',
      },
    ],
    quizId: 'quiz-avatars',
  },
  {
    id: 'dhruva',
    title: 'Dhruva, the Steadfast Child',
    subtitle: 'How a five-year-old became the Pole Star',
    category: 'sage',
    era: 'lineages',
    readingMinutes: 8,
    introduction: 'A story of hurt, resolve and grace from the earliest royal lineage of humankind — told in the Vishnu and Bhagavata Puranas.',
    chapters: [
      {
        id: 'ch1', title: 'Pushed from His Father\'s Lap',
        narrative: [
          'King [[char:uttanapada|Uttanapada]], son of [[char:swayambhuva-manu|Swayambhuva Manu]], had two queens. He doted on Suruchi and her son Uttama; Suniti and her son [[char:dhruva|Dhruva]] were neglected.',
          'One day little Dhruva tried to climb into his father\'s lap beside Uttama. Suruchi pulled him away: "If you wanted to sit there, you should have been born from my womb. Go and pray to Vishnu to be reborn as my son!" The king said nothing.',
          'Weeping, Dhruva ran to his mother. Suniti said gently: "Do not wish ill on anyone. If you seek a place no one can take from you, seek it from Vishnu."',
        ],
      },
      {
        id: 'ch2', title: 'Into the Forest',
        narrative: [
          'Dhruva left for the forest. [[char:narada|Narada]] met him and tested his resolve — "You are only a child; this anger will pass" — but Dhruva would not turn back. Narada taught him the twelve-syllable mantra "Om Namo Bhagavate Vasudevaya" and sent him to Madhuvana on the Yamuna.',
          'Dhruva\'s austerity deepened month by month: he ate fruit, then leaves, then only water, then only air. In the fifth month he stood on one foot, his breath held, his mind fixed on Vishnu. The cosmos itself began to choke, for the boy held within him the breath of all beings.',
        ],
        events: ['dhruva-event'],
      },
      {
        id: 'ch3', title: 'The Unmoving Star',
        narrative: [
          '[[char:vishnu|Vishnu]] appeared. Dhruva, overwhelmed, could not speak. Vishnu touched his cheek with his conch, and words of praise poured out of the child.',
          'Dhruva realised that he no longer wanted his father\'s kingdom. But Vishnu granted it anyway: he would rule for thousands of years, and then ascend to a place above even the seven sages — the fixed point around which the heavens revolve, Dhruva Nakshatra, the Pole Star.',
          'Dhruva returned home, was welcomed by his repentant father, and became a just king. From his line, generations later, came [[char:prithu|Prithu]].',
        ],
      },
    ],
    characters: ['dhruva', 'uttanapada', 'swayambhuva-manu', 'narada', 'vishnu', 'prithu'],
    events: ['swayambhuva', 'dhruva-event', 'prithu-event'],
    whyItMatters: 'One of the most loved children\'s stories in India, and a classic of bhakti and tapas.',
    philosophicalMeaning: 'Dhruva begins seeking worldly status and ends finding something greater; desire, purified by practice, becomes devotion.',
    relatedStories: ['prahlada-narasimha', 'origins-of-creation'],
    sources: [ref(VP, 'Book 1'), ref(BP, 'Skandha 4')],
    quizId: 'quiz-origins',
  },
  {
    id: 'descent-of-ganga',
    title: 'The Descent of Ganga',
    subtitle: 'Sagara\'s sons, Bhagiratha\'s tapas and Shiva\'s locks',
    category: 'dynastic',
    era: 'solar',
    readingMinutes: 10,
    introduction: 'Vishvamitra tells this story to the young Rama in the Bala Kanda — the tale of how his own ancestors brought the river of heaven to earth.',
    chapters: [
      {
        id: 'ch1', title: 'The Lost Horse',
        narrative: [
          'King [[char:sagara|Sagara]] of Ayodhya performed the ashvamedha. [[char:indra|Indra]], fearful of the king\'s rising power, stole the sacrificial horse.',
          'Sagara\'s sixty thousand sons searched the whole earth, then began digging into it, each digging a league. Beneath the earth, in the east, they found the horse grazing beside the sage Kapila (described in the Ramayana as Vasudeva/Vishnu in the form of Kapila). Taking him for the thief, they rushed at him. Kapila uttered a sound — "hum" — and they were burned to ashes.',
        ],
        events: ['sagara-sons'],
      },
      {
        id: 'ch2', title: 'Generations of Failure',
        narrative: [
          'Sagara\'s grandson Amshuman found the ashes and the horse. Garuda, the brothers\' maternal uncle, told him that only the waters of the heavenly Ganga could purify them and allow them to reach heaven.',
          'Amshuman performed austerities for his whole life without success. So did his son Dilipa. It was Dilipa\'s son [[char:bhagiratha|Bhagiratha]] who renounced his kingdom and went to Gokarna to perform a thousand years of tapas.',
        ],
      },
      {
        id: 'ch3', title: 'Shiva Catches the River',
        narrative: [
          '[[char:brahma|Brahma]] was pleased and granted that [[char:ganga|Ganga]] would descend. But who could bear the impact? Only [[char:shiva|Shiva]]. Bhagiratha performed another year of austerity, standing on his toe, until Shiva agreed.',
          'Ganga, proud and resentful, plunged down intending to sweep Shiva into the underworld. Shiva caught her in his matted locks and held her there, lost and wandering, for years. Bhagiratha prayed again, and Shiva released her in seven streams.',
          'The river followed Bhagiratha\'s chariot. When she flooded the hermitage of the sage Jahnu, he drank her up and released her only from his ear — so she is Jahnavi, daughter of Jahnu. At last she flowed into the ocean and down into the underworld, and her waters touched the ashes. The sixty thousand sons of Sagara ascended to heaven.',
        ],
        events: ['ganga-descent'],
      },
    ],
    characters: ['sagara', 'bhagiratha', 'ganga', 'shiva', 'brahma', 'indra', 'vishvamitra', 'rama'],
    events: ['sagara-sons', 'ganga-descent'],
    whyItMatters: 'Explains the sanctity of the Ganga, the name "Bhagirathi", and the ancestral merit of the Solar dynasty.',
    philosophicalMeaning: 'Grace (the river) is unbearable without the right vessel (Shiva); human perseverance across generations prepares its descent.',
    relatedStories: ['rama-early-life', 'bhishma-vow-story'],
    familyTree: 'solar',
    sources: [ref('valmiki-ramayana', 'Bala Kanda'), ref(BP, 'Skandha 9'), ref('mahabharata', 'Vana Parva')],
    quizId: 'quiz-solar',
  },
  {
    id: 'daksha-yajna',
    title: 'Sati and the Sacrifice of Daksha',
    subtitle: 'Love, insult and the wrath of Shiva',
    category: 'divine-conflict',
    era: 'puranic',
    readingMinutes: 10,
    introduction: 'A family quarrel among the gods with cosmic consequences — and, in later tradition, the origin of the Shakti Pithas.',
    chapters: [
      {
        id: 'ch1', title: 'The Ascetic Son-in-Law',
        narrative: [
          '[[char:sati|Sati]], daughter of [[char:daksha|Daksha]], loved [[char:shiva|Shiva]] from childhood. Daksha disapproved: Shiva lived in cremation grounds, smeared with ash, attended by ghosts. Yet Sati married him.',
          'At a gathering of the gods, Shiva did not rise to greet Daksha. Daksha felt insulted and cursed Shiva to be excluded from sacrificial shares — the start of a lasting enmity.',
        ],
      },
      {
        id: 'ch2', title: 'The Uninvited Daughter',
        narrative: [
          'Daksha organised a vast sacrifice and invited every god — except Shiva. Sati, seeing the celestials flying past, insisted on going. Shiva warned her, but she went.',
          'At the sacrifice, her father ignored her and mocked her husband. Sati declared that she could not live in a body born from such a man. Sitting in meditation, she invoked the inner fire of yoga and gave up her body.',
        ],
        events: ['daksha-yajna-event'],
      },
      {
        id: 'ch3', title: 'Virabhadra',
        narrative: [
          'When Shiva heard, he tore a lock of his hair and dashed it to the ground. From it arose Virabhadra, a terrible warrior, and Bhadrakali. They stormed the sacrifice, scattered the gods, and Virabhadra beheaded Daksha.',
          'Afterwards, appeased by the gods, Shiva restored the sacrifice to completion and revived Daksha with the head of a goat. Daksha praised Shiva.',
        ],
      },
      {
        id: 'ch4', title: 'The Shakti Pithas',
        narrative: [
          'Later traditions — especially Shakta texts and medieval works — add that Shiva, mad with grief, wandered the universe carrying Sati\'s body, threatening cosmic dissolution. [[char:vishnu|Vishnu]] used his discus to cut the body into pieces; where each fell, a Shakti Pitha arose — sacred seats of the Goddess, counted as 51, 52 or 108 depending on the tradition, such as Kamakhya in Assam.',
          'Sati was reborn as [[char:parvati|Parvati]], daughter of [[char:himavan|Himavan]].',
        ],
        events: ['parvati-tapas'],
      },
    ],
    characters: ['sati', 'daksha', 'shiva', 'vishnu', 'parvati', 'himavan', 'devi'],
    events: ['daksha-yajna-event', 'parvati-tapas'],
    whyItMatters: 'Explains Shiva\'s relationship to the Vedic sacrificial order and the sacred geography of the Goddess.',
    philosophicalMeaning: 'Often read as ritual pride (Daksha) versus the transcendent (Shiva) that ritual cannot contain.',
    relatedStories: ['ganesha-origin', 'devi-mahatmya'],
    sources: [ref(BP, 'Skandha 4'), ref('shiva-purana', 'Rudra Samhita, Sati Khanda'), ref('devi-bhagavata-purana', undefined, 'tradition', 'Shakti Pitha tradition')],
    variations: [
      {
        title: 'How did Sati die, and what followed?',
        primary: { tradition: 'Bhagavata & Shiva Puranas', account: 'Sati gives up her body through yogic fire; Virabhadra destroys the sacrifice.' },
        alternate: { tradition: 'Later Shakta traditions', account: 'Shiva carries her body; Vishnu dismembers it and the pieces become Shakti Pithas.' },
        difference: 'The Shakti Pitha narrative.',
        whyItMatters: 'It maps the Goddess onto the land of South Asia as a network of pilgrimage sites.',
      },
    ],
    quizId: 'quiz-shaiva',
  },
  {
    id: 'ganesha-origin',
    title: 'The Birth of Ganesha',
    subtitle: 'The guardian at Parvati\'s door',
    category: 'divine-conflict',
    era: 'puranic',
    readingMinutes: 7,
    introduction: 'Why does the remover of obstacles have an elephant\'s head, and why is he worshipped before every other god?',
    chapters: [
      {
        id: 'ch1', title: 'A Son of Her Own',
        narrative: [
          'On [[place:kailash|Kailash]], [[char:parvati|Parvati]]\'s attendants complained that Shiva\'s ganas entered her chambers at will. Parvati wanted a guard loyal only to her. In the [[source:shiva-purana|Shiva Purana]], she formed a handsome boy from the turmeric paste of her bath, gave him life, and set him at her door with a staff.',
        ],
      },
      {
        id: 'ch2', title: 'The Battle at the Door',
        narrative: [
          '[[char:shiva|Shiva]] returned and was refused entry by the boy. Shiva\'s ganas attacked and were beaten back. The gods joined; even they could not defeat him. At last, while Vishnu distracted the boy, Shiva cut off his head with his trident.',
          'Parvati\'s grief became rage. She manifested countless fierce goddesses who began to devastate the universe. The gods pleaded with her; she relented on two conditions: that her son be restored, and that he be honoured among the gods.',
        ],
        events: ['ganesha-birth'],
      },
      {
        id: 'ch3', title: 'Lord of the Ganas',
        narrative: [
          'Shiva sent his ganas north to bring the head of the first creature they met. They found an elephant with a single tusk. Shiva placed its head on the boy\'s body and revived him.',
          'Shiva named him [[char:ganesha|Ganapati]], lord of the ganas, and decreed that he be worshipped first in every ritual; anyone who failed would meet obstacles. Hence he is Vighneshvara, lord of obstacles — remover for the devoted, placer for the proud.',
          'A famous sequel: Ganesha and his brother [[char:kartikeya|Kartikeya]] were challenged to race around the world. Kartikeya set off on his peacock; Ganesha walked around his parents, saying they were his world, and won.',
        ],
      },
    ],
    characters: ['ganesha', 'parvati', 'shiva', 'kartikeya', 'vishnu'],
    events: ['ganesha-birth'],
    whyItMatters: 'Ganesha is perhaps the most widely worshipped Hindu deity; this story explains his form and his precedence.',
    philosophicalMeaning: 'Often interpreted as the ego (the boy) being cut off and replaced with wisdom (the elephant).',
    relatedStories: ['daksha-yajna'],
    sources: [ref('shiva-purana', 'Rudra Samhita, Kumara Khanda'), ref('folk', undefined, 'later-interpretation', 'Race around the world')],
    variations: [
      {
        title: 'The loss of the head',
        primary: { tradition: 'Shiva Purana', account: 'Shiva beheads the boy in battle.' },
        alternate: { tradition: 'Brahmavaivarta Purana', account: 'Shani\'s gaze causes the head to fall.' },
        difference: 'Who causes the loss.',
        shared: 'Restoration with an elephant head and elevation above other gods.',
      },
    ],
    quizId: 'quiz-shaiva',
  },
  {
    id: 'devi-mahatmya',
    title: 'The Glory of the Goddess',
    subtitle: 'Devi Mahatmya — Durga and the buffalo demon',
    category: 'divine-conflict',
    era: 'puranic',
    readingMinutes: 11,
    introduction: 'Told in the Markandeya Purana as a story within a story, the Devi Mahatmya presents the Goddess as the supreme power who saves the gods when they cannot save themselves.',
    chapters: [
      {
        id: 'ch1', title: 'The Frame: A King and a Merchant',
        narrative: [
          'King Suratha, betrayed and deposed, wanders into the forest and meets Samadhi, a merchant cast out by his greedy family. Both are still attached to those who wronged them. They ask the sage Medhas why. He answers: it is the power of Mahamaya, the great illusion — the Goddess herself, who binds beings and also frees them. He then narrates three episodes of her glory.',
        ],
      },
      {
        id: 'ch2', title: 'Madhu and Kaitabha',
        narrative: [
          'At the end of a cosmic cycle, two demons, Madhu and Kaitabha, sprang from the wax of Vishnu\'s ears as he slept, and attacked Brahma on the lotus. Brahma praised the Goddess as Yoganidra — the sleep holding Vishnu. She withdrew from Vishnu\'s eyes; he awoke, fought the demons for five thousand years, and killed them.',
        ],
      },
      {
        id: 'ch3', title: 'The Birth of the Goddess',
        narrative: [
          'Then [[char:mahishasura|Mahishasura]] defeated the gods and took heaven. The gods\' anger poured out of their bodies as radiance, which fused into one blazing female form. Shiva\'s energy became her face, Vishnu\'s her arms, Yama\'s her hair. Each god gave her a weapon; Himavan gave her a lion.',
          'She laughed, and the worlds shook. This is [[char:durga|Durga]], also called Chandika and Ambika.',
        ],
      },
      {
        id: 'ch4', title: 'The Slaying of Mahishasura',
        narrative: [
          'The Goddess destroyed Mahisha\'s generals and armies. Mahisha himself attacked as a buffalo, tossing mountains with his horns. She bound him; he became a lion; she beheaded it; he became a man with a sword; she cut him down; he became an elephant; she cut off its trunk; he became a buffalo again. She drank divine wine, leapt on him, pinned his neck with her foot and pierced him with her trident; as he began to emerge from the buffalo\'s mouth, she beheaded him.',
          'The gods sang her praises. She promised to return whenever they called her in distress.',
        ],
        events: ['mahishasura-slain'],
      },
      {
        id: 'ch5', title: 'Shumbha, Nishumbha and Kali',
        narrative: [
          'In the third episode, the demon brothers Shumbha and Nishumbha, rulers of the three worlds, hear of the Goddess\'s beauty and demand her as wife. She replies that she will marry only someone who defeats her in battle.',
          'From her brow emerges Kali, who slays Chanda and Munda (and is named Chamunda), and devours the drops of the blood-demon Raktabija so he cannot multiply. When Shumbha mocks her for relying on other goddesses, she reabsorbs them all: "I am alone in this world. Who else is there besides me?" She then destroys the brothers.',
        ],
      },
    ],
    characters: ['devi', 'durga', 'mahishasura', 'vishnu', 'brahma', 'shiva'],
    events: ['mahishasura-slain'],
    whyItMatters: 'The foundational text of Shakta theology, recited during Navaratri.',
    philosophicalMeaning: 'The Goddess is both the illusion that binds (the frame story) and the power that liberates (the battles).',
    relatedStories: ['daksha-yajna', 'origins-of-creation'],
    sources: [ref('devi-mahatmya'), ref('markandeya-purana')],
    quizId: 'quiz-shaiva',
  },
];
