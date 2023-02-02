import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Age",
    selector: "age",
    sortable: true,
  },
  {
    name: "Address",
    selector: "address",
    sortable: true,
  },
];

const DataTableExample = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("YOUR_API_URL");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      paginationPerPage={10}
    />
  );
};

export default DataTableExample;
