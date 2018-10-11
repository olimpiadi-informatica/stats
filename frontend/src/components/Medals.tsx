import React, { Component } from "react";
import Ionicon from "react-ionicons";

type Props = {
  gold: number | null;
  silver: number | null;
  bronze: number | null;
};

export default class MedalsComponent extends Component<Props> {
  render() {
    return (
      <div>
        <div className="gold d-inline-block p-2">
          <Ionicon icon="md-medal" fontSize="35px" color="#ffdb19" />
          <div className="text-center">{this.props.gold}</div>
        </div>
        <div className="silver d-inline-block p-2">
          <Ionicon icon="md-medal" fontSize="35px" color="#c0c0c0" />
          <div className="text-center">{this.props.silver}</div>
        </div>
        <div className="bronze d-inline-block p-2">
          <Ionicon icon="md-medal" fontSize="35px" color="#cd7f32" />
          <div className="text-center">{this.props.bronze}</div>
        </div>
      </div>
    );
  }
}
