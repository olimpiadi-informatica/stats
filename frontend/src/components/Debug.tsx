import React, { Component } from "react";

type Props = {
  data: any;
};

export default class DebugComponent extends Component<Props> {
  render() {
    return <pre>{JSON.stringify(this.props.data, null, 4)}</pre>;
  }
}
