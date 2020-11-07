import http from "../services/http";
import messages from "../services/messages";

export const getWarehouses = async () => {
  try {
    const res = await http.get("/warehouses");
    return res.data;
  } catch (error) {
    messages.error(error);
    return [];
  }
};

export const newWarehouse = async (warehouse) => {
  try {
    const res = await http.post("/warehouses", warehouse);
    return res.data;
  } catch (error) {
    messages.error(error);
  }
};

export const uploadDocuments = async (id, documents) => {
  try {
    const res = await http.post("/warehouses/" + id + "/documents", documents);
    return res.data;
  } catch (error) {
    messages.error(error);
  }
};

export const getClients = async () => {
  try {
    const res = await http.get("/clients");
    return res.data;
  } catch (error) {
    messages.error(error);
  }
};
