import React from "react";
import MainImage from "../../asset/donateMain.png";
import Image from "next/image";
import Info from "./Info";
import Payment from "./Payment";
import Confirm from "./Confirm";
import Breadcrumb from "./Breadcrumb";
type Props = {};

const MainHead = (props: Props) => {
  return (
    <section className="flex items-center my-10">
      <div className="w-full">
        <Image src={MainImage} alt="main" width={500} />
      </div>
      <div className="w-full">
        <Breadcrumb />
        <div className="mt-8">
          <Info />
          {/* <Payment /> */}
          {/* <Confirm /> */}
        </div>
      </div>
    </section>
  );
};

export default MainHead;
