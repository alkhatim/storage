import http from "../services/http";
import messages from "../services/messages";

export const getClientSettings = async () => {
  try {
    const res = await http.get("/settings/client");
    return res.data;
  } catch (error) {
    messages.error(error);
    return {};
  }
};

export const saveClientSettings = async (settings) => {
  try {
    const res = await http.post("/settings/client", settings);
    return res.data;
  } catch (error) {
    messages.error(error);
  }
};

export const getPartnerSettings = async () => {
  try {
    const res = await http.get("/settings/partner");
    return res.data;
  } catch (error) {
    messages.error(error);
    return {};
  }
};

export const savePartnerSettings = async (settings) => {
  try {
    const res = await http.post("/settings/partner", settings);
    return res.data;
  } catch (error) {
    messages.error(error);
  }
};
