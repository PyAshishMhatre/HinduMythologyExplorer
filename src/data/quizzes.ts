import type { Quiz } from './types';

export const quizzes: Quiz[] = [
  {
    id: 'quiz-origins', title: 'Origins of the Universe', topic: 'cosmology',
    questions: [
      { id: 'q1', type: 'mcq', prompt: 'Which Rigvedic hymn ends by wondering whether even the highest overseer knows how creation arose?', options: ['Purusha Sukta', 'Nasadiya Sukta', 'Gayatri Mantra', 'Hiranyagarbha Sukta'], answer: 1, explanation: 'The Nasadiya Sukta (RV 10.129) closes with "perhaps he does not know".' },
      { id: 'q2', type: 'truefalse', prompt: 'In the Vaishnava Puranas, Brahma is born on a lotus growing from Vishnu\'s navel.', answer: 0, explanation: 'True — this is the classic Puranic image, though Shaiva and Shakta texts give other origins.' },
      { id: 'q3', type: 'order', prompt: 'Arrange these units of cosmic time from shortest to longest.', items: ['Kali Yuga', 'Mahayuga', 'Manvantara', 'Kalpa'], explanation: 'Kali Yuga < Mahayuga (four yugas) < Manvantara (~71 mahayugas) < Kalpa (1,000 mahayugas, 14 manvantaras).' },
      { id: 'q4', type: 'relationship', prompt: 'Swayambhuva Manu is…', options: ['A son of Vivasvan', 'The first Manu, created by Brahma', 'The Manu saved from the flood', 'Father of Ikshvaku'], answer: 1, explanation: 'Swayambhuva is the first Manu. Vaivasvata — son of Vivasvan — is the seventh, saved from the flood and father of Ikshvaku.' },
      { id: 'q5', type: 'reasoning', prompt: 'Why do Puranic authors often explain contradictory accounts by placing them in different kalpas?', options: ['Because the texts were written by one author', 'Because cyclical time allows the same events to recur differently', 'Because the Vedas require it', 'Because Brahma forgets'], answer: 1, explanation: 'Cyclical cosmology lets different versions coexist as events of different cosmic cycles.' },
    ],
  },
  {
    id: 'quiz-lineages', title: 'Sages and Lineages', topic: 'lineages',
    questions: [
      { id: 'q1', type: 'relationship', prompt: 'Who is the father of the devas and the daityas?', options: ['Daksha', 'Brahma', 'Kashyapa', 'Bhrigu'], answer: 2, explanation: 'Kashyapa fathered the devas by Aditi and the daityas by Diti — making them half-brothers.' },
      { id: 'q2', type: 'mcq', prompt: 'Which sage is the father of Chandra in most Puranic accounts?', options: ['Atri', 'Angiras', 'Vashistha', 'Pulastya'], answer: 0, explanation: 'Chandra is born of Atri (and Anasuya), and so the Lunar dynasty descends from Atri.' },
      { id: 'q3', type: 'truefalse', prompt: 'Both the Solar and Lunar dynasties trace back to Vaivasvata Manu.', answer: 0, explanation: 'True: Ikshvaku (Solar) is Manu\'s son; Ila, Manu\'s child, marries Budha and bears Pururavas (Lunar).' },
      { id: 'q4', type: 'order', prompt: 'Put Dhruva\'s family in generational order.', items: ['Brahma', 'Swayambhuva Manu', 'Uttanapada', 'Dhruva'], explanation: 'Brahma → Swayambhuva Manu → Uttanapada → Dhruva.' },
      { id: 'q5', type: 'mcq', prompt: 'What does Dhruva become?', options: ['King of the gods', 'The Pole Star', 'The moon', 'A Manu'], answer: 1, explanation: 'Vishnu grants him a fixed place as the Pole Star (Dhruva Nakshatra).' },
    ],
  },
  {
    id: 'quiz-solar', title: 'The Solar Dynasty', topic: 'solar',
    questions: [
      { id: 'q1', type: 'order', prompt: 'Order these kings of the Solar dynasty.', items: ['Ikshvaku', 'Sagara', 'Bhagiratha', 'Raghu', 'Dasharatha'], explanation: 'Ikshvaku → … → Sagara → … → Bhagiratha → … → Raghu → Aja → Dasharatha (generations abridged).' },
      { id: 'q2', type: 'mcq', prompt: 'Who burned the sixty thousand sons of Sagara?', options: ['Indra', 'Shiva', 'The sage Kapila', 'Agni'], answer: 2, explanation: 'They accused Kapila of stealing the horse; his glance turned them to ash.' },
      { id: 'q3', type: 'mcq', prompt: 'Who caught Ganga in his hair as she descended?', options: ['Vishnu', 'Brahma', 'Shiva', 'Bhagiratha'], answer: 2, explanation: 'Shiva broke her fall so the earth would not be shattered.' },
      { id: 'q4', type: 'truefalse', prompt: 'Rama is called "Raghava" because he descends from King Raghu.', answer: 0, explanation: 'True — the dynasty is also called Raghuvamsha.' },
      { id: 'q5', type: 'relationship', prompt: 'Vaivasvata Manu is the son of…', options: ['Brahma', 'Vivasvan (Surya)', 'Kashyapa', 'Ikshvaku'], answer: 1, explanation: 'Vaivasvata means "son of Vivasvan".' },
    ],
  },
  {
    id: 'quiz-samudra', title: 'The Churning of the Ocean', topic: 'puranic',
    questions: [
      { id: 'q1', type: 'mcq', prompt: 'In the Vishnu Purana, whose curse caused the devas to lose their fortune?', options: ['Bhrigu', 'Durvasa', 'Vashistha', 'Gautama'], answer: 1, explanation: 'Durvasa cursed Indra for disrespecting his garland.' },
      { id: 'q2', type: 'mcq', prompt: 'What was used as the churning rope?', options: ['Shesha', 'Takshaka', 'Vasuki', 'Kaliya'], answer: 2, explanation: 'Vasuki, king of serpents, was wound around Mount Mandara.' },
      { id: 'q3', type: 'order', prompt: 'Order these events of the churning.', items: ['Durvasa\'s curse', 'Kurma supports Mandara', 'Shiva drinks the halahala', 'Lakshmi emerges', 'Mohini distributes amrita'], explanation: 'Curse → churning with Kurma → poison → treasures incl. Lakshmi → Dhanvantari and amrita → Mohini.' },
      { id: 'q4', type: 'truefalse', prompt: 'Rahu and Ketu are the head and body of an asura who drank amrita.', answer: 0, explanation: 'True — Svarbhanu was beheaded by Vishnu\'s discus after drinking.' },
      { id: 'q5', type: 'reasoning', prompt: 'Why did the asuras take the head end of Vasuki?', options: ['Vishnu forced them', 'They considered the tail inferior', 'They were stronger', 'Vasuki asked them'], answer: 1, explanation: 'Their pride made them refuse the tail — and they suffered Vasuki\'s fiery breath.' },
    ],
  },
  {
    id: 'quiz-avatars', title: 'Vishnu\'s Avatars', topic: 'avatars',
    questions: [
      { id: 'q1', type: 'order', prompt: 'Put these avatars in their traditional order.', items: ['Matsya', 'Kurma', 'Varaha', 'Narasimha', 'Vamana'], explanation: 'Fish, tortoise, boar, man-lion, dwarf.' },
      { id: 'q2', type: 'mcq', prompt: 'Narasimha killed Hiranyakashipu at which time?', options: ['Midnight', 'Noon', 'Twilight', 'Dawn'], answer: 2, explanation: 'Twilight — neither day nor night.' },
      { id: 'q3', type: 'relationship', prompt: 'Bali is the ___ of Prahlada.', options: ['son', 'grandson', 'brother', 'father'], answer: 1, explanation: 'Prahlada → Virochana → Bali.' },
      { id: 'q4', type: 'truefalse', prompt: 'All Hindu traditions agree on exactly the same list of ten avatars.', answer: 1, explanation: 'False — lists vary (e.g., Balarama or Buddha), and the Bhagavata lists more than twenty.' },
      { id: 'q5', type: 'mcq', prompt: 'Which festival celebrates Mahabali\'s annual return?', options: ['Diwali', 'Holi', 'Onam', 'Pongal'], answer: 2, explanation: 'Onam in Kerala.' },
    ],
  },
  {
    id: 'quiz-shaiva', title: 'Shiva and the Goddess', topic: 'puranic',
    questions: [
      { id: 'q1', type: 'mcq', prompt: 'Why did Sati give up her body?', options: ['A curse from Bhrigu', 'Her father insulted Shiva', 'To be reborn as Ganga', 'Vishnu requested it'], answer: 1, explanation: 'Daksha\'s insults to Shiva at his sacrifice.' },
      { id: 'q2', type: 'relationship', prompt: 'Parvati is the daughter of…', options: ['Daksha', 'Himavan', 'Kashyapa', 'Brahma'], answer: 1, explanation: 'Himavan and Mena; she is Sati reborn.' },
      { id: 'q3', type: 'mcq', prompt: 'In the Shiva Purana, how does Ganesha get his elephant head?', options: ['Shani\'s gaze', 'Shiva replaces the head he severed', 'He is born with it', 'Indra\'s curse'], answer: 1, explanation: 'Shiva beheads the boy guarding Parvati\'s door and restores him with an elephant head.' },
      { id: 'q4', type: 'truefalse', prompt: 'In the Devi Mahatmya, Durga is formed from the combined energies of the gods.', answer: 0, explanation: 'True.' },
      { id: 'q5', type: 'mcq', prompt: 'The Devi Mahatmya is part of which Purana?', options: ['Vishnu Purana', 'Shiva Purana', 'Markandeya Purana', 'Bhagavata Purana'], answer: 2, explanation: 'Markandeya Purana.' },
    ],
  },
  {
    id: 'quiz-ramayana', title: 'The Ramayana', topic: 'ramayana',
    questions: [
      { id: 'q1', type: 'relationship', prompt: 'Who is Ravana\'s father?', options: ['Pulastya', 'Vishrava', 'Sumali', 'Kubera'], answer: 1, explanation: 'Vishrava, son of Pulastya. Sumali is his maternal grandfather; Kubera is his half-brother.' },
      { id: 'q2', type: 'order', prompt: 'Order these events of the Ramayana.', items: ['Breaking of Shiva\'s bow', 'Kaikeyi\'s boons', 'Abduction of Sita', 'Hanuman\'s leap to Lanka', 'Death of Ravana'], explanation: 'Bala → Ayodhya → Aranya → Sundara → Yuddha.' },
      { id: 'q3', type: 'mcq', prompt: 'What did Bharata place on the throne of Ayodhya?', options: ['Rama\'s bow', 'Rama\'s sandals', 'Rama\'s crown', 'Rama\'s ring'], answer: 1, explanation: 'The padukas (sandals).' },
      { id: 'q4', type: 'truefalse', prompt: 'The "Lakshmana rekha" appears in the Valmiki Ramayana.', answer: 1, explanation: 'False — it comes from later retellings.' },
      { id: 'q5', type: 'reasoning', prompt: 'Why did Vishnu need to be born as a human to kill Ravana?', options: ['Humans were stronger', 'Ravana\'s boon did not protect him from humans', 'Shiva insisted', 'Brahma cursed Vishnu'], answer: 1, explanation: 'Ravana scorned to ask for protection from humans.' },
    ],
  },
  {
    id: 'quiz-kuru', title: 'The Kuru Dynasty & Mahabharata', topic: 'mahabharata',
    questions: [
      { id: 'q1', type: 'relationship', prompt: 'How are Krishna and Arjuna related by blood?', options: ['Brothers', 'First cousins', 'Uncle and nephew', 'Not related'], answer: 1, explanation: 'Krishna\'s father Vasudeva is the brother of Arjuna\'s mother Kunti. They are also brothers-in-law, since Arjuna married Krishna\'s sister Subhadra.' },
      { id: 'q2', type: 'mcq', prompt: 'Who is the biological father of Dhritarashtra and Pandu?', options: ['Vichitravirya', 'Bhishma', 'Vyasa', 'Shantanu'], answer: 2, explanation: 'Vyasa, through niyoga; Vichitravirya is their legal father.' },
      { id: 'q3', type: 'order', prompt: 'Order the Kaurava commanders at Kurukshetra.', items: ['Bhishma', 'Drona', 'Karna', 'Shalya'], explanation: 'Bhishma (days 1–10), Drona (11–15), Karna (16–17), Shalya (18).' },
      { id: 'q4', type: 'relationship', prompt: 'Parikshit is Arjuna\'s…', options: ['son', 'grandson', 'nephew', 'great-grandson'], answer: 1, explanation: 'Arjuna → Abhimanyu → Parikshit.' },
      { id: 'q5', type: 'mcq', prompt: 'Who was the divine father of Karna?', options: ['Indra', 'Surya', 'Vayu', 'Yama'], answer: 1, explanation: 'Surya; Kunti bore him before marriage.' },
    ],
  },
  {
    id: 'quiz-philosophy', title: 'Philosophy and Connections', topic: 'philosophy',
    questions: [
      { id: 'q1', type: 'mcq', prompt: 'Karma yoga in the Gita means…', options: ['Renouncing all action', 'Acting without attachment to results', 'Performing only rituals', 'Accumulating good karma'], answer: 1, explanation: 'Act according to duty while relinquishing attachment to the fruits.' },
      { id: 'q2', type: 'relationship', prompt: 'Which god is the divine father of both Hanuman and Bhima?', options: ['Indra', 'Surya', 'Vayu', 'Agni'], answer: 2, explanation: 'Vayu — linking the two epics.' },
      { id: 'q3', type: 'truefalse', prompt: 'Parashurama appears in both the Ramayana and the Mahabharata.', answer: 0, explanation: 'True — he confronts Rama, and teaches Bhishma, Drona and Karna.' },
      { id: 'q4', type: 'mcq', prompt: '"Tat tvam asi" is from which text?', options: ['Rigveda', 'Chandogya Upanishad', 'Bhagavad Gita', 'Ramayana'], answer: 1, explanation: 'Chandogya Upanishad, chapter 6.' },
      { id: 'q5', type: 'reasoning', prompt: 'Why should the Valmiki Ramayana and Ramcharitmanas not be treated as the same text?', options: ['They have different heroes', 'They are distinct works in different languages and eras with different theological emphases', 'One is a Purana', 'The Manas is a translation'], answer: 1, explanation: 'The Manas is a 16th-century Awadhi devotional work, not a translation of Valmiki.' },
    ],
  },
];

export const quizById = new Map(quizzes.map((q) => [q.id, q]));
