'use strict';

const fs = require('fs');
const path = require('path');

const apifcraftpl = require('api-fcraft.pl');
const Discord = require('discord.js');
const moment = require('moment');

const utils = require(path.join(__dirname, '..', 'utils.js'));

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json')));

const apiClient = new apifcraftpl(config.key);

module.exports = async (message) => {
    try {
        const args = message.content.split(/\s+/);

        if(!args[1]) {
            message.reply('prawidłowe użycie: `!cuboid <cuboid> [świat] [serwer]`!');
        } else {
            apiClient.cuboid((args[3] ? args[3].toLowerCase() : 'hard'), (args[2] ? args[2].toLowerCase() : 'world'), args[1].toLowerCase()).then(async (cuboid) => {
                const embed = new Discord.RichEmbed();
                embed.setAuthor('Informacje o cuboidzie', 'https://wiki.fcraft.pl/images/e/e3/Własność.png');
                embed.setColor('FFF000');
                embed.addField('Cuboid', utils.escapeMarkdown(cuboid.name));
                embed.addField('Świat', (args[2] ? utils.capitalize(args[2].toLowerCase()) : 'World'));
                embed.addField('Rodzaj', utils.capitalize(cuboid.type));

                if(cuboid.type === 'cuboid') {
                    const x = Math.floor((cuboid.shape.x.max + cuboid.shape.x.min) / 2);
                    const y = Math.floor((cuboid.shape.y.max + cuboid.shape.y.min) / 2);
                    const z = Math.floor((cuboid.shape.z.max + cuboid.shape.z.min) / 2);

                    embed.addField('Koordynaty', `X: ${x}, Y: ${y}, Z: ${z}`, true);
                }

                if(cuboid.parent) {
                    embed.addField('Rodzic', utils.escapeMarkdown(cuboid.parent));
                }

                let players = [];

                if(cuboid.owners[0]) {
                    const owners = Object.values(await apiClient.resolverUuids(cuboid.owners));
                    players = [...players, ...owners];
                    embed.addField('Posiadacze', utils.escapeMarkdown(owners.join(', ')));
                }

                if(cuboid.members[0]) {
                    const members = Object.values(await apiClient.resolverUuids(cuboid.members));
                    players = [...players, ...members];
                    embed.addField('Mieszkańcy', utils.escapeMarkdown(members.join(', ')));
                }

                if(cuboid.workers[0]) {
                    const workers = Object.values(await apiClient.resolverUuids(cuboid.workers));
                    embed.addField('Pracownicy', utils.escapeMarkdown(workers.join(', ')));
                }

                let active = false;

                for(let i = 0; i < players.length; i++) {
                    const player = await apiClient.globalPlayer(players[i]);
                    const isActive = moment(player.time.last * 1000).isSameOrAfter(moment().subtract(30, 'days'));

                    if(isActive) {
                        active = true;
                    }
                }

                embed.addField('Możliwa rozbiórka', (active ? 'Nie' : 'Tak'));

                message.channel.send(embed);
            }).catch(error => {
                console.error(error);
                message.reply('nie można było uzyskać informacji nt. podanego cuboida!');
            });
        }
    } catch(error) {
        message.reply('wystąpił błąd!');
        console.error(error);
    } finally {
        message.channel.stopTyping();
    }
};
