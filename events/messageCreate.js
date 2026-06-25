/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const config = require("../config");

module.exports = {
  name: "messageCreate",
  async run(message, client) {
    if (!message.guild || message.author.bot) return;

    const member = message.member;
    const content = message.content.toLowerCase();

    if (config.antiLink) {
      const hasLink = config.blockedLinks.some(link => content.includes(link));

      if (hasLink && !member.permissions.has("ManageMessages")) {
        await message.delete().catch(() => {});

        const log = message.guild.channels.cache.get(config.logChannelId);
        if (log) {
          log.send(`🔗 לינק נחסם אצל ${message.author.tag}\n${message.content}`);
        }

        return;
      }
    }

    if (config.antiSpam) {
      const now = Date.now();
      const id = message.author.id;

      if (!client.spam.has(id)) {
        client.spam.set(id, []);
      }

      const arr = client.spam.get(id);
      arr.push(now);

      const filtered = arr.filter(t => now - t < config.spamTime);
      client.spam.set(id, filtered);

      if (filtered.length >= config.spamLimit && !member.permissions.has("ManageMessages")) {
        await message.delete().catch(() => {});
        await member.timeout(5 * 60 * 1000, "Anti spam").catch(() => {});

        const log = message.guild.channels.cache.get(config.logChannelId);
        if (log) {
          log.send(`🚨 Anti Spam: ${message.author.tag} קיבל timeout ל־5 דקות.`);
        }

        client.spam.set(id, []);
      }
    }
  }
};