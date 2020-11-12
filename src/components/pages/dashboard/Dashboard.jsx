import React, { useState, useEffect } from "react";
import { getReportData } from "../../../actions/reportsactions";
import BarChart from "../../controls/Bar";
import DoughnutChart from "../../controls/Doughnut";

const Dashboard = () => {
  const [reports, setReports] = useState({
    requestsByState: { data: [], labels: [] },
    previousRequests: { data: [], labels: [] },
    requestsPerMonth: { data: [], labels: [] },
    requests: { data: [], labels: [] },
  });
  // useEffect(() => {
  //   const fetch = async () => {
  //     const data = await getReportData();
  //     setReports(data);
  //   };
  //   fetch();
  // }, []);
  return (
    <>
      <div className="row">
        <div className="col s12 m6">
          <DoughnutChart
            data={[200, 300, 500]}
            labels={["Submitted", "Dilevered", "Collected"]}
            title="requests in Last Month"
          />
        </div>
        <div className="col s12 m6">
          <DoughnutChart
            data={[200, 300, 400]}
            labels={["Submitted", "Delivered", "Collected"]}
            title="Requests"
          />
        </div>
      </div>
      <div className="row">
        <div className="col s12 m6">
          <DoughnutChart
            data={[200, 300, 400]}
            labels={["Submitted", "Delivered", "Collected"]}
            title="Report3"
          />
        </div>
        <div className="col s12 m6">
          <BarChart
            data={[5000, 5500, 5400, 5600, 5800, 6000]}
            labels={["Jan", "Feb", "March", "April", "May", "June"]}
            title="Requests By month this year"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
