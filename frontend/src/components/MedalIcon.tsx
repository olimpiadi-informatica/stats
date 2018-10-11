import React, { Component } from "react";
import Ionicon from "react-ionicons";

type Props = {
  color: string | null;
  fontSize: string;
};

const COLORS: any = {
  gold: "#ffdb19",
  silver: "#c0c0c0",
  bronze: "#cd7f32"
};

export default class MedalIcon extends Component<Props> {
  static defaultProps = { fontSize: "35px" };
  render() {
    if (!this.props.color) return <span />;
    const color = COLORS[this.props.color];
    if (!color) return <span />;
    return (
      <Ionicon icon="md-medal" fontSize={this.props.fontSize} color={color} />
    );
  }
}
