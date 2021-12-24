import { Layout } from "components/layout/layout";
import Head from "next/head";
import commonStyles from "styles/common.module.scss";
import { Row, Col } from "react-bootstrap";

const GALLERY = [
  "gallery1.png",
  "gallery2.png",
  "gallery3.png",
  "gallery4.jpg",
];

export default function About() {
  return (
    <Layout>
      <Head>
        <title>OII Stats - About</title>
      </Head>
      <h1 className={commonStyles.pageHeader}>About</h1>
      <p>
        OII stats is a platform that was created to provide essential but
        reliable statistics on the progress of the national competitions of the
        Italian IT Olympics. The data are collected during the entire duration
        of the various tenders and contain all the information available to the
        staff of the Olympics tutors.
      </p>
      <h2 className={commonStyles.h2}>Gallery</h2>
      <Row>
        {GALLERY.map((img) => (
          <Col xs="12" md="4" key={img}>
            <img src={`/static/gallery/${img}`} alt="Gallery" />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}
