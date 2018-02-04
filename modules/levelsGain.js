'use strict';

const Random = require('random-js');
const rethinkdb = require('rethinkdb');

const gainDisablement = {};

module.exports = async (parameters) => {
    try {
        const message = parameters.message;
        const utils = parameters.utils;

        if(message.author.bot) return;
        if(!message.guild) return;
        if(gainDisablement[message.author.id]) return;

        const membersOnline = message.guild.members.filter(member => member.presence !== 'offline');
        if(membersOnline.length < 10) return;

        const messageContent = message.content.trim();
        if(messageContent.length < 15) return;
        if(messageContent.startsWith('!')) return;

        gainDisablement[message.author.id] = true;

        setTimeout(() => {
            gainDisablement[message.author.id] = false;
        }, 15 * 1000);

        const gainedPoints = Random.integer(1, 3)(Random.engines.nativeMath);

        const user = await rethinkdb.table('users').get(message.author.id).run(utils.database);

        if(user) {
            await rethinkdb.table('users').get(message.author.id).update({
                points: Number(user.points) + Number(gainedPoints)
            }).run(utils.database);
        } else {
            await rethinkdb.table('users').insert({
                id: message.author.id,
                points: Number(gainedPoints)
            }).run(utils.database);
        }
    } catch(error) {
        console.error(error);
    }
};
