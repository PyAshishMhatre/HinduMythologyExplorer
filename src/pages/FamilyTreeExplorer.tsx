import { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { familyTrees, familyTreeById } from '../data';
import FamilyTree from '../components/graph/FamilyTree';
import { BookmarkButton } from '../components/ui';
import { useProgress } from '../store/progress';

export default function FamilyTreeExplorer() {
  const { treeId = 'kuru' } = useParams();
  const [params] = useSearchParams();
  const tree = familyTreeById.get(treeId) ?? familyTrees[0];
  const visit = useProgress((s) => s.visit);
  useEffect(() => visit('tree', tree.id), [tree.id, visit]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-3xl">
          <div className="eyebrow">Family tree explorer</div>
          <h1 className="font-serif text-4xl font-semibold">{tree.title}</h1>
          <p className="text-sm text-gold/80">{tree.subtitle}</p>
          <p className="mt-1 text-sm text-parchment/70">{tree.description}</p>
        </div>
        <div className="flex gap-2">
          <BookmarkButton type="tree" id={tree.id} />
          <Link to="/relationships" className="btn-ghost">
            How are two characters related?
          </Link>
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {familyTrees.map((t) => (
          <Link key={t.id} to={`/family-tree/${t.id}`} className={`chip !py-1.5 ${t.id === tree.id ? 'chip-active' : ''}`}>
            {t.title}
          </Link>
        ))}
      </div>
      <FamilyTree tree={tree} initialSelect={params.get('focus') ?? undefined} />
      <div className="mt-3 grid gap-3 text-xs text-muted md:grid-cols-2">
        <p>Click a person to highlight their ancestors (blue) and descendants (green). Double-click to open their profile. Use the − / + badges to collapse and expand generations; scroll or pinch to zoom and drag to pan.</p>
        {(tree.notes?.length || tree.abridged) && (
          <p className="text-saffron/80">
            {tree.notes?.join(' ')} {tree.abridged && 'Dotted gold links indicate that intermediate generations are abridged; genealogies differ between texts.'}
          </p>
        )}
      </div>
    </div>
  );
}
