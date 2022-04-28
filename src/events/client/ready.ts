import { log, logBotCredits } from "../../util/utils";
import { ACTIVITY } from "../../util/config";
import { SDBClient } from "../../SDBClient";

module.exports = (client: SDBClient) => {
  if (client.user) {
    log("Client is ready! Setting activity...");
    client.user?.setActivity(
      `${ACTIVITY} - v${process.env.npm_package_version}`,
      { type: "PLAYING" }
    );

    log("Bot params:");
    console.log(`\t-> Username: ${client.user?.username}`);

    logBotCredits();

    log("Updating user counter...");
    client.updateUserCounter();
  }
};
