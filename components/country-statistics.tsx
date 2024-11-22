import { Population } from "@/types";
import { HandCoins, MapPin, UsersRound } from "lucide-react";

const CountryStatistics = ({
  capital,
  currency,
  population,
}: {
  capital: string;
  currency: string;
  population: Population[] | null;
}) => {
  return (
    <div className="flex items-center gap-1 md:gap-6 text-xs sm:text-sm">
      <div className="flex items-center gap-2 text-gray">
        <UsersRound />

        <p>{population ? population[population.length - 1].value : "N/A"}</p>
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
