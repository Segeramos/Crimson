import { services } from "../data";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.93 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      type: "spring",
      stiffness: 180,
    },
  },
};

const Services = () => {
  return (
    <motion.section
      className="min-h-screen bg-gradient-to-r from-black py-16 px-4 sm:px-8 text-orange-100 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-4xl font-extrabold text-center mb-12 tracking-tight drop-shadow"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
      >
        What I Offer
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9"
        variants={containerVariants}
      >
        {services.map((serv, i) => (
          <motion.div
            key={i}
            className="relative rounded-3xl shadow-2xl bg-white/10 backdrop-blur-sm border border-orange-100 flex flex-col items-center px-7 pt-12 pb-8 transition-transform hover:scale-105 hover:shadow-orange-500/40"
            variants={cardVariants}
            whileHover={{ y: -8 }}
          >
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-4 border-orange-100"
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {serv.icon && (
                <span className="text-3xl text-white">{serv.icon}</span>
              )}
            </motion.div>
            <h3 className="text-xl font-bold mt-8 mb-3 text-center">
              {serv.title}
            </h3>
            <p className="text-base text-white/90 text-center">
              {serv.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Services;
