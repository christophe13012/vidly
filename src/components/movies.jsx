import React, { Component } from "react";
import Pagination from "./pagination";
import ListGroup from "./listGroup";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { Link } from "react-router-dom";
import MovieTable from "./movieTable";
import _ from "lodash";
import Search from "./search";

class Movies extends Component {
  state = {
    movies: [],
    itemPerPage: 4,
    activePage: 1,
    genres: [],
    genreId: 0,
    sort: {
      path: "title",
      order: "asc"
    },
    search: ""
  };
  componentDidMount() {
    let movies = getMovies();
    let genres = getGenres();
    genres = [{ _id: 0, name: "Tous genres" }, ...genres];
    this.setState({ movies, genres });
  }
  handleDelete = id => {
    deleteMovie(id);
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
    this.setState({ genreId, activePage: 1, search: "" });
  };
  handleSort = path => {
    const sort = { ...this.state.sort };
    if (sort.path !== path) sort.order = "asc";
    else sort.order = sort.order === "asc" ? "desc" : "asc";
    sort.path = path;
    this.setState({ sort });
  };
  handleSearch = e => {
    this.setState({ search: e.target.value, activePage: 1 });
  };
  render() {
    const {
      movies,
      itemPerPage,
      activePage,
      genreId,
      genres,
      sort,
      search
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
    const searchedMovies = sortedMovies.filter(
      movie => movie.title.toLowerCase().indexOf(this.state.search) === 0
    );
    let paginatedMovies = searchedMovies.slice(
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
            <Link to="/movies/new" className="btn btn-primary mb-2">
              Nouveau film
            </Link>
            <header style={styles.header}>
              {genredMovies.length === 0
                ? "Aucun film présent dans la base de données"
                : `Voici ${
                    genredMovies.length
                  } films présents dans la base de donnée`}
            </header>
            <Search onSearch={this.handleSearch} value={search} />
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
          movies={searchedMovies}
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
    marginBottom: 10,
    fontWeight: "500"
  }
};

export default Movies;
