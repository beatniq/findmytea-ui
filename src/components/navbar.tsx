import React, { Component } from "react";

import cognitoUtils from "../lib/cognitoUtils";
import { connect } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import { LinkContainer } from "react-router-bootstrap";

const mapStateToProps = (state: any) => {
  return { session: state.session };
};

class NavBar extends Component<
  {
    session: { user: { userName: string; email: string }; isLoggedIn: boolean };
  },
  {}
> {
  onSignOut = (e: any) => {
    e.preventDefault();
    cognitoUtils.signOutCognitoSession();
  };

  login = (e: any) => {
    e.preventDefault();
    cognitoUtils.getCognitoSignInUri();
  };

  public render() {
    return (
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>Find My Tea</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {this.props.session.isLoggedIn ? (
              <LinkContainer to="/brand">
                <Nav.Link>Brands</Nav.Link>
              </LinkContainer>
            ) : (
              <div />
            )}
          </Nav>
          <div className="mr-sm-2">
            {this.props.session.isLoggedIn ? (
              <Button variant="primary" onClick={this.onSignOut}>
                Logout
              </Button>
            ) : (
              <a
                className="btn btn-primary"
                role="button"
                href={cognitoUtils.getCognitoSignInUri()}
              >
                Login
              </a>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect(mapStateToProps)(NavBar);
