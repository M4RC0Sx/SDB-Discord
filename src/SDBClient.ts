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
import { Class } from "./handlers/dbModels";
import {
  CHANNEL_CHERRY_COUNTER_ID,
  CHANNEL_ROSE_COUNTER_ID,
  CHANNEL_STAFF_LOG_ID,
  CHANNEL_SUNFLOWER_COUNTER_ID,
  CHANNEL_USER_COUNTER_ID,
  ROLE_ADMIN_ID
} from "./util/config";

class SDBClient extends Client {
  getSocialGuild() {
    throw new Error("Method not implemented.");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commands: Collection<any, any>;
  guildId: string;
  counterRecentlyUpdated: boolean;

  cherryCounterRecentlyUpdated: boolean;
  sunflowerCounterRecentlyUpdated: boolean;
  roseCounterRecentlyUpdated: boolean;

  // AntiSpam
  antiFloodTimes: Collection<string, number>;

  constructor(options: ClientOptions, guildId: string) {
    super(options);
    this.guildId = guildId;
    this.commands = new Collection();
    this.counterRecentlyUpdated = false;

    this.cherryCounterRecentlyUpdated = false;
    this.sunflowerCounterRecentlyUpdated = false;
    this.roseCounterRecentlyUpdated = false;

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

  async updateCherryPointsCounter() {
    if (this.cherryCounterRecentlyUpdated) return;

    const classModel = await Class.findOne({
      where: { name: "CEREZAS" }
    });
    if (!classModel) return;

    const ch = this.getGuild().channels.cache.get(CHANNEL_CHERRY_COUNTER_ID);
    if (ch) {
      ch.setName(`${ch.name.split(":")[0]}: ${classModel.getPoints()}`)
        .then((newCh) => {
          console.log(`\tUpdated user counter success! (${newCh.name})`);
          this.cherryCounterRecentlyUpdated = true;
          setTimeout(() => {
            this.cherryCounterRecentlyUpdated = false;
          }, 5 * 60 * 1000);
        })
        .catch((err) => console.log(`\tError updating user counter: ${err}`));
    }
  }

  async updateSunflowerPointsCounter() {
    if (this.sunflowerCounterRecentlyUpdated) return;

    const classModel = await Class.findOne({
      where: { name: "GIRASOLES" }
    });
    if (!classModel) return;

    const ch = this.getGuild().channels.cache.get(CHANNEL_SUNFLOWER_COUNTER_ID);
    if (ch) {
      ch.setName(`${ch.name.split(":")[0]}: ${classModel.getPoints()}`)
        .then((newCh) => {
          console.log(`\tUpdated user counter success! (${newCh.name})`);
          this.sunflowerCounterRecentlyUpdated = true;
          setTimeout(() => {
            this.sunflowerCounterRecentlyUpdated = false;
          }, 5 * 60 * 1000);
        })
        .catch((err) => console.log(`\tError updating user counter: ${err}`));
    }
  }

  async updateRosePointsCounter() {
    if (this.roseCounterRecentlyUpdated) return;

    const classModel = await Class.findOne({
      where: { name: "ROSAS" }
    });
    if (!classModel) return;

    const ch = this.getGuild().channels.cache.get(CHANNEL_ROSE_COUNTER_ID);
    if (ch) {
      ch.setName(`${ch.name.split(":")[0]}: ${classModel.getPoints()}`)
        .then((newCh) => {
          console.log(`\tUpdated user counter success! (${newCh.name})`);
          this.roseCounterRecentlyUpdated = true;
          setTimeout(() => {
            this.roseCounterRecentlyUpdated = false;
          }, 5 * 60 * 1000);
        })
        .catch((err) => console.log(`\tError updating user counter: ${err}`));
    }
  }

  async updateAllPointsCounter() {
    await this.updateCherryPointsCounter();
    await this.updateSunflowerPointsCounter();
    await this.updateRosePointsCounter();
  }
}

export { SDBClient };
