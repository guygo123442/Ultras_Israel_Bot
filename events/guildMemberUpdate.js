/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const config = require("../config");

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
      log.send(
        `✅ **רול נוסף למשתמש**\n` +
        `משתמש: ${newMember.user.tag}\n` +
        `רול: ${added.map(r => r.name).join(", ")}`
      );
    }

    if (removed.size > 0) {
      log.send(
        `❌ **רול הוסר ממשתמש**\n` +
        `משתמש: ${newMember.user.tag}\n` +
        `רול: ${removed.map(r => r.name).join(", ")}`
      );
    }

    if (oldMember.nickname !== newMember.nickname) {
      log.send(
        `✏️ **ניק השתנה**\n` +
        `משתמש: ${newMember.user.tag}\n` +
        `לפני: ${oldMember.nickname || "אין"}\n` +
        `אחרי: ${newMember.nickname || "אין"}`
      );
    }

    const oldTimeout = oldMember.communicationDisabledUntilTimestamp;
    const newTimeout = newMember.communicationDisabledUntilTimestamp;

    if (!oldTimeout && newTimeout) {
      log.send(
        `🔇 **משתמש קיבל Timeout / Mute**\n` +
        `משתמש: ${newMember.user.tag}\n` +
        `עד: <t:${Math.floor(newTimeout / 1000)}:F>`
      );
    }

    if (oldTimeout && !newTimeout) {
      log.send(
        `🔊 **Timeout / Mute הוסר**\n` +
        `משתמש: ${newMember.user.tag}`
      );
    }

    if (oldTimeout && newTimeout && oldTimeout !== newTimeout) {
      log.send(
        `⏳ **Timeout / Mute שונה**\n` +
        `משתמש: ${newMember.user.tag}\n` +
        `עד חדש: <t:${Math.floor(newTimeout / 1000)}:F>`
      );
    }
  }
};