/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("נותן באן למשתמש")
    .addUserOption(option =>
      option.setName("user").setDescription("המשתמש").setRequired(true)
    )
    .addStringOption(option =>
      option.setName("reason").setDescription("סיבה").setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async run(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") || "No reason";

    const member = await interaction.guild.members.fetch(user.id).catch(() => null);
    if (!member) return interaction.reply({ content: "לא מצאתי את המשתמש.", ephemeral: true });

    await member.ban({ reason });
    await interaction.reply(`🔨 ${user.tag} קיבל באן. סיבה: ${reason}`);
  }
};