"use client";
import React, { use, useEffect, useState } from "react";
import CountryStatistics from "./country-statistics";
import Title from "./title";
import axios from "axios";
import { Country, Population } from "@/types";
import Image from "next/image";

const baseURL = "https://countriesnow.space/api/v0.1/countries/population";

const CountryComponent = ({ country }: { country: Country }) => {
  const [population, setPopulation] = useState<Population[] | null>(null);

  useEffect(() => {
    axios
      .post(baseURL, {
        country: country.name.toLowerCase(),
      })
      .then((response) => setPopulation(response.data.data.populationCounts))
      .catch((response) => setPopulation(null));
  }, []);

  useEffect(() => {
    console.log(population);
  }, [population]);

  return (
    <div className="py-4 px-2 rounded-lg bg-[#353340] flex gap-4">
      {country.flag ? (
        <Image
          className="flex-shrink-0 rounded-xl"
          src={country.flag.trim()}
          width={100}
          height={100}
          placeholder="empty"
          alt="country-flag"
        />
      ) : (
        <div className="w-[100px]"></div>
      )}
      {/* Country info */}
      <div className="space-y-2">
        <Title>{country.name}</Title>
        <CountryStatistics
          capital={country.capital}
          currency={country.currency}
          population={population}
        />
      </div>
    </div>
  );
};

export default CountryComponent;
