import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const MAP_STYLE = {
  fill: "#ECEFF1",
  stroke: "#607D8B",
};

type Props = {
  map?: string;
  scale?: number;
  width?: number;
  height?: number;
  center?: [number, number];
  markers?: [number, number][];
};

export function SimpleMap({
  scale,
  width,
  height,
  center,
  map,
  markers,
}: Props) {
  return (
    <ComposableMap
      projectionConfig={{
        scale: scale ?? 1500,
      }}
      width={width ?? 350}
      height={height ?? 350}
      style={{
        width: "100%",
        height: "auto",
      }}
    >
      <ZoomableGroup
        center={[center?.[1] ?? 14, center?.[0] ?? 41]}
        filterZoomEvent={(a: any) => false}
      >
        <Geographies geography={map ?? "/static/maps/italy-regions.json"}>
          {({ geographies }: any) =>
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
        {(markers ?? []).map((marker) => (
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
