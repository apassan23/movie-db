import React from "react";
import { getURLByID } from "../Constants";
import { getImageURL } from "../Constants";
import Credit from "./Credit";
import Img from "react-image";
import Spinner from "./Spinner";

class Person extends React.Component {
  state = {
    personInfo: {},
    credits: []
  };

  componentDidMount() {
    // to give the page some globally predefined padding
    document.getElementById("mainContainer").className = "container";
    fetch(getURLByID("person", this.props.match.params.id))
      .then(response => response.json())
      .then(data => this.setState({ personInfo: data }));

    fetch(
      getURLByID("person", `${this.props.match.params.id}/combined_credits`)
    )
      .then(response => response.json())
      .then(data => this.setState({ credits: data.cast }));
  }

  render() {
    const {
      profile_path,
      name,
      biography,
      known_for_department,
      gender,
      birthday,
      place_of_birth,
      homepage,
      also_known_as
    } = this.state.personInfo;

    let known_as = document.getElementById("known-as");
    if (also_known_as !== undefined && known_as !== null) {
      known_as.innerHTML = also_known_as.join("<br>");
    }

    document.title = name ? name : "";

    if (Object.keys(this.state.personInfo).length === 0) return <Spinner />;
    else
      return (
        <div className="row mt-5 person">
          <div className="d-flex flex-column">
            <div className="col-md-4">
              <Img
                src={getImageURL(profile_path)}
                holder={Spinner}
                className="person-img"
              />
            </div>
            <div className="col-md-4 person-personal-col">
              <div className="personal-info mt-5">
                <h4 className="font-weight-bold">Personal Info</h4>
                <div className="mt-4">
                  <span className="font-weight-bold">Known For</span>
                  <br />
                  {known_for_department}
                </div>
                <div className="mt-4">
                  <span className="font-weight-bold">Gender</span>
                  <br />
                  {gender === 1 ? "Female" : "Male"}
                </div>
                <div className="mt-4">
                  <span className="font-weight-bold">Birthday</span>
                  <br />
                  {new Date(birthday).toDateString()}
                </div>
                <div className="mt-4">
                  <span className="font-weight-bold">Place of Birth</span>
                  <br />
                  {place_of_birth}
                </div>
                <div className="mt-4">
                  <span className="font-weight-bold">Official Site</span>
                  <br />
                  {homepage === null ? (
                    "-"
                  ) : (
                    <a href={homepage} className="homepage">
                      {homepage}
                    </a>
                  )}
                </div>
                <div className="mt-4">
                  <span className="font-weight-bold">Also Known as</span>
                  <br />
                  <span id="known-as" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 p-5 order-2">
            <h1 className="font-weight-bold person-name">{name}</h1>
            <div className="bio mt-5">
              <h3 className="font-weight-bold">Biography</h3>
              <p>
                {biography === undefined ||
                biography === null ||
                biography.length === 0
                  ? "No Biography."
                  : biography.length > 700
                  ? biography.slice(0, 700).concat("....")
                  : biography}
              </p>
            </div>

            <div className="credits">
              <h4 className="font-weight-bold">Films and TV Shows</h4>
              <div className="row">
                {this.state.credits.length === 0 ? (
                  <Spinner />
                ) : (
                  this.state.credits
                    .sort((item1, item2) => item2.popularity - item1.popularity)
                    .slice(0, 8)
                    .map(item => <Credit data={item} key={item.id} />)
                )}
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Person;
