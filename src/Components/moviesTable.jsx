import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";

class MoviesTable extends Component {
  render() {
    return (
      <table className="table">
        <thead style={{ backgroundColor: "yellowgreen" }}>
          <tr>
            <th className="th" onClick={() => this.props.onSort("title")}>
              Title <i className="fa fa-sort"></i>
            </th>
            <th className="th" onClick={() => this.props.onSort("genre")}>
              Genre <i className="fa fa-sort"></i>
            </th>
            <th
              className="th"
              onClick={() => this.props.onSort("numberInStock")}
            >
              Stock <i className="fa fa-sort"></i>
            </th>
            <th
              className="th"
              onClick={() => this.props.onSort("dailyRentalRate")}
            >
              Rate <i className="fa fa-sort"></i>
            </th>
            <th>Wishlist </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.renderedMovies().map((index) => (
            <tr key={index._id}>
              <td>
                <Link to={`/movies/${index._id}`}>{index.title}</Link>
              </td>
              <td>{index.genre.name}</td>
              <td>{index.numberInStock}</td>
              <td>{index.dailyRentalRate}</td>
              <td>
                <Like
                  liked={index.liked}
                  onLikeToggle={() => this.props.handleLike(index)}
                />
              </td>
              {this.props.user && (
                <td>
                  <button
                    onClick={() => this.props.handleDelete(index)}
                    className="btn btn-danger button-small"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
