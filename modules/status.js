'use strict';

const util = require('util');

const httpAsPromised = require('http-as-promised');
const Discord = require('discord.js');

module.exports = async (message) => {
    try {
        const response = await httpAsPromised.get('https://api.skript.pl/server/mc.fcraft.pl/', { resolve: 'body' });
        const serverStatus = JSON.parse(response);

        if(serverStatus.online) {
            const embed = new Discord.RichEmbed();
            embed.setAuthor('fEntertainment', 'https://cdn.fcraft.pl/logo/150px/v2.2.png');
            embed.setColor('FFF000');
            embed.addField('Status', 'Online');
            embed.addField('Gracze', serverStatus.players.list.join(', '));
            embed.setFooter('Inne usługi: status.fDomain.pl');

            message.channel.send(embed);
        } else {
            const embed = new Discord.RichEmbed();
            embed.setAuthor('fEntertainment', 'https://cdn.fcraft.pl/logo/150px/v2.2.png');
            embed.setColor('FFF000');
            embed.addField('Status', 'Offline');
            embed.setFooter('Inne usługi: status.fDomain.pl');

            message.channel.send(embed);
        }
    } catch(error) {
        message.reply('wystąpił błąd!');
        console.error(error);
    } finally {
        message.channel.stopTyping();
    }
};
