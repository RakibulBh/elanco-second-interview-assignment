"use client";

import React, { useEffect, useState } from "react";
import CountryComponent from "./country-component";
import axios from "axios";
import { Country } from "@/types";
import Filters from "./filters";

import { Skeleton } from "@/components/ui/skeleton";

const baseURL =
  "https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,capital";

const CountriesList = ({
  handleCountryClick,
}: {
  handleCountryClick: ({ LngLat }: { LngLat: [number, number] }) => void;
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sorAsc, setSortAsc] = useState<boolean>(true);

  useEffect(() => {
    axios.get(`${baseURL}`).then((response) => {
      setCountries(response.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col w-2/5 min-h-0 gap-4">
      <h2 className="text-white text-2xl">Countries</h2>
      <Filters />
      <div className="flex flex-col gap-4 overflow-y-auto min-h-0 flex-1">
        {!loading
          ? countries.map((country, index) => (
              <CountryComponent
                handleCountryClick={handleCountryClick}
                key={index}
                country={country}
              />
            ))
          : Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                className="w-full h-32 rounded-md bg-gray"
                key={index}
              />
            ))}
      </div>
    </div>
  );
};

export default CountriesList;
