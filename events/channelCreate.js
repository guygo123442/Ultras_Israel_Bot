/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const config = require("../config");

module.exports = {
  name: "channelCreate",
  async run(channel) {
    if (!channel.guild) return;

    const log = channel.guild.channels.cache.get(config.logChannelId);
    if (!log) return;

    log.send(
      `📁 **חדר נוצר**\n` +
      `שם: ${channel.name}\n` +
      `ID: ${channel.id}`
    );
  }
};