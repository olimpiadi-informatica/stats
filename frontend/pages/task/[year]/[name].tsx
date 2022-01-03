import { Layout } from "components/layout/layout";
import { Task } from "components/task/task";
import { getTask, getTaskList, TaskDetail } from "lib/remote/task";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

type Props = {
  task: TaskDetail;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tasks = await getTaskList();
  return {
    paths: tasks.tasks.flatMap((y) =>
      y.tasks.map((t) => ({
        params: { year: y.year.toString(), name: t.name },
      }))
    ),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params) return { notFound: true };
  const contestYear = parseInt(params.year as string, 10);
  const name = params.name as string;
  if (Number.isNaN(contestYear) || !name) return { notFound: true };

  const task = await getTask(contestYear, name);

  return {
    props: {
      task,
    },
  };
};

export default function TaskPage({ task }: Props) {
  return (
    <Layout>
      <Head>
        <title>OII Stats - {task.title}</title>
      </Head>
      <Task task={task} />
    </Layout>
  );
}
