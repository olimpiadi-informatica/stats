import { Layout } from "components/layout/layout";
import Head from "next/head";
import commonStyles from "styles/common.module.scss";

export default function Contribute() {
  return (
    <Layout>
      <Head>
        <title>OII Stats - Contribute</title>
      </Head>
      <h1 className={commonStyles.pageHeader}>Contribute</h1>
      <p>
        You can contribute to OII Stats by sending us bug reports or missing
        data. Unfortunately not all the data of the previous editions have been
        found and your contribution would be a great help. Also if you want to
        see your picture appear among the participants, send it along with an
        authorization to process the data.
      </p>
      <p>
        Please send an email to <code>edoardo.morassutto@gmail.com</code>
      </p>
      <p>Thank you!</p>
    </Layout>
  );
}
