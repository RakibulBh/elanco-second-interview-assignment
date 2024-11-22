import React from "react";
import CountryComponent from "./country-component";

const CountriesList = () => {
  return (
    <div className="flex flex-col w-2/5 min-h-0">
      <h2 className="text-white text-2xl mb-6">Countries</h2>
      <div className="flex flex-col gap-4 overflow-y-auto min-h-0 flex-1">
        {Array.from({ length: 10 }).map((_, index) => (
          <CountryComponent key={index} />
        ))}
      </div>
    </div>
  );
};

export default CountriesList;
