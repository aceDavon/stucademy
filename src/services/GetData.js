import { axiosInstance } from "./AxiosInstance";

export async function handleGetData(url) {
  let data;
  try {
    await axiosInstance.get(`/admin/${url}`).then((resp) => {
      data = resp.data;
    });
  } catch (error) {
    console.log(error);
  }
  return data
}
