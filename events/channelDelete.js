/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const config = require("../config");

module.exports = {
  name: "channelDelete",
  async run(channel) {
    if (!channel.guild) return;

    const log = channel.guild.channels.cache.get(config.logChannelId);
    if (!log) return;

    log.send(
      `🗑️ **חדר נמחק**\n` +
      `שם: ${channel.name}\n` +
      `ID: ${channel.id}`
    );
  }
};