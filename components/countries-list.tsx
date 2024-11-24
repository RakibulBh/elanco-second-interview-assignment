"use client";

import React, { useEffect, useState } from "react";
import CountryComponent from "./country-component";
import axios from "axios";
import { Country } from "@/types";
import Filters from "./filters";
import { Skeleton } from "@/components/ui/skeleton";

const baseURL =
  "https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,capital";
const populationURL =
  "https://countriesnow.space/api/v0.1/countries/population";

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
  const [sortPopAsc, setSortPopAsc] = useState<boolean>(true);
  const [sortNameAsc, setSortNameAsc] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesResponse = await axios.get(baseURL);
        const countriesData = countriesResponse.data.data;

        const countriesWithPopulation = await Promise.all(
          countriesData.map(async (country: Country) => {
            try {
              const populationResponse = await axios.post(populationURL, {
                country: country.name.toLowerCase(),
              });

              const populationCounts =
                populationResponse.data.data.populationCounts;

              return {
                ...country,
                population:
                  populationCounts && populationCounts.length > 0
                    ? populationCounts[populationCounts.length - 1].value
                    : 0,
              };
            } catch (error) {
              return {
                ...country,
                population: null,
              };
            }
          })
        );

        setCountries(countriesWithPopulation);
        setFilteredCountries(
          countriesWithPopulation.sort((a, b) => a.name.localeCompare(b.name))
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePopulationSort = () => {
    setFilteredCountries((prevCountries) => {
      const newCountries = [...prevCountries];
      return newCountries.sort((a, b) =>
        sortPopAsc ? b.population - a.population : a.population - b.population
      );
    });
    setSortPopAsc(!sortPopAsc);
  };

  const handleNameSort = () => {
    setFilteredCountries((prevCountries) => {
      const newCountries = [...prevCountries];
      return newCountries.sort((a, b) =>
        sortNameAsc
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name)
      );
    });
    setSortNameAsc(!sortNameAsc);
  };

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
      <Filters
        onNameSort={handleNameSort}
        onPopulationSort={handlePopulationSort}
        sortNameAsc={sortNameAsc}
        sortPopAsc={sortPopAsc}
      />
      <div className="flex flex-col gap-4 overflow-y-auto min-h-0 flex-1">
        {!loading
          ? filteredCountries.map((country) => (
              <CountryComponent
                handleCountryClick={handleCountryClick}
                key={country.name}
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
