import { setCosts } from "../context";
import { setAuth, setUsername } from "../context/auth";

export const removeUser = () => {
  localStorage.removeItem("auth");
  setAuth(false);
  setUsername("");
  setCosts([]);
};

export const getAuthDataFromLS = () => {
  try {
    const lsData = JSON.parse(localStorage.getItem("auth") as string);

    if (!lsData) {
      removeUser();
      return;
    }

    return lsData;
  } catch (error) {
    removeUser()
  }
};
