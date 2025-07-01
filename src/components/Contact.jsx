import React, { useRef, useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import Toast from '../components/Toast';

const Contact = () => {
  const form = useRef();
  const [toast, setToast] = useState({ message: '', type: '', show: false });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(
      (result) => {
        console.log(result.text);
        setToast({ message: 'Message sent successfully!', type: 'success', show: true });
        setTimeout(() => setToast({ ...toast, show: false }), 3000);
      },
      (error) => {
        console.log(error.text);
        setToast({ message: 'Failed to send message. Please try again.', type: 'error', show: true });
        setTimeout(() => setToast({ ...toast, show: false }), 3000);
      }
    );

    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black py-16 px-4 sm:px-8 text-orange-100 relative">
  

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Want to talk to Amos?</h2>
          <p className="mb-8">
            Feel free to use the form or drop me an email. Old-fashioned phone calls work too.
          </p>
          <ul className="space-y-6 text-lg">
            <li className="flex items-center space-x-4">
              <FaPhone className="text-red-800 text-xl" />
              <span>+254 703 687 830</span>
            </li>
            <li className="flex items-center space-x-4">
              <FaEnvelope className="text-red-800 text-xl" />
              <span>segeramos89@gmail.com</span>
            </li>
            <li className="flex items-start space-x-4">
              <FaMapMarkerAlt className="text-red-800 text-xl mt-1" />
              <span>
                Nairobi<br />
                Moi Avenue, Pa. 00100
              </span>
            </li>
          </ul>
        </div>

        {/* Right: EmailJS Form */}
        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium">Your Name</label>
              <input name="your_name" type="text" placeholder="Your_Name" required className="w-full border border-orange-100 rounded px-3 py-2 mt-1 bg-transparent text-orange-100" />
            </div>
            
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input name="email" type="email" placeholder="example@email.com" required className="w-full border border-orange-100 rounded px-3 py-2 mt-1 bg-transparent text-orange-100" />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone (optional)</label>
            <input name="phone" type="text" placeholder="xxx-xxx-xxxx" className="w-full border border-orange-100 rounded px-3 py-2 mt-1 bg-transparent text-orange-100" />
          </div>

          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea name="message" rows="5" placeholder="Type your message ..." required className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-transparent text-orange-100"></textarea>
          </div>

          <button type="submit" className="bg-red-800 hover:bg-red-700 text-orange-100 font-semibold py-2 px-8 rounded-full transition cursor-pointer">
            Submit
          </button>
        </form>
      </div>

    </div>
  );
};

export default Contact;