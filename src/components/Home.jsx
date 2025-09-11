import React, { useState, useRef } from "react";
import { FaFilePdf, FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp, FaPhone } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { about } from "../data";
import { motion } from "framer-motion";
import Footer from "./Footer";
import emailjs from "@emailjs/browser";
import Toast from "./Toast";
import ReactGA from "react-ga4";


// Animation variants
 const handleDownload = () => {
    ReactGA.event({
        category: "engagement",
        action: "download_cv",
        label: "Download CV Button",
    });
    };
const iconsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const iconItem = {
  hidden: { opacity: 0, x: -80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 350, damping: 24 },
  },
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState({ message: "", type: "", show: false });
  const form = useRef();

  const sendRequest = (e) => {
    e.preventDefault();
    const templateParams = {
      to_name: "Amos",
      from_name: email,
      message: "I need your service.",
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setToast({ message: "Request sent successfully!", type: "success", show: true });
          setTimeout(() => setToast({ ...toast, show: false }), 3000);
          setEmail("");
        },
        () => {
          setToast({ message: "Failed to send request.", type: "error", show: true });
          setTimeout(() => setToast({ ...toast, show: false }), 3000);
        }
      );
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-black py-12 px-3 sm:px-4 md:px-6 lg:px-8 text-orange-100 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Toast */}
      {toast.show && <Toast message={toast.message} type={toast.type} />}

      {/* Hero Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between flex-1 container mx-auto max-w-screen-xl gap-10 py-8">
        {/* Left */}
        <div className="w-full lg:w-1/2 space-y-5 sm:space-y-7 mt-4 lg:mt-0">
          {/* Heading */}
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center lg:text-left"
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, type: "spring", stiffness: 120 }}
          >
            <span className="text-orange-100 font-extrabold">
              SEO Growth Strategist & <br />
            </span>
            <span className="text-orange-100 font-extrabold">Web Developer</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-orange-100 text-center lg:text-left leading-relaxed"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, type: "spring" }}
          >
            {about.tagline}
          </motion.p>

          {/* Contact Form */}
          <motion.form
            ref={form}
            onSubmit={sendRequest}
            className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0 mt-5 sm:mt-7 w-full max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <input
              type="email"
              placeholder="Your Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="hidden lg:block w-full sm:w-auto rounded-lg px-4 py-2.5 bg-orange-100 text-black focus:outline-none focus:ring-4 focus:ring-red-500 transition"
            />

            <a
              href="tel:+254703687830"
              className="w-full sm:w-auto bg-red-800 hover:bg-red-700 text-orange-100 rounded-lg px-4 py-2.5 font-semibold shadow-md hover:scale-105 transition inline-flex items-center justify-center space-x-2"
            >
              <FaPhone className="text-lg" />
              <span>Call Me</span>
            </a>
          </motion.form>

          {/* Resume */}
          <motion.div
            className="mt-8 flex justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <a
              href="/Segera.pdf"
              onClick={handleDownload``}
              download 
              className="w-full sm:w-auto bg-red-800 hover:bg-red-700 text-orange-100 rounded-lg px-4 py-2.5 font-semibold shadow-md hover:scale-105 transition inline-flex items-center justify-center space-x-2"
            >
              <FaFilePdf className="text-lg" />
              <span>My Resume</span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center lg:justify-start space-x-4 sm:space-x-5 mt-14"
            variants={iconsContainer}
            initial="hidden"
            animate="show"
          >
            <motion.a
              href="https://x.com/bookie_DM?t=DWOme_6DSoI75b_vCHQGbw&s=08"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition"
              variants={iconItem}
              whileHover={{ scale: 1.25, rotate: [0, -8, 8, 0], boxShadow: "0px 4px 24px 0px #fbbf24aa", transition: { type: "spring", stiffness: 400, damping: 8 } }}
              whileTap={{ scale: 0.93 }}
            >
              <FaXTwitter />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition"
              variants={iconItem}
              whileHover={{ scale: 1.25, rotate: [0, -8, 8, 0], boxShadow: "0px 4px 24px 0px #0a66c2aa", transition: { type: "spring", stiffness: 400, damping: 8 } }}
              whileTap={{ scale: 0.93 }}
            >
              <FaLinkedinIn />
            </motion.a>

            <motion.a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition"
              variants={iconItem}
              whileHover={{ scale: 1.25, rotate: [0, -8, 8, 0], boxShadow: "0px 4px 24px 0px #f43f5ea0", transition: { type: "spring", stiffness: 400, damping: 8 } }}
              whileTap={{ scale: 0.93 }}
            >
              <FaInstagram />
            </motion.a>

            <motion.a
              href="https://wa.me/254756627342"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition"
              variants={iconItem}
              whileHover={{ scale: 1.25, rotate: [0, -8, 8, 0], boxShadow: "0px 4px 24px 0px #25d366aa", transition: { type: "spring", stiffness: 400, damping: 8 } }}
              whileTap={{ scale: 0.93 }}
            >
              <FaWhatsapp />
            </motion.a>

            <motion.a
              href="https://github.com/Segeramos"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition"
              variants={iconItem}
              whileHover={{ scale: 1.25, rotate: [0, -8, 8, 0], boxShadow: "0px 4px 24px 0px #fbbf24aa", transition: { type: "spring", stiffness: 400, damping: 8 } }}
              whileTap={{ scale: 0.93 }}
            >
              <FaGithub />
            </motion.a>
          </motion.div>
        </div>

        {/* Right: Profile Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <motion.img
            src="/profile.png"
            alt="Profile"
            className="rounded-2xl shadow-lg w-56 h-56 sm:w-72 sm:h-72 md:w-[360px] md:h-[360px] lg:w-[500px] lg:h-[500px] object-cover border-8 border-orange-100/10"
            initial={{ opacity: 0, x: 300, rotate: 6 }}
            animate={{ opacity: 1, x: [300, -30, 20, -10, 0], rotate: [6, 0, 2, -1, 0] }}
            transition={{ duration: 1.5, ease: "easeOut", times: [0, 0.5, 0.7, 0.85, 1] }}
            whileHover={{ scale: 1.025, rotate: 1 }}
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}
