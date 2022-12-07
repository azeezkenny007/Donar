import Link from "next/link";
import React, { useState } from "react";
import BrandLogo from "../../shared/BrandLogo";
import Button from "../../shared/Button/Button";
import Popup from "./Popup";
import { useDonar } from "../../../DonarBackend/Donar";
import truncate from "../../../utils/trancate";
import avater from "../../../asset/Ellipse 5.png";
import { AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const Navbar = () => {
  const [toogle, setToogle] = useState(false);
  const { connected } = useDonar();
  console.log(connected);

  return (
    <nav className="flex z-30 justify-between py-8 contain items-center">
      <BrandLogo />
      <ul className="hidden lg:flex space-x-6 items-center text-text tracking-tight font-head text-light-text">
        <li>
          <ScrollLink
            activeClass="active"
            to="#testimonials"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
          <Link href="#home">Home</Link>

          </ScrollLink>
        </li>
        <li>
        <ScrollLink
            activeClass="active"
            to="#about"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
        
          <Link href="#donateSection">About</Link>

          </ScrollLink>
        </li>
        <li>
        <ScrollLink
            activeClass="active"
            to="#campaigns"
            spy={true}
            smooth={true}
            offset={-70}
            duration={600}
          >
      
          <Link href="#campaigns">Campaigns</Link>

          </ScrollLink>
        </li>
        <li>
        <ScrollLink
            activeClass="active"
            to="#blog"
            spy={true}
            smooth={true}
            offset={-70}
            duration={600}
          >

          <Link href="#blog">Blog</Link>
          </ScrollLink>
        </li>
      </ul>
      {connected ? (
        <div className="flex gap-2">
          <Image src={avater} alt="avater" />
          <p>{truncate(connected, 10)}</p>
        </div>
      ) : (
        <Link href="/connet" className="hidden lg:flex max-w-lg">
          <Button variant="outlined">Connect wallet</Button>
        </Link>
      )}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-10 h-10 lg:hidden cursor-pointer"
        onClick={() => setToogle(true)}
      >
        <path
          fillRule="evenodd"
          d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
          clipRule="evenodd"
        />
      </svg>
      {toogle && <Popup setToogle={setToogle} />}
    </nav>
  );
};

export default Navbar;
