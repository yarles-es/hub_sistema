import { AnimatePresence, motion } from "framer-motion";

import { useCheckAuth } from "@/hooks/useCheckAuth";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useCheckAuth();

  return (
    <AnimatePresence>
      {isAuthenticated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivateRoute;
