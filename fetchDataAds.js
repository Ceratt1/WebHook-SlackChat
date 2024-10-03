import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const fields = [
    'campaign',
    'date',
    'clicks',
    'account_id',
    'spend', //Amount spent
    // 'results',
    'catalog_segment_value_omni_purchase_roas', //ROA
    // 'cpa',
    'actions_link_click', //Link clicks
    'cpc', // CPC
    'action_values_add_to_cart', // Add to carts (number) 
    'cost_per_action_type_add_to_cart', //Add to carts (cost)
    'action_values_initiate_checkout', // Initiate checkouts (number)
    'cost_per_action_type_initiate_checkout', // Initiate checkouts (cost)
    'action_values_omni_purchase', // Purchase conversion value
    'ctr', // CTR
    // 'aov',
    // 'cr',
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
