import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Provider } from "./Context";
import Index from "./components/Index";

const App = () => {
  return (
    <Router>
      <Provider>
        <React.Fragment>
          <Navbar />
          <div className="container" id="mainContainer">
            <Index />
          </div>
        </React.Fragment>
      </Provider>
    </Router>
  );
};

export default App;
