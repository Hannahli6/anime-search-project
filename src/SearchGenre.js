import { React } from "react";
import GenreList from "./GenreList";

const SearchGenre = ({onGenreClick}) => {
  const genresToShow = ["Action", "Comedy", "Drama", "Mystery"];
  return (
    <div>
      <div>
        <h3>Anime Genres</h3>
        <hr></hr>
        <div>
          {genresToShow.map((genre, index) => {
            const genreUrl = "https://api.jikan.moe/v3/genre/anime/" + GenreList[genre];
            return (
              <button key={index} onClick={()=>{onGenreClick(genreUrl, genre)}}>
                {genre}
              </button>
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
