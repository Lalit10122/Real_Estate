import {
  Home,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-black">
                JaipurEstate
              </span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Your trusted partner in finding the perfect property in Jaipur.
              Verified listings with smart insights for better decisions.
            </p>

            <div className="flex gap-4">
              <Facebook className="w-5 h-5 text-gray-500 hover:text-black cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-500 hover:text-black cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-500 hover:text-black cursor-pointer" />
              <Linkedin className="w-5 h-5 text-gray-500 hover:text-black cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-black mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-black">Home</Link></li>
              <li><Link to="/search" className="text-gray-600 hover:text-black">Search Properties</Link></li>
              <li><Link to="/sell" className="text-gray-600 hover:text-black">Sell Property</Link></li>
              <li><Link to="/dashboard" className="text-gray-600 hover:text-black">Dashboard</Link></li>
              <li><Link to="/preferences" className="text-gray-600 hover:text-black">My Account</Link></li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="font-semibold text-black mb-4">
              Property Types
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/search?type=flat" className="text-gray-600 hover:text-black">Flats in Jaipur</Link></li>
              <li><Link to="/search?type=plot" className="text-gray-600 hover:text-black">Plots in Jaipur</Link></li>
              <li><Link to="/search?type=villa" className="text-gray-600 hover:text-black">Villas in Jaipur</Link></li>
              <li><Link to="/search?type=commercial" className="text-gray-600 hover:text-black">Commercial Space</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-black mb-4">
              Contact Us
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">
                  C-Scheme, Jaipur, Rajasthan
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">
                  +91 98765 43210
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">
                  info@jaipurestate.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-500">
              © 2024 JaipurEstate. All rights reserved.
            </p>

            <div className="flex gap-6">
              <Link to="/privacy" className="text-gray-500 hover:text-black">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-black">
                Terms of Service
              </Link>
              <Link to="/about" className="text-gray-500 hover:text-black">
                About Us
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
