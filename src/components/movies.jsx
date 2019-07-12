import React, { Component } from "react";
import Pagination from "./pagination";
import ListGroup from "./listGroup";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MovieTable from "./movieTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: getMovies(),
    itemPerPage: 4,
    activePage: 1,
    genres: [],
    genreId: 0,
    sort: {
      path: "title",
      order: "asc"
    }
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
  handleSort = path => {
    const sort = { ...this.state.sort };
    if (sort.path !== path) sort.order = "asc";
    else sort.order = sort.order === "asc" ? "desc" : "asc";
    sort.path = path;
    this.setState({ sort });
  };
  render() {
    const {
      movies,
      itemPerPage,
      activePage,
      genreId,
      genres,
      sort
    } = this.state;
    const genredMovies =
      genreId === 0
        ? movies
        : movies.filter(movie => movie.genre._id === genreId);
    const sortedMovies = _.orderBy(
      genredMovies,
      [this.state.sort.path],
      [this.state.sort.order]
    );
    let paginatedMovies = sortedMovies.slice(
      (activePage - 1) * itemPerPage,
      itemPerPage + (activePage - 1) * itemPerPage
    );

    return (
      <div className="container p-5">
        <div className="row">
          <ListGroup
            genreId={genreId}
            genres={genres}
            onGenre={this.handleGenre}
          />
          <div className="col-9">
            <header style={styles.header}>
              {genredMovies.length === 0
                ? "Aucun film présent dans la base de données"
                : `Voici ${
                    genredMovies.length
                  } films présents dans la base de donnée`}
            </header>
            <MovieTable
              movies={paginatedMovies}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
              sort={sort}
            />
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
