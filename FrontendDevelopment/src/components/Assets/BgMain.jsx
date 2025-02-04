import React from "react";

export function BgMain({ children }) {
  return (
    <div className="relative min-h-[94vh]">
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url(/fabflix/images/movieBg.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(3,20,50,0.9)] to-[rgba(31,33,38,1)]" />
      <div className="relative flex justify-center items-center text-4xl min-h-[70vh] pt-16">
        {children}
      </div>
    </div>
  );
}
