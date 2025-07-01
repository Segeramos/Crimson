// src/components/Footer.jsx
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
export default function Footer() {
  return (
    <footer className="bg-black mt-40">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p className="text-sm text-orange-100">
          © {new Date().getFullYear()} Segera Amos. All rights reserved.
        </p>
        <div className="flex space-x-6">
         <li className="flex items-center space-x-4">
                       <FaPhone className="text-red-800 text-xl" />
                       <span>+254 703 687 830</span>
                     </li>
        </div>
      </div>
    </footer>
  );
}
