import http from "../services/http";
import messages from "../services/messages";

export const getReportData = async () => {
  try {
    const res = await http.get("/dashboard/reports");
    return res.data;
  } catch (error) {
    messages.error(error);
    return {
    requestsByState: { data: [], labels: [] },
    previousRequests: { data: [], labels: [] },
    requestsPerMonth: { data: [], labels: [] },
    requests: { data: [], labels: [] },
  };
  }
};