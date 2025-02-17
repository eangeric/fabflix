import React from "react";

export default function Metadata({ tableName, columns }) {
  return (
    <div className="bg-fabflix-primary shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto mt-6">
      <h2 className="text-xl font-bold text-center mb-4">{tableName}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg">
          <thead className="bg-gray-300 text-fabflix-secondary">
            <tr>
              <th className="py-2 px-4 border-b">Column Name</th>
              <th className="py-2 px-4 border-b">Data Type</th>
            </tr>
          </thead>
          <tbody>
            {columns.map((column, index) => (
              <tr key={index} className="border-b text-fabflix-secondary">
                <td className="py-2 px-4 text-center">{column.columnName}</td>
                <td className="py-2 px-4 text-center">{column.dataType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
