import { React, useEffect, useState } from "react";
import SearchBar from "./SearchBar";

function App() {
  // const url = "https://api.jikan.moe/v3https://api.jikan.moe/v3"
  const [animeName, setAnimeName] = useState("Fate/Zero");
  const [animes, setAnimes] = useState([]);
  const [numOfAnimeToDisplay, setNumOfAnimeToDisplay] = useState(2);
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
    } else {
      return null;
    }
  };

  const handleOnChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleOnPageNumClick = (page) => {
    console.log(page)
    if(page === "next"){
      setPageNum(pageNum + 1);
      console.log(pageNum);
    }
    else if(page === "previous"){
      setPageNum(pageNum - 1);
      console.log(pageNum);
    }
  };

  return (
    <div className="App">
      <div className="landing-container">
        <div className="navbar">
          <div className="nav-links">
            <a className="nav-link" href="https://www.google.ca/">
              Home
            </a>
            <a className="nav-link" href="https://www.google.ca/">
              Anime
            </a>
            <a className="nav-link" href="https://www.google.ca/">
              Manga
            </a>
          </div>
        </div>
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
            /* .slice(staring index, index+1) */
            .slice(numOfAnimeToDisplay*(pageNum-1), numOfAnimeToDisplay*pageNum)
            .map((anime, index) => {
              const { image_url, title } = anime;
              return (
                <div className="anime" key={index}>
                  <img src={image_url} className="animeImage" alt="anime"></img>
                  <div className="anime-title-background">
                    <p className="anime-title">{title}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No Search Results for"{searchValue}"</div>
          )}
        </div>
        <div className="page-number-container">
          <button className="page-number-btn" onClick={()=>handleOnPageNumClick(next)}>
            next
          </button>
          <button className="page-number-btn" onClick={()=>handleOnPageNumClick(previous)}>previous</button>
        </div>
      </div>
    </div>
  );
}

export default App;
