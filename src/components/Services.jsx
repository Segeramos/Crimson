// src/components/Services.jsx
import { services } from "../data";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.93 },
  visible: i => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      type: "spring",
      stiffness: 180,
    },
  }),
};

const Services = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-black py-16 px-4 sm:px-8 text-orange-100 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.1 }}
    >
      <motion.h2
        className="text-4xl font-extrabold text-center mb-12 tracking-tight text-orange-100 drop-shadow"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
      >
        What I Offer
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
        {services.map((serv, i) => (
          <motion.div
            key={i}
            className="relative rounded-3xl shadow-2xl bg-white/10 backdrop-blur-sm border border-orange-100 flex flex-col items-center px-7 pt-12 pb-8 transition-transform hover:scale-105 hover:shadow-orange-red-800"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -8, boxShadow: "0 8px 36px 0 #fb718555" }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-4 border-orange-100">
              {/* Icon support */}
              {serv.icon && <span className="text-3xl text-white">{serv.icon}</span>}
            </div>
            <h3 className="text-xl font-bold text-orange-100 mt-8 mb-3 text-center">{serv.title}</h3>
            <p className="text-base text-white/90 text-center">{serv.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Services;

