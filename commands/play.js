
//import packages and Youtube API key
const { MessageEmbed } = require('discord.js');
const Youtube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const { youtubeAPI } = require('../../config.json');
const youtube = new Youtube(youtubeAPI);


//declare the 'PlayCommand' class which extends 'Command':
module.exports = class PlayCommand extends Command {
  constructor(bot) {
	super(bot, {
	  name: 'play', 
	  memberName: 'play',
	  group: 'music', // this means the folder the file is inside
	  description: 'Play any song or playlist from youtube',
	  guildOnly: true, // make this command available only in servers not dm's
	  clientPermissions: ['SPEAK', 'CONNECT'],
	  args: [
		{
		  key: 'query', // here we name the variable that will hold the input
		  prompt: 'What song would you like to listen to?', // send this msg if
		  // the user hasn't provided any arg or if the arg was not a string
		  type: 'string',
		  validate: query => query.length > 0 && query.length < 200 
		}
	  ]
	});
  }
}

async run(message, { query }) {
	// don't let users run this command if they are not in a voice channel
	var voiceChannel = message.member.voice.channel;
	if (!voiceChannel) return message.say('Join a channel and try again');
}
