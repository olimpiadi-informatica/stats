"use client";

import { Annotation } from "react-simple-maps";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { Contest } from "~/lib/contests";

import { ItalyMap } from "./italy";

export function ContestLocation({ contest }: { contest: Contest }) {
  const labelUp = contest.latitude! < 41.7;

  return (
    <ItalyMap className="mx-auto mt-4 max-h-64 max-w-64">
      <Annotation
        subject={[contest.longitude!, contest.latitude!]}
        dx={labelUp ? -30 : 30}
        dy={labelUp ? -30 : 30}
        curve={-0.5}
        connectorProps={{ className: "stroke-error stroke-2 [stroke-linecap:round]" }}
        markerEnd="url(#arrow)">
        <defs>
          <marker id="arrow" orient="auto" markerWidth="3" markerHeight="4" refX="0.1" refY="2">
            <path d="M0,0 V4 L2,2 Z" className="fill-error" />
          </marker>
        </defs>
        <text
          x={labelUp ? 20 : -20}
          y={labelUp ? -10 : 10}
          textAnchor={labelUp ? "end" : "start"}
          alignmentBaseline="middle"
          className="fill-error text-sm">
          {contest.location}
        </text>
      </Annotation>
    </ItalyMap>
  );
}

export function GenderGraph({
  years,
}: {
  years: {
    year: number;
    num_boys: number;
    num_girls: number;
  }[];
}) {
  return (
    <ResponsiveContainer height={300}>
      <AreaChart width={300} height={350} data={years} className="mx-auto">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis width={30} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="num_boys"
          stackId="1"
          stroke="#7dd4fc"
          fill="#7dd4fc"
          name="Ragazzi"
        />
        <Area
          type="monotone"
          dataKey="num_girls"
          stackId="1"
          stroke="#f9a8d4"
          fill="#f9a8d4"
          name="Ragazze"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function ParticipantsGraph({
  years,
}: {
  years: {
    year: number;
    num_participants: number;
  }[];
}) {
  return (
    <ResponsiveContainer height={300}>
      <AreaChart data={years}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis width={30} />
        <Tooltip />
        <Area type="monotone" dataKey="num_participants" stackId="1" name="Partecipanti" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
