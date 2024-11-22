import { Search } from "lucide-react";

const SearchBar = ({
  setSearchTerm,
}: {
  setSearchTerm: (value: string) => void;
}) => {
  return (
    <div className="flex w-[30rem] items-center gap-2 text-gray px-3 py-4 rounded-lg bg-[#35333E]">
      <Search />
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-transparent focus:outline-none"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBar;
