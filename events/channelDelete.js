/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const { AuditLogEvent } = require("discord.js");
const config = require("../config");

module.exports = {
  name: "channelDelete",
  async run(channel) {
    if (!channel.guild) return;

    const log = channel.guild.channels.cache.get(config.logChannelId);
    if (!log) return;

    let executor = "לא ידוע";

    try {
      const audit = await channel.guild.fetchAuditLogs({
        type: AuditLogEvent.ChannelDelete,
        limit: 1
      });

      const entry = audit.entries.first();

      if (entry && entry.target?.id === channel.id) {
        executor = `${entry.executor.tag} (${entry.executor.id})`;
      }
    } catch {}

    log.send(
      `🗑️ **חדר נמחק**\n` +
      `שם: ${channel.name}\n` +
      `ID: ${channel.id}\n` +
      `בוצע על ידי: ${executor}`
    );
  }
};