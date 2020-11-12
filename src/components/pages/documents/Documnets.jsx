import React, { Fragment, useState } from "react";
import TextInput from "../../controls/TextInput";
import { getDocuments } from "../../../actions/documentActions";
import DataTable from "../../controls/DataTable";

const columns = [
  { title: "Barcode", field: "barcode" },
  { title: "Client", field: "client" },
  { title: "State", field: "state" },
  { title: "Warehouse", field: "warehouse" },
];

export const Documents = (props) => {
  const [documents, setDocuments] = useState([]);
  const [query, setQuery] = useState("");

  const handleChange = async (e) => {
    setQuery(e.target.value);
  };

  const handleClick = async (e) => {
    const data = await getDocuments(query);
    setDocuments(data);
  };

  const actions = [
    {
      icon: () => <i className="fa fa-external-link"></i>,
      tooltip: "Open",
      onClick: (event, data) => {
        props.history.push("/document/" + data.id);
      },
    },
  ];

  return (
    <Fragment>
      <h4 className="ml-2">Documets</h4>
      <div className="ml-2 mt-3 mr-2">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <TextInput
            type="text"
            name="query"
            label="Search document"
            value={query}
            onChange={handleChange}
          />
          <i className="fa fa-search hand" onClick={handleClick}></i>
        </div>
        <DataTable columns={columns} data={documents} actions={actions} />
      </div>
    </Fragment>
  );
};

export default Documents;
