module.exports = {
	name: 'play',
	description: 'Play!',
	execute(msg, args) {
		voiceChannel.join()
  		.then(connection => {});
		const ytdl = require('ytdl-core');
		const streamOptions = { seek: 0, volume: 1 };
		voiceChannel.join()
	  	.then(connection => {
		    const stream = ytdl('https://www.youtube.com/watch?v=XAWgeLF9EVQ', { filter : 'audioonly' });
		    const dispatcher = connection.playStream(stream, streamOptions);
	  	})
	  	.catch(console.error);
	},
};