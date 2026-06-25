/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const config = require("../config");

module.exports = {
  name: "guildMemberRemove",
  async run(member) {
    const log = member.guild.channels.cache.get(config.logChannelId);
    if (!log) return;

    log.send(
      `📤 **משתמש יצא מהשרת**\n` +
      `משתמש: ${member.user.tag}\n` +
      `ID: ${member.id}`
    );
  }
};