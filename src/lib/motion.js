// Shared Framer Motion presets — single source of truth for all pages

export const expo   = [0.22, 1, 0.36, 1]       // Expo-out — snappy deceleration
export const spring = [0.34, 1.56, 0.64, 1]    // Slight overshoot — feels alive
export const smooth = [0.45, 0, 0.55, 1]        // Sine in-out — for exits

export const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.65, ease: expo } },
}

export const fadeDown = {
  hidden:  { opacity: 0, y: -22 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.55, ease: expo } },
}

export const fadeLeft = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.65, ease: expo } },
}

export const fadeRight = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.65, ease: expo } },
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1, scale: 1,
    transition: { type: 'spring', stiffness: 380, damping: 22 },
  },
}

export const popIn = {
  hidden:  { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1, scale: 1,
    transition: { type: 'spring', stiffness: 500, damping: 24 },
  },
}

// stagger(delay?) — returns container variant
export const stagger = (delay = 0.08) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: delay } },
})

// Standard viewport config
export const vp      = { once: true, margin: '-60px' }
export const vpFast  = { once: true, margin: '-20px' }
export const vpLarge = { once: true, margin: '-100px' }
