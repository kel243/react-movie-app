import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../../SearchPage/SearchPage.css";

function Favorite(props) {
  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  const variable = {
    userForm: props.userFrom,
    movieId: props.movieId,
    movieTitle: props.movieInfo.original_title,
    movieImage: props.movieInfo.backdrop_path,
    movieRunTime: props.movieInfo.runtime,
  };

  useEffect(() => {
    Axios.post("/api/favorite/favoriteNumber", variable).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert("Failed to get favoriteNumber");
      }
    });

    Axios.post("/api/favorite/favorited", variable).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("Failed to get favorite info");
      }
    });
  }, [variable]);

  const onClickFavorite = () => {
    if (Favorited) {
      Axios.post("/api/favorite/removeFromFavorite", variable).then(
        (response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert("Failed to remove from Favorites!");
          }
        }
      );
    } else {
      Axios.post("/api/favorite/addToFavorite", variable).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Failed to add to Favorites!");
        }
      });
    }
  };

  return (
    <div>
      <button className="btn" onClick={onClickFavorite}>
        {Favorited ? "Remove from Favorite" : "Add to Favorite"}{" "}
        {FavoriteNumber}
      </button>
    </div>
  );
}

export default Favorite;
