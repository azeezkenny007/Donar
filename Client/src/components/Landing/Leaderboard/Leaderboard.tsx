import Image from "next/image";
import React from "react";
import Avater1 from "../../../asset/Ellipse 7.svg";
import Avater2 from "../../../asset/Ellipse 8.svg";
import Avater3 from "../../../asset/Ellipse 9.svg";
import Avater4 from "../../../asset/Ellipse 10.svg";
import Avater5 from "../../../asset/Ellipse 11.svg";
import Avater6 from "../../../asset/Ellipse 13.svg";
type Props = {};

const donors = [
  {
    img: Avater1,
    name: "Ronald Richards",
    amount: "$15,000",
    rank: 1,
  },
  {
    img: Avater2,
    name: "Dianne Russell",
    amount: "$13,000",
    rank: 2,
  },
  {
    img: Avater3,
    name: "Wade Warren",
    amount: "$11,500",
    rank: 3,
  },
  {
    img: Avater4,
    name: "Savannah Nguy",
    amount: "$10,000",
    rank: 4,
  },
  {
    img: Avater5,
    name: "Marvin McKinney",
    amount: "$8,000",
    rank: 5,
  },
  {
    img: Avater6,
    name: "Eleanor Pena",
    amount: "$5,000",
    rank: 6,
  },
];

const Leaderboard = (props: Props) => {
  return (
    <div className=" py-10 lg:py-16 bg-light-secondary contain my-10 lg:my-20">
      <h1 className="text-4xl lg:text-[48px] text-light-text text-center font-semibold mb-10">
        Donors of the week
      </h1>
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-8">
        {donors.map((item) => {
          return (
            <Card
              amount={item.amount}
              img={item.img}
              name={item.name}
              key={item.name}
              rank={item.rank}
            />
          );
        })}
      </div>
    </div>
  );
};
4;
interface ICard {
  img: any;
  name: string;
  amount: string;
  rank: number;
}

const Card = ({ amount, img, name, rank }: ICard) => {
  return (
    <div className="flex items-center justify-between lg:w-96 bg-light-primary p-4 rounded-xl ">
      <div className="w-20 lg:w-[100px]">
        <Image src={img} alt="avater" />
      </div>
      <div className="text-light-text">
        <p className="font-semibold lg:text-text">{name}</p>
        <p className="text-lg">{amount}</p>
      </div>
      <p className="fancy">0{rank}</p>
    </div>
  );
};

export default Leaderboard;
