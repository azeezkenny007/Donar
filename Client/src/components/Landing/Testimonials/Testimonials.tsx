import Image from "next/image";
import React from "react";
import avater from "../../../asset/Ellipse 13.svg";
type Props = {};

const Testimonials = (props: Props) => {
  return (
    <section className="contain my-10 lg:my-20 flex justify-center">
      <div className="bg-gradient-to-tr rounded-xl lg:w-2/3 from-light-accent p-0.5  to-light-accent2">
        <div className="bg-light-primary flex rounded-lg items-center gap-8 text-center flex-col px-12 py-8">
          <Image src={avater} alt="person" />
          <p className="max-w-lg leading-8">
            “Donating through donar assures me that my funds are going to the
            right places. It’s seamless, decentralized, and what’s even more? I
            get rewarded for it!”
          </p>
          <p className="fancy">Ronalds Richard</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
