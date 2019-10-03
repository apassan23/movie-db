import React from "react";
import { Consumer } from "../Context";
import PersonCard from "./PersonCard";
import Spinner from "./Spinner";

class PopularPeople extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Consumer>
          {state => {
            const { popular_people } = state;
            if (popular_people.length === 0) return <Spinner />;
            return (
              <div>
                <h1 className="display-4 title display-font mb-5">
                  Popular People
                </h1>
                <div className="row">
                  {popular_people.map(item => (
                    <PersonCard key={item.id} data={item} />
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

export default PopularPeople;
