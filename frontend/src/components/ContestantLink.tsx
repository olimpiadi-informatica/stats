import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Contestant } from "../remote";

type Props = {
  contestant: Contestant;
  ioi: boolean;
};

export default class ContestantLink extends Component<Props> {
  render() {
    const { ioi, contestant } = this.props;
    const ioi_badge = ioi ? (
      <span className="badge badge-pill badge-success">IOI</span>
    ) : (
      <span />
    );
    return (
      <Link className="" to={`/contestant/${contestant.id}`}>
        {contestant.first_name} {contestant.last_name} {ioi_badge}
      </Link>
    );
  }
}
