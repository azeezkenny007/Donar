import React, { useEffect } from "react";
import Button from "../../shared/Button/Button";
import sectionImg from "../../../asset/donate.png";
import bottomLeft from "../../../asset/bottom-left.png";
import bottomRight from "../../../asset/bottom-right.png";
import topLeft from "../../../asset/top-left.png";
import topRight from "../../../asset/top-right.png";
import Image from "next/image";
import gsap from "gsap-trial";
import ScrollTrigger from "gsap-trial/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
type Props = {};

const Donate = (props: Props) => {
  useEffect(() => {
    const animation = gsap
      .timeline({ defaults: { duration: 0.5 } })
      .fromTo("#topLeft", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1 })
      .fromTo(
        "#bottomRight",
        { opacity: 0, scale: 0.3 },
        { opacity: 1, scale: 1 }
      )
      .fromTo("#topRight", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1 })
      .fromTo(
        "#bottomLeft",
        { opacity: 0, scale: 0.3 },
        { opacity: 1, scale: 1 }
      );

    ScrollTrigger.create({
      trigger: "#donateSection",
      animation,
      start: "10% 70%",
      end: "90% 80%",
      scrub: 0.2,
    });
  }, []);
  return (
    <section
      id="donateSection"
      className="contain my-10 lg:my-20 flex flex-col lg:flex-row items-center justify-between">
      <div className="w-full grid grid-cols-2 gap-2 items-stretch">
        <Image id="topLeft" src={topLeft} alt="img" />
        <Image id="topRight" src={topRight} alt="img" />
        <Image id="bottomLeft" src={bottomLeft} alt="btimg" />
        <Image id="bottomRight" src={bottomRight} alt="img" />
      </div>
      <div className="text-light-text w-full flex justify-end">
        <div className="max-w-sm">
          <h1 className="text-3xl lg:text-[36px] text-center lg:text-left my-3 font-medium lg:leading-[42px]">
            Reaching out to communities in need
          </h1>
          <p className="lg:text-text leading-7 text-center lg:text-left text-light-text/90 mb-8 lg:leading-8">
            We connect organizations with people who want to lend a hand. Help
            grant life-changing wishes for children with critical illnesses.
            During this uncertain time, more children need your help. Lend a
            hand, and earn rewards while at it.
          </p>
          <div className="max-w-sm">
            <Button variant="contained">Donate</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;
