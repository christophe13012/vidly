import React from "react";
import Form from "./form";
import Joi from "@hapi/joi";
import { register } from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
      isAdmin: false
    },
    errors: {
      email: "",
      password: "",
      name: ""
    },
    selectItems: [{ _id: true, name: "Oui" }, { _id: false, name: "Non" }]
  };
  formSchema = {
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .min(3)
      .max(50)
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    isAdmin: Joi.boolean().required()
  };
  doSubmit = async () => {
    try {
      const { data: jwt } = await register(this.state.data);
      localStorage.setItem("token", jwt);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div className="p-5">
        <h1 className="mb-4">S'enregistrer</h1>
        <form>
          {this.renderInput("Adresse email", "email", "email")}
          {this.renderInput("Password", "password", "password")}
          {this.renderInput("Name", "text", "name")}
          {this.renderSelect(
            "Administrateur",
            "isAdmin",
            this.state.selectItems
          )}
          {this.renderButton("S'enregistrer")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
