export const TotalData = (data) => {


    let returnValue = {
        spend : 0,
        action_values_omni_purchase : 0,
        website_purchase_roas_offsite_conversion_fb_pixel_purchase  : 0,
        AOV : 0,
        CR : 0,
        actions_offsite_conversion_fb_pixel_purchase : 0,
        cost_per_action_type_omni_purchase : 0,
        link_clicks : 0,
        cost_per_action_type_link_click : 0,
        actions_add_to_cart : 0,
        cost_per_action_type_add_to_cart : 0,
        actions_initiate_checkout : 0,
        cost_per_action_type_initiate_checkout : 0,
        outbound_clicks_ctr_outbound_click : 0

    }
    let actionTotal = 0
    let costTotal = 0
    let costCR = 0
    let OutbondCR = 0


    for (let index = 0; index < data.length; index++) {
        returnValue.spend += data[index].spend
        returnValue.action_values_omni_purchase += data[index].action_values_omni_purchase
        returnValue.website_purchase_roas_offsite_conversion_fb_pixel_purchase += data[index].website_purchase_roas_offsite_conversion_fb_pixel_purchase == null ? 0 : data[index].website_purchase_roas_offsite_conversion_fb_pixel_purchase;
        returnValue.actions_offsite_conversion_fb_pixel_purchase += data[index].actions_offsite_conversion_fb_pixel_purchase == null ? 0 : data[index].actions_offsite_conversion_fb_pixel_purchase;
        returnValue.cost_per_action_type_omni_purchase += data[index].cost_per_action_type_omni_purchase == null ? 0 : data[index].cost_per_action_type_omni_purchase;
        returnValue.link_clicks += data[index].link_clicks == null ? 0 : data[index].link_clicks;
        returnValue.cost_per_action_type_link_click += data[index].cost_per_action_type_link_click == null ? 0 : data[index].cost_per_action_type_link_click;
        returnValue.actions_add_to_cart += data[index].actions_add_to_cart == null ? 0 : data[index].actions_add_to_cart;
        returnValue.cost_per_action_type_add_to_cart += data[index].cost_per_action_type_add_to_cart == null ? 0 : data[index].cost_per_action_type_add_to_cart;
        returnValue.actions_initiate_checkout += data[index].actions_initiate_checkout == null ? 0 : data[index].actions_initiate_checkout;
        returnValue.cost_per_action_type_initiate_checkout += data[index].cost_per_action_type_initiate_checkout == null ? 0 : data[index].cost_per_action_type_initiate_checkout;
        returnValue.outbound_clicks_ctr_outbound_click += data[index].outbound_clicks_ctr_outbound_click == null ? 0 : data[index].outbound_clicks_ctr_outbound_click;



        if (data[index].action_values_omni_purchase  !=null && data[index].cost_per_action_type_omni_purchase != null) {
            actionTotal += parseFloat(data[index].action_values_omni_purchase)
            costTotal += parseFloat(data[index].cost_per_action_type_omni_purchase)
        }



        if (data[index].cost_per_action_type_omni_purchase   != null &&  data[index].outbound_clicks_outbound_click != null) {
            costCR += parseFloat(data[index].cost_per_action_type_omni_purchase)
            OutbondCR += parseFloat(data[index].outbound_clicks_outbound_click)
        }

    }

    returnValue.website_purchase_roas_offsite_conversion_fb_pixel_purchase = returnValue.website_purchase_roas_offsite_conversion_fb_pixel_purchase / data.length
    returnValue.AOV = actionTotal / costTotal
    returnValue.CR = (costCR / OutbondCR) * 100
    returnValue.cost_per_action_type_link_click = returnValue.cost_per_action_type_link_click / data.length
    returnValue.cost_per_action_type_add_to_cart = returnValue.cost_per_action_type_add_to_cart / data.length

    returnValue.cost_per_action_type_initiate_checkout = returnValue.cost_per_action_type_initiate_checkout / data.length
    returnValue.outbound_clicks_ctr_outbound_click = (returnValue.outbound_clicks_ctr_outbound_click / data.length) * 100










    return returnValue;
}