'use strict';

const fs = require('fs');
const path = require('path');

const Discord = require('discord.js')

const help = fs.readFileSync(path.join(__dirname, '..', 'assets', 'help.md'), 'utf8');

module.exports = async (message) => {
    try {
        const embed = new Discord.RichEmbed();
        embed.setAuthor('Pomoc bota', 'https://wiki.fcraft.pl/images/6/60/Survival.png');
        embed.setColor('FFF000');
        embed.setDescription(help);

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
