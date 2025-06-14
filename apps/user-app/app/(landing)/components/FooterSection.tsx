import { Smartphone, Mail, MapPin, Facebook, X, Instagram, Linkedin } from 'lucide-react';
import { FiLinkedin, FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import { useRouter } from "next/navigation"
export default function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                MoneyTXN
              </h3>
              <p className="text-gray-400 mt-4 leading-relaxed">
                The world's most trusted platform for international money transfers. 
                Fast, secure, and affordable.
              </p>
            </div>
            
            <div className="flex space-x-4">
                <FiFacebook
                  onClick={() => window.open("https://www.facebook.com/", "_blank")}
                  className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors"
                />
                <FiTwitter
                  onClick={() => window.open("https://x.com/AmitAarav1205", "_blank")}
                  className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors"
                />
                <FiInstagram
                  onClick={() => window.open("http://instagram.com/amitaarav_8/", "_blank")}
                  className="h-6 w-6 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors"
                />
                <FiLinkedin
                  onClick={() => window.open("https://www.linkedin.com/in/amitkrgupta8", "_blank")}
                  className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors"
                />
              
              </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Send Money</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Receive Money</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Track Transfer</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Exchange Rates</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Business Transfers</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">support@moneytxn.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">Uttar Pradesh, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 MoneyTXN. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Licensed and regulated by FinCEN</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-400">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}