import { motion, useReducedMotion } from "framer-motion";

// 👇 Services data with project links
const services = [
  {
    badge: "WD",
    title: "Web Design",
    description:
      "Custom, responsive website designs that blend creativity with functionality. Optimized for mobile, tablet, and desktop to ensure seamless user experiences.",
    link: "/projects/web-design",
  },
  {
    badge: "DEV",
    title: "Web Development",
    description:
      "Front end web development using modern technologies such as React,Javascript,tailwind css, and Node.js. From landing pages to complex applications, built for speed and scalability.",
    link: "/projects/web-development",
  },
  {
    badge: "SEO",
    title: "Search Engine Optimization",
    description:
      "Data-driven SEO strategies to improve rankings, boost organic traffic, and enhance online visibility. Includes keyword research, on-page SEO, and technical optimization.",
    link: "/projects/seo",
  },
  {
    badge: "GD",
    title: "Graphic Design",
    description:
      "Creative graphic design services for branding, digital ads, and print media. Professional visuals that communicate your message and build strong brand identity.",
    link: "/projects/graphic-design",
  },
];

const makeVariants = (reduce) => {
  if (reduce) {
    return {
      page: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } },
      container: { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } },
      heading: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } },
      text: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } },
      card: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } },
      cta: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } },
    };
  }

  return {
    page: {
      hidden: { opacity: 0, scale: 0.98, filter: "blur(4px)" },
      visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.35, ease: "easeOut" } },
    },
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } },
    heading: {
      hidden: { opacity: 0, y: -16 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
    },
    text: {
      hidden: { opacity: 0, y: -8 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    },
    card: {
      hidden: { opacity: 0, y: 20, scale: 0.985 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.35, type: "spring", stiffness: 420, damping: 26, mass: 0.8 },
      },
    },
    cta: {
      hidden: { opacity: 0, y: 6 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
    },
  };
};

const Services = () => {
  const reduce = useReducedMotion();
  const { page, container, heading, text, card, cta } = makeVariants(reduce);

  return (
    <motion.section
      className="min-h-screen flex flex-col bg-gradient-to-r from-black text-orange-100 font-['Karla']"
      variants={page}
      initial="hidden"
      animate="visible" // animate immediately on mount
    >
      {/* Wrapper for max width & tighter padding */}
      <motion.div
        className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Heading */}
        <motion.h2
          className="text-2xl md:text-2xl font-serif font-bold text-center mb-3 tracking-tight"
          variants={heading}
        >
          My Services
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-center text-orange-100/90 text-lg max-w-2xl mx-auto mb-12"
          variants={text}
        >
          Here are the services I provide to help you succeed online.
        </motion.p>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={container}
        >
          {services.map((serv, i) => (
            <motion.div
              key={i}
              className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-6 pt-16 pb-8 transition-transform hover:scale-[1.02] hover:shadow-xl shadow-black/30 will-change-transform"
              variants={card}
              whileHover={!reduce ? { y: -6 } : undefined}
            >
              {/* Badge */}
              <div className="absolute -top-7 left-6 bg-gradient-to-br from-orange-100 to-orange-500 text-black font-semibold text-sm w-14 h-14 rounded-full flex items-center justify-center shadow-md border border-orange-100">
                {serv.badge}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-orange-100 mb-2">{serv.title}</h3>

              {/* Description */}
              <p className="text-orange-100/90 text-base leading-relaxed mb-4">{serv.description}</p>

              {/* CTA Button */}
              <motion.a
                href={serv.link}
                variants={cta}
                whileHover={!reduce ? { scale: 1.04 } : undefined}
                whileTap={!reduce ? { scale: 0.98 } : undefined}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-orange-100 to-orange-500 text-black px-4 py-2.5 font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-red-500/40 transition"
                aria-label={`View projects for ${serv.title}`}
              >
                View Projects
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Services;
