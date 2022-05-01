/**
 * SDB-Discord (@shinchandelbarrio's official Discord Bot)
 * @author M4RC0Sx <https://github.com/M4RC0Sx/SDB-Discord>
 */

import { log, logBotCredits } from "../../util/utils";
import { ACTIVITY } from "../../util/config";
import { SDBClient } from "../../SDBClient";
import { Class } from "../../handlers/dbModels";

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

    // DB syncronization
    Class.sync();

    log("Updating user counter...");
    client.updateUserCounter();

    log("Updating points counter...");
    client.updateAllPointsCounter();
  }
};
