import React from "react";
import { Link } from "react-router-dom";
import { getImageURL } from "../Constants";
import { KNOWN_MAX_LENGTH } from "../Constants";
import Img from "react-image";
import Spinner from "./Spinner";

class PersonCard extends React.Component {
  state = {
    data: {}
  };

  componentDidMount() {
    document.getElementById("mainContainer").className = "container";
    this.setState({ data: this.props.data });
  }

  render() {
    const { profile_path, name, known_for, id } = this.state.data;
    let known_for_string = [];
    if (known_for !== undefined) {
      known_for_string = known_for
        .map(item => item.name || item.title)
        .join(",");
      known_for_string =
        known_for_string.length > KNOWN_MAX_LENGTH
          ? known_for_string.slice(0, KNOWN_MAX_LENGTH).concat("....")
          : known_for_string;
    }

    if (Object.keys(this.state.data).length === 0) return <Spinner />;
    else
      return (
        <div className="col-6 col-xl-3 col-lg-4 mb-5">
          <Link to={`/person/${id}`} className="event-link">
            <div className="card person-card">
              <Img
                src={getImageURL(profile_path)}
                loader={Spinner}
                className="card-img-top profile-img-2"
              />
              <div className="card-info">
                <span className="title-card">{name}</span>
                <br />
                {known_for_string}
              </div>
            </div>
          </Link>
        </div>
      );
  }
}

export default PersonCard;
