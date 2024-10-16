import axios from "axios";
import dotenv from "dotenv";
import { DateFormatted } from "./dateFunction.js";

dotenv.config();
export const SendMessage = async (data) => {

  const formattedDate = await DateFormatted();


  const message = `
Hi <!channel> 👋
‎ 
Here’s our Meta Ads performance snapshots:
‎ 
⚡${formattedDate}⚡

-----------------------------
Total Spend: $${Number(data.spend).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Total Revenue: $${Number(data.action_values_omni_purchase).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
ROAS: ${data.website_purchase_roas_offsite_conversion_fb_pixel_purchase.toFixed(1)}x
AOV: $${data.AOV.toFixed(2)}
CR : ${data.CR.toFixed(2)}%
-----------------------------
Total Purchases: ${data.actions_offsite_conversion_fb_pixel_purchase}
Cost Per Purchase: $${Number(data.cost_per_action_type_omni_purchase).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Total Clicks: ${Number(data.actions_link_click).toLocaleString('en-US', { minimumFractionDigits: 0 })}
Cost Per Click: $${data.cost_per_action_type_link_click.toFixed(2).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
Add To Cart: ${Number(data.actions_add_to_cart).toLocaleString('en-US', { minimumFractionDigits: 0 })}
Cost Per Add To Cart: $${data.cost_per_action_type_add_to_cart.toFixed(2).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
Total Initiate Checkouts: ${Number(data.actions_initiate_checkout).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
Cost Per Initiate Checkout: $${Number(data.cost_per_action_type_initiate_checkout).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Click Through Rate: ${data.outbound_clicks_ctr_outbound_click.toFixed(2)}%
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
