import React from "react";
import BrandLogo from "../../shared/BrandLogo";
import twitter from "../../../asset/twitter.svg";
import discord from "../../../asset/Vector.svg";
import CTA from "./CTA";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="contain space-y-48">
      <CTA />
      <div className="flex justify-between items-center">
        <BrandLogo />
        <ul className="flex space-x-12 text-text items-center ">
          <li className="text-light-text">
            <Link href="#">Explore</Link>
          </li>
          <li className="text-light-text">
            <Link href="#">How It works</Link>
          </li>
          <li className="text-light-text">
            <Link href="#">Privacy Policy</Link>
          </li>
          <li className="text-light-text">
            <Link href="#">Community</Link>
          </li>
        </ul>
        <div className="flex space-x-20 items-center">
          <Image src={discord} alt="discord logo" width={100} height={100} />
          <Image src={twitter} alt="twitter logo" width={100} height={100} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
