import React from "react";

type Props = {};

const options = [
  "All",
  "Healthcare",
  "Community",
  "Education",
  "Education",
  "Education",
  "Education",
  "Education",
];

const Filter = (props: Props) => {
  return (
    <section className="flex my-12 flex-wrap gap-y-4 justify-between">
      {options.map((option) => (
        <Option key={option} text={option} />
      ))}
    </section>
  );
};

export default Filter;

interface IOptions {
  text: string;
}

const Option = ({ text }: IOptions) => {
  return (
    <div
      className="text-light-text min-w-[250px] text-center cursor-pointer
    bg-transparent hover:bg-gradient-to-r hover:from-light-accent hover:to-light-accent2 transition-all duration-200 ease-in-out text-lg font-medium border border-light-accent py-4 px-8 rounded-full">
      {text}
    </div>
  );
};
