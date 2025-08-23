import { motion } from "framer-motion";

// 👇 Included right in the file
const services = [
  {
    badge: "WD",
    title: "Web Design",
    description: "Modern, responsive web design services for all platforms.",
  },
  {
    badge: "SEO",
    title: "Web Development",
    description: "Full stack web development with React and Node js.",
  },
  {
    badge: "SEO",
    title: "Graphic Design",
    description: "Professional graphic design for web and print media.",
  },
  {
    badge: "GD",
    title: "Graphic Design",
    description: "Professional graphic design for web and print media.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      type: "spring",
      stiffness: 160,
    },
  },
};

const Services = () => {
  return (
    <motion.section
      className="min-h-screen flex flex-col bg-gradient-to-r from-black text-orange-100 font-['Karla']"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Heading */}
      <motion.h2
        className="text-5xl md:text-3xl font-serif font-bold text-center mb-4 tracking-tight p-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
      >
        My Services
      </motion.h2>

      {/* Subheading */}
      <motion.p
        className="text-center text-orange-100 text-lg max-w-xl mx-auto mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Here are the services I provide to help you succed online.
      </motion.p>

      {/* Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
      >
        {services.map((serv, i) => (
          <motion.div
            key={i}
            className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-6 pt-16 pb-8 transition-transform hover:scale-[1.02] hover:shadow-xl shadow-black/30"
            variants={cardVariants}
            whileHover={{ y: -6 }}
          >
            {/* Badge */}
            <div className="absolute -top-7 left-6 bg-gradient-to-br from-orange-100 to-orange-500 text-black font-semibold text-sm w-12 h-12 rounded-full flex items-center justify-center shadow-md border border-orange-100">
              {serv.badge}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-orange-100 mb-2">{serv.title}</h3>

            {/* Description */}
            <p className="text-orange-100 text-base leading-relaxed">
              {serv.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Services;
