import Image from "next/image";
import React from "react";
import organization from "../../../asset/customer.svg";
import hex from "../../../asset/hexagonal.svg";
import money from "../../../asset/money-bag.svg";
import social from "../../../asset/social-care.svg";

const items = [
  {
    icons: organization,
    number: "50+",
    name: "organization",
  },
  {
    icons: money,
    number: "300",
    name: "Campaigns",
  },

  {
    icons: hex,
    number: "3,000+",
    name: " Donors",
  },
  {
    icons: social,
    number: "500K USD",
    name: "Raised",
  },
];

const Stats = () => {
  return (
    <section className="bg-light-secondary my-10 py-8  md:py-16 lg:my-24">
      <div className=" flex flex-wrap lg:flex-nowrap items-center gap-3 contain justify-evenly lg:justify-between">
        {items.map((item) => {
          return (
            <Items
              icon={item.icons}
              name={item.name}
              number={item.number}
              key={item.name}
            />
          );
        })}
      </div>
    </section>
  );
};

type TItem = {
  icon: any;
  number: string;
  name: string;
};

const Items = ({ icon, name, number }: TItem) => {
  return (
    <div className="flex w-1/3 lg:w-full flex-col items-center space-y-4">
      <Image src={icon} alt={name} />
      <div className="text-light-text font-bold text-text lg:text-[28px] text-center mt-4">
        <p>{number}</p>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default Stats;
