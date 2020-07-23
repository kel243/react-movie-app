import React, { useEffect, useState } from "react";
import "./favorite.css";
import Axios from "axios";
import { Popover } from "antd";
import { IMAGE_URL } from "../../Config";

function FavoritePage() {
  const variable = { userFrom: localStorage.getItem("userId") };
  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavoritedMovie();
  }, []);

  const fetchFavoritedMovie = () => {
    Axios.get("/api/favorite/getFavoritedMovie", variable).then((response) => {
      if (response.data.success) {
        setFavorites(response.data.favorites);
      } else {
        alert("Failed to get favorited movies");
      }
    });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId: movieId,
      userFrom: userFrom,
    };

    Axios.post("/api/favorite/removeFromFavorite", variables).then(
      (response) => {
        if (response.data.success) {
          fetchFavoritedMovie();
        } else {
          alert("Failed to Remove From Favorite");
        }
      }
    );
  };

  const renderTableBody = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.movieImage ? (
          <img
            src={`${IMAGE_URL}w500${favorite.movieImage}`}
            alt="Movie Poster"
          />
        ) : (
          "no image"
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>
            <a href={`/movie/${favorite.movieId}`} className="favLinks">
              {favorite.movieTitle}
            </a>
          </td>
        </Popover>

        <td style={{ color: "white" }}>{favorite.movieRunTime} mins</td>
        <td>
          <button
            style={{ color: "white" }}
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            {" "}
            Remove{" "}
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "90%", margin: "3rem auto" }}>
      <h3 style={{ color: "white", fontSize: "25px" }}>My Favorite Movies</h3>
      <hr />
      <table>
        <thead>
          <tr>
            <th style={{ color: "white" }}>Movie Title</th>
            <th style={{ color: "white" }}>Movie Runtime</th>
            <th style={{ color: "white" }}>Remove from favorites</th>
          </tr>
        </thead>
        <tbody>{renderTableBody}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
