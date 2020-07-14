import React from "react";
import "./GridCard.css";

function GridCard(props) {
  if (props.actor) {
    return (
      <div style={{ width: "90vw", maxWidth: "300px" }}>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "auto" }}
            alt="Actor"
            src={props.image}
          ></img>
          <p style={{ color: "black", fontSize: "1.1rem" }}>{props.name}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ width: "90vw", maxWidth: "300px" }}>
        <div className="posters">
          <a href={`/movie/${props.movieId}`}>
            <img
              style={{ width: "100%", height: "auto" }}
              alt="Movie Poster"
              src={props.image}
            ></img>
          </a>
        </div>
      </div>
    );
  }
}

export default GridCard;
