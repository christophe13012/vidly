import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import Joi from "@hapi/joi";

class Form extends Component {
  state = {};
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.data);
  };
  handleChange = e => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    data[e.target.id] = e.target.value;
    const obj = { [e.target.id]: e.target.value };
    const schema = { [e.target.id]: this.formSchema[e.target.id] };
    const { error } = Joi.validate(obj, schema);
    if (error) errors[e.target.id] = error.details[0].message;
    else errors[e.target.id] = "";
    this.setState({ data, errors });
  };
  handleSelect = e => {
    const data = { ...this.state.data };
    data[e.target.id] = e.target.value;
    this.setState({ data });
  };
  renderInput = (label, type, id) => {
    return (
      <Input
        label={label}
        type={type}
        id={id}
        onChange={this.handleChange}
        value={this.state.data[id]}
        error={this.state.errors[id]}
      />
    );
  };
  renderSelect = (label, id, selectItems) => {
    return (
      <Select
        label={label}
        id={id}
        onSelect={this.handleSelect}
        selectItems={selectItems}
        value={this.state.data[id]}
        error={this.state.errors[id]}
      />
    );
  };
  renderButton = label => {
    return (
      <button
        disabled={
          Joi.validate(this.state.data, this.formSchema).error ? true : false
        }
        type="submit"
        className="btn btn-primary"
        onClick={this.handleSubmit}
      >
        {label}
      </button>
    );
  };
}

export default Form;
