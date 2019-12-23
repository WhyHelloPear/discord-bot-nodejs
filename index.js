require('dotenv').config(); //load dotenv library so we can get token from .env
const Discord = require('discord.js'); //load discord library
const bot = new Discord.Client(); //create bot object
const TOKEN = process.env.TOKEN; //get token value from .env file

bot.login(TOKEN); //run bot with token value

bot.on('ready', () => { //ready event is fired once we're connected to bot
    console.info(`Logged in as ${bot.user.tag}!`); //if we've token is authenticated, login info is displayed
});

bot.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
        msg.channel.send('pong');

    } else if (msg.content.startsWith('!kick')) {
        if (msg.mentions.users.size) {
            const taggedUser = msg.mentions.users.first();
            msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
        } else {
            msg.reply('Please tag a valid user!');
        }
    }
});
