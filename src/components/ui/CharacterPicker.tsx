import { useMemo, useState } from 'react';
import { characters, characterById } from '../../data';
import { norm } from '../../lib/names';
import { Emblem } from './Emblem';

export function CharacterPicker({ value, onChange, placeholder = 'Choose a character…' }: { value: string | null; onChange: (id: string) => void; placeholder?: string }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const c = value ? characterById.get(value) : null;
  const list = useMemo(() => {
    const n = norm(q);
    return characters.filter((x) => !n || norm([x.name, ...(x.alternateNames ?? [])].join(' ')).includes(n)).slice(0, 30);
  }, [q]);
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="card flex w-full items-center gap-3 p-2.5 text-left hover:border-gold/50">
        {c ? <Emblem name={c.name} category={c.category} size={40} /> : <span className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-gold/40 text-gold">+</span>}
        <span className="min-w-0">
          <span className="block truncate font-serif text-lg">{c?.name ?? placeholder}</span>
          {c && <span className="block truncate text-xs text-muted">{c.title}</span>}
        </span>
      </button>
      {open && (
        <div className="card absolute left-0 right-0 top-full z-30 mt-1 !bg-ink/95 p-2 shadow-2xl">
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type a name…" className="input mb-2 !py-2" />
          <div className="max-h-64 overflow-auto">
            {list.map((x) => (
              <button
                key={x.id}
                onClick={() => {
                  onChange(x.id);
                  setOpen(false);
                  setQ('');
                }}
                className="block w-full rounded-lg px-3 py-1.5 text-left text-sm hover:bg-gold/10"
              >
                {x.name} <span className="text-xs text-muted">· {x.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
