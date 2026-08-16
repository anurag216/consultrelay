import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-sm border border-mint p-10 md:p-14 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-3xl font-bold text-navy mb-8">Privacy Information</h1>
          
          <div className="space-y-6 text-charcoal/80 leading-relaxed">
            <p>
              This public website is for business enquiries only and serves as an informational resource for dental marketing agencies.
            </p>
            <ul className="space-y-4 list-disc pl-5">
              <li>It does not intentionally collect patient health information.</li>
              <li>Visitors should not send patient health information by email.</li>
              <li>Normal technical server and log information may be processed by the hosting infrastructure.</li>
              <li>Live pilot data handling is governed separately with participating customers.</li>
              <li>Formal policies may be updated before live patient deployments.</li>
            </ul>
          </div>
          
          <div className="mt-12 pt-8 border-t border-mint">
            <a 
              href="/" 
              className="text-teal font-medium hover:text-teal/80 transition-colors inline-flex items-center gap-2"
            >
              &larr; Return to main site
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
