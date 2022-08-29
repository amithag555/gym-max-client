import axios from "axios";
import { CLOUD_NAME } from "./config";

export default axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
});
