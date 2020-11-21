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

  const newRequests = requests.filter((req) => req.state == "NEW");
  const submittedRequests = requests.filter((req) => req.state == "Submitted");
  const deliveredRequests = requests.filter((req) => req.state == "Delivered");
  const readyRequests = requests.filter(
    (req) => req.state == "Request Collection"
  );
  const collectedRequests = requests.filter((req) => req.state == "Collected");
  const cancelledRequests = requests.filter((req) => req.state == "Cancelled");

  return (
    <Fragment>
      <h4 className="ml-2">New Requests</h4>
      <div className="ml-2 mt-3 mr-2">
        <DataTable columns={columns} data={newRequests} actions={actions} />
      </div>
      <h4 className="ml-2">Submitted Requests</h4>
      <div className="ml-2 mt-3 mr-2">
        <DataTable
          columns={columns}
          data={submittedRequests}
          actions={actions}
        />
      </div>
      <h4 className="ml-2">Delivered Requests</h4>
      <div className="ml-2 mt-3 mr-2">
        <DataTable
          columns={columns}
          data={deliveredRequests}
          actions={actions}
        />
      </div>
      <h4 className="ml-2">Ready For Collection</h4>
      <div className="ml-2 mt-3 mr-2">
        <DataTable columns={columns} data={readyRequests} actions={actions} />
      </div>
      <h4 className="ml-2">Collected Requests</h4>
      <div className="ml-2 mt-3 mr-2">
        <DataTable
          columns={columns}
          data={collectedRequests}
          actions={actions}
        />
      </div>
      <h4 className="ml-2">Cancelled Requests</h4>
      <div className="ml-2 mt-3 mr-2">
        <DataTable
          columns={columns}
          data={cancelledRequests}
          actions={actions}
        />
      </div>
      {["ClientUser", "ClientAdmin"].includes(role) && (
        <Fab icon="fa fa-plus" color="red" onClick={handleAdd} />
      )}
    </Fragment>
  );
};

export default Requests;
