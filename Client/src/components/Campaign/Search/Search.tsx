import React from "react";
import searchIcon from "../../../asset/search-icon.svg";
import mapPin from "../../../asset/map-pin.svg";
import Image from "next/image";
type Props = {};

const Search = (props: Props) => {
  return (
    <div className="my-10 flex gap-4 lg:gap-0 flex-col lg:flex-row justify-between lg:items-center">
      <h1 className="text-light-text text-4xl font-medium">
        Explore Ongoing Campaigns
      </h1>
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex p-2 items-center  gap-2 border border-light-accent rounded-md">
          <Image src={searchIcon} alt="search" width={16} height={16} />
          <input
            className="text-light-text focus:outline-none"
            type="search"
            placeholder="Search"
          />
        </div>
        <div className="flex p-2 items-center gap-2 border text-center border-light-accent rounded-md">
          <Image src={mapPin} alt="mapPin" width={16} height={16} />
          <input
            className=" text-light-text focus:outline-none"
            type="search"
            placeholder="Location"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
