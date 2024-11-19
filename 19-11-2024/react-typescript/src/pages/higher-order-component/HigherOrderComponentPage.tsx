import React from "react";
import withGrid from "../../component/with-grid/WithGrid";
import DataTable from "../../component/data-table/DataTable";

const EnhancedGrid = withGrid(DataTable);

const HigherOrderComponentPage: React.FC = () => {
  const url = "https://jsonplaceholder.typicode.com/users";
  const dataProperties = ["id", "name", "email", "phone"];

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Higher-Order Component</h1>
      <EnhancedGrid url={url} dataProperties={dataProperties} />
    </div>
  );
};

export default HigherOrderComponentPage;
