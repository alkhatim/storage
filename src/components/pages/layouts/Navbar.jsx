import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logOut } from "../../../actions/authActions";
import defaultPic from "../../../img/defaultProfile.png";
import M from "materialize-css";

export const Navbar = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, isLoading, user } = useSelector(
    (store) => store.authReducer
  );

  const { role } = user;

  const history = useHistory();

  useEffect(() => {
    const sidenav = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenav, {});
    const profileDropdown = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(profileDropdown, {
      coverTrigger: false,
      constrainWidth: false,
    });
  }, []);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <Fragment>
      {/* Fixed Nav */}
      <div className="navbar-fixed">
        <nav className="red darken-2 z-depth-2">
          <div className="nav-wrapper ml-4 mr-2">
            <Link to="/" className="brand-logo">
              <i className="fa fa-hdd-o app-icon" />
              Storage System
            </Link>
            <a href="#!" className="sidenav-trigger" data-target="mobile-nav">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              {!isLoading &&
                isLoggedIn &&
                ["PartnerUser", "PartnerAdmin", "Admin"].includes(role) && (
                  <li>
                    <Link to="/warehouses">Warehouses</Link>
                  </li>
                )}
              {!isLoading && isLoggedIn && (
                <li>
                  <Link to="/documents">Documents</Link>
                </li>
              )}
              {!isLoading && isLoggedIn && (
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
              )}
              {!isLoading &&
                isLoggedIn &&
                ["PartnerAdmin", "ClientAdmin", "Admin"].includes(role) && (
                  <li>
                    <Link to="/users">Users Managment</Link>
                  </li>
                )}
              {!isLoading && !isLoggedIn && (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
              <li className={isLoggedIn ? "" : "hide"}>
                <img
                  src={defaultPic}
                  alt=""
                  onClick={() => {
                    history.push("/profile");
                  }}
                  className="circle responsive-img dropdown-trigger img-40"
                  data-target="profile-dropdown"
                  style={{
                    marginTop: "0.75rem",
                    marginLeft: "0.4rem",
                  }}
                />
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Profile Dropdown */}
      <ul className="dropdown-content" id="profile-dropdown">
        <li>
          <Link to="/" onClick={handleLogOut}>
            <i className="fa fa-sign-out mr-1"></i>Log out
          </Link>
        </li>
      </ul>

      {/* Mobile SideNav */}
      <ul className="sidenav sidenav-close blue-grey darken-4" id="mobile-nav">
        <h3 className="mb-3 center">
          <Link to="/" className="red-text ">
            <i className="far fa-id-badge red-text" /> Storage System
          </Link>
        </h3>
        <li className="mb-1">
          <div className="divider blue-grey darken-2"></div>
        </li>
        {!isLoading &&
          isLoggedIn &&
          ["PartnerUser", "PartnerAdmin", "Admin"].includes(role) && (
            <li>
              <Link className="white-text" to="/warehouses">
                Warehouses
              </Link>
            </li>
          )}
        <li>
          {!isLoading && isLoggedIn && (
            <Link className="white-text" to="/documents">
              Documents
            </Link>
          )}
        </li>
        {!isLoading && isLoggedIn && (
          <li>
            <Link className="white-text" to="/requests">
              Requests
            </Link>
          </li>
        )}
        {!isLoggedIn && !isLoading && (
          <li>
            <Link to="/login" className="white-text">
              <i className="fa fa-sign-in white-text"></i>Login
            </Link>
          </li>
        )}
        {!isLoading && isLoggedIn && (
          <li>
            <Link className="white-text" to="/profile">
              Profile
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/" onClick={handleLogOut} className="white-text">
              <i className="fa fa-sign-out white-text"></i>Log out
            </Link>
          </li>
        )}
      </ul>
    </Fragment>
  );
};

export default Navbar;
