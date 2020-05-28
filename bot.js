const Discord = require('discord.io')
const auth = require('./auth.json')

const bot = new Discord.Client({
  token: auth.token,
  autorun: true
})

bot.on('message', function (user, id, channel, msg, evt) {
  msg = msg.toUpperCase()
  if (msg.includes("NICE") && id != bot.id) {
    bot.sendMessage({
      to: channel,
      message: 'Nice!'
    })
  }
})