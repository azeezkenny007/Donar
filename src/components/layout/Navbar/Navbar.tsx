import Link from "next/link";
import React from "react";
import BrandLogo from "../../shared/BrandLogo";

const Navbar = () => {
  return (
    <nav className="flex justify-between py-16 px-32 items-center">
      <BrandLogo />
      <ul className="flex space-x-6 items-center text-text tracking-tight font-head text-white">
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
      <Gbutton />
    </nav>
  );
};

export default Navbar;

const Gbutton = () => {
  return (
    <div className="bg-gradient-to-r from-dark-accent to-dark-accent2 p-0.5 rounded-lg">
      <div className="bg-dark-primary px-7 py-3 rounded-md">
        <button className="bg-gradient-to-r text-text from-dark-accent to-dark-accent2 bg-clip-text text-transparent">
          Connect wallet
        </button>
      </div>
    </div>
  );
};

/**font-family: Play;
font-size: 20px;
font-weight: 400;
line-height: 48px;
letter-spacing: -0.022em;
text-align: center;
 */
