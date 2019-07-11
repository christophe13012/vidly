import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";

class ListGroup extends Component {
  state = {};
  render() {
    return (
      <ul className="col-3 list-group">
        <li className="list-group-item">Cras justo odio</li>
      </ul>
    );
  }
}

export default ListGroup;
