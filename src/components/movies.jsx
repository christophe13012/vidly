import React, { Component } from "react";
import Like from "./like";
import Pagination from "./pagination";
import { getMovies } from "../services/fakeMovieService";
import ListGroup from "./listGroup";

class Movies extends Component {
  state = { movies: getMovies(), itemPerPage: 4, activePage: 1, genreId: 0 };
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
  handlePagination = activePage => {
    this.setState({ activePage });
  };
  handleGenre = genreId => {
    this.setState({ genreId, activePage: 1 });
  };
  render() {
    const {
      movies,
      onDelete,
      onLike,
      itemPerPage,
      activePage,
      genreId
    } = this.state;
    const genredMovies =
      genreId === 0
        ? movies
        : movies.filter(movie => movie.genre._id === genreId);
    const paginatedMovies = genredMovies.slice(
      (activePage - 1) * itemPerPage,
      itemPerPage + (activePage - 1) * itemPerPage
    );
    return (
      <div className="container">
        <div className="row">
          <ListGroup genreId={genreId} onGenre={this.handleGenre} />
          <div className="col-9">
            <header style={styles.header}>
              {genredMovies.length === 0
                ? "Aucun film présent dans la base de donnée"
                : `Voici ${
                    genredMovies.length
                  } films présents dans la base de donnée`}
            </header>
            {genredMovies.length !== 0 && (
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
                  {paginatedMovies.map(movie => {
                    return (
                      <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>
                          <Like
                            like={movie.isLiked}
                            onClick={() => onLike(movie._id)}
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => onDelete(movie._id)}
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
          </div>
        </div>

        <Pagination
          movies={movies}
          itemPerPage={itemPerPage}
          activePage={activePage}
          genreId={genreId}
          onPagination={this.handlePagination}
        />
      </div>
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
