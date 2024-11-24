import { SortAsc, SortDesc } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const FilterButton = ({
  children,
  asc,
  onClick,
}: {
  children: React.ReactNode;
  asc: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="flex gap-2 items-center p-2 bg-[#353340] hover:bg-[#3C3E4A] hover:border-white border-transparent border-2 border-opacity-5 rounded-md text-white hover:cursor-pointer"
    >
      <div className="flex items-center justify-center">
        {asc ? (
          <SortAsc className="bg-[#FF5700] rounded-full p-1" />
        ) : (
          <SortDesc className="bg-[#FF5700] rounded-full p-1" />
        )}
      </div>
      <p className="">{children}</p>
    </div>
  );
};

const Filters = ({
  onPopulationSort,
  onNameSort,
  sortPopAsc,
  sortNameAsc,
}: {
  onPopulationSort: () => void;
  onNameSort: () => void;
  sortPopAsc: boolean;
  sortNameAsc: boolean;
}) => {
  return (
    <div className="flex gap-2">
      <FilterButton onClick={onPopulationSort} asc={sortPopAsc}>
        Sort by Population
      </FilterButton>
      <FilterButton onClick={onNameSort} asc={sortNameAsc}>
        Sort by Name
      </FilterButton>
    </div>
  );
};

export default Filters;
