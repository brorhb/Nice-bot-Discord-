const Discord = require('discord.js')
const daddyGifs = require('./daddy')

const bot = new Discord.Client()
bot.login(process.env.TOKEN)

bot.on('message', function (data) {
  let msg = data.content
  let user = data.author
  msg = msg.toLowerCase()
  if (msg === '!coinflip') {
    const num = Math.round(Math.random())
    if (num === 1) {
      data.reply('heads')
    } else {
      data.reply('tails')
    }
  }
  if ((isNice(msg)) && !user.bot) {
    data.reply(`
A big fat NICE from *${user}*
https://tenor.com/view/nice-south-park-not-bad-good-one-gif-4294992
`
    )
  } else if (
    msg == '!daddy' ||
    msg == '!papa' ||
    msg == '!papi' ||
    msg == '!pappa'
  ) {
    const gif = daddyGifs[[Math.floor(Math.random() * daddyGifs.length)]]
    data.reply(gif)
  } else if (msg.includes('breadcrumbs')) {
    data.reply('https://media.giphy.com/media/9CgJFal0lUtUI/giphy.gif')
  } else if (msg.includes('yesyes')) {
    data.reply('https://tenor.com/view/animal-crossing-tom-nook-clapping-clap-animal-crossing-new-horizons-gif-16657276')
  }
})

function isNice(msg) {
  if (msg.includes('nice')) return true
  let words = msg.match(/\b(\w+)\b/g)
  if (!words) return false
  for (var i = 0; i < words.length; i++) {
    if ([...new Set(words[i].split(''))].join('') === 'nice') {
      return true
    }
  }
  return false
}
