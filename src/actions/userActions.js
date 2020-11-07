import http from "../services/http";
import messages from "../services/messages";

export const getUsers = async () => {
  try {
    const res = await http.get("/users");
    return res.data;
  } catch (error) {
    messages.error(error);
    return [];
  }
};

export const updateUser = async (user) => {
  try {
    const res = await http.put("/users/" + user.id, user);
    return res.data;
  } catch (error) {
    messages.error(error);
  }
};

export const newUser = async (user) => {
  try {
    const res = await http.post("/users", user);
    return res.data;
  } catch (error) {
    messages.error(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await http.delete("/users/" + id);
    return res.data;
  } catch (error) {
    messages.error(error);
  }
};
