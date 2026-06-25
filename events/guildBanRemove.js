/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const config = require("../config");

module.exports = {
  name: "guildBanRemove",
  async run(ban) {
    const log = ban.guild.channels.cache.get(config.logChannelId);
    if (!log) return;

    log.send(
      `✅ **באן הוסר**\n` +
      `משתמש: ${ban.user.tag}\n` +
      `ID: ${ban.user.id}`
    );
  }
};