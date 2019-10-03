import React from "react";
import { Link } from "react-router-dom";
import { EVENT_MAX_LENGTH } from "../Constants";
import { getImageURL } from "../Constants";
import Img from "react-image";
import Spinner from "./Spinner";

class Event extends React.Component {
  state = {
    data: {},
    type: "",
    genres: []
  };

  async componentDidMount() {
    await this.setState({
      data: this.props.data,
      type: this.props.type,
      genres: this.props.genres
    });
    console.log(this.state);
  }
  render() {
    const {
      id,
      poster_path,
      title,
      release_date,
      vote_average,
      overview,
      first_air_date,
      name,
      genre_ids
    } = this.state.data;

    console.log(this.state.data);
    return (
      <div className="col-12 col-lg-6">
        <div className="event d-flex">
          <Link
            to={`/${this.state.type}/${id}`}
            title={this.state.type === "movie" ? title : name}
          >
            <Img
              src={getImageURL(poster_path)}
              holder={Spinner}
              className="poster-img"
            />
          </Link>
          <div className="event-info">
            <b className="display-font">
              {this.state.type === "movie" ? title : name}
            </b>{" "}
            <small className="text-secondary">
              (
              {new Date(
                this.state.type === "movie" ? release_date : first_air_date
              ).getFullYear()}
              )
            </small>
            <br />
            <div className="ratings">
              <i className="fas fa-star text-warning" />
              &ensp;
              {vote_average === 0 ? (
                "NR"
              ) : (
                <span>
                  {vote_average}
                  <small>/10</small>
                </span>
              )}
            </div>
            <div className="genres">
              {genre_ids === undefined
                ? null
                : genre_ids
                    .map(item => {
                      if (this.state.genres === undefined) return null;
                      let filteredArray = this.state.genres.filter(
                        item2 => item2.id === item
                      )[0];

                      if (filteredArray === undefined || filteredArray === null)
                        return null;
                      else return filteredArray.name;
                    })
                    .join(", ")}
            </div>
            <div className="overview">
              {overview !== undefined
                ? overview.length > EVENT_MAX_LENGTH
                  ? overview.substr(0, EVENT_MAX_LENGTH).concat("....")
                  : overview
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Event;
