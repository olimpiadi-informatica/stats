import React, { Component } from "react";
import { ComposableMap, ZoomableGroup, Geographies, Geography, Marker } from "react-simple-maps";

const MAP_STYLE = {
  fill: "#ECEFF1",
  stroke: "#607D8B",
};

type Props = {
  map: string;
  scale: number;
  width: number;
  height: number;
  center: [number, number];
  markers: [number, number][];
};

export default class SimpleMap extends Component<Props> {
  static defaultProps = {
    map: "/static/maps/italy-regions.json",
    scale: 1500,
    width: 350,
    height: 350,
    center: [41, 14],
    markers: [],
  };

  render() {
    return (
      <ComposableMap
        projectionConfig={{
          scale: this.props.scale,
        }}
        width={this.props.width}
        height={this.props.height}
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <ZoomableGroup center={[this.props.center[1], this.props.center[0]]} filterZoomEvent={(a: any) => false}>
          <Geographies geography={this.props.map}>
            {({ geographies, projection }: any) =>
              geographies.map(
                (geography: any, i: number) =>
                  geography.id !== "ATA" && (
                    <Geography
                      key={i}
                      geography={geography}
                      style={{
                        default: MAP_STYLE,
                        hover: MAP_STYLE,
                        pressed: MAP_STYLE,
                      }}
                    />
                  )
              )
            }
          </Geographies>
          {this.props.markers.map(marker => (
            <Marker
              key={`${marker[1]}-${marker[0]}`}
              coordinates={[marker[1], marker[0]]}
              style={{
                default: { stroke: "#FF5722" },
                hover: { stroke: "#FF5722" },
                pressed: { stroke: "#FF5722" },
              }}
            >
              <g
                fill="none"
                stroke="#FF5533"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
              >
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </g>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    );
  }
}
