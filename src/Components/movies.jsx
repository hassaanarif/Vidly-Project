import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 5,
    currentPage: 1,
    queryString: "",
    selectedGenre: "All Genres",
    sortColumn: { path: "", order: "" },
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async (argument) => {
    const originalMovies = this.state.movies;
    let movies = originalMovies.filter((index) => index._id !== argument._id);
    this.setState({ movies });

    try {
      await deleteMovie(argument._id);
    } catch (error) {
      if (error.response && error.response.status === 404) alert("Error 404");
      else {
        alert("Unexpected error occured");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (argument) => {
    let arrayClone = [...this.state.movies];
    let index = arrayClone.indexOf(argument);
    arrayClone[index] = { ...argument };
    arrayClone[index].liked = !arrayClone[index].liked;
    this.setState({ movies: arrayClone });
  };

  handlePageChange = (argument) => {
    this.setState({ currentPage: argument });
  };

  filteredMovies = () => {
    if (this.state.selectedGenre === "All Genres") {
      return this.state.movies;
    } else {
      return this.state.movies.filter(
        (index) => index.genre.name === this.state.selectedGenre
      );
    }
  };

  handleSort = (argument) => {
    if (argument === this.state.sortColumn.path) {
      this.state.sortColumn.order === "ascending"
        ? this.setState({
            sortColumn: { path: argument, order: "descending" },
            currentPage: 1,
          })
        : this.setState({
            sortColumn: { path: argument, order: "ascending" },
            currentPage: 1,
          });
    } else {
      this.setState({
        sortColumn: { path: argument, order: "ascending" },
        currentPage: 1,
      });
    }
  };

  sortedMovies = () => {
    let array;
    this.state.queryString === ""
      ? (array = this.filteredMovies())
      : (array = this.searchMovie());
    if (this.state.sortColumn.order === "descending") {
      if (this.state.sortColumn.path === "genre") {
        array.sort((a, b) =>
          a[this.state.sortColumn.path].name <
          b[this.state.sortColumn.path].name
            ? 1
            : -1
        );
      } else {
        array.sort((a, b) =>
          a[this.state.sortColumn.path] < b[this.state.sortColumn.path] ? 1 : -1
        );
      }

      return array;
    } else if (this.state.sortColumn.order === "ascending") {
      if (this.state.sortColumn.path === "genre") {
        array.sort((a, b) =>
          a[this.state.sortColumn.path].name >
          b[this.state.sortColumn.path].name
            ? 1
            : -1
        );
      } else {
        array.sort((a, b) =>
          a[this.state.sortColumn.path] > b[this.state.sortColumn.path] ? 1 : -1
        );
      }
      return array;
    }
    return array;
  };

  renderedMovies = () => {
    let startIndex = (this.state.currentPage - 1) * this.state.pageSize;
    let result = this.sortedMovies().slice(startIndex);
    let renderedArray = result.slice(0, this.state.pageSize);
    return renderedArray;
  };

  handleGenreChange = (argument) => {
    this.setState({
      selectedGenre: argument,
      currentPage: 1,
      queryString: "",
    });
  };

  handleSearch = (e) => {
    if (this.state.queryString === "") {
      this.setState({
        queryString: e.currentTarget.value,
        currentPage: 1,
        selectedGenre: "",
      });
    } else {
      this.setState({
        queryString: e.currentTarget.value,
        currentPage: 1,
        selectedGenre: "All Genres",
      });
    }
  };

  searchMovie = () => {
    let currentQuery = new RegExp(this.state.queryString, "gi");
    let searchResult = this.state.movies.filter(
      (index) => !index.title.search(currentQuery)
    );
    return searchResult;
  };

  render() {
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            genres={this.state.genres}
            selectedGenre={this.state.selectedGenre}
            onGenreChange={this.handleGenreChange}
          />
        </div>

        <div className="col">
          {this.props.user && (
            <Link
              className="btn btn-primary mb-2"
              to="/movies/new"
              role="button"
            >
              Add Movie
            </Link>
          )}

          <p>Showing {this.sortedMovies().length} movies in the database</p>

          <input
            type="search"
            className="form-control my-4"
            placeholder="Search Movie"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            onChange={this.handleSearch}
            value={this.state.queryString}
          />

          <MoviesTable
            renderedMovies={this.renderedMovies}
            handleLike={this.handleLike}
            handleDelete={this.handleDelete}
            onSort={this.handleSort}
            user={this.props.user}
          ></MoviesTable>
          <Pagination
            itemsCount={this.filteredMovies().length}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
