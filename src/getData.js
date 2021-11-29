async function fetchData(url, resultType) {
  let result = null;
  try {
    const response = await fetch(url);
    const data = await response.json();
    result = data[resultType];
  } catch (error) {
    console.log("error happened here!");
    console.log(error);
  }
  return result || [];
}
async function fetchAnimeByName(animeName, pageNum) {
  const searchAnimeUrl = `https://api.jikan.moe/v3/search/anime?q="${animeName}&page=${pageNum}`;
  // const searchAnimeUrl = `https://api.jikan.moe/v3/search/anime?q=Fate/Zero&page=1`;
  return await fetchData(searchAnimeUrl, "results");
}

async function fetchAnimeByPopularity(pageNum) {
  const popularAnimeUrl = `https://api.jikan.moe/v3/top/anime/${pageNum}/airing`;
  return await fetchData(popularAnimeUrl, "top");
}

async function fetchAnimebyGenre(genreId, pageNum) {
  const genreUrl =
    "https://api.jikan.moe/v3/genre/anime/" + genreId + "/" + pageNum;
  return await fetchData(genreUrl, "anime");
}

export {
  fetchData,
  fetchAnimeByPopularity,
  fetchAnimeByName,
  fetchAnimebyGenre,
};
