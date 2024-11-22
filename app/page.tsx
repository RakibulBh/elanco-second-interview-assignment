import CountriesList from "@/components/countries-list";
import Map from "@/components/map";
import SearchBar from "@/components/search-bar";

export default function Home() {
  return (
    <main className="px-20 py-10 bg-[#242230] h-screen flex flex-col gap-10">
      <SearchBar />
      <section className="flex flex-1 gap-8 min-h-0">
        <CountriesList />
        <Map />
      </section>
    </main>
  );
}
