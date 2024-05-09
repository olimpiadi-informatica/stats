"use client";

import { ReactNode } from "react";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import italyRegions from "./italy-regions.json";

export function ItalyMap({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <ComposableMap
      projectionConfig={{
        scale: 1500,
        center: [12.5, 41.7],
      }}
      width={300}
      height={300}
      className={className}>
      <Geographies geography={italyRegions}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              className="fill-base-100 stroke-base-content/30 outline-0"
            />
          ))
        }
      </Geographies>
      {children}
    </ComposableMap>
  );
}
