import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const fields = [
    'campaign',
    'date',
    'spend', 
    'cost_per_action_type_omni_purchase',
    'link_clicks',
    'cost_per_action_type_link_click',
    'actions_add_to_cart',
    'cost_per_action_type_add_to_cart',
    'actions_initiate_checkout',
    'cost_per_action_type_initiate_checkout',
    'action_values_omni_purchase',
    'outbound_clicks_ctr_outbound_click',
    'action_values_omni_purchase',
    'actions_offsite_conversion_fb_pixel_purchase',
    'outbound_clicks_outbound_click'
];

export async function fetchDataAds() {
    const apiKey = process.env.WINDSOR_API_KEY;
    const url = `https://connectors.windsor.ai/facebook?api_key=${apiKey}&date_preset=last_7d&fields=${fields.join(',')}`;

    try {
        const response = await axios.get(url);
        return response.data.data; 
    } catch (error) {
        console.error('Error fetching data from Windsor.ai:', error);
        return null; 
    }
}
