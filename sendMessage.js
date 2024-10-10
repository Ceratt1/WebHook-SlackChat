import axios from "axios";
import dotenv from "dotenv";


dotenv.config();
export const SendMessage = async (data) => {
  axios
    .post(
      process.env.WEBHOOK_URL,
      {
        text: data
      }
    )
    .then((response) => {
      console.log("Message sent successfully");
    })
    .catch((error) => {
      console.error("error in sendMessage", error);
    });
};