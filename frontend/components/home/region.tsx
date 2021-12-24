import {
  RegionWithMostFirstPlaces,
  RegionWithMostMedals,
  RegionWithMostMedalsPerParticipant,
  RegionWithMostParticipants,
  StatsRegion,
} from "lib/remote/home";
import { Tile } from "./tile";
import Link from "next/link";
import styles from "./tile.module.scss";
import { round } from "lib/round";

function RegionImage({ id }: { id: string }) {
  return (
    <Link href={`/region/${id}`}>
      <a>
        <img
          className={styles.image}
          src={`/static/regions/${id}.svg`}
          alt={id}
          onError={(event: any) => {
            event.target.style = "display: none";
          }}
        />
      </a>
    </Link>
  );
}

function RegionLink({ id, name }: { id: string; name: string }) {
  return <Link href={`/region/${id}`}>{name}</Link>;
}

function RegionWithMostMedalTile({ stat }: { stat: RegionWithMostMedals }) {
  const { first, second } = stat.region_with_most_medals;
  return (
    <div>
      <RegionImage id={first.id} />
      The region that won the highest number of medals is{" "}
      <RegionLink id={first.id} name={first.name} /> with{" "}
      {first.num_medals.gold} golds, {first.num_medals.silver} silvers and{" "}
      {first.num_medals.bronze} bronzes. At second place there is{" "}
      <RegionLink id={second.id} name={second.name} /> with respectivly{" "}
      {second.num_medals.gold}, {second.num_medals.silver} and{" "}
      {second.num_medals.bronze}.
    </div>
  );
}

function RegionWithMostMedalsPerParticipantTile({
  stat,
}: {
  stat: RegionWithMostMedalsPerParticipant;
}) {
  const region = stat.region_with_most_medals_per_participant;
  return (
    <div>
      <RegionImage id={region.id} />
      The region that won the highest number of medals per participant is{" "}
      <RegionLink id={region.id} name={region.name} />,{" "}
      {round(region.medals_per_participant * 100, 2)}% of the students won a
      medal.
    </div>
  );
}

function RegionWithMostFirstPlacesTile({
  stat,
}: {
  stat: RegionWithMostFirstPlaces;
}) {
  const region = stat.region_with_most_first_places;
  return (
    <div>
      <RegionImage id={region.id} />
      The region with the highest number of first places is{" "}
      <RegionLink id={region.id} name={region.name} />, with{" "}
      {region.num_first_places}.
    </div>
  );
}

function RegionWithMostParticipantsTile({
  stat,
}: {
  stat: RegionWithMostParticipants;
}) {
  const region = stat.region_with_most_participants;
  return (
    <div>
      <RegionImage id={region.id} />
      The region with the highest number of participants is{" "}
      <RegionLink id={region.id} name={region.name} />, with{" "}
      {region.num_participants}.
    </div>
  );
}

export function RegionTile({ stat }: { stat: StatsRegion }) {
  let content = null;
  if ("region_with_most_medals" in stat) {
    content = <RegionWithMostMedalTile stat={stat} />;
  }
  if ("region_with_most_medals_per_participant" in stat) {
    content = <RegionWithMostMedalsPerParticipantTile stat={stat} />;
  }
  if ("region_with_most_first_places" in stat) {
    content = <RegionWithMostFirstPlacesTile stat={stat} />;
  }
  if ("region_with_most_participants" in stat) {
    content = <RegionWithMostParticipantsTile stat={stat} />;
  }

  return <Tile variant="region">{content}</Tile>;
}
