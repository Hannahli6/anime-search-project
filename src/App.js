import { React, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import Card from "./Card";

function App() {
  // const url = "https://api.jikan.moe/v3https://api.jikan.moe/v3"
  const [animeName, setAnimeName] = useState("Fate/Zero");
  const [animes, setAnimes] = useState([]);
  const [numOfAnimeToDisplay, setNumOfAnimeToDisplay] = useState(8);
  const [pageNum, setPageNum] = useState(1);
  const url = `https://api.jikan.moe/v3/search/anime?q="${animeName}&page=1`;
  const [searchValue, setSearchValue] = useState("");
  let next = "next";
  let previous = "previous";
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;
        setAnimes(results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [animeName]);

  const handleOnSearch = (event) => {
    event.preventDefault();
    if (searchValue !== "") {
      setAnimeName(searchValue);
      setPageNum(1);
    } else {
      return null;
    }
  };

  const handleOnChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleOnPageNumClick = (page) => {
    const numOfGroups = Math.ceil(animes.length / numOfAnimeToDisplay);
    console.log(numOfGroups);
    if (page === "next")
      if (numOfGroups <= pageNum) {
        console.log("last page");
        return null;
      } else {
        setPageNum(pageNum + 1);
      }
    else if (page === "previous" && pageNum !== 1) {
      setPageNum(pageNum - 1);
    }
  };

  return (
    <div className="App">
      <div className="landing-container">
        <Navbar />
        <div className="landing-banner">
          <div className="landing-text-container">
            <h1>AniManga</h1>
            <h4>Find your favorite Anime & Manga now!</h4>
          </div>
        </div>
      </div>
      <div className="animeSearch">
        <SearchBar
          handleOnSearch={(event) => handleOnSearch(event)}
          searchValue={searchValue}
          handleOnChange={handleOnChange}
        />
        <div className="animeList">
          {animes !== undefined && animes.length > 0 ? (
            animes
              .slice(
                numOfAnimeToDisplay * (pageNum - 1),
                numOfAnimeToDisplay * pageNum
              )
              .map((anime, index) => {
                const { image_url, title } = anime;
                return <Card key={index} image_url={image_url} title={title} />;
              })
          ) : (
            <div>No Search Results for"{searchValue}"</div>
          )}
        </div>
        <div className="page-number-container">
          <button
            className="page-number-btn"
            onClick={() => handleOnPageNumClick(previous)}
          >
            previous
          </button>
          <button
            className="page-number-btn"
            onClick={() => handleOnPageNumClick(next)}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
