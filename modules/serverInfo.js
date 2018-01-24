'use strict';

const fs = require('fs');
const path = require('path');

const apifcraftpl = require('api-fcraft.pl');
const Discord = require('discord.js');
const moment = require('moment');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json')));

const apiClient = new apifcraftpl(config.key);

module.exports = async (message) => {
    try {
        const args = message.content.split(/\s+/);

        apiClient.info((args[1] ? args[1] : 'hard')).then(server => {
            const embed = new Discord.RichEmbed();
            embed.setAuthor('fEntertainment', 'https://cdn.fcraft.pl/logo/150px/v2.2.png');
            embed.setColor('FFF000');
            embed.setThumbnail(server.logo.large);
            embed.addField('Serwer', (args[1] ? args[1] : 'hard'));
            embed.addField('Wersja gry', server.version.minecraft.number);

            let version = `v${server.version.world.number}.${server.version.series.number}.${server.version.update.number}`;

            if(server.version.patch) {
                version += `.${server.version.patch.number}`;
            }

            embed.addField('Wersja serwera', `[${version} - ${server.version.update.name}](https://wiki.fCraft.pl/${version})`);
            embed.addField('Ostatnia aktualizacja', moment((server.version.patch ? server.version.patch.time * 1000 : server.version.update.time * 1000)).format('D.MM.YYYY'));

            message.channel.send(embed);
        }).catch(error => {
            message.reply('nie można było uzyskać informacji nt. podanego serwera!');
        });
    } catch(error) {
        message.reply('wystąpił błąd!');
        console.error(error);
    } finally {
        message.channel.stopTyping();
    }
};
