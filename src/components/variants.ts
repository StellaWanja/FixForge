// properties for animation of light / dark button
export const animationProperties = {
  light: {
    circle: {
      r: 9,
      
    },
    mask: {
      cx: "50%",
      cy: "23%",
    },
    svg: {
      transform: "rotate(40deg)",
    },
    lines: {
      opacity: 0,
    },
  },
  dark: {
    circle: {
      r: 5,
    },
    mask: {
      cx: "100%",
      cy: "0%",
    },
    svg: {
      transform: "rotate(90deg)",
    },
    lines: {
      opacity: 1,
    },
  },
};
