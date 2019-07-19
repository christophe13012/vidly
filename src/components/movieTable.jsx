import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Like from "./like";
import { Link } from "react-router-dom";

class MovieTable extends Component {
  state = {
    headers: [
      {
        path: "title",
        label: "Titre",
        sort: true,
        content: item => <Link to={"/movies/" + item._id}>{item.title}</Link>
      },
      {
        path: "genre.name",
        label: "Genre",
        sort: true
      },
      {
        path: "numberInStock",
        label: "Stock",
        sort: true
      },
      {
        path: "dailyRentalRate",
        label: "Note",
        sort: true
      },
      {
        path: "like",
        sort: false,
        content: item =>
          this.props.user ? (
            <Like
              like={item.isLiked}
              onClick={() => this.props.onLike(item._id)}
            />
          ) : null
      },
      {
        path: "louer",
        sort: false,
        content: item =>
          this.props.user ? (
            <button
              type="button"
              className="btn btn-success"
              onClick={() => this.props.onRent(item._id)}
              disabled={item.numberInStock < 1 ? true : false}
            >
              Louer
            </button>
          ) : null
      },
      {
        path: "supprimer",
        sort: false,
        content: item =>
          this.props.user ? (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => this.props.onDelete(item._id)}
              disabled={this.props.user.isAdmin ? false : true}
            >
              Supprimer (Admin)
            </button>
          ) : null
      }
    ]
  };
  render() {
    console.log(this.props.user);

    return (
      <React.Fragment>
        {this.props.movies.length !== 0 && (
          <table className="table">
            <TableHeader
              headers={this.state.headers}
              onSort={this.props.onSort}
              sort={this.props.sort}
            />
            <TableBody
              items={this.props.movies}
              headers={this.state.headers}
              onLike={this.props.onLike}
              onDelete={this.props.onDelete}
            />
          </table>
        )}
      </React.Fragment>
    );
  }
}

export default MovieTable;
