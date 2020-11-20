import http from "../services/http";
import messages from "../services/messages";

export const getRequests = async () => {
  try {
    const res = await http.get("/requests");
    return res.data;
  } catch (error) {
    messages.error(error);
    return [];
  }
};

export const getRequest = async (id) => {
  try {
    const res = await http.get("/requests/" + id);
    return res.data;
  } catch (error) {
    messages.error(error);
  }
};

export const updateRequest = async (id, request) => {
  try {
    const res = await http.post("/requests/", request);
    return res.data;
  } catch (error) {
    messages.error(error);
  }
};

export const submitRequest = async (id) => {
  try {
    const res = await http.put("/requests/" + id + "/state/" + 2);
    return res.data;
  } catch (error) {
    messages.error(error);
  }
};

export const deliverRequest = async (id, trips) => {
  try {
    const res = await http.put("/requests/" + id + "/state/" + 3, {
      deliveryTrips: parseInt(trips),
    });
    return res.data;
  } catch (error) {
    messages.error(error);
  }
};

export const requestCollection = async (id) => {
  try {
    const res = await http.put("/requests/" + id + "/state/" + 4);
    return res.data;
  } catch (error) {
    messages.error(error);
  }
};

export const collectRequest = async (id, trips) => {
  try {
    const res = await http.put("/requests/" + id + "/state/" + 5, {
      collectionTrips: parseInt(trips),
    });
    return res.data;
  } catch (error) {
    messages.error(error);
  }
};

export const cancelRequest = async (id) => {
  try {
    const res = await http.put("/requests/" + id + "/state/" + 0);
    return res.data;
  } catch (error) {
    messages.error(error);
  }
};

export const getBarcodes = async (prefix) => {
  try {
    const res = await http.get("/lookups/barcodes/" + prefix);
    return res.data;
  } catch (error) {
    messages.error(error);
  }
};
