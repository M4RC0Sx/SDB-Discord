/**
 * SDB-Discord (@shinchandelbarrio's official Discord Bot)
 * @author M4RC0Sx <https://github.com/M4RC0Sx/SDB-Discord>
 */

import { GuildMember } from "discord.js";

import {
  CONSOLE_PREFIX,
  ROLE_ADMIN_ID,
  ROLE_ROSE_ID,
  ROLE_SUNFLOWER_ID,
  ROLE_CHERRY_ID
} from "./config";

export const log = (msg: string) => {
  console.log(`${CONSOLE_PREFIX} ${msg}`);
};

export const logBotCredits = () => {
  console.log("================= SDB-Discord =================");
  console.log("\t-> Project Name: SDB-Discord");
  console.log(
    "\t-> Description: DiscordJS bot made for @shinchandelbarrio's official Discord server."
  );
  console.log("\t-> Author(s): M4RC0Sx");
  console.log("\t-> GitHub: https://github.com/M4RC0Sx/SDB-Discord");
  console.log("===============================================");
};

export const isAdmin = (user: GuildMember) => {
  return user.roles.cache.has(ROLE_ADMIN_ID);
};

export const isInClass = (user: GuildMember) => {
  return (
    user.roles.cache.has(ROLE_ROSE_ID) ||
    user.roles.cache.has(ROLE_SUNFLOWER_ID) ||
    user.roles.cache.has(ROLE_CHERRY_ID)
  );
};
