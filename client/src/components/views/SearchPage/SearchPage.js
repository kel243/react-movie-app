import React, { useState, useEffect } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import GridCard from "../LandingPage/Sections/GridCard";
import "./SearchPage.css";

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
  }, []);

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
    <div
      style={{
        width: "90%",
        margin: "0 auto",
        padding: "3rem 0",
        backgroundColor: "#141526",
      }}
    >
      <form style={{ textAlign: "center" }}>
        <input
          type="text"
          name="query"
          className="search-input"
          placeholder="Search Movie Titles"
        ></input>
        <button className="btn" type="submit">
          Search
        </button>
      </form>
      <h2 className="search-header">Results</h2>
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
