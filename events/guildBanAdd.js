/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const { AuditLogEvent } = require("discord.js");
const config = require("../config");

module.exports = {
  name: "guildBanAdd",
  async run(ban) {
    const log = ban.guild.channels.cache.get(config.logChannelId);
    if (!log) return;

    let executor = "לא ידוע";
    let reason = "אין סיבה";

    try {
      const audit = await ban.guild.fetchAuditLogs({
        type: AuditLogEvent.MemberBanAdd,
        limit: 1
      });

      const entry = audit.entries.first();

      if (entry && entry.target?.id === ban.user.id) {
        executor = `${entry.executor.tag} (${entry.executor.id})`;
        reason = entry.reason || "אין סיבה";
      }
    } catch {}

    log.send(
      `🔨 **באן נוסף**\n` +
      `משתמש: ${ban.user.tag}\n` +
      `ID: ${ban.user.id}\n` +
      `סיבה: ${reason}\n` +
      `בוצע על ידי: ${executor}`
    );
  }
};