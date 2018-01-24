'use strict';

const fs = require('fs');
const path = require('path');

const apifcraftpl = require('api-fcraft.pl');
const Discord = require('discord.js');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json')));

const apiClient = new apifcraftpl(config.key);

module.exports = async (message) => {
    try {
        const args = message.content.split(/\s+/);

        if(!args[1]) {
            message.reply('prawidłowe użycie: `!cuboid <cuboid> [świat] [serwer]`!');
        } else {
            apiClient.cuboid((args[3] ? args[3] : 'hard'), (args[2] ? args[2] : 'world'), args[1]).then(async (cuboid) => {
                const embed = new Discord.RichEmbed();
                embed.setAuthor('fEntertainment', 'https://cdn.fcraft.pl/logo/150px/v2.2.png');
                embed.setColor('FFF000');
                embed.addField('Cuboid', cuboid.name);
                embed.addField('Rodzaj', (cuboid.type === 'cuboid' ? 'Cuboid' : 'Poligon'));

                if(cuboid.parent) {
                    embed.addField('Rodzic', cuboid.parent);
                }

                if(cuboid.owners[0]) {
                    const owners = await apiClient.resolverUuids(cuboid.owners);
                    embed.addField('Posiadacze', Object.values(owners).join(', '));
                }

                if(cuboid.members[0]) {
                    const members = await apiClient.resolverUuids(cuboid.members);
                    embed.addField('Mieszkańcy', Object.values(members).join(', '));
                }

                if(cuboid.workers[0]) {
                    const workers = await apiClient.resolverUuids(cuboid.workers);
                    embed.addField('Pracownicy', Object.values(workers).join(', '));
                }

                if(cuboid.type === 'cuboid') {
                    const x = Math.floor((cuboid.shape.x.max + cuboid.shape.x.min) / 2);
                    const y = Math.floor((cuboid.shape.y.max + cuboid.shape.y.min) / 2);
                    const z = Math.floor((cuboid.shape.z.max + cuboid.shape.z.min) / 2);

                    embed.addField('Koordynaty', `X: ${x}, Y: ${y}, Z: ${z}`);
                }

                message.channel.send(embed);
            }).catch(error => {
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
