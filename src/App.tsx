import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 215, 70);
  flex-direction: column;
`;

const Box = styled(motion.div)`
  width: 100px;
  height: 50px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  position: absolute;
  top: 100px;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const PrevButton = styled.button`
  margin: 0 10px;
`;

const box = {
  entry: (isBack: boolean) => ({
    x: isBack ? -200 : 200,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: (isBack: boolean) => ({
    x: isBack ? 200 : -200,
    opacity: 0,
    scale: 0,
    transition: { duration: 0.3 },
  }),
};

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlease = () => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const prevPlease = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  return (
    <Wrapper>
      <AnimatePresence mode="wait" custom={back}>
        <Box
          custom={back}
          variants={box}
          initial="entry"
          animate="center"
          exit="exit"
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <div style={{ display: "flex" }}>
        <PrevButton onClick={prevPlease}>prev</PrevButton>
        <button onClick={nextPlease}>next</button>
      </div>
    </Wrapper>
  );
}

export default App;
