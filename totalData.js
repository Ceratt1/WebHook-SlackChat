export const TotalData = (data) => {


    let returnValue = {
        spend : 0,
        action_values_omni_purchase : 0
    }







    for (let index = 0; index < data.length; index++) {
        returnValue.spend += data[index].spend
        returnValue.action_values_omni_purchase += data[index].action_values_omni_purchase

    }

    return returnValue;
}