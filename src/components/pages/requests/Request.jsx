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
  { title: "Barcode", field: "box.barcode" },
  { title: "Client", field: "box.client.name" },
  { title: "Warehouse", field: "box.warehouse.name" },
  { title: "State", field: "state" },
];

export const Requests = (props) => {
  const [request, setRequest] = useState({
    id: 0,
    code: "",
    requestedDate: "",
    state: "",
    address: "",
    boxRequests: [],
  });
  const [newBoxRequest, setNewBoxRequest] = useState({
    box: {},
  });

  const role = useSelector((store) => store.authReducer.user.role);

  const actions = [
    {
      icon: () => <i className="fa fa-trash-o"></i>,
      tooltip: "Delete",
      onClick: async (event, data) => {
        setRequest({
          ...request,
          boxRequests: request.boxRequests.filter(
            (box) => box.box.barcode !== data.box.barcode
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
      if (props.match.params.id) {
        const data = await getRequest(props.match.params.id);
        if (data) setRequest(data);
      }
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const handleBoxRequestChange = (e) => {
    setNewBoxRequest({
      ...newBoxRequest,
      box: { ...newBoxRequest.box, barcode: e.target.value },
    });
  };

  const handleAddBoxRequest = async () => {
    setRequest({
      ...request,
      boxRequests: [...request.boxRequests, newBoxRequest],
    });
  };

  const handleUpdate = async () => {
    const res = window.confirm("Are you sure?");
    if (!res) return;
    const result = await updateRequest(props.match.params.id, {
      ...request,
      barcodes: [
        ...request.boxRequests.map((req) => ({
          barcode: req.box.barcode,
          error: "",
        })),
      ],
    });
    if (result) props.history.push(`/request/${result.id}`);
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

  const date = new Date(request.requestedDate).toLocaleDateString();

  return (
    <Fragment>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
        }}
      >
        {request.id && (
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
        )}
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
          <TextInput
            type="text"
            name="address"
            label="Address"
            value={request.address}
            onChange={handleChange}
          />
          <label htmlFor="date">Requested Date</label>
          <input
            id="date"
            type="text"
            name="requestedDate"
            className="datepicker"
            onChange={handleChange}
            value={date}
          />
        </div>
      </div>
      {request.id && (
        <div className="ml-2 mt-3 mr-2">
          <h4 className="mb-1">Box Requests</h4>
          <DataTable
            columns={columns}
            data={request.boxRequests}
            actions={actions}
          />
        </div>
      )}
      {role === "ClientUser" && request.id && (
        <Fragment>
          <Fab icon="fa fa-plus" color="red" href="#addModal" />
          <div id="addModal" className="modal">
            <div className="modal-content">
              <h5 className="mb-2">New Box Request</h5>
              <TextInput
                type="text"
                name="barcode"
                label="Barcode"
                value={newBoxRequest.box.barcode}
                onChange={handleBoxRequestChange}
              />
            </div>
            <div className="modal-footer">
              <button
                className="modal-close waves-effect waves-red btn-flat"
                onClick={handleAddBoxRequest}
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
