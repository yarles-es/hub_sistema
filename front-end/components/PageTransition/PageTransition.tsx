import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

const PageTransition: React.FC<Props> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, translateY: -10 }}
    animate={{ opacity: 1, translateY: 0 }}
    exit={{ opacity: 0, translateY: 10 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
