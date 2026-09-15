import React, { useState } from 'react';
import { Layers, Lock, ArrowRight, Mail } from 'lucide-react';
import { signInAdmin } from '../lib/adminAuth';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@eckintosh.local');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInAdmin(email, password);
    } catch {
      setError('Incorrect email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08111F] text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
            <Layers className="w-5 h-5" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-white font-heading">
            Eckintosh<span className="text-blue-500">.</span> Admin
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-[#0F1D33] border border-white/10 shadow-2xl">
          <h1 className="text-sm font-bold text-white mb-1">Admin Portal Access</h1>
          <p className="text-xs text-slate-400 mb-5">Enter the admin credentials to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              {loading ? 'Signing in...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-slate-500 mt-4">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = 'hero';
              window.location.reload();
            }}
            className="hover:text-slate-300"
          >
            ← Back to site
          </a>
        </p>
      </div>
    </div>
  );
};
