import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({ handleOnSearch }) => {
  const [text, setText] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    if (text.trim() === "") return

    handleOnSearch(text)
  }

  return (
    <div className="search-container">
      <form
        className="search-bar"
        onSubmit={onSubmit}
      >
        <input
          className="search-input"
          onChange={(event) => setText(event.target.value)}
          placeholder="Search Anime"
        ></input>
        {text}
        <button
          className="search-btn"
          type="submit"
          form="search"
          onClick={onSubmit}
        >
          <AiOutlineSearch className="search-icon" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
