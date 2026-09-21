import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, KeyRound, Mail, Save, Send } from 'lucide-react';
import {
  loadNotificationSettings,
  saveNotificationSettings,
  sendTestNotification,
  type NotificationSettings,
} from '../lib/notificationSettings';

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 outline-none transition-shadow placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50';
const labelClass = 'mb-1 block text-xs font-semibold text-slate-700';

export const SettingsPanel: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [gmailUser, setGmailUser] = useState('');
  const [appPassword, setAppPassword] = useState('');
  const [appPasswordSet, setAppPasswordSet] = useState(false);
  const [fromName, setFromName] = useState('');
  const [recipients, setRecipients] = useState('');
  const [replyToSender, setReplyToSender] = useState(true);
  const [saved, setSaved] = useState<NotificationSettings | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const apply = (settings: NotificationSettings) => {
    setSaved(settings);
    setEnabled(settings.enabled);
    setGmailUser(settings.gmailUser);
    setFromName(settings.fromName);
    setRecipients(settings.recipients.join(', '));
    setReplyToSender(settings.replyToSender);
    setAppPasswordSet(settings.appPasswordSet);
    setAppPassword('');
  };

  useEffect(() => {
    let active = true;
    loadNotificationSettings()
      .then((settings) => {
        if (active) apply(settings);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Failed to load settings.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      const settings = await saveNotificationSettings({
        enabled,
        gmailUser: gmailUser.trim(),
        fromName: fromName.trim(),
        recipients: recipients
          .split(/[,\n;]/)
          .map((entry) => entry.trim())
          .filter(Boolean),
        replyToSender,
        // Blank means "keep the stored password".
        appPassword: appPassword.trim() || undefined,
      });
      apply(settings);
      setNotice('Settings saved.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    setTesting(true);
    setError(null);
    setNotice(null);
    try {
      const { recipients: sentTo, enabled: liveNow } = await sendTestNotification();
      const where = `Test email sent to ${sentTo.join(', ')}.`;
      if (liveNow) {
        setNotice(`${where} Check the inbox.`);
      } else {
        // Credentials are fine, but real inquiries still go unsent.
        setError(
          `${where} The credentials work — but "Send email notifications" is off, ` +
            'so real inquiry submissions are not being emailed. Tick it above and save.'
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send the test email.');
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return <p className="text-xs text-slate-500">Loading settings...</p>;
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-slate-950">Email notifications</h2>
        <p className="mt-1 text-xs text-slate-500">
          Get an email the moment someone submits the project planner form, alongside the inbox entry.
        </p>
      </div>

      {saved && !saved.enabled && (
        <p className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Notifications are <strong>off</strong>. Inquiries are still saved to the inbox, but no email is sent —
            including when the test below succeeds.
          </span>
        </p>
      )}
      {saved?.enabled && (
        <p className="flex items-start gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Active — new inquiries are emailed to{' '}
            <strong>{(saved.recipients.length ? saved.recipients : [saved.gmailUser]).join(', ')}</strong>.
          </span>
        </p>
      )}

      {error && <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">{error}</p>}
      {notice && (
        <p className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
          <CheckCircle2 className="h-4 w-4 shrink-0" /> {notice}
        </p>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span>
            <span className="block text-xs font-semibold text-slate-900">Send email notifications</span>
            <span className="mt-0.5 block text-xs text-slate-500">
              When off, inquiries are still saved to the inbox — you just will not be emailed.
            </span>
          </span>
        </label>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-blue-500" />
          <h3 className="text-sm font-bold text-slate-950">Gmail account</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="gmail-user">
              Gmail address (sender)
            </label>
            <input
              id="gmail-user"
              className={inputClass}
              value={gmailUser}
              onChange={(e) => setGmailUser(e.target.value)}
              placeholder="you@gmail.com"
              autoComplete="off"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="from-name">
              Sender name
            </label>
            <input
              id="from-name"
              className={inputClass}
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              placeholder="Eckintosh Website"
            />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="app-password">
            Google App Password
          </label>
          <input
            id="app-password"
            type="password"
            className={inputClass}
            value={appPassword}
            onChange={(e) => setAppPassword(e.target.value)}
            placeholder={appPasswordSet ? 'Stored — type a new one to replace it' : 'abcd efgh ijkl mnop'}
            autoComplete="new-password"
          />
          <p className="mt-1.5 flex items-start gap-1.5 text-[11px] text-slate-500">
            <KeyRound className="mt-0.5 h-3 w-3 shrink-0" />
            <span>
              Not your Gmail password. Create one at Google Account &rarr; Security &rarr; 2-Step Verification &rarr; App
              passwords. Spaces are fine — they are stripped automatically.
              {appPasswordSet && ' A password is already stored; leave this blank to keep it.'}
            </span>
          </p>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h3 className="text-sm font-bold text-slate-950">Delivery</h3>

        <div>
          <label className={labelClass} htmlFor="recipients">
            Notify these addresses
          </label>
          <input
            id="recipients"
            className={inputClass}
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            placeholder="you@gmail.com, teammate@example.com"
          />
          <p className="mt-1.5 text-[11px] text-slate-500">
            Comma separated. Leave blank to send to the Gmail address above.
          </p>
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={replyToSender}
            onChange={(e) => setReplyToSender(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span>
            <span className="block text-xs font-semibold text-slate-900">Reply goes straight to the client</span>
            <span className="mt-0.5 block text-xs text-slate-500">
              Sets Reply-To to the address on the inquiry, so hitting reply emails them, not yourself.
            </span>
          </span>
        </label>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-60"
        >
          <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save settings'}
        </button>
        <button
          onClick={handleTest}
          disabled={testing || saving}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          <Send className="h-4 w-4" /> {testing ? 'Sending...' : 'Send test email'}
        </button>
        <span className="text-[11px] text-slate-400">Save before testing, so the test uses your latest values.</span>
      </div>
    </div>
  );
};
