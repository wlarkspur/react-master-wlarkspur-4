import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useFormState } from "react-hook-form";
import { Navigate, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, getPopular, IGetMoviesResult } from "../api";
import Slider from "../Components/Slider";
import useWindowDimensions from "../Components/useWindowDimension";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background: black;
  height: 200vh;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
`;

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 1.1rem;
  width: 50%;
`;

const width = useWindowDimensions;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 80%;
`;
const BigTitle = styled.div`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 1.5rem;
  position: relative;
  top: -15%;
`;

const BigOverview = styled.div`
  padding: 20px;
  top: -80px;
  font-size: 0.9rem;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
`;

function Home() {
  const width = useWindowDimensions();
  const { data: nowPlaying, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const bigMovieMatch = useMatch("/movies/:movieId");
  /* console.log(bigMovieMatch); */
  const { scrollY } = useScroll();

  const { data: popularData } = useQuery<IGetMoviesResult>(
    ["movies", "popular"],
    getPopular
  );

  const navigate = useNavigate();
  const onOverlayClick = () => navigate("/");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    nowPlaying?.results.find(
      (movie) => movie.id + "" === bigMovieMatch.params.movieId
    );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(nowPlaying?.results[1].backdrop_path || "")}
          >
            <Title>{nowPlaying?.results[1].title}</Title>
            <Overview>{nowPlaying?.results[1].overview}</Overview>
          </Banner>
          <Slider></Slider>

          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent),url(${makeImagePath(
                            clickedMovie.poster_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>
                        {
                          (clickedMovie.overview =
                            clickedMovie.overview.length > 200
                              ? clickedMovie.overview.slice(0, 200) + "..."
                              : clickedMovie.overview)
                        }
                      </BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
