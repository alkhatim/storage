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
    case "Canceled":
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
      const data = await getRequests();
      setRequests(data);
    };
    fetch();
  }, []);

  const handleAdd = async () => {
    props.history.push("/request");
  };

  return (
    <Fragment>
      <h4 className="ml-2">Requests</h4>
      <div className="ml-2 mt-3 mr-2">
        <DataTable columns={columns} data={requests} actions={actions} />
      </div>
      {role === "ClientUser" && (
        <Fab icon="fa fa-plus" color="red" onClick={handleAdd} />
      )}
    </Fragment>
  );
};

export default Requests;
