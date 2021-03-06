import React, { Component } from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
  state = {};
  renderPagination() {
    const { movies, itemPerPage, activePage, onPagination } = this.props;
    const pages = Math.ceil(movies.length / itemPerPage);
    let li = [];
    for (let index = 1; index <= pages; index++) {
      li.push(
        <li
          className={activePage === index ? "page-item active" : "page-item"}
          key={index}
        >
          <a className="page-link" href="#" onClick={() => onPagination(index)}>
            {index}
          </a>
        </li>
      );
    }
    return li;
  }
  render() {
    return (
      <nav aria-label="...">
        <ul className="pagination justify-content-center">
          {this.renderPagination()}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemPerPage: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  movies: PropTypes.array.isRequired,
  onPagination: PropTypes.func.isRequired
};
export default Pagination;
