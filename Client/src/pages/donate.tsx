import React from "react";
import Layout from "../components/layout";
import MainHead from "../components/Donate/MainHead";
import OurBlog from "../components/Donate/OurBlog";
type Props = {};

const donate = (props: Props) => {
  return (
    <Layout>
      <section className="contain">
        <MainHead />
        {/* <OurBlog /> */}
      </section>
    </Layout>
  );
};

export default donate;
