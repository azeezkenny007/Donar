import React from "react";
import BlogCards from "../shared/Card/BlogsCards";
import pH from "../../asset/pH.jpeg";

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

const OurBlog = (props: Props) => {
  return (
    <section className="my-20">
      <h1 className="text-light-text text-4xl font-semibold my-4">Our Blog</h1>
      <div className="flex gap-4 flex-wrap">
        {blog.map((item) => {
          return (
            <BlogCards
              name={item.name}
              content={item.content}
              date={item.date}
              img={item.img}
              key={item.name}
            />
          );
        })}
      </div>
    </section>
  );
};

export default OurBlog;
