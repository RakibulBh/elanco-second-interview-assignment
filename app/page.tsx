"use client";
import CountriesList from "@/components/countries-list";
import Map from "@/components/map";
import SearchBar from "@/components/search-bar";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Home() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const INITIAL_CENTER: [number, number] = [0, 51.5781];
  const INITIAL_ZOOM = 10.12;

  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapboxgl.accessToken =
        "pk.eyJ1IjoicmFraWJ1bGIiLCJhIjoiY2xxcjI5ZGdnNGF2bjJpcnF1eHA4cWZoaiJ9.mD6cCIRIIEKvsMNNqzqXlw";

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: center,
        zoom: zoom,
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  const handleCountryClick = ({ LngLat }: { LngLat: [number, number] }) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: LngLat,
        zoom: 8,
      });
    }
  };

  return (
    <main className="px-20 py-10 bg-[#242230] h-screen flex flex-col gap-10">
      <SearchBar />
      <section className="flex flex-1 gap-8 min-h-0">
        <CountriesList handleCountryClick={handleCountryClick} />
        <Map ref={mapContainerRef} />
      </section>
    </main>
  );
}
