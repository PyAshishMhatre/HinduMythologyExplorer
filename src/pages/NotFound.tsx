import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <div className="font-serif text-7xl text-gold/60">✺</div>
      <h1 className="mt-4 font-serif text-4xl">Lost between the lokas</h1>
      <p className="mt-2 text-muted">This page does not exist in this universe — perhaps in another kalpa.</p>
      <div className="mt-6 flex justify-center gap-2">
        <Link to="/" className="btn-primary">
          Return home
        </Link>
        <Link to="/search" className="btn-ghost">
          Search
        </Link>
      </div>
    </div>
  );
}
