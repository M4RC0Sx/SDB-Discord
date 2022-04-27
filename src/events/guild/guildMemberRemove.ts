import { GuildMember } from "discord.js";
import { SDBClient } from "../../SDBClient";
import { log } from "../../util/utils";

module.exports = async (client: SDBClient, member: GuildMember) => {
  if (member.user.bot) return; // Avoid bots
  if (!member.guild.equals(client.getGuild())) return; // Avoid other guilds

  log("A member has left! Updating user counter...");
  client.updateUserCounter();
};
