import http from "../services/http";
import messages from "../services/messages";

export const getDocuments = async (query) => {
  try {
    const res = await http.get("/documents/search/" + query);
    return res.data;
  } catch (error) {
    messages.error(error);
    return [];
  }
};

export const getDocument = async (id) => {
  try {
    const res = await http.get("/documents/" + id);
    return res.data;
  } catch (error) {
    messages.error(error);
    return [];
  }
};
