"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * The 3D primitive the whole site shares.
 *
 * A perspective wrapper holds a motion layer that rotates toward the pointer.
 * Children sit in a `preserve-3d` context, so anything with a `translateZ`
 * utility floats above the card face. Framer owns every transform on the
 * rotating layer — never put a CSS transform utility or keyframe animation
 * on it, or the two will overwrite each other.
 *
 * Falls back to a plain, static container under `prefers-reduced-motion`.
 */
export default function TiltCard({
  as = "div",
  max = 8,
  lift = 6,
  glare = true,
  perspective = 1100,
  className = "",
  wrapperClassName = "",
  style,
  children,
  ...rest
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 150, damping: 20, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 150, damping: 20, mass: 0.5 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);

  /* Specular highlight tracks the pointer so the surface reads as glass. */
  const glareX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);

  const onPointerMove = (event) => {
    if (reduced || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  if (reduced) {
    const Tag = as;
    return (
      <div className={wrapperClassName}>
        <Tag className={className} style={style} {...rest}>
          {children}
        </Tag>
      </div>
    );
  }

  return (
    <div
      className={wrapperClassName}
      style={{ perspective: `${perspective}px` }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      <MotionTag
        /* Caller styles are merged, never spread after — a caller passing
           `style` used to overwrite the rotation and silently kill the tilt. */
        style={{ ...style, rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -lift }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className={`relative ${className}`}
        {...rest}
      >
        {children}
        {glare && (
          <motion.span
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.30), transparent 55%)",
              "--gx": glareX,
              "--gy": glareY,
            }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </MotionTag>
    </div>
  );
}
