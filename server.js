'use strict';

const fs = require('fs');
const path = require('path');

const Discord = require('discord.js');

const cuboidInfo = require(path.join(__dirname, 'modules', 'cuboidInfo.js'));
const help = require(path.join(__dirname, 'modules', 'help.js'));
const playerInfo = require(path.join(__dirname, 'modules', 'playerInfo.js'));
const serverInfo = require(path.join(__dirname, 'modules', 'serverInfo.js'));
const status = require(path.join(__dirname, 'modules', 'status.js'));

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));

const client = new Discord.Client();

client.on('ready', () => {
    client.user.setActivity('!pomoc');
    console.log('Client is ready!');
});

client.on('message', message => {
    const args = message.content.split(/\s+/);

    switch(args[0].toLowerCase()) {
        case '!pomoc':
            message.channel.startTyping();
            help(message);
            break;
        case '!help':
            message.channel.startTyping();
            help(message);
            break;
        case '!status':
            message.channel.startTyping();
            status(message);
            break;
        case '!gracz':
            message.channel.startTyping();
            playerInfo(message);
            break;
        case '!cuboid':
            message.channel.startTyping();
            cuboidInfo(message);
            break;
        case '!serwer':
            message.channel.startTyping();
            serverInfo(message);
            break;
    }
});

client.login(config.token);
