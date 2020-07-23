import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import { Descriptions } from "antd";
import GridCard from "../LandingPage/Sections/GridCard";
import Favorite from "./Section/Favorite";
import "../SearchPage/SearchPage.css";

function MovieDetailPage(props) {
  const [Movie, setMovie] = useState([]);
  const [Cast, setCast] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  const movieId = props.match.params.movieId;

  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);

        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
          .then((response) => response.json())
          .then((response) => {
            setCast(response.cast);
          });
      });
  }, [movieId]);

  const handleClick = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {Movie && (
        <MainImage
          image={`${IMAGE_URL}w1280${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      )}

      <div
        style={{
          width: "100%",
          margin: "0 auto",
          padding: "2rem 3rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite
            userFrom={localStorage.getItem("userId")}
            movieId={movieId}
            movieInfo={Movie}
          />
        </div>
        <Descriptions title="Movie Info" bordered>
          <Descriptions.Item label="Title">
            {Movie.original_title}
          </Descriptions.Item>
          <Descriptions.Item label="Release Date">
            {Movie.release_date}
          </Descriptions.Item>
          <Descriptions.Item label="Revenue">{Movie.revenue}</Descriptions.Item>
          <Descriptions.Item label="Runtime">{Movie.runtime}</Descriptions.Item>
          <Descriptions.Item label="Average Rating">
            {Movie.vote_average}
          </Descriptions.Item>
          <Descriptions.Item label="Ratings Count">
            {Movie.vote_count}
          </Descriptions.Item>
          <Descriptions.Item label="Status">{Movie.status}</Descriptions.Item>
          <Descriptions.Item label="Popularity">
            {Movie.popularity}
          </Descriptions.Item>
        </Descriptions>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="btn" onClick={handleClick}>
            Toggle Actors View
          </button>
        </div>
        <br />
        {ActorToggle && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gridGap: "10px",
              gridAutoRows: "auto",
              width: "100%",
              justifyItems: "center",
            }}
          >
            {Cast &&
              Cast.map((cast, index) => (
                <React.Fragment key={index}>
                  {cast.profile_path && (
                    <GridCard
                      actor
                      image={`${IMAGE_URL}w500${cast.profile_path}`}
                      name={cast.name}
                    />
                  )}
                </React.Fragment>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetailPage;
