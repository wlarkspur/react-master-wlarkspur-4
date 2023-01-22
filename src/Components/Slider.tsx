import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getMovies, IGetMoviesResult } from "../api";
import { useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils";

const TitleSlider = styled.h2`
  font-size: 2rem;
  color: white;
  margin-bottom: 10px;
`;

const SliderComponent = styled.div`
  position: relative;
  top: -15rem;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  align-items: center;
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 28px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  cursor: pointer;
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 15px;
  }
`;

const rowVariants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? window.outerWidth : -window.outerWidth,
  }),
  visible: {
    x: 0,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -window.outerWidth : window.outerWidth,
  }),
};
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: { delay: 0.25, duration: 0.3, type: "tween" },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.25, duration: 0.3, type: "tween" },
  },
};

const SvgLeftStyle = styled.div`
  width: 60px;
  height: 60px;
  background: transparent;
  position: absolute;
  fill: rgba(250, 250, 250, 0.5);
  &:hover {
    scale: 1.1;
  }
  z-index: 1;
  top: 100px;
`;
const SvgRightStyle = styled.div`
  width: 60px;
  height: 60px;
  background: transparent;
  position: absolute;
  fill: rgba(250, 250, 250, 0.5);
  &:hover {
    scale: 1.1;
  }
  z-index: 1;
  top: 100px;
  right: 0;
`;

const offset = 6;

function Slider() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const navigate = useNavigate();
  const [direction, setDirection] = useState(0);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const changeIndex = (increase: boolean) => {
    if (data) {
      if (leaving) return;
      setDirection(increase ? 1 : -1);
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) =>
        increase
          ? prev === maxIndex
            ? 0
            : prev + 1
          : prev === 0
          ? maxIndex
          : prev - 1
      );
    }
  };

  return (
    <SliderComponent>
      <TitleSlider>Now Playing</TitleSlider>
      <SvgLeftStyle onClick={() => changeIndex(false)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256S114.6 512 256 512s256-114.6 256-256zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
        </svg>
      </SvgLeftStyle>
      <SvgRightStyle onClick={() => changeIndex(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M0 256C0 397.4 114.6 512 256 512s256-114.6 256-256S397.4 0 256 0S0 114.6 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
        </svg>
      </SvgRightStyle>
      <AnimatePresence
        custom={direction}
        initial={false}
        onExitComplete={toggleLeaving}
      >
        <Row
          custom={direction}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {data?.results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie) => (
              <Box
                layoutId={movie.id + ""}
                key={movie.id}
                whileHover="hover"
                initial="normal"
                variants={boxVariants}
                onClick={() => onBoxClicked(movie.id)}
                transition={{ type: "tween" }}
                bgphoto={makeImagePath(movie.poster_path, "w500")}
              >
                <Info variants={infoVariants}>
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
    </SliderComponent>
  );
}

export default Slider;
