import Link from "next/link";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../../shared/Button/Button";
type Props = {
  setToogle: React.Dispatch<React.SetStateAction<boolean>>;
};

const Popup = ({ setToogle }: Props) => {
  return (
    <section className="fixed z-40 px-4 bg-black/20 top-0 bottom-0 left-0 right-0">
      <div className="w-2/3 h-full grid place-content-center bg-light-neutral absolute right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-10 absolute right-4 top-4 cursor-pointer"
          onClick={() => setToogle(false)}>
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>

        <div className="space-y-4">
          <ul className=" fancy space-y-4 text-center items-center text-text tracking-tight font-head text-light-text">
            <li className="text-3xl ">
              <Link href="#">Home</Link>
            </li>
            <li className="text-3xl ">
              <Link href="#">About</Link>
            </li>
            <li className="text-3xl ">
              <Link href="#">Campaigns</Link>
            </li>
            <li className="text-3xl ">
              <Link href="#">Blog</Link>
            </li>
          </ul>
          <Link
            href="/connet"
            className="max-w-sm absolute left-4 right-4 bottom-10">
            <Button variant="outlined">Connect wallet</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Popup;
