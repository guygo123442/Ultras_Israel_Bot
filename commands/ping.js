/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("בודק אם הבוט עובד"),

  async run(interaction) {
    await interaction.reply(`🏓 Pong! ${interaction.client.ws.ping}ms`);
  }
};