import React from "react";
import { Link } from "react-router-dom";
import { getImageURL } from "../Constants";
import { SEARCH_BIO_MAX_LENGTH } from "../Constants";
import Img from "react-image";
import Spinner from "./Spinner";

class SearchResultCard extends React.Component {
  state = {
    data: {},
    max_length: 0
  };
  componentDidMount() {
    this.setState({
      data: this.props.data
    });

    this.init();
    window.addEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    console.log(window.innerWidth);
    if (window.innerWidth <= 780) this.setState({ max_length: 120 });
    else this.setState({ max_length: SEARCH_BIO_MAX_LENGTH });
  };

  init = () => {
    let length = 0;
    if (window.innerWidth > 780) length = SEARCH_BIO_MAX_LENGTH;
    else length = 120;

    this.setState({ max_length: length });
  };
  render() {
    const {
      id,
      name,
      title,
      vote_average,
      poster_path,
      profile_path,
      overview,
      media_type,
      known_for
    } = this.state.data;

    console.log(this.props);
    return (
      <div className="col-12 mt-4">
        <Link to={`/${media_type}/${id}`} className="event-link">
          <div className="search-card">
            <Img
              src={getImageURL(poster_path || profile_path)}
              holder={Spinner}
            />
            <div className="card-body">
              <h3>{name || title}</h3>
              {media_type !== "person" ? (
                <div className="ratings">
                  <i className="fas fa-star text-warning star" />
                  {vote_average === 0 ? (
                    " NR"
                  ) : (
                    <span>
                      &ensp;{vote_average} <small>/10</small>
                    </span>
                  )}
                </div>
              ) : (
                "Person"
              )}
              <hr />
              <div className="bio">
                <h4>{overview ? "Overview" : "Known For"}</h4>
                {overview === undefined
                  ? known_for === undefined
                    ? null
                    : known_for.map(item => item.title || item.name).join(", ")
                  : overview.length > this.state.max_length
                  ? overview.substr(0, this.state.max_length).concat("...")
                  : overview}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default SearchResultCard;
