"use client";

import { useCallback } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Tracks the pointer across a container and exposes spring-smoothed
 * rotation plus three parallax depth layers, so a scene can be built
 * from planes that travel at different rates and read as real depth.
 *
 * `near` sits closest to the viewer and moves most; `far` barely drifts.
 * Everything is disabled when the user prefers reduced motion.
 */
export function useParallaxTilt({
  maxRotate = 10,
  stiffness = 110,
  damping = 18,
  mass = 0.6,
} = {}) {
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness, damping, mass });
  const sy = useSpring(y, { stiffness, damping, mass });

  const rotateY = useTransform(
    useTransform(sx, [-0.5, 0.5], [-maxRotate, maxRotate]),
    Math.round
  );
  const rotateX = useTransform(
    useTransform(sy, [-0.5, 0.5], [maxRotate, -maxRotate]),
    Math.round
  );

  const nearX = useTransform(useTransform(sx, [-0.5, 0.5], [-20, 20]), Math.round);
  const nearY = useTransform(useTransform(sy, [-0.5, 0.5], [-12, 12]), Math.round);
  const midX = useTransform(useTransform(sx, [-0.5, 0.5], [-16, 16]), Math.round);
  const midY = useTransform(useTransform(sy, [-0.5, 0.5], [-10, 10]), Math.round);
  const farX = useTransform(useTransform(sx, [-0.5, 0.5], [-12, 12]), Math.round);
  const farY = useTransform(useTransform(sy, [-0.5, 0.5], [-7, 7]), Math.round);

  const onPointerMove = useCallback(
    (event) => {
      if (reduced || event.pointerType === "touch") return;
      const rect = event.currentTarget.getBoundingClientRect();
      x.set((event.clientX - rect.left) / rect.width - 0.5);
      y.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [reduced, x, y]
  );

  const onPointerLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return {
    reduced,
    rotateX,
    rotateY,
    layers: {
      near: { x: nearX, y: nearY },
      mid: { x: midX, y: midY },
      far: { x: farX, y: farY },
    },
    handlers: { onPointerMove, onPointerLeave },
  };
}