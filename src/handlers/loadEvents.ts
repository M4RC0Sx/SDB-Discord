/**
 * SDB-Discord (@shinchandelbarrio's official Discord Bot)
 * @author M4RC0Sx <https://github.com/M4RC0Sx/SDB-Discord>
 */

import { GuildMember, Interaction } from "discord.js";
import { SDBClient } from "../SDBClient";

import { log } from "../util/utils";

const clientEvent = (event: string) => require(`../events/client/${event}`);
const guildEvent = (event: string) => require(`../events/guild/${event}`);
const buttonEvent = (event: string) =>
  require(`../events/interactions/buttons/${event}`);

export function loadEvents(client: SDBClient) {
  log("Loading events...");

  // Client events
  console.log("\t-> Loading client events...");
  client.once("ready", () => clientEvent("ready")(client));

  // Guild events
  console.log("\t-> Loading guild events...");
  client.on("guildMemberAdd", (m: GuildMember) =>
    guildEvent("guildMemberAdd")(client, m)
  );
  client.on("guildMemberRemove", (m: GuildMember) =>
    guildEvent("guildMemberRemove")(client, m)
  );

  // Button events
  console.log("\t-> Loading button events...");
  client.on("interactionCreate", (i: Interaction) =>
    buttonEvent("classJoin")(client, i)
  );
}
