import React, { useEffect, useState } from "react";
import Metadata from "./Metadata";

export default function DashboardMetadata() {
  const [tables, setTables] = useState(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch("/fabflix/api/metadata");

        if (!response) {
          throw new Error("Could not fetch table metadata");
        }

        const data = await response.json();
        setTables(data.tables);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMetadata();
  }, []);

  return (
    <div className="flex flex-col items-center mt-12 pb-12">
      <h1 className="text-center text-3xl">Metadata</h1>
      <div className="grid grid-cols-3 gap-12 w-[80vw]">
        {tables &&
          tables.map((table) => {
            return (
              <div key={table.table_name}>
                <Metadata
                  tableName={table.table_name}
                  columns={table.columns}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
