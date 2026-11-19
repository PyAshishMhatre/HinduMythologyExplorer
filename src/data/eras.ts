import type { Era } from './types';

export const eras: Era[] = [
  { id: 'cosmic', name: 'Cosmic Origins', subtitle: 'Creation, dissolution & the cycles of time', description: 'Accounts of how the universe arises from the unmanifest — the Vedic hymns of creation, the cosmic egg, Brahma on the lotus, and the vast cycles of kalpas and yugas.', color: '#7c8cff' },
  { id: 'lineages', name: 'Ancient Lineages', subtitle: 'Prajapatis, sages & the first Manu', description: 'The mind-born sons of Brahma, Daksha and his daughters, Kashyapa\'s many families of devas, asuras, nagas and birds, and Swayambhuva Manu\'s descendants.', color: '#5fb3a1' },
  { id: 'solar', name: 'Solar Dynasty', subtitle: 'Suryavansha — from Manu to Rama', description: 'The Ikshvaku line of Ayodhya, descending from Vivasvan the Sun through Vaivasvata Manu: Mandhata, Harishchandra, Sagara, Bhagiratha, Dilipa, Raghu, Aja and Dasharatha.', color: '#e08a2e' },
  { id: 'lunar', name: 'Lunar Dynasty', subtitle: 'Chandravansha — from the Moon to the Kurus', description: 'From Chandra and Budha through Pururavas, Nahusha and Yayati, splitting into the Yadavas (Krishna\'s clan) and the Pauravas who become the Bharatas and Kurus.', color: '#b9c3e6' },
  { id: 'ramayana', name: 'The Ramayana', subtitle: 'The journey of Rama', description: 'The life of Rama of Ayodhya: his birth, marriage to Sita, exile, Sita\'s abduction by Ravana, the alliance with the vanaras, the war in Lanka and the return home.', color: '#d9644a' },
  { id: 'mahabharata', name: 'The Mahabharata', subtitle: 'The great war of the Bharatas', description: 'The Kuru dynasty from Shantanu to Parikshit: Bhishma\'s vow, the rivalry of Pandavas and Kauravas, the dice game, exile, the Bhagavad Gita and Kurukshetra.', color: '#c9a24a' },
  { id: 'puranic', name: 'Puranic Traditions', subtitle: 'Avatars, the Goddess & the great gods', description: 'Narratives of the Puranas: the avatars of Vishnu, the churning of the ocean, the Shaiva and Shakta myths, which are not neatly placed in a single linear chronology.', color: '#a07ad9' },
];

export const eraById = new Map(eras.map((e) => [e.id, e]));
