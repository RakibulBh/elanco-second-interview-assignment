"use client";

import React, { useEffect, useState } from "react";
import CountryComponent from "./country-component";
import axios from "axios";
import { Country } from "@/types";

const baseURL =
  "https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,capital";

const CountriesList = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    axios
      .get(`${baseURL}`)
      .then((response) => setCountries(response.data.data));
  }, []);

  return (
    <div className="flex flex-col w-2/5 min-h-0">
      <h2 className="text-white text-2xl mb-6">Countries</h2>
      <div className="flex flex-col gap-4 overflow-y-auto min-h-0 flex-1">
        {countries &&
          countries.map((country, index) => (
            <CountryComponent key={index} country={country} />
          ))}
      </div>
    </div>
  );
};

export default CountriesList;
