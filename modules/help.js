'use strict';

const Discord = require('discord.js')

module.exports = async (obj) => {
    const message = obj.message, utils = obj.utils;
    const embed = new Discord.RichEmbed();
    embed.setAuthor('Pomoc bota', 'https://wiki.fcraft.pl/images/6/60/Survival.png');
    embed.setColor('FFF000');
    embed.setDescription(utils.asset('help.md'));

    message.author.send(embed).then(privateMessage => {
        message.reply('wysłano pomoc poprzez wiadomość prywatną!');
    }).catch(error => {
        message.reply('nie można było wysłać pomocy poprzez wiadomość prywatną!');
    });
};
