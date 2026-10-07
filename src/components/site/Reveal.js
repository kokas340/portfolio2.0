import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Fades content up once as it scrolls into view. Renders a plain element when
// the visitor prefers reduced motion.
export default function Reveal({ as = "div", delay = 0, children, ...rest }) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Plain = as;
    return <Plain {...rest}>{children}</Plain>;
  }
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
