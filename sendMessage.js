import axios from "axios";
import dotenv from "dotenv";
import { DateFormatted } from "./dateFunction.js";

dotenv.config();
export const SendMessage = async (data) => {

  const formattedDate = await DateFormatted();


  const message = `
  
Hi <@channel> 👋
Here's our daily Meta Ads performance snapshots from yesterday.
⚡${formattedDate}⚡
-Campaign : ${data.campaign}
-Spend    : ${data.spend}$
-Results  : ${data.actions_offsite_conversion_fb_pixel_purchase}
  `










  axios
    .post(
      process.env.WEBHOOK_URL,
      {
        text: message
      }
    )
    .then((response) => {
      console.log("Message sent successfully");
    })
    .catch((error) => {
      console.error("error in sendMessage", error);
    });
};
