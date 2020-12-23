import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Customers from "./Components/customers";
import Movies from "./Components/movies";
import NotFound from "./Components/notFound";
import MoviesNavBar from "./Components/moviesNavBar";
import Rental from "./Components/rental";
import LoginForm from "./Components/loginForm";
import RegisterForm from "./Components/RegisterForm";
import newMovie from "./Components/movieForm";
import Logout from "./Components/logout";

class MoviesApp extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (error) {}
  }
  render() {
    return (
      <React.Fragment>
        <MoviesNavBar user={this.state.user} />
        <main className="container mt-4">
          <Switch>
            <Route
              path="/movies/:id"
              render={(props) => {
                if (!this.state.user) return <Redirect to="/login" />;
                return <Movies {...props} />;
              }}
            ></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            ></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/rental" component={Rental}></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default MoviesApp;
