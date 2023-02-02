import React, { useState } from "react";
import axios from "axios";
import JSONTable from "./Jsontable";
import DataTable from "react-data-table-component";

const Header = () => {
  const [file, setFile] = useState(null);
  const [table, setTable] = useState([{}]);

  const handleFileChange = (event) => {
    const file_data = event.target.files[0];
    setFile(file_data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("http://127.0.0.1:5000/file-upload", formData);
      console.log(response.data);
      setTable(response.data)
    } catch (error) {
      console.error(error);
    }
  };
  const columns = React.useMemo(
    () =>
      Object.keys(table[0] || {}).map((key) => ({
        name: key,
        selector: key,
        sortable: true,
      })),
    [table]
  );
  return (
    <>
    <form onSubmit={handleSubmit}>
    <input type="file" onChange={handleFileChange} />
    <button type="submit">Upload</button>
    </form>
    <div style={{ overflow: "auto", maxHeight: "300px" }}>
      {/* <JSONTable 
      data = {table}/> */}
      <DataTable
      columns={columns}
      data={table}
      pagination
      paginationPerPage={10}
    />
    </div>
    </>
    
  );
};

export default Header;
