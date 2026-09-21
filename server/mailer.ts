import nodemailer from 'nodemailer';
import { query } from './db';

const SETTINGS_KEY = 'notifications';

/**
 * Gmail notification settings, edited from the admin Settings panel and stored
 * in `app_settings`. `appPassword` is a Google App Password — never the account
 * password — and never leaves the server: the admin API returns
 * `NotificationSettingsPublic` instead.
 */
export interface NotificationSettings {
  enabled: boolean;
  gmailUser: string;
  appPassword: string;
  fromName: string;
  recipients: string[];
  replyToSender: boolean;
}

export type NotificationSettingsPublic = Omit<NotificationSettings, 'appPassword'> & {
  appPasswordSet: boolean;
};

const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: false,
  gmailUser: '',
  appPassword: '',
  fromName: 'Eckintosh Website',
  recipients: [],
  replyToSender: true,
};

// Google displays app passwords in four spaced groups; SMTP wants the raw 16.
function normalizeAppPassword(value: unknown): string {
  return String(value || '').replace(/\s+/g, '');
}

function normalizeRecipients(value: unknown): string[] {
  const list = Array.isArray(value) ? value : String(value || '').split(/[,\n;]/);
  return [...new Set(list.map((entry) => String(entry).trim()).filter(Boolean))];
}

function normalize(stored: unknown): NotificationSettings {
  const raw = (stored && typeof stored === 'object' ? stored : {}) as Record<string, unknown>;
  return {
    enabled: Boolean(raw.enabled),
    gmailUser: String(raw.gmailUser || '').trim(),
    appPassword: normalizeAppPassword(raw.appPassword),
    fromName: String(raw.fromName || DEFAULT_SETTINGS.fromName).trim(),
    recipients: normalizeRecipients(raw.recipients),
    replyToSender: raw.replyToSender === undefined ? true : Boolean(raw.replyToSender),
  };
}

export function toPublicSettings(settings: NotificationSettings): NotificationSettingsPublic {
  const { appPassword, ...rest } = settings;
  return { ...rest, appPasswordSet: Boolean(appPassword) };
}

export async function loadNotificationSettings(): Promise<NotificationSettings> {
  const result = await query<{ value: unknown }>('select value from app_settings where key = $1', [SETTINGS_KEY]);
  return result.rowCount ? normalize(result.rows[0].value) : { ...DEFAULT_SETTINGS };
}

/**
 * Saves the panel's values. A blank `appPassword` means "leave the stored one
 * alone", so the admin can edit recipients without retyping the secret.
 */
export async function saveNotificationSettings(input: unknown): Promise<NotificationSettings> {
  const incoming = normalize(input);
  if (!incoming.appPassword) {
    const existing = await loadNotificationSettings();
    incoming.appPassword = existing.appPassword;
  }

  const result = await query<{ value: unknown }>(
    `
      insert into app_settings (key, value, updated_at)
      values ($1, $2::jsonb, now())
      on conflict (key)
      do update set value = excluded.value, updated_at = now()
      returning value
    `,
    [SETTINGS_KEY, JSON.stringify(incoming)]
  );
  return normalize(result.rows[0].value);
}

function buildTransport(settings: NotificationSettings) {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: settings.gmailUser, pass: settings.appPassword },
  });
}

/** Who actually receives mail: the explicit list, else the Gmail account itself. */
function resolveRecipients(settings: NotificationSettings): string[] {
  return settings.recipients.length ? settings.recipients : [settings.gmailUser].filter(Boolean);
}

export function describeConfigurationGap(settings: NotificationSettings): string | null {
  if (!settings.gmailUser) return 'Add the Gmail address that will send the notifications.';
  if (!settings.appPassword) return 'Add a Google App Password for that Gmail account.';
  if (!resolveRecipients(settings).length) return 'Add at least one recipient address.';
  return null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export interface InquiryNotification {
  id?: string;
  projectType: string;
  timeline: string;
  budget: string;
  fullName: string;
  organization: string;
  phone: string;
  email: string;
  notes: string;
}

function renderInquiry(inquiry: InquiryNotification) {
  const rows: [string, string][] = [
    ['Name', inquiry.fullName],
    ['Organization', inquiry.organization || '-'],
    ['Email', inquiry.email],
    ['Phone / WhatsApp', inquiry.phone],
    ['Service', inquiry.projectType],
    ['Timeline', inquiry.timeline],
    ['Budget', inquiry.budget || 'Not specified'],
    ['Notes', inquiry.notes || '-'],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');
  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f6f8fb;padding:24px">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e3e8ef">
        <div style="background:#0F1D33;padding:18px 24px">
          <div style="color:#7aa7ff;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">New project inquiry</div>
          <div style="color:#ffffff;font-size:18px;font-weight:700;margin-top:2px">${escapeHtml(inquiry.fullName)}</div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:13px;color:#0f172a">
          ${rows
            .map(
              ([label, value]) => `
            <tr>
              <td style="padding:10px 24px;color:#64748b;white-space:nowrap;vertical-align:top;border-bottom:1px solid #eef2f7">${escapeHtml(label)}</td>
              <td style="padding:10px 24px;font-weight:600;border-bottom:1px solid #eef2f7">${escapeHtml(value)}</td>
            </tr>`
            )
            .join('')}
        </table>
        <div style="padding:16px 24px;font-size:11px;color:#94a3b8">
          Sent automatically by the Eckintosh website. Reply to reach the client directly.
        </div>
      </div>
    </div>`;

  return { text, html };
}

async function deliver(
  settings: NotificationSettings,
  subject: string,
  body: { text: string; html: string },
  replyTo?: string
) {
  const transport = buildTransport(settings);
  try {
    await transport.sendMail({
      from: `"${settings.fromName}" <${settings.gmailUser}>`,
      to: resolveRecipients(settings).join(', '),
      subject,
      text: body.text,
      html: body.html,
      ...(replyTo ? { replyTo } : {}),
    });
  } finally {
    transport.close();
  }
}

/**
 * Best-effort notification for a new inquiry. Never throws: a Gmail outage or a
 * rotated app password must not stop the inquiry being captured in the database.
 */
export async function notifyNewInquiry(inquiry: InquiryNotification): Promise<void> {
  try {
    const settings = await loadNotificationSettings();
    if (!settings.enabled || describeConfigurationGap(settings)) return;

    await deliver(
      settings,
      `New inquiry: ${inquiry.fullName} - ${inquiry.projectType || 'Project request'}`,
      renderInquiry(inquiry),
      settings.replyToSender && inquiry.email ? inquiry.email : undefined
    );
  } catch (error) {
    console.error('[mail] Failed to send inquiry notification:', error);
  }
}

/** Test send from the Settings panel. Throws, so the admin sees why it failed. */
export async function sendTestNotification(): Promise<string[]> {
  const settings = await loadNotificationSettings();
  const gap = describeConfigurationGap(settings);
  if (gap) throw new Error(gap);

  await deliver(settings, 'Eckintosh website - test notification', {
    text: 'This is a test notification. Gmail notifications are configured correctly.',
    html: `
      <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;padding:24px;color:#0f172a">
        <h2 style="margin:0 0 8px">Gmail notifications are working</h2>
        <p style="margin:0;color:#475569;font-size:13px">
          You will receive an email here whenever someone submits the project planner form.
        </p>
      </div>`,
  });

  return resolveRecipients(settings);
}
