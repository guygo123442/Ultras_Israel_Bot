/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const config = require("../config");

module.exports = {
  name: "roleCreate",
  async run(role) {
    const log = role.guild.channels.cache.get(config.logChannelId);
    if (!log) return;

    log.send(
      `➕ **רול נוצר**\n` +
      `שם: ${role.name}\n` +
      `ID: ${role.id}`
    );
  }
};