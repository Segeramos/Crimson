import { motion, useReducedMotion } from "framer-motion";

// 👇 Services data with project links
const services = [
  {
    badge: "WD",
    title: "Web Design",
    description: (
      <>
        <p>
          Custom, responsive website designs that blend creativity with
          functionality. I focus on clean UI/UX and accessibility for all
          devices.
        </p>
        <ul className="list-disc list-inside mt-2 text-sm text-orange-100/80 space-y-1">
          <li>Crafted modern UI layouts in Figma</li>
          <li>Responsive design for mobile-first performance</li>
          <li>Optimized load speed & navigation flow</li>
        </ul>
      </>
    ),
    link: "/projects/web-design",
  },
  {
    badge: "DEV",
    title: "Web Development",
    description: (
      <>
        <p>
          Building fast, scalable web applications using modern technologies like
          React, JavaScript, Tailwind CSS, and Node.js.
        </p>
        <ul className="list-disc list-inside mt-2 text-sm text-orange-100/80 space-y-1">
          <li>Developed e-commerce platforms with secure checkout</li>
          <li>Integrated APIs for payments & data fetching</li>
          <li>Followed clean, maintainable code practices</li>
        </ul>
      </>
    ),
    link: "/projects/web-development",
  },
  {
    badge: "SEO",
    title: "Search Engine Optimization",
    description: (
      <>
        <p>
          Comprehensive SEO strategies to improve search rankings, increase
          organic traffic, and maximize online visibility across different
          industries.
        </p>
        <ul className="list-disc list-inside mt-2 text-sm text-orange-100/80 space-y-1">
          <li>Keyword research & competitor analysis</li>
          <li>On-page SEO (titles, meta tags, internal linking, content)</li>
          <li>Technical SEO (site speed, crawlability, indexing, schema)</li>
          <li>Off-page SEO (backlinks, outreach & citations)</li>
          <li>Local SEO (Google Business Profile, maps, NAP consistency)</li>
          <li>Content strategy & optimization for rankings</li>
          <li>
            Analytics & reporting using GA4, Search Console & SEMrush
          </li>
        </ul>
      </>
    ),
    link: "/projects/seo",
  },
  {
    badge: "GD",
    title: "Graphic Design",
    description: (
      <>
        <p>
          Creative design services for branding, digital ads, and print media.
          Delivering visuals that communicate and convert.
        </p>
        <ul className="list-disc list-inside mt-2 text-sm text-orange-100/80 space-y-1">
          <li>Designed social media campaigns</li>
          <li>Created branding assets & logos</li>
          <li>Developed marketing materials (flyers, posters, banners)</li>
        </ul>
      </>
    ),
    link: "/projects/graphic-design",
  },
];

const makeVariants = (reduce) => {
  if (reduce) {
    return {
      page: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      },
      container: {
        hidden: {},
        visible: { transition: { staggerChildren: 0.05 } },
      },
      heading: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      },
      text: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      },
      card: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      },
      cta: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      },
    };
  }

  return {
    page: {
      hidden: { opacity: 0, scale: 0.98, filter: "blur(4px)" },
      visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.35, ease: "easeOut" },
      },
    },
    container: {
      hidden: {},
      visible: { transition: { staggerChildren: 0.08 } },
    },
    heading: {
      hidden: { opacity: 0, y: -16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: "easeOut" },
      },
    },
    text: {
      hidden: { opacity: 0, y: -8 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" },
      },
    },
    card: {
      hidden: { opacity: 0, y: 20, scale: 0.985 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.35,
          type: "spring",
          stiffness: 420,
          damping: 26,
          mass: 0.8,
        },
      },
    },
    cta: {
      hidden: { opacity: 0, y: 6 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.25, ease: "easeOut" },
      },
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
      animate="visible"
    >
      {/* Wrapper */}
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
              <h3 className="text-xl font-semibold text-orange-100 mb-2">
                {serv.title}
              </h3>

              {/* Description */}
              <div className="text-orange-100/90 text-base leading-relaxed mb-4">
                {serv.description}
              </div>

              {/* CTA Button */}
              {/* <motion.a
                href={serv.link}
                variants={cta}
                whileHover={!reduce ? { scale: 1.04 } : undefined}
                whileTap={!reduce ? { scale: 0.98 } : undefined}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-orange-100 to-orange-500 text-black px-4 py-2.5 font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-red-500/40 transition"
                aria-label={`View projects for ${serv.title}`}
              >
                View Projects
              </motion.a> */}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Services;
