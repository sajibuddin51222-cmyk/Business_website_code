/**
 * Centralized animation configuration
 * Reduces magic numbers and ensures consistency across components
 */

export const ANIMATION_CONFIG = {
  // Intersection Observer thresholds
  THRESHOLDS: {
    HEADER: 0.2,
    CARDS: 0.1,
    CTA: 0.3,
  },

  // Stagger delays (in seconds)
  STAGGER: {
    BASE: 0.1,
    MEDIUM: 0.15,
    SMALL: 0.05,
  },

  // Animation delays (in seconds)
  DELAYS: {
    HEADER: 0.1,
    BENEFITS_OFFSET: 0.3,
    NONE: 0,
  },
} as const
