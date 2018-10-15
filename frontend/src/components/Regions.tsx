import React, { Component } from "react";

import { RegionItem, loadRegionsList } from "../remote/region";
import Loading from "./Loading";
import RegionListItem from "./RegionListItem";

type Props = {};
type State = {
  regions: RegionItem[] | null;
};

export default class Regions extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { regions: null };
  }

  async componentDidMount() {
    this.setState({ regions: null });
    this.setState({ regions: await loadRegionsList() });
  }

  render() {
    if (!this.state.regions) return <Loading />;

    const regions = this.state.regions.map(region => <RegionListItem region={region} key={region.id} />);

    return (
      <div className="row p-2">
        <div className="col-12 text-center text-danger">
          <h2>Regions</h2>
        </div>
        <div className="col-12">
          <ul className="list-group list-group-flush">{regions}</ul>
        </div>
      </div>
    );
  }
}
