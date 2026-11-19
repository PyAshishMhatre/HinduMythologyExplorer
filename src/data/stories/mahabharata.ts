import type { Story } from '../types';
import { ref } from '../helpers';

const MB = 'mahabharata';

export const mahabharataStories: Story[] = [
  {
    id: 'bhishma-vow-story',
    title: 'Bhishma\'s Vow and the Kuru Heirs',
    subtitle: 'How a terrible promise shaped three generations',
    category: 'mahabharata',
    era: 'mahabharata',
    readingMinutes: 16,
    introduction: 'Before the Pandavas and Kauravas there was Shantanu, a river goddess, a fisher-maiden, a son who gave up everything — and a dynasty that nearly ended.',
    chapters: [
      {
        id: 'ch1', title: 'The River Goddess',
        narrative: [
          'King [[char:shantanu|Shantanu]] of [[place:hastinapura|Hastinapura]], descendant of [[char:kuru|Kuru]], met a woman of unearthly beauty on the banks of the Ganga and asked her to marry him. She agreed on one condition: he must never question or oppose anything she did. If he did, she would leave.',
          'Each time she bore a son, she carried him to the river and drowned him. Seven sons died this way. Shantanu, bound by his word, said nothing. When she lifted the eighth, he cried out.',
          'She revealed herself as [[char:ganga|Ganga]]. The sons were the eight Vasus, cursed by the sage [[char:vashistha|Vashistha]] to be born as mortals for stealing his cow. She had freed seven at birth; the eighth, Prabhasa, who had led the theft, must live a long human life. She took the child away and later returned him, fully educated, as Devavrata.',
        ],
        events: ['shantanu-ganga'],
      },
      {
        id: 'ch2', title: 'The Fisher-Maiden',
        narrative: [
          'Years later, Shantanu fell in love with [[char:satyavati|Satyavati]], adopted daughter of a fisher chief, whose body carried a divine fragrance. Her father agreed to the marriage only if Satyavati\'s sons would inherit the throne. Shantanu, unwilling to disinherit Devavrata, returned home heartsick.',
          'Devavrata learned the reason and went to the fisher chief himself. He renounced his claim to the throne. When the chief worried that Devavrata\'s own sons might fight for it, Devavrata vowed lifelong celibacy. The gods showered flowers and called him [[char:bhishma|Bhishma]], "the one of the terrible vow". Shantanu, moved, gave him the boon of choosing the time of his own death.',
        ],
        events: ['bhishma-vow'],
      },
      {
        id: 'ch3', title: 'Three Princesses of Kashi',
        narrative: [
          'Shantanu and Satyavati had two sons, [[char:chitrangada|Chitrangada]] and [[char:vichitravirya|Vichitravirya]]. Chitrangada died young in battle with a gandharva of the same name. Bhishma, seeking brides for the young Vichitravirya, carried off the three princesses of Kashi — [[char:amba|Amba]], [[char:ambika|Ambika]] and [[char:ambalika|Ambalika]] — from their swayamvara, defeating all the assembled kings.',
          'Amba revealed she had chosen King Shalva. Bhishma let her go, but Shalva rejected her as another man\'s prize. Bhishma, bound by his vow, refused to marry her. Even [[char:parashurama|Parashurama]], Bhishma\'s guru, could not compel him in a long battle. Amba performed austerities, was granted by Shiva that she would cause Bhishma\'s death in her next life, and entered fire. She was reborn as [[char:shikhandi|Shikhandi]].',
        ],
      },
      {
        id: 'ch4', title: 'A Dynasty Without Heirs',
        narrative: [
          'Vichitravirya married Ambika and Ambalika, but died of consumption without children. The Kuru line was about to end.',
          'Satyavati first begged Bhishma to father children with the widows. He refused: he would abandon the three worlds before his vow. Then Satyavati revealed a secret: before her marriage, the sage [[char:parashara|Parashara]] had fathered a son with her — [[char:vyasa|Vyasa]]. She called on him to perform [[term:niyoga|niyoga]].',
        ],
        concepts: ['niyoga'],
      },
      {
        id: 'ch5', title: 'Three Sons',
        narrative: [
          'Vyasa was dark, matted and gaunt from austerity. Ambika closed her eyes in fear, and her son [[char:dhritarashtra|Dhritarashtra]] was born blind. Ambalika went pale, and [[char:pandu|Pandu]] was born pale. Satyavati asked Vyasa to visit Ambika again; she sent her maidservant instead, who welcomed him calmly, and bore [[char:vidura|Vidura]], wise and righteous.',
          'Bhishma raised the three. Dhritarashtra, though eldest, was passed over because of his blindness; Pandu became king. Vidura, son of a servant, became minister. These three facts — blindness, succession, and birth status — will drive the whole epic.',
        ],
        events: ['niyoga'],
      },
      {
        id: 'ch6', title: 'Gandhari, Kunti and Madri',
        narrative: [
          'Dhritarashtra married [[char:gandhari|Gandhari]], princess of Gandhara, who blindfolded herself for life in solidarity. Her brother [[char:shakuni|Shakuni]] came with her.',
          'Pandu married [[char:kunti|Kunti]] — born Pritha, sister of the Yadava [[char:vasudeva|Vasudeva]] — and [[char:madri|Madri]]. While hunting, Pandu shot a sage who had taken the form of a deer to mate with his wife. The dying sage cursed Pandu to die if he ever made love.',
          'Pandu retired to the forest. Kunti told him of the mantra given her by [[char:durvasa|Durvasa]]. At Pandu\'s request she invoked Dharma ([[char:yama|Yama]]), [[char:vayu|Vayu]] and [[char:indra|Indra]], bearing [[char:yudhishthira|Yudhishthira]], [[char:bhima|Bhima]] and [[char:arjuna|Arjuna]]. She shared the mantra with Madri, who invoked the [[char:ashvins|Ashvins]] and bore twins, [[char:nakula|Nakula]] and [[char:sahadeva|Sahadeva]].',
          'Kunti kept a secret: as a girl she had tested the mantra, invoked [[char:surya|Surya]], and borne [[char:karna|Karna]], whom she set adrift on the river.',
          'Gandhari, meanwhile, after a two-year pregnancy, delivered a mass of flesh; Vyasa divided it into a hundred and one pots, and the Kauravas were born, eldest [[char:duryodhana|Duryodhana]].',
        ],
        events: ['pandava-births'],
      },
    ],
    characters: ['shantanu', 'ganga', 'bhishma', 'satyavati', 'chitrangada', 'vichitravirya', 'amba', 'ambika', 'ambalika', 'vyasa', 'parashara', 'dhritarashtra', 'pandu', 'vidura', 'gandhari', 'kunti', 'madri', 'shakuni', 'karna', 'yudhishthira', 'bhima', 'arjuna', 'nakula', 'sahadeva', 'duryodhana', 'durvasa'],
    events: ['shantanu-ganga', 'bhishma-vow', 'niyoga', 'pandava-births'],
    consequences: ['The succession crisis between Dhritarashtra\'s and Pandu\'s sons.', 'Amba\'s rebirth as Shikhandi seals Bhishma\'s fate.', 'Karna\'s concealed birth.'],
    whyItMatters: 'Every major conflict of the Mahabharata grows from decisions made in this generation.',
    philosophicalMeaning: 'Bhishma\'s vow is heroic and catastrophic: unbending personal virtue can produce collective harm. The epic repeatedly says that dharma is subtle.',
    relatedStories: ['dice-to-kurukshetra', 'descent-of-ganga'],
    familyTree: 'kuru',
    sources: [ref(MB, 'Adi Parva'), ref(MB, 'Udyoga Parva', 'attested', 'Amba narrative')],
    quizId: 'quiz-kuru',
  },
  {
    id: 'dice-to-kurukshetra',
    title: 'From the Dice Game to Kurukshetra',
    subtitle: 'Rivalry, humiliation, exile and the great war',
    category: 'mahabharata',
    era: 'mahabharata',
    readingMinutes: 25,
    introduction: 'The heart of the Mahabharata: how cousins became enemies, how a game of dice destroyed a kingdom, and how eighteen days of war ended an age.',
    chapters: [
      {
        id: 'ch1', title: 'Cousins and Rivals',
        narrative: [
          'After Pandu\'s death, [[char:kunti|Kunti]] brought the five boys to Hastinapura. They were raised with the hundred Kauravas and taught first by [[char:kripa|Kripa]], then by [[char:drona|Drona]]. [[char:arjuna|Arjuna]] became Drona\'s favourite; [[char:bhima|Bhima]]\'s strength and pranks made [[char:duryodhana|Duryodhana]] hate him. Duryodhana poisoned Bhima and threw him in the river; the nagas revived him with greater strength.',
          'At the graduation tournament, an unknown warrior — [[char:karna|Karna]] — matched Arjuna\'s every feat and challenged him. Asked his lineage, he was mocked as a charioteer\'s son. Duryodhana crowned him king of Anga on the spot. Kunti, recognising her son by his armour and earrings, fainted.',
        ],
      },
      {
        id: 'ch2', title: 'The House of Lac and Draupadi',
        narrative: [
          'Duryodhana sent the Pandavas to Varanavata, to a palace built of lac and other flammable materials. Warned in riddles by [[char:vidura|Vidura]], they escaped through a tunnel as it burned and lived disguised as brahmins. Bhima killed the rakshasa Hidimba and married his sister [[char:hidimbi|Hidimbi]], who bore [[char:ghatotkacha|Ghatotkacha]].',
          'At the swayamvara of [[char:draupadi|Draupadi]], princess of Panchala, Arjuna — still disguised — strung the great bow and shot through a revolving target to pierce the eye of a fish, looking only at its reflection. Returning home, the brothers called out that they had brought alms. Kunti, not looking, said: share it equally. Draupadi became the wife of all five. Here [[char:krishna|Krishna]] first met and recognised his cousins.',
        ],
        events: ['lac-house', 'draupadi-swayamvara'],
      },
      {
        id: 'ch3', title: 'Indraprastha',
        narrative: [
          'Dhritarashtra gave the Pandavas half the kingdom — the barren Khandava forest. With Krishna\'s help, they built the magnificent city of [[place:indraprastha|Indraprastha]]. Arjuna and Krishna burned the Khandava forest to feed [[char:agni|Agni]], who gave Arjuna the Gandiva bow; the asura architect Maya, saved from the fire, built the Pandavas a hall of illusions.',
          '[[char:yudhishthira|Yudhishthira]] performed the Rajasuya, declaring himself emperor. Krishna killed the insulting Shishupala. Visiting the hall, Duryodhana mistook a polished floor for water and fell into a pool that looked like floor — and, in a popular later version, Draupadi laughed. His humiliation turned to murderous envy.',
        ],
        events: ['indraprastha-rajasuya'],
      },
      {
        id: 'ch4', title: 'The Dice Game',
        narrative: [
          'Duryodhana\'s uncle [[char:shakuni|Shakuni]], a master of dice, proposed a game. Yudhishthira, honour-bound not to refuse a challenge, accepted. Shakuni won every throw. Yudhishthira staked his wealth, his army, his kingdom, then his brothers one by one, then himself — and finally Draupadi.',
          '[[char:dushasana|Dushasana]] dragged Draupadi, who was menstruating and wore a single garment, into the hall by her hair. She asked the assembly a question that no one could answer: had Yudhishthira lost her before or after he lost himself, and if after, what right did he have to stake her? [[char:bhishma|Bhishma]] said dharma was subtle. Only the Kaurava Vikarna and Vidura spoke for her. Karna called her a whore and ordered her stripped.',
          'As Dushasana pulled at her sari, cloth kept appearing, endlessly, until he collapsed. (In the popular tradition, Draupadi calls on Krishna, who provides the cloth.) Bhima vowed to tear open Dushasana\'s chest and drink his blood and to break Duryodhana\'s thigh.',
          'Frightened by omens, Dhritarashtra granted Draupadi boons; she freed her husbands. But a second game was played, and the Pandavas lost again: twelve years of exile in the forest and a thirteenth year in disguise. If discovered, the cycle would repeat.',
        ],
        events: ['dice-game'],
      },
      {
        id: 'ch5', title: 'The Forest Years',
        narrative: [
          'The exile is rich with stories. Arjuna won the Pashupata weapon from [[char:shiva|Shiva]] disguised as a hunter, and lived in [[char:indra|Indra]]\'s heaven, where he refused [[char:urvashi|Urvashi]] and was cursed to be a eunuch for a year. Bhima met his brother [[char:hanuman|Hanuman]]. Yudhishthira heard the story of Nala and Damayanti, and the sage Markandeya told the Ramayana.',
          'At an enchanted lake, a yaksha killed four brothers for drinking without answering his questions. Yudhishthira answered them all. "What is the greatest wonder?" "Every day, creatures go to the house of Death, yet those who remain think they will live forever." Offered one brother\'s life, he chose Nakula, so that Madri too would have a living son. The yaksha revealed himself as Dharma — Yudhishthira\'s father — and restored them all.',
          'In the thirteenth year, the Pandavas hid in King Virata\'s court: Yudhishthira as a courtier, Bhima as a cook, Arjuna as the dance-teacher Brihannala (using Urvashi\'s curse), the twins as horse and cow keepers, Draupadi as a maid. Bhima killed the general Kichaka, who harassed Draupadi.',
        ],
        events: ['yaksha-prashna'],
      },
      {
        id: 'ch6', title: 'The Last Chance for Peace',
        narrative: [
          'The Pandavas asked for their kingdom back. Duryodhana refused. Krishna went to Hastinapura as a peace envoy, asking finally for just five villages. Duryodhana replied that he would not give "even as much land as the point of a needle". He tried to arrest Krishna, who revealed his cosmic form.',
          'Krishna then offered Karna the throne if he joined his brothers, revealing his birth. Karna refused to abandon Duryodhana. Kunti came too; he promised her that she would still have five sons — either he or Arjuna would survive.',
          'Both sides asked Krishna for help. He offered his vast Narayani army to one side and himself, unarmed, to the other. Arjuna chose Krishna; Duryodhana gladly took the army.',
        ],
      },
      {
        id: 'ch7', title: 'The Song of the Lord',
        narrative: [
          'On the field of [[place:kurukshetra|Kurukshetra]], with Krishna as his charioteer, Arjuna saw his grandsire Bhishma, his teacher Drona and his cousins arrayed against him. His limbs failed, his bow slipped. He would rather be killed than kill his own kin.',
          'Krishna\'s reply is the [[term:bhagavad-gita|Bhagavad Gita]]. The Self ([[term:atman|atman]]) is not born and does not die; one must do one\'s duty ([[term:dharma|svadharma]]) without attachment to results ([[term:karma|karma yoga]]); the steady wise one is unmoved by pleasure and pain; ultimately, surrender to the divine with love ([[term:bhakti|bhakti]]). In the eleventh chapter, Krishna reveals his universal form — "I am Time, the destroyer of worlds" — in which Arjuna sees the warriors already rushing to their deaths.',
          'Arjuna picked up his bow.',
        ],
        events: ['gita'],
      },
      {
        id: 'ch8', title: 'Eighteen Days',
        narrative: [
          'Bhishma commanded the Kauravas for ten days and was unstoppable. He told the Pandavas the secret of his death: he would not fight [[char:shikhandi|Shikhandi]], born a woman. On the tenth day Arjuna shot him from behind Shikhandi. Bhishma fell onto a bed of arrows and waited for the sun\'s northern course to die.',
          '[[char:drona|Drona]] took command. He arrayed the army in the chakravyuha. Sixteen-year-old [[char:abhimanyu|Abhimanyu]], who knew how to break in but not out, entered alone and was killed by several warriors at once. Arjuna vowed to kill Jayadratha, who had blocked the others, before sunset the next day — and did, as Krishna created a false sunset. That night, Karna used Indra\'s one-time spear on [[char:ghatotkacha|Ghatotkacha]].',
          'To stop Drona, Krishna proposed a lie. Bhima killed an elephant named Ashwatthama, and Yudhishthira told Drona "Ashwatthama is dead" — muttering "the elephant" under his breath. His chariot, which had always floated above the ground, touched the earth. Drona laid down his weapons and [[char:dhrishtadyumna|Dhrishtadyumna]] beheaded him.',
          'Karna led on the sixteenth and seventeenth days. Bhima killed Dushasana and drank his blood. On the seventeenth day, Karna\'s chariot wheel sank; Parashurama\'s curse made him forget his weapons. As he struggled to lift the wheel, Krishna urged Arjuna to shoot, and Karna died. On the eighteenth day Sahadeva killed Shakuni. Duryodhana hid in a lake; Bhima challenged him to a mace duel and, at Krishna\'s signal, struck his thigh — a forbidden blow.',
        ],
        events: ['kurukshetra-war'],
      },
      {
        id: 'ch9', title: 'The Night Raid and the Aftermath',
        narrative: [
          'That night [[char:ashwatthama|Ashwatthama]], Drona\'s son, crept into the Pandava camp and slaughtered the sleeping warriors, including Dhrishtadyumna, Shikhandi and Draupadi\'s five sons. Pursued, he launched the Brahmashira against the womb of [[char:uttara|Uttara]]. Krishna revived the stillborn child, [[char:parikshit|Parikshit]], and cursed Ashwatthama to wander for three thousand years.',
          'Grief followed. [[char:gandhari|Gandhari]] cursed Krishna that his clan would perish. Kunti finally told the Pandavas that Karna was their eldest brother; Yudhishthira cursed all women never to be able to keep secrets. Bhishma, on his bed of arrows, taught Yudhishthira for days on dharma, kingship and liberation, and died at the winter solstice.',
          'Thirty-six years later, the Yadavas destroyed one another at Prabhasa; Krishna was killed by a hunter\'s arrow; Dwarka sank. The Pandavas crowned Parikshit and walked toward the Himalayas. Only Yudhishthira, followed by a faithful dog — Dharma in disguise — reached heaven in his body.',
        ],
        events: ['war-aftermath', 'parikshit-janamejaya'],
      },
    ],
    characters: ['arjuna', 'bhima', 'yudhishthira', 'nakula', 'sahadeva', 'draupadi', 'kunti', 'krishna', 'duryodhana', 'dushasana', 'shakuni', 'karna', 'bhishma', 'drona', 'kripa', 'ashwatthama', 'abhimanyu', 'ghatotkacha', 'shikhandi', 'dhrishtadyumna', 'gandhari', 'dhritarashtra', 'vidura', 'parikshit', 'hanuman', 'yama'],
    events: ['lac-house', 'draupadi-swayamvara', 'indraprastha-rajasuya', 'dice-game', 'yaksha-prashna', 'gita', 'kurukshetra-war', 'war-aftermath'],
    consequences: ['The destruction of almost the entire warrior class.', 'Parikshit becomes sole heir.', 'The traditional start of the Kali Yuga.'],
    whyItMatters: 'Its ethical complexity — both sides use questionable means; heroes fail; villains have virtues — makes the Mahabharata unique among the world\'s epics.',
    philosophicalMeaning: '"What is not here is nowhere," the epic claims of itself. Its central question is how to act rightly when every choice involves harm.',
    relatedStories: ['bhishma-vow-story'],
    familyTree: 'kuru',
    sources: [ref(MB, 'Adi–Svargarohana Parvas'), ref('bhagavad-gita')],
    variations: [
      {
        title: 'Critical Edition and popular tradition',
        primary: { tradition: 'BORI Critical Edition', account: 'Reconstructs the oldest attainable text; omits some popular episodes such as Draupadi\'s mocking laugh and an explicit plea to Krishna during the disrobing.' },
        alternate: { tradition: 'Vulgate (Nilakantha) & regional Mahabharatas', account: 'Include these well-loved episodes, which strongly shape popular understanding.' },
        difference: 'Textual layers versus living tradition.',
        whyItMatters: 'Many "famous" Mahabharata scenes are later additions — which does not make them less meaningful to the tradition.',
      },
    ],
    quizId: 'quiz-kuru',
  },
];
