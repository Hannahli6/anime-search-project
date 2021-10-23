import { React, useEffect, useState } from "react";
import SearchBar from "./SearchBar";

function App() {
  // const url = "https://api.jikan.moe/v3https://api.jikan.moe/v3"
  const [animeName, setAnimeName] = useState("Fate/Zero");
  const [animes, setAnimes] = useState([]);
  const [numOfAnimeToDisplay, setNumOfAnimeToDisplay] = useState(10);
  const url = `https://api.jikan.moe/v3/search/anime?q="${animeName}&page=1`;
  const [searchValue, setSearchValue] = useState("");

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
    if(searchValue!==""){
      setAnimeName(searchValue);
    }
    else{
      return null
    }
  };

  const handleOnChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="App">
      <div className="animeSearch">
        <SearchBar
          handleOnSearch={(event) => handleOnSearch(event)}
          searchValue={searchValue}
          handleOnChange={handleOnChange}
        />
        <div className="animeList">
          { animes!==undefined && animes.length > 0 ? animes
            .filter((element, index) => index < numOfAnimeToDisplay)
            .map((anime, index) => {
              const { score, image_url, title } = anime;
              return (
                <div className="anime" key={index}>
                  <img src={image_url} className="animeImage"></img>
                  <div className="animeDesc">
                    <p className="title">{title}</p>
                    <p className="rating">{score}</p>
                  </div>
                </div>
              );
            }): (
              <div>No Search Results for"{searchValue}"</div>
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
