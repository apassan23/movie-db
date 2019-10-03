import React from "react";
import { Link } from "react-router-dom";
import { getImageURL } from "../Constants";
import Img from "react-image";
import Spinner from "./Spinner";

class CharCard extends React.Component {
  state = {
    data: {}
  };

  componentDidMount() {
    this.setState({ data: this.props.data });
  }
  render() {
    const { profile_path, name, character, id } = this.state.data;

    return (
      <div className="col-4 col-xl-2 col-lg-3">
        <Link to={`/person/${id}`} className="card-link">
          <div className="card char-card">
            <Img
              src={getImageURL(profile_path)}
              loader={Spinner}
              className="card-img-top profile-img"
            />
            <div className="card-info">
              <span className="display-font title-card">{name}</span>
              <br />
              <span className="character">{character}</span>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default CharCard;
