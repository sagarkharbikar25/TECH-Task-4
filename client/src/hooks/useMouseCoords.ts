import { useEffect, useRef } from "react";

export function useMouseCoords() {
  const coords = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      coords.current = [
        (clientX / innerWidth) * 2 - 1,
        -(clientY / innerHeight) * 2 + 1,
      ];
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return coords;
}
