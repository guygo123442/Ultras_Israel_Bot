/*
MADE BY Gguy8642
Ultras Israel Bot
*/

const { ActivityType } = require("discord.js");

module.exports = {
  name: "clientReady",
  once: true,
  run(client) {
    console.log(`${client.user.tag} is online`);

    client.user.setActivity("Ultras Israel", {
      type: ActivityType.Watching
    });
  }
};