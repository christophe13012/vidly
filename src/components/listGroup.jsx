import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    return (
      <ul className="col-3 list-group">
        {this.props.genres.map(genre => {
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
