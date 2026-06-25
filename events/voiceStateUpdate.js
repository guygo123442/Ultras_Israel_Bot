/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const config = require("../config");

module.exports = {
  name: "voiceStateUpdate",
  async run(oldState, newState) {
    const log = newState.guild.channels.cache.get(config.logChannelId);
    if (!log) return;

    const user = newState.member?.user?.tag || oldState.member?.user?.tag || "Unknown";

    if (!oldState.channel && newState.channel) {
      log.send(
        `🔊 **נכנס לוויס**\n` +
        `משתמש: ${user}\n` +
        `חדר: ${newState.channel.name}`
      );
    }

    if (oldState.channel && !newState.channel) {
      log.send(
        `🔇 **יצא מוויס**\n` +
        `משתמש: ${user}\n` +
        `חדר: ${oldState.channel.name}`
      );
    }

    if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
      log.send(
        `🔁 **עבר חדר וויס**\n` +
        `משתמש: ${user}\n` +
        `מ: ${oldState.channel.name}\n` +
        `אל: ${newState.channel.name}`
      );
    }

    if (oldState.serverMute !== newState.serverMute) {
      log.send(
        `🎙️ **Server Mute השתנה**\n` +
        `משתמש: ${user}\n` +
        `מצב: ${newState.serverMute ? "Muted" : "Unmuted"}`
      );
    }

    if (oldState.serverDeaf !== newState.serverDeaf) {
      log.send(
        `🔈 **Server Deaf השתנה**\n` +
        `משתמש: ${user}\n` +
        `מצב: ${newState.serverDeaf ? "Deafened" : "Undeafened"}`
      );
    }

    if (oldState.selfMute !== newState.selfMute) {
      log.send(
        `🎧 **Self Mute**\n` +
        `משתמש: ${user}\n` +
        `מצב: ${newState.selfMute ? "Muted" : "Unmuted"}`
      );
    }

    if (oldState.selfDeaf !== newState.selfDeaf) {
      log.send(
        `🔕 **Self Deaf**\n` +
        `משתמש: ${user}\n` +
        `מצב: ${newState.selfDeaf ? "Deafened" : "Undeafened"}`
      );
    }
  }
};