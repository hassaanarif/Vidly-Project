import Joi from "joi-browser";
import React from "react";
import Form from "./common/form";
import { register } from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required(),
    password: Joi.string().required().min(5).alphanum(),
    name: Joi.string().required(),
  };

  onSubmit = async () => {
    try {
      const response = await register(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
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
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.formInput("email", "Email", "email")}
          {this.formInput("password", "Password", "password")}
          {this.formInput("name", "Name", "text")}
          {this.rendorButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
