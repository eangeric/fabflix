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
    <div>
      {tables &&
        tables.map((table) => {
          return (
            <div key={table.table_name}>
              <Metadata tableName={table.table_name} columns={table.columns} />
            </div>
          );
        })}
    </div>
  );
}
