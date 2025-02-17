import React, { useState } from "react";
import { DashboardForm } from "../components/Dashboard/DashboardForm";
import DashboardStarForm from "../components/Dashboard/DashboardStarForm";
import DashboardMetadata from "../components/Dashboard/DashboardMetadata";
import DashboardMovieForm from "../components/Dashboard/DashboardMovieForm";

export default function Dashboard() {
  const [admin, setAdmin] = useState(false);

  if (!admin) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <DashboardForm setAdmin={setAdmin} />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center">
        <div className="flex">
          <DashboardStarForm />
          <DashboardMovieForm />
        </div>
        <DashboardMetadata />
      </div>
    );
  }
}
