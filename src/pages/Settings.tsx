import { useRef, useState } from 'react';
import { PageHeader } from '../components/ui';
import { useSettings, type ReadingMode, type Theme } from '../store/settings';
import { useProgress } from '../store/progress';

export default function Settings() {
  const s = useSettings();
  const reset = useProgress((x) => x.reset);
  const importState = useProgress((x) => x.importState);
  const [msg, setMsg] = useState('');
  const [confirm, setConfirm] = useState(false);
  const file = useRef<HTMLInputElement>(null);

  const exportProgress = () => {
    const st = useProgress.getState();
    const data = Object.fromEntries(Object.entries(st).filter(([, v]) => typeof v !== 'function'));
    const blob = new Blob([JSON.stringify({ app: 'hindu-mythology-explorer', version: 1, exported: new Date().toISOString(), state: data }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `mythology-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const Row = ({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) => (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gold/10 py-4">
      <div>
        <div className="text-parchment">{label}</div>
        {hint && <div className="text-xs text-muted">{hint}</div>}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
  const Opt = <T extends string | number | boolean>({ v, cur, set, label }: { v: T; cur: T; set: (v: T) => void; label: string }) => (
    <button onClick={() => set(v)} className={`chip !py-1.5 ${cur === v ? 'chip-active' : ''}`}>
      {label}
    </button>
  );

  return (
    <div className="max-w-3xl">
      <PageHeader eyebrow="Preferences" title="Settings" subtitle="All settings and progress are stored locally in this browser. Nothing is sent anywhere." />
      <div className="card px-5">
        <Row label="Theme">
          {(['night', 'parchment'] as Theme[]).map((t) => (
            <Opt key={t} v={t} cur={s.theme} set={(v) => s.set({ theme: v })} label={t === 'night' ? 'Midnight' : 'Parchment'} />
          ))}
        </Row>
        <Row label="Reading mode" hint="Distraction-free hides the sidebar while reading stories and lessons.">
          {(['standard', 'focus', 'compact'] as ReadingMode[]).map((m) => (
            <Opt key={m} v={m} cur={s.readingMode} set={(v) => s.set({ readingMode: v })} label={m === 'focus' ? 'Distraction-free' : m[0].toUpperCase() + m.slice(1)} />
          ))}
        </Row>
        <Row label="Text size">
          {[0.9, 1, 1.1, 1.2].map((f) => (
            <Opt key={f} v={f} cur={s.fontScale} set={(v) => s.set({ fontScale: v })} label={`${Math.round(f * 100)}%`} />
          ))}
        </Row>
        <Row label="Reduce motion" hint="Disables animations and the animated starfield.">
          <Opt v={false} cur={s.reduceMotion} set={(v) => s.set({ reduceMotion: v })} label="Off" />
          <Opt v={true} cur={s.reduceMotion} set={(v) => s.set({ reduceMotion: v })} label="On" />
        </Row>
        <Row label="Context panel" hint="Related discoveries, recent items and bookmarks on wide screens.">
          <Opt v={true} cur={s.contextPanel} set={(v) => s.set({ contextPanel: v })} label="Show" />
          <Opt v={false} cur={s.contextPanel} set={(v) => s.set({ contextPanel: v })} label="Hide" />
        </Row>
        <Row label="Sidebar">
          <Opt v={false} cur={s.sidebarCollapsed} set={(v) => s.set({ sidebarCollapsed: v })} label="Expanded" />
          <Opt v={true} cur={s.sidebarCollapsed} set={(v) => s.set({ sidebarCollapsed: v })} label="Collapsed" />
        </Row>
      </div>

      <h2 className="mb-3 mt-10 font-serif text-2xl">Your progress data</h2>
      <div className="card space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary" onClick={exportProgress}>
            Export progress (JSON)
          </button>
          <button className="btn-ghost" onClick={() => file.current?.click()}>
            Import progress
          </button>
          <input
            ref={file}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setMsg(importState(await f.text()) ? 'Progress imported.' : 'That file could not be read.');
              e.target.value = '';
            }}
          />
          {!confirm ? (
            <button className="btn-ghost !border-vermilion/40 !text-vermilion" onClick={() => setConfirm(true)}>
              Reset all progress
            </button>
          ) : (
            <span className="flex items-center gap-2 text-sm">
              Are you sure?
              <button
                className="btn-ghost !border-vermilion/60 !py-1.5 !text-vermilion"
                onClick={() => {
                  reset();
                  setConfirm(false);
                  setMsg('Progress reset.');
                }}
              >
                Yes, reset
              </button>
              <button className="btn-ghost !py-1.5" onClick={() => setConfirm(false)}>
                Cancel
              </button>
            </span>
          )}
        </div>
        {msg && <div className="text-sm text-jade">{msg}</div>}
      </div>
      <p className="mt-6 text-xs text-muted">Hindu Mythology Explorer · local-first edition. Character portraits are generated emblems; no external images or services are used.</p>
    </div>
  );
}
