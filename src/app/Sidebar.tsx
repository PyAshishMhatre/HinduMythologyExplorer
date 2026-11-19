import { NavLink } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { useSettings } from '../store/settings';

export const NAV: { to: string; label: string; icon: string; group?: string }[] = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/universe', label: 'Explore Universe', icon: 'universe' },
  { to: '/timeline', label: 'Timeline', icon: 'timeline', group: 'Explore' },
  { to: '/family-tree/kuru', label: 'Family Trees', icon: 'tree', group: 'Explore' },
  { to: '/characters', label: 'Characters', icon: 'characters', group: 'Explore' },
  { to: '/stories', label: 'Stories', icon: 'story', group: 'Explore' },
  { to: '/timeline/master?view=list', label: 'Events', icon: 'event', group: 'Explore' },
  { to: '/gods-avatars', label: 'Gods & Avatars', icon: 'gods', group: 'Explore' },
  { to: '/dynasties', label: 'Dynasties', icon: 'dynasty', group: 'Explore' },
  { to: '/relationships', label: 'How It Connects', icon: 'graph', group: 'Explore' },
  { to: '/map', label: 'Sacred Geography', icon: 'map', group: 'Explore' },
  { to: '/learn', label: 'Learning Path', icon: 'learn', group: 'Learn' },
  { to: '/quizzes', label: 'Quizzes', icon: 'quiz', group: 'Learn' },
  { to: '/progress', label: 'Learning Progress', icon: 'progress', group: 'Learn' },
  { to: '/glossary', label: 'Glossary', icon: 'glossary', group: 'Learn' },
  { to: '/settings', label: 'Settings', icon: 'settings', group: 'System' },
];

export default function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const collapsed = useSettings((s) => s.sidebarCollapsed);
  const set = useSettings((s) => s.set);
  const groups = [...new Set(NAV.map((n) => n.group ?? ''))];

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-gold/10 bg-ink/95 backdrop-blur transition-all duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${collapsed ? 'lg:w-[76px]' : 'lg:w-64'} w-64`}
      >
        <div className="flex h-16 items-center gap-3 px-4">
          <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0">
            <circle cx="32" cy="32" r="22" fill="none" stroke="rgb(var(--c-gold))" strokeWidth="2" />
            <circle cx="32" cy="32" r="13" fill="none" stroke="rgb(var(--c-saffron))" strokeWidth="1.5" />
            <circle cx="32" cy="32" r="4" fill="rgb(var(--c-gold))" />
            <g stroke="rgb(var(--c-gold))" strokeWidth="1.5">
              <path d="M32 4v8M32 52v8M4 32h8M52 32h8M12 12l6 6M46 46l6 6M12 52l6-6M46 18l6-6" />
            </g>
          </svg>
          {!collapsed && (
            <div className="leading-tight">
              <div className="font-serif text-lg font-semibold text-parchment">Hindu Mythology</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">Explorer</div>
            </div>
          )}
        </div>
        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {groups.map((g) => (
            <div key={g} className="mt-3">
              {g && !collapsed && <div className="eyebrow mb-1 px-3 !text-[10px] !text-muted/70">{g}</div>}
              {NAV.filter((n) => (n.group ?? '') === g).map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === '/'}
                  onClick={onClose}
                  title={collapsed ? n.label : undefined}
                  className={({ isActive }) =>
                    `group mb-0.5 flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                      isActive ? 'bg-gold/15 text-parchment shadow-[inset_2px_0_0_rgb(var(--c-gold))]' : 'text-parchment/65 hover:bg-gold/5 hover:text-parchment'
                    } ${collapsed ? 'lg:justify-center' : ''}`
                  }
                >
                  <Icon name={n.icon} className="h-[18px] w-[18px] shrink-0 text-gold/80 group-hover:text-gold" />
                  <span className={collapsed ? 'lg:hidden' : ''}>{n.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <button
          onClick={() => set({ sidebarCollapsed: !collapsed })}
          className="hidden h-12 items-center justify-center gap-2 border-t border-gold/10 text-xs text-muted hover:text-parchment lg:flex"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon name={collapsed ? 'chevronRight' : 'chevronLeft'} className="h-4 w-4" />
          {!collapsed && 'Collapse'}
        </button>
      </aside>
    </>
  );
}
