import Link from "next/link";
import React from "react";
import BrandLogo from "../../shared/BrandLogo";
import Button from "../../shared/Button/Button";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav className="flex justify-between py-8 contain items-center">
      <BrandLogo />
      <ul className="hidden lg:flex space-x-6 items-center text-text tracking-tight font-head text-light-text">
        <li>
          <Link href="#">Home</Link>
        </li>
        <li>
          <Link href="#">About</Link>
        </li>
        <li>
          <Link href="#">Campaigns</Link>
        </li>
        <li>
          <Link href="#">Blog</Link>
        </li>
      </ul>
      <Link href="/connet" className="hidden lg:flex max-w-lg">
        <Button variant="outlined">Connect wallet</Button>
      </Link>
      <AiOutlineMenu />
    </nav>
  );
};

export default Navbar;

/**font-family: Play;
font-size: 20px;
font-weight: 400;
line-height: 48px;
letter-spacing: -0.022em;
text-align: center;
 */
