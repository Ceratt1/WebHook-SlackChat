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
-Campaign: ${data.campaign}
-Spend: ${data.spend}$
-Results: ${data.actions_offsite_conversion_fb_pixel_purchase}
-ROAS: ${data.action_values_omni_purchase}
-CPA: $${data.cost_per_action_type_omni_purchase}
-Links Clicks: ${data.link_clicks}
-CPC: $${data.cost_per_action_type_link_click}
-Add to carts(number): ${data.actions_add_to_cart}
-Add to carts(cost): $${data.cost_per_action_type_add_to_cart}
-Initiate checkouts (number): ${data.actions_initiate_checkout}

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
