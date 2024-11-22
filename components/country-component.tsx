"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryStatistics from "./country-statistics";
import Title from "./title";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { Country, Population } from "@/types";

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
  const [positionLoading, setPositionLoading] = useState<boolean>(true);
  const [LngLat, setLngLat] = useState<[number, number] | null>(null);

  useEffect(() => {
    axios
      .post(populationURL, {
        country: country.name.toLowerCase(),
      })
      .then((response) => {
        setPopulation(response.data.data.populationCounts || []);
        setPopulationLoading(false);
      })
      .catch(() => {
        setPopulation(null);
        setPopulationLoading(false);
      });
  }, [country.name]);

  useEffect(() => {
    axios
      .post(positionURL, {
        country: country.name.toLowerCase(),
      })
      .then(({ data }) => {
        const { lat, long } = data.data;
        setLngLat([long, lat]);
        setPositionLoading(false);
      })
      .catch(() => {
        setLngLat(null);
        setPositionLoading(false);
      });
  }, [country.name]);

  return (
    <div
      onClick={() => {
        if (!positionLoading && LngLat) {
          handleCountryClick({ LngLat });
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Position data is not loaded yet!",
          });
        }
      }}
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
