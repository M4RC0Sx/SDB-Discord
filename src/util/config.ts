/**
 * SDB-Discord (@shinchandelbarrio's official Discord Bot)
 * @author M4RC0Sx <https://github.com/M4RC0Sx/SDB-Discord>
 */

let config;

// Try to use a config file. If not provided, use .env
try {
    config = require("../../config.json");
} catch (error) {
    console.log("No config.json file provided... Using ENV instead.")
    config = null;
}

exports.TOKEN = config ? config.TOKEN : process.env.TOKEN;
exports.CONSOLE_PREFIX = config ? config.CONSOLE_PREFIX : process.env.CONSOLE_PREFIX;
exports.ACTIVITY = config ? config.ACTIVITY : process.env.ACTIVITY;
exports.GUILD_ID = config ? config.GUILD_ID : process.env.GUILD_ID;
exports.CLIENT_ID = config ? config.CLIENT_ID : process.env.CLIENT_ID;

exports.MAIN_COLOR = config ? config.MAIN_COLOR : process.env.MAIN_COLOR;

exports.INSTAGRAM_USER = config ? config.INSTAGRAM_USER : process.env.INSTAGRAM_USER;
exports.TIKTOK_URL = config ? config.TIKTOK_URL : process.env.TIKTOK_URL;

exports.ROLE_ROSE_ID = config ? config.ROLE_ROSE_ID : process.env.ROLE_ROSE_ID;
exports.ROLE_SUNFLOWER_ID = config ? config.ROLE_SUNFLOWER_ID : process.env.ROLE_SUNFLOWER_ID;
exports.ROLE_CHERRY_ID = config ? config.ROLE_CHERRY_ID : process.env.ROLE_CHERRY_ID;

exports.ROLE_ADMIN_ID = config ? config.ROLE_ADMIN_ID : process.env.ROLE_ADMIN_ID;