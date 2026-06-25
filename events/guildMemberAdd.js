/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const config = require("../config");

module.exports = {
  name: "guildMemberAdd",
  async run(member) {
    const ch = member.guild.channels.cache.get(config.welcomeChannelId);
    if (!ch) return;

    ch.send(`ברוך הבא ${member} ל־**Ultras Israel** 🇮🇱`);
  }
};