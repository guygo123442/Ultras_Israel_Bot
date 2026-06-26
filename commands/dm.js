/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const { SlashCommandBuilder } = require("discord.js");
const config = require("../config");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendWithTimeout(member, text) {
  return Promise.race([
    member.send(`**Ultras Israel**\n\n${text}`),
    sleep(8000).then(() => {
      throw new Error("timeout");
    })
  ]);
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
    const log = interaction.guild.channels.cache.get(config.logChannelId);

    await interaction.reply({
      content: "📩 התחלתי לשלוח לכולם בפרטי מהר יותר. זה רץ ברקע.",
      ephemeral: true
    });

    const members = await interaction.guild.members.fetch();
    const list = members.filter(member => !member.user.bot).map(member => member);

    let sent = 0;
    let failed = 0;
    let checked = 0;

    const batchSize = 15;
    const delayBetweenBatches = 1200;

    if (log) {
      await log.send(
        `📩 **DM לכולם התחיל**\n` +
        `כמות לבדיקה: ${list.length}\n` +
        `מהירות: ${batchSize} במקביל`
      ).catch(() => {});
    }

    for (let i = 0; i < list.length; i += batchSize) {
      const batch = list.slice(i, i + batchSize);

      const results = await Promise.allSettled(
        batch.map(member => sendWithTimeout(member, messageText))
      );

      for (const result of results) {
        checked++;

        if (result.status === "fulfilled") {
          sent++;
        } else {
          failed++;
        }
      }

      if (checked % 150 === 0 && log) {
        await log.send(
          `📩 **DM Progress**\n` +
          `נבדקו: ${checked}/${list.length}\n` +
          `נשלח: ${sent}\n` +
          `נכשל: ${failed}`
        ).catch(() => {});
      }

      await sleep(delayBetweenBatches);
    }

    if (log) {
      await log.send(
        `✅ **DM לכולם הסתיים**\n` +
        `נבדקו: ${checked}/${list.length}\n` +
        `נשלח: ${sent}\n` +
        `נכשל: ${failed}`
      ).catch(() => {});
    }
  }
};