/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const { SlashCommandBuilder } = require("discord.js");
const config = require("../config");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

    await interaction.reply({
      content: "📩 התחלתי לשלוח לכולם בפרטי. זה רץ ברקע.",
      ephemeral: true
    });

    const log = interaction.guild.channels.cache.get(config.logChannelId);
    const guild = interaction.guild;
    const adminTag = interaction.user.tag;

    setImmediate(async () => {
      const members = await guild.members.fetch();

      let sent = 0;
      let failed = 0;
      let checked = 0;

      if (log) {
        await log.send(`📩 **DM לכולם התחיל**\nאדמין: ${adminTag}\nכמות בשרת: ${members.size}`);
      }

      for (const [, member] of members) {
        if (member.user.bot) continue;

        checked++;

        try {
          await member.send(`**Ultras Israel**\n\n${messageText}`);
          sent++;
        } catch {
          failed++;
        }

        if (checked % 50 === 0 && log) {
          await log.send(
            `📩 **DM Progress**\n` +
            `נבדקו: ${checked}\n` +
            `נשלח: ${sent}\n` +
            `נכשל: ${failed}`
          ).catch(() => {});
        }

        await sleep(350);
      }

      if (log) {
        await log.send(
          `✅ **DM לכולם הסתיים**\n` +
          `אדמין: ${adminTag}\n` +
          `נבדקו: ${checked}\n` +
          `נשלח: ${sent}\n` +
          `נכשל: ${failed}`
        ).catch(() => {});
      }
    });
  }
};