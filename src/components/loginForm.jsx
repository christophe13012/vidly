import React from "react";
import Joi from "@hapi/joi";
import Form from "./form";

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
  render() {
    return (
      <form className="col-lg-8 p-5">
        {this.renderInput("Adresse email", "email", "email")}
        {this.renderInput("Mot de passe", "password", "password")}
        {this.renderButton("S'identifier")}
      </form>
    );
  }
}

export default LoginForm;
