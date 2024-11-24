import { Population } from "@/types";
import { HandCoins, MapPin, UsersRound } from "lucide-react";
import abbreviate from "number-abbreviate";

const CountryStatistics = ({
  capital,
  currency,
  population,
}: {
  capital: string;
  currency: string;
  population: number;
}) => {
  const roundedNumber = population ? abbreviate(population) : "N/A";
  return (
    <div className="flex items-center gap-1 md:gap-6 text-xs sm:text-sm">
      <div className="flex items-center gap-2 text-gray">
        <UsersRound />
        <p>{roundedNumber}</p>
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
