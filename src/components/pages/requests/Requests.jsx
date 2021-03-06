import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRequests, cancelRequest } from "../../../actions/requestActions";
import DataTable from "./../../controls/DataTable";
import Fab from "./../../controls/Fab";
import messages from "../../../services/messages";

const getColor = (state) => {
  switch (state) {
    case "Submitted":
    case "Request Collection":
      return "lightblue";
    case "Cancelled":
      return "lightred";
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
      <p
        style={{
          padding: "0px 10px",
          color: getColor(rowData.state),
          borderRadius: "100px",
          marginLeft: "10px",
        }}
      >
        {rowData.state}
      </p>
    ),
  },
  { title: "Address", field: "address" },
  { title: "Type", field: "type" },
];

export const Requests = (props) => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("New");

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
          setRequests(
            requests.map((req) => (req.id === response.id ? response : req))
          );
        } catch (error) {
          messages.error(error);
        }
      },
    });
  }

  useEffect(() => {
    const fetch = async () => {
      const data = await getRequests();
      setRequests(data);
    };
    fetch();
  }, []);

  const handleAdd = async () => {
    props.history.push("/request");
  };

  const data = requests.filter((req) => req.state === filter);

  return (
    <div style={{ padding: 20 }}>
      <h3>Request</h3>
      <ul className="pagination" style={{ width: "100vw" }}>
        <li
          className={filter === "New" ? "active waves-effect" : "waves-effect"}
        >
          <a onClick={() => setFilter("New")}>New</a>
        </li>
        <li
          className={
            filter === "Submitted" ? "active waves-effect" : "waves-effect"
          }
        >
          <a onClick={() => setFilter("Submitted")}>Submitted</a>
        </li>
        <li
          className={
            filter === "Delivered" ? "active waves-effect" : "waves-effect"
          }
        >
          <a onClick={() => setFilter("Delivered")}>Delivered</a>
        </li>
        <li
          className={
            filter === "Request Collection"
              ? "active waves-effect"
              : "waves-effect"
          }
        >
          <a onClick={() => setFilter("Request Collection")}>
            Ready For Collection
          </a>
        </li>
        <li
          className={
            filter === "Collected" ? "active waves-effect" : "waves-effect"
          }
        >
          <a onClick={() => setFilter("Collected")}>Collected</a>
        </li>
        <li
          className={
            filter === "Cancelled" ? "active waves-effect" : "waves-effect"
          }
        >
          <a onClick={() => setFilter("Cancelled")}>Cancelled</a>
        </li>
      </ul>
      <DataTable columns={columns} data={data} actions={actions} />
      {["ClientUser", "ClientAdmin"].includes(role) && (
        <Fab icon="fa fa-plus" color="red" onClick={handleAdd} />
      )}
    </div>
  );
};

export default Requests;
