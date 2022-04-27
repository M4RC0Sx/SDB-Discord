import { Client } from "discord.js";

import { log, logBotCredits } from "../../util/utils";
import { ACTIVITY } from "../../util/config";

module.exports = (client: Client) => {
  if (client.user) {
    log("Client is ready! Setting activity...");
    client.user?.setActivity(ACTIVITY, { type: "PLAYING" });

    log("Bot params:");
    console.log(`\t-> Username: ${client.user?.username}`);

    logBotCredits();
  }
};
