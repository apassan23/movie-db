import React from "react";
import { MAX_CAST_LENGTH } from "../Constants";
import { getURLByID } from "../Constants";
import { getURL } from "../Constants";
import { getImageURL } from "../Constants";
import CharCard from "./CharCard";
import Img from "react-image";
import Spinner from "./Spinner";
import { MAX_OVERVIEW_LENGTH } from "../Constants";

class EventInfo extends React.Component {
  state = {
    data: {},
    type: "",
    cast: [],
    max_length: 0
  };

  componentDidMount() {
    let mainContainer = document.getElementById("mainContainer");
    mainContainer.className = "container-fluid";
    mainContainer.style.padding = "0";
    const eventType = /\/([a-z]*)\//.exec(this.props.match.url)[1];
    const event_id = this.props.match.params.id;
    fetch(getURLByID(eventType, event_id))
      .then(response => response.json())
      .then(eventData =>
        this.setState({
          data: eventData,
          type: eventType
        })
      );

    fetch(getURL(`${event_id}/credits`, eventType))
      .then(response => response.json())
      .then(data => this.setState({ cast: data.cast }));

    this.init();
    window.addEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    console.log(window.innerWidth);
    if (window.innerWidth <= 780) this.setState({ max_length: 120 });
    else this.setState({ max_length: MAX_OVERVIEW_LENGTH });
  };

  init = () => {
    let length = 0;
    if (window.innerWidth > 780) length = MAX_OVERVIEW_LENGTH;
    else length = 120;

    this.setState({ max_length: length });
  };

  render() {
    console.log(this.state);

    let backdropStyle = {};
    if (Object.keys(this.state.data).length !== 0)
      backdropStyle = {
        backgroundImage: getImageURL(this.state.data.backdrop_path)
      };

    const {
      poster_path,
      name,
      title,
      first_air_date,
      next_episode_to_air,
      last_air_date,
      release_date,
      vote_average,
      genres,
      episode_run_time,
      overview,
      runtime
    } = this.state.data;

    document.title = name ? name : title ? title : "";

    if (Object.keys(this.state.data).length === 0) return <Spinner />;
    else
      return (
        <React.Fragment>
          <div className="container-fluid backdrop" style={backdropStyle}>
            <div className="container-fluid backdrop-hidden">
              <div className="container event-info">
                <div className="row d-flex flex-row">
                  <div className="col-6 col-md-4 d-flex justify-content-end poster-wrapper">
                    <Img
                      src={getImageURL(poster_path)}
                      holder={Spinner}
                      className="poster"
                    />
                  </div>
                  <div className="col-6 col-md-8 d-flex flex-column text-white info-wrapper">
                    <h1 className="event-title display-font">
                      {title || name}
                      <small className="text-warning runtime">
                        {`(${new Date(
                          release_date || first_air_date
                        ).getFullYear()}${
                          this.state.type === "movie"
                            ? ""
                            : ` - ${
                                next_episode_to_air === null
                                  ? new Date(last_air_date).getFullYear()
                                  : ""
                              }`
                        })`}
                      </small>
                    </h1>
                    <div className="ratings d-flex">
                      <i className="fas fa-star fa-2x text-warning mr-2" />
                      {vote_average === 0 ? (
                        <h2>NR</h2>
                      ) : (
                        <span className="d-flex justify-content">
                          <h2 className="vote-average">{vote_average}</h2>
                          <big className="align-self-center">/10</big>
                        </span>
                      )}
                    </div>
                    <div className="stats genres lead display-font">
                      {genres.map(item => item.name).join(", ")} |{" "}
                      {this.state.type === "tv" ? episode_run_time : runtime}{" "}
                      min
                    </div>
                    <div className="overview mt-4">
                      <h4 className="display-font lead">Overview</h4>
                      {overview === null ||
                      overview === undefined ||
                      overview.length === 0
                        ? "No Overview."
                        : overview.length > this.state.max_length
                        ? overview.slice(0, this.state.max_length).concat("...")
                        : overview}
                    </div>
                    <div className="cast mt-3">
                      <p>
                        <big className="display-font">Featuring : </big>
                        {this.state.cast
                          .slice(0, MAX_CAST_LENGTH / 2)
                          .map(item => item.name)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="cast mt-4">
              <h1 className="mb-3">Cast</h1>
              <div className="row">
                {this.state.cast.slice(0, MAX_CAST_LENGTH).map(item => (
                  <CharCard data={item} key={item.id} />
                ))}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
  }
}

export default EventInfo;
