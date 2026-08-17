import { createRoot } from 'react-dom/client';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';
import { initAnalyticsIfConsented } from '@/components/cookie-consent';

import './index.css';

// Only initialise analytics if the user has already given consent (handles
// page reloads after the banner was accepted). First-time visitors will have
// analytics initialised by the banner's accept handler instead.
initAnalyticsIfConsented();

createRoot(document.getElementById('root')!, {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
