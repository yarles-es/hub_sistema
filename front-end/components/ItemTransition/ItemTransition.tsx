import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ItemTransition: React.FC<Props> = ({ children, className }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className={`${className}`}
  >
    {children}
  </motion.div>
);

export default ItemTransition;
