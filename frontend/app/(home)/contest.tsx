"use client";

import Link from "next/link";
import { Fragment } from "react";

import { Card, CardBody } from "@olinfo/react-components";
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

import { ContestImage } from "~/components/contest";
import { ContestStat } from "~/lib/stats";

import { ItalyMap } from "./italy";

export function ContestStatCard({ stat }: { stat: ContestStat }) {
  if ("contest_with_most_participants" in stat) {
    const contest = stat.contest_with_most_participants;
    return (
      <Card className="!flex-col">
        {contest.image && (
          <ContestImage
            year={contest.year}
            image={contest.image}
            className="mx-auto mt-4 w-52 rounded-box"
          />
        )}
        <CardBody title={`Edizione ${contest.year}`}>
          <div>
            Nel{" "}
            <Link href={`/contest/${contest.year}`} className="link">
              {contest.year}
            </Link>{" "}
            ci sono stati {contest.num_participants} partecipanti, il maggior numero di sempre.
          </div>
        </CardBody>
      </Card>
    );
  }

  if ("contest_with_most_ex_aequo" in stat) {
    const contest = stat.contest_with_most_ex_aequo;
    return (
      <Card className="!flex-col">
        {contest.image && (
          <ContestImage
            year={contest.year}
            image={contest.image}
            className="mx-auto mt-4 w-52 rounded-box"
          />
        )}
        <CardBody title={`Edizione ${contest.year}`}>
          <div>
            Nel{" "}
            <Link href={`/contest/${contest.year}`} className="link">
              {contest.year}
            </Link>{" "}
            ci sono stati {contest.num_ex_aequo} vincitori a pari merito.
          </div>
        </CardBody>
      </Card>
    );
  }

  if ("contest_with_most_girls" in stat) {
    const contest = stat.contest_with_most_girls;
    return (
      <Card className="!flex-col">
        {contest.image && (
          <ContestImage
            year={contest.year}
            image={contest.image}
            className="mx-auto mt-4 w-52 rounded-box"
          />
        )}
        <CardBody title={`Edizione ${contest.year}`}>
          <div>
            Il{" "}
            <Link href={`/contest/${contest.year}`} className="link">
              {contest.year}
            </Link>{" "}
            è stato l'anno con la maggior percentuale di ragazze, {contest.num_girls} su{" "}
            {contest.num_participants}.
          </div>
        </CardBody>
      </Card>
    );
  }

  if ("most_northern_contest" in stat) {
    const contest = stat.most_northern_contest;
    return (
      <Card className="!flex-col">
        <ItalyMap className="mx-auto mt-4 max-h-64 max-w-64">
          <Annotation
            subject={[contest.location.longitude!, contest.location.latitude!]}
            curve={-0.5}
            connectorProps={{ className: "stroke-error stroke-2 [stroke-linecap:round]" }}
            markerEnd="url(#arrow)">
            <defs>
              <marker id="arrow" orient="auto" markerWidth="3" markerHeight="4" refX="0.1" refY="2">
                <path d="M0,0 V4 L2,2 Z" className="fill-error" />
              </marker>
            </defs>
            <text
              x={-20}
              y={10}
              textAnchor="start"
              alignmentBaseline="middle"
              className="fill-error text-sm">
              {contest.location.location}
            </text>
          </Annotation>
        </ItalyMap>
        <CardBody title={`Edizione ${contest.year}`}>
          <div>
            L'edizione più a nord è stata a {contest.location.location} nel{" "}
            <Link href={`/contest/${contest.year}`} className="link">
              {contest.year}
            </Link>
            .
          </div>
        </CardBody>
      </Card>
    );
  }

  if ("most_southern_contest" in stat) {
    const contest = stat.most_southern_contest;
    return (
      <Card className="!flex-col">
        <ItalyMap className="mx-auto mt-4 max-h-64 max-w-64">
          <Annotation
            subject={[contest.location.longitude!, contest.location.latitude!]}
            dx={-30}
            dy={-30}
            curve={-0.5}
            connectorProps={{ className: "stroke-error stroke-2 [stroke-linecap:round]" }}
            markerEnd="url(#arrow)">
            <defs>
              <marker id="arrow" orient="auto" markerWidth="3" markerHeight="4" refX="0.1" refY="2">
                <path d="M0,0 V4 L2,2 Z" className="fill-error" />
              </marker>
            </defs>
            <text
              x={20}
              y={-10}
              textAnchor="end"
              alignmentBaseline="middle"
              className="fill-error text-sm">
              {contest.location.location}
            </text>
          </Annotation>
        </ItalyMap>
        <CardBody title={`Edizione ${contest.year}`}>
          <div>
            L'edizione più a sud è stata a {contest.location.location} nel{" "}
            <Link href={`/contest/${contest.year}`} className="link">
              {contest.year}
            </Link>
            .
          </div>
        </CardBody>
      </Card>
    );
  }

  if ("most_used_location" in stat) {
    const { location, years } = stat.most_used_location;
    return (
      <Card className="!flex-col">
        <ItalyMap className="mx-auto mt-4 max-h-64 max-w-64">
          <Annotation
            subject={[location.longitude!, location.latitude!]}
            dx={30}
            dy={30}
            curve={-0.5}
            connectorProps={{ className: "stroke-error stroke-2 [stroke-linecap:round]" }}
            markerEnd="url(#arrow)">
            <defs>
              <marker id="arrow" orient="auto" markerWidth="3" markerHeight="4" refX="0.1" refY="2">
                <path d="M0,0 V4 L2,2 Z" className="fill-error" />
              </marker>
            </defs>
            <text
              x={-20}
              y={10}
              textAnchor="start"
              alignmentBaseline="middle"
              className="fill-error text-sm">
              {location.location}
            </text>
          </Annotation>
        </ItalyMap>
        <CardBody title={location.location}>
          <div>
            {location.location} ha ospitato le edizioni{" "}
            {years.slice(0, -1).map((year) => (
              <Fragment key={year}>
                <Link href={`/contest/${year}`} className="link">
                  {year}
                </Link>
                ,{" "}
              </Fragment>
            ))}{" "}
            e{" "}
            <Link href={`/contest/${years.at(-1)}`} className="link">
              {years.at(-1)}
            </Link>
            .
          </div>
        </CardBody>
      </Card>
    );
  }

  if ("num_boys_girls" in stat) {
    return (
      <Card className="!flex-col">
        <CardBody title="Partecipanti per genere">
          <ResponsiveContainer height={300}>
            <AreaChart
              width={300}
              height={350}
              data={stat.num_boys_girls.years}
              className="mx-auto">
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
        </CardBody>
      </Card>
    );
  }

  if ("num_participants_per_year" in stat) {
    return (
      <Card className="!flex-col">
        <CardBody title="Partecipanti per anno">
          <ResponsiveContainer height={300}>
            <AreaChart data={stat.num_participants_per_year.years}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis width={30} />
              <Tooltip />
              <Area type="monotone" dataKey="num_participants" stackId="1" name="Partecipanti" />
            </AreaChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    );
  }
}
