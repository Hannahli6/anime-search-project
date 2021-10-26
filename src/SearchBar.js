import { React } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({ handleOnSearch, searchValue, handleOnChange }) => {
  return (
    <div className="search-container">
      <form
        className="search-bar"
        onSubmit={(event) => {
          handleOnSearch(event, searchValue);
        }}
      >
        <input
          className="search-input"
          onChange={handleOnChange}
          placeholder="Search Anime"
        ></input>
        <button
          className="search-btn"
          type="submit"
          form="search"
          onClick={(event) => {
            handleOnSearch(event, searchValue);
          }}
        >
          <AiOutlineSearch className="search-icon" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
