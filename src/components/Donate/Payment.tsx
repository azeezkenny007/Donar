import Image from "next/image";
import React from "react";
import polygonIcon from "../../asset/polygon.svg";
import paymentIcon from "../../asset/payment.svg";
import Button from "../shared/Button/Button";
type Props = {};

const Payment = (props: Props) => {
  return (
    <div>
      <h1 className="text-light-text text-2xl font-semibold">
        Donate to feed the African Child Project
      </h1>
      <div className="space-y-4 my-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-[207px] text-light-text bg-light-neutral2 py-4 px-6 rounded-l-full">
            <Image src={polygonIcon} alt="polygon" />
            <p>Polygon Address</p>
          </div>
          <div className="py-4 px-6 rounded-r-full">
            0xb794f5ea0ba39494ce839613fffba742795792
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center bg-light-neutral2 text-light-text py-4 px-6 rounded-l-full min-w-[207px]">
            <Image src={paymentIcon} alt="payment" />
            <p>Amount</p>
          </div>
          <div>50 Matric</div>
          <div className="rounded-r-full bg-light-accent4 py-4 px-6 ">
            90.90 USD
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="p-2 min-w-[100px] text-center text-sm rounded-full bg-light-accent4 text-light-text">
          50 Matric
        </span>
        <span className="p-2 min-w-[100px] text-center text-sm rounded-full bg-light-accent4 text-light-text">
          100 Matric
        </span>
        <span className="p-2 min-w-[100px] text-center text-sm rounded-full bg-light-accent4 text-light-text">
          200 Matric
        </span>
        <span className="p-2 min-w-[100px] text-center text-sm rounded-full bg-light-accent4 text-light-text">
          500 Matric
        </span>
        <span className="p-2 min-w-[100px] text-center text-sm rounded-full bg-light-accent4 text-light-text">
          1000 Matric
        </span>
      </div>
      <div className="flex items-center gap-2 my-8">
        <input type="checkbox" name="" id="" />
        <p>Donate Anonymously</p>
      </div>
      <Button variant="contained">Make Donation</Button>
    </div>
  );
};

export default Payment;
