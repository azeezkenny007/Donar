import Image from "next/image";
import React from "react";
import mapIcon from "../../asset/map-pin.svg";
import Avater1 from "../../asset/Ellipse 3.png";
import Avater2 from "../../asset/Ellipse 4.png";
import Avater3 from "../../asset/Ellipse 5.png";
import Avater4 from "../../asset/Ellipse 6.png";
import Button from "../shared/Button/Button";
type Props = {};

const Info = (props: Props) => {
  return (
    <div className="mt-8 max-w-lg">
      <div className="space-y-3">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl text-light-text font-bold">
            Feed the African child
          </h1>
          <div className="bg-light-secondary text-light-text text-xs rounded-full p-2">
            Community
          </div>
        </div>
        <p className="text-base leading-7 max-w-md text-light-text">
          This project aims to address the issue of severe, acute malnutrition
          which is a crisis among the children across Africa. Many children do
          not attend school as they are too hungry to concentrate, or get sent
          to school with empty bellies and no lunch or snacks. Through this
          project, we can provide food to more schools in impoverished areas,
          reaching more children who would otherwise go hungry.
        </p>
        <div className="flex space-x-2 text-light-text">
          <Image src={mapIcon} alt="icon" />
          <p className="font-medium">Mozambique</p>
        </div>
      </div>
      <div className="my-4 border-light-text border rounded-lg " />
      <div className="flex items-center justify-between mb-4 text-light-text">
        <div>
          <p className="fancy">Project Goal: $50,000</p>
          <div className="flex items-center gap-4">
            <p className="font-medium">Raised: $15, 000</p>
            <div className="rounded-full w-12 h-12 bg-light-accent2 p-2 grid place-content-center">
              <div className="rounded-full w-10 h-10 grid place-content-center bg-light-primary">
                30%
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="space-y-4">
            <p>Donating to this project</p>
            <div className="flex justify-end">
              <span>
                <Image src={Avater1} alt="image" />
              </span>
              <span className="-ml-3">
                {" "}
                <Image src={Avater2} alt="image" />
              </span>
              <span className="-ml-3">
                {" "}
                <Image src={Avater3} alt="image" />
              </span>
              <span className="-ml-3">
                {" "}
                <Image src={Avater4} alt="image" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <Button variant="contained">Donate now</Button>
    </div>
  );
};

export default Info;
