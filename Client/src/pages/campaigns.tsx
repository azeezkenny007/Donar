import React from "react";
import Layout from "../components/layout";
import { Filter, Search, CampaignLists } from "../components/Campaign";
type Props = {};

const campaigns = (props: Props) => {
  return (
    <Layout>
      <section className="contain">
        <Search />
        <Filter />
        <CampaignLists />
      </section>
    </Layout>
  );
};

export default campaigns;
