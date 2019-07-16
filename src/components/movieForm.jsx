import React from "react";
import Joi from "@hapi/joi";
import Form from "./form";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie, getMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    selectItems: getGenres()
  };
  formSchema = {
    _id: Joi.string(),
    title: Joi.string()
      .min(3)
      .max(50)
      .required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
  };
  componentDidMount() {
    console.log(this.props);

    const selectItems = getGenres();
    const movie = getMovie(this.props.match.params.id);
    if (movie) {
      const populatedMovie = {
        _id: movie._id,
        title: movie.title,
        genreId: movie.genre._id,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate
      };
      this.setState({
        selectItems,
        data: populatedMovie
      });
    } else if (this.props.match.params.id === "new") {
      const data = { ...this.state.data };
      data.genreId = selectItems[0]._id;
      this.setState({
        selectItems,
        data
      });
    } else this.props.history.replace("/notFound");
  }
  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.goBack();
  };
  render() {
    return (
      <div className="p-5">
        <h1 className="mb-4">Formulaire de film</h1>
        <form>
          {this.renderInput("Titre", "text", "title")}
          {this.renderSelect("Genre", "genreId", this.state.selectItems)}
          {this.renderInput("Nombre en stock", "number", "numberInStock")}
          {this.renderInput("Note", "number", "dailyRentalRate")}
          {this.renderButton("Enregistrer")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
