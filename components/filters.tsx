import { SortAsc, SortDesc } from "lucide-react";

const FilterButton = ({ asc }: { asc: boolean }) => {
  return (
    <div className="flex gap-2 items-center p-2 bg-[#353340] hover:bg-[#3C3E4A] hover:border-white border-transparent border-2 border-opacity-5 rounded-md text-white hover:cursor-pointer">
      <div className="flex items-center justify-center">
        {asc ? (
          <SortAsc className="bg-[#FF5700] rounded-full p-1" />
        ) : (
          <SortDesc className="bg-[#FF5700] rounded-full p-1" />
        )}
      </div>
      <p className="">Sort Population {asc ? "asc" : "desc"}</p>
    </div>
  );
};

const Filters = () => {
  return (
    <div className="flex gap-2">
      <FilterButton asc={true} />
      <FilterButton asc={false} />
    </div>
  );
};

export default Filters;
