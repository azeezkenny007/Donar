import Image from "next/image";
import React from "react";
import CampaignCard from "../../shared/Card/CampaignCards";

type Props = {};

const Campaigns = (props: Props) => {
  return (
    <div className="contain flex flex-wrap justify-between my-20">
      <CampaignCard />
      <CampaignCard />
      <CampaignCard />
    </div>
  );
};

export default Campaigns;
