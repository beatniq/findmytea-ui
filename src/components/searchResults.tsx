import React, { Component } from "react";
import LocationResponse from "../models/LocationResponse";

export class SearchResultsState {
  locations: LocationResponse = new LocationResponse();
}

class SearchResults extends Component<SearchResultsState, {}> {
  render() {
    const locations = this.props.locations;

    return (
      <ul>
        {locations.locations.map((value, index) => {
          return (
            <li key={value.id}>
              <a href={value.website} target="_blank" rel="noopener noreferrer">
                {value.name}
              </a>
              &nbsp;({value.distance}m)
            </li>
          );
        })}
      </ul>
    );
  }
}

export default SearchResults;
