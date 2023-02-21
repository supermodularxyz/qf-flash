import { useMemo } from "react";
import Particles from "react-particles";

import { loadFull } from "tsparticles";

export const Burst = ({ isIdle = false }) => {
  const options = useMemo(() => createOptions(isIdle), [isIdle]);
  return (
    <Particles
      id="tsparticles"
      init={loadFull}
      style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
      // eslint-disable-next-line
      options={options as any}
    />
  );
};

function createOptions(isIdle: boolean) {
  return {
    fullScreen: false,
    detectRetina: true,
    particles: {
      number: { value: 0 },
      shape: {
        type: ["circle", "square", "triangle"],
        options: {
          circle: {
            fill: true,
            particles: { color: { value: "#facc15" } },
          },
          square: {
            fill: true,
            particles: { color: { value: "#fde047" } },
          },
          triangle: {
            fill: true,
            particles: { color: { value: "#eab308" } },
          },
        },
      },
      size: {
        value: { min: 1, max: 10 },
        animation: {
          enable: true,
          speed: isIdle ? { min: 10, max: 80 } : { min: 40, max: 120 },
          sync: true,
          startValue: "max",
          destroy: "min",
        },
      },
      move: {
        enable: true,
        speed: isIdle ? { min: 2, max: 4 } : { min: 5, max: 10 },
        outModes: "destroy",
        gravity: {
          enable: true,
          inverse: true,
          acceleration: 4,
        },
      },
    },
    emitters: isIdle
      ? {
          position: { x: 50, y: 50 },
          rate: { delay: 0.2, count: 1 },
          life: { delay: 1, count: 10 },
        }
      : null,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
      },
      modes: { push: { quantity: 15 } },
    },
  };
}
