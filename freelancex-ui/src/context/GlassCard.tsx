import { motion } from 'framer-motion';
import type { ReactNode } from 'react'; // <--- ADD 'type' HERE

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void; // Added back from previous context if needed
}

export const GlassCard = ({ children, className = "", delay = 0 }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`glass-panel rounded-xl p-6 hover:bg-white/5 transition-colors ${className}`}
    >
      {children}
    </motion.div>
  );
};