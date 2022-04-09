/**
 * SDB-Discord (@shinchandelbarrio's official Discord Bot)
 * @author M4RC0Sx <https://github.com/M4RC0Sx/SDB-Discord>
 */

import { Interaction } from "discord.js";

const fs = require('fs');

const { Client, Intents, Collection } = require('discord.js');
require('dotenv').config();

const { loadEvents } = require('./handlers/loadEvents')

const { log, logBotCredits } = require('./util/utils');

const { TOKEN, ACTIVITY, GUILD_ID } = require('./util/config');
const BOT_SETTINGS = require('./util/config');


// Log bot settings
log("Environmental/config variables:");
for (const key in BOT_SETTINGS) {
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
const client = new Client({
    disableMentions: 'everyone',
    restTimeOffset: 0,
    intents: intents
});

// Load events
loadEvents(client);

// Read and initialize slash commands
client.commands = new Collection();

const cmdFiles = fs.readdirSync(`${__dirname}/commands`)
    .filter((file: any) => (file.endsWith('.js') || file.endsWith('.ts')));
log("Loading slash commands...");
for (const f of cmdFiles) {
    console.log(`\t-> Slash command loaded: ${f}`)
    const cmd = require(`${__dirname}/commands/${f}`);
    client.commands.set(cmd.data.name, cmd);
}

// Client login an ready event
client.login(TOKEN);
client.once('ready', () => {
    log("Client is ready! Setting activity...")
    client.user.setActivity(ACTIVITY, { type: 'PLAYING' });

    log("Bot params:")
    console.log(`\t-> Username: ${client.user.username}`)

    logBotCredits();
});

// Slash command interaction handler
client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'Ha ocurrido un error al ejecutar este comando.', ephemeral: true });
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