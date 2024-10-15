import { fetchDataAds } from "./fetchDataAds.js";
import { deleteSheetsData, updateGoogleSheets } from "./updateGoogleSheets.js";
import { SendMessage } from "./sendMessage.js";
import { TotalData } from "./totalData.js";
import cron from "node-cron";


cron.schedule("*/30 * * * * ", async () => {
  console.log("start!");
  try {
    await deleteSheetsData();
    const data = await fetchDataAds();  
    const message = TotalData(data);
    
    
    SendMessage(message);
  
  
    console.log("Envio de dados finalizado!");
  
    await updateGoogleSheets(data);
  } catch (error) {
    console.error("Erro ao executar cron job:", error);
  }
})();



