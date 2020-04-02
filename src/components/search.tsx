import React, { Component } from "react";
import axios, { AxiosResponse } from "axios";
import LocationResponse from "../models/LocationResponse";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { AlertState } from "./dangerAlert";

class Search extends Component<
  {
    handleResults: (e: any) => void;
    handleError: (e: any) => void;
  },
  { postcode: string; searching: boolean }
> {
  private searching: boolean = false;

  constructor(props: any) {
    super(props);

    this.handlePostcodeChange = this.handlePostcodeChange.bind(this);
    this.handleGo = this.handleGo.bind(this);

    this.state = { postcode: "", searching: false };
  }

  handlePostcodeChange(e: any): void {
    const postcode = e.target.value;
    this.setState({ postcode: postcode });
  }

  buttonDisabled(): boolean {
    return !this.state.postcode;
  }

  searchBoxDisabled(): boolean {
    return this.state.searching;
  }

  handleGo(): void {
    let me = this;

    const url = process.env.REACT_APP_SERVER_URL + "Location";

    me.props.handleResults({ locations: [] });
    me.props.handleError(new AlertState());
    me.setState({ searching: true });

    axios
      .get<LocationResponse>(url, {
        params: {
          postcode: me.state.postcode,
          distance: 50000
        }
      })
      .then((response: AxiosResponse<LocationResponse>) => {
        const { data } = response;
        me.props.handleResults(data);
        me.setState({ searching: false });
      })
      .catch(e => {
        const error = new AlertState();
        error.show = true;
        error.header = "Search failed.";
        error.body = e.message;

        me.props.handleError(error);
        me.setState({ searching: false });
      });
  }

  public render() {
    return (
      <div>
        <Form inline>
          <div className="d-flex justify-content-center align-items-center">
            <FormControl
              type="text"
              placeholder="Postcode"
              onChange={this.handlePostcodeChange}
              disabled={this.searchBoxDisabled()}
            ></FormControl>
            <Button
              type="button"
              variant="primary"
              onClick={this.handleGo}
              disabled={this.buttonDisabled()}
            >
              GO
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Search;
