/**
 * Analytics — PostHog wrapper
 *
 * Initialise once at app startup (see main.tsx).
 * Use `trackEvent` anywhere to fire a named event with optional properties.
 *
 * PostHog is only activated when VITE_POSTHOG_KEY is set AND the visitor has
 * explicitly accepted analytics cookies. Consent is enforced again inside this
 * module so future callers cannot accidentally bypass the consent banner.
 *
 * ── Cold email attribution ────────────────────────────────────────────────────
 * Each cold email link should include UTM parameters and/or an opaque `ref`
 * token so inbound visits can be attributed to a campaign or individual:
 *
 *   https://consultrelay.space/?utm_source=cold-email&utm_campaign=batch-1&utm_content=lead-42&ref=a7f3k9
 *
 * - utm_* params are registered as super properties before the first $pageview.
 * - `ref` is an opaque per-recipient token (NOT the email address or any PII).
 *   Use a short random ID (e.g. nanoid) that maps to the lead inside your
 *   outreach tool's own records.
 *
 * Both are registered BEFORE the $pageview is captured, so even a bounce
 * (visit with no CTA click) is attributable to the cold email source.
 *
 * PostHog dashboard: filter events by `inbound_ref`, `utm_campaign`, or
 * `utm_content` to see which cold email leads visited and what they did.
 */
import posthog from 'posthog-js';

const KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ?? 'https://us.i.posthog.com';
const CONSENT_KEY = 'cookie_consent';

let initialized = false;

/** Analytics is allowed only after an explicit persisted acceptance. */
function hasAnalyticsConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    // If browser storage is unavailable, fail closed rather than track.
    return false;
  }
}

/** Read a single query param from the current URL (caller ensures no PII). */
function getParam(name: string): string | null {
  try {
    return new URL(window.location.href).searchParams.get(name);
  } catch {
    return null;
  }
}

/** Collect UTM params and opaque ref token from the current URL. */
function collectAttributionProps(): Record<string, string> {
  const props: Record<string, string> = {};
  for (const utmParam of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const val = getParam(utmParam);
    if (val) props[utmParam] = val;
  }
  // Opaque per-recipient ref token — must NOT be the recipient's email address
  // or any other PII. Use a short random ID generated when building the email.
  const ref = getParam('ref');
  if (ref) props['inbound_ref'] = ref;
  return props;
}

export function initAnalytics() {
  if (!KEY || !hasAnalyticsConsent()) return;

  // Avoid duplicate initialisation/pageviews if this function is called twice
  // during the same page lifecycle.
  if (initialized) {
    posthog.opt_in_capturing();
    return;
  }

  posthog.init(KEY, {
    api_host: HOST,
    // Privacy-considered defaults
    autocapture: false,                 // only fire events we explicitly call
    capture_pageview: false,            // disabled — we fire $pageview manually below,
                                        // AFTER registering attribution super-props
    capture_pageleave: true,            // session-duration signal
    persistence: 'localStorage+cookie',
    respect_dnt: true,                  // honour browser Do Not Track setting
    disable_session_recording: true,    // no screen recording on this site
    opt_out_capturing_by_default: true, // defense-in-depth until explicit opt-in below
  });

  initialized = true;
  posthog.opt_in_capturing();

  // ── Campaign attribution ────────────────────────────────────────────────────
  // Register attribution BEFORE firing the first $pageview so that even a
  // bounce (visit with no CTA click) carries the inbound ref and UTMs.
  const attributionProps = collectAttributionProps();
  if (Object.keys(attributionProps).length > 0) {
    posthog.register(attributionProps); // persists across every event this session
  }

  // Now fire the initial pageview — attribution props are already in place.
  posthog.capture('$pageview');
}

/**
 * Stop any already-initialised PostHog instance from sending further data.
 * Safe to call before PostHog has been initialised.
 */
export function revokeAnalyticsConsent() {
  if (!KEY || !initialized) return;
  posthog.opt_out_capturing();
}

/**
 * Fire a named analytics event.
 * Consent is checked here as the final boundary, not only in UI code.
 */
export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (!KEY || !initialized || !hasAnalyticsConsent()) return;
  posthog.capture(event, properties);
}
