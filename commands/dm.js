/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const { SlashCommandBuilder } = require("discord.js");
const config = require("../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dm")
    .setDescription("שולח הודעה פרטית לכל מי שבשרת")
    .addStringOption(option =>
      option
        .setName("message")
        .setDescription("ההודעה לשליחה")
        .setRequired(true)
    ),

  async run(interaction) {
    const messageText = interaction.options.getString("message");

    await interaction.deferReply({ ephemeral: true });

    const members = await interaction.guild.members.fetch();

    let sent = 0;
    let failed = 0;

    for (const [, member] of members) {
      if (member.user.bot) continue;

      try {
        await member.send(`**Ultras Israel**\n\n${messageText}`);
        sent++;
      } catch {
        failed++;
      }

      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    const log = interaction.guild.channels.cache.get(config.logChannelId);

    if (log) {
      log.send(
        `📩 **DM לכולם**\n` +
        `אדמין: ${interaction.user.tag}\n` +
        `נשלח: ${sent}\n` +
        `נכשל: ${failed}\n` +
        `הודעה: ${messageText}`
      );
    }

    await interaction.editReply(`✅ סיימתי.\nנשלח: ${sent}\nנכשל: ${failed}`);
  }
};