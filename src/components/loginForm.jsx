import React from "react";
import Joi from "@hapi/joi";
import Form from "./form";
import { auth } from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: { email: "", password: "" }
  };
  formSchema = {
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .min(3)
      .max(50)
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
  };
  doSubmit = async () => {
    try {
      const { data: jwt } = await auth(this.state.data);
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
        <h1 className="mb-4">S'identifier</h1>
        <form className="col-lg-8">
          {this.renderInput("Adresse email", "email", "email")}
          {this.renderInput("Mot de passe", "password", "password")}
          {this.renderButton("S'identifier")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
