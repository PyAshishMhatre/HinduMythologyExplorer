import { sources } from '../data';
import { CONFIDENCE, ConfidenceBadge, PageHeader } from '../components/ui';
import type { Confidence, SourceCategory } from '../data/types';

const ORDER: SourceCategory[] = ['Vedic', 'Upanishadic', 'Itihasa', 'Puranic', 'Later', 'Regional', 'Folk', 'Modern'];
const LABEL: Record<SourceCategory, string> = { Vedic: 'Vedic sources', Upanishadic: 'Upanishadic sources', Itihasa: 'Itihasa (epics)', Puranic: 'Puranic sources', Later: 'Later literary & devotional works', Regional: 'Regional traditions', Folk: 'Folk & oral', Modern: 'Modern scholarship' };

export default function Sources() {
  return (
    <div>
      <PageHeader
        eyebrow="Source management"
        title="Sources & Confidence"
        subtitle="Every substantial claim in this app is tied to a text and a confidence level. References are given to the level of book (kanda, parva, skandha) and only to chapter or verse where reliably established — no verse numbers are invented."
      />
      <section className="card mb-10 p-5">
        <div className="eyebrow mb-3">Confidence levels</div>
        <div className="grid gap-2 md:grid-cols-2">
          {(Object.keys(CONFIDENCE) as Confidence[]).map((c) => (
            <div key={c} className="flex items-center gap-3 text-sm">
              <ConfidenceBadge c={c} />
              <span className="text-parchment/80">{CONFIDENCE[c].desc}</span>
            </div>
          ))}
        </div>
      </section>
      {ORDER.map((cat) => {
        const list = sources.filter((s) => s.category === cat);
        if (!list.length) return null;
        return (
          <section key={cat} className="mb-8">
            <h2 className="mb-3 font-serif text-2xl">{LABEL[cat]}</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {list.map((s) => (
                <div key={s.id} id={s.id} className="card scroll-mt-24 p-4 target:!border-saffron">
                  <div className="font-serif text-xl">{s.textName}</div>
                  {s.tradition && <div className="text-xs text-gold/80">{s.tradition}</div>}
                  <p className="mt-1 text-sm text-parchment/75">{s.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
