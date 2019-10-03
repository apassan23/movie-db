import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  state = {
    searchQuery: ""
  };
  handleChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  componentDidUpdate() {
    let searchBar = document.getElementById("searchBar");
    let searchButton = document.getElementById("searchButton");
    searchBar.addEventListener("keypress", event => {
      if (event.keyCode === 13) searchButton.click();
    });
  }
  render() {
    return (
      <nav
        className="navbar navbar-expand-sm navbar-dark bg-dark"
        id="mainNavbar"
      >
        <Link to="/" className="navbar-brand">
          The Movie Database
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarContent"
          aria-controls="#navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon bg-dark" />
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <div id="searchWrapper">
                <input
                  type="text"
                  name="search"
                  id="searchBar"
                  placeholder="Search for Movies,TV,Personalities..."
                  onChange={event => this.handleChange(event)}
                />
                <button
                  id="searchButton"
                  type="button"
                  onClick={() =>
                    (window.location.href = `/search/${this.state.searchQuery}`)
                  }
                >
                  <i className="fas fa-1x fa-search text-black" />
                </button>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/movies/" className="nav-link">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tv/" className="nav-link">
                TV
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/people/" className="nav-link">
                People
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
