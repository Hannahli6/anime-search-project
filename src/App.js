import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import SearchGenre from "./SearchGenre";
import Card from "./Card";

function App() {
  const [animeName, setAnimeName] = useState("Fate/Zero");
  const [animes, setAnimes] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [genre, setGenre] = useState(null);
  const [currentTypeOfAnime, setCurrentTypeOfAnime] = useState("popularAnime")
  let numOfAnimeToDisplay = 49;

  async function fetchData(typeOfAnime, pageNum) {

    // const searchAnimeUrl = `https://api.jikan.moe/v3/search/anime?q="${animeName}&page="${pageNum}`;
    const searchAnimeUrl = `https://api.jikan.moe/v3/search/anime?q=Fate/Zero&page=1`;
    const popularAnimeUrl = `https://api.jikan.moe/v3/top/anime/${pageNum}/airing`;
    let url = "";
    let resultType = "";

    if (typeOfAnime === "searchAnime") {
      url = searchAnimeUrl;
      resultType="results"
    } else if (typeOfAnime === "popularAnime") {
      url = popularAnimeUrl;
      resultType="top"
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      const results = data[resultType];
      console.log(results);
      setAnimes(results || []);
    } catch (error) {
      console.log(error);
    }
  }

  // fetch data
  useEffect(() => {
    fetchData(currentTypeOfAnime, pageNum);
  }, []);

  // search bar
  const handleOnSearch = (text) => {
    setAnimeName(text);
  };

  const onAnimeClick = (url) => {
    console.log("anime clicked");
    console.log(url);
  };

  const onGenreClick = (genreUrl, genre) => {
    console.log(genreUrl);
    console.log(genre);
    setGenre(genre);
  };

  const onPageClick = (page) => {
    // if current page ex.3 is the same as the last page ex.3 , it will not make a call
    if(pageNum!==page){
      fetchData(currentTypeOfAnime, page);
      setPageNum(page);
    }
    return null;
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
        <SearchBar handleOnSearch={(event) => handleOnSearch(event)} />
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

        {/* separate page number section into its own component */}
        <div className="page-number-container">
          <button
            className="page-number-previous-btn"
            onClick={() => onPageClick(pageNum !== 1 ? pageNum - 1 : 1)}
          >
            previous
          </button>
          <div className="page-number-btns">
            <button className="page-number-btn" onClick={() => onPageClick(1)}>
              1
            </button>
            <button className="page-number-btn" onClick={() => onPageClick(2)}>
              2
            </button>
            <button className="page-number-btn" onClick={() => onPageClick(3)}>
              3
            </button>
          </div>
          <button
            className="page-number-next-btn"
            onClick={() => onPageClick(pageNum !== 3 ? pageNum + 1 : pageNum)}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
