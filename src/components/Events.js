import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import MovieEvent from "./MovieEvent";
import TVEvent from "./TVEvent";
import EventInfo from "./EventInfo";
import Person from "./Person";
import PopularPeople from "./PopularPeople";
import SearchPage from "./SearchPage";

class Events extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={MovieEvent} />
          <Route exact path="/movies/" component={MovieEvent} />
          <Route exact path="/tv/" component={TVEvent} />
          <Route exact path="/people/" component={PopularPeople} />
          <Route exact path="/movie/:id" component={EventInfo} />
          <Route exact path="/tv/:id" component={EventInfo} />
          <Route exact path="/person/:id" component={Person} />
          <Route exact path="/search/:searchString" component={SearchPage} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Events;
