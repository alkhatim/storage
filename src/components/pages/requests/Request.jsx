import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getRequest,
  updateRequest,
  deliverRequest,
  collectRequest,
  requestCollection,
  submitRequest,
} from "../../../actions/requestActions";
import DataTable from "./../../controls/DataTable";
import Fab from "./../../controls/Fab";
import TextInput from "../../controls/TextInput";
import M from "materialize-css";
const columns = [
  { title: "Barcode", field: "document.barcode" },
  { title: "Client", field: "document.client.name" },
  { title: "Warehouse", field: "document.warehouse.name" },
  { title: "State", field: "state" },
];

export const Requests = (props) => {
  const [request, setRequest] = useState({
    code: "",
    requestedDate: "",
    state: "",
    documentRequests: [],
  });
  const [newDocumentRequest, setNewDocumentRequest] = useState({
    document: {},
  });

  const role = useSelector((store) => store.authReducer.user.role);

  const actions = [
    {
      icon: () => <i className="fa fa-trash-o"></i>,
      tooltip: "Delete",
      onClick: async (event, data) => {
        setRequest({
          ...request,
          documentRequests: request.documentRequests.filter(
            (doc) => doc.document.barcode !== data.document.barcode
          ),
        });
      },
    },
  ];

  useEffect(() => {
    const fetch = async () => {
      const modal = document.querySelectorAll(".modal");
      M.Modal.init(modal, {});
      const date = document.querySelectorAll(".datepicker");
      M.Datepicker.init(date, {});
      const data = await getRequest(props.match.params.id);
      if (data) setRequest(data);
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const handleDocumentRequestChange = (e) => {
    setNewDocumentRequest({
      ...newDocumentRequest,
      document: { ...newDocumentRequest.document, barcode: e.target.value },
    });
  };

  const handleAddDocumentRequest = async () => {
    setRequest({
      ...request,
      documentRequests: [...request.documentRequests, newDocumentRequest],
    });
  };

  const handleUpdate = async () => {
    const res = window.confirm("Are you sure?");
    if (!res) return;
    const result = await updateRequest(props.match.params.id, {
      ...request,
      barcodes: [
        ...request.documentRequests.map((req) => req.document.barcode),
      ],
    });
    if (result) setRequest(result);
  };

  const handleSubmit = async () => {
    const res = window.confirm("Are you sure?");
    if (!res) return;
    const result = await submitRequest(props.match.params.id);
    if (result) setRequest(result);
  };

  const handleRequestCollection = async () => {
    const res = window.confirm("Are you sure?");
    if (!res) return;
    const result = await requestCollection(props.match.params.id);
    if (result) setRequest(result);
  };

  const handleCollect = async () => {
    const res = window.confirm("Are you sure?");
    if (!res) return;
    const result = await collectRequest(props.match.params.id);
    if (result) setRequest(result);
  };

  const handleDeliver = async () => {
    const res = window.confirm("Are you sure?");
    if (!res) return;
    const result = await deliverRequest(props.match.params.id);
    if (result) setRequest(result);
  };

  var stateColor;
  switch (request.state) {
    case "Cancelled":
      stateColor = "lightred";
      break;
    default:
      stateColor = "lightgreen";
      break;
  }

  return (
    <Fragment>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
        }}
      >
        <div
          className="ml-2 mt-2"
          style={{ display: "flex", alignItems: "center" }}
        >
          <b>#{request.code}</b>
          <div
            style={{
              padding: "0px 10px",
              background: stateColor,
              borderRadius: "100px",
              marginLeft: "10px",
            }}
          >
            {request.state}
          </div>
        </div>
        <div
          className="mr-2 mt-5"
          style={{ display: "grid", gridTemplateColumns: "3fr 3fr" }}
        >
          <button className="btn green mr-1" onClick={handleUpdate}>
            Save
            <i className="fa fa-floppy-o fa-2x ml-1" />
          </button>
          {request.state === "New" && (
            <button
              className="waves-effect waves-light btn"
              onClick={handleSubmit}
            >
              Submit
              <i className="fa fa-check fa-2x ml-1" />
            </button>
          )}
          {request.state === "Submitted" && (
            <button
              className="waves-effect waves-light btn"
              onClick={handleDeliver}
            >
              Deliver
              <i className="fa fa-check fa-2x" />
            </button>
          )}
          {request.state === "Delivered" && (
            <button
              className="waves-effect waves-light btn"
              onClick={handleRequestCollection}
            >
              Request Collection
              <i className="fa fa-check fa-2x" />
            </button>
          )}
          {request.state === "Request Collection" && (
            <button
              className="waves-effect waves-light btn"
              onClick={handleCollect}
            >
              Collect
              <i className="fa fa-check fa-2x" />
            </button>
          )}
        </div>
      </div>
      <div
        className="mt-2 ml-2"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
      >
        <div>
          <label htmlFor="date">Requested Date</label>
          <input
            id="date"
            type="text"
            className="datepicker"
            onChange={handleChange}
            value={new Date(request.requestedDate).toLocaleDateString()}
          />
        </div>
      </div>
      <div className="ml-2 mt-3 mr-2">
        <h4 className="mb-1">Document Requests</h4>
        <DataTable
          columns={columns}
          data={request.documentRequests}
          actions={actions}
        />
      </div>
      {role === "ClientUser" && (
        <Fragment>
          <Fab icon="fa fa-plus" color="red" href="#addModal" />
          <div id="addModal" className="modal">
            <div className="modal-content">
              <h5 className="mb-2">New document Request</h5>
              <TextInput
                type="text"
                name="barcode"
                label="Barcode"
                value={newDocumentRequest.document.barcode}
                onChange={handleDocumentRequestChange}
              />
            </div>
            <div className="modal-footer">
              <button
                className="modal-close waves-effect waves-red btn-flat"
                onClick={handleAddDocumentRequest}
              >
                Confirm
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Requests;
