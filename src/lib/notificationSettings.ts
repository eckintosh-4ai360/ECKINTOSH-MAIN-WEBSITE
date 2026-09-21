import { apiRequest } from './api';

/**
 * Admin-facing shape of the Gmail notification settings. The app password is
 * never sent to the browser — `appPasswordSet` only reports whether one is
 * stored, and an empty `appPassword` on save keeps the existing secret.
 */
export interface NotificationSettings {
  enabled: boolean;
  gmailUser: string;
  fromName: string;
  recipients: string[];
  replyToSender: boolean;
  appPasswordSet: boolean;
}

export interface NotificationSettingsInput {
  enabled: boolean;
  gmailUser: string;
  fromName: string;
  recipients: string[];
  replyToSender: boolean;
  appPassword?: string;
}

export async function loadNotificationSettings(): Promise<NotificationSettings> {
  return apiRequest<NotificationSettings>('/api/admin/settings/notifications');
}

export async function saveNotificationSettings(input: NotificationSettingsInput): Promise<NotificationSettings> {
  return apiRequest<NotificationSettings>('/api/admin/settings/notifications', {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

export interface TestResult {
  recipients: string[];
  /** False when credentials work but the master switch is still off. */
  enabled: boolean;
}

export async function sendTestNotification(): Promise<TestResult> {
  const result = await apiRequest<{ ok: boolean } & TestResult>(
    '/api/admin/settings/notifications/test',
    { method: 'POST' }
  );
  return { recipients: result.recipients, enabled: result.enabled };
}
