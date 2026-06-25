/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("נותן אזהרה למשתמש")
    .addUserOption(option =>
      option.setName("user").setDescription("המשתמש").setRequired(true)
    )
    .addStringOption(option =>
      option.setName("reason").setDescription("סיבה").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async run(interaction, client) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");

    const key = `${interaction.guild.id}_${user.id}`;

    if (!client.warnings.has(key)) {
      client.warnings.set(key, []);
    }

    client.warnings.get(key).push({
      reason,
      mod: interaction.user.tag,
      time: Date.now()
    });

    await interaction.reply(`⚠️ ${user.tag} קיבל אזהרה.\nסיבה: ${reason}`);
  }
};