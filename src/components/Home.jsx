import React, { useState, useRef } from "react";
import { about } from "../data";
import { motion } from "framer-motion";
import Footer from "./Footer";
import emailjs from "@emailjs/browser";
import Toast from "./Toast";
import { FaXTwitter } from "react-icons/fa6";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { FaPhone } from "react-icons/fa";


// Animation variants
const iconsContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
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
        (result) => {
          console.log(result.text);
          setToast({
            message: "Request sent successfully!",
            type: "success",
            show: true,
          });
          setTimeout(() => setToast({ ...toast, show: false }), 3000);
          setEmail("");
        },
        (error) => {
          console.log(error.text);
          setToast({
            message: "Failed to send request.",
            type: "error",
            show: true,
          });
          setTimeout(() => setToast({ ...toast, show: false }), 3000);
        }
      );
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-black py-16 px-4 sm:px-6 md:px-8 lg:px-12 text-orange-100 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Toast */}
      {toast.show && <Toast message={toast.message} type={toast.type} />}

      {/* Hero Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between flex-1 container mx-auto gap-12 py-12 md:py-2">
        {/* Left */}
        <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 mt-4 lg:mt-0">
          {/* Animated Heading */}
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center lg:text-left"
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              type: "spring",
              stiffness: 120,
            }}
          >
            <span className="text-orange-100 font-extrabold">
              A Digital Marketer And{" "}
            </span>
            <span className="text-orange-100 font-extrabold">
              Web Developer
            </span>
          </motion.h1>
          {/* Animated Tagline */}
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-orange-100 text-center lg:text-left"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, type: "spring" }}
          >
            {about.tagline}
          </motion.p>
          {/* Animated Form */}
          <motion.form
            ref={form}
            onSubmit={sendRequest}
            className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-6 sm:mt-8 w-full max-w-md mx-auto lg:mx-0"
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
              className="w-full sm:w-auto rounded-lg px-4 py-3 bg-orange-100 text-black focus:outline-none focus:ring-4 focus:ring-red-500 transition"
            />
           <motion.button
              type="submit"
              className="block sm:hidden w-full bg-red-800 hover:bg-red-700 text-orange-100 rounded-lg px-4 py-3 font-semibold shadow-lg hover:scale-105 transition"
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 0px 12px 2px #ea580c55",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Connect with me
            </motion.button>

         {/* call button */}
            <a
              href="tel:+254703687830"
              className="w-full sm:w-auto bg-red-800 hover:bg-red-700 text-orange-100 rounded-lg px-4 py-3 font-semibold shadow-lg hover:scale-105 transition inline-flex items-center justify-center space-x-2"
            >
              <FaPhone className="text-lg" />
              <span>Call Me</span>
            </a>

            
          </motion.form>
          {/* Social links */}
          <motion.div
            className="flex justify-center lg:justify-start space-x-4 sm:space-x-6 mt-20"
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
              whileHover={{
                scale: 1.25,
                rotate: [0, -8, 8, 0],
                boxShadow: "0px 4px 24px 0px #fbbf24aa",
                transition: { type: "spring", stiffness: 400, damping: 8 },
              }}
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
              whileHover={{
                scale: 1.25,
                rotate: [0, -8, 8, 0],
                boxShadow: "0px 4px 24px 0px #0a66c2aa",
                transition: { type: "spring", stiffness: 400, damping: 8 },
              }}
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
              whileHover={{
                scale: 1.25,
                rotate: [0, -8, 8, 0],
                boxShadow: "0px 4px 24px 0px #f43f5ea0",
                transition: { type: "spring", stiffness: 400, damping: 8 },
              }}
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
              whileHover={{
                scale: 1.25,
                rotate: [0, -8, 8, 0],
                boxShadow: "0px 4px 24px 0px #25d366aa",
                transition: { type: "spring", stiffness: 400, damping: 8 },
              }}
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
              whileHover={{
                scale: 1.25,
                rotate: [0, -8, 8, 0],
                boxShadow: "0px 4px 24px 0px #fbbf24aa",
                transition: { type: "spring", stiffness: 400, damping: 8 },
              }}
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
            className="rounded-2xl shadow-lg w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] object-cover border-8 border-orange-100/10"
            initial={{ opacity: 0, x: 300, rotate: 6 }}
            animate={{
              opacity: 1,
              x: [300, -30, 20, -10, 0],
              rotate: [6, 0, 2, -1, 0],
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              times: [0, 0.5, 0.7, 0.85, 1],
            }}
            whileHover={{ scale: 1.025, rotate: 1 }}
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}
