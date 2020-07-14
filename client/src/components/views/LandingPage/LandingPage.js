import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import { Typography } from "antd";
import MainImage from "./Sections/MainImage";
import GridCard from "./Sections/GridCard";
import "../SearchPage/SearchPage.css";

const { Title } = Typography;
function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (path) => {
    fetch(path)
      .then((response) => response.json())
      .then((response) => {
        setMovies([...Movies, ...response.results]);
        setCurrentPage(response.page);
      });
  };

  const handleClick = () => {
    let endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  return (
    <div style={{ width: "100%", margin: 0 }}>
      {Movies[0] && (
        <MainImage
          image={`${IMAGE_URL}w1280${Movies[0].backdrop_path}`}
          title={Movies[0].original_title}
          text={Movies[0].overview}
        />
      )}

      <div style={{ width: "90%", margin: "1rem auto" }}>
        <Title level={2}>Popular Movies</Title>
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
              }
            })}
        </div>

        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="btn" onClick={handleClick}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
