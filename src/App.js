import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import SearchGenre from "./SearchGenre";
import Card from "./Card";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import {
  fetchAnimeByPopularity,
  fetchAnimeByName,
  fetchAnimebyGenre,
} from "./getData";

const SEARCH_TYPES = {
  popularity: "popularity",
  name: "name",
  genre: "genre",
};
function App() {
  const [searchType, setSearchType] = useState(SEARCH_TYPES.popularity);
  const [animeName, setAnimeName] = useState("Fate/Zero");
  const [animes, setAnimes] = useState([]);
  const [genreId, setGenreId] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  let numOfAnimeToDisplay = 49;

  // initial fetch
  useEffect(() => {
    const initialFetch = async () =>
      setAnimes(await fetchAnimeByPopularity(pageNum));
    initialFetch();
  }, []);

  // search bar
  const handleOnSearch = async (text) => {
    setPageNum(1);
    setAnimeName(text);
    setAnimes(await fetchAnimeByName(text, pageNum));
    setSearchType(SEARCH_TYPES.genre);
  };

  const onAnimeClick = (url) => {
    console.log("anime clicked");
    console.log(url);
  };

  const onGenreClick = async (genreId) => {
    setPageNum(1);
    setGenreId(genreId);
    setAnimes(await fetchAnimebyGenre(genreId, pageNum));
    setSearchType(SEARCH_TYPES.genre);
  };

  const onPageClick = async (page) => {
    if (pageNum === page) {
      return null;
    }
    let animes = [];
    switch (searchType) {
      case SEARCH_TYPES.popularity:
        animes = await fetchAnimeByPopularity(page);
        break;
      case SEARCH_TYPES.name:
        animes = await fetchAnimeByName(animeName, page);
        break;
      case SEARCH_TYPES.genre:
        animes = await fetchAnimebyGenre(genreId, page);
        break;
    }
    setAnimes(animes);
    setPageNum(page);
  };

  return (
    <div className="App">
      <div className="landing-container">
        <Navbar />
        <div className="landing-banner">
          <div className="landing-text-container">
            <h1>AniManga</h1>
            <h4>Find your favorite Anime & Manga now!</h4>
            <Button variant="outlined">Outlined</Button>
          </div>
        </div>
      </div>
      <div className="animeSearch">
        <SearchBar handleOnSearch={(text) => handleOnSearch(text)} />
        <SearchGenre onGenreClick={onGenreClick} />
        <div className="animeList">
          {animes.length > 0 ? (
            animes.slice(0, numOfAnimeToDisplay).map((anime, index) => {
              const { image_url, title, url } = anime;
              return (
                <Card
                  key={index}
                  image_url={image_url}
                  title={title}
                  url={url}
                  onAnimeClick={onAnimeClick}
                />
              );
            })
          ) : (
            <div>No Search Results for "{animeName}"</div>
          )}
        </div>

        <div className="page-number-container" >
          <Pagination count={5} 
          page={pageNum} 
          color	= {'primary'}
          onChange={(event, value)=>{ onPageClick(value)}} />
        </div>
      </div>
    </div>
  );
}

export default App;
