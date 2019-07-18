import React from "react";
import Form from "./form";
import Joi from "@hapi/joi";
import { register } from "../services/userService";
import { toast } from "react-toastify";

class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: ""
    },
    errors: {
      email: "",
      password: "",
      name: ""
    }
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
      .required()
  };
  doSubmit = async () => {
    try {
      const { data: jwt } = await register(this.state.data);
      localStorage.setItem("token", jwt);
      this.props.history.push("/");
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
          {this.renderButton("S'enregistrer")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
