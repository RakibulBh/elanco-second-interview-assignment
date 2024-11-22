import React from "react";
import CountryStatistics from "./country-statistics";
import Title from "./title";

const CountryComponent = () => {
  return (
    <div className="py-4 px-2 rounded-lg bg-[#353340] flex gap-4">
      <div className="w-40 h-36 rounded-xl bg-red-200 flex-shrink-0" />
      {/* Country info */}
      <div className="space-y-2">
        <Title>Italy</Title>
        <CountryStatistics />
      </div>
    </div>
  );
};

export default CountryComponent;
