import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { search, KIND_LABEL, type SearchKind } from '../lib/search';
import { answerQuestion } from '../lib/questionParser';
import { edgeSentence } from '../lib/graph';
import { PageHeader } from '../components/ui';

const KINDS = Object.keys(KIND_LABEL) as SearchKind[];
const EXAMPLES = ["Who was Ravana's father?", 'Who were the parents of Bhishma?', "What happened before Rama's birth?", 'Who was the father of Krishna?', 'How are the Pandavas related to Krishna? (try: How are Arjuna and Krishna related)', 'What happened during Samudra Manthana?', 'Who cursed Indra?', 'What happened to Karna after the war?'];

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const [kinds, setKinds] = useState<SearchKind[]>([]);
  const hits = useMemo(() => search(q, kinds, 60), [q, kinds]);
  const direct = useMemo(() => answerQuestion(q), [q]);
  const setQ = (v: string) => setParams(v ? { q: v } : {}, { replace: true });

  return (
    <div>
      <PageHeader eyebrow="Search & discovery" title="Search" subtitle="Search all characters, events, stories, places, concepts, dynasties, lessons and sources — or ask a simple question. Everything runs locally." />
      <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask or search…" className="input mb-3 !py-3 !text-base" />
      <div className="mb-6 flex flex-wrap gap-1.5">
        {KINDS.map((k) => (
          <button key={k} onClick={() => setKinds((ks) => (ks.includes(k) ? ks.filter((x) => x !== k) : [...ks, k]))} className={`chip !py-1 ${kinds.includes(k) ? 'chip-active' : ''}`}>
            {KIND_LABEL[k]}
          </button>
        ))}
      </div>
      {!q && (
        <div className="card p-5">
          <div className="eyebrow mb-2">Try asking</div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((e) => (
              <button key={e} onClick={() => setQ(e.replace(/ \(try:.*\)/, ''))} className="chip hover:border-gold/60">
                {e}
              </button>
            ))}
          </div>
        </div>
      )}
      {direct && (
        <div className="card mb-6 !border-gold/40 p-5 shadow-glow">
          <div className="eyebrow mb-1">Direct answer</div>
          <p className="leading-relaxed text-parchment/90">{direct.answer}</p>
          {direct.path && direct.path.length > 0 && (
            <ol className="mt-3 space-y-1 border-l border-gold/30 pl-4 text-sm text-parchment/80">
              {direct.path.map((e, i) => (
                <li key={i}>
                  {i + 1}. {edgeSentence(e)}
                </li>
              ))}
            </ol>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {direct.links.map((l) => (
              <Link key={l.to + l.label} to={l.to} className="chip hover:border-gold/60">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      {q && (
        <div className="mb-2 text-xs text-muted">
          {hits.length} result{hits.length === 1 ? '' : 's'}
        </div>
      )}
      <div className="space-y-2">
        {hits.map((h) => (
          <Link key={h.id} to={h.to} className="card card-hover flex items-start gap-4 p-4">
            <span className="mt-1 w-20 shrink-0 text-[10px] uppercase tracking-widest text-gold/80">{KIND_LABEL[h.kind]}</span>
            <span className="min-w-0">
              <span className="block font-serif text-lg leading-tight">{h.title}</span>
              <span className="block line-clamp-2 text-sm text-muted">{h.subtitle}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
