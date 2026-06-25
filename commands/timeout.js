/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("נותן טיימאאוט למשתמש")
    .addUserOption(option =>
      option.setName("user").setDescription("המשתמש").setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName("minutes").setDescription("כמה דקות").setRequired(true)
    )
    .addStringOption(option =>
      option.setName("reason").setDescription("סיבה").setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async run(interaction) {
    const user = interaction.options.getUser("user");
    const minutes = interaction.options.getInteger("minutes");
    const reason = interaction.options.getString("reason") || "No reason";

    const member = await interaction.guild.members.fetch(user.id).catch(() => null);
    if (!member) return interaction.reply({ content: "לא מצאתי את המשתמש.", ephemeral: true });

    await member.timeout(minutes * 60 * 1000, reason);
    await interaction.reply(`⏳ ${user.tag} קיבל timeout ל־${minutes} דקות.`);
  }
};