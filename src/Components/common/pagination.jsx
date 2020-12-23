/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
  pagesCount = () => {
    let pageCount = Math.ceil(this.props.itemsCount / this.props.pageSize);
    let array = [];
    if (pageCount === 1) return array;
    for (let i = 1; i <= pageCount; i++) {
      array.push(i);
    }
    return array;
  };

  render() {
    return (
      <nav>
        <ul className="pagination">
          {this.pagesCount().map((index) => (
            <li
              key={index}
              className={
                index === this.props.currentPage
                  ? "page-item active"
                  : "page-item"
              }
            >
              <a
                className="page-link"
                onClick={() => this.props.onPageChange(index)}
                style={{ cursor: "pointer" }}
              >
                {index}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
