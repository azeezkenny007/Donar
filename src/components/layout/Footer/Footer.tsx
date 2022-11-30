import React from "react";
import BrandLogo from "../../shared/BrandLogo";
import twitter from "../../../asset/twitter.svg";
import discord from "../../../asset/Vector.svg";
import CTA from "./CTA";
import Image from "next/image";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="contain space-y-48">
      <CTA />
      <div className="flex justify-between items-center">
        <BrandLogo />
        <div className="flex space-x-20 items-center">
          <Image src={discord} alt="discord logo" width={100} height={100} />
          <Image src={twitter} alt="twitter logo" width={100} height={100} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
