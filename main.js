const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');

client.on('message', async message => {
  if (message.content.startsWith('!play')) {
    const args = message.content.split(' ');
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      return message.reply('Вы должны находиться в голосовом канале, чтобы воспроизводить музыку!');
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return message.reply('У меня нет разрешения для подключения к этому голосовому каналу!');
    }

    try {
      const connection = await voiceChannel.join();
      const stream = ytdl(args[1], { filter: 'audioonly' });
      const dispatcher = connection.play(stream);

      dispatcher.on('finish', () => voiceChannel.leave());
    } catch (err) {
      console.log(err);
      return message.reply('Произошла ошибка при воспроизведении музыки!');
    }
  }
});

client.login('');