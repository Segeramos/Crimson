import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 70 },
  visible: i => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.13, type: "spring", stiffness: 280, damping: 18 }
  })
};

export default function Projects() {
  return (
    <motion.div
      className="min-h-screen flex flex-col bg-gradient-to-r from-black text-orange-100 font-['Karla']"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-center mb-10 tracking-tight text-orange-100"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
      >
       
      </motion.h2>

      {/* Web Development Projects */}
      <h3 className="text-2xl font-semibold text-center mb-6">Web Development Projects</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
        {webProjects.map((proj, i) => (
          <ProjectCard proj={proj} i={i} key={i} />
        ))}
      </div>

      {/* Graphic Design Projects */}

        <h3 className="text-2xl font-semibold text-center mb-6">Graphic Design Projects</h3>
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {designProjects.map((proj, i) => (
            <div
              key={i}
              className="w-100 h-100 rounded-xl overflow-hidden bg-black flex items-center justify-center border border-white/10 shadow-xl"
            >
              <img
                src={proj.image}
                alt={proj.title}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>


      {/* SEO Services */}
      <h3 className="text-2xl font-semibold text-center mb-6">SEO Services</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
        {seoProjects.map((proj, i) => (
          <ProjectCard proj={proj} i={i} key={i} />
        ))}
      </div>
    </motion.div>
  );
}

// Reusable card component
function ProjectCard({ proj, i }) {
  return (
    <motion.div
      className="rounded-2xl bg-white/5 shadow-xl flex flex-col overflow-hidden border border-white/10 transition-all duration-300"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={i}
      whileHover={{
        scale: 1.045,
        boxShadow: "0 8px 40px 0 #ea580c22",
        transition: { type: "spring", stiffness: 340, damping: 15 }
      }}
    >
      <div className="h-52 bg-black flex items-center justify-center overflow-hidden">
        <motion.img
          src={proj.image}
          alt={proj.title}
          className="object-cover h-full w-full transition-transform duration-300"
          whileHover={{ scale: 1.07 }}
        />
      </div>
      <div className="flex flex-col flex-1 px-6 py-5">
        <h3 className="text-xl font-bold text-orange-100 mb-2">{proj.title}</h3>
       
        {proj.link && (
          <a
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-block bg-red-800 text-orange-100 font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-center"
          >
            View Project
          </a>
        )}
      </div>
    </motion.div>
  );
}

// 👇 Web Development Projects
const webProjects = [
{
    title: "Portfolio Website",
    description: "A personal portfolio to showcase my work and skills.",
    image: "/portfolio.png",
    link: "https://segeraportfolio.vercel.app/"
  },
  {
    title: "Digital Marketing Agency",
    description: ".",
    image: "/Bookie.png",
    link: "https://d-m-agency.vercel.app/"
  },
  {
    title: "Recipe Finder",
    description: "A blogging platform with Markdown support and user authentication.",
    image: "/Savor.png",
    link: "https://segeramos-savorsphere.web.val.run/"
  },
  {
    title: "Music App",
    description: "A productivity app to manage daily tasks and track progress.",
    image: "/Musicapp.png",
    link: "https://segeramos-musicwebsiteapp.web.val.run/"
  },
  {
    title: "Portfolio",
    description: "A weather forecasting app using OpenWeatherMap API.",
    image: "/Portfolio2.png",
    link: "https://example.com/weather"
  },
  {
    title: "Chat Application",
    description: "A real-time chat app built with Socket.io.",
    image: "/Soon.png",
    link: "./"
  },
  {
    title: "Mercedez Benz Website",
    description: "A real-time chat app built with Socket.io.",
    image: "/Soon.png",
    link: "./"
  },
  {
    title: "Library Website",
    description: "A real-time chat app built with Socket.io.",
    image: "/Soon.png",
    link: "./"
  },
  {
    title: "E-Commerce Website",
    description: "A real-time chat app built with Socket.io.",
    image: "/Soon.png",
    link: "./"
  }
];

// 👇 Graphic Design Projects
const designProjects = [
  {
    title: "Portfolio Graphic",
    description: "A graphic design showcase for portfolio branding.",
    image: "/Soon.png",
    link: "./"
  },
  {
    title: "Portfolio Graphic",
    description: "A graphic design showcase for portfolio branding.",
    image: "/Soon.png",
    link: "./"
  },
  {
    title: "Portfolio Graphic",
    description: "A graphic design showcase for portfolio branding.",
    image: "/Soon.png",
    link: "./"
  },
  {
    title: "Portfolio Graphic",
    description: "A graphic design showcase for portfolio branding.",
    image: "/Soon.png",
    link: "./"
  },
  {
    title: "Portfolio Graphic",
    description: "A graphic design showcase for portfolio branding.",
    image: "/Soon.png",
    link: "./"
  },
  {
    title: "Portfolio Graphic",
    description: "A graphic design showcase for portfolio branding.",
    image: "/Soon.png",
    link: "./"
  },
  {
    title: "Brand Logo Design",
    description: "Custom logo design for branding purposes.",
    image: "/Soon.png",
    link: "./"
  }
];

// 👇 SEO Services
const seoProjects = [
  {
    title: "SEO Optimization",
    description: "On-page and off-page SEO optimization for websites.",
    image: "/Soon.png",
    link: "./"
  },
  {
    title: "Content Strategy",
    description: "SEO content planning and strategy.",
    image: "/Soon.png",
    link: "./"
  }
];
