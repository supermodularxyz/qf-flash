import Particles from "react-particles";
import { loadFull } from "tsparticles";

export const Burst = () => (
  <Particles
    id="tsparticles"
    init={loadFull}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }}
    options={{
      fullScreen: false,
      detectRetina: true,
      particles: {
        number: {
          value: 0,
        },

        // stroke: {
        //   color: { value: "#000000" },
        //   width: 1,
        // },
        shape: {
          type: ["circle", "square", "triangle"],
          options: {
            circle: {
              fill: true,
              particles: { color: "#facc15" },
            },
            square: {
              fill: true,
              particles: { color: "#fde047" },
            },
            triangle: {
              fill: true,
              particles: { color: "#eab308" },
            },
            // polygon: [
            //   {
            //     sides: 5,
            //     fill: true,
            //     particles: { color: "#facc15" },
            //   },
            //   {
            //     sides: 6,
            //     fill: true,
            //     particles: { color: "#facc15" },
            //   },
            // ],
          },
        },
        opacity: {
          value: 1,
        },
        rotate: {
          value: { min: 0, max: 360 },
          direction: "random",
          animation: {
            enable: true,
            sync: true,
            speed: { min: 15, max: 30 },
          },
        },
        size: {
          value: { min: 1, max: 10 },
          animation: {
            enable: true,
            speed: { min: 40, max: 80 },
            sync: true,
            startValue: "max",
            destroy: "min",
          },
        },
        move: {
          enable: true,
          speed: { min: 5, max: 10 },
          outModes: "destroy",
        },
      },
      interactivity: {
        events: {
          onDiv: {
            enable: true,
            mode: "push",
            elementId: "send-button",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
        },
      },
    }}
  />
);
