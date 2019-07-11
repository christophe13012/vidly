import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./like";

class Movies extends Component {
  state = { movies: getMovies() };
  handleDelete = id => {
    const movies = this.state.movies.filter(m => m._id !== id);
    this.setState({ movies });
  };
  handleLike = id => {
    const movies = [...this.state.movies];
    const index = movies.findIndex(m => m._id === id);
    movies[index].isLiked = !movies[index].isLiked;
    this.setState({ movies });
  };
  render() {
    return (
      <React.Fragment>
        <header style={styles.header}>
          {this.state.movies.length === 0
            ? "Aucun film présent dans la base de donnée"
            : `Voici ${
                this.state.movies.length
              } films présents dans la base de donnée`}
        </header>
        {this.state.movies.length !== 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Note</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map(movie => {
                return (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        like={movie.isLiked}
                        onClick={() => this.handleLike(movie._id)}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => this.handleDelete(movie._id)}
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

const styles = {
  header: {
    marginBottom: 20,
    fontWeight: "500"
  }
};

export default Movies;
