import axios from "axios";
import { axiosInstance } from "./AxiosInstance";

export async function UploadToCloud(imageFile, uploadPreset) {
  const formdata = new FormData();
  formdata.append("file", imageFile);
  formdata.append("upload_preset", uploadPreset ?? "course_images");
  const response = await axios.post(
    `${process.env.REACT_APP_CLOUDINARY_URL}/${process.env.REACT_APP_CLOUDINARY_USERNAME}/image/upload`,
    formdata
  );
  return response?.data?.secure_url ?? "";
}
