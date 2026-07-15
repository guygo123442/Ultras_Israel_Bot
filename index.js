/*
================================================
MADE BY Gguy8642
Gguy8642
================================================
*/

require("dotenv").config()

const {
  Client,
  Events,
  GatewayIntentBits,
  Partials
} = require("discord.js")

const rid = "1473052497546444810"

const link =
  /(?:https?:\/\/|www\.|discord\.gg\/|discord(?:app)?\.com\/invite\/)\S+|(?<!@)\b(?:[a-z0-9-]+\.)+[a-z]{2,24}(?:\/\S*)?/i

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Message,
    Partials.Channel
  ]
})

async function check(msg) {
  if (!msg?.guild) return
  if (!msg.member) return
  if (msg.author.bot) return
  if (!link.test(msg.content)) return

  const role = msg.guild.roles.cache.get(rid)

  if (!role) {
    console.log(`Role not found ${rid}`)
    return
  }

  const has = msg.member.roles.cache.has(rid)
  const above = msg.member.roles.highest.comparePositionTo(role) > 0

  if (has || above) return

  if (!msg.deletable) {
    console.log(`Could not delete message from ${msg.author.tag}`)
    return
  }

  await msg.delete().catch(err => {
    console.log("Delete error", err)
  })

  console.log(`Deleted link from ${msg.author.tag}`)
}

bot.once(Events.ClientReady, client => {
  console.log(`Logged in as ${client.user.tag}`)
  console.log("Anti link is running")
})

bot.on(Events.MessageCreate, check)

bot.on(Events.MessageUpdate, async (oldMsg, newMsg) => {
  if (newMsg.partial) {
    newMsg = await newMsg.fetch().catch(() => null)
  }

  if (newMsg) {
    await check(newMsg)
  }
})

bot.login(process.env.TOKEN)