import Image from "next/image";
import React from "react";
import phImg from "../../../asset/robert-collins-tvc5imO5pXk-unsplash(1).jpg";
import mapIcon from "../../../asset/map-pin.svg";
import Button from "../../shared/Button/Button";
type Props = {};

const Campaigns = (props: Props) => {
  return (
    <div className="contain">
      <Card />
    </div>
  );
};

const Card = () => {
  return (
    <div className="w-[375px] bg-light-accent3 p-4 rounded-lg">
      <div>
        <Image className="rounded-lg" src={phImg} alt="kids" />
        <div className="py-4 space-y-4">
          <p className="text-[24px] font-medium text-light-text">
            AIDS foundation funding Africa
          </p>
          <div className="flex justify-between">
            <div className="flex space-x-2">
              <Image src={mapIcon} alt="icon" />
              <p>Mozambique</p>
            </div>
            <span>Health Care</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex py-8 justify-between items-center">
        <div>
          <div className="rounded-full w-12 h-12 bg-light-accent2 p-2 grid place-content-center">
            <div className="rounded-full w-10 h-10 grid place-content-center bg-light-accent3">
              30%
            </div>
          </div>
        </div>
        <div>
          <p className="bg-gradient-to-tr from-light-accent to-light-accent2 bg-clip-text text-transparent">
            Goal: $50,000
          </p>
          <p>Raised: $15, 000</p>
        </div>
        <div>
          <p>Donating to this project</p>
        </div>
      </div>
      <Button variant="contained">Donate</Button>
    </div>
  );
};

export default Campaigns;
