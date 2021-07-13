import axios from "axios";

export const signUp = (formData, cbRedirect) => async (dispatch) => {
  console.log(formData);
  console.log(cbRedirect);
  try {
    const response = await axios.post("/register", formData);
    dispatch({ type: "AUTH_USER", data: response.data.token });
    cbRedirect();
  } catch (err) {
    console.log("Sign Up Error: ", err);
  }
};

export const signIn = (formData, cbRedirect) => async (dispatch) => {
  try {
    const response = await axios.post("/login", formData);
    dispatch({ type: "AUTH_USER", data: response.data.token });
    cbRedirect();
  } catch (err) {
    console.log("Sign In Error: ", err);
  }
};

export const signOut = (cbRedirect) => (dispatch) => {
  dispatch({
    type: "AUTH_USER",
    data: "",
  });
  cbRedirect();
};
