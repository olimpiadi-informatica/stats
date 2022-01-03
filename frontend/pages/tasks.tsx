import { Layout } from "components/layout/layout";
import Head from "next/head";
import commonStyles from "styles/common.module.scss";
import { TasksList } from "components/tasksList/tasksList";
import { getTaskList, TaskList } from "lib/remote/task";

export default function Tasks({ tasks }: { tasks: TaskList }) {
  return (
    <Layout>
      <Head>
        <title>OII Stats - Tasks</title>
      </Head>
      <h1 className={commonStyles.pageHeader}>Tasks</h1>
      <TasksList tasks={tasks.tasks.flatMap((t) => t.tasks)} />
    </Layout>
  );
}

export async function getStaticProps() {
  const tasks = await getTaskList();
  return {
    props: {
      tasks,
    },
  };
}
