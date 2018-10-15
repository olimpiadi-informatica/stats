import React, { Component } from "react";

import { RegionItem, loadRegionsList } from "../remote/region";
import Loading from "./Loading";
import Error from "./Error";
import RegionListItem from "./RegionListItem";

type Props = {};
type State = {
  regions: RegionItem[] | null;
  error: XMLHttpRequest | null;
};

export default class Regions extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { regions: null, error: null };
  }

  async componentDidMount() {
    this.setState({ regions: null, error: null });
    try {
      this.setState({ regions: await loadRegionsList(), error: null });
    } catch (error) {
      this.setState({ regions: null, error: error.request });
    }
  }

  render() {
    if (this.state.error) return <Error error={this.state.error} />;
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
