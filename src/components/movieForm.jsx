import React from "react";
import Joi from "@hapi/joi";
import Form from "./form";
import { getGenres } from "../services/genreService";
import { saveMovie, getMovie } from "../services/movieService";
import { toast } from "react-toastify";

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
    selectItems: []
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
  async componentDidMount() {
    const { data: selectItems } = await getGenres();
    const data = { ...this.state.data };
    data.genreId = selectItems[0]._id;
    this.setState({
      selectItems,
      data
    });
    if (this.props.match.params.id === "new") return;
    try {
      const { data: movie } = await getMovie(this.props.match.params.id);
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
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/notfound");
    }
  }
  doSubmit = async () => {
    const movie = { ...this.state.data };
    movie.title = movie.title.charAt(0).toUpperCase() + movie.title.slice(1);
    try {
      await saveMovie(movie);
      this.props.history.push("/movies");
    } catch (ex) {
      if (ex.reponse && ex.response.status === 404)
        toast.error("Un erreur est arrivée");
    }
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
