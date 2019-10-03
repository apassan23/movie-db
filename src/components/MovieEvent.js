import React from "react";
import { Consumer } from "../Context";
import Event from "./Event";
import Spinner from "./Spinner";

class MovieEvent extends React.Component {
  componentDidMount() {
    document.getElementById("mainContainer").className = "container";
  }

  render() {
    return (
      <React.Fragment>
        <Consumer>
          {state => {
            const { popular_movies, genres_movies } = state;
            if (popular_movies.length === 0) return <Spinner />;
            else
              return (
                <div>
                  <h1 className="display-4 title display-font">
                    Popular Movies
                  </h1>
                  <div className="row">
                    {popular_movies.map(item => (
                      <Event
                        key={item.id}
                        data={item}
                        type="movie"
                        genres={genres_movies}
                      />
                    ))}
                  </div>
                </div>
              );
          }}
        </Consumer>
      </React.Fragment>
    );
  }
}

export default MovieEvent;
