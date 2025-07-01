import { about, skills } from "../data";
import { FaGoogle, FaLaptopCode } from "react-icons/fa";
import { motion } from "framer-motion";

// Certification data
const certifications = [
  {
    name: 'Front-End Web Development',
    issuer: 'ALX',
    link: 'https://savanna.alxafrica.com/certificates/CE8B5fFhN7',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuu4n2VgSLyv70udhzHGObeyK8CrxZi9YBNQ&s'
  },
  {
    name: 'Professional Foundations',
    issuer: 'ALX',
    link: 'https://savanna.alxafrica.com/certificates/9e2BSs5Zhc',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuu4n2VgSLyv70udhzHGObeyK8CrxZi9YBNQ&s'
  },
  {
    name: 'Graphic Design',
    issuer: 'ALX',
    link: 'https://www.freecodecamp.org/certification/yourusername/responsive-web-design',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuu4n2VgSLyv70udhzHGObeyK8CrxZi9YBNQ&s'
  },
  {
    name: 'ALX AI Starter Kit',
    issuer: 'ALX',
    link: 'https://savanna.alxafrica.com/certificates/cny5pJFxzr',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuu4n2VgSLyv70udhzHGObeyK8CrxZi9YBNQ&s'
  },
  {
    name: 'Digital Marketing',
    issuer: 'Udemy',
    link: 'https://coursera.org/verify/meta-frontend-certification',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAGllHM_06tkceB-8rg2x8PV1yK52frVK0CQ&s'
  },
  {
    name: 'UI/UX Design',
    issuer: 'ALX',
    link: 'https://www.linkedin.com/learning/certificates/your-certificate-id',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuu4n2VgSLyv70udhzHGObeyK8CrxZi9YBNQ&s'
  }
];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, type: "spring" }
  }),
};

const bounceIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: i => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.13, duration: 0.7, type: "spring", stiffness: 220 }
  }),
};

const containerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    }
  }
};

export default function About() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-black py-16 px-4 sm:px-6 md:px-8 lg:px-12 text-orange-100 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.1 }}
    >
      {/* Work Background */}
      <motion.div
        className="flex flex-col gap-12 mb-8"
        initial="hidden"
        animate="visible"
        variants={containerStagger}
      >
        <div className="space-y-6">
          <motion.h3
            className="text-2xl font-semibold text-orange-100 flex items-center gap-2"
            variants={fadeUp}
            custom={0}
          >
            💼 Work Background
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center py-8">
            {/* Each Work Card */}
            {[
              {
                company: "Rondamo Technologies",
                logo: "/RT.png",
                role: "Digital Marketing (SEO)",
                dates: "May 2023 - May 2024",
                description: "I worked on SEO-driven digital marketing, boosting traffic, rankings, and brand visibility online.",
                bg: "bg-orange-100"
              },
              {
                company: "Rondamo Technologies",
                logo: "/RT.png",
                role: "Sales and Marketing",
                dates: "June 2024 to December 2024",
                description: "Led Sales & Marketing efforts, driving revenue growth through strategy, outreach, and market research.",
                bg: "bg-orange-200"
              },
              {
                company: "Mighty Ape Technologies",
                logo: "/MAT.png",
                role: "Digital Marketing (SEO)",
                dates: "January 2025 to date",
                description: "I managed SEO strategies to increase website traffic, search rankings, and engagement.",
                bg: "bg-orange-100"
              }
            ].map((job, i) => (
              <motion.div
                key={i}
                className={`w-full ${job.bg} rounded-xl shadow p-6 border border-gray-200 text-black`}
                variants={bounceIn}
                custom={i + 1}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="w-10 h-10 object-contain rounded-full"
                  />
                  <h3 className="text-lg font-semibold text-gray-900">{job.company}</h3>
                </div>
                <p className="text-xl text-red-800 mb-4">{job.role}</p>
                <p className="text-sm font-bold text-gray-800 mb-4">{job.dates}</p>
                <p className="text-black">{job.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Skills & Tools */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
      >
        <h3 className="text-2xl font-semibold flex items-center mb-4">
          <span className="mr-2">🛠️</span> Skills & Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-lg">
          <motion.div
            className="text-center sm:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, type: "spring" }}
          >
            <span className="font-bold">Languages</span>
            <ul className="mt-2">
              {skills.languages.map((lang, i) => <li key={i}>• {lang}</li>)}
            </ul>
          </motion.div>
          <motion.div
            className="text-center sm:text-left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, type: "spring" }}
          >
            <span className="font-bold">Frameworks & Libraries</span>
            <ul className="mt-2">
              {skills.frameworks.map((fw, i) => <li key={i}>• {fw}</li>)}
            </ul>
          </motion.div>
          <motion.div
            className="text-center sm:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <span className="font-bold">Tools & Platforms</span>
            <ul className="mt-2">
              {skills.tools.map((tool, i) => <li key={i}>• {tool}</li>)}
            </ul>
          </motion.div>
          <motion.div
            className="text-center sm:text-left"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, type: "spring" }}
          >
            <span className="font-bold">Soft Skills</span>
            <ul className="mt-2">
              {skills.softSkills.map((sk, i) => <li key={i}>• {sk}</li>)}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div
        className="space-y-4 mt-11"
        initial="hidden"
        animate="visible"
        variants={containerStagger}
      >
        <motion.h3
          className="text-2xl font-semibold"
          variants={fadeUp}
          custom={0}
        >
          📜 Certifications
        </motion.h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center border rounded-lg shadow-md p-6 hover:shadow-xl transition bg-orange-100"
              variants={bounceIn}
              custom={index}
              whileHover={{
                scale: 1.08,
                rotate: [0, 2, -2, 2, 0],
                boxShadow: "0 0 16px 0 #fbbf24aa"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={cert.logo} alt={cert.issuer} className="h-16 mb-4 object-contain" />
              <h4 className="text-lg font-bold text-red-800 text-center">{cert.name}</h4>
              <p className="text-sm text-gray-600">{cert.issuer}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
