import React from "react";
import Button from "../../shared/Button/Button";
import heroImg from "../../../asset/african-kids-1024x679 1.png";
import Image from "next/image";
type Props = {};

const Herosection = (props: Props) => {
  return (
    <section className="flex items-center justify-between px-8 lg:px-0 md:pl-12 lg:pl-24">
      <div className=" space-y-4 max-w-[600px]  lg:text-left w-full">
        <p className="text-light-text/80 font-normal text-3xl lg:text-[48px] lg:leading-[56px] ">
          Donate to earn
        </p>
        <p className="text-light-text text-5xl leading-[56px] lg:text-[60px] font-bold lg:leading-[68px]">
          Change the world, one human at a time.
        </p>
        <p className="text-light-text/90 leading-7 lg:text-[20px] lg:leading-[38px]">
          Earn rewards while donating to a worthy cause. Donate from anywhere
          around the world with crypto, no intermediaries, no charges.
        </p>
        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-3 lg:space-y-0 items-center">
          <Button variant="contained">Donate Now</Button>
          <Button variant="outlined">Explore Campaingns</Button>
        </div>
      </div>
      <div className="hidden lg:block">
        <Image src={heroImg} alt="hero-img" width={600} />
      </div>
    </section>
  );
};

/**
font-family: Play;
font-size: 20px;
font-weight: 400;
line-height: 38px;
letter-spacing: -0.022em;
text-align: left;

 */

export default Herosection;
