import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqItems = [
    {
      question: 'How do I enter a giveaway?',
      answer: 'Browse the Active Giveaways section, select an item, and click "Enter". You must be logged in and have verified your identity to enter.'
    },
    {
      question: 'What is ID.me verification?',
      answer: 'ID.me verification ensures you are eligible for tax-free gifting. You will need to verify your identity through ID.me in your account settings.'
    },
    {
      question: 'When are winners drawn?',
      answer: 'Winners are drawn on the specified draw date for each giveaway. You will be notified immediately if you win.'
    },
    {
      question: 'Can I enter multiple giveaways?',
      answer: 'Yes! You can enter as many giveaways as you want. Each entry increases your chances of winning.'
    },
    {
      question: 'How do I claim my prize?',
      answer: 'If you win, we will contact you via email and phone to arrange prize delivery and complete final verification.'
    },
    {
      question: 'Is this a legitimate giveaway?',
      answer: 'Yes, all giveaways are legitimate and tax-compliant. We verify all winners and ensure proper legal compliance.'
    }
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {faqItems.map((item, idx) => (
          <div key={idx} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
            <button
              onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              className="w-full p-4 flex items-center justify-between hover:bg-white/10 transition-colors"
            >
              <span className="font-medium text-left text-white text-sm">{item.question}</span>
              <ChevronDown
                size={18}
                className={`text-white/60 transition-transform flex-shrink-0 ml-2 ${expandedFaq === idx ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedFaq === idx && (
              <div className="px-4 pb-4 text-white/70 text-sm border-t border-white/10">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
