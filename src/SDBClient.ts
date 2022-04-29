/**
 * SDB-Discord (@shinchandelbarrio's official Discord Bot)
 * @author M4RC0Sx <https://github.com/M4RC0Sx/SDB-Discord>
 */

import {
  Client,
  ClientOptions,
  Collection,
  MessageEmbed,
  TextChannel
} from "discord.js";
import {
  CHANNEL_STAFF_LOG_ID,
  CHANNEL_USER_COUNTER_ID,
  ROLE_ADMIN_ID
} from "./util/config";

class SDBClient extends Client {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commands: Collection<any, any>;
  guildId: string;
  counterRecentlyUpdated: boolean;

  // AntiSpam
  antiFloodTimes: Collection<string, number>;

  constructor(options: ClientOptions, guildId: string) {
    super(options);
    this.guildId = guildId;
    this.commands = new Collection();
    this.counterRecentlyUpdated = false;

    this.antiFloodTimes = new Collection();
  }

  getGuild() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.guilds.cache.get(this.guildId)!;
  }

  getStaffRole() {
    return this.getGuild().roles.cache.get(ROLE_ADMIN_ID);
  }

  sendStaffLog(msg: string | MessageEmbed) {
    const ch = this.getGuild().channels.cache.get(
      CHANNEL_STAFF_LOG_ID
    ) as TextChannel;
    if (ch) {
      if (msg instanceof String) {
        ch.send(`${msg as string} ${this.getStaffRole()}`);
      } else {
        ch.send({ embeds: [msg as MessageEmbed] });
      }
    }
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

  updateAntiFloodTime(userId: string) {
    this.antiFloodTimes.set(userId, Date.now());
  }

  getAntiFloodTimeDiffSeconds(userId: string) {
    const lastTime = this.antiFloodTimes.get(userId);
    if (!lastTime) return -1;

    const diff = Date.now() - lastTime;
    return Math.floor(diff / 1000);
  }
}

export { SDBClient };
