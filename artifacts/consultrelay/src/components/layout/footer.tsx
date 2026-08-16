import { Link } from 'wouter';
import { LogoIcon } from './navbar';

export function Footer() {
  return (
    <footer className="bg-ivory border-t border-[rgba(13,34,53,0.09)] py-12 md:py-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-[10px]">
              <LogoIcon className="w-[24px] h-[18px] text-teal flex-shrink-0" />
              <span className="text-navy font-semibold text-[16px] tracking-[-0.02em]">
                ConsultRelay
              </span>
            </div>
            <p className="text-[13px] text-charcoal/45 max-w-[220px] leading-[1.55]">
              Lead-to-Show conversion for high-value dental leads
            </p>
            <p className="text-[12px] text-charcoal/35">
              &copy; {new Date().getFullYear()} ConsultRelay
            </p>
          </div>

          {/* Links + email */}
          <div className="flex flex-col gap-5">
            <a
              href="mailto:ag@consultrelay.space"
              className="text-[13px] font-medium text-teal hover:text-[#248a80] transition-colors"
            >
              ag@consultrelay.space
            </a>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                { href: '/#how-it-works', label: 'How It Works' },
                { href: '/#the-pilot',   label: 'Pilot' },
                { href: '/#faq',         label: 'FAQ' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[13px] text-charcoal/50 hover:text-teal transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/privacy"
                className="text-[13px] text-charcoal/50 hover:text-teal transition-colors"
              >
                Privacy
              </Link>
            </nav>
          </div>
        </div>

        {/* PHI notice */}
        <div className="mt-10 pt-8 border-t border-[rgba(13,34,53,0.07)]">
          <p className="text-[11.5px] text-charcoal/35 text-center tracking-[0.01em]">
            Please do not send patient health information by email or through this website.
          </p>
        </div>
      </div>
    </footer>
  );
}
