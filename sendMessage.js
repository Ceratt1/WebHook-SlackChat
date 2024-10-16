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
⚡${formattedDate}⚡

-----------------------------
Total Spend: $${data.spend.toFixed(2).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
Total Revenue: $${data.action_values_omni_purchase.toFixed(2).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
ROA: ${data.website_purchase_roas_offsite_conversion_fb_pixel_purchase.toFixed(1)}x
AOV: $${data.AOV.toFixed(2)}
CR : ${data.CR.toFixed(2)}%
-----------------------------
Total Purchases: ${data.actions_offsite_conversion_fb_pixel_purchase}
Cost Per Purchase: $${Number(data.cost_per_action_type_omni_purchase).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
Total Clicks: ${data.link_clicks}
Cost Per Click: $${data.cost_per_action_type_link_click.toFixed(2).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}.00
Add To Cart: ${data.actions_add_to_cart}
Cost Per Add To Cart: $${data.cost_per_action_type_add_to_cart.toFixed(2).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
Total Initiate Checkouts: $${data.actions_initiate_checkout.toFixed(2).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
Cost Per Initiate Checkout: $${data.cost_per_action_type_initiate_checkout.toFixed(2).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}.00
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
