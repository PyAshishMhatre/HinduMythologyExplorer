import type { Dynasty, FamilyTree, Timeline } from './types';
import { ref } from './helpers';

export const familyTrees: FamilyTree[] = [
  {
    id: 'cosmic-divine',
    title: 'Gods, Devas & Asuras',
    subtitle: 'The Trimurti, the Goddess and the children of Kashyapa',
    description: 'Divine relationships are not a single biological family. This tree shows marriage and parentage alongside emanation (mind-born), manifestation and avatar relations, styled differently so they are not confused.',
    members: ['devi', 'brahma', 'saraswati', 'vishnu', 'lakshmi', 'shiva', 'sati', 'parvati', 'durga', 'himavan', 'ganga', 'ganesha', 'kartikeya', 'daksha', 'marichi', 'kashyapa', 'aditi', 'diti', 'indra', 'surya', 'vamana', 'hiranyakashipu', 'hiranyaksha', 'prahlada', 'virochana', 'bali', 'garuda', 'vasuki'],
    roots: ['brahma', 'vishnu', 'devi', 'himavan'],
    notes: ['Shaiva, Vaishnava and Shakta traditions each regard a different deity as the ultimate source; the arrangement here is not a ranking.'],
  },
  {
    id: 'sages',
    title: 'Lineages of the Sages',
    subtitle: 'Mind-born sons of Brahma and their descendants',
    description: 'The great rishi families — Marichi\'s Kashyapa, Atri\'s Chandra and Durvasa, Angiras\'s Brihaspati, Pulastya\'s line to Ravana, Vashistha\'s to Vyasa, and the Bhargavas to Parashurama.',
    members: ['brahma', 'marichi', 'kashyapa', 'atri', 'anasuya', 'chandra', 'durvasa', 'angiras', 'brihaspati', 'pulastya', 'vishrava', 'vashistha', 'parashara', 'vyasa', 'bhrigu', 'shukra', 'devayani', 'jamadagni', 'parashurama', 'daksha', 'narada', 'gautama', 'ahalya', 'agastya', 'vishvamitra', 'shakuntala'],
    roots: ['brahma'],
    abridged: true,
  },
  {
    id: 'solar',
    title: 'The Solar Dynasty (Suryavansha)',
    subtitle: 'From Brahma through Vivasvan and Manu to Rama',
    description: 'A simplified line of the Ikshvakus. Dotted gold links mark places where many generations are abridged; Valmiki\'s genealogy and Kalidasa\'s Raghuvamsha differ in the later kings.',
    members: ['brahma', 'marichi', 'kashyapa', 'aditi', 'surya', 'yama', 'vaivasvata-manu', 'ikshvaku', 'ila', 'sagara', 'bhagiratha', 'dilipa', 'raghu', 'aja', 'dasharatha', 'kausalya', 'kaikeyi', 'sumitra', 'rama', 'sita', 'bharata', 'lakshmana', 'shatrughna', 'lava', 'kusha'],
    roots: ['brahma'],
    abridged: true,
  },
  {
    id: 'lunar',
    title: 'The Lunar Dynasty (Chandravansha)',
    subtitle: 'From Atri and the Moon to Yayati\'s sons and the Kurus',
    description: 'Chandra → Budha + Ila → Pururavas → Ayus → Nahusha → Yayati, whose sons Yadu and Puru found the Yadava and Paurava lines.',
    members: ['atri', 'chandra', 'brihaspati', 'tara-brihaspati', 'budha', 'vaivasvata-manu', 'ila', 'pururavas', 'urvashi', 'ayus', 'nahusha', 'yayati', 'shukra', 'devayani', 'sharmishtha', 'yadu', 'puru', 'dushyanta', 'shakuntala', 'bharata-dushyanta', 'kuru', 'shantanu', 'shurasena', 'vasudeva', 'krishna'],
    roots: ['atri', 'vaivasvata-manu'],
    abridged: true,
  },
  {
    id: 'kuru',
    title: 'The Kuru Family',
    subtitle: 'Shantanu to Janamejaya — Pandavas and Kauravas',
    description: 'The Mahabharata genealogy with biological, niyoga, legal, divine and adoptive parentage shown separately.',
    members: ['shantanu', 'ganga', 'satyavati', 'parashara', 'vyasa', 'bhishma', 'chitrangada', 'vichitravirya', 'ambika', 'ambalika', 'dhritarashtra', 'gandhari', 'shakuni', 'pandu', 'kunti', 'madri', 'vidura', 'duryodhana', 'dushasana', 'karna', 'surya', 'adhiratha', 'yama', 'vayu', 'indra', 'ashvins', 'yudhishthira', 'bhima', 'arjuna', 'nakula', 'sahadeva', 'draupadi', 'drupada', 'hidimbi', 'ghatotkacha', 'subhadra', 'abhimanyu', 'uttara', 'parikshit', 'janamejaya', 'shurasena', 'vasudeva', 'krishna'],
    roots: ['shantanu', 'shurasena'],
  },
  {
    id: 'yadava',
    title: 'Krishna\'s Family (Yadavas)',
    subtitle: 'Shurasena\'s children and the Vrishni clan',
    description: 'How Krishna is the Pandavas\' cousin: his father Vasudeva and their mother Kunti are siblings.',
    members: ['yadu', 'shurasena', 'kuntibhoja', 'vasudeva', 'devaki', 'kamsa', 'kunti', 'krishna', 'balarama', 'subhadra', 'nanda', 'yashoda', 'rukmini', 'arjuna', 'abhimanyu', 'yudhishthira', 'bhima'],
    roots: ['yadu'],
    abridged: true,
  },
  {
    id: 'ramayana',
    title: 'The Family of Rama',
    subtitle: 'Dasharatha\'s sons and Janaka\'s daughters',
    description: 'The four sons of Dasharatha married four princesses of Mithila: Sita and Urmila (Janaka\'s daughters) and Mandavi and Shrutakirti (Kushadhvaja\'s).',
    members: ['aja', 'dasharatha', 'kausalya', 'kaikeyi', 'sumitra', 'rama', 'bharata', 'lakshmana', 'shatrughna', 'janaka', 'kushadhvaja', 'sita', 'urmila', 'mandavi', 'shrutakirti', 'lava', 'kusha'],
    roots: ['aja', 'janaka'],
  },
  {
    id: 'ravana',
    title: 'Ravana\'s Lineage',
    subtitle: 'Brahma → Pulastya → Vishrava → the rakshasa royal family',
    description: 'Ravana was a brahmin through his father and a rakshasa through his mother — and half-brother of Kubera, god of wealth.',
    members: ['brahma', 'pulastya', 'vishrava', 'sumali', 'kaikesi', 'kubera', 'ravana', 'kumbhakarna', 'vibhishana', 'shurpanakha', 'mandodari', 'indrajit'],
    roots: ['brahma', 'sumali'],
  },
  {
    id: 'vanara',
    title: 'Vanaras & the Sons of the Gods',
    subtitle: 'Hanuman, Vali, Sugriva — and their divine fathers',
    description: 'The vanara heroes have divine fathers: Vayu, Indra and Surya — the same gods who father Bhima, Arjuna and Karna in the Mahabharata.',
    members: ['vayu', 'anjana', 'kesari', 'hanuman', 'indra', 'surya', 'vali', 'sugriva', 'tara-kishkindha', 'kunti', 'bhima', 'arjuna', 'karna'],
    roots: ['vayu', 'indra', 'surya'],
  },
];

export const familyTreeById = new Map(familyTrees.map((t) => [t.id, t]));

export const dynasties: Dynasty[] = [
  {
    id: 'suryavansha', name: 'Solar Dynasty', sanskritName: 'Suryavansha / Ikshvaku-vamsha / Raghuvamsha',
    description: 'The royal house of Ayodhya, descended from the Sun through Vaivasvata Manu and his son Ikshvaku. Its most famous king is Rama.',
    origin: 'Brahma → Marichi → Kashyapa → Vivasvan (Surya) → Vaivasvata Manu → Ikshvaku.',
    line: ['brahma', 'marichi', 'kashyapa', 'surya', 'vaivasvata-manu', 'ikshvaku', 'sagara', 'bhagiratha', 'dilipa', 'raghu', 'aja', 'dasharatha', 'rama', 'kusha'],
    familyTree: 'solar',
    notes: [
      'The Valmiki Ramayana gives a genealogy (recited by Vashistha) that differs from the Puranic lists and from Kalidasa\'s Raghuvamsha.',
      'Famous kings not shown include Mandhata, Trishanku (whom Vishvamitra sent to heaven) and Harishchandra (renowned for truthfulness).',
      'The Buddha (Shakya clan) and the Jain tirthankara Rishabha are linked to Ikshvaku by their own traditions.',
    ],
    sources: [ref('valmiki-ramayana', 'Bala Kanda'), ref('vishnu-purana', 'Book 4'), ref('bhagavata-purana', 'Skandha 9')],
  },
  {
    id: 'chandravansha', name: 'Lunar Dynasty', sanskritName: 'Chandravansha / Somavamsha',
    description: 'Descended from the Moon through Budha and Ila. The Lunar line splits at Yayati into the Yadavas and the Pauravas (Bharatas, Kurus).',
    origin: 'Brahma → Atri → Chandra → Budha (+ Ila) → Pururavas → Ayus → Nahusha → Yayati.',
    line: ['atri', 'chandra', 'budha', 'pururavas', 'ayus', 'nahusha', 'yayati', 'puru', 'dushyanta', 'bharata-dushyanta', 'kuru', 'shantanu'],
    familyTree: 'lunar',
    notes: ['Yayati\'s five sons — Yadu, Turvasu, Druhyu, Anu and Puru — are linked to peoples named in the Rigveda.'],
    sources: [ref('mahabharata', 'Adi Parva'), ref('vishnu-purana', 'Book 4'), ref('bhagavata-purana', 'Skandha 9')],
  },
  {
    id: 'yaduvansha', name: 'Yadava Dynasty', sanskritName: 'Yaduvamsha',
    description: 'The clan of Yadu, eldest son of Yayati, including the Vrishnis and Andhakas. Krishna and Balarama were born into it.',
    origin: 'Yayati → Yadu → … → Shurasena → Vasudeva → Krishna.',
    line: ['yayati', 'yadu', 'shurasena', 'vasudeva', 'krishna'],
    familyTree: 'yadava',
    notes: ['Yadu was denied kingship by Yayati; the Yadavas were traditionally governed by a council rather than a single crowned king.', 'The clan destroyed itself at Prabhasa after Gandhari\'s curse.'],
    sources: [ref('harivamsha'), ref('bhagavata-purana', 'Skandha 9-10')],
  },
  {
    id: 'kuru', name: 'Kuru Dynasty', sanskritName: 'Kuruvamsha',
    description: 'The Paurava kings of Hastinapura, named after Kuru. The Pandavas and Kauravas are both Kurus; their struggle is the Mahabharata.',
    origin: 'Puru → … → Bharata → … → Kuru → … → Shantanu.',
    line: ['kuru', 'shantanu', 'vichitravirya', 'pandu', 'arjuna', 'abhimanyu', 'parikshit', 'janamejaya'],
    familyTree: 'kuru',
    notes: ['The male line technically breaks with Vichitravirya; Vyasa\'s sons continue it through niyoga.', 'Parikshit, revived by Krishna, is the sole surviving heir after the war.'],
    sources: [ref('mahabharata', 'Adi Parva')],
  },
  {
    id: 'pulastya-vamsha', name: 'House of Pulastya', sanskritName: 'Paulastya',
    description: 'The descendants of the sage Pulastya: Kubera and Ravana and their siblings.',
    origin: 'Brahma → Pulastya → Vishrava.',
    line: ['brahma', 'pulastya', 'vishrava', 'ravana', 'indrajit'],
    familyTree: 'ravana',
    notes: ['The Mahabharata\'s Ramopakhyana gives a slightly different account of Ravana\'s mothers.'],
    sources: [ref('valmiki-ramayana', 'Uttara Kanda'), ref('mahabharata', 'Vana Parva')],
  },
];

export const dynastyById = new Map(dynasties.map((d) => [d.id, d]));

export const timelines: Timeline[] = [
  { id: 'master', title: 'The Master Timeline', description: 'All narrative eras in traditional narrative order.', eras: ['cosmic', 'lineages', 'solar', 'lunar', 'ramayana', 'mahabharata', 'puranic'] },
  { id: 'cosmic', title: 'Cosmic & Puranic', description: 'Creation, the first lineages and the great Puranic narratives.', eras: ['cosmic', 'lineages', 'puranic'] },
  { id: 'ramayana', title: 'Ramayana', description: 'From the Solar dynasty\'s origins to Rama\'s return and the Uttara Kanda.', eras: ['solar', 'ramayana'] },
  { id: 'mahabharata', title: 'Mahabharata', description: 'From the Lunar dynasty\'s origins to Parikshit and Janamejaya.', eras: ['lunar', 'mahabharata'] },
];
