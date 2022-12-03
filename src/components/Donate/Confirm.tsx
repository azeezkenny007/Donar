import React from "react";
import confirmIcon from "../../asset/ConfirmBig.svg";
import awardBig from "../../asset/award.svg";
import Image from "next/image";
import Button from "../shared/Button/Button";
type Props = {};

const Confirm = (props: Props) => {
  return (
    <div className="bg-light-accent4 text-light-text rounded-lg p-8 flex flex-col items-center space-y-2 text-center">
      <Image src={confirmIcon} alt="confirm" width={150} />
      <div className="space-y-1">
        <p>
          succesfully transfered{" "}
          <span className="font-semibold">50 Metics</span> to
        </p>
        <p>0xb794f5ea0ba39494ce839613fffba742795792</p>
      </div>
      <div className="space-y-1">
        <p>Thank you for donating to this project.</p>
        <p>
          You have been rewarded{" "}
          <span className="font-semibold">15.00 donar tokens</span>
        </p>
      </div>
      <Image src={awardBig} alt="award" width={50} />
      <div className="flex gap-4 items-center w-full">
        <Button variant="contained">Okay</Button>
        <Button variant="contained">View more</Button>
      </div>
    </div>
  );
};

export default Confirm;
