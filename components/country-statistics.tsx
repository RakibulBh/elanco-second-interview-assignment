import { HandCoins, MapPin, UsersRound } from "lucide-react";

const CountryStatistics = () => {
  return (
    <div className="flex items-center gap-6 text-sm">
      <div className="flex items-center gap-2 text-gray">
        <UsersRound />
        <p>60M</p>
      </div>
      <div className="flex items-center gap-2 text-gray">
        <MapPin />
        <p>Rome</p>
      </div>
      <div className="flex items-center gap-2 text-gray">
        <HandCoins />
        <p>Euro</p>
      </div>
    </div>
  );
};

export default CountryStatistics;
