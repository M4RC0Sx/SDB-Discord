/**
 * SDB-Discord (@shinchandelbarrio's official Discord Bot)
 * @author M4RC0Sx <https://github.com/M4RC0Sx/SDB-Discord>
 */

import { Client, ClientOptions, Collection } from "discord.js";
import { CHANNEL_USER_COUNTER_ID } from "./util/config";

class SDBClient extends Client {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commands: Collection<any, any>;
  guildId: string;
  counterRecentlyUpdated: boolean;

  constructor(options: ClientOptions, guildId: string) {
    super(options);
    this.guildId = guildId;
    this.commands = new Collection();
    this.counterRecentlyUpdated = false;
  }

  getGuild() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.guilds.cache.get(this.guildId)!;
  }

  updateUserCounter() {
    if (this.counterRecentlyUpdated) return;

    const ch = this.getGuild().channels.cache.get(CHANNEL_USER_COUNTER_ID);
    if (ch) {
      ch.setName(`${ch.name.split(":")[0]}: ${this.getGuild().memberCount}`)
        .then((newCh) => {
          console.log(`\tUpdated user counter success! (${newCh.name})`);
          this.counterRecentlyUpdated = true;
          setTimeout(() => {
            this.counterRecentlyUpdated = false;
          }, 5 * 60 * 1000);
        })
        .catch((err) => console.log(`\tError updating user counter: ${err}`));
    }
  }
}

export { SDBClient };
