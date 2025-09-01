import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const uploadToImgBB = async (filePath) => {
  const apiKey = process.env.IMGBB_API_KEY; 
  const form = new FormData();
  form.append("image", fs.createReadStream(filePath));

  const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, form, {
    headers: form.getHeaders(),
  });

  return response.data.data.url; 
};

export default uploadToImgBB;
