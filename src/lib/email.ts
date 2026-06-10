// Helpers for validating "work" email addresses on the contact + engagement
// forms. This is a client-side UX nudge (a static site can't truly enforce
// it), aimed at filtering out casual personal-email enquiries — not a
// security control.

/** Basic, permissive email-shape check. */
export function looksLikeEmail(value: string): boolean {
  const v = value.trim();
  // one @, something before, a dotted domain after, no spaces
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

/** Lower-cased domain part of an email, or "" if it can't be parsed. */
export function emailDomain(value: string): string {
  const at = value.trim().toLowerCase().lastIndexOf("@");
  return at === -1 ? "" : value.trim().toLowerCase().slice(at + 1);
}

// Common free / consumer mailbox + ISP domains. Extend or trim as needed.
export const FREE_EMAIL_DOMAINS: ReadonlySet<string> = new Set([
  // Google
  "gmail.com", "googlemail.com",
  // Microsoft
  "hotmail.com", "hotmail.co.uk", "hotmail.fr",
  "outlook.com", "outlook.co.uk",
  "live.com", "live.co.uk", "msn.com",
  // Yahoo / Oath
  "yahoo.com", "yahoo.co.uk", "yahoo.fr", "ymail.com", "rocketmail.com",
  // Apple
  "icloud.com", "me.com", "mac.com",
  // Other consumer webmail
  "aol.com", "gmx.com", "gmx.net", "mail.com",
  "proton.me", "protonmail.com", "pm.me",
  "yandex.com", "yandex.ru", "zoho.com", "fastmail.com", "tutanota.com",
  // UK consumer ISPs
  "btinternet.com", "sky.com", "virginmedia.com", "talktalk.net", "ntlworld.com",
  // US consumer ISPs
  "verizon.net", "comcast.net", "sbcglobal.net", "att.net",
]);

/** True if the address uses a known free / personal mailbox provider. */
export function isFreeEmailDomain(value: string): boolean {
  return FREE_EMAIL_DOMAINS.has(emailDomain(value));
}

/**
 * Validate a work email. Returns an error message string, or "" if it's fine.
 */
export function validateWorkEmail(value: string): string {
  if (!looksLikeEmail(value)) return "Please enter a valid email address.";
  if (isFreeEmailDomain(value)) {
    return "Please use your work email — personal addresses (Gmail, Outlook, Hotmail, iCloud, etc.) aren't accepted here.";
  }
  return "";
}
