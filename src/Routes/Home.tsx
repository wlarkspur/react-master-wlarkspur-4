import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { useFormState } from "react-hook-form";
import { Navigate, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getUpcoming,
  getMovies,
  getPopular,
  IGetMoviesResult,
  getDetails,
  IGetDetails,
} from "../api";
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
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
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

const SliderArea = styled.div`
  display: flex;
  flex-direction: column;
`;

function Home() {
  const width = useWindowDimensions();
  const { data: nowPlaying, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const { data: popular } = useQuery<IGetMoviesResult>(
    ["movies2", "popular"],
    getPopular
  );
  const { data: upcoming } = useQuery<IGetMoviesResult>(
    ["movies3", "lastest"],
    getUpcoming
  );

  //console.log(nowPlaying);
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

          <SliderArea>
            <Slider
              data={nowPlaying as IGetMoviesResult}
              title={"Now Playing"}
              row={"row1"}
              media={"movies"}
            />

            <Slider
              data={popular as IGetMoviesResult}
              title={"Popular"}
              row={"row2"}
              media={"movies"}
            />
            <Slider
              data={upcoming as IGetMoviesResult}
              title={"Upcoming"}
              row={"row3"}
              media={"movies"}
            />
          </SliderArea>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
