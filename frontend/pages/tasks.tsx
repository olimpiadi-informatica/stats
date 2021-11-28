import { Layout } from "components/layout/layout";
import { Loading } from "components/loading/loading";
import { Error } from "components/error/error";
import Head from "next/head";
import commonStyles from "styles/common.module.scss";
import { TasksList } from "components/tasksList/tasksList";
import { useTaskList } from "lib/remote/task";

export default function Tasks() {
  const { data, isLoading, isError } = useTaskList();
  return (
    <Layout>
      <Head>
        <title>OII Stats - Tasks</title>
      </Head>
      <h1 className={commonStyles.pageHeader}>Tasks</h1>
      {isLoading && <Loading />}
      {isError && <Error error={isError} />}
      {data && <TasksList tasks={data.tasks.flatMap((t) => t.tasks)} />}
    </Layout>
  );
}
