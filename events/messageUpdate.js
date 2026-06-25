/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const config = require("../config");

module.exports = {
  name: "messageUpdate",
  async run(oldMessage, newMessage) {
    if (!oldMessage.guild || oldMessage.author?.bot) return;
    if (oldMessage.content === newMessage.content) return;

    const log = oldMessage.guild.channels.cache.get(config.logChannelId);
    if (!log) return;

    log.send({
      content:
        `✏️ **הודעה נערכה**\n` +
        `משתמש: ${oldMessage.author.tag}\n` +
        `חדר: ${oldMessage.channel}\n` +
        `לפני: ${oldMessage.content || "אין"}\n` +
        `אחרי: ${newMessage.content || "אין"}`
    });
  }
};