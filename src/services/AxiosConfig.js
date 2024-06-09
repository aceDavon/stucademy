import axios from "axios";
import { ErrorHandler } from "./ErrorHandler";

export default function AxiosConfig() {
  const instanceConfig = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      common: {
        Authorization: `Bearer ${localStorage.getItem("stucademy-tks")}`,
      },
    },
  });

  instanceConfig.interceptors.response.use(
    (response) => handleSuccess(response),
    (error) => {
      ErrorHandler(error);
      // handleError(error);
    }
  );

  function handleSuccess(response) {
    return response;
  }
  function handleError(error) {
    return error;
  }

  return instanceConfig;
}
