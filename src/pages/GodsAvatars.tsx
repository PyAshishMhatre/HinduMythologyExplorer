import { Link } from 'react-router-dom';
import { characterById, characters } from '../data';
import { CharacterChip, PageHeader, Section } from '../components/ui';
import { Emblem } from '../components/ui/Emblem';
import RelGraph from '../components/graph/RelGraph';

const AVATARS = ['matsya', 'kurma', 'varaha', 'narasimha', 'vamana', 'parashurama', 'rama', 'krishna', 'balarama', 'buddha-avatar', 'kalki'];
const TRADITIONS = [
  { id: 'vishnu', name: 'Vaishnavism', text: 'Vishnu (as Narayana, Rama, Krishna) is supreme; devotion to him and his avatars leads to liberation.' },
  { id: 'shiva', name: 'Shaivism', text: 'Shiva is the supreme Lord who creates, sustains, dissolves, conceals and reveals.' },
  { id: 'devi', name: 'Shaktism', text: 'The Goddess (Devi, Shakti) is ultimate reality; all gods act through her power.' },
  { id: 'brahma', name: 'Smarta & the Trimurti', text: 'Brahma, Vishnu and Shiva as three functions of one Brahman; worship of five deities as forms of the One.' },
];

export default function GodsAvatars() {
  const devas = characters.filter((c) => c.category === 'deva');
  const deities = characters.filter((c) => c.category === 'deity' || c.category === 'cosmic');
  return (
    <div>
      <PageHeader eyebrow="Gods & avatars" title="The Divine" subtitle="The Trimurti, the Great Goddess, the Vedic devas, and the descents of Vishnu. Divine relationships include parentage, marriage, manifestation and theological association — the app keeps them distinct." />
      <Section title="Supreme traditions">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {TRADITIONS.map((t) => {
            const c = characterById.get(t.id)!;
            return (
              <Link key={t.id} to={`/characters/${t.id}`} className="card card-hover p-5">
                <Emblem name={c.name} category={c.category} size={64} />
                <div className="mt-3 font-serif text-2xl">{c.name}</div>
                <div className="text-xs text-gold/80">{t.name}</div>
                <p className="mt-2 text-sm text-parchment/70">{t.text}</p>
              </Link>
            );
          })}
        </div>
      </Section>
      <Section id="avatars" title="The avatars of Vishnu" eyebrow="Dashavatara — and its variations">
        <p className="mb-4 max-w-3xl text-sm text-parchment/70">
          The common ten-avatar list varies: some traditions count Balarama, others the Buddha, and the Bhagavata Purana lists more than twenty avatars. Both possibilities are shown.
        </p>
        <ol className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {AVATARS.map((a, i) => {
            const c = characterById.get(a)!;
            return (
              <li key={a}>
                <Link to={`/characters/${a}`} className="card card-hover flex items-center gap-3 p-3">
                  <span className="w-6 text-center font-serif text-xl text-gold/70">{a === 'balarama' || a === 'buddha-avatar' ? '8/9' : i < 8 ? i + 1 : 10}</span>
                  <Emblem name={c.name} category={c.category} size={44} />
                  <span className="min-w-0">
                    <span className="block font-serif text-lg leading-tight">{c.name}</span>
                    <span className="block truncate text-[11px] text-muted">{c.title}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
        <RelGraph focus={['vishnu']} types={['avatar-of', 'manifestation-of', 'spouse']} height="480px" />
      </Section>
      <Section title="Gods and goddesses">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {deities.map((c) => (
            <CharacterChip key={c.id} id={c.id} />
          ))}
        </div>
      </Section>
      <Section title="The devas">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {devas.map((c) => (
            <CharacterChip key={c.id} id={c.id} />
          ))}
        </div>
        <Link to="/family-tree/cosmic-divine" className="btn-ghost mt-5">
          Open the divine family tree →
        </Link>
      </Section>
    </div>
  );
}
