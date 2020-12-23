import { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    let options = { abortEarly: false };
    let result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;

    let errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = (e) => {
    let obj = { [e.currentTarget.name]: e.currentTarget.value };
    let schema = { [e.currentTarget.name]: this.schema[e.currentTarget.name] };
    let result = Joi.validate(obj, schema);
    if (result.error === null) return null;
    return result.error.details[0].message;
  };

  handleChange = (e) => {
    let errors = { ...this.state.errors };
    let errorMessage = this.validateProperty(e);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    let data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.onSubmit();
  };

  formInput = (name, label, type) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          name={name}
          value={this.state.data[name]}
          onChange={this.handleChange}
          type={type}
          className="form-control"
          id={name}
        ></input>
        {this.state.errors[name] && (
          <div className="alert alert-danger">{this.state.errors[name]}</div>
        )}
      </div>
    );
  };

  formSelect = (name, label, options) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          className="form-control"
          name={name}
          id={name}
          value={options.data[name]}
          onChange={this.handleChange}
        >
          {this.props.match.params.id === "new" && (
            <option value="" hidden>
              Choose...
            </option>
          )}

          {this.props.match.params.id === "new" &&
            options.genres.map((index) => (
              <option key={index._id} value={index._id}>
                {index.name}
              </option>
            ))}

          {this.props.match.params.id !== "new" && (
            <option value={options.data[name]} disabled hidden>
              {options.data[name]}
            </option>
          )}
        </select>
        {this.state.errors[name] && (
          <div className="alert alert-danger">{this.state.errors[name]}</div>
        )}
      </div>
    );
  };

  rendorButton = (label) => {
    return (
      <button
        type="submit"
        className="btn btn-primary"
        disabled={this.validate()}
      >
        {label}
      </button>
    );
  };
}

export default Form;
