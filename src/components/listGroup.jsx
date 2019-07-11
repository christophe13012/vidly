import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";

class ListGroup extends Component {
  render() {
    let genres = getGenres();
    genres = [{ _id: 0, name: "Tous genres" }, ...genres];
    return (
      <ul className="col-3 list-group">
        {genres.map(genre => {
          return (
            <li
              key={genre._id}
              style={{ cursor: "pointer" }}
              className={
                this.props.genreId === genre._id
                  ? "list-group-item active"
                  : "list-group-item"
              }
              onClick={() => this.props.onGenre(genre._id)}
            >
              {genre.name}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ListGroup;
