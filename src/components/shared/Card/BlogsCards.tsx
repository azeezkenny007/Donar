import Image from "next/image";

interface IBlog {
  img: any;
  name: string;
  content: string;
  date: string;
}

const BlogCards = ({ content, date, img, name }: IBlog) => {
  return (
    <div className="bg-gradient-to-tr cursor-pointer from-light-accent p-0.5 to-light-accent2 max-w-xl  rounded-xl">
      <div className="flex flex-col lg:flex-row gap-4 bg-light-primary rounded-lg">
        <Image
          className="rounded-t-lg w-full lg:w-auto lg:rounded-l-lg lg:rounded-tr-none"
          src={img}
          alt={name}
        />
        <div className="text-base self-center px-4 lg:px-0 py-2 lg:py-0 space-y-2">
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

export default BlogCards;
