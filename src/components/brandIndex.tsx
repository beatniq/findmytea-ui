import React, { Component } from "react";
import NavBar from "./navbar";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import axios, { AxiosResponse } from "axios";
import Brand from "../models/Brand";

import { Table } from "react-bootstrap";

const mapStateToProps = (state: any) => {
  return { session: state.session };
};

class BrandIndex extends Component<
  {
    session: {
      user: { userName: string; email: string };
      credentials: { accessToken: null; idToken: null };
      isLoggedIn: boolean;
    };
  },
  {
    brandResponse: Array<Brand>;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = { brandResponse: [] };
  }

  componentDidMount() {
    let me = this;

    if (me.props.session.isLoggedIn) {
      const url = process.env.REACT_APP_SERVER_URL + "Brand";

      axios
        .get<Array<Brand>>(url, {
          headers: {
            Authorization: "Bearer " + me.props.session.credentials.idToken
          }
        })
        .then((response: AxiosResponse<Array<Brand>>) => {
          const { data } = response;
          console.log(data);
          me.setState({ brandResponse: data });
        })
        .catch(e => {});
    }
  }

  public render() {
    return (
      <>
        <header>
          <NavBar />
        </header>
        <Container>
          <h1>Brands</h1>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {this.state.brandResponse.map((value, index) => {
                return (
                  <tr key={value.id}>
                    <td>{value.id}</td>
                    <td>{value.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
}

export default connect(mapStateToProps)(BrandIndex);
