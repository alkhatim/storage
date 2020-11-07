import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Fab from "../../controls/Fab";
import TextInput from "../../controls/TextInput";
import { updateUser } from "../../../actions/userActions";
import messages from "../../../services/messages";

export const Profile = (props) => {
  const [user, setUser] = useState({});
  const [readOnly, setReadOnly] = useState(true);

  const auth = useSelector((store) => store.authReducer);

  useEffect(() => {
    setUser(auth);
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateUser(user);
    } catch (error) {
      messages.error(error);
    }
  };

  return (
    <div style={{ padding: "4rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "8fr 1fr 1fr",
        }}
      >
        <h4 className="ml-2">Profile</h4>
        <i
          style={{ display: readOnly ? "none" : "initial" }}
          className="fa fa-floppy-o fa-lg hand mt-3"
          onClick={handleUpdate}
        ></i>
        <i
          className="fa fa-pencil fa-lg hand mt-3"
          onClick={() => setReadOnly(!readOnly)}
        ></i>
      </div>
      <div style={{ display: "grid", width: "20rem" }}>
        <TextInput
          type="text"
          name="userName"
          label="Username"
          disabled={true}
          value={user.username}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          name="email"
          label="Email"
          disabled={readOnly}
          value={user.email}
          onChange={handleChange}
        />
        {!readOnly && (
          <Fragment>
            <TextInput
              type="password"
              name="password"
              label="Old Password"
              style={{ display: readOnly ? "none" : "initial" }}
              disabled={readOnly}
              value={user.oldPassword}
              onChange={handleChange}
            />
            <TextInput
              type="password"
              name="password"
              label="New Password"
              disabled={readOnly}
              style={{ display: readOnly ? "none" : "initial" }}
              value={user.password}
              onChange={handleChange}
            />
            <TextInput
              type="password"
              name="password2"
              label="Confirm New Password"
              disabled={readOnly}
              style={{ display: readOnly ? "none" : "initial" }}
              value={user.password2}
              onChange={handleChange}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Profile;
