import React from "react";

export function BgMain ({children}) {
  return (
    <div className="flex justify-center text-4xl" style={{
      backgroundImage:
        "linear-gradient(rgba(3, 20, 50, 0.9), rgba(31, 33, 38, 1))," +
        "url(/fabflix/images/movieBg.jpg)",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      paddingTop: "7rem", paddingBottom: "70vh", overflow:"hidden"
    }}>
      {children}
    </div>
  );
}