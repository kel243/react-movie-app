import React from "react";
import { Col } from "antd";
function GridCard(props) {
  if (props.actor) {
    return (
      <Col lg={4} md={8} xd={16}>
        <div style={{ position: "relative" }}>
          <img style={{ width: "100%" }} alt="Actor" src={props.image}></img>
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={4} md={8} xd={16}>
        <div style={{ position: "relative" }}>
          <a href={`/movie/${props.movieId}`}>
            <img
              style={{ width: "100%" }}
              alt="Movie Poster"
              src={props.image}
            ></img>
          </a>
        </div>
      </Col>
    );
  }
}

export default GridCard;
