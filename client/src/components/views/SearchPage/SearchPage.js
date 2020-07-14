import React, { useState, useEffect } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import GridCard from "../LandingPage/Sections/GridCard";
import { Typography } from "antd";
import "./SearchPage.css";

const { Title } = Typography;

function SearchPage() {
  const [Movies, setMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(0);
  let query = "";

  if (window.location.search) {
    query = new URLSearchParams(window.location.search).get("query").toString();

    query = query.replace(" ", "%20");
  }

  useEffect(() => {
    const endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`;
    if (query) fetchMovies(endpoint);
  });

  const fetchMovies = (path) => {
    fetch(path)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results);
        setMovies([...Movies, ...response.results]);
        setCurrentPage(response.page);
      });
  };

  const handleClick = () => {
    let endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  return (
    <div style={{ width: "90%", margin: "1rem auto" }}>
      <form style={{ textAlign: "center" }}>
        <input
          type="text"
          name="query"
          placeholder="Search Movie Titles"
          style={{
            width: "90vw",
            maxWidth: "800px",
            height: "50px",
            fontSize: "25px",
            display: "block",
            margin: "20px auto",
            padding: "3px 5px",
            boxShadow: "none",
            border: "1px solid grey",
            borderRadius: "3px",
          }}
        ></input>
        <button className="btn" type="submit">
          Search
        </button>
      </form>
      <Title level={2}>Results</Title>
      <hr></hr>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gridGap: "10px",
          gridRowGap: "20px",
          gridAutoRows: "auto",
          width: "100%",
          justifyItems: "center",
          marginTop: "20px",
        }}
      >
        {Movies &&
          Movies.map((movie, index) => {
            if (movie.poster_path) {
              return (
                <React.Fragment key={index}>
                  <GridCard
                    image={`${IMAGE_URL}w500${movie.poster_path}`}
                    movieId={movie.id}
                  />
                </React.Fragment>
              );
            } else {
              return "";
            }
          })}
      </div>

      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="btn"
          onClick={handleClick}
          disabled={Movies.length < 1}
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default SearchPage;
