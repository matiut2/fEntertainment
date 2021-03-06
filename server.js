'use strict';

const Discord = require('discord.js');
const path = require('path');

const utils = require(path.join(__dirname, 'utils.js'));

const descriptionStatus = require(path.join(__dirname, 'modules', 'descriptionStatus.js'));
const levelsGain = require(path.join(__dirname, 'modules', 'levelsGain.js'));

const client = new Discord.Client();

const commands = {
    help: 'help',
    pomoc: 'help',
    status: 'status',
    gracz: 'playerInfo',
    cuboid: 'cuboidInfo',
    serwer: 'serverInfo',
    rzut: 'diceRoll',
    'użytkownik': 'userInfo',
    ranking: 'usersRanking'
};

for(const commandName in commands) {
    commands[commandName] = require(path.join(__dirname, 'commands', commands[commandName] + '.js'));
}

client.on('ready', () => {
    client.user.setActivity('!pomoc | v1.2.3');

    descriptionStatus({
        utils,
        client
    });

    setInterval(() => {
        descriptionStatus({
            utils,
            client
        });
    }, 1 * 60 * 1000);

    console.log('Client is ready!');
});

client.on('message', message => {
    levelsGain({
        message,
        utils
    });

    const args = message.content.trim().split(/\s+/);

    if(args[0].startsWith('!')) {
         const command = args[0].slice(1).toLowerCase();

         if(command in commands) {
             message.channel.startTyping();

             const commandParameters = {
                 message: message,
                 args: args.slice(1),
                 utils: utils
             };

             commands[command](commandParameters).then(() => {
                message.channel.stopTyping();
             }).catch(error => {
                message.reply('wystąpił błąd!');
                message.channel.stopTyping();
                console.error(error);
             });
         }
    }
});

client.login(utils.config.token);
