import {
  ContestWithMostExAequo,
  ContestWithMostParticipants,
  MostGirls,
  MostNorthenContest,
  MostSouthernContest,
  MostUsedLocation,
  NumBoysGirls,
  NumParticipantsPerYear,
  StatsContest,
} from "lib/remote/home";
import { Tile } from "./tile";
import Link from "next/link";
import styles from "./tile.module.scss";
import { ContestLocation } from "lib/remote/contest";
import { SimpleMap } from "components/graphs/simpleMap";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ContestImage } from "components/contest/contestImage";

function ContestImageLink({ year }: { year: number }) {
  return (
    <Link href={`/contest/${year}`}>
      <a className={styles.image}>
        <ContestImage year={year} />
      </a>
    </Link>
  );
}

function ContestLink({ year }: { year: number }) {
  return (
    <Link href={`/contest/${year}`}>
      <a>{year}</a>
    </Link>
  );
}

function ContestLocation({ location }: { location: ContestLocation }) {
  if (location.latitude === null || location.longitude === null) return null;
  return <SimpleMap markers={[[location.latitude, location.longitude]]} />;
}

function ContestWithMostParticipantsTile({
  stat,
}: {
  stat: ContestWithMostParticipants;
}) {
  const { year, num_participants } = stat.contest_with_most_participants;
  return (
    <div>
      <ContestImageLink year={year} />
      The <ContestLink year={year} /> competition registered the highest number
      of contestants, {num_participants}!
    </div>
  );
}

function ContestWithMostExAequoTile({
  stat,
}: {
  stat: ContestWithMostExAequo;
}) {
  const { year, num_ex_aequo } = stat.contest_with_most_ex_aequo;
  return (
    <div>
      <ContestImageLink year={year} />
      {num_ex_aequo} is the highest number of ex-aequo, in{" "}
      <ContestLink year={year} /> all those students ended at the first place
      with the same score!
    </div>
  );
}

function MostNorthenContestTile({ stat }: { stat: MostNorthenContest }) {
  const { year, location } = stat.most_northern_contest;
  return (
    <div>
      <ContestLocation location={location} />
      The most northern contest was held in <ContestLink year={year} /> in{" "}
      {location.location}.
    </div>
  );
}

function MostSouthernContestTile({ stat }: { stat: MostSouthernContest }) {
  const { year, location } = stat.most_southern_contest;
  return (
    <div>
      <ContestLocation location={location} />
      The most southern contest was held in <ContestLink year={year} /> in{" "}
      {location.location}.
    </div>
  );
}

function NumBoysGirlsTile({ stat }: { stat: NumBoysGirls }) {
  return (
    <AreaChart
      width={300}
      height={350}
      data={stat.num_boys_girls.years}
      className={styles.image}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis width={30} />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="num_boys"
        stackId="1"
        stroke="#99ebff"
        fill="#99ebff"
        name="Boys"
      />
      <Area
        type="monotone"
        dataKey="num_girls"
        stackId="1"
        stroke="#ffb3cb"
        fill="#ffb3cb"
        name="Girls"
      />
    </AreaChart>
  );
}

function MostGirlsTile({ stat }: { stat: MostGirls }) {
  const { year, num_girls, num_participants } = stat.contest_with_most_girls;
  return (
    <div>
      <ContestImageLink year={year} />
      <ContestLink year={year} /> was the contest with the highest number of
      girl, {num_girls} out of {num_participants} participants!
    </div>
  );
}

function NumParticipantsPerYearTile({
  stat,
}: {
  stat: NumParticipantsPerYear;
}) {
  return (
    <AreaChart
      width={300}
      height={350}
      data={stat.num_participants_per_year.years}
      className={styles.image}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis width={30} />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="num_participants"
        stackId="1"
        stroke="#226600"
        fill="#4ce600"
        name="Participants"
      />
    </AreaChart>
  );
}

function MostUsedLocationTile({ stat }: { stat: MostUsedLocation }) {
  const { location, years } = stat.most_used_location;
  const years_but_last = years.slice(0, -2).map((year) => (
    <span key={`most-used-location-${year}`}>
      <ContestLink year={year} />,{" "}
    </span>
  ));
  years_but_last.push(
    <span key={`most-used-location-${years[years.length - 2]}`}>
      <ContestLink year={years[years.length - 2]} />
    </span>
  );
  // FIXME: the backend returns jibberish!
  return (
    <div>
      <ContestLocation location={location} />
      {location.location} is the most used location, it has beed used{" "}
      {years.length} times, in {years_but_last} and{" "}
      <ContestLink year={years[years.length - 1]} />.
    </div>
  );
}

export function ContestTile({ stat }: { stat: StatsContest }) {
  let content = null;
  if ("contest_with_most_participants" in stat) {
    content = <ContestWithMostParticipantsTile stat={stat} />;
  }
  if ("contest_with_most_ex_aequo" in stat) {
    content = <ContestWithMostExAequoTile stat={stat} />;
  }
  if ("most_northern_contest" in stat) {
    content = <MostNorthenContestTile stat={stat} />;
  }
  if ("most_southern_contest" in stat) {
    content = <MostSouthernContestTile stat={stat} />;
  }
  if ("num_boys_girls" in stat) {
    content = <NumBoysGirlsTile stat={stat} />;
  }
  if ("num_participants_per_year" in stat) {
    content = <NumParticipantsPerYearTile stat={stat} />;
  }
  if ("most_used_location" in stat) {
    content = <MostUsedLocationTile stat={stat} />;
  }
  if ("contest_with_most_girls" in stat) {
    content = <MostGirlsTile stat={stat} />;
  }

  return <Tile variant="contest">{content}</Tile>;
}
