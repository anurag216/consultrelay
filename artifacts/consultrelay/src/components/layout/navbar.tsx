import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

// Relay mark: ascending trajectory — three nodes connected by a rising path,
// suggesting a lead being elevated through stages. Clean, readable at 16px.
export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Ascending relay curve */}
      <path
        d="M4 17 C9 17 14 5 26 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Origin node — lead enters */}
      <circle cx="4" cy="17" r="2.8" fill="currentColor" />
      {/* Mid node — in flight */}
      <circle cx="15" cy="10.5" r="1.8" fill="currentColor" fillOpacity="0.55" />
      {/* Destination node — attended */}
      <circle cx="26" cy="5" r="2.8" fill="currentColor" />
    </svg>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-[10px]">
      <LogoIcon className="w-[26px] h-[20px] text-teal flex-shrink-0" />
      <span className="text-navy font-semibold text-[17px] tracking-[-0.02em] leading-none">
        ConsultRelay
      </span>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/#how-it-works', label: 'How It Works' },
    { href: '/#for-agencies', label: 'For Agencies' },
    { href: '/#the-pilot', label: 'The Pilot' },
    { href: '/#faq', label: 'FAQ' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-ivory/95 backdrop-blur-md border-b border-[#D4E5E1]/70 shadow-[0_1px_0_0_rgba(13,34,53,0.06)]'
          : 'bg-ivory border-b border-[#D4E5E1]/50'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex justify-between items-center h-[68px]">
          <Link href="/" aria-label="ConsultRelay home">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13.5px] font-medium text-charcoal/70 hover:text-navy tracking-[-0.005em] transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:ag@consultrelay.space?subject=ConsultRelay%20Lead-to-Show%20Pilot"
              className="ml-2 inline-flex items-center justify-center px-5 py-2 rounded text-[13.5px] font-semibold text-white bg-teal hover:bg-[#248a80] transition-colors duration-150"
              data-testid="nav-cta"
            >
              Discuss a Pilot
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-navy hover:text-teal p-1.5 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden bg-ivory border-t border-[#D4E5E1] absolute w-full left-0 shadow-lg">
          <div className="px-5 pt-3 pb-5 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-2.5 text-[15px] font-medium text-charcoal/80 hover:text-teal transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <a
                href="mailto:ag@consultrelay.space?subject=ConsultRelay%20Lead-to-Show%20Pilot"
                className="block w-full text-center px-5 py-3 rounded text-[15px] font-semibold text-white bg-teal hover:bg-[#248a80] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Discuss a Pilot
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
