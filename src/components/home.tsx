import React, { Component } from "react";
import Search from "./search";
import DangerAlert, { AlertState } from "./dangerAlert";
import LocationResponse from "../models/LocationResponse";
import SearchResults from "./searchResults";
import NavBar from "./navbar";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";

import "../App.css";

const mapStateToProps = (state: any) => {
  return { session: state.session };
};

class HomeState {
  locations: LocationResponse = new LocationResponse();
  error: AlertState = new AlertState();
}

class Home extends Component<{}, HomeState> {
  constructor(props: any) {
    super(props);
    this.handleResults = this.handleResults.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = { locations: new LocationResponse(), error: new AlertState() };
  }

  handleResults(locations: LocationResponse): void {
    this.setState({ locations: locations });
  }

  handleError(error: AlertState): void {
    this.setState({ locations: new LocationResponse(), error: error });
  }

  public render() {
    return (
      <>
        <header>
          <NavBar />
        </header>
        <Container>
          <DangerAlert error={this.state.error}></DangerAlert>

          <div className="d-flex justify-content-center align-items-center home-search">
            <Search
              handleResults={this.handleResults}
              handleError={this.handleError}
            ></Search>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <SearchResults locations={this.state.locations}></SearchResults>
          </div>
        </Container>
      </>
    );
  }
}

export default connect(mapStateToProps)(Home);
