import React from "react";
import Joi from "@hapi/joi";
import Form from "./form";
import Select from "./select";
import { getGenres } from "../services/fakeGenreService";

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
    const selectItems = getGenres();
    const data = { ...this.state.data };
    data.genreId = selectItems[0]._id;
    this.setState({
      selectItems,
      data
    });
  }
  render() {
    console.log(this.state.data);

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
