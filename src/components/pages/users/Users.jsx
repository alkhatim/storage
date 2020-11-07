import React, { Fragment, useEffect, useState } from "react";
import TextInput from "../../controls/TextInput";
import {
  getUsers,
  deleteUser,
  newUser as addUser,
} from "../../../actions/userActions";
import DataTable from "../../controls/DataTable";
import Fab from "../../controls/Fab";
import M from "materialize-css";
import messages from "../../../services/messages";

const columns = [
  { title: "Username", field: "userName" },
  { title: "Email", field: "email" },
  { title: "Role", field: "role" },
];

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});

  const actions = [
    {
      icon: () => <i className="fa fa-trash-o"></i>,
      tooltip: "Delete",
      onClick: async (event, data) => {
        await deleteUser(data.id);
        setUsers(users.filter((user) => user.id !== data.id));
      },
    },
  ];

  useEffect(() => {
    const fetch = async () => {
      const modal = document.querySelectorAll(".modal");
      M.Modal.init(modal, {});
      const date = document.querySelectorAll(".datepicker");
      M.Datepicker.init(date, {});
      const data = await getUsers();
      setUsers(data);
    };
    fetch();
  }, []);

  const handleChange = async (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (
      newUser.password &&
      (newUser.password.length < 6 || newUser.password !== newUser.password2)
    ) {
      messages.error("Retype password");
      return;
    }
    const result = await addUser(newUser);
    if (result) setUsers([...users, result]);
  };

  return (
    <Fragment>
      <h4 className="ml-2">Users</h4>
      <div className="ml-2 mr-2">
        <DataTable columns={columns} data={users} actions={actions} />
      </div>
      <Fragment>
        <Fab icon="fa fa-plus" color="red" href="#addModal" />

        <div id="addModal" className="modal">
          <div className="modal-content">
            <h5 className="mb-2">New User</h5>
            <TextInput
              type="text"
              name="userName"
              label="Username"
              value={newUser.userName}
              onChange={handleChange}
            />
            <TextInput
              type="text"
              name="email"
              label="Email"
              value={newUser.email}
              onChange={handleChange}
            />
            <TextInput
              type="password"
              name="password"
              label="Password"
              value={newUser.password}
              onChange={handleChange}
            />
            <TextInput
              type="password"
              name="password2"
              label="Confirm Password"
              value={newUser.password2}
              onChange={handleChange}
            />
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-light btn red"
              onClick={handleAdd}
            >
              Confirm
            </a>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
};

export default Users;
