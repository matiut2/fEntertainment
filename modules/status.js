'use strict';

const httpAsPromised = require('http-as-promised');
const Discord = require('discord.js');

module.exports = async (obj) => {
    const message = obj.message, utils = obj.utils;
    const response = await httpAsPromised.get('https://api.skript.pl/server/mc.fcraft.pl/', { resolve: 'body' });
    const serverStatus = JSON.parse(response);

    if(serverStatus.online) {
        const embed = new Discord.RichEmbed();
        embed.setAuthor('Status serwera', 'https://wiki.fcraft.pl/images/5/52/Ekonomia.png');
        embed.setColor('FFF000');
        embed.addField('Status', 'Online', true);

        if(serverStatus.players.list.length < 3) {
            embed.addField('Gracze', (serverStatus.players.list[0] ? utils.escapeMarkdown(serverStatus.players.list.join(', ')) : '_Brak_'), true);
        } else {
            embed.addField('Gracze', utils.escapeMarkdown(serverStatus.players.list.join(', ')));
        }

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
};
