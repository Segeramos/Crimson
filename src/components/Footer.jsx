// // src/components/Footer.jsx
// import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
// export default function Footer() {
//   return (
//     <footer className="bg-black mt-40">
//       <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
//         <p className="text-sm text-orange-100">
//           © {new Date().getFullYear()} Segera Amos. All rights reserved.
//         </p>
//         <div className="flex space-x-6">
//          <li className="flex items-center space-x-4">
//                        <FaPhone className="text-red-800 text-xl" />
//                        <span>+254 703 687 830</span>
//                      </li>
//         </div>
//       </div>
//     </footer>
//   );
// }


// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn, FaInstagram, FaWhatsapp, FaLock } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 text-orange-100 mt-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold tracking-widest text-orange-100">
              Portfolio
            </Link>
            <p className="text-sm text-orange-100/50 mt-3 leading-relaxed max-w-xs">
              SEO Growth Strategist & Web Developer helping businesses get found online.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4 mt-5">
              <a href="https://x.com/bookie_DM" target="_blank" rel="noopener noreferrer"
                className="text-orange-100/40 hover:text-red-500 transition-colors">
                <FaXTwitter size={16} />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"
                className="text-orange-100/40 hover:text-red-500 transition-colors">
                <FaLinkedinIn size={16} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-orange-100/40 hover:text-red-500 transition-colors">
                <FaInstagram size={16} />
              </a>
              <a href="https://wa.me/254756627342" target="_blank" rel="noopener noreferrer"
                className="text-orange-100/40 hover:text-red-500 transition-colors">
                <FaWhatsapp size={16} />
              </a>
              <a href="https://github.com/Segeramos" target="_blank" rel="noopener noreferrer"
                className="text-orange-100/40 hover:text-red-500 transition-colors">
                <FaGithub size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home",     path: "/" },
                { label: "About",    path: "/about" },
                { label: "My Work",  path: "/projects" },
                { label: "Services", path: "/services" },
                { label: "Blog",     path: "/blog" },
                { label: "Contact",  path: "/contact" },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm text-orange-100/50 hover:text-red-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm text-orange-100/50">
              <li>
                <a href="tel:+254703687830" className="hover:text-red-400 transition-colors">
                  +254 703 687 830
                </a>
              </li>
              <li>
                <a href="https://wa.me/254756627342" target="_blank" rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors">
                  WhatsApp Me
                </a>
              </li>
              <li className="text-orange-100/30">Nairobi, Kenya</li>
            </ul>

            {/* CTA */}
            <a
              href="tel:+254703687830"
              className="inline-block mt-5 bg-red-800 hover:bg-red-700 text-orange-100 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Hire Me
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-orange-100/30">
            © {year} Segera Amos. All rights reserved.
          </p>

          {/* Admin link — subtle */}
          <Link
            to="/admin"
            className="flex items-center gap-1.5 text-xs text-orange-100/20 hover:text-red-500 transition-colors"
          >
            <FaLock size={10} />
            Admin
          </Link>
        </div>

      </div>
    </footer>
  );
}