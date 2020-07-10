import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

function MainImage(props) {
  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0) 41%, rgba(0, 0, 0, 0.65) 100%), url('${props.image}')`,
          height: "600px",
          backgroundSize: "cover",
          width: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            maxWidth: "500px",
            bottom: "2rem",
            marginLeft: "2rem",
          }}
        >
          <Title style={{ color: "white" }} level={2}>
            {props.title}
          </Title>
          <p style={{ color: "white", fontSize: "1rem" }}>{props.text}</p>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
