import React from "react";
import brandLogo from "../../../asset/donar.svg";
import Image from "next/image";
type Props = {};

const BrandLogo = (props: Props) => {
  return <Image src={brandLogo} alt="brandLogo" width={135} height={40} />;
};

export default BrandLogo;
