import React from "react";
import searchIcon from "../../../asset/search-icon.svg";
import mapPin from "../../../asset/map-pin.svg";
import Image from "next/image";
type Props = {};

const Search = (props: Props) => {
  return (
    <div className="my-10 flex justify-between items-center">
      <h1 className="text-light-text text-4xl font-medium">
        Explore Ongoing Campaigns
      </h1>
      <div className="flex items-center space-x-4">
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
