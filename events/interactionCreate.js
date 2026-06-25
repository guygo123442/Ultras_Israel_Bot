/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const config = require("../config");

module.exports = {
  name: "interactionCreate",
  async run(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    const hasRole = interaction.member.roles.cache.has(config.commandRoleId);

    if (!hasRole) {
      return interaction.reply({
        content: "אין לך גישה להשתמש בפקודות של הבוט.",
        ephemeral: true
      });
    }

    try {
      await command.run(interaction, client);
    } catch (err) {
      console.error(err);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: "יש שגיאה בפקודה.", ephemeral: true });
      } else {
        await interaction.reply({ content: "יש שגיאה בפקודה.", ephemeral: true });
      }
    }
  }
};