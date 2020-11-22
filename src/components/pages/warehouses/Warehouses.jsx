import React, { Fragment, useEffect, useState } from "react";
import TextInput from "../../controls/TextInput";
import {
  getWarehouses,
  newWarehouse,
  uploadDocuments,
  getClients,
} from "../../../actions/warehouseActions";
import DataTable from "../../controls/DataTable";
import Fab from "../../controls/Fab";
import XLSX from "xlsx";
import M from "materialize-css";
import Autocomplete from "../../controls/AutoComplete";

const columns = [
  { title: "Code", field: "code" },
  { title: "Name", field: "name" },
  { title: "Documents Count", field: "documentsCount" },
  { title: "Address", field: "address" },
];

export const Requests = (props) => {
  const [warehouses, setWarehouses] = useState([]);
  const [warehouse, setWarehouse] = useState({});
  const [clients, setClients] = useState([]);
  const [newUpload, setNewUpload] = useState({});

  let uploadOpen = {};

  const actions = [
    {
      icon: () => <i className="fa fa-upload" href="#uploadModal"></i>,
      tooltip: "Upload",
      onClick: async (event, data) => {
        setNewUpload({ ...newUpload, id: data.id });
        uploadOpen.click();
      },
    },
  ];

  useEffect(() => {
    const fetch = async () => {
      const modal = document.querySelectorAll(".modal");
      M.Modal.init(modal, {});
      const data = await getWarehouses();
      const clientsData = await getClients();
      setWarehouses(data);
      setClients(clientsData);
    };
    fetch();
  }, []);

  const handleChange = async (e) => {
    setWarehouse({ ...warehouse, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    const result = await newWarehouse({
      ...warehouse,
      code: "",
      documentsCount: 0,
    });
    if (result) setWarehouses([...warehouses, result]);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (reader.readAsBinaryString) {
      reader.onload = (e) => {
        const workbook = XLSX.read(reader.result, { type: "binary" });
        const firstSheet = workbook.SheetNames[0];
        let excelRows = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[firstSheet]
        );
        excelRows = excelRows.slice(1, -1);
        console.log(
          excelRows.map((row) => ({
            boxBarcode: row.__EMPTY_1,
            fileBarcode: row.__EMPTY_4,
          }))
        );
        setNewUpload({
          ...newUpload,
          documents: excelRows.map((row) => ({
            boxBarcode: row.__EMPTY,
            fileBarcode: row.__EMPTY_4,
          })),
        });
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleNewUpload = async () => {
    const result = await uploadDocuments(newUpload.id, {
      documents: newUpload.documents,
      clientId: clients.find((client) => client.name === newUpload.client).id,
    });
    setNewUpload({});
    if (result)
      setWarehouses([
        ...warehouses.filter((w) => w.id !== newUpload.id),
        result,
      ]);
  };

  return (
    <Fragment>
      <h4 className="ml-2">Warehouses</h4>
      <div className="ml-2 mt-3 mr-2">
        <DataTable columns={columns} data={warehouses} actions={actions} />
      </div>
      <Fragment>
        <Fab icon="fa fa-plus" color="red" href="#addModal" />

        {/* Add warehouse modal */}
        <div id="addModal" className="modal">
          <div className="modal-content">
            <h5 className="mb-2">New Warehouse</h5>
            <TextInput
              type="text"
              name="name"
              label="Name"
              value={warehouse.name}
              onChange={handleChange}
            />
            <TextInput
              type="text"
              name="address"
              label="Address"
              value={warehouse.address}
              onChange={handleChange}
            />
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
              onClick={handleAdd}
            >
              Confirm
            </a>
          </div>
        </div>

        {/* Upload documents modal */}
        <div id="uploadModal" className="modal">
          <div className="modal-content">
            <h5 className="mb-2">Upload Documents</h5>
            <Autocomplete
              label="Client"
              data={clients}
              value={newUpload.client}
              onChange={(e) =>
                setNewUpload({ ...newUpload, client: e.target.value })
              }
              onAutocomplete={(v) => setNewUpload({ ...newUpload, client: v })}
            />
            {/* <TextInput
              type="text"
              name="clientId"
              label="Client"
              value={}
              onChange={(e) =>
                setNewUpload({ ...newUpload, clientId: e.target.value })
              }
            /> */}
            <input
              type="file"
              name="documents"
              label="Documents"
              accept=".xlsx,.xls"
              value={newUpload.file}
              onChange={handleUpload}
            />
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
              onClick={handleNewUpload}
            >
              Confirm
            </a>
          </div>
        </div>

        <button
          href="#uploadModal"
          className={"modal-trigger"}
          style={{ display: "none" }}
          ref={(btn) => (uploadOpen = btn)}
        />
      </Fragment>
    </Fragment>
  );
};

export default Requests;
