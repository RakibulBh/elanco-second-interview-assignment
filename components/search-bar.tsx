import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex w-96 items-center gap-2 text-gray px-3 py-4 rounded-lg bg-[#35333E]">
      <Search />
      <input
        className="bg-transparent focus:outline-none"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBar;
