import React from 'react';
import { FileText, ChevronDown } from 'lucide-react';

export function TermsAndConditions({ onClose }) {
  const [expandedSection, setExpandedSection] = React.useState(0);

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using this platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. We reserve the right to make changes to these terms and our policies at any time. It is your responsibility to review these Terms and Conditions periodically for updates.'
    },
    {
      title: '2. Eligibility Requirements',
      content: 'To participate in giveaways, users must be at least 18 years of age and reside in eligible jurisdictions. You must provide accurate and complete information during registration. Participants must have a valid email address and phone number. Employees and their immediate family members of our organization are not eligible to participate. Previous winners are eligible to enter after 30 days from their last win.'
    },
    {
      title: '3. User Accounts',
      content: 'You are responsible for maintaining the confidentiality of your account credentials. You agree not to share your password or account information with third parties. You are fully responsible for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these terms.'
    },
    {
      title: '4. Giveaway Rules and Regulations',
      content: 'Each giveaway has specific terms outlined at the time of entry. You may only enter a giveaway once per account unless otherwise specified. Entries must be made before the specified deadline. We reserve the right to disqualify entries that appear fraudulent or violate these terms. Winners are selected randomly using certified random number generation. All giveaway decisions are final and binding.'
    },
    {
      title: '5. Prize Eligibility and Claims',
      content: 'Winners must complete KYC (Know Your Customer) verification within 30 days to claim prizes. Prizes must be claimed within 60 days of notification. Winners are responsible for any applicable taxes related to prize claims. We reserve the right to substitute prizes of equal or greater value if the original prize becomes unavailable. Unclaimed prizes will be forfeited after the claim period expires.'
    },
    {
      title: '6. Know Your Customer (KYC)',
      content: 'All prize winners must complete our KYC verification process. KYC verification requires: full name, age verification, address information, government-issued identification, and contact information. Information provided during KYC must be accurate and complete. False or misleading information during KYC may result in disqualification and prize forfeiture. Your KYC information will be handled in accordance with our Privacy Policy.'
    },
    {
      title: '7. Privacy and Data Protection',
      content: 'We collect personal information for account creation and KYC verification. Your data is stored securely using industry-standard encryption. We do not sell or share your personal information with third parties without consent, except as required by law. You have the right to request access to, or deletion of, your personal data. We comply with applicable data protection regulations including GDPR and CCPA.'
    },
    {
      title: '8. User Conduct and Prohibited Activities',
      content: 'Users agree not to: engage in fraudulent or deceptive practices, use multiple accounts to enter the same giveaway, automate entry processes, harass or abuse other users, attempt to manipulate results, use the platform for illegal purposes, or violate any applicable laws. Users found engaging in prohibited activities will have their accounts terminated and be banned from future participation. We may report illegal activities to appropriate authorities.'
    },
    {
      title: '9. Limitation of Liability',
      content: 'This platform is provided "as is" without warranties of any kind. We are not responsible for technical failures, internet disruptions, or service interruptions. In no event shall we be liable for indirect, incidental, special, or consequential damages. Our maximum liability is limited to the prize value or $100, whichever is less. We are not responsible for lost, stolen, or damaged prizes after delivery.'
    },
    {
      title: '10. Intellectual Property Rights',
      content: 'All content on this platform, including logos, text, graphics, and images, is owned by or licensed to us. You may not reproduce, distribute, or transmit any content without our written permission. User-generated content remains your property, but you grant us a license to use it on our platform. We respect intellectual property rights and will take action against infringement.'
    },
    {
      title: '11. Third-Party Links',
      content: 'Our platform may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of external sites. Your use of third-party services is subject to their terms and conditions. We recommend reviewing the privacy policies of any external websites before providing personal information.'
    },
    {
      title: '12. Modifications and Updates',
      content: 'We reserve the right to modify or discontinue the platform at any time. We will provide notice of material changes when possible. Your continued use of the platform following modifications constitutes acceptance of the new terms. We are not liable for any modification, suspension, or discontinuation of service. Updates may be rolled out without prior notification.'
    },
    {
      title: '13. Dispute Resolution',
      content: 'Any disputes arising from use of this platform shall be resolved through binding arbitration. Claims must be filed within one year of the incident. Arbitration will be conducted in a mutually agreed location or remotely. Each party bears their own legal costs unless arbitration rules specify otherwise. You waive the right to pursue disputes in court, except for certain limited circumstances.'
    },
    {
      title: '14. Governing Law',
      content: 'These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction where we are headquartered. You consent to the jurisdiction and venue of courts in that location. Any legal action or proceeding relating to your use of the platform must be brought exclusively in such courts.'
    },
    {
      title: '15. Termination of Service',
      content: 'We reserve the right to suspend or terminate your account at any time for any reason, including violation of these terms. Termination may result in loss of access to your account and forfeiture of any pending prizes. Upon termination, your rights under this agreement shall cease immediately. Even after termination, certain provisions of these terms will continue to apply.'
    },
    {
      title: '16. Severability',
      content: 'If any provision of these Terms and Conditions is found to be invalid or unenforceable, that provision shall be struck, and the remaining provisions shall remain in full force and effect. We will not be held liable for the invalidity of any provision. The parties agree to work together to replace any invalid provision with a valid one.'
    },
    {
      title: '17. Entire Agreement',
      content: 'These Terms and Conditions constitute the entire agreement between you and us regarding your use of the platform. They supersede all prior agreements and understandings. No oral agreements, representations, or warranties are valid unless confirmed in writing by an authorized representative. Any amendments must be in writing and signed by both parties.'
    },
    {
      title: '18. Contact Information',
      content: 'If you have questions about these Terms and Conditions, please contact us at: support@luxurygiveaway.com | Phone: +1-800-GIVEAWAY | Address: Luxury Giveaway Hub Team, 123 Innovation Drive, Tech City, TC 12345 | Business Hours: Monday-Friday, 9 AM - 6 PM EST'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FileText size={32} className="text-white" />
          <h1 className="text-4xl font-bold">Terms and Conditions</h1>
        </div>
        <p className="text-white/60 mb-2">Last Updated: January 6, 2026</p>
        <div className="h-1 w-20 bg-gradient-to-r from-white to-transparent rounded-full"></div>
      </div>

      {/* Introduction */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <p className="text-white/80 leading-relaxed">
            Welcome to Luxury Giveaway Hub, the Tesla-Inspired Premium Giveaway Platform. These Terms and Conditions ("Terms") govern your access to and use of our website, services, and all related features. By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these Terms, you are not permitted to use our services.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-4xl mx-auto space-y-3">
        {sections.map((section, index) => (
          <div key={index} className="bg-[#111111] rounded-2xl border border-white/10 overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === index ? -1 : index)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <h2 className="text-lg font-semibold text-left">{section.title}</h2>
              <ChevronDown 
                size={20} 
                className={`flex-shrink-0 transition-transform ${expandedSection === index ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedSection === index && (
              <div className="px-6 pb-4 border-t border-white/10">
                <p className="text-white/70 leading-relaxed">{section.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto mt-12 pb-12">
        <div className="bg-gradient-to-r from-white/5 to-transparent rounded-2xl p-6 border border-white/10">
          <p className="text-white/60 text-sm leading-relaxed">
            <span className="font-semibold text-white">Disclaimer:</span> These Terms and Conditions are provided as-is and constitute a legal agreement between you and Luxury Giveaway Hub. By continuing to use our services, you confirm your acceptance. We reserve all rights not expressly granted in these Terms. For more information about how we handle your data, please refer to our Privacy Policy.
          </p>
        </div>
      </div>

      {/* Close Button (if modal) */}
      {onClose && (
        <div className="max-w-4xl mx-auto mt-8">
          <button
            onClick={onClose}
            className="w-full bg-white text-black font-bold py-3 rounded-full hover:bg-white/90 transition-colors"
          >
            Close Terms and Conditions
          </button>
        </div>
      )}
    </div>
  );
}
