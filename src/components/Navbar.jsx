// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white px-4 sm:px-6 md:px-8 lg:px-12 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <div className="text-xl font-bold">
        MyPortfolio
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="hover:text-orange-400">Home</Link>
        <Link to="/about" className="hover:text-orange-400">About</Link>
        <Link to="/services" className="hover:text-orange-400">Services</Link>
        <Link to="/contact" className="hover:text-orange-400">Contact</Link>

        {/* Admin icon — desktop */}
        <Link
          to="/admin"
          title="Admin"
          className="flex items-center gap-2 bg-red-800 hover:bg-red-700 text-orange-100 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors duration-200"
        >
          <FaLock className="w-3 h-3" />
          Admin
        </Link>
      </div>

      {/* Mobile right side: admin + hamburger */}
      <div className="flex items-center gap-3 md:hidden">
        <Link
          to="/admin"
          title="Admin"
          className="flex items-center gap-1.5 bg-red-800 hover:bg-red-700 text-orange-100 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors duration-200"
        >
          <FaLock className="w-3 h-3" />
          Admin
        </Link>

        <button className="focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black px-6 py-4 flex flex-col space-y-4 md:hidden z-50 shadow-lg">
          <Link to="/" className="hover:text-red-700" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="hover:text-red-700" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/services" className="hover:text-red-700" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/contact" className="hover:text-red-700" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}