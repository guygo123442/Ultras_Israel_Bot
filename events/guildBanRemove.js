/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const { AuditLogEvent } = require("discord.js");
const config = require("../config");

module.exports = {
  name: "guildBanRemove",
  async run(ban) {
    const log = ban.guild.channels.cache.get(config.logChannelId);
    if (!log) return;

    let executor = "לא ידוע";

    try {
      const audit = await ban.guild.fetchAuditLogs({
        type: AuditLogEvent.MemberBanRemove,
        limit: 1
      });

      const entry = audit.entries.first();

      if (entry && entry.target?.id === ban.user.id) {
        executor = `${entry.executor.tag} (${entry.executor.id})`;
      }
    } catch {}

    log.send(
      `✅ **באן הוסר**\n` +
      `משתמש: ${ban.user.tag}\n` +
      `ID: ${ban.user.id}\n` +
      `בוצע על ידי: ${executor}`
    );
  }
};