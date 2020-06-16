const Discord = require('discord.io')
const daddyGifs = require('./daddy')

const bot = new Discord.Client({
  token: process.env.BOT_TOKEN,
  autorun: true
})

bot.on('message', function (user, id, channel, msg, evt) {
  msg = msg.toLowerCase()
  if ((msg.includes('nice')) && id != bot.id) {
    bot.sendMessage({
      to: channel,
      message: `
A big fat NICE from *${user}*
https://tenor.com/view/nice-south-park-not-bad-good-one-gif-4294992
`
    })
  } else if (
    msg == '!daddy' ||
    msg == '!papa' ||
    msg == '!papi' ||
    msg == '!pappa'
  ) {
    daddyResponse(null, null, channel)
  } else if (msg.includes('breadcrumbs')) {
    bot.sendMessage({
      to: channel,
      message: 'https://media.giphy.com/media/9CgJFal0lUtUI/giphy.gif'
    })
  } else if (msg.includes('yesyes')) {
    bot.sendMessage({
      to: channel,
      message: 'https://tenor.com/view/animal-crossing-tom-nook-clapping-clap-animal-crossing-new-horizons-gif-16657276'
    })
  }
})

function daddyResponse(user, id, channel, msg, evt) {
  const gif = daddyGifs[[Math.floor(Math.random() * daddyGifs.length)]]
  bot.sendMessage({
    to: channel,
    message: gif
  })
}
