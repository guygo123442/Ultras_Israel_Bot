/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const { AuditLogEvent } = require("discord.js");
const config = require("../config");

async function getExecutor(guild, type, targetId) {
  try {
    const audit = await guild.fetchAuditLogs({
      type,
      limit: 1
    });

    const entry = audit.entries.first();

    if (entry && entry.target?.id === targetId) {
      return `${entry.executor.tag} (${entry.executor.id})`;
    }
  } catch {}

  return "לא ידוע";
}

module.exports = {
  name: "guildMemberUpdate",
  async run(oldMember, newMember) {
    const log = newMember.guild.channels.cache.get(config.logChannelId);
    if (!log) return;

    const oldRoles = oldMember.roles.cache;
    const newRoles = newMember.roles.cache;

    const added = newRoles.filter(role => !oldRoles.has(role.id));
    const removed = oldRoles.filter(role => !newRoles.has(role.id));

    if (added.size > 0) {
      const executor = await getExecutor(
        newMember.guild,
        AuditLogEvent.MemberRoleUpdate,
        newMember.id
      );

      log.send(
        `✅ **רול נוסף למשתמש**\n` +
        `משתמש: ${newMember.user.tag}\n` +
        `רול: ${added.map(r => r.name).join(", ")}\n` +
        `בוצע על ידי: ${executor}`
      );
    }

    if (removed.size > 0) {
      const executor = await getExecutor(
        newMember.guild,
        AuditLogEvent.MemberRoleUpdate,
        newMember.id
      );

      log.send(
        `❌ **רול הוסר ממשתמש**\n` +
        `משתמש: ${newMember.user.tag}\n` +
        `רול: ${removed.map(r => r.name).join(", ")}\n` +
        `בוצע על ידי: ${executor}`
      );
    }

    if (oldMember.nickname !== newMember.nickname) {
      const executor = await getExecutor(
        newMember.guild,
        AuditLogEvent.MemberUpdate,
        newMember.id
      );

      log.send(
        `✏️ **ניק השתנה**\n` +
        `משתמש: ${newMember.user.tag}\n` +
        `לפני: ${oldMember.nickname || "אין"}\n` +
        `אחרי: ${newMember.nickname || "אין"}\n` +
        `בוצע על ידי: ${executor}`
      );
    }

    const oldTimeout = oldMember.communicationDisabledUntilTimestamp;
    const newTimeout = newMember.communicationDisabledUntilTimestamp;

    if (!oldTimeout && newTimeout) {
      const executor = await getExecutor(
        newMember.guild,
        AuditLogEvent.MemberUpdate,
        newMember.id
      );

      log.send(
        `🔇 **משתמש קיבל Timeout / Mute**\n` +
        `משתמש: ${newMember.user.tag}\n` +
        `עד: <t:${Math.floor(newTimeout / 1000)}:F>\n` +
        `בוצע על ידי: ${executor}`
      );
    }

    if (oldTimeout && !newTimeout) {
      const executor = await getExecutor(
        newMember.guild,
        AuditLogEvent.MemberUpdate,
        newMember.id
      );

      log.send(
        `🔊 **Timeout / Mute הוסר**\n` +
        `משתמש: ${newMember.user.tag}\n` +
        `בוצע על ידי: ${executor}`
      );
    }

    if (oldTimeout && newTimeout && oldTimeout !== newTimeout) {
      const executor = await getExecutor(
        newMember.guild,
        AuditLogEvent.MemberUpdate,
        newMember.id
      );

      log.send(
        `⏳ **Timeout / Mute שונה**\n` +
        `משתמש: ${newMember.user.tag}\n` +
        `עד חדש: <t:${Math.floor(newTimeout / 1000)}:F>\n` +
        `בוצע על ידי: ${executor}`
      );
    }
  }
};