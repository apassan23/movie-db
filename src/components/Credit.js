import React from "react";
import { Link } from "react-router-dom";
import { getImageURL } from "../Constants";
import Img from "react-image";
import Spinner from "./Spinner";

class Credit extends React.Component {
  state = {
    data: {}
  };

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  render() {
    console.log(this.state);
    const { poster_path, name, title, id, media_type } = this.props.data;
    return (
      <div className="col-6 col-md-3 mt-4 text-center">
        <Link to={`/${media_type}/${id}`} className="event-link">
          <div className="d-flex flex-column align-items-center">
            <Img
              src={getImageURL(poster_path)}
              loader={Spinner}
              className="credit-img"
            />
            <span className="">{name || title}</span>
          </div>
        </Link>
      </div>
    );
  }
}

export default Credit;
