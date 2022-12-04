import React from "react";
import brandLogo from "../../../asset/donar.svg";
import Image from "next/image";
type Props = {};

const BrandLogo = (props: Props) => {
  return (
    <div className="w-20 lg:w-28">
      <Image src={brandLogo} alt="brandLogo" />
    </div>
  );
};

export default BrandLogo;
