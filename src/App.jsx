import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";
import ProtectedRoute from "./components/misc/ProtectedRoute";
import Navbar from "./components/pages/layouts/Navbar";
import Login from "./components/pages/auth/Login";
import Home from "./components/pages/layouts/Home";
import Users from "./components/pages/users/Users";
import Profile from "./components/pages/users/Profile";
import Request from "./components/pages/requests/Request";
import Requests from "./components/pages/requests/Requests";
import Warehouses from "./components/pages/warehouses/Warehouses";
import Document from "./components/pages/documents/Document";
import Documents from "./components/pages/documents/Documnets";
import Settings from "./components/pages/settings/Settings";
import Forbidden from "./components/pages/auth/Forbidden";
import NotFound from "./components/pages/layouts/NotFound";
import "react-toastify/dist/ReactToastify.css";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";
import "./common.css";
import { loadUser } from "./actions/authActions";
import Dashboard from "./components/pages/dashboard/Dashboard";

const App = () => {
  store.dispatch(loadUser());

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div
          className="psp-header bg-dark"
          style={{
            paddingTop: "0.5rem",
            backgroundColor: "#343a40",
            paddingBottom: "0.5rem",
            height: 160,
          }}
        >
          <div
            className="psp-header-right"
            style={{
              float: "left",
              padding: "2rem 2rem 2rem 2rem",
            }}
          >
            <a
              style={{
                float: "right",
                textAlign: "center",
                textDecoration: "none",
              }}
              href="https://www.malomatia.com/technology-services/#digitization"
              target="_blank"
            >
              <img
                src="https://localhost:44340/Images/Malomatia_logo.svg"
                style={{ marginLeft: "1rem" }}
                height="90"
                alt="Malomatia Logo"
              />
            </a>
          </div>
          <a
            style={{
              float: "right",
            }}
          >
            <img
              src="https://localhost:44340/Images/mme_logo_arabic.png"
              height="120"
              style={{ marginTop: "1rem", marginRight: "2rem" }}
              alt="Physical Storage Portal Logo"
            />
          </a>
        </div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute
            exact
            path="/request"
            allow={["ClientUser", "ClientAdmin"]}
            component={Request}
          />
          <ProtectedRoute
            exact
            path="/request/:id"
            allow="All"
            component={Request}
          />
          <ProtectedRoute
            exact
            path="/users"
            allow={["ClientAdmin", "PartnerAdmin", "Admin"]}
            component={Users}
          />
          <ProtectedRoute
            exact
            path="/profile"
            allow="All"
            component={Profile}
          />
          <ProtectedRoute
            exact
            path="/requests"
            allow="All"
            component={Requests}
          />
          <ProtectedRoute
            exact
            path="/warehouses"
            allow={["PartnerUser", "PartnerAdmin", "Admin"]}
            component={Warehouses}
          />
          <ProtectedRoute
            exact
            path="/documents"
            allow="All"
            component={Documents}
          />
          <ProtectedRoute
            exact
            path="/document/:id"
            allow="All"
            component={Document}
          />
          <ProtectedRoute
            exact
            path="/settings"
            allow={["Admin"]}
            component={Settings}
          />
          <ProtectedRoute
            exact
            path="/dashboard"
            allow={["Admin"]}
            component={Dashboard}
          />
          <Route exact path="/forbidden" component={Forbidden} />
          <Route component={NotFound} />
        </Switch>
        <footer class="d-none d-sm-none d-md-block">
          <div
            class="copyright text-left"
            style={{
              padding: "20px",
              backgroundColor: "#cf112b",
            }}
          >
            <div
              class="container"
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <span style={{ color: "#ddd" }}>Copyright © 2020</span>{" "}
              <a
                style={{
                  color: "white",
                  padding: "0 20px",
                }}
                href="https://www.malomatia.com/technology-services/#digitization"
                target="_blank"
              >
                {" "}
                Malomatia, Digitization &amp; ECM
              </a>
            </div>
          </div>
        </footer>
      </BrowserRouter>
      <ToastContainer pauseOnFocusLoss={false} />
    </Provider>
  );
};

export default App;
