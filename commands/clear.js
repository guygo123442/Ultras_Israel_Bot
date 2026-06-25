/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("מוחק הודעות")
    .addIntegerOption(option =>
      option
        .setName("amount")
        .setDescription("כמה הודעות למחוק")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async run(interaction) {
    const amount = interaction.options.getInteger("amount");

    if (amount < 1 || amount > 100) {
      return interaction.reply({ content: "אפשר למחוק בין 1 ל־100 הודעות.", ephemeral: true });
    }

    await interaction.channel.bulkDelete(amount, true);
    await interaction.reply({ content: `נמחקו ${amount} הודעות.`, ephemeral: true });
  }
};