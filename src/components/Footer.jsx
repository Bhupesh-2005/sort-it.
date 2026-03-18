import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, FileText, Info, HelpCircle, Mail, Phone, MapPin, Send, CreditCard, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="font-extrabold text-2xl tracking-tight text-primary">sort it.</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Your one-stop destination for all your needs. Fast, reliable, and always sorted. Experience the best in class service with us.
            </p>
            <div className="flex items-start gap-2 text-gray-500 text-sm">
              <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <span>123 sort it. Ave, Metropolis, Market City 10012</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-base">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2 group">
                  <Info className="w-4 h-4 group-hover:text-primary" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2 group">
                  <HelpCircle className="w-4 h-4 group-hover:text-primary" /> Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-base">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2 group">
                  <FileText className="w-4 h-4 group-hover:text-primary" /> Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2 group">
                  <ShieldAlert className="w-4 h-4 group-hover:text-primary" /> Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-base">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <a href="mailto:support@sortit.com" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2 group">
                <Mail className="w-4 h-4 group-hover:text-primary" /> support@sortit.com
              </a>
              <a href="tel:+15551234567" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2 group">
                <Phone className="w-4 h-4 group-hover:text-primary" /> +1 (555) 123-4567
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-gray-900 mb-4 text-base">Stay Updated</h4>
            <p className="text-gray-500 text-sm mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-gray-50 border border-gray-200 rounded-l-xl px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button 
                type="submit" 
                className="bg-primary text-white px-4 py-2 rounded-r-xl border border-primary hover:bg-primary/90 transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Payment & Security Bar */}
        <div className="border-t border-gray-100 pt-6 pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600 text-sm font-medium bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            <span>100% Secure Payments</span>
          </div>
          <div className="flex gap-3">
            <div className="w-12 h-8 bg-gray-50 border border-gray-200 rounded flex items-center justify-center text-gray-400">
              <CreditCard className="w-6 h-6" />
            </div>
            {/* Visual placeholders for various payment methods */}
            <div className="w-12 h-8 bg-gray-50 border border-gray-200 rounded flex items-center justify-center font-bold text-xs text-blue-600">
              VISA
            </div>
            <div className="w-12 h-8 bg-gray-50 border border-gray-200 rounded flex items-center justify-center font-bold text-xs text-red-500">
              MC
            </div>
            <div className="w-12 h-8 bg-gray-50 border border-gray-200 rounded flex items-center justify-center font-bold text-[10px] text-blue-800">
              PayPal
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="mb-4 md:mb-0">
            &copy; {currentYear} sort it. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors text-sm font-medium">Facebook</a>
            <a href="#" className="hover:text-primary transition-colors text-sm font-medium">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors text-sm font-medium">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
