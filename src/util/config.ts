/**
 * SDB-Discord (@shinchandelbarrio's official Discord Bot)
 * @author M4RC0Sx <https://github.com/M4RC0Sx/SDB-Discord>
 */

let config;

// Try to use a config file. If not provided, use .env
try {
  config = require("../../config.json");
} catch (error) {
  console.log("No config.json file provided... Using ENV instead.");
  config = null;
}

export const TOKEN = config ? config.TOKEN : process.env.TOKEN;
export const PREFIX = config ? config.PREFIX : process.env.PREFIX;
export const ACTIVITY = config ? config.ACTIVITY : process.env.ACTIVITY;
export const GUILD_ID = config ? config.GUILD_ID : process.env.GUILD_ID;
export const CLIENT_ID = config ? config.CLIENT_ID : process.env.CLIENT_ID;

export const SQLITE_DATABASE = config
  ? config.SQLITE_DATABASE
  : process.env.SQLITE_DATABASE;
export const SQLITE_USER = config
  ? config.SQLITE_USER
  : process.env.SQLITE_USER;
export const SQLITE_PASSWORD = config
  ? config.SQLITE_PASSWORD
  : process.env.SQLITE_PASSWORD;

export const MAIN_COLOR = config ? config.MAIN_COLOR : process.env.MAIN_COLOR;

export const INSTAGRAM_USER = config
  ? config.INSTAGRAM_USER
  : process.env.INSTAGRAM_USER;
export const TIKTOK_URL = config ? config.TIKTOK_URL : process.env.TIKTOK_URL;

export const ROLE_ROSE_ID = config
  ? config.ROLE_ROSE_ID
  : process.env.ROLE_ROSE_ID;
export const ROLE_SUNFLOWER_ID = config
  ? config.ROLE_SUNFLOWER_ID
  : process.env.ROLE_SUNFLOWER_ID;
export const ROLE_CHERRY_ID = config
  ? config.ROLE_CHERRY_ID
  : process.env.ROLE_CHERRY_ID;

export const ROLE_ADMIN_ID = config
  ? config.ROLE_ADMIN_ID
  : process.env.ROLE_ADMIN_ID;

export const CHANNEL_USER_COUNTER_ID = config
  ? config.CHANNEL_USER_COUNTER_ID
  : process.env.CHANNEL_USER_COUNTER_ID;
export const CHANNEL_CHERRY_COUNTER_ID = config
  ? config.CHANNEL_CHERRY_COUNTER_ID
  : process.env.CHANNEL_CHERRY_COUNTER_ID;
export const CHANNEL_SUNFLOWER_COUNTER_ID = config
  ? config.CHANNEL_SUNFLOWER_COUNTER_ID
  : process.env.CHANNEL_SUNFLOWER_COUNTER_ID;
export const CHANNEL_ROSE_COUNTER_ID = config
  ? config.CHANNEL_ROSE_COUNTER_ID
  : process.env.CHANNEL_ROSE_COUNTER_ID;
export const CHANNEL_STAFF_LOG_ID = config
  ? config.CHANNEL_STAFF_LOG_ID
  : process.env.CHANNEL_STAFF_LOG_ID;
