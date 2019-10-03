import React from "react";
import { Consumer } from "../Context";
import Event from "./Event";
import Spinner from "./Spinner";

class TVEvent extends React.Component {
  componentDidMount() {
    document.getElementById("mainContainer").className = "container";
  }

  render() {
    return (
      <React.Fragment>
        <Consumer>
          {state => {
            const { popular_tv, genres_tv } = state;
            if (popular_tv.length === 0) return <Spinner />;
            else
              return (
                <div>
                  <h1 className="display-4 title display-font">Popular TV</h1>
                  <div className="row">
                    {popular_tv.map(item => (
                      <Event
                        key={item.id}
                        data={item}
                        type="tv"
                        genres={genres_tv}
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

export default TVEvent;
