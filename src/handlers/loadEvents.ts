/**
 * SDB-Discord (@shinchandelbarrio's official Discord Bot)
 * @author M4RC0Sx <https://github.com/M4RC0Sx/SDB-Discord>
 */

import { Client, Interaction } from "discord.js";

const { log } = require('../util/utils');
const buttonEvent = (event: string) => require(`../events/interactions/buttons/${event}`);


function loadEvents(client: Client) {
    log('Loading events...')

    // Button events
    console.log('\t-> Loading button events...')
    client.on('interactionCreate', (i: Interaction) => buttonEvent('classJoin')(client, i));
}

module.exports = {
    loadEvents,
};