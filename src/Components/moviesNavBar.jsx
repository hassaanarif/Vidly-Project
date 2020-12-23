import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class MoviesNavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          <img
            src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PGcgZmlsbD0iI2RmZTdmNCI+PHBhdGggZD0ibTE1IDQwNnY2MGgyNDEgMjQxdi02MGgtMjQxeiIvPjxwYXRoIGQ9Im0yNTYgNDZoLTI0MXY2MGgyNDEgMjQxdi02MHoiLz48L2c+PHBhdGggZD0ibTI1NiA0NmgyNDF2NjBoLTI0MXoiIGZpbGw9IiNjN2NmZTEiLz48cGF0aCBkPSJtMjU2IDQwNmgyNDF2NjBoLTI0MXoiIGZpbGw9IiNjN2NmZTEiLz48cGF0aCBkPSJtMjU2IDEwNmgtMjI2djMwMGgyMjYgMjI2di0zMDB6IiBmaWxsPSIjZmY2NDFhIi8+PHBhdGggZD0ibTI1NiAxMDZoMjI2djMwMGgtMjI2eiIgZmlsbD0iI2YwMzgwMCIvPjxnPjxnIGZpbGw9IiM0MDRhODAiPjxwYXRoIGQ9Im0wIDM5MXY5MGgyNTYgMjU2di05MGgtMjU2em04MSA2MGgtNTF2LTMwaDUxem04MCAwaC01MHYtMzBoNTB6bTgwIDBoLTUwdi0zMGg1MHptMTkwLTMwaDUxdjMwaC01MXptLTgwIDBoNTB2MzBoLTUwem0tODAgMGg1MHYzMGgtNTB6Ii8+PHBhdGggZD0ibTI1NiAzMWgtMjU2djkwaDI1NiAyNTZ2LTkwem0tMTc1IDYwaC01MXYtMzBoNTF6bTgwIDBoLTUwdi0zMGg1MHptODAgMGgtNTB2LTMwaDUwem04MCAwaC01MHYtMzBoNTB6bTgwLjAwMSAwaC01MC4wMDF2LTMwaDUwLjAwMXptODAuOTk5IDBoLTUxLjA5OXYtMzBoNTEuMDk5eiIvPjwvZz48ZyBmaWxsPSIjMjgzMzY2Ij48cGF0aCBkPSJtMzIxIDkxaC01MHYtMzBoNTB6bTgwLjAwMSAwaC01MC4wMDF2LTMwaDUwLjAwMXptLTE0NS4wMDEtNjB2OTBoMjU2di05MHptMjI2IDYwaC01MS4wOTl2LTMwaDUxLjA5OXoiLz48cGF0aCBkPSJtNTEyIDM5MWgtMjU2djkwaDI1NnptLTE5MSA2MGgtNTB2LTMwaDUwem04MCAwaC01MHYtMzBoNTB6bTgxIDBoLTUxdi0zMGg1MXoiLz48L2c+PC9nPjxwYXRoIGQ9Im0yNTYgMTk3Ljk3Ni00NS0yOS45OTh2MTc2LjA0NGw0NS0yOS45OTggODcuMDQxLTU4LjAyNHoiIGZpbGw9IiNmMGY3ZmYiLz48cGF0aCBkPSJtMjU2IDE5Ny45NzZ2MTE2LjA0OGw4Ny4wNDEtNTguMDI0eiIgZmlsbD0iI2RmZTdmNCIvPjwvZz48L3N2Zz4="
            alt="No Pic"
            height="50px"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Movies <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers">
                Customers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/rental">
                Rental
              </NavLink>
            </li>
            {!this.props.user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </React.Fragment>
            )}
            {this.props.user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    {this.props.user.name}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default MoviesNavBar;
