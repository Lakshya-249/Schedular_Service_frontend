export const setdetails = (id: string, username: string) => {
  localStorage.setItem("id", id);
  localStorage.setItem("username", username);
};

export const getdetails = (val: string) => {
  return localStorage.getItem(val) || "val";
};
