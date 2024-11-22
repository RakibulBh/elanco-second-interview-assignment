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
  searchTerm,
}: {
  handleCountryClick: ({ LngLat }: { LngLat: [number, number] }) => void;
  searchTerm: string;
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setCountries(response.data.data);
      setFilteredCountries(response.data.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [searchTerm, countries]);

  return (
    <div className="flex flex-col w-2/5 min-h-0 gap-4">
      <h2 className="text-white text-2xl">Countries</h2>
      <Filters />
      <div className="flex flex-col gap-4 overflow-y-auto min-h-0 flex-1">
        {!loading
          ? filteredCountries.map((country) => (
              <CountryComponent
                handleCountryClick={handleCountryClick}
                key={country.name} // Ensure unique keys
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
