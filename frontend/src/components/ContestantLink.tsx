import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Contestant } from "../remote";
import IOIBadge from "./IOIBadge";

type Props = {
  contestant: Contestant;
  ioi: boolean;
};

export default class ContestantLink extends Component<Props> {
  render() {
    const { ioi, contestant } = this.props;
    return (
      <Link className="" to={`/contestant/${contestant.id}`}>
        {contestant.first_name} {contestant.last_name} <IOIBadge ioi={ioi} />
      </Link>
    );
  }
}
