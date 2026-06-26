/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const { AuditLogEvent } = require("discord.js");
const config = require("../config");

module.exports = {
  name: "roleDelete",
  async run(role) {
    const log = role.guild.channels.cache.get(config.logChannelId);
    if (!log) return;

    let executor = "לא ידוע";

    try {
      const audit = await role.guild.fetchAuditLogs({
        type: AuditLogEvent.RoleDelete,
        limit: 1
      });

      const entry = audit.entries.first();

      if (entry && entry.target?.id === role.id) {
        executor = `${entry.executor.tag} (${entry.executor.id})`;
      }
    } catch {}

    log.send(
      `➖ **רול נמחק**\n` +
      `שם: ${role.name}\n` +
      `ID: ${role.id}\n` +
      `בוצע על ידי: ${executor}`
    );
  }
};