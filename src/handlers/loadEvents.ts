/**
 * SDB-Discord (@shinchandelbarrio's official Discord Bot)
 * @author M4RC0Sx <https://github.com/M4RC0Sx/SDB-Discord>
 */

import { Client, Interaction } from "discord.js";

import { log } from "../util/utils";

const buttonEvent = (event: string) =>
  require(`../events/interactions/buttons/${event}`);
const clientEvent = (event: string) => require(`../events/client/${event}`);

export function loadEvents(client: Client) {
  log("Loading events...");

  // Client events
  console.log("\t-> Loading client events...");
  client.once("ready", () => clientEvent("ready")(client));

  // Button events
  console.log("\t-> Loading button events...");
  client.on("interactionCreate", (i: Interaction) =>
    buttonEvent("classJoin")(client, i)
  );
}
