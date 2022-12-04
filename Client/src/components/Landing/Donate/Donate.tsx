import React from "react";
import Button from "../../shared/Button/Button";
import sectionImg from "../../../asset/donate.png";
import Image from "next/image";

type Props = {};

const Donate = (props: Props) => {
  return (
    <section className="contain my-10 lg:my-20 flex flex-col lg:flex-row items-center justify-between">
      <div className="w-full">
        <Image src={sectionImg} alt="img" />
      </div>
      <div className="text-light-text w-full flex justify-end">
        <div className="max-w-sm">
          <h1 className="text-3xl lg:text-[36px] text-center lg:text-left my-3 font-medium lg:leading-[42px]">
            Reaching out to communities in need
          </h1>
          <p className="lg:text-text leading-7 text-center lg:text-left text-light-text/90 mb-8 lg:leading-8">
            We connect organizations with people who want to lend a hand. Help
            grant life-changing wishes for children with critical illnesses.
            During this uncertain time, more children need your help. Lend a
            hand, and earn rewards while at it.
          </p>
          <div className="max-w-sm">
            <Button variant="contained">Donate</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;
