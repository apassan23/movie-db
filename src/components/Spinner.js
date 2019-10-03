import React from "react";
import Img from "react-image";
import loader from "../img/spinner.gif";

const Spinner = () => {
  return (
    <div className="spinner">
      <Img src={loader} />
    </div>
  );
};

export default Spinner;
