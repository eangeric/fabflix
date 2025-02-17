import React from "react";

export default function Metadata({ tableName, columns }) {
  return (
    <div className="flex flex-col">
      <h1>{tableName}</h1>
      {columns.map((column) => {
        return (
          <div className="flex justify-center" key={column.className}>
            <div>{column.columnName}</div>
            <div>{column.dataType}</div>
          </div>
        );
      })}
    </div>
  );
}
