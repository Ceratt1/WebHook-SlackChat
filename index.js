import { fetchDataAds } from "./fetchDataAds.js";
import { deleteSheetsData, updateGoogleSheets } from "./updateGoogleSheets.js";
import { SendMessage } from "./sendMessage.js";
import dotenv from "dotenv";
import cron from "node-cron";
dotenv.config();

cron.schedule("* * * * * ", async () => {
  console.log("start!");

  try {
    await deleteSheetsData();
    const data = await fetchDataAds();

    const formattedData = Object.entries(data[0])
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    SendMessage(formattedData);
    SendMessage(process.env.DOCSHEET_URL);


    console.log("Envio de dados finalizado!");

    await updateGoogleSheets(data);
  } catch (error) {
    console.error("Erro ao executar cron job:", error);
  }
});


