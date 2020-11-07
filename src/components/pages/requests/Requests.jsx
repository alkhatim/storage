import React, { Fragment, useEffect, useState } from "react";
import TextInput from "../../controls/TextInput";
import { useSelector } from "react-redux";
import {
  getRequests,
  newRequest,
  deliverRequest,
  cancelRequest,
} from "../../../actions/requestActions";
import DataTable from "./../../controls/DataTable";
import Fab from "./../../controls/Fab";
import M from "materialize-css";
import messages from "../../../services/messages";

const getColor = (state) => {
  switch (state) {
    case "Submitted":
    case "Request Collection":
      return "blue";
    case "Canceled":
      return "red";
    default:
      return "";
  }
};

const columns = [
  { title: "Code", field: "code" },
  { title: "Count", field: "count" },
  {
    title: "State",
    field: "state",
    render: (rowData) => (
      <p style={{ background: getColor(rowData.state) }}>{rowData.state}</p>
    ),
  },
  { title: "Address", field: "address" },
];

export const Requests = (props) => {
  const [requests, setRequests] = useState([]);
  const [request, setRequest] = useState({});

  const role = useSelector((store) => store.authReducer.user.role);

  const actions = [
    {
      icon: () => <i className="fa fa-external-link"></i>,
      tooltip: "Open",
      onClick: (event, data) => {
        props.history.push("/request/" + data.id);
      },
    },
  ];

  if (["ClientUser", "ClientAdmin", "Admin"].includes(role)) {
    actions.push({
      icon: () => <i className="fa fa-ban"></i>,
      tooltip: "Cancel",
      onClick: async (event, data) => {
        try {
          const response = await cancelRequest(data.id);
          setRequest(response);
        } catch (error) {
          messages.error(error);
        }
      },
    });
  }

  useEffect(() => {
    const fetch = async () => {
      const modal = document.querySelectorAll(".modal");
      M.Modal.init(modal, {});
      const date = document.querySelectorAll(".datepicker");
      M.Datepicker.init(date, {});
      const data = await getRequests();
      setRequests(data);
    };
    fetch();
  }, []);

  const handleChange = async (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    const result = await newRequest(request);
    if (result) setRequests([...requests, { ...result, count: 0 }]);
  };
  return (
    <Fragment>
      <h4 className="ml-2">Requests</h4>
      <div className="ml-2 mt-3 mr-2">
        <DataTable columns={columns} data={requests} actions={actions} />
      </div>
      {role === "ClientUser" && (
        <Fragment>
          <Fab icon="fa fa-plus" color="red" href="#addModal" />

          <div id="addModal" className="modal">
            <div className="modal-content mb-6">
              <h5 className="mb-6">New Request</h5>
              <TextInput
                type="text"
                name="address"
                label="Address"
                value={request.address}
                onChange={handleChange}
              />
              <label htmlFor="date">Select Date</label>
              <input
                id="date"
                type="text"
                className="datepicker"
                onChange={handleChange}
                value={request.requestedDate}
              ></input>
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default Requests;
