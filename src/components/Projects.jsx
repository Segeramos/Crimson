import { motion } from "framer-motion";

// ✅ Animation Variants
const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 70 },
  visible: i => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.13, type: "spring", stiffness: 280, damping: 18 }
  })
};

// ✅ Main Component
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
      />

      {/* Web Development Projects */}
      <h3 className="text-2xl font-semibold text-center mb-6">Web Development Projects</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
        {webProjects.map((proj, i) => (
          <ProjectCard proj={proj} i={i} key={i} />
        ))}
      </div>

      {/* SEO Services */}
      <h3 className="text-2xl font-semibold text-center mb-6">SEO Services</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
        {seoProjects.map((proj, i) => (
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
    </motion.div>
  );
}

// ✅ Card Component
function ProjectCard({ proj, i }) {
  const Stat = ({ label, value, change, extra }) => (
    <div>
      <p className="text-gray-400">{label}</p>
      <p className="font-bold text-lg">
        {value}{" "}
        <span className={`text-xs ${change?.includes("+") ? "text-green-400" : "text-red-400"}`}>
          {change}
        </span>
      </p>
      {extra && <p className="text-xs text-gray-500">{extra}</p>}
    </div>
  );

  const isSeoProject = seoProjects.some(seo => seo.title === proj.title);

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
        <p className="text-sm text-gray-400 mb-3">{proj.description}</p>

        {/* SEO Stats */}
        {proj.stats && (
          <div className="grid grid-cols-2 gap-4 text-white text-sm mb-4">
            <Stat
              label="Visits"
              value={proj.stats.visits.value}
              change={proj.stats.visits.change}
              extra={`💻 ${proj.stats.visits.devices.desktop} / 📱 ${proj.stats.visits.devices.mobile}`}
            />
            <Stat
              label="Unique Visitors"
              value={proj.stats.uniqueVisitors.value}
              change={proj.stats.uniqueVisitors.change}
            />
            <Stat
              label="Conversion"
              value={proj.stats.conversion.value}
              change={proj.stats.conversion.change}
            />
            <Stat
              label="Pages / Visit"
              value={proj.stats.pagesPerVisit.value}
              change={proj.stats.pagesPerVisit.change}
            />
            <Stat
              label="Avg. Duration"
              value={proj.stats.avgVisitDuration.value}
              change={proj.stats.avgVisitDuration.change}
            />
            <Stat
              label="Bounce Rate"
              value={proj.stats.bounceRate.value}
              change={proj.stats.bounceRate.change}
            />
          </div>
        )}

        {proj.link && (
          <>
            <a
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-block bg-red-800 text-orange-100 font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-center"
            >
              View Website
            </a>

            {/* ✅ Show only on SEO projects */}
            {isSeoProject && (
              <div className="mt-3 flex items-center justify-center space-x-2">
                <img
                  src="/sem.jpg"
                  alt="Semrush Logo"
                  className="h-5"
                />
                <span className="text-xs text-gray-400">Powered by Semrush</span>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

// ✅ Web Projects
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

// ✅ SEO Projects DATA
const seoProjects = [
  {
    title: "Nairobi Camera House Traffic Analytics",
    description: "On-page and off-page SEO optimization for websites.",
    image: "/NCH.png",
    link: "https://nairobicamerahouse.com/",
    siteName: "nairobicamerahouse.co.ke",
    stats: {
      visits: {
        value: "5.5K",
        change: "+95.24%",
        devices: { desktop: "40.37%", mobile: "59.63%" }
      },
      uniqueVisitors: { value: "4.9K", change: "+109.43%" },
      conversion: { value: "1.07%", change: "+100%" },
      pagesPerVisit: { value: "1.7", change: "-27.08%" },
      avgVisitDuration: { value: "05:39", change: "-41.15%" },
      bounceRate: { value: "56.49%", change: "-9.19%" }
    }
  },
{
  title: "Fox Printers",
  description: "SEO traffic report and user engagement metrics for ISK site.",
  image: "/fox.png", // Use your actual image path
  link: "https://foxprinters.com/",
  siteName: "imagesolutions.co.ke",
  stats: {
    visits: {
      value: "455",
      change: "+671.19%",
      devices: { desktop: "100%", mobile: "0%" }
    },
    uniqueVisitors: { value: "343", change: "+481.36%" },
    conversion: { value: "0%", change: "no change" },
    pagesPerVisit: { value: "1.8", change: "+76.7%" },
    avgVisitDuration: { value: "16:51", change: "+100%" },
    bounceRate: { value: "74.29%", change: "-25.71%" }
  }
},
{
  title: "Panda Phones SEO Analytics",
  description: "Website engagement and SEO performance summary for PandaPhones.",
  image: "/panda.png", // Update with actual image path
  link: "https://pandaphones.com/",
  siteName: "pandaphones.com",
  stats: {
    visits: {
      value: "112",
      change: "-79.78%",
      devices: { desktop: "100%", mobile: "0%" }
    },
    uniqueVisitors: { value: "112", change: "-70.76%" },
    conversion: { value: "0%", change: "no change" },
    pagesPerVisit: { value: "4", change: "+130.35%" },
    avgVisitDuration: { value: "07:17", change: "+107.11%" },
    bounceRate: { value: "0%", change: "-100%" }
  }
},
{
  title: "Rondamo Technologies SEO Report",
  description: "Traffic and performance metrics for Rondamo’s main website.",
  image: "/RND.png", // Replace with correct image file path
  link: "https://rondamo.co.ke/",
  siteName: "rondamo.co.ke",
  stats: {
    visits: {
      value: "14.5K",
      change: "-53.57%",
      devices: { desktop: "53.77%", mobile: "46.23%" }
    },
    uniqueVisitors: { value: "12.2K", change: "-49.43%" },
    conversion: { value: "0%", change: "no change" },
    pagesPerVisit: { value: "5.6", change: "+226.2%" },
    avgVisitDuration: { value: "14:51", change: "+128.46%" },
    bounceRate: { value: "72.54%", change: "-9.31%" }
  }
},
{
  title: "Mighty Ape SEO Performance",
  description: "User metrics and site behavior analytics for MightyApe Kenya.",
  image: "/MA.png", // Replace with your actual image path
  link: "https://mightyape.co.ke/",
  siteName: "mightyape.co.ke",
  stats: {
    visits: {
      value: "3.4K",
      change: "-23.72%",
      devices: { desktop: "51.38%", mobile: "48.62%" }
    },
    uniqueVisitors: { value: "2.9K", change: "-25.26%" },
    conversion: { value: "0%", change: "no change" },
    pagesPerVisit: { value: "1.3", change: "-9.6%" },
    avgVisitDuration: { value: "08:22", change: "-15.2%" },
    bounceRate: { value: "90.69%", change: "+8.37%" }
  }
},
{
  title: "Eleven Shops SEO Overview",
  description: "Preliminary SEO stats and traffic snapshot for elevenshops.com.",
  image: "/ES.png", // Replace with the correct image path
  link: "https://www.elevenshops.com/",
  siteName: "elevenshops.com",
  stats: {
    visits: {
      value: "186",
      change: "n/a",
      devices: { desktop: "100%", mobile: "0%" }
    },
    uniqueVisitors: { value: "186", change: "n/a" },
    conversion: { value: "0%", change: "no change" },
    pagesPerVisit: { value: "1", change: "n/a" },
    avgVisitDuration: { value: "00:00", change: "n/a" },
    bounceRate: { value: "100%", change: "n/a" }
  }
},
{
  title: "Nairobi Apple Store SEO Snapshot",
  description: "Semrush-based traffic and engagement overview for Nairobi Apple Store.",
  image: "/NAS.png", // Replace with your actual image path
  link: "https://nairobiapplestore.com/",
  siteName: "nairobiapplestore.com",
  stats: {
    visits: {
      value: "33",
      change: "n/a",
      devices: { desktop: "100%", mobile: "0%" }
    },
    uniqueVisitors: { value: "33", change: "n/a" },
    conversion: { value: "0%", change: "no change" },
    pagesPerVisit: { value: "9", change: "n/a" },
    avgVisitDuration: { value: "02:17", change: "n/a" },
    bounceRate: { value: "0%", change: "n/a" }
  }
},


{
  title: "Frontline Africa SEO Snapshot",
  description: "Traffic and performance overview for Frontline Africa Ltd.",
  image: "/FEA.png", // Update this path to your image file
  link: "https://frontlineafricaltd.com/",
  siteName: "frontlineafricaltd.com",
  stats: {
    visits: {
      value: "0",
      change: "n/a",
      devices: { desktop: "0%", mobile: "0%" }
    },
    uniqueVisitors: { value: "0", change: "n/a" },
    conversion: { value: "0%", change: "no change" },
    pagesPerVisit: { value: "0", change: "n/a" },
    avgVisitDuration: { value: "00:00", change: "n/a" },
    bounceRate: { value: "0%", change: "n/a" }
  }
},
{
  title: "City Laptop Shop SEO Analytics",
  description: "Engagement metrics and traffic insights for laptoppriceinkenya.com.",
  image: "/CITY.png", // Update with the actual image path
  link: "https://laptoppriceinkenya.com/",
  siteName: "laptoppriceinkenya.com",
  stats: {
    visits: {
      value: "37",
      change: "n/a",
      devices: { desktop: "100%", mobile: "0%" }
    },
    uniqueVisitors: { value: "37", change: "n/a" },
    conversion: { value: "0%", change: "no change" },
    pagesPerVisit: { value: "1.7", change: "n/a" },
    avgVisitDuration: { value: "00:00", change: "n/a" },
    bounceRate: { value: "29.73%", change: "n/a" }
  }
}





];

// ✅ Design Projects
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
