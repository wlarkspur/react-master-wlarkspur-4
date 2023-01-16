import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSearch, IGetSearch } from "../api";
import styled from "styled-components";
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
  color: white;
`;

const WrapperResult = styled.div`
  display: flex;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  height: 46vh;
  background-color: transparent;
  margin-top: 30vh;
  position: absolute;
  padding: 3px;
  justify-content: space-between;
`;

const Result = styled.div<{ bgphoto: string }>`
  height: 80%;
  width: 60%;
  display: flex;
  flex-direction: column;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  /* background-repeat: no-repeat; */
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<IGetSearch>(
    ["movies", "result"],
    getSearch
  );
  console.log(data);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>is Loading</Loader>
      ) : (
        <>
          <WrapperResult>
            <Result
              bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}
            ></Result>
            <Result
              bgphoto={makeImagePath(data?.results[1].backdrop_path || "")}
            ></Result>
            <Result
              bgphoto={makeImagePath(data?.results[2].backdrop_path || "")}
            ></Result>
            <Result
              bgphoto={makeImagePath(data?.results[7].backdrop_path || "")}
            ></Result>
            <Result
              bgphoto={makeImagePath(data?.results[8].backdrop_path || "")}
            ></Result>
            <Result
              bgphoto={makeImagePath(data?.results[11].backdrop_path || "")}
            ></Result>
          </WrapperResult>
        </>
      )}
    </Wrapper>
  );
}

export default Search;
