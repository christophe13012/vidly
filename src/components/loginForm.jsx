import React, { Component } from "react";
import Input from "./input";
import Joi from "@hapi/joi";

const loginSchema = {
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .min(3)
    .max(50)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required()
};

class LoginForm extends Component {
  state = { email: "", password: "", errors: { email: "", password: "" } };
  handleSubmit = e => {
    e.preventDefault();
    console.log("login");
  };
  handleChange = e => {
    const state = { ...this.state };
    state[e.target.type] = e.target.value;
    const obj = { [e.target.type]: e.target.value };
    const schema = { [e.target.type]: loginSchema[e.target.type] };

    const { error } = Joi.validate(obj, schema);
    if (error) state.errors[e.target.type] = error.details[0].message;
    else state.errors[e.target.type] = "";
    this.setState(state);
  };
  render() {
    console.log(this.state);

    return (
      <form className="p-5">
        <Input
          label="Adresse email"
          type="email"
          onChange={this.handleChange}
          value={this.state.email}
          error={this.state.errors.email}
        />
        <Input
          label="Mot de passe"
          type="password"
          onChange={this.handleChange}
          value={this.state.password}
          error={this.state.errors.password}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.handleSubmit}
        >
          S'identifier
        </button>
      </form>
    );
  }
}

export default LoginForm;
