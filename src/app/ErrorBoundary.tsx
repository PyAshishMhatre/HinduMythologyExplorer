import { Component, type ReactNode } from 'react';

export default class ErrorBoundary extends Component<{ children: ReactNode; resetKey?: string }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error) {
    console.error('[HME] page crashed:', error);
  }
  componentDidUpdate(prev: { resetKey?: string }) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null });
  }
  render() {
    if (this.state.error)
      return (
        <div className="card mx-auto my-16 max-w-xl p-8 text-center">
          <div className="font-serif text-3xl">Something went wrong on this page</div>
          <p className="mt-2 text-sm text-muted">{this.state.error.message}</p>
          <a href="/" className="btn-primary mt-6">
            Return home
          </a>
        </div>
      );
    return this.props.children;
  }
}
