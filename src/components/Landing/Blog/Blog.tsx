import Image from "next/image";
import React from "react";
import pH from "../../../asset/pH.jpeg";
type Props = {};

const blog = [
  {
    img: pH,
    name: "Donate & Sponsor a Child in Africa",
    date: "November 3, 2022",
    content: `Save the Children is responding to the immense needs of
vulnerable African children and families by helping to improve access to healthcare and education.`,
  },
  {
    img: pH,
    name: "Donate & Sponsor a Child in Africa",
    date: "November 3, 2022",
    content: `Save the Children is responding to the immense needs of
vulnerable African children and families by helping to improve access to healthcare and education.`,
  },
  {
    img: pH,
    name: "Donate & Sponsor a Child in Africa",
    date: "November 3, 2022",
    content: `Save the Children is responding to the immense needs of
vulnerable African children and families by helping to improve access to healthcare and education.`,
  },
];

const Blog = (props: Props) => {
  return (
    <section className="contain my-20">
      <h1 className="text-light-text text-5xl font-medium text-center contain ">
        Recent Blog
      </h1>
      <div className="py-10 flex gap-4 items-center justify-between">
        <div>
          <div className="w-[577px] rounded-xl border border-light-accent">
            <Image className="rounded-t-lg w-full" src={pH} alt="image" />
            <div className="p-6 text-text space-y-4">
              <p className="bg-gradient-to-tr from-light-accent to-light-accent2 bg-clip-text text-transparent">
                November 3, 2022
              </p>
              <p className="text-light-text">
                Donate & Sponsor a Child in Africa
              </p>
              <p className="text-base leading-6 text-light-text">
                Save the Children is responding to the immense needs of
                vulnerable African children and families by helping to improve
                access to healthcare and education.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          {blog.map((item) => {
            return (
              <Blogs
                name={item.name}
                content={item.content}
                date={item.date}
                img={item.img}
                key={item.name}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface IBlog {
  img: any;
  name: string;
  content: string;
  date: string;
}

const Blogs = ({ content, date, img, name }: IBlog) => {
  return (
    <div className="bg-gradient-to-tr from-light-accent p-0.5 to-light-accent2  rounded-xl">
      <div className="flex  gap-4 bg-light-primary rounded-lg">
        <Image className="rounded-l-lg" src={img} alt={name} />
        <div className="text-base self-center space-y-2">
          <p className="bg-gradient-to-tr from-light-accent to-light-accent2 bg-clip-text text-transparent">
            {date}
          </p>
          <p className="text-light-text">{name}</p>
          <p className="text-sm leading-6 text-light-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
