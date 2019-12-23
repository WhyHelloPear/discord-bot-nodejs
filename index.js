require('dotenv').config(); //load dotenv library so we can get token from .env
const Discord = require('discord.js'); //load discord library
const bot = new Discord.Client(); //create bot object
bot.commands = new Discord.Collection(); //load command library for the bot object
const botCommands = require('./commands'); //set requirement: commands must be called to be activated

Object.keys(botCommands).map(key => { //map command call to a call key ('!', '.', '/', etc)
    bot.commands.set(botCommands[key].name, botCommands[key]);
});

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
        msg.channel.send('enter an actual command, bitch')
        return; //if the command does not exist, report error and return
    }

    try { //if command exists
        bot.commands.get(command).execute(msg, args); //use get() w/ command to execute it with the input parameters msg and args.
    } catch (error) { //if an error occurs while executing the given command
        console.error(error); //report the error in the console
        msg.reply('there was an error trying to execute that command!'); //reply to the user (in the channel w/ @) that an error has occured
    }
});
