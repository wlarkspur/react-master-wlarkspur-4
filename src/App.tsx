import styled from "styled-components";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled(motion.div)`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 215, 70);
`;

const Svg = styled.svg`
  width: 150px;
  height: 150px;

  path {
    stroke: red;
    stroke-width: 2;
  }
`;

const svg = {
  start: { pathLength: 0, fill: "rgba(255,255,255,0)" },
  end: {
    fill: "rgb(255, 0, 0)",
    pathLength: 1,
    /* transition: { duration: 2.5 }, */
  },
};

function App() {
  return (
    <Wrapper>
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
        <motion.path
          variants={svg}
          initial={"start"}
          animate={"end"}
          transition={{
            default: {
              duration: 3,
            },
            fill: { duration: 1, delay: 3 },
          }}
          d="M153.1 315.8L65.7 512H2l96-209.8c-45.1-22.9-75.2-64.4-75.2-141.1C22.7 53.7 90.8 0 171.7 0H254v512h-55.1V315.8h-45.8zm45.8-269.3h-29.4c-44.4 0-87.4 29.4-87.4 114.6 0 82.3 39.4 108.8 87.4 108.8h29.4V46.5z"
        />
      </Svg>
      {/* <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <motion.path
          variants={svg}
          initial={"start"}
          animate={"end"}
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        />
      </Svg> */}
    </Wrapper>
  );
}

export default App;
