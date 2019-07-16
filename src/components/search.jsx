import React from "react";

const Search = ({ onSearch, value }) => {
  return (
    <input
      onChange={onSearch}
      value={value}
      type="text"
      className="form-control mb-2"
      placeholder="Rechercher un film"
    />
  );
};

export default Search;
