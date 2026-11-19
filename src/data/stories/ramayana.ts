import type { Story } from '../types';
import { ref } from '../helpers';

const VR = 'valmiki-ramayana';

export const ramayanaStories: Story[] = [
  {
    id: 'ravana-origins',
    title: 'The Rise of Ravana',
    subtitle: 'A sage\'s son, a rakshasa\'s ambition, and a boon with one flaw',
    category: 'ramayana',
    era: 'ramayana',
    readingMinutes: 9,
    introduction: 'The Uttara Kanda tells Ravana\'s backstory in retrospect, to Rama, by the sage Agastya. Chronologically it comes before everything else in the Ramayana.',
    chapters: [
      {
        id: 'ch1', title: 'A Brahmin Grandson of Brahma',
        narrative: [
          '[[char:pulastya|Pulastya]], a mind-born son of [[char:brahma|Brahma]], had a son, the sage [[char:vishrava|Vishrava]]. Vishrava\'s first son, [[char:kubera|Kubera]], won through austerity the lordship of wealth, the golden city of [[place:lanka|Lanka]] and the flying chariot Pushpaka.',
          'The rakshasa [[char:sumali|Sumali]], who had once ruled Lanka before being driven out by Vishnu, saw Kubera\'s splendour and devised a plan. He sent his daughter [[char:kaikesi|Kaikesi]] to Vishrava. She approached him at dusk, an inauspicious hour; he foretold that her sons would be dreadful, but the youngest would be righteous.',
        ],
      },
      {
        id: 'ch2', title: 'Four Children',
        narrative: [
          'First came Dashagriva — ten-necked, ten-headed — who would be called [[char:ravana|Ravana]]. Then the giant [[char:kumbhakarna|Kumbhakarna]], the daughter [[char:shurpanakha|Shurpanakha]], and finally gentle [[char:vibhishana|Vibhishana]].',
          'Kaikesi, pointing to Kubera in his chariot, urged her sons to match his glory. The brothers went to Gokarna for austerities lasting thousands of years.',
        ],
      },
      {
        id: 'ch3', title: 'Ten Heads in the Fire',
        narrative: [
          'Ravana offered one of his heads into the sacred fire every thousand years. When only one remained, Brahma appeared. Ravana asked for immortality; refused, he asked for invulnerability against gods, demons, nagas, yakshas, gandharvas and other celestial beings. He did not bother to include humans or animals — creatures he despised. Brahma also restored his heads.',
          'Kumbhakarna, about to ask for a boon the gods feared, was confused (by the goddess Saraswati, at the gods\' request) and asked for sleep. Vibhishana asked that his mind always remain in dharma.',
        ],
        events: ['ravana-boon'],
        concepts: ['boon', 'tapas'],
      },
      {
        id: 'ch4', title: 'Conqueror of the Worlds',
        narrative: [
          'Ravana drove Kubera from Lanka and took the Pushpaka. Flying past Kailash, his chariot was blocked; in rage he tried to uproot the mountain. [[char:shiva|Shiva]] pressed it down with his toe, crushing Ravana\'s arms. Ravana cried out so loudly that he was named Ravana ("one who makes the worlds cry"). He sang Shiva\'s praises for a thousand years and was forgiven — and became a devoted Shaiva.',
          'He then defeated the gods, humiliated [[char:indra|Indra]] (with his son Meghanada, who thus became [[char:indrajit|Indrajit]]), and molested women — including the apsara Rambha, which brought on him a curse: if he ever forced a woman, his head would shatter. That curse is why, in this tradition, he never forces [[char:sita|Sita]].',
          'The gods turned to Vishnu. Because Ravana had left humans out of his boon, Vishnu would be born as a man.',
        ],
        events: ['kubera-expelled', 'dasharatha-yajna'],
      },
    ],
    characters: ['ravana', 'pulastya', 'vishrava', 'kaikesi', 'sumali', 'kubera', 'kumbhakarna', 'vibhishana', 'shurpanakha', 'brahma', 'shiva', 'indrajit'],
    events: ['ravana-boon', 'kubera-expelled'],
    whyItMatters: 'Explains why Vishnu must be born as a human, and gives Ravana tragic depth: learned, devout and brilliant, but undone by pride and desire.',
    relatedStories: ['rama-early-life', 'hanuman-lanka'],
    familyTree: 'ravana',
    sources: [ref(VR, 'Uttara Kanda'), ref('mahabharata', 'Vana Parva', 'attested', 'Ramopakhyana variant')],
    variations: [
      {
        title: 'Ravana\'s mother',
        primary: { tradition: 'Valmiki Ramayana, Uttara Kanda', account: 'Kaikesi, daughter of Sumali, is the mother of all four siblings.' },
        alternate: { tradition: 'Mahabharata, Ramopakhyana', account: 'Different rakshasi wives of Vishrava bear Ravana and Kumbhakarna, Vibhishana, and Khara and Shurpanakha.' },
        difference: 'The number of mothers.',
      },
    ],
    quizId: 'quiz-ramayana',
  },
  {
    id: 'rama-early-life',
    title: 'Rama: Birth to Marriage',
    subtitle: 'From the putrakameshti to the breaking of Shiva\'s bow',
    category: 'ramayana',
    era: 'ramayana',
    readingMinutes: 16,
    introduction: 'The Bala Kanda — the "book of childhood" — opens the Ramayana with the birth of four princes and the journey that brings Rama to Sita.',
    chapters: [
      {
        id: 'ch1', title: 'How the Poem Began',
        narrative: [
          'The sage [[char:valmiki|Valmiki]] asked [[char:narada|Narada]] whether there lived a man who was virtuous, powerful, truthful and compassionate. Narada told him of [[char:rama|Rama]] of Ayodhya and recounted his story.',
          'Soon after, Valmiki saw a hunter shoot one of a pair of mating krauncha birds. His grief burst out as a curse in perfectly measured verse — the first shloka. [[char:brahma|Brahma]] appeared and told him to compose the story of Rama in this new metre. So the Ramayana is called the Adi Kavya, the first poem.',
        ],
      },
      {
        id: 'ch2', title: 'A Childless King',
        narrative: [
          'In [[place:ayodhya|Ayodhya]], capital of Kosala on the Sarayu, ruled [[char:dasharatha|Dasharatha]] of the [[dynasty:suryavansha|Ikshvaku line]]. He had everything except a son. On the advice of his ministers and [[char:vashistha|Vashistha]], he performed the ashvamedha and then the putrakameshti, the sacrifice for sons, led by the sage Rishyashringa.',
          'Meanwhile the gods appealed to Vishnu against [[char:ravana|Ravana]]. Vishnu agreed to be born as Dasharatha\'s sons. From the sacrificial fire rose a radiant being with a golden vessel of payasa. Dasharatha gave half to [[char:kausalya|Kausalya]], a portion to [[char:sumitra|Sumitra]], a portion to [[char:kaikeyi|Kaikeyi]], and the rest again to Sumitra.',
        ],
        events: ['dasharatha-yajna'],
      },
      {
        id: 'ch3', title: 'Four Princes',
        narrative: [
          'Rama was born to Kausalya on the ninth day of the bright half of Chaitra — celebrated as Rama Navami. [[char:bharata|Bharata]] was born to Kaikeyi, and the twins [[char:lakshmana|Lakshmana]] and [[char:shatrughna|Shatrughna]] to Sumitra.',
          'The four grew up learned and skilled. Lakshmana was inseparable from Rama, Shatrughna from Bharata.',
        ],
        events: ['rama-birth'],
      },
      {
        id: 'ch4', title: 'The Sage at the Gate',
        narrative: [
          'When Rama was not yet sixteen, the formidable sage [[char:vishvamitra|Vishvamitra]] arrived and asked the king for Rama, to protect his sacrifice from the rakshasas Maricha and Subahu. Dasharatha, terrified for his son, offered his army instead. Vishvamitra\'s anger flared; Vashistha persuaded the king to trust the sage.',
          'On the road, Vishvamitra taught the brothers the mantras bala and atibala, which banish hunger and fatigue, and then many celestial weapons. He told them the history of the land they crossed — including the [[story:descent-of-ganga|descent of Ganga]] through their own ancestor Bhagiratha.',
          'Rama killed the demoness Tataka, then at the sacrifice drove [[char:maricha|Maricha]] hundreds of leagues out to sea with one arrow and killed Subahu.',
        ],
        events: ['vishvamitra-arrives'],
      },
      {
        id: 'ch5', title: 'Ahalya',
        narrative: [
          'On the way to Mithila they passed the deserted hermitage of [[char:gautama|Gautama]]. Vishvamitra told how [[char:indra|Indra]] had come to Gautama\'s wife [[char:ahalya|Ahalya]] in her husband\'s form, and how Gautama had cursed both. Ahalya had lived unseen, fasting, purified by penance, awaiting Rama.',
          'When Rama entered, Ahalya appeared, radiant. Rama and Lakshmana touched her feet. Gautama returned and was reunited with her.',
          '> In the Ramcharitmanas and many popular versions, Ahalya has been turned to stone and is restored by the touch of Rama\'s foot. See Ahalya\'s profile for this important difference.',
        ],
        events: ['ahalya-redeemed'],
      },
      {
        id: 'ch6', title: 'The Bow of Shiva',
        narrative: [
          'In [[place:mithila|Mithila]], King [[char:janaka|Janaka]] received them. He told how, while ploughing, he had found a baby girl in the furrow — [[char:sita|Sita]] — and raised her as his daughter. He had promised her only to the man who could string the great bow of Shiva, which no king had even been able to lift.',
          'The bow was brought on an eight-wheeled cart drawn by five thousand men. Rama lifted it easily, strung it, and drew it — and the bow broke with a sound like thunder that knocked the assembly down.',
          'Messengers went to Ayodhya. In a great wedding, Rama married Sita; Lakshmana married her sister [[char:urmila|Urmila]]; Bharata and Shatrughna married [[char:mandavi|Mandavi]] and [[char:shrutakirti|Shrutakirti]], daughters of Janaka\'s brother [[char:kushadhvaja|Kushadhvaja]]. At the ceremony, Vashistha recited the Ikshvaku genealogy from Brahma to Dasharatha.',
        ],
        events: ['sita-swayamvara'],
      },
      {
        id: 'ch7', title: 'Parashurama',
        narrative: [
          'On the way home, the sky darkened. [[char:parashurama|Parashurama]], destroyer of kshatriyas and devotee of Shiva, blocked their path with Vishnu\'s bow, angered that Shiva\'s bow had been broken. He challenged Rama to string this one.',
          'Rama took the bow from him, strung it, and fitted an arrow. Since a divine arrow could not be wasted, he asked: should he destroy Parashurama\'s power of movement, or the worlds he had won by austerity? Parashurama recognised Rama as Vishnu, surrendered his merit, and departed. Two avatars had met — and one had passed the torch to the other.',
        ],
      },
    ],
    characters: ['valmiki', 'narada', 'dasharatha', 'kausalya', 'kaikeyi', 'sumitra', 'rama', 'bharata', 'lakshmana', 'shatrughna', 'vashistha', 'vishvamitra', 'maricha', 'ahalya', 'gautama', 'indra', 'janaka', 'sita', 'urmila', 'mandavi', 'shrutakirti', 'kushadhvaja', 'parashurama'],
    events: ['dasharatha-yajna', 'rama-birth', 'vishvamitra-arrives', 'ahalya-redeemed', 'sita-swayamvara'],
    whyItMatters: 'Establishes Rama\'s divine purpose, his teachers, his marriage, and his link to the Ikshvaku ancestors.',
    philosophicalMeaning: 'Rama\'s education by two contrasting gurus — Vashistha (wisdom) and Vishvamitra (power won through effort) — prepares the ideal king.',
    relatedStories: ['descent-of-ganga', 'rama-exile', 'ravana-origins'],
    familyTree: 'ramayana',
    sources: [ref(VR, 'Bala Kanda'), ref('ramcharitmanas', 'Bal Kand', 'tradition'), ref('scholarship', undefined, 'modern-historical', 'Bala Kanda as a later layer')],
    variations: [
      {
        title: 'Valmiki and the Ramcharitmanas',
        primary: { tradition: 'Valmiki Ramayana (Sanskrit epic)', account: 'Janaka\'s bow test is a standing challenge; Rama is presented largely as an ideal human prince.' },
        alternate: { tradition: 'Ramcharitmanas (Awadhi devotional, Tulsidas)', account: 'A grand swayamvara with assembled kings; Rama and Sita first glimpse each other in a garden; Rama is the Supreme Lord from the start.' },
        difference: 'Romance, spectacle and explicit theology.',
        shared: 'The breaking of Shiva\'s bow and the fourfold wedding.',
        whyItMatters: 'The Manas is not a translation of Valmiki but an independent devotional masterpiece.',
      },
    ],
    quizId: 'quiz-ramayana',
  },
  {
    id: 'rama-exile',
    title: 'Exile and Abduction',
    subtitle: 'Kaikeyi\'s boons, the forest years and the golden deer',
    category: 'ramayana',
    era: 'ramayana',
    readingMinutes: 18,
    introduction: 'The Ayodhya and Aranya Kandas move from palace intrigue to forest adventure — and to the theft that sets the war in motion.',
    chapters: [
      {
        id: 'ch1', title: 'The Coronation That Never Happened',
        narrative: [
          'Aging, [[char:dasharatha|Dasharatha]] decided to crown [[char:rama|Rama]] heir. Ayodhya rejoiced. But [[char:kaikeyi|Kaikeyi]]\'s maid Manthara poisoned her mistress\'s mind: once Rama was king, [[char:bharata|Bharata]] would be his servant and Kaikeyi a nobody.',
          'Kaikeyi remembered two boons Dasharatha had granted her after she saved his life in battle. She demanded them: Bharata to be crowned, and Rama to be exiled to the forest for fourteen years. Dasharatha begged, raged and fainted, but could not break his word.',
        ],
        events: ['kaikeyi-boons'],
      },
      {
        id: 'ch2', title: 'Rama Accepts',
        narrative: [
          'Rama heard the news without a flicker of resentment. A father\'s word, he said, must be kept. He comforted [[char:kausalya|Kausalya]]. [[char:lakshmana|Lakshmana]] raged at the injustice, but resolved to follow Rama.',
          'Rama tried to persuade [[char:sita|Sita]] to stay. She refused in one of the epic\'s great speeches: where Rama is, there is Ayodhya. They gave away their wealth, put on bark garments and left. The whole city followed their chariot weeping. Six days later Dasharatha died of grief, recalling the curse of Shravana Kumara\'s parents.',
        ],
      },
      {
        id: 'ch3', title: 'Bharata\'s Refusal',
        narrative: [
          'Bharata, returning from his uncle\'s kingdom, learned what had happened. He denounced his mother and refused the throne. With the queens, ministers and army he went to [[place:chitrakoot|Chitrakuta]] to bring Rama home.',
          'The brothers\' meeting is among the most moving scenes in the epic. Rama would not go back; his father\'s truth had to be honoured. Bharata took Rama\'s sandals, placed them on the throne, and ruled from the village of Nandigrama as Rama\'s regent, living as an ascetic.',
        ],
        events: ['bharata-paduka'],
      },
      {
        id: 'ch4', title: 'Into the Dandaka Forest',
        narrative: [
          'The exiles moved south through the hermitages of the sages — [[char:atri|Atri]] and [[char:anasuya|Anasuya]], Sharabhanga, Sutikshna and [[char:agastya|Agastya]], who gave Rama celestial weapons. Rama promised the sages to protect them from the rakshasas who harassed them. For ten years they lived among the ashrams.',
          'Finally they settled at [[place:panchavati|Panchavati]] on the Godavari, where Lakshmana built a hut. There they met the aged vulture [[char:jatayu|Jatayu]], a friend of their father.',
        ],
      },
      {
        id: 'ch5', title: 'Shurpanakha',
        narrative: [
          '[[char:shurpanakha|Shurpanakha]], sister of Ravana, saw Rama and desired him. Rama said he was married and jokingly sent her to Lakshmana, who sent her back. Humiliated, she lunged at Sita. At Rama\'s command, Lakshmana cut off her nose and ears.',
          'She fled to her brothers Khara and Dushana, whose army of fourteen thousand rakshasas Rama destroyed single-handed. Then she went to [[char:ravana|Ravana]] — and, to inflame him, described Sita\'s beauty.',
        ],
        events: ['shurpanakha-event'],
      },
      {
        id: 'ch6', title: 'The Golden Deer',
        narrative: [
          'Ravana went to [[char:maricha|Maricha]], who had felt Rama\'s arrow as a youth and begged him not to provoke Rama. Threatened with death, Maricha agreed to help. He took the form of a golden deer with silver spots and grazed near the hut.',
          'Sita longed for it. Rama, warning Lakshmana to guard her, pursued it deep into the forest and shot it. Dying, Maricha cried out in Rama\'s voice: "Ha Sita! Ha Lakshmana!"',
          'Sita, terrified, ordered Lakshmana to go to Rama\'s aid. When he hesitated, she accused him of wanting her for himself. Wounded, he went. (The protective "Lakshmana rekha" he draws in later versions is not in Valmiki.)',
        ],
        events: ['sita-abduction'],
      },
      {
        id: 'ch7', title: 'The Abduction',
        narrative: [
          'Ravana approached the hut as a mendicant. Sita welcomed him as a guest. He revealed himself, boasted of his power, and when she scorned him, seized her and rose into the sky in his chariot.',
          'Jatayu attacked and fought valiantly, smashing the chariot, but Ravana cut off his wings. As they flew south, Sita threw her ornaments down to a group of vanaras on a hilltop.',
          'Rama and Lakshmana returned to an empty hut. Rama\'s grief was wild. They found the dying Jatayu, who told them what had happened before he died. Rama cremated him with the honours due to a father.',
        ],
      },
      {
        id: 'ch8', title: 'Shabari',
        narrative: [
          'Searching, they killed the headless monster Kabandha, who on release from his curse advised them to seek [[char:sugriva|Sugriva]]. At Lake Pampa they came to the hermitage of [[char:shabari|Shabari]], an aged ascetic and disciple of the sage Matanga, who had waited all her life to see Rama. She welcomed him with fruits, then entered the fire and ascended to heaven.',
          'In popular devotion she tasted each berry first so Rama received only the sweet ones — an image of love that overrides ritual purity. This detail is a later addition.',
        ],
        events: ['shabari-event'],
      },
    ],
    characters: ['dasharatha', 'kaikeyi', 'rama', 'sita', 'lakshmana', 'bharata', 'kausalya', 'atri', 'anasuya', 'agastya', 'jatayu', 'shurpanakha', 'ravana', 'maricha', 'shabari', 'sugriva'],
    events: ['kaikeyi-boons', 'bharata-paduka', 'shurpanakha-event', 'sita-abduction', 'shabari-event'],
    consequences: ['Dasharatha dies; Bharata rules as regent.', 'Ravana\'s abduction of Sita makes war inevitable.'],
    whyItMatters: 'The moral core of the Ramayana: truth to one\'s word, brotherly love, and steadfastness in suffering.',
    philosophicalMeaning: 'Rama\'s acceptance of exile models non-attachment to power; Bharata\'s refusal shows that the throne is a trust, not a prize.',
    relatedStories: ['rama-early-life', 'hanuman-lanka'],
    sources: [ref(VR, 'Ayodhya Kanda'), ref(VR, 'Aranya Kanda'), ref('folk', undefined, 'later-interpretation', 'Lakshmana rekha; Shabari\'s berries')],
    variations: [
      {
        title: 'Was the real Sita abducted?',
        primary: { tradition: 'Valmiki Ramayana', account: 'Sita herself is abducted.' },
        alternate: { tradition: 'Adhyatma Ramayana & Ramcharitmanas', account: 'Rama places the real Sita in Agni\'s keeping beforehand; a shadow-Sita is abducted.' },
        difference: 'Protects the divine Sita from Ravana\'s touch.',
        whyItMatters: 'Reflects later devotional sensibilities about the divine couple.',
      },
    ],
    quizId: 'quiz-ramayana',
  },
  {
    id: 'hanuman-lanka',
    title: 'Hanuman, the Bridge and the War',
    subtitle: 'From Kishkindha to Lanka and home again',
    category: 'ramayana',
    era: 'ramayana',
    readingMinutes: 20,
    introduction: 'The Kishkindha, Sundara and Yuddha Kandas follow Rama\'s alliance with the vanaras, Hanuman\'s great leap, the war against Ravana, and the return to Ayodhya.',
    chapters: [
      {
        id: 'ch1', title: 'A Meeting at Rishyamuka',
        narrative: [
          'On Rishyamuka hill near [[place:kishkindha|Kishkindha]], the exiled vanara [[char:sugriva|Sugriva]] saw two armed strangers and feared they were sent by his brother [[char:vali|Vali]]. He sent his minister [[char:hanuman|Hanuman]], disguised as a mendicant, to find out.',
          'Rama was struck by Hanuman\'s eloquence. Hanuman brought them to Sugriva, and Rama and Sugriva swore friendship before a fire. Sugriva showed Rama Sita\'s ornaments. Rama promised to kill Vali; Sugriva promised to find Sita.',
        ],
        events: ['hanuman-meets-rama'],
      },
      {
        id: 'ch2', title: 'The Death of Vali',
        narrative: [
          'Sugriva challenged Vali. In the first duel Rama could not tell the brothers apart; Sugriva was beaten. In the second, wearing a garland for identification, Sugriva fought again, and Rama shot Vali from behind a tree.',
          'Dying, Vali reproached Rama: he had never wronged him; to strike from hiding was unworthy. Rama answered that as the representative of the righteous king Bharata, he was punishing Vali for taking his brother\'s wife — and that a hunter may strike an animal unseen. Vali accepted, and asked Rama to protect his son Angada. This episode has been debated by commentators for centuries.',
        ],
      },
      {
        id: 'ch3', title: 'The Search',
        narrative: [
          'After the monsoon, and after an angry Lakshmana rebuked the pleasure-loving Sugriva, search parties went out in four directions. The southern party, with Angada, Hanuman and the bear king Jambavan, reached the ocean in despair. There they met Sampati, Jatayu\'s brother, who with his far-seeing eyes told them Sita was in Lanka, a hundred leagues across the sea.',
          'No one could jump that far. Jambavan reminded Hanuman of his birth from [[char:vayu|Vayu]] and his forgotten powers. Hanuman grew to the size of a mountain.',
        ],
      },
      {
        id: 'ch4', title: 'The Great Leap',
        narrative: [
          'Hanuman sprang from Mount Mahendra. Over the sea, the mountain Mainaka rose to offer him rest; he touched it and flew on. The serpent-mother Surasa, sent by the gods to test him, opened her mouth to swallow him; he grew, she grew, and then he shrank to a thumb\'s size, flew in and out of her mouth and so honoured her terms. He killed Simhika, who seized flying creatures by their shadows.',
          'At night he slipped into Lanka as a cat-sized monkey, searched Ravana\'s palace, and finally found Sita in the Ashoka grove, guarded by rakshasis, refusing Ravana\'s threats.',
        ],
        events: ['hanuman-leap'],
      },
      {
        id: 'ch5', title: 'Lanka Burns',
        narrative: [
          'Hanuman gave Sita Rama\'s ring. She gave him her hair-jewel (chudamani) and a private memory as proof. He offered to carry her back; she refused — Rama himself must come.',
          'Before leaving, Hanuman wrecked the grove, killed Ravana\'s son Aksha, and let himself be captured by [[char:indrajit|Indrajit]] so he could see Ravana. In court he warned Ravana to return Sita. [[char:vibhishana|Vibhishana]] stopped Ravana from killing an envoy; instead they set Hanuman\'s tail on fire. He leapt from roof to roof and set Lanka ablaze, then returned across the ocean.',
        ],
      },
      {
        id: 'ch6', title: 'Vibhishana and the Bridge',
        narrative: [
          'In Lanka, Vibhishana urged Ravana to return Sita. Ravana kicked him out. Vibhishana flew across to Rama. The vanaras suspected a spy, but Rama declared: whoever comes to me for refuge, even Ravana himself, I will protect. He consecrated Vibhishana king of Lanka in advance.',
          'Rama prayed to the Ocean for three days. When it did not appear, he fitted a fiery arrow to dry it up; the Ocean rose and told him the vanara Nala could build a bridge. The vanaras hurled trees and rocks into the sea and built the Setu in five days.',
        ],
        events: ['setu'],
      },
      {
        id: 'ch7', title: 'The War',
        narrative: [
          'The vanara army besieged Lanka. Indrajit, fighting invisibly from the clouds, bound Rama and Lakshmana with serpent-arrows; [[char:garuda|Garuda]] came and freed them.',
          'Ravana woke [[char:kumbhakarna|Kumbhakarna]]. The giant told his brother plainly he was wrong — yet fought for him, devouring vanaras until Rama cut him down.',
          'Indrajit struck Lakshmana with a weapon that left him near death. Hanuman flew to the Himalayas for the healing herb sanjivani; unable to identify it, he carried back the whole mountain. Lakshmana revived. On Vibhishana\'s advice he attacked Indrajit before he could finish a sacrifice that would make him invincible, and killed him.',
        ],
        events: ['lanka-war'],
      },
      {
        id: 'ch8', title: 'Rama and Ravana',
        narrative: [
          'Ravana came out himself. Indra sent Rama his chariot and charioteer Matali. The duel was immense. Each time Rama cut off one of Ravana\'s heads, another grew. At last, on Matali\'s advice, Rama loosed the Brahmastra, which pierced Ravana\'s heart.',
          '[[char:mandodari|Mandodari]] lamented over her husband. Rama ordered Vibhishana to perform Ravana\'s funeral rites: "Enmity ends with death."',
        ],
      },
      {
        id: 'ch9', title: 'Agni Pariksha and the Return',
        narrative: [
          'When Sita was brought, Rama shocked everyone by saying publicly that he had fought to vindicate his honour, and that she was free to go wherever she wished, for she had lived in another man\'s house. Sita, devastated, asked Lakshmana to build a pyre and entered it. [[char:agni|Agni]] rose from the flames with her unharmed and declared her pure. The gods revealed to Rama his divine nature.',
          'They returned in the Pushpaka to Ayodhya, stopping to tell Bharata, who was preparing to enter fire because fourteen years had passed. Rama was crowned, and the golden age of Rama-rajya began. The popular celebration of Diwali is associated with this homecoming.',
        ],
        events: ['return-ayodhya'],
      },
      {
        id: 'ch10', title: 'The Uttara Kanda',
        narrative: [
          'The final book — regarded by many scholars as a later addition — tells darker events. Hearing that citizens gossiped about Sita\'s time in Lanka, Rama had Lakshmana leave the pregnant Sita in the forest. She found shelter with [[char:valmiki|Valmiki]] and gave birth to [[char:lava|Lava]] and [[char:kusha|Kusha]].',
          'Years later, the twins sang the Ramayana at Rama\'s ashvamedha. Recognising them, Rama asked Sita to prove her purity again before the assembly. Sita called on the Earth, her mother, to take her back if she had been true. The ground opened, and she disappeared. Rama ruled for many years, then walked into the Sarayu and returned to his divine form.',
        ],
        events: ['sita-exile'],
      },
    ],
    characters: ['hanuman', 'sugriva', 'vali', 'rama', 'lakshmana', 'sita', 'ravana', 'indrajit', 'vibhishana', 'kumbhakarna', 'mandodari', 'agni', 'garuda', 'bharata', 'valmiki', 'lava', 'kusha', 'vayu'],
    events: ['hanuman-meets-rama', 'hanuman-leap', 'setu', 'lanka-war', 'return-ayodhya', 'sita-exile'],
    consequences: ['Ravana is destroyed and Vibhishana rules Lanka.', 'Rama-rajya becomes the ideal of righteous rule.', 'Sita\'s ordeals become a central question for later interpreters.'],
    whyItMatters: 'Hanuman\'s devotion and the defeat of Ravana are the most performed parts of the epic — in Ramlila across India and in dance-dramas across Southeast Asia.',
    philosophicalMeaning: 'Devotion empowers the "weak" (vanaras) to overcome the mighty; even righteous kingship faces painful conflicts between public duty and personal love.',
    relatedStories: ['rama-exile', 'ravana-origins'],
    familyTree: 'vanara',
    sources: [ref(VR, 'Kishkindha Kanda'), ref(VR, 'Sundara Kanda'), ref(VR, 'Yuddha Kanda'), ref(VR, 'Uttara Kanda')],
    variations: [
      {
        title: 'Sita\'s final fate',
        primary: { tradition: 'Valmiki Ramayana, Uttara Kanda', account: 'Sita is exiled because of gossip and finally returns into the Earth.' },
        alternate: { tradition: 'Ramcharitmanas', account: 'Tulsidas largely ends with Rama\'s joyous reign and does not narrate Sita\'s exile.' },
        difference: 'Whether the story ends in tragedy or harmony.',
        whyItMatters: 'Shows how devotional authors chose what to tell.',
      },
      {
        title: 'Who kills Ravana?',
        primary: { tradition: 'Valmiki and most Hindu Ramayanas', account: 'Rama kills Ravana.' },
        alternate: { tradition: 'Jain Ramayanas (e.g. Vimalasuri\'s Paumachariya)', account: 'Lakshmana kills Ravana; Rama, a Jain ideal, does not kill and attains liberation.' },
        difference: 'Reflects Jain ethics of non-violence.',
      },
    ],
    quizId: 'quiz-ramayana',
  },
];
