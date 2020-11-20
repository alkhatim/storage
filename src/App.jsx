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
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute
            exact
            path="/request/:id?"
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
            path="/dashboard"
            allow={["Admin"]}
            component={Dashboard}
          />
          <Route exact path="/forbidden" component={Forbidden} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
      <ToastContainer pauseOnFocusLoss={false} />
    </Provider>
  );
};

export default App;
