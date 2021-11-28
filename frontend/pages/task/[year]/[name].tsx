import { Layout } from "components/layout/layout";
import { Task } from "components/task/task";
import { Error } from "lib/remote/common";
import { loadTask, TaskDetail } from "lib/remote/task";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

type Props = {
  task: TaskDetail | Error;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params) return { notFound: true };
  const contestYear = parseInt(params.year as string, 10);
  const name = params.name as string;
  if (Number.isNaN(contestYear) || !name) return { notFound: true };

  const task = await loadTask(contestYear, name);

  return {
    props: {
      task,
    },
  };
};

export default function TaskPage({ task }: Props) {
  if ("error" in task) {
    return (
      <Layout>
        <p>{task.error}</p>
      </Layout>
    );
  }
  return (
    <Layout>
      <Head>
        <title>OII Stats - {task.title}</title>
      </Head>
      <Task task={task} />
    </Layout>
  );
}
