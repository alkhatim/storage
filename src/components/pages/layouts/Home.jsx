import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Home = () => {
  const isLoggedIn = useSelector((store) => store.authReducer.isLoggedIn);
  const isLoading = useSelector((store) => store.authReducer.isLoading);
  const role = useSelector((store) => store.authReducer.user.role);

  if (isLoading) {
    return <div></div>;
  } else if (!isLoggedIn) {
    return <Redirect to="/login" />;
  } else {
    //Todo redirect admin to dashboard and partner user to requests
    switch (role) {
      case "Admin":
        return <Redirect to="/dashboard" />;
      case "ClientUser":
        return <Redirect to="/requests" />;
      case "ClientAdmin":
        return <Redirect to="/requests" />;
      case "PartnerUser":
        return <Redirect to="/requests" />;
      case "PartnerAdmin":
        return <Redirect to="/requestes" />;
      default:
        return <div></div>;
    }
  }
};

export default Home;
