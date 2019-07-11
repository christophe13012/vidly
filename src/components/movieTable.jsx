import React, { Component } from "react";
import Like from "./like";

class MovieTable extends Component {
  state = {};
  render() {
    return (
      <tbody>
        {this.props.items.map(item => {
          return (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.genre.name}</td>
              <td>{item.numberInStock}</td>
              <td>{item.dailyRentalRate}</td>
              <td>
                <Like
                  like={item.isLiked}
                  onClick={() => this.props.onLike(item._id)}
                />
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => this.props.onDelete(item._id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default MovieTable;
