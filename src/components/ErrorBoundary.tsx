import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /** Rendered in place of the crashed subtree. Defaults to a full-page fallback. */
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Catches render errors in the subtree below it so a bug in one component
 * shows a recovery screen instead of a blank page. Does not catch errors in
 * event handlers, async code, or the boundary's own rendering.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Unhandled error in the React tree:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback ?? <DefaultFallback />;
    }
    return this.props.children;
  }
}

const DefaultFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#08111F] text-slate-100 px-6">
    <div className="max-w-md text-center space-y-4">
      <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
      <p className="text-sm text-slate-400 leading-relaxed">
        We hit an unexpected error rendering this page. Reloading usually fixes it — if it keeps
        happening, please let us know.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors"
      >
        Reload page
      </button>
    </div>
  </div>
);
