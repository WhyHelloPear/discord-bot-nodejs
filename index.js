require('dotenv').config(); //load dotenv library so we can get token from .env
const path = require('path');
const Discord = require('discord.js'); //load discord library
const { CommandoClient } = require('discord.js-commando');


Structures.extend('Guild', Guild => {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(bot, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        songDispatcher: null
      };
    }
  }
  return MusicGuild;
});


const { CommandoClient } = require('discord.js-commando');
const { Structures } = require('discord.js');
const path = require('path');
const { prefix, token } = require('./config.json');
// It's vital this is before the initiation of the client
Structures.extend('Guild', Guild => {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(bot, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        songDispatcher: null
      };
    }
  }
  return MusicGuild;
});
const bot = new CommandoClient({unknownCommandResponse: false});

bot.registry
  .registerDefaultTypes()
  .registerGroups([
    ['music', 'Music Command Group']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));


//Token and Prefix
const prefix = ".";
const TOKEN = process.env.TOKEN; //get token value from .env file
bot.login(TOKEN);//activate bot with token value


bot.on('ready', () => { //ready event is fired once we're connected to bot
	console.info(`Logged in as ${bot.user.tag}!`); //if we've token is authenticated, login info is displayed
});

bot.on('message', msg => {
	const args = msg.content.split(/ +/); //try to split the input message. Assume the first item in this args array is our command.
	var command = args.shift().toLowerCase(); //change all characters in the input command to lower case and set command to variable
	console.info(`Called command: ${command}`); //log in console that a command was called

	if (!command.startsWith(prefix)) return; //check entered message is a command or a normal message (if message starts with prefex)
	command = command.substr(1); //if the user entered the prefix, remove said prefix to check if command exists
	
	if (!bot.commands.has(command)){
		msg.channel.send('Error: Entered command does not exist.')
		return; //if the command does not exist, report error and return
	}

	try { //if command exists
		bot.commands.get(command).execute(msg, args); //use get() w/ command to execute it with the input parameters msg and args.
	}
	catch (error) { //if an error occurs while executing the given command
		console.error(error); //report the error in the console
		msg.reply('Error: Could not execute given command; check logs for further details.'); //reply to the user (in the channel w/ @) that an error has occured
	}
});
