import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

export async function deleteSheetsData() {
    const sheets = process.env.SHEETDB_API_URL;

    try {
        const response = await axios.delete(`${sheets}/all`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log('Dados deletados com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao deletar os dados:', error.response?.data || error.message);
    }
}

export async function updateGoogleSheets(data) {
    const sheetDBUrl = process.env.SHEETDB_API_URL;
    const batchSize = 200; 

    if (!Array.isArray(data)) {
        console.error("Expected data to be an array, but got:", typeof data);
        return;
    }

    for (let i = 0; i < data.length; i += batchSize) {
        const batch = data.slice(i, i + batchSize);
        
        const formattedData = batch.map(item => {
            const actionValueOmniPurchase = item.action_values_omni_purchase || 0;
            const actionValueFbPixelPurchase = item.actions_offsite_conversion_fb_pixel_purchase || 1; 
            const outboundClicks = item.outbound_clicks_outbound_click || 1;
            
            const divisionResult = actionValueOmniPurchase / actionValueFbPixelPurchase;
            const conversionRate = ((actionValueOmniPurchase / outboundClicks) * 100).toFixed(2) + '%';
            return {
                campaign: item.campaign || 'N/A',
                date: item.date || 'N/A',
                spend: item.spend || 0,
                cost_per_action_type_omni_purchase: item.cost_per_action_type_omni_purchase || 0,
                link_clicks: item.link_clicks || 0,
                cost_per_action_type_link_click: item.cost_per_action_type_link_click || 0,
                actions_add_to_cart: item.actions_add_to_cart || 0,
                cost_per_action_type_add_to_cart: item.cost_per_action_type_add_to_cart || 0,
                action_values_initiate_checkout: item.action_values_initiate_checkout || 0,
                cost_per_action_type_initiate_checkout: item.cost_per_action_type_initiate_checkout || 0,
                action_values_omni_purchase: actionValueOmniPurchase,
                outbound_clicks_ctr_outbound_click: item.outbound_clicks_ctr_outbound_click || 0,
                aov: divisionResult, 
                outboundClicks: item.outbound_clicks_outbound_click,
                conversion_rate: conversionRate 
            };
        });

        try {
            const response = await axios.post(sheetDBUrl, { data: formattedData });
            console.log(`Batch ${Math.floor(i / batchSize) + 1} sent successfully:`, response.data);
        } catch (error) {
            console.error('Error sending batch data to SheetDB:', error);
        }
    }
}
