import React, { useEffect, useState } from 'react';
import { Activity, TrendingUp, Eye } from 'lucide-react';
import { loadAnalyticsSummary, type AnalyticsSummary } from '../lib/analytics';

const STAT_CARDS: { key: keyof Pick<AnalyticsSummary, 'total' | 'last24h' | 'last7d'>; label: string; icon: typeof Eye }[] = [
  { key: 'last24h', label: 'Views, last 24h', icon: Activity },
  { key: 'last7d', label: 'Views, last 7 days', icon: TrendingUp },
  { key: 'total', label: 'Views, all time', icon: Eye },
];

export const AnalyticsPanel: React.FC = () => {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    loadAnalyticsSummary()
      .then((data) => {
        if (active) setSummary(data);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Failed to load analytics.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const maxDaily = summary?.daily.reduce((max, day) => Math.max(max, day.count), 0) || 0;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-slate-950">Traffic</h2>
        <p className="mt-1 text-xs text-slate-500">
          First-party pageviews only — no third-party script, no cookies, no IPs stored.
        </p>
      </div>

      {loading && <p className="text-xs text-slate-500">Loading analytics...</p>}
      {error && <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">{error}</p>}

      {summary && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {STAT_CARDS.map(({ key, label, icon: Icon }) => (
              <div key={key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">{label}</span>
                  <Icon className="w-4 h-4 text-blue-500" />
                </div>
                <div className="mt-2 text-2xl font-black text-slate-950 tabular-nums">{summary[key].toLocaleString()}</div>
              </div>
            ))}
          </div>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="text-sm font-bold text-slate-950 mb-4">Last 14 days</h3>
            {summary.daily.length === 0 ? (
              <p className="text-xs text-slate-500">No traffic recorded yet.</p>
            ) : (
              <div className="flex items-end gap-1.5 h-28">
                {summary.daily.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center justify-end gap-1.5 group">
                    <div className="text-[9px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                      {day.count}
                    </div>
                    <div
                      className="w-full rounded-t-md bg-blue-500/80 group-hover:bg-blue-600 transition-colors min-h-[3px]"
                      style={{ height: `${maxDaily ? Math.max(4, (day.count / maxDaily) * 100) : 4}%` }}
                    />
                    <div className="text-[9px] text-slate-400 font-mono">{day.day.slice(5)}</div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="text-sm font-bold text-slate-950 mb-4">Top pages, last 30 days</h3>
            {summary.topPaths.length === 0 ? (
              <p className="text-xs text-slate-500">No traffic recorded yet.</p>
            ) : (
              <div className="space-y-2">
                {summary.topPaths.map((row) => (
                  <div key={row.path} className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-mono text-slate-700 truncate">{row.path}</span>
                    <span className="font-bold text-slate-950 tabular-nums shrink-0">{row.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};
