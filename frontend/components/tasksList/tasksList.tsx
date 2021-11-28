import { ContestInfoTask } from "lib/remote/contest";
import { ListGroup } from "react-bootstrap";
import { TasksListItem } from "./tasksListItem";

type Props = {
  tasks: ContestInfoTask[];
};

export function TasksList({ tasks }: Props) {
  return (
    <ListGroup variant="flush">
      {tasks.map((task) => (
        <ListGroup.Item key={task.name}>
          <TasksListItem task={task} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
