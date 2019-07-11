import React, { Component } from "react";
import Pagination from "./pagination";
import ListGroup from "./listGroup";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MovieTable from "./movieTable";

class Movies extends Component {
  state = {
    movies: getMovies(),
    itemPerPage: 4,
    activePage: 1,
    genres: [],
    genreId: 0
  };
  componentDidMount() {
    let movies = getMovies();
    let genres = getGenres();
    genres = [{ _id: 0, name: "Tous genres" }, ...genres];
    this.setState({ movies, genres });
  }
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
    const { movies, itemPerPage, activePage, genreId, genres } = this.state;
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
          <ListGroup
            genreId={genreId}
            genres={genres}
            onGenre={this.handleGenre}
          />
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
                <MovieTable
                  items={paginatedMovies}
                  onDelete={this.handleDelete}
                  onLike={this.handleLike}
                />
              </table>
            )}
          </div>
        </div>

        <Pagination
          movies={genredMovies}
          itemPerPage={itemPerPage}
          activePage={activePage}
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
