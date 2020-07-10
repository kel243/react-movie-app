import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import { Descriptions, Button, Row } from "antd";
import GridCard from "../LandingPage/Sections/GridCard";
import Favorite from "./Section/Favorite";

function MovieDetailPage(props) {
  const [Movie, setMovie] = useState([]);
  const [Cast, setCast] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  const movieId = props.match.params.movieId;

  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
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

      <div style={{ width: "90%", margin: "1rem auto" }}>
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
          <Button onClick={handleClick}>Toggle Actors View</Button>
        </div>
        <br />
        {ActorToggle && (
          <Row gutter={[8, 8]} align="middle">
            {Cast &&
              Cast.map((cast, index) => (
                <React.Fragment key={index}>
                  {cast.profile_path && (
                    <GridCard
                      actor
                      image={`${IMAGE_URL}w500${cast.profile_path}`}
                    />
                  )}
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetailPage;
