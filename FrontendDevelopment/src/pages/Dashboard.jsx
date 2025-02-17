import React, { useState } from "react";
import { DashboardForm } from "../components/Dashboard/DashboardForm";
import DashboardStarForm from "../components/Dashboard/DashboardStarForm";
import DashboardMetadata from "../components/Dashboard/DashboardMetadata";
import DashboardMovieForm from "../components/Dashboard/DashboardMovieForm";

export default function Dashboard() {
  const [admin, setAdmin] = useState(false);
  const [viewMeta, setViewMeta] = useState(true);

  if (!admin) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <p className="text-3xl mb-4">Employee Login</p>
        <DashboardForm setAdmin={setAdmin} />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center">
        <button
          className="bg-fabflix-primary text-xl p-4 mt-12 rounded-sm"
          onClick={() => {
            setViewMeta((prev) => !prev);
          }}
        >
          {viewMeta
            ? "Click to view Employee Controls"
            : "Click to view Metadata"}
        </button>
        {!viewMeta && (
          <>
            <h1 className="mt-12 mb-4 text-3xl">Employee Controls</h1>
            <div className="flex gap-24">
              <DashboardStarForm />
              <DashboardMovieForm />
            </div>
          </>
        )}
        {viewMeta && <DashboardMetadata />}
      </div>
    );
  }
}
