import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/userService";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
  };

  onSubmit = async () => {
    try {
      const { data: jwt } = await login(this.state.data);
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
      <form onSubmit={this.handleSubmit}>
        {this.formInput("email", "Email", "email")}
        {this.formInput("password", "Password", "password")}
        {this.rendorButton("Login")}
      </form>
    );
  }
}

export default LoginForm;
