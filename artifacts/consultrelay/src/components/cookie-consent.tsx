import { useState, useEffect } from 'react';
import { initAnalytics, revokeAnalyticsConsent } from '@/lib/analytics';

const CONSENT_KEY = 'cookie_consent';

type ConsentValue = 'accepted' | 'declined';

function getStoredConsent(): ConsentValue | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    if (v === 'accepted' || v === 'declined') return v;
    return null;
  } catch {
    return null;
  }
}

function storeConsent(value: ConsentValue) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked — analytics will fail closed because consent cannot be
    // persisted/read back by the analytics boundary.
  }
}

/**
 * Call once at startup. If the user already accepted, initialises PostHog
 * immediately (handles page reloads after consent). Returns the stored value
 * so the banner knows whether to render.
 */
export function initAnalyticsIfConsented(): ConsentValue | null {
  const stored = getStoredConsent();
  if (stored === 'accepted') {
    initAnalytics();
  }
  return stored;
}

/**
 * Cookie consent banner — renders only when no prior choice is recorded.
 * On accept: persists choice + initialises PostHog.
 * On decline: persists choice + explicitly opts out any initialised instance.
 */
export function CookieConsentBanner() {
  // Start as null (unknown) to avoid a flash; we check localStorage on mount.
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) setVisible(true);
  }, []);

  function handleAccept() {
    storeConsent('accepted');
    initAnalytics();
    setVisible(false);
  }

  function handleDecline() {
    storeConsent('declined');
    revokeAnalyticsConsent();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div
        className="
          mx-auto max-w-4xl
          bg-navy text-white
          border border-white/10
          rounded-sm
          shadow-2xl
          px-5 py-4
          flex flex-col sm:flex-row sm:items-center gap-4
        "
      >
        {/* Text */}
        <p className="flex-1 text-sm leading-relaxed text-white/80">
          We use cookies and similar technologies to understand how visitors use
          this site and to improve it.{' '}
          <a
            href="/privacy"
            className="text-teal underline underline-offset-2 hover:text-white transition-colors"
          >
            Privacy policy
          </a>
          .
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="
              px-4 py-2 text-sm font-medium
              border border-white/20 rounded-sm
              text-white/70 hover:text-white hover:border-white/40
              transition-colors
            "
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="
              px-4 py-2 text-sm font-semibold
              bg-teal text-white rounded-sm
              hover:bg-teal/90
              transition-colors
            "
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
