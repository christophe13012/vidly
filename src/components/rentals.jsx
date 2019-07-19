import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import { rentals } from "../services/rentService";
import _ from "lodash";

class Rentals extends Component {
  state = {
    movies: [],
    sort: {
      path: "title",
      order: "asc"
    },
    headers: [
      {
        path: "dateOut",
        label: "Date de location",
        type: "date",
        sort: true
      },
      {
        path: "movie.title",
        label: "Titre du film",
        sort: true
      },
      {
        path: "movie.genre.name",
        label: "Genre",
        sort: true
      },
      {
        path: "movie.dailyRentalRate",
        label: "Note",
        sort: true
      },
      {
        path: "user.name",
        label: "Client loueur",
        sort: true
      },
      {
        path: "user.email",
        label: "Mail client",
        sort: true
      }
    ]
  };
  async componentDidMount() {
    const { data } = await rentals();
    this.setState({ movies: data });
  }
  handleSort = path => {
    const sort = { ...this.state.sort };
    if (sort.path !== path) sort.order = "asc";
    else sort.order = sort.order === "asc" ? "desc" : "asc";
    sort.path = path;
    this.setState({ sort });
  };
  render() {
    const sortedMovies = _.orderBy(
      this.state.movies,
      [this.state.sort.path],
      [this.state.sort.order]
    );

    return (
      <div className="p-5">
        <h3 className="mb-4">Films en location</h3>
        <React.Fragment>
          {this.state.movies.length !== 0 && (
            <table className="table">
              <TableHeader
                headers={this.state.headers}
                onSort={this.handleSort}
                sort={this.state.sort}
              />
              <TableBody items={sortedMovies} headers={this.state.headers} />
            </table>
          )}
        </React.Fragment>
      </div>
    );
  }
}

export default Rentals;
