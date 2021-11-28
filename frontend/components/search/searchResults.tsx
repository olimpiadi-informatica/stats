import { ContestantListItem } from "components/contestantList/contestantListItem";
import { ContestListItem } from "components/contestList/contestListItem";
import { RegionListItem } from "components/regionList/regionListItem";
import { TasksListItem } from "components/tasksList/tasksListItem";
import { SearchResult, SearchResultList } from "lib/remote/search";
import { ListGroup } from "react-bootstrap";

function SearchResult({ result }: { result: SearchResult }) {
  if ("user" in result) {
    return <ContestantListItem user={result.user} />;
  }
  if ("task" in result) {
    return <TasksListItem task={result.task.task} />;
  }
  if ("contest" in result) {
    return <ContestListItem contest={result.contest} />;
  }
  if ("region" in result) {
    return <RegionListItem region={result.region} />;
  }
  return null;
}

export function SearchResults({ results }: { results: SearchResultList }) {
  return (
    <ListGroup variant="flush">
      {results.results.map((res) => (
        <ListGroup.Item key={JSON.stringify(res)}>
          <SearchResult result={res} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
