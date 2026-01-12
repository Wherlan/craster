import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-base mb-3">Luxury Giveaway</h3>
            <p className="text-white/60 text-xs mb-3">Your gateway to exclusive prizes and unforgettable experiences.</p>
            <div className="space-y-1 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <a href="mailto:support@luxurygiveaway.com" className="hover:text-white transition">support@luxurygiveaway.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <a href="tel:+1234567890" className="hover:text-white transition">+1 (234) 567-890</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>123 Business Ave, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-3">Quick Links</h3>
            <ul className="space-y-1 text-xs text-white/60">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">Browse Giveaways</a></li>
              <li><a href="#" className="hover:text-white transition">My Entries</a></li>
              <li><a href="#" className="hover:text-white transition">How It Works</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-base mb-3">Legal</h3>
            <ul className="space-y-1 text-xs text-white/60">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Disclaimer</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-base mb-3">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-center text-xs text-white/60 gap-2">
          <p>&copy; 2026 Luxury Giveaway. All rights reserved.</p>
          <p>Made with ❤️ for our community</p>
        </div>
      </div>
    </footer>
  );
}
