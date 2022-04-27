/**
 * SDB-Discord (@shinchandelbarrio's official Discord Bot)
 * @author M4RC0Sx <https://github.com/M4RC0Sx/SDB-Discord>
 */

import { Interaction } from "discord.js";

import fs from "fs";

import { Intents, Collection } from "discord.js";
import "dotenv/config";

import { loadEvents } from "./handlers/loadEvents";

import { log } from "./util/utils";
import { TOKEN } from "./util/config";
import * as BOT_SETTINGS from "./util/config";

import { SDBClient } from "./SDBClient";

// Log bot settings
log("Environmental/config variables:");
for (const key in BOT_SETTINGS) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  console.log(`\t-> ${key}: ${BOT_SETTINGS[key]}`);
}

// Setup intents
const intents = new Intents();
intents.add(
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_PRESENCES,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.GUILD_BANS,
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
);

// Setup client
const client = new SDBClient(
  {
    restTimeOffset: 0,
    intents: intents
  },
  BOT_SETTINGS.GUILD_ID
);

// Load events
loadEvents(client);

// Read and initialize slash commands
client.commands = new Collection();

const cmdFiles = fs
  .readdirSync(`${__dirname}/commands`)
  .filter((file: string) => file.endsWith(".js") || file.endsWith(".ts"));
log("Loading slash commands...");
for (const f of cmdFiles) {
  console.log(`\t-> Slash command loaded: ${f}`);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cmd = require(`${__dirname}/commands/${f}`);
  client.commands.set(cmd.data.name, cmd);
}

// Client login
client.login(TOKEN);

// Slash command interaction handler
client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: "Ha ocurrido un error al ejecutar este comando.",
      ephemeral: true
    });
  }
});

// Log exceptions
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: " + err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(
    "[FATAL] Possibly Unhandled Rejection at: Promise ",
    promise,
    " reason: ",
    reason
  );
});
