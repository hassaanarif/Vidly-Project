import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { saveMovie, getMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class newMovie extends Form {
  state = {
    data: {
      title: "",
      numberInStock: "",
      dailyRentalRate: "",
      genreId: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    genreId: Joi.string().required(),
    dailyRentalRate: Joi.number().min(0).max(10).required(),
  };

  componentDidMount = async () => {
    const { data: genres } = await getGenres();
    this.setState({ genres });

    try {
      let movieId = this.props.match.params.id;
      if (movieId === "new") return;
      let { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToviewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      } else {
        alert("Unexpected error occured");
      }
    }
  };
  mapToviewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      numberInStock: movie.numberInStock,
      genreId: movie.genre._id,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  onSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.formInput("title", "Title", "text")}
          {this.formSelect("genreId", "Genre", this.state)}
          {this.formInput("numberInStock", "Number in Stock", "text")}
          {this.formInput("dailyRentalRate", "Rate", "text")}
          {this.rendorButton("Save")}
        </form>
      </div>
    );
  }
}

export default newMovie;
