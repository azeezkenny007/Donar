import Image from "next/image";
import React, { useState, useEffect } from "react";
import organization from "../../../asset/customer.svg";
import hex from "../../../asset/hexagonal.svg";
import money from "../../../asset/money-bag.svg";
import social from "../../../asset/social-care.svg";
import gsap from "gsap-trial";
import ScrollTrigger from "gsap-trial/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    icons: organization,
    number: 50,
    addon: "+",
    name: "organization",
  },
  {
    icons: money,
    number: 300,
    addon: "",
    name: "Campaigns",
  },

  {
    icons: hex,
    number: 3000,
    addon: "+",
    name: " Donors",
  },
  {
    icons: social,
    number: 500,
    addon: "K USD",
    name: "Raised",
  },
];

const Stats = () => {
  return (
    <section
      id="statTrigger"
      className="bg-light-secondary  my-10 py-8  md:py-16 lg:my-24">
      <div className=" flex flex-wrap lg:flex-nowrap items-center gap-3 contain justify-evenly lg:justify-between">
        {items.map((item) => {
          return (
            <Items
              icon={item.icons}
              name={item.name}
              number={item.number}
              key={item.name}
              addon={item.addon}
            />
          );
        })}
      </div>
    </section>
  );
};

type TItem = {
  icon: any;
  number: number;
  name: string;
  addon: string;
};

const Items = ({ icon, name, number, addon }: TItem) => {
  useEffect(() => {
    const animation = gsap.fromTo(
      "#StatItem",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 0.5, stagger: { amount: 1 } }
    );
    ScrollTrigger.create({
      animation,
      start: "10% 60%",
      scrub: 0.2,
      end: "100% 60%",
      trigger: "#statTrigger",
    });
  }, []);

  return (
    <div
      id="StatItem"
      className="flex w-1/3 lg:w-full flex-col items-center space-y-4">
      <Image src={icon} alt={name} />
      <div className="text-light-text font-bold text-text lg:text-[28px] text-center mt-4">
        <p>
          {number}
          {addon}
        </p>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default Stats;
