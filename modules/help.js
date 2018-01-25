'use strict';

const fs = require('fs');
const path = require('path');

const Discord = require('discord.js')

const help = fs.readFileSync(path.join(__dirname, '..', 'assets', 'help.md'), 'utf8');

module.exports = async (message) => {
    try {
        const embed = new Discord.RichEmbed();
        embed.setAuthor('fEntertainment', 'https://cdn.fcraft.pl/logo/150px/v2.2.png');
        embed.setColor('FFF000');
        embed.setDescription(help);
        embed.setTitle('Lista komend');

        message.author.send(embed).then(privateMessage => {
            message.reply('wysłano pomoc poprzez wiadomość prywatną!');
        }).catch(error => {
            message.reply('nie można było wysłać pomocy poprzez wiadomość prywatną!');
        });
    } catch(error) {
        message.reply('wystąpił błąd!');
        console.error(error);
    } finally {
        message.channel.stopTyping();
    }
};
