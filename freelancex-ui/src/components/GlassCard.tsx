import { motion } from 'framer-motion';
import type { ReactNode } from 'react'; // <--- ADD 'type' HERE

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export const GlassCard = ({ children, className = "", delay = 0, onClick }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      onClick={onClick}
      className={`glass-panel rounded-xl p-6 transition-all duration-300 hover:bg-white/5 ${className}`}
    >
      {children}
    </motion.div>
  );
};