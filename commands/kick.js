/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("מוציא משתמש מהשרת")
    .addUserOption(option =>
      option.setName("user").setDescription("המשתמש").setRequired(true)
    )
    .addStringOption(option =>
      option.setName("reason").setDescription("סיבה").setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async run(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") || "No reason";

    const member = await interaction.guild.members.fetch(user.id).catch(() => null);
    if (!member) return interaction.reply({ content: "לא מצאתי את המשתמש.", ephemeral: true });

    await member.kick(reason);
    await interaction.reply(`👢 ${user.tag} קיבל קיק. סיבה: ${reason}`);
  }
};