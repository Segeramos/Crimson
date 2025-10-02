import { about, skills } from "../data";
import { FaGoogle, FaLaptopCode } from "react-icons/fa";
import { motion } from "framer-motion";

// Certification data with new photo property
const certifications = [
  {
    name: 'Front-End Web Development',
    issuer: 'ALX',
    link: 'https://savanna.alxafrica.com/certificates/CE8B5fFhN7',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuu4n2VgSLyv70udhzHGObeyK8CrxZi9YBNQ&s',
    photo: 'FE.png'
  },
  {
    name: 'Professional Foundations',
    issuer: 'ALX',
    link: 'https://savanna.alxafrica.com/certificates/9e2BSs5Zhc',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuu4n2VgSLyv70udhzHGObeyK8CrxZi9YBNQ&s',
    photo: '/PF1.png'
  },
  {
    name: 'Graphic Design',
    issuer: 'ALX',
    link: 'https://www.freecodecamp.org/certification/yourusername/responsive-web-design',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuu4n2VgSLyv70udhzHGObeyK8CrxZi9YBNQ&s',
    photo: '/.png'
  },
  {
    name: 'ALX AI Starter Kit',
    issuer: 'ALX',
    link: 'https://savanna.alxafrica.com/certificates/cny5pJFxzr',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuu4n2VgSLyv70udhzHGObeyK8CrxZi9YBNQ&s',
    photo: '/AI.png'
  },
  {
    name: 'Digital Marketing',
    issuer: 'Udemy',
    link: '',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAGllHM_06tkceB-8rg2x8PV1yK52frVK0CQ&s',
    photo: '/DM.jpg'
  },
   {
    name: 'Professional Foundations 2',
    issuer: 'ALX',
    link: '',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuu4n2VgSLyv70udhzHGObeyK8CrxZi9YBNQ&s',
    photo: '/PF2.png'
  },
  {
    name: 'Diploma in Cascading Style Sheets using HTML',
    issuer: 'Alison',
    link: 'https://alison.com/',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhxRVQiSshFrxBadKsEOw6-cMeG22azmZm_oSOp2PM3I8zVg_bV5CuY_d6N74jRaperlE&usqp=CAU',
    photo: '/certificates/css-html.jpg'
  },
    {
    name: 'Diploma in Cascading Style Sheets using HTML',
    issuer: 'Alison',
    link: 'https://alison.com/',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhxRVQiSshFrxBadKsEOw6-cMeG22azmZm_oSOp2PM3I8zVg_bV5CuY_d6N74jRaperlE&usqp=CAU',
    photo: '/certificates/css-html.jpg'
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
          <div className="w-full flex justify-center">
            <motion.h3
              className="text-2xl font-semibold text-orange-100 flex items-center gap-2"
              variants={fadeUp}
              custom={0}
            >
              💼 Work Background
            </motion.h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center py-8">
            {[{
              company: "Rondamo Technologies",
              logo: "/RT.png",
              role: "Digital Marketing (SEO)",
              dates: "May 2023 - May 2024",
              description: "I worked on SEO-driven digital marketing, boosting traffic, rankings, and brand visibility online.",
              bg: "bg-orange-100"
            }, {
              company: "Rondamo Technologies",
              logo: "/RT.png",
              role: "Sales and Marketing",
              dates: "June 2024 to December 2024",
              description: "Led Sales & Marketing efforts, driving revenue growth through strategy, outreach, and market research.",
              bg: "bg-orange-200"
            }, {
              company: "Mighty Ape Technologies",
              logo: "/MAT.png",
              role: "Digital Marketing (SEO)",
              dates: "January 2025 to date",
              description: "I managed SEO strategies to increase website traffic, search rankings, and engagement.",
              bg: "bg-orange-100"
            }].map((job, i) => (
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
                    className="w-10 h-10 object-contain"
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
      <motion.section
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
      >
        <h3 className="text-3xl font-bold flex justify-center items-center mb-8">
          <span className="mr-3 text-4xl">🛠️</span> My Skills & Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-left">
          {[{
            label: "Languages", data: skills.languages, icon: "💻"
          }, {
            label: "Frameworks & Libraries", data: skills.frameworks, icon: "📚"
          }, {
            label: "Tools & Platforms", data: skills.tools, icon: "⚙️"
          }, {
            label: "Soft Skills", data: skills.softSkills, icon: "🤝"
          }].map((category, index) => (
            <motion.div
              key={category.label}
              className="bg-white/5 rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.15, type: "spring" }}
            >
              <h4 className="flex items-center text-lg font-semibold mb-3">
                <span className="mr-2">{category.icon}</span> {category.label}
              </h4>
              <ul className="space-y-1">
                {category.data.map((item, i) => (
                  <li key={i} className="hover:text-red-400 transition duration-200 pointer-cu">
                    • {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Certifications */}
      <motion.div
        className="space-y-6 mt-11 text-center"
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
              className="relative flex flex-col items-center border rounded-lg shadow-md p-4 sm:p-6 hover:shadow-xl transition bg-orange-100"
              variants={bounceIn}
              custom={index}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 18px 0 #fbbf24aa"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Logo at top-left corner */}
              <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded shadow flex items-center justify-center overflow-hidden">
                <img
                  src={cert.logo}
                  alt={`${cert.issuer} logo`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Main photo */}
              <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                <img
                  src={cert.photo || cert.logo}
                  alt={cert.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Certificate info */}
              <h4 className="text-lg font-bold text-red-800 text-center mb-1">{cert.name}</h4>
              <p className="text-sm text-gray-600">{cert.issuer}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
