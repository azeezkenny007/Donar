import Image from "next/image";

interface IBlog {
  img: any;
  name: string;
  content: string;
  date: string;
}

const BlogCards = ({ content, date, img, name }: IBlog) => {
  return (
    <div className="bg-gradient-to-tr from-light-accent p-0.5 to-light-accent2 max-w-xl  rounded-xl">
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

export default BlogCards;
