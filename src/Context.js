import React from "react";
import { getURL } from "./Constants";
const Context = React.createContext();

export class Provider extends React.Component {
  state = {
    popular_movies: [],
    popular_tv: [],
    popular_people: [],
    genres_movies: []
  };

  componentDidMount() {
    fetch(getURL("popular", "movie"))
      .then(response => response.json())
      .then(data => this.setState({ popular_movies: data.results }));

    fetch(getURL("popular", "tv"))
      .then(response => response.json())
      .then(data => this.setState({ popular_tv: data.results }));

    fetch(getURL("popular", "person"))
      .then(response => response.json())
      .then(data => this.setState({ popular_people: data.results }));

    fetch(getURL("movie/list", "genre"))
      .then(response => response.json())
      .then(data => this.setState({ genres_movies: data.genres }));
    fetch(getURL("tv/list", "genre"))
      .then(response => response.json())
      .then(data => this.setState({ genres_tv: data.genres }));
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
