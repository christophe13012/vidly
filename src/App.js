import React, { Component } from "react";
import "./App.css";
import Movies from "./components/movies";
import Pagination from "./components/pagination";
import { getMovies } from "./services/fakeMovieService";
import ListGroup from "./components/listGroup";

class App extends Component {
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
    this.setState({ genreId });
  };
  render() {
    const { movies, itemPerPage, activePage, genreId } = this.state;
    return (
      <div className="App container">
        <div className="row">
          <ListGroup genreId={genreId} onGenre={this.handleGenre} />
          <Movies
            movies={movies}
            itemPerPage={itemPerPage}
            activePage={activePage}
            genreId={genreId}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
          />
        </div>

        <Pagination
          movies={movies}
          itemPerPage={itemPerPage}
          activePage={activePage}
          onPagination={this.handlePagination}
        />
      </div>
    );
  }
}

export default App;
