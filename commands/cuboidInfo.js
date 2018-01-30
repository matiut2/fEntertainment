'use strict';

module.exports = async (obj) => {
    const message = obj.message, utils = obj.utils, args = obj.args;

    if(!args[0]) {
        message.reply('prawidłowe użycie: `!cuboid <cuboid> [świat] [serwer]`!');
    } else {
        utils.api().cuboid((args[2] ? args[2].toLowerCase() : 'hard'), (args[1] ? args[1].toLowerCase() : 'world'), args[0].toLowerCase()).then(async (cuboid) => {
            const embed = utils.embed('Informacje o cuboidzie', 'property');
            embed.addField('Cuboid', utils.escapeMarkdown(cuboid.name));
            embed.addField('Świat', (args[1] ? utils.capitalize(args[1].toLowerCase()) : 'World'));
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
                const owners = Object.values(await utils.api().resolverUuids(cuboid.owners));
                players = [...players, ...owners];
                embed.addField('Posiadacze', utils.escapeMarkdown(owners.join(', ')));
            }

            if(cuboid.members[0]) {
                const members = Object.values(await utils.api().resolverUuids(cuboid.members));
                players = [...players, ...members];
                embed.addField('Mieszkańcy', utils.escapeMarkdown(members.join(', ')));
            }

            if(cuboid.workers[0]) {
                const workers = Object.values(await utils.api().resolverUuids(cuboid.workers));
                embed.addField('Pracownicy', utils.escapeMarkdown(workers.join(', ')));
            }

            let active = false;

            for(let i = 0; i < players.length; i++) {
                const player = await utils.api().globalPlayer(players[i]);
                if(utils.isActive(player.time.last)) {
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
};
