/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const config = require("../config");

module.exports = {
  name: "messageDelete",
  async run(message) {
    if (!message.guild || message.author?.bot) return;

    const log = message.guild.channels.cache.get(config.logChannelId);
    if (!log) return;

    log.send({
      content:
        `🗑️ **הודעה נמחקה**\n` +
        `משתמש: ${message.author.tag}\n` +
        `חדר: ${message.channel}\n` +
        `תוכן: ${message.content || "אין תוכן"}`
    });
  }
};
