import React, { useEffect } from "react";
import Button from "../../shared/Button/Button";
import heroImg from "../../../asset/african-kids-1024x679 1.png";
import Image from "next/image";
import gsap from "gsap-trial";
import Link from "next/link";

const Herosection = () => {
  useEffect(() => {
    gsap
      .timeline({ ease: "power2.out" })
      .fromTo(
        ".LeftPane_text",
        { opacity: 0, yPercent: 100 },
        { opacity: 1, yPercent: 0, stagger: { amount: 1, ease: "power2.out" } }
      )
      .fromTo("#HeroImage", { opacity: 0 }, { opacity: 1 }, "<70%");
  }, []);
  return (
    <section
      id="HeroSection"
      className="flex items-center justify-between px-8 lg:px-0 md:pl-12 lg:pl-24">
      <div
        id="LeftPane"
        className=" space-y-4 max-w-[600px]  lg:text-left w-full">
        <p
          id="LeftPane_subText"
          className="LeftPane_text text-light-text/80 font-normal text-3xl lg:text-[48px] lg:leading-[56px] ">
          Donate to earn
        </p>
        <p
          id="LeftPane_HeadText"
          className="LeftPane_text text-light-text text-5xl leading-[56px] lg:text-[60px] font-bold lg:leading-[68px]">
          Change the world, one human at a time.
        </p>
        <p
          id="LeftPane_infoText "
          className="LeftPane_text text-light-text/90 leading-7 lg:text-[20px] lg:leading-[38px]">
          Earn rewards while donating to a worthy cause. Donate from anywhere
          around the world with crypto, no intermediaries, no charges.
        </p>
        <div className="flex flex-col LeftPane_text lg:flex-row lg:space-x-4 space-y-3 lg:space-y-0 items-center">
          <Link className="w-full" href="/donate">
            <Button variant="contained">Donate Now</Button>
          </Link>
          <Link className="w-full" href="/campaigns">
            <Button variant="outlined">Explore Campaingns</Button>
          </Link>
        </div>
      </div>
      <div id="HeroImage" className="hidden lg:block">
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
