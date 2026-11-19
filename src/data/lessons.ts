import type { Lesson } from './types';
import { ref } from './helpers';

export const lessons: Lesson[] = [
  {
    id: 'lesson-1', module: 1, order: 1,
    title: 'The Origins of the Hindu Mythological Universe',
    subtitle: 'Creation, the great gods, cosmic time and the first lineages',
    minutes: 22,
    intro:
      'Before kings and wars, before Rama and Krishna, there is the question every mythology must answer: where did everything come from? Hindu tradition answers it many times over, in voices separated by centuries. This lesson introduces those voices, the great gods who preside over creation, the immense cycles of time, and the first beings whose descendants will populate every story that follows.',
    sections: [
      {
        heading: '1. A tradition of many beginnings',
        body: [
          'If you open a book of Greek or Norse myth, you will usually find one creation story. Hindu mythology is different. Its sources span roughly three thousand years: the Vedic hymns (composed perhaps from the second millennium BCE), the philosophical Upanishads, the two great epics (Itihasa) — the Ramayana and Mahabharata — and the eighteen major Puranas, which took shape over many centuries in the first millennium CE and after.',
          'Each layer re-imagines creation. The Vedas ask questions and offer images; the Upanishads look for the Self behind the world; the Puranas tell elaborate stories in which specific gods create, sustain and destroy. These accounts are not usually treated as contradictions to be resolved, but as complementary perspectives — and the Puranas themselves often explain differences by saying that events happen differently in different cosmic cycles.',
          'Throughout this course you will see a "Different Traditions and Versions" box wherever accounts diverge. Getting comfortable with plurality is the first skill a student of Hindu mythology needs.',
        ],
        aside: 'Vedic → Upanishadic → Epic → Puranic is a rough chronological and thematic progression, not a strict sequence: older ideas survive and are reworked in newer texts.',
      },
      {
        heading: '2. The Nasadiya Sukta: creation as a question',
        body: [
          'The tenth mandala of the Rigveda contains a seven-verse hymn that many readers find astonishingly modern. It begins before the beginning: "There was neither non-existence nor existence then; neither the realm of space, nor the sky which is beyond. What stirred? Where? In whose protection?"',
          'There was no death and no immortality, no sign of night or day. "That One breathed, windless, by its own impulse." Darkness was hidden by darkness; all was undifferentiated water. Then, by the power of [[term:tapas|tapas]] — heat, effort, ascetic energy — That One was born. Desire arose, "the first seed of mind". Poets searching their hearts found the bond between being and non-being.',
          'And then the hymn turns on itself: "Who really knows? Who will proclaim it here? The gods came after the creation of this world — so who knows from where it arose? … He who is its overseer in the highest heaven, he surely knows — or perhaps he does not know."',
          'Why does this matter? Because it establishes, at the root of the tradition, an honesty about mystery. Later philosophers will build elaborate systems, but the oldest voice admits that the ultimate origin may be beyond knowing.',
        ],
      },
      {
        heading: '3. The Golden Embryo and the Cosmic Person',
        body: [
          'Other Rigvedic hymns offer more concrete images. Rigveda 10.121 praises [[term:hiranyagarbha|Hiranyagarbha]], the Golden Embryo, "who arose in the beginning, born as the one lord of creation, who held up the earth and the sky". The image of a golden cosmic egg floating on primordial waters became enormously influential: Puranic cosmology speaks of the brahmanda, "the egg of Brahma", from which the universe hatches.',
          'The Purusha Sukta (Rigveda 10.90) imagines creation as a cosmic [[term:yajna|sacrifice]]. A thousand-headed, thousand-eyed, thousand-footed Person — Purusha — pervades the earth and extends ten fingers beyond it. The gods sacrifice him, and from the parts of his body come the cosmos: the moon from his mind, the sun from his eye, Indra and Agni from his mouth, wind from his breath, the sky from his head, the earth from his feet.',
          'The same hymn describes the four [[term:varna|varnas]] emerging from his mouth, arms, thighs and feet. This verse would later be cited to justify a rigid social hierarchy — and criticised by reformers who rejected that reading. Many scholars believe the hymn is among the latest additions to the Rigveda.',
        ],
        aside: 'Notice the idea that the world is made from the body of a primordial being — it appears in other Indo-European mythologies too, such as the Norse Ymir.',
      },
      {
        heading: '4. The Upanishads: the Self behind the world',
        body: [
          'The Upanishads — philosophical dialogues attached to the Vedas — shift the question from "how did the world begin?" to "what is the reality behind it?". In the Brihadaranyaka Upanishad, "In the beginning this world was the Self alone." The Self looked around and saw nothing but itself; it felt fear, then realised there was nothing to fear; it felt lonely, and divided itself into male and female, from whom all beings descended.',
          'In the Chandogya Upanishad, the sage Uddalaka teaches his son Shvetaketu that in the beginning there was only Being (sat), one without a second. Being thought, "Let me become many," and produced heat, water and food. Everything is that Being in transformed form — like clay pots that are all clay. Then comes the famous teaching: "tat tvam asi" — "you are that".',
          'Here creation is less a past event than a present truth. The [[term:atman|atman]], your innermost Self, is identical with [[term:brahman|Brahman]], the ground of everything. This idea will reappear in the Bhagavad Gita and become central to the philosophical school of Advaita Vedanta.',
        ],
      },
      {
        heading: '5. The Trimurti: Brahma, Vishnu and Shiva',
        body: [
          'By the time of the Puranas, a famous scheme has emerged: the Trimurti, or "three forms". [[char:brahma|Brahma]] creates, [[char:vishnu|Vishnu]] preserves and [[char:shiva|Shiva]] destroys (or transforms) — repeatedly, in vast cycles.',
          'Brahma is the four-faced creator, holding the Vedas, seated on a lotus, with [[char:saraswati|Saraswati]], goddess of knowledge, as consort. Despite his role, he is rarely worshipped; myths explain this through curses and through his subordination to Vishnu or Shiva.',
          'Vishnu, dark-blue and four-armed, sleeps on the serpent Shesha on the cosmic ocean between creations, with [[char:lakshmi|Lakshmi]] beside him. When the world is threatened he descends as an [[term:avatar|avatar]] — the fish, tortoise, boar, man-lion, dwarf, Parashurama, Rama, Krishna, and more. For Vaishnavas, he is the supreme God.',
          'Shiva is the great ascetic of Mount Kailash and also the husband of [[char:parvati|Parvati]] and father of [[char:ganesha|Ganesha]] and [[char:kartikeya|Kartikeya]]. He descends from the Vedic storm-god [[term:rudra|Rudra]]. At the end of a cycle, he dissolves the universe through his cosmic dance. For Shaivas, he is the supreme God.',
          'It is important to understand that the Trimurti is a framework, not a universal belief. Vaishnavas see Brahma and Shiva as subordinate to Vishnu; Shaivas see Brahma and Vishnu as subordinate to Shiva. Each sect tells stories that make its own god the source of the others.',
        ],
        graph: ['brahma', 'vishnu', 'shiva', 'saraswati', 'lakshmi', 'parvati'],
      },
      {
        heading: '6. Devi: the Goddess as supreme power',
        body: [
          'A fourth great tradition, Shaktism, places the [[char:devi|Goddess]] at the summit. In the Devi Mahatmya, part of the Markandeya Purana, she is the supreme power (shakti) through which Brahma, Vishnu and Shiva act. She is Mahamaya — the great illusion that binds beings — and also the liberating knowledge that frees them.',
          'Her forms are many: gentle [[char:parvati|Parvati]], fierce [[char:durga|Durga]] who slays the buffalo demon, terrifying Kali, auspicious Lakshmi, wise Saraswati. In Shakta theology these are not separate goddesses but faces of the one Devi.',
          'When we draw family trees of the gods, we must therefore be careful. Durga is not a "daughter" of the gods in a biological sense; she is a manifestation of the Goddess through the gods\' combined energies. The app\'s family trees use different line styles to separate parentage, marriage, manifestation and emanation for exactly this reason.',
        ],
        graph: ['devi', 'durga', 'parvati', 'sati', 'lakshmi', 'saraswati'],
      },
      {
        heading: '7. The Puranic creation: Brahma on the lotus',
        body: [
          'The most familiar Puranic narrative goes like this. The universe has dissolved into a single ocean. Vishnu as Narayana floats upon it, asleep on the coils of Shesha. When the time for creation arrives, a lotus emerges from his navel and opens to reveal Brahma.',
          'Brahma does not know his origin. He travels down the lotus stalk for ages without finding its source. A voice says "tapa" — practise austerity. Brahma meditates for a thousand divine years, and Vishnu grants him the vision and power to create.',
          'Brahma\'s first attempts go awry. He creates forms of ignorance and darkness and casts them off. He creates the four Kumaras, eternal child-sages, who refuse to have descendants. Frustrated, he produces Rudra from his brow in some accounts.',
          'At last he creates the mind-born sons (manasaputras): [[char:marichi|Marichi]], [[char:atri|Atri]], [[char:angiras|Angiras]], [[char:pulastya|Pulastya]], Pulaha, Kratu, [[char:vashistha|Vashistha]], [[char:bhrigu|Bhrigu]], [[char:daksha|Daksha]] and [[char:narada|Narada]]. Lists differ between texts, but the principle is constant: these sages become the progenitors of every later family in the mythology.',
          'Shaiva texts tell a rival story — the Lingodbhava — in which Brahma and Vishnu argue over who is greatest until an infinite pillar of light appears; neither can find its top or bottom, and Shiva emerges from it as supreme.',
        ],
      },
      {
        heading: '8. The origin of devas, asuras and all creatures',
        body: [
          'The Puranas turn creation into genealogy. The prajapati Daksha has many daughters. Thirteen marry the sage [[char:kashyapa|Kashyapa]], son of Marichi. Their children are the beings of the cosmos: from [[char:aditi|Aditi]], the Adityas or devas — [[char:indra|Indra]], [[char:surya|Vivasvan]] and others; from [[char:diti|Diti]], the daityas, such as [[char:hiranyakashipu|Hiranyakashipu]] and [[char:hiranyaksha|Hiranyaksha]]; from Danu, the danavas; from Kadru, the serpents ([[char:vasuki|Vasuki]]); from Vinata, the bird [[char:garuda|Garuda]].',
          'This has a striking implication: the eternal war between devas and [[term:asura|asuras]] is a war between half-brothers. Their rivalry drives many stories — the churning of the ocean, the avatars Varaha, Narasimha and Vamana.',
          'Other daughters of Daksha marry elsewhere: twenty-seven become the wives of [[char:chandra|Chandra]], the Moon, as the lunar mansions; [[char:sati|Sati]] marries Shiva — with disastrous consequences.',
        ],
        graph: ['kashyapa', 'aditi', 'diti', 'indra', 'surya', 'hiranyakashipu', 'daksha'],
      },
      {
        heading: '9. Manu and the beginning of human history',
        body: [
          'Brahma also creates [[char:swayambhuva-manu|Swayambhuva Manu]] and his wife Shatarupa, the first human couple of this cosmic day. "Manu" is the root of manava, human being. Their sons Priyavrata and [[char:uttanapada|Uttanapada]] rule the earth; Uttanapada\'s son is the child-devotee [[char:dhruva|Dhruva]].',
          'But Swayambhuva is only the first of fourteen Manus in a kalpa. We live in the age of the seventh, [[char:vaivasvata-manu|Vaivasvata Manu]], son of the Sun god Vivasvan. He is the Manu of the flood story, saved by [[char:matsya|Matsya]], the fish avatar of Vishnu — a narrative already found in the Shatapatha Brahmana.',
          'Vaivasvata Manu is the pivot between cosmic myth and dynastic history. His son [[char:ikshvaku|Ikshvaku]] founds the Solar dynasty at Ayodhya — the line of Rama. His child [[char:ila|Ila]] marries Budha, son of the Moon, and their son [[char:pururavas|Pururavas]] founds the Lunar dynasty — the line of Krishna and the Pandavas. Both great epics therefore descend from one Manu.',
        ],
        graph: ['vaivasvata-manu', 'surya', 'ikshvaku', 'ila', 'budha', 'pururavas', 'matsya'],
      },
      {
        heading: '10. Time without end: yugas, manvantaras and kalpas',
        body: [
          'Hindu cosmology measures time on a staggering scale. The basic cycle is the mahayuga, comprising four [[term:yuga|yugas]] in a 4:3:2:1 ratio: Satya (or Krita), Treta, Dvapara and Kali — 4,320,000 human years in all. Dharma is pictured as a bull standing on four legs in the Satya Yuga, losing one leg in each successive age.',
          'Seventy-one mahayugas make a [[term:manvantara|manvantara]], ruled by a Manu. Fourteen manvantaras (plus junctions) make a [[term:kalpa|kalpa]], a single day of Brahma — about 4.32 billion years. Brahma\'s night is equally long, and during it the lower worlds dissolve in [[term:pralaya|pralaya]]. Brahma lives a hundred years of such days and nights, after which the entire universe dissolves, and a new Brahma eventually arises.',
          'Tradition places the Ramayana in the Treta Yuga and the Mahabharata at the end of the Dvapara; the Kali Yuga is said to begin with Krishna\'s departure. These placements are traditional and theological; they are not historical dates, and this app never presents them as such.',
        ],
      },
      {
        heading: '11. Lokas: the architecture of the cosmos',
        body: [
          'Space, too, is layered. A simple Vedic scheme speaks of three worlds: earth (bhu), atmosphere (bhuvah) and heaven (svah). The Puranas describe fourteen [[term:loka|lokas]]: seven ascending realms from Bhuloka (earth) to Satyaloka (Brahma\'s realm), and seven descending ones from Atala to Patala, home of nagas and asuras.',
          'Earth itself, in the Puranas, is a vast disc of concentric continents (dvipas) and oceans, with Mount Meru at the centre; we live in Jambudvipa, and India is Bharatavarsha — named, tradition says, after King Bharata.',
        ],
      },
    ],
    characters: ['brahma', 'vishnu', 'shiva', 'devi', 'saraswati', 'lakshmi', 'parvati', 'durga', 'kashyapa', 'aditi', 'diti', 'daksha', 'swayambhuva-manu', 'vaivasvata-manu', 'ikshvaku', 'ila', 'matsya'],
    stories: ['origins-of-creation', 'samudra-manthana', 'dhruva'],
    variations: [
      {
        title: 'Who is the supreme source of creation?',
        primary: { tradition: 'Vaishnava (Vishnu & Bhagavata Puranas)', account: 'Vishnu-Narayana; Brahma is born from his navel lotus.' },
        alternate: { tradition: 'Shaiva (Linga & Shiva Puranas) and Shakta (Devi Mahatmya)', account: 'Shiva as the infinite pillar of light — or the Goddess — is the source of Brahma and Vishnu.' },
        difference: 'The identity of the ultimate deity.',
        shared: 'Brahma as the agent of creation; cyclical time; the same mind-born sages.',
        whyItMatters: 'Hindu traditions share a narrative world while holding different theologies.',
      },
    ],
    recap: [
      'Hindu creation accounts come from several layers — Vedic, Upanishadic, Epic and Puranic — that coexist rather than cancel each other.',
      'The Nasadiya Sukta treats creation as a profound question; Hiranyagarbha and Purusha offer cosmic images.',
      'The Upanishads identify the Self (atman) with ultimate reality (Brahman).',
      'The Trimurti — Brahma, Vishnu, Shiva — and the Goddess are understood differently by different traditions.',
      'Kashyapa\'s marriages make devas and asuras half-brothers.',
      'Vaivasvata Manu is the ancestor of both the Solar and Lunar dynasties — the families of Rama and of Krishna and the Pandavas.',
      'Time is cyclical: yugas, manvantaras and kalpas.',
    ],
    quizId: 'quiz-origins',
    sources: [ref('rigveda', 'Mandala 10'), ref('brihadaranyaka-upanishad'), ref('chandogya-upanishad', 'Chapter 6'), ref('vishnu-purana', 'Book 1'), ref('bhagavata-purana', 'Skandha 3'), ref('devi-mahatmya'), ref('shatapatha-brahmana', 'Book 1')],
    status: 'complete',
  },
  {
    id: 'lesson-2', module: 2, order: 2,
    title: 'Ancient Sages and the Great Lineages',
    subtitle: 'Saptarishis, Prajapatis, and the roots of the Solar and Lunar dynasties',
    minutes: 16,
    intro: 'Every king, hero and demon in Hindu mythology has a pedigree, and almost every pedigree leads back to a handful of sages. This lesson maps those families and shows how they flow into the Ramayana and Mahabharata.',
    sections: [
      {
        heading: '1. Who are the rishis?',
        body: [
          'A [[term:rishi|rishi]] is a "seer" — someone who saw or heard the Vedic hymns in deep meditation. Tradition grades them: maharshis (great seers), devarshis like [[char:narada|Narada]] who move among the gods, rajarshis (royal sages) like [[char:janaka|Janaka]], and brahmarshis, the highest rank, such as [[char:vashistha|Vashistha]] and [[char:vishvamitra|Vishvamitra]].',
          'The Saptarishis, "seven sages", are a group whose membership changes in each manvantara; a common list for our age is Kashyapa, Atri, Vashistha, Vishvamitra, Gautama, Jamadagni and Bharadvaja. They are identified with the seven stars of the Big Dipper (Ursa Major).',
          'The rishis are powerful in ways kings and gods respect and fear. Their [[term:tapas|tapas]] grants them the ability to curse and bless — and many stories turn on a curse or a boon.',
        ],
      },
      {
        heading: '2. Kashyapa: father of almost everything',
        body: [
          '[[char:kashyapa|Kashyapa]], son of [[char:marichi|Marichi]], married thirteen daughters of [[char:daksha|Daksha]]. Through them he fathered the devas (by [[char:aditi|Aditi]]), the daityas (by [[char:diti|Diti]]), the danavas (by Danu), the nagas (by Kadru), and Garuda and Aruna (by Vinata).',
          'Kashyapa is also the grandfather of humankind\'s present Manu: his son [[char:surya|Vivasvan]] fathers [[char:vaivasvata-manu|Vaivasvata Manu]] and [[char:yama|Yama]]. The Solar dynasty therefore begins Brahma → Marichi → Kashyapa → Vivasvan → Manu → Ikshvaku.',
        ],
        graph: ['marichi', 'kashyapa', 'aditi', 'diti', 'surya', 'vaivasvata-manu', 'garuda', 'vasuki'],
      },
      {
        heading: '3. Atri, Chandra and the origin of the Lunar line',
        body: [
          '[[char:atri|Atri]] and his wife [[char:anasuya|Anasuya]] are linked with three sons regarded as portions of the Trimurti: [[char:chandra|Chandra]] the Moon, Dattatreya, and the fiery [[char:durvasa|Durvasa]].',
          'Chandra abducted Tara, wife of the gods\' teacher [[char:brihaspati|Brihaspati]], and fathered [[char:budha|Budha]]. Budha married [[char:ila|Ila]], child of Manu, and their son [[char:pururavas|Pururavas]] founded the Lunar dynasty: Pururavas → [[char:ayus|Ayus]] → [[char:nahusha|Nahusha]] → [[char:yayati|Yayati]].',
          'Notice the symmetry: the Lunar dynasty mingles the Moon\'s line (through Budha) with the Sun\'s line (through Ila, daughter of Manu, son of Vivasvan).',
        ],
        graph: ['atri', 'chandra', 'budha', 'ila', 'pururavas', 'nahusha', 'yayati'],
      },
      {
        heading: '4. Yayati\'s choice',
        body: [
          'Yayati married [[char:devayani|Devayani]], daughter of the asura-guru [[char:shukra|Shukra]], and secretly also her attendant, the asura princess [[char:sharmishtha|Sharmishtha]]. Shukra cursed him with old age, transferable to a willing son. Only the youngest, [[char:puru|Puru]], agreed. Yayati gave him the kingdom; the eldest, [[char:yadu|Yadu]], who refused, was excluded from kingship.',
          'From Yadu descend the Yadavas, including [[char:krishna|Krishna]]. From Puru descend the Pauravas: [[char:dushyanta|Dushyanta]], [[char:bharata-dushyanta|Bharata]] (after whom India is Bharatavarsha), [[char:kuru|Kuru]], and eventually [[char:shantanu|Shantanu]] and the Pandavas and Kauravas.',
        ],
        graph: ['yayati', 'yadu', 'puru', 'devayani', 'sharmishtha', 'shukra'],
      },
      {
        heading: '5. Vashistha, Vishvamitra and the Bhargavas',
        body: [
          '[[char:vashistha|Vashistha]] is the family priest of the Solar kings; his great-grandson is [[char:vyasa|Vyasa]] (Vashistha → Shakti → [[char:parashara|Parashara]] → Vyasa). His rival [[char:vishvamitra|Vishvamitra]], a king who became a brahmarshi, fathered [[char:shakuntala|Shakuntala]] — mother of Bharata. So the two rival sages stand behind both the Solar line (as gurus) and the Lunar line (as ancestors).',
          'The descendants of [[char:bhrigu|Bhrigu]] — the Bhargavas — include [[char:shukra|Shukra]] and [[char:jamadagni|Jamadagni]], father of [[char:parashurama|Parashurama]], who appears in both epics.',
          '[[char:pulastya|Pulastya]]\'s son [[char:vishrava|Vishrava]] fathered [[char:kubera|Kubera]] and [[char:ravana|Ravana]]. Even the great villain of the Ramayana is a great-grandson of Brahma.',
        ],
        graph: ['vashistha', 'parashara', 'vyasa', 'vishvamitra', 'shakuntala', 'pulastya', 'vishrava', 'ravana'],
      },
      {
        heading: '6. Early kings: Dhruva, Prithu and the descent of Ganga',
        body: [
          'In the first manvantara, [[char:dhruva|Dhruva]] became the Pole Star through devotion, and his descendant [[char:prithu|Prithu]] became the model of kingship by "milking the earth".',
          'In the Solar line, [[char:sagara|Sagara]]\'s sixty thousand sons were burned by the sage Kapila, and their liberation required [[char:bhagiratha|Bhagiratha]] to bring [[char:ganga|Ganga]] from heaven. Ganga later becomes the mother of Bhishma — one of many threads binding the Solar and Lunar stories.',
        ],
      },
    ],
    characters: ['kashyapa', 'atri', 'chandra', 'budha', 'yayati', 'yadu', 'puru', 'vashistha', 'vishvamitra', 'bhrigu', 'pulastya', 'dhruva', 'bhagiratha'],
    stories: ['dhruva', 'descent-of-ganga'],
    recap: [
      'Rishis are seers whose tapas gives them power to curse and bless.',
      'Kashyapa fathers devas, asuras, nagas and birds, and is an ancestor of the Solar line.',
      'Atri → Chandra → Budha (+ Ila) → Pururavas begins the Lunar line.',
      'Yayati\'s sons Yadu and Puru found the Yadava and Paurava (Kuru) lines.',
      'Vyasa descends from Vashistha; Ravana from Pulastya; Parashurama from Bhrigu.',
    ],
    quizId: 'quiz-lineages',
    sources: [ref('mahabharata', 'Adi Parva'), ref('vishnu-purana', 'Books 1, 4'), ref('bhagavata-purana', 'Skandhas 4, 9'), ref('valmiki-ramayana', 'Bala Kanda')],
    status: 'complete',
  },
  {
    id: 'lesson-3', module: 3, order: 3,
    title: 'The Ramayana Universe',
    subtitle: 'From the Ikshvakus to the return to Ayodhya',
    minutes: 18,
    intro: 'The Ramayana is the story of Rama of Ayodhya, prince of the Solar dynasty. Traditionally attributed to Valmiki, it was retold in hundreds of versions across Asia. This lesson gives you the structure, the principal characters and the essential ethical debates; the linked stories narrate it in full.',
    sections: [
      {
        heading: '1. The text and its seven kandas',
        body: [
          'The [[source:valmiki-ramayana|Valmiki Ramayana]] is a Sanskrit epic of about 24,000 verses in seven books (kandas): Bala (childhood), Ayodhya, Aranya (forest), Kishkindha, Sundara (the "beautiful" book of Hanuman), Yuddha (war), and Uttara (later events).',
          'Many scholars consider the Bala and Uttara Kandas later additions, partly because they emphasise Rama\'s divinity more than the central books. Tradition treats all seven as Valmiki\'s.',
          'Later retellings are independent works, not translations: Kambar\'s Tamil Ramavataram (12th c.), Krittibas\'s Bengali Ramayan (15th c.), Tulsidas\'s Awadhi Ramcharitmanas (16th c.), Thailand\'s Ramakien, the Malay Hikayat Seri Rama, Jain versions, and many folk Ramayanas.',
        ],
      },
      {
        heading: '2. Rama\'s ancestry',
        body: [
          '[[char:rama|Rama]] is of the [[dynasty:suryavansha|Solar dynasty]]: Brahma → Marichi → Kashyapa → Vivasvan → Vaivasvata Manu → [[char:ikshvaku|Ikshvaku]] → … → [[char:sagara|Sagara]] → … → [[char:bhagiratha|Bhagiratha]] → … → [[char:raghu|Raghu]] → [[char:aja|Aja]] → [[char:dasharatha|Dasharatha]] → Rama. The middle generations differ between texts.',
        ],
        graph: ['ikshvaku', 'sagara', 'bhagiratha', 'raghu', 'aja', 'dasharatha', 'rama'],
      },
      {
        heading: '3. The story in brief',
        body: [
          'Dasharatha\'s sacrifice brings four sons. [[char:vishvamitra|Vishvamitra]] takes Rama and [[char:lakshmana|Lakshmana]] to the forest; Rama redeems [[char:ahalya|Ahalya]] and breaks Shiva\'s bow to marry [[char:sita|Sita]]. [[char:kaikeyi|Kaikeyi]]\'s boons exile Rama; [[char:bharata|Bharata]] rules with his sandals. In the forest, [[char:shurpanakha|Shurpanakha]]\'s humiliation leads [[char:ravana|Ravana]] to abduct Sita.',
          'Rama allies with [[char:sugriva|Sugriva]], kills [[char:vali|Vali]], and [[char:hanuman|Hanuman]] finds Sita in Lanka. With [[char:vibhishana|Vibhishana]]\'s help and a bridge across the sea, Rama defeats [[char:kumbhakarna|Kumbhakarna]], [[char:indrajit|Indrajit]] and Ravana, and returns to Ayodhya to be crowned.',
        ],
        graph: ['rama', 'sita', 'lakshmana', 'hanuman', 'ravana', 'sugriva', 'vibhishana'],
      },
      {
        heading: '4. Hard questions',
        body: [
          'The Ramayana is a living ethical text, and its hardest episodes have been argued over for two thousand years. Was it right for Rama to kill Vali from hiding? Why did Rama demand Sita\'s fire ordeal, and later exile her? What of Shambuka, the shudra ascetic whom Rama kills in the Uttara Kanda?',
          'Different traditions answer differently. Some devotional texts reframe the episodes (the Maya-Sita), others omit them (the Ramcharitmanas does not narrate Sita\'s exile), and modern readers often read them critically. Part of learning the Ramayana is learning these debates.',
        ],
      },
    ],
    characters: ['rama', 'sita', 'lakshmana', 'bharata', 'dasharatha', 'kaikeyi', 'hanuman', 'ravana', 'vibhishana', 'sugriva', 'vali'],
    stories: ['ravana-origins', 'rama-early-life', 'rama-exile', 'hanuman-lanka'],
    recap: [
      'Valmiki\'s epic has seven kandas; the Bala and Uttara may be later layers.',
      'Rama is of the Ikshvaku (Solar) dynasty.',
      'Regional Ramayanas are distinct works with their own emphases.',
      'Key ethical debates: Vali, the fire ordeal, Sita\'s exile.',
    ],
    quizId: 'quiz-ramayana',
    sources: [ref('valmiki-ramayana'), ref('ramcharitmanas', undefined, 'tradition'), ref('kamba-ramayanam', undefined, 'regional-folk')],
    status: 'complete',
  },
  {
    id: 'lesson-4', module: 4, order: 4,
    title: 'The Mahabharata Universe',
    subtitle: 'The Kuru dynasty, the great war and the Bhagavad Gita',
    minutes: 18,
    intro: 'At around 100,000 verses, the Mahabharata is one of the longest poems ever composed. It claims, "What is found here may be found elsewhere; what is not here is nowhere." This lesson maps its family, its frame stories and its core events.',
    sections: [
      {
        heading: '1. A story within stories',
        body: [
          'The Mahabharata is told in nested frames. The bard Ugrashravas tells it to sages in the [[place:naimisharanya|Naimisha forest]]. He heard it at the snake sacrifice of King [[char:janamejaya|Janamejaya]], where Vaishampayana, disciple of [[char:vyasa|Vyasa]], narrated it. Within the story, characters constantly tell each other further stories — including a short version of the Ramayana.',
          'The Bhandarkar Oriental Research Institute\'s Critical Edition (completed 1966) reconstructed the oldest attainable text by comparing manuscripts. Many well-known episodes appear only in later manuscripts.',
        ],
      },
      {
        heading: '2. The family',
        body: [
          '[[char:shantanu|Shantanu]] marries [[char:ganga|Ganga]] (son: [[char:bhishma|Bhishma]]) and [[char:satyavati|Satyavati]] (sons: Chitrangada and [[char:vichitravirya|Vichitravirya]]). Satyavati also has a premarital son, [[char:vyasa|Vyasa]]. When Vichitravirya dies childless, Vyasa fathers [[char:dhritarashtra|Dhritarashtra]], [[char:pandu|Pandu]] and [[char:vidura|Vidura]].',
          'Dhritarashtra and [[char:gandhari|Gandhari]] have the hundred Kauravas, led by [[char:duryodhana|Duryodhana]]. Pandu\'s wives [[char:kunti|Kunti]] and [[char:madri|Madri]] bear the five Pandavas through gods: [[char:yudhishthira|Yudhishthira]] (Dharma), [[char:bhima|Bhima]] (Vayu), [[char:arjuna|Arjuna]] (Indra), and the twins (the Ashvins). Before marriage Kunti had borne [[char:karna|Karna]] to Surya.',
          'Kunti is the sister of Krishna\'s father Vasudeva: [[char:krishna|Krishna]] is the Pandavas\' first cousin. Use the Relationship Explorer to trace this.',
        ],
        graph: ['shantanu', 'bhishma', 'vyasa', 'dhritarashtra', 'pandu', 'kunti', 'arjuna', 'krishna', 'karna', 'duryodhana'],
      },
      {
        heading: '3. The arc of the story',
        body: [
          'Rivalry in childhood, the lac house, Draupadi\'s marriage, Indraprastha and the Rajasuya, the dice game and Draupadi\'s humiliation, twelve years of exile and one in disguise, failed peace negotiations, the [[term:bhagavad-gita|Bhagavad Gita]], eighteen days of war, Ashwatthama\'s night raid, and the long aftermath.',
        ],
      },
      {
        heading: '4. Moral complexity',
        body: [
          'Unlike many epics, the Mahabharata refuses easy heroes. The Pandavas win through a series of questionable stratagems urged by Krishna: Bhishma felled behind Shikhandi, Drona deceived with a half-truth, Karna killed while lifting his wheel, Duryodhana struck below the waist. Duryodhana, dying, lists these accusations — and the gods shower flowers on him.',
          'The epic\'s answer is that [[term:dharma|dharma]] is subtle, and that rigid adherence to rules can produce catastrophe (as with Bhishma\'s vow). Its vision is tragic: even victory is grief.',
        ],
      },
    ],
    characters: ['shantanu', 'bhishma', 'vyasa', 'dhritarashtra', 'pandu', 'kunti', 'yudhishthira', 'bhima', 'arjuna', 'draupadi', 'krishna', 'karna', 'duryodhana', 'drona'],
    stories: ['bhishma-vow-story', 'dice-to-kurukshetra'],
    recap: ['The epic is told within frame narratives to Janamejaya and the sages of Naimisha.', 'Vyasa is grandfather of both Pandavas and Kauravas.', 'Krishna is the Pandavas\' first cousin.', 'Dharma is presented as subtle and contested.'],
    quizId: 'quiz-kuru',
    sources: [ref('mahabharata'), ref('bhagavad-gita')],
    status: 'complete',
  },
  {
    id: 'lesson-5', module: 5, order: 5,
    title: 'Puranic Stories and the Avatars',
    subtitle: 'Vishnu\'s descents, Shiva\'s family and the Goddess',
    minutes: 15,
    intro: 'The Puranas ("ancient lore") are encyclopaedic texts covering creation, genealogies, the deeds of gods and sacred geography. This lesson surveys the avatars of Vishnu and the major Shaiva and Shakta narratives.',
    sections: [
      {
        heading: '1. The idea of the avatar',
        body: [
          'In the Bhagavad Gita (4.7–8), Krishna says that whenever dharma declines he manifests himself to protect the good and destroy evil. The Puranas develop this into lists of [[term:avatar|avatars]]. The most famous list of ten (Dashavatara) is: [[char:matsya|Matsya]], [[char:kurma|Kurma]], [[char:varaha|Varaha]], [[char:narasimha|Narasimha]], [[char:vamana|Vamana]], [[char:parashurama|Parashurama]], [[char:rama|Rama]], [[char:krishna|Krishna]] (or [[char:balarama|Balarama]]), [[char:buddha-avatar|Buddha]] (in many lists), and [[char:kalki|Kalki]].',
          'Lists vary by text and region, and the Bhagavata Purana gives more than twenty avatars. Some readers see in the sequence a progression from aquatic to human life; that is a modern interpretation, not a traditional teaching.',
        ],
        graph: ['vishnu', 'matsya', 'kurma', 'varaha', 'narasimha', 'vamana', 'parashurama', 'rama', 'krishna', 'kalki'],
      },
      {
        heading: '2. The early avatars',
        body: [
          'Matsya saves Manu from the flood. Kurma supports Mount Mandara at the [[story:samudra-manthana|churning of the ocean]]. Varaha kills [[char:hiranyaksha|Hiranyaksha]] and raises the earth. Narasimha bursts from a pillar to protect [[char:prahlada|Prahlada]] from [[char:hiranyakashipu|Hiranyakashipu]]. Vamana reclaims the worlds from [[char:bali|Bali]] in three strides.',
        ],
      },
      {
        heading: '3. Shiva\'s family',
        body: [
          '[[char:sati|Sati]], daughter of [[char:daksha|Daksha]], immolates herself at her father\'s sacrifice; Shiva destroys it. Reborn as [[char:parvati|Parvati]], she wins Shiva through tapas. Their sons are [[char:kartikeya|Kartikeya]], born to kill the demon Taraka, and [[char:ganesha|Ganesha]], who receives an elephant head.',
        ],
        graph: ['shiva', 'sati', 'parvati', 'ganesha', 'kartikeya', 'daksha', 'himavan'],
      },
      {
        heading: '4. The Goddess triumphant',
        body: [
          'In the [[story:devi-mahatmya|Devi Mahatmya]], the gods\' combined energies form [[char:durga|Durga]], who slays [[char:mahishasura|Mahishasura]]. Kali emerges from her brow to destroy Chanda, Munda and Raktabija. The text\'s recitation during Navaratri makes it among the most performed scriptures in India.',
        ],
      },
    ],
    characters: ['vishnu', 'matsya', 'kurma', 'varaha', 'narasimha', 'vamana', 'prahlada', 'bali', 'shiva', 'parvati', 'ganesha', 'durga'],
    stories: ['samudra-manthana', 'prahlada-narasimha', 'vamana-bali', 'daksha-yajna', 'ganesha-origin', 'devi-mahatmya'],
    recap: ['There is no single canonical Dashavatara list.', 'Each early avatar answers a specific crisis.', 'Sati\'s death and rebirth as Parvati link the Shaiva narratives.', 'The Devi Mahatmya presents the Goddess as supreme.'],
    quizId: 'quiz-avatars',
    sources: [ref('bhagavata-purana'), ref('vishnu-purana'), ref('shiva-purana'), ref('devi-mahatmya'), ref('bhagavad-gita', 'Chapter 4')],
    status: 'complete',
  },
  {
    id: 'lesson-6', module: 6, order: 6,
    title: 'Philosophy and Cross-Epic Connections',
    subtitle: 'Dharma, karma, moksha — and how everything links together',
    minutes: 14,
    intro: 'Myths are not only stories; they carry ideas. This lesson introduces the core concepts that the narratives dramatise, the major theological traditions, and the surprising threads that connect the Ramayana, the Mahabharata and the Puranas.',
    sections: [
      {
        heading: '1. Four aims and three paths',
        body: [
          'Classical Hindu thought speaks of four aims of life (purusharthas): [[term:dharma|dharma]] (righteousness), artha (prosperity), kama (pleasure) and [[term:moksha|moksha]] (liberation). The epics are largely about the tension between dharma and the other aims.',
          'The [[term:bhagavad-gita|Bhagavad Gita]] synthesises paths to liberation: karma yoga (selfless action), jnana yoga (knowledge of the Self), dhyana (meditation) and [[term:bhakti|bhakti]] (devotion). Shankara read it as teaching non-dual knowledge; Ramanuja and Madhva as teaching devotion to a personal God; Tilak and Gandhi as a call to ethical action.',
        ],
      },
      {
        heading: '2. Traditions: Vaishnava, Shaiva, Shakta, Smarta',
        body: [
          'Vaishnavism worships Vishnu and his avatars as supreme; Shaivism, Shiva; Shaktism, the Goddess. The Smarta tradition, associated with Shankara, worships five deities (Vishnu, Shiva, Devi, Ganesha, Surya) as forms of the one Brahman. These are not separate religions; they share texts, festivals and stories, while interpreting them differently.',
        ],
      },
      {
        heading: '3. Threads between the epics',
        body: [
          '[[char:hanuman|Hanuman]] and [[char:bhima|Bhima]] are both sons of [[char:vayu|Vayu]], and meet in the Mahabharata; Hanuman rides on Arjuna\'s banner. [[char:parashurama|Parashurama]] confronts Rama in the Ramayana and teaches Bhishma, Drona and Karna in the Mahabharata. [[char:indra|Indra]] fathers Vali and Arjuna; [[char:surya|Surya]] fathers Sugriva and Karna.',
          'Both epics descend from [[char:vaivasvata-manu|Vaivasvata Manu]]. Ganga, brought down by Rama\'s ancestor Bhagiratha, becomes Bhishma\'s mother. [[char:shatrughna|Shatrughna]] founds Mathura, where Krishna is later born. The Mahabharata contains a retelling of the Ramayana, told by Markandeya to Yudhishthira. And both Rama and Krishna are avatars of Vishnu.',
        ],
        graph: ['hanuman', 'bhima', 'vayu', 'parashurama', 'indra', 'vali', 'arjuna', 'surya', 'sugriva', 'karna'],
      },
      {
        heading: '4. Reading myths with care',
        body: [
          'Good scholarship distinguishes between what a text says, what a tradition holds, what later interpretation adds, and what historians argue. Throughout this app, source badges mark that difference. Holding several readings together — devotional, philosophical, literary, historical — is the mark of an above-average understanding.',
        ],
      },
    ],
    characters: ['krishna', 'arjuna', 'hanuman', 'bhima', 'parashurama', 'vayu', 'indra', 'surya'],
    stories: ['dice-to-kurukshetra', 'hanuman-lanka'],
    recap: ['The four aims of life and the paths of the Gita.', 'Major traditions share stories but differ in theology.', 'Vayu, Indra, Surya, Parashurama, Ganga and Manu link the epics.'],
    quizId: 'quiz-philosophy',
    sources: [ref('bhagavad-gita'), ref('mahabharata', 'Vana Parva'), ref('scholarship', undefined, 'modern-historical')],
    status: 'complete',
  },
];

export const lessonById = new Map(lessons.map((l) => [l.id, l]));
