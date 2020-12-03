/* Clamp */

const Clamp = (v, min, max) => {
  return Math.min(max, Math.max(min, v));
};

export default Clamp;
