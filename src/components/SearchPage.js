import React from "react";
import { getURL } from "../Constants";
import SearchResultCard from "./SearchResultCard";
import Spinner from "./Spinner";

class SearchPage extends React.Component {
  state = {
    searchString: "",
    searchResults: []
  };

  async componentDidMount() {
    document.getElementById("mainContainer").className = "container";
    await this.setState({ searchString: this.props.match.params.searchString });
    fetch(getURL(`multi?query=${this.state.searchString}&`, "search"))
      .then(response => response.json())
      .then(data => this.setState({ searchResults: data.results }));
  }

  render() {
    const { searchResults } = this.state;
    if (searchResults.length === 0) return <Spinner />;
    else
      return (
        <React.Fragment>
          <h1 className="my-5">
            Search Results for <b>{`"${this.state.searchString}"`}</b>
          </h1>
          <div className="row">
            {searchResults.map(item => (
              <SearchResultCard data={item} key={item.id} />
            ))}
          </div>
        </React.Fragment>
      );
  }
}

export default SearchPage;
