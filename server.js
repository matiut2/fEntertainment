'use strict';

const path = require('path');
const utils = require(path.join(__dirname, 'utils.js'))
const discord = require('discord.js');
const client = new discord.Client();

const commands = {
    help: 'help',
    pomoc: 'help',
    status: 'status',
    gracz: 'playerInfo',
    cuboid: 'cuboidInfo',
    serwer: 'serverInfo',
    rzut: 'diceRoll'
};

for (let name in commands) {
    commands[name] = require(path.join(__dirname, 'modules', commands[name] + '.js'));
}

client.on('ready', () => {
    client.user.setActivity('!pomoc | v1.0.6');
    console.log('Client is ready!');
});

client.on('message', message => {
    const args = message.content.split(/\s+/);
    if (args[0].startsWith('!')) {
         const cmd = args[0].slice(1)
         if (cmd in commands) {
             try {
                 message.channel.startTyping();
                 commands[cmd]({
                     message: message,
                     args: args.slice(1),
                     utils: utils
                 })
             } catch(error) {
                 message.reply('wystąpił błąd!');
                 console.error(error);
             } finally {
                 message.channel.stopTyping();
             }
         }
    }
});

client.login(utils.config().token);
