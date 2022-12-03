import React from "react";
import infoIcon from "../../asset/info.svg";
import paymentIcon from "../../asset/payment.svg";
import confirmIcon from "../../asset/Confirm.svg";
import arrowIcon from "../../asset/arrowAlt.svg";
import Image from "next/image";

type Props = {};

const items = [
  {
    id: 1,
    name: "Info",
    img: infoIcon,
  },
  {
    id: 2,
    name: "payment",
    img: paymentIcon,
  },
  {
    id: 3,
    name: "confirm",
    img: confirmIcon,
  },
];

const Breadcrumb = (props: Props) => {
  return (
    <div className="flex items-center gap-4">
      {items.map((item) => {
        if (item.id !== 3) {
          return (
            <>
              <div
                className="flex items-center gap-4 justify-between"
                key={item.id}>
                <Image src={item.img} alt={item.name} />
                <p>{item.name}</p>
                <Image src={arrowIcon} alt="arr" />
              </div>
            </>
          );
        }
        return (
          <div
            className="flex items-center gap-4 justify-between"
            key={item.id}>
            <Image src={item.img} alt={item.name} />
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
