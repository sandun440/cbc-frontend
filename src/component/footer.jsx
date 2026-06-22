import { FaPhoneAlt, FaInstagram, FaFacebookF, FaHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-dark text-white/80 mt-10">
      {/* Top accent line */}
      <div className="h-1 w-full bg-accent-gradient" />

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="flex flex-col items-start space-y-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" className="w-14 h-14 rounded-full object-cover ring-2 ring-accent/40" />
            <div>
              <p className="font-playfair text-white font-bold text-lg leading-tight">Crystal Beauty Clear</p>
              <p className="text-xs text-accent tracking-widest uppercase">Since 2024</p>
            </div>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            Bringing elegance and confidence to every woman through premium beauty products crafted with care.
          </p>
          <div className="flex gap-3 mt-2">
            {[FaInstagram, FaFacebookF].map((Icon, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-accent hover:bg-accent hover:text-white text-white/60 cursor-pointer transition-all duration-300"
              >
                <Icon size={15} />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-playfair text-white font-bold text-lg mb-5">Quick Links</h3>
          <div className="flex flex-col space-y-2">
            {[
              { to: "/", label: "Home" },
              { to: "/products", label: "Products" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact Us" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-white/60 hover:text-accent transition-colors duration-200 flex items-center gap-2 group"
              >
                <span className="w-4 h-[1px] bg-accent/40 group-hover:w-6 group-hover:bg-accent transition-all duration-300" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-playfair text-white font-bold text-lg mb-5">Contact Us</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-sm text-white/60">
              <FaLocationDot className="text-accent mt-0.5 flex-shrink-0" />
              <span>01st Floor, No.08, Old Kottawa Rd, Nugegoda</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <FaPhoneAlt className="text-accent flex-shrink-0" />
              <span>077 1234567</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <IoIosMail className="text-accent flex-shrink-0 text-base" />
              <span>example@example.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-2">
          <p>© 2025 Crystal Beauty Clear. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <FaHeart className="text-accent mx-1" size={10} /> for beauty lovers
          </p>
        </div>
      </div>
    </footer>
  );
}