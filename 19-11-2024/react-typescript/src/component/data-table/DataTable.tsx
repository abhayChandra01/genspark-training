import React from "react";

interface DataTableProps {
  data: any[];
  dataProperties: string[];
}

const DataTable: React.FC<DataTableProps> = ({ data, dataProperties }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto text-left">
        <thead className="bg-blue-100">
          <tr>
            {dataProperties.map((prop) => (
              <th
                key={prop}
                className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase  "
              >
                {prop}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition duration-200`}
            >
              {dataProperties.map((prop) => (
                <td key={prop} className="px-6 py-4 text-sm text-gray-800">
                  {row[prop] ?? "N/A"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
