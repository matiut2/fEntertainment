'use strict';

const Discord = require('discord.js');
const moment = require('moment');

module.exports = async (obj) => {
    const srv = obj.args[0] ? obj.args[0].toLowerCase() : 'hard';
    const message = obj.message, utils = obj.utils;
    utils.api().info(srv).then(server => {
        const embed = new Discord.RichEmbed();
        embed.setAuthor('Informacje o serwerze', 'https://wiki.fcraft.pl/images/6/60/Survival.png');
        embed.setColor('FFF000');
        embed.setThumbnail(server.logo.large);
        embed.addField('Serwer', utils.capitalize(srv), true);
        embed.addField('Wersja gry', server.version.minecraft.number, true);

        let version = `v${server.version.world.number}.${server.version.series.number}.${server.version.update.number}`;

        if(server.version.patch) {
            version += `.${server.version.patch.number}`;
        }

        embed.addField('Wersja serwera', `[${version}](https://wiki.fCraft.pl/${version})`, true);
        embed.addField('Nazwa aktualizacji', server.version.update.name, true);
        embed.addField('Ostatnia aktualizacja', moment((server.version.patch ? server.version.patch.time * 1000 : server.version.update.time * 1000)).format('D.MM.YYYY'), true);
        embed.addField('Ostatnia zmiana mapy', moment(server.version.world.time * 1000).format('D.MM.YYYY'), true);

        message.channel.send(embed);
    }).catch(error => {
        message.reply('nie można było uzyskać informacji nt. podanego serwera!');
    });
};
