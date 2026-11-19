import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import GlobalSearch from '../components/search/GlobalSearch';
import { Icon } from '../components/ui/Icon';
import { useSettings } from '../store/settings';
import ContextPanel from './ContextPanel';
import ErrorBoundary from './ErrorBoundary';
import { useProgress } from '../store/progress';

export default function Layout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const loc = useLocation();
  const contextPanel = useSettings((s) => s.contextPanel);
  const readingMode = useSettings((s) => s.readingMode);
  const set = useSettings((s) => s.set);
  const reduceMotion = useSettings((s) => s.reduceMotion);
  const streak = useProgress((s) => s.streak.current);
  const focus = readingMode === 'focus' && (loc.pathname.startsWith('/stories/') || loc.pathname.startsWith('/learn/'));
  const wide = /^\/(family-tree|relationships|map|timeline)/.test(loc.pathname);

  return (
    <div className="relative z-10 flex h-full">
      {!focus && <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />}
      <div className="flex min-w-0 flex-1 flex-col">
        {!focus && (
          <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b border-gold/10 bg-night/80 px-4 backdrop-blur-md lg:px-8">
            <button className="rounded-lg p-2 text-parchment/80 hover:bg-gold/10 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Icon name="menu" />
            </button>
            <GlobalSearch />
            <div className="ml-auto flex items-center gap-2">
              {streak > 0 && (
                <Link to="/progress" className="chip hidden sm:inline-flex" title="Daily learning streak">
                  🔥 {streak} day{streak > 1 ? 's' : ''}
                </Link>
              )}
              <button
                onClick={() => set({ contextPanel: !contextPanel })}
                className={`hidden rounded-lg p-2 hover:bg-gold/10 xl:block ${contextPanel ? 'text-gold' : 'text-parchment/60'}`}
                title="Toggle context panel"
                aria-label="Toggle context panel"
              >
                <Icon name="panel" />
              </button>
            </div>
          </header>
        )}
        <div className="flex min-h-0 flex-1">
          <main id="main-scroll" className="min-w-0 flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={loc.pathname}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={wide ? 'px-4 py-6 lg:px-8' : 'mx-auto max-w-6xl px-4 py-6 lg:px-8 lg:py-10'}
              >
                <ErrorBoundary resetKey={loc.pathname}>{children}</ErrorBoundary>
              </motion.div>
            </AnimatePresence>
          </main>
          {contextPanel && !focus && !wide && <ContextPanel />}
        </div>
      </div>
    </div>
  );
}
