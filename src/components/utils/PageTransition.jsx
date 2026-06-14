import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  animate: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0, y: -12, filter: 'blur(4px)',
    transition: { duration: 0.24, ease: [0.45, 0, 0.55, 1] },
  },
}

export default function PageTransition({ children }) {
  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}
