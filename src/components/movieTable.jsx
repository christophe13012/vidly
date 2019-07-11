import React, { Component } from "react";
import Like from "./like";

class MovieTable extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        {this.props.movies.length !== 0 && (
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => this.props.onSort("title")}>Titre</th>
                <th onClick={() => this.props.onSort("genre.name")}>Genre</th>
                <th onClick={() => this.props.onSort("numberInStock")}>
                  Stock
                </th>
                <th onClick={() => this.props.onSort("dailyRentalRate")}>
                  Note
                </th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.movies.map(movie => {
                return (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        like={movie.isLiked}
                        onClick={() => this.props.onLike(movie._id)}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => this.props.onDelete(movie._id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </React.Fragment>
    );
  }
}

export default MovieTable;
