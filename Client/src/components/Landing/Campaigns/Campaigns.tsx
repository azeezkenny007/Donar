import Image from "next/image";
import React from "react";
import CampaignCard from "../../shared/Card/CampaignCards";
import {useDonar} from '../../../DonarBackend/Donar'

type Props = {};

const Campaigns = (props: Props) => {

  const { campaigns}= useDonar()
  return (
    <section className="contain my-20" id="#campaigns">
      <h1 className="text-light-text text-3xl lg:text-5xl mb-4 text-center font-semibold">
        Campaigns
      </h1>
      
     
      <div className="flex flex-wrap justify-between gap-4 " >
     
           <CampaignCard /> 
           <CampaignCard />
           <CampaignCard />
  
       
      </div>
    </section>
  );
};

export default Campaigns;
