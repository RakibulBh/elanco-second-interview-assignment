import { Population } from "@/types";
import { HandCoins, MapPin, UsersRound } from "lucide-react";
import abbreviate from "number-abbreviate";

const CountryStatistics = ({
  capital,
  currency,
  population,
  populationLoading,
}: {
  capital: string;
  currency: string;
  population: Population[] | null;
  populationLoading: boolean;
}) => {
  const roundedNumber = population
    ? abbreviate(population[population.length - 1].value)
    : 0;
  return (
    <div className="flex items-center gap-1 md:gap-6 text-xs sm:text-sm">
      <div className="flex items-center gap-2 text-gray">
        <UsersRound />
        <p>
          {populationLoading
            ? "Loading..."
            : population
            ? roundedNumber
            : "N/A"}
        </p>
      </div>
      <div className="flex items-center gap-2 text-gray">
        <MapPin />
        <p>{capital}</p>
      </div>
      <div className="flex items-center gap-2 text-gray">
        <HandCoins />
        <p>{currency}</p>
      </div>
    </div>
  );
};

export default CountryStatistics;
