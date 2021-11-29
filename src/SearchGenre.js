import { React } from "react";
import GenreList from "./GenreList";
import Button from "@mui/material/Button";

const SearchGenre = ({ onGenreClick }) => {
  const genresToShow = [
    "Action",
    "Comedy",
    "Drama",
    "Mystery",
    "Romance",
    "School",
    "Shoujo",
  ];
  return (
    <div>
      <div>
        <h3>Anime Genres</h3>
        <hr></hr>
        <div>
          {genresToShow.map((genre, index) => {
            const genreId = GenreList[genre];
            return (
              <Button
                variant="outlined"
                size="medium"
                key={index}
                onClick={() => {
                  onGenreClick(genreId, genre);
                }}
              >
                {genre}
              </Button>
            );
          })}
        </div>
      </div>
      <div>
        <h3>Search Results</h3>
        <hr></hr>
      </div>
    </div>
  );
};
export default SearchGenre;
