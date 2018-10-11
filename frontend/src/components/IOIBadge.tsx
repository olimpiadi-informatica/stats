import React, { Component } from "react";

type Props = {
  ioi: boolean;
};

export default class IOIBadge extends Component<Props> {
  render() {
    if (!this.props.ioi) return <span />;
    return <span className="badge badge-pill badge-success">IOI</span>;
  }
}
