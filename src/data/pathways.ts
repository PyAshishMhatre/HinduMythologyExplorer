export interface Pathway {
  id: string;
  title: string;
  sanskrit: string;
  description: string;
  to: string;
  glyph: string;
  color: string;
  links: { label: string; to: string }[];
}

export const pathways: Pathway[] = [
  { id: 'origins', title: 'Origins of the Universe', sanskrit: 'सृष्टि · Srishti', description: 'Vedic hymns of creation, the cosmic egg, Brahma on the lotus, and the immense cycles of yugas and kalpas.', to: '/stories/origins-of-creation', glyph: '✺', color: '#7c8cff', links: [{ label: 'Lesson 1', to: '/learn/lesson-1' }, { label: 'Cosmic timeline', to: '/timeline/cosmic' }] },
  { id: 'gods', title: 'Gods and Goddesses', sanskrit: 'देव · Deva', description: 'The Trimurti, the Great Goddess, the Vedic devas and the Puranic families of heaven.', to: '/gods-avatars', glyph: '☀', color: '#e0b450', links: [{ label: 'Divine family tree', to: '/family-tree/cosmic-divine' }, { label: 'Avatars of Vishnu', to: '/gods-avatars#avatars' }] },
  { id: 'sages', title: 'Ancient Sages & Dynasties', sanskrit: 'ऋषि · Rishi', description: 'Kashyapa, Atri, Vashistha and Vishvamitra; Manu; the Solar and Lunar dynasties that lead to the epics.', to: '/dynasties', glyph: '☸', color: '#5fb3a1', links: [{ label: 'Sage lineages', to: '/family-tree/sages' }, { label: 'Lesson 2', to: '/learn/lesson-2' }] },
  { id: 'ramayana', title: 'The Ramayana', sanskrit: 'रामायण', description: 'Rama of Ayodhya, Sita, Hanuman and Ravana — exile, abduction, war and homecoming.', to: '/stories/rama-early-life', glyph: '🏹', color: '#d9644a', links: [{ label: 'Ramayana timeline', to: '/timeline/ramayana' }, { label: 'Rama\'s family', to: '/family-tree/ramayana' }] },
  { id: 'mahabharata', title: 'The Mahabharata', sanskrit: 'महाभारत', description: 'The Kuru dynasty, Pandavas and Kauravas, the dice game, the Bhagavad Gita and Kurukshetra.', to: '/stories/bhishma-vow-story', glyph: '☬', color: '#c9a24a', links: [{ label: 'Kuru family tree', to: '/family-tree/kuru' }, { label: 'Mahabharata timeline', to: '/timeline/mahabharata' }] },
  { id: 'puranas', title: 'The Puranas & Avatars', sanskrit: 'पुराण · Purana', description: 'Samudra Manthana, Prahlada and Narasimha, Vamana, Shiva\'s family and the Devi Mahatmya.', to: '/stories?cat=puranic', glyph: '❂', color: '#a07ad9', links: [{ label: 'Churning of the Ocean', to: '/stories/samudra-manthana' }, { label: 'Lesson 5', to: '/learn/lesson-5' }] },
  { id: 'philosophy', title: 'Philosophy & Traditions', sanskrit: 'दर्शन · Darshana', description: 'Dharma, karma, moksha, bhakti; Vaishnava, Shaiva and Shakta views; and how the epics connect.', to: '/learn/lesson-6', glyph: '❖', color: '#5aa2ff', links: [{ label: 'Glossary', to: '/glossary' }, { label: 'Compare traditions', to: '/compare-traditions' }] },
];
