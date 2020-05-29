const Discord = require('discord.io')
const auth = require('./auth.json')
const fs = require('fs')

const bot = new Discord.Client({
  token: auth.token,
  autorun: true
})

bot.on('message', function (user, id, channel, msg, evt) {
  msg = msg.toLowerCase()
  if (msg.includes('nice') && id != bot.id) {
    getJsonData(function (err, data) {
      niceJSONHandler(err, data)
    })
  } else if (
    msg == '!daddy' ||
    msg == '!papa' ||
    msg == '!papi' ||
    msg == '!pappa'
  ) {
    daddyResponse()
  }
})

function daddyResponse() {
  bot.sendMessage({
    to: channel,
    message: 'https://media.giphy.com/media/lPFmR2vjyl07TXu1CA/giphy.gif'
  })
}

function niceJSONHandler(err, data) {
  if (err) {
    console.log(err)
    return
  }
  console.log(data)
  if (!data) data = {}
  if (data[user]) {
    data[user] = data[user] + 1
  } else {
    data[user] = 1
  }
  bot.sendMessage({
    to: channel,
    message: `
Nice count for ${user}: ${data[user]}\n
Nice leaderboard:\n
${top3(data)}
https://tenor.com/view/nice-south-park-not-bad-good-one-gif-4294992
    `
  })
  wirteData(data)
}

function top3(data) {
  let result = ''
  for (var i = 0; i < 3; i++) {
    let user = Object.keys(data)[i] || false
    console.log(user, i)
    if (user) {
      result += `${user}: ${data[user]}\n`
    }
  }
  return result
}

async function wirteData(data) {
  data = JSON.stringify(data)
  try {
    await fs.writeFile('counter.json', data, function (err, data) {
      if (err) throw err
    })
  } catch (err) {
    console.log(err)
  }
}

async function getJsonData(cb) {
  let parsedJson
  await fs.readFile('counter.json', 'utf8', function (err, data) {
    if (err) {
      cb(err, null)
      return
    } else {
      try {
        cb(null, JSON.parse(data))
      } catch (err) {
        cb(err, null)
      }
    }
  })
}
