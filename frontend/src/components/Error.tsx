import React, { Component } from "react";

type Props = {
  error: XMLHttpRequest;
};

export default class Error extends Component<Props> {
  render() {
    const error = this.props.error.statusText || "connection failed";
    return (
      <div style={{ color: "red" }}>
        <strong>Error</strong> {error}
      </div>
    );
  }
}
