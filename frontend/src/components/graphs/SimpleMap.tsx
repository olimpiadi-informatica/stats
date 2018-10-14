import React, { Component } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps";

const MAP_STYLE = {
  fill: "#ECEFF1",
  stroke: "#607D8B"
};

type Props = {
  map: string;
  scale: number;
  width: number;
  height: number;
  center: [number, number];
  markers: ([number, number])[];
};

export default class SimpleMap extends Component<Props> {
  static defaultProps = {
    map: "/italy-regions.json",
    scale: 1500,
    width: 350,
    height: 350,
    center: [41, 14],
    markers: []
  };

  render() {
    return (
      <ComposableMap
        projectionConfig={{
          scale: this.props.scale
        }}
        width={this.props.width}
        height={this.props.height}
        style={{
          width: "100%",
          height: "auto"
        }}
      >
        <ZoomableGroup
          center={[this.props.center[1], this.props.center[0]]}
          disablePanning
        >
          <Geographies geography={this.props.map}>
            {(geographies: any, projection: any) =>
              geographies.map(
                (geography: any, i: number) =>
                  geography.id !== "ATA" && (
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: MAP_STYLE,
                        hover: MAP_STYLE,
                        pressed: MAP_STYLE
                      }}
                    />
                  )
              )
            }
          </Geographies>
          <Markers>
            {this.props.markers.map(marker => (
              <Marker
                key={`${marker[1]}-${marker[0]}`}
                marker={{
                  coordinates: [marker[1], marker[0]]
                }}
                style={{
                  default: { stroke: "#FF5722" },
                  hover: { stroke: "#FF5722" },
                  pressed: { stroke: "#FF5722" }
                }}
              >
                <g transform="translate(-12, -24)">
                  <path
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeMiterlimit="10"
                    strokeLinejoin="miter"
                    d="M20,9c0,4.9-8,13-8,13S4,13.9,4,9c0-5.1,4.1-8,8-8S20,3.9,20,9z"
                  />
                  <circle
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeMiterlimit="10"
                    strokeLinejoin="miter"
                    cx="12"
                    cy="9"
                    r="3"
                  />
                </g>
              </Marker>
            ))}
          </Markers>
        </ZoomableGroup>
      </ComposableMap>
    );
  }
}
