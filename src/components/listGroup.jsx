import React from "react";

const ListGroup = ({ genres, genreId, onGenre }) => {
  return (
    <ul className="col-3 list-group">
      {genres.map(genre => {
        return (
          <li
            key={genre._id}
            style={{ cursor: "pointer" }}
            className={
              genreId === genre._id
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => onGenre(genre._id)}
          >
            {genre.name}
          </li>
        );
      })}
    </ul>
  );
};

export default ListGroup;
