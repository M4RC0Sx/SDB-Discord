/**
 * SDB-Discord (@shinchandelbarrio's official Discord Bot)
 * @author M4RC0Sx <https://github.com/M4RC0Sx/SDB-Discord>
 */

import { Client, ClientOptions, Collection } from "discord.js";

class SDBClient extends Client {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commands: Collection<any, any>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
  }
}

export { SDBClient };
