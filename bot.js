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
      niceJSONHandler(err, data, user, id, channel, msg, evt)
    })
  } else if (
    msg == '!daddy' ||
    msg == '!papa' ||
    msg == '!papi' ||
    msg == '!pappa'
  ) {
    daddyResponse(null, null, channel)
  }
})

function daddyResponse(user, id, channel, msg, evt) {
  bot.sendMessage({
    to: channel,
    message: 'https://media.giphy.com/media/lPFmR2vjyl07TXu1CA/giphy.gif'
  })
}

function niceJSONHandler(err, data, user, id, channel, msg, evt) {
  if (err) {
    console.log(err)
    return
  }
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
  const leaderboard = Object.keys(data).sort((a, b) => data[b] - data[a])
  for (var i = 0; i < 3; i++) {
    let user = leaderboard[i]
    let score = data[leaderboard[i]] || false
    if (user) {
      result += `${user}: ${score}\n`
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
