import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";

export class AlertState {
  show: boolean = false;
  header: string = "";
  body: string = "";
}

class DangerAlert extends Component<{ error: AlertState }, {}> {
  render() {
    const error = this.props.error;
    if (error.show) {
      return (
        <Alert variant="danger">
          <Alert.Heading>{error.header}</Alert.Heading>
          <p>{error.body}</p>
        </Alert>
      );
    } else return <div></div>;
  }
}

export default DangerAlert;
