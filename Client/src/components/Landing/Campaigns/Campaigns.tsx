import Image from "next/image";
import React from "react";
import CampaignCard from "../../shared/Card/CampaignCards";
import {useDonar} from '../../../DonarBackend/Donar'
import { ContextNeeded, useFirebase } from "../../../DonarBackend/constants/Donar2";

type Props = {};

const Campaigns = (props: Props) => {
  const {campaigns,setCampaigns} = useFirebase() as ContextNeeded
  return (
    <section className="contain my-20" id="#campaigns">
      <h1 className="text-light-text text-3xl lg:text-5xl mb-4 text-center font-semibold">
        Campaigns
      </h1>
      
     
        {campaigns?.map((post,id)=>(
             <div className="flex flex-wrap justify-between gap-4 " >
                  <CampaignCard campaigns={post} /> 
        </div>
        ))}
           {/* <CampaignCard />
           <CampaignCard /> */}
  
       
    </section>
  );
};

export default Campaigns;
