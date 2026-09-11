/**
 * Single source of truth for the scroll-driven hero timeline.
 * All values are normalised scroll progress (0 = top of the hero, 1 = end).
 */
export const animationTimeline = {
  sitting: [0, 0.06],
  standing: [0.06, 0.2],
  walk1: [0.2, 0.38],
  walk2: [0.38, 0.54],
  walk1Return: [0.54, 0.7],
  walk3: [0.7, 0.96],
  exit: [0.96, 1],
} as const;

/** Crossfade keyframes for each pose: [progress stops], [opacity stops]. */
export const poseFades = {
  sitting: {
    input: [0, 0.06, 0.2],
    output: [1, 1, 0],
  },
  standing: {
    input: [0.06, 0.12, 0.2, 0.28],
    output: [0, 1, 1, 0],
  },
  walk1: {
    input: [0.2, 0.28, 0.38, 0.46, 0.54, 0.62, 0.7, 0.78],
    output: [0, 1, 1, 0, 0, 1, 1, 0],
  },
  walk2: {
    input: [0.38, 0.46, 0.54, 0.62],
    output: [0, 1, 1, 0],
  },
  walk3: {
    input: [0.7, 0.78, 0.96, 1],
    output: [0, 1, 1, 0],
  },
};

/** Horizontal walk path of the character stage, in viewport-width units. */
export const characterPath = {
  input: [0, 0.06, 0.2, 0.38, 0.54, 0.7, 0.96, 1],
  x: [0, 0, 2, 14, 30, 48, 78, 94],
  y: [0, 0, -2, -2.5, -2, -2.5, -1.5, -1],
  scale: [1, 1, 1.04, 1.08, 1.09, 1.1, 1.12, 1.12],
  opacity: [1, 1, 1, 1, 1, 1, 1, 0],
};

/** Depth-based parallax: translateY in percent of the scene height. */
export const parallax = {
  background: [0, -3],
  workspace: [0, 4],
  chair: [0, 4],
  foreground: [0, 11],
  text: [0, -8],
} as const;
