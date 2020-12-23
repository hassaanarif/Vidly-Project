import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    return (
      <ul className="list-group">
        <li
          id="allGenreList"
          className={
            this.props.selectedGenre === "All Genres"
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => this.props.onGenreChange("All Genres")}
          style={{ cursor: "pointer" }}
        >
          All Genres
        </li>
        {this.props.genres.map((index) => (
          <li
            key={index._id}
            className={
              index.name === this.props.selectedGenre
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => this.props.onGenreChange(index.name)}
            style={{ cursor: "pointer" }}
            id="genreList"
          >
            {index.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default ListGroup;
