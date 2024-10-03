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
        
        const formattedData = batch.map(item => ({
            campaign: item.campaign,
            date: item.date,
            clicks: item.clicks,
            spend: item.spend,
            catalog_segment_value_omni_purchase_roas: item.catalog_segment_value_omni_purchase_roas,
            actions_link_click: item.actions_link_click,
            cpc: item.cpc,
            action_values_add_to_cart: item.action_values_add_to_cart,
            cost_per_action_type_add_to_cart: item.cost_per_action_type_add_to_cart,
            action_values_initiate_checkout: item.action_values_initiate_checkout,
            cost_per_action_type_initiate_checkout: item.cost_per_action_type_initiate_checkout,
            action_values_omni_purchase: item.action_values_omni_purchase,
            ctr: item.ctr,
        }));

        try {
            const response = await axios.post(sheetDBUrl, { data: formattedData });
            console.log(`Batch ${Math.floor(i / batchSize) + 1} sent successfully:`, response.data);
        } catch (error) {
            console.error('Error sending batch data to SheetDB:', error);
        }
    }
}
