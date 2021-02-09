import { axiosInstance } from "../config/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export function postData(payload) {
  return async (dispatch, getState) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        data: payload,
        url: "/records",
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      MySwal.fire(response.data.message);
    } catch (error) {
      MySwal.fire(error.response.data.message);
    }
  };
}

export function fetchPerformance() {
  return async (dispatch, getState) => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/performances",
      });

      console.log(response.data, "<<< response fetching");
      dispatch({
        type: "SET_PERFORMANCES",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
