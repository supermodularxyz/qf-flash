import Particles from "react-particles";
import { loadFull } from "tsparticles";

export const Leaves = () => (
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
        stroke: {
          width: 3,
          color: { value: ["#22c55e"] },
        },
        move: {
          angle: { value: 0, offset: 0 },
          direction: "bottom-left",
          enable: true,
          outModes: { default: "out" },
          speed: 20,
        },
        number: { value: 80, limit: 300 },
        rotate: {
          value: { min: 0, max: 60 },
          direction: "random",
          move: true,
          animation: {
            enable: true,
            speed: 20,
          },
        },
        tilt: {
          direction: "random",
          enable: true,
          move: true,
          value: {
            min: 0,
            max: 360,
          },
          animation: {
            enable: true,
            speed: 6,
          },
        },
        shape: { type: "line" },
        size: { value: 15 },
        roll: {
          darken: {
            enable: true,
            value: 30,
          },
          enlighten: {
            enable: true,
            value: 30,
          },
          enable: true,
          mode: "both",
          speed: {
            min: 3,
            max: 6,
          },
        },
        wobble: {
          distance: 50,
          enable: true,
          move: true,
          speed: {
            min: -1,
            max: 1,
          },
        },
      },
    }}
  />
);
