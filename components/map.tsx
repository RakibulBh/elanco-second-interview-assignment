"use client";
import { useRef, useEffect, Ref } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ({ ref }: { ref: any }) => {
  return (
    <div
      ref={ref}
      id="map-container"
      className="flex-1 h-full bg-[#353340] rounded-md"
    />
  );
};

export default Map;
