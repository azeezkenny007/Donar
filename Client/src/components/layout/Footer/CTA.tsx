import React from "react";
import Button from "../../shared/Button/Button";

type Props = {};

const CTA = (props: Props) => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 items-center justify-between bg-dark-accent px-6 py-9 md:px-12  md:py-16 rounded-md">
      <div className="space-y-2 text-center lg:text-left">
        <p className="text-lg md:text-3xl tracking-tight font-semibold text-dark-primary">
          Running a charity organization?
        </p>
        <p className=" text-sm md:text-base font-normal tracking-tight text-dark-primary">
          Let’s connect you to the community
        </p>
      </div>
      <div className="max-w-lg">
        <Button variant="contained">Start Fundraising</Button>
      </div>
    </div>
  );
};

/*
//styleName: BodyText3/16/Manrope/regular;
font-family: Manrope;
font-size: 16px;
font-weight: 400;
line-height: 43px;
letter-spacing: -0.022em;
text-align: left;

 */

export default CTA;
