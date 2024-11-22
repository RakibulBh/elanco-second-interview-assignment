"use client";
import React, { use, useEffect, useState } from "react";
import CountryStatistics from "./country-statistics";
import Title from "./title";
import axios from "axios";
import { Country, Population } from "@/types";
import Image from "next/image";

const populationURL =
  "https://countriesnow.space/api/v0.1/countries/population";
const positionURL = "https://countriesnow.space/api/v0.1/countries/positions";

const CountryComponent = ({
  country,
  handleCountryClick,
}: {
  country: Country;
  handleCountryClick: ({ LngLat }: { LngLat: [number, number] }) => void;
}) => {
  const [population, setPopulation] = useState<Population[] | null>(null);
  const [populationLoading, setPopulationLoading] = useState<boolean>(true);
  const [LngLat, setLngLat] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    axios
      .post(populationURL, {
        country: country.name.toLowerCase(),
      })
      .then((response) => {
        setPopulationLoading(false);
        setPopulation(response.data.data.populationCounts);
      })
      .catch((response) => {
        setPopulationLoading(false);
        setPopulation(null);
      });
  }, []);

  useEffect(() => {
    axios
      .post(positionURL, {
        country: country.name.toLowerCase(),
      })
      .then(({ data }) => {
        const { lat, long } = data.data;
        setLngLat([long, lat]);
      })
      .catch(() => setLngLat([0, 0]));
  }, []);

  return (
    <div
      onClick={() => handleCountryClick({ LngLat })}
      className="py-4 px-2 rounded-lg bg-[#353340] flex gap-4 hover:cursor-pointer hover:bg-[#3C3E4A] border-2 border-transparent hover:border-white hover:border-opacity-10"
    >
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
          populationLoading={populationLoading}
          population={population}
        />
      </div>
    </div>
  );
};

export default CountryComponent;
