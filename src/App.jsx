// src/App.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Blog from "./components/Blog";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-black to-gray-700 text-orange-100 font-['Karla']">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Navbar */}
          <nav className="relative sticky top-0 z-50 flex justify-between items-center py-6 backdrop-blur">
            {/* Logo (Portfolio link) */}
            <Link
              to="/blog"
              className="text-3xl font-bold tracking-widest cursor-pointer text-orange-100 drop-shadow-lg"
            >
              Portfolio
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 text-sm">
              {["/", "/about", "/projects", "/services", "/contact"].map((path, i) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `pb-1 transition-all duration-300 
                     ${
                       isActive
                         ? "text-red-400 drop-shadow-[0_0_8px_rgba(255,0,0,0.7)]"
                         : "text-orange-100"
                     } 
                     hover:text-red-500 hover:drop-shadow-[0_0_6px_rgba(255,100,100,0.9)]`
                  }
                >
                  {["Home", "About", "MyWork", "Services", "Contact"][i]}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Mobile Dropdown */}
            <div
              className={`absolute top-full left-0 w-full backdrop-blur-md px-6 py-6
                          flex flex-col items-center space-y-6 md:hidden z-50 shadow-2xl
                          transform transition-all duration-500 ease-in-out ${
                menuOpen
                  ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                  : "opacity-0 -translate-y-8 scale-90 pointer-events-none"
              }`}
            >
              {["/", "/about", "/projects", "/services", "/contact"].map((path, i) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `text-lg font-semibold pb-1 transition-all duration-300 
                     ${
                       isActive
                         ? "text-red-400 drop-shadow-[0_0_8px_rgba(255,0,0,0.7)]"
                         : "text-orange-100"
                     } 
                     hover:text-red-500 hover:drop-shadow-[0_0_6px_rgba(255,100,100,0.9)]`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {["Home", "About", "MyWork", "Services", "Contact"][i]}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Page Content */}
          <main className="pb-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
