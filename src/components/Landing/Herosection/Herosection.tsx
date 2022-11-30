import React from "react";
import Button from "../../shared/Button/Button";
import heroImg from "../../../asset/african-kids-1024x679 1.png";
import Image from "next/image";
type Props = {};

const Herosection = (props: Props) => {
  return (
    <section className="flex items-center justify-between pl-8 md:pl-12 lg:pl-24">
      <div className="text-light-text space-y-6 max-w-[600px] w-full">
        <p className="font-normal text-[48px] leading-[72px] ">
          Donate to earn
        </p>
        <p className="text-[60px] font-bold leading-[83px]">
          Change the world, one human at a time.
        </p>
        <p className="text-[20px] leading-[38px]">
          Earn rewards while donating to a worthy cause. Donate from anywhere
          around the world with crypto, no intermediaries, no charges.
        </p>
        <div className="flex space-x-4 items-center">
          <Button variant="contained">Donate Now</Button>
          <Button variant="outlined">Explore Campaingns</Button>
        </div>
      </div>
      <div>
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
