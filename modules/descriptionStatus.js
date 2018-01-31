'use strict';

const httpAsPromised = require('http-as-promised');

module.exports = async (parameters) => {
    const client = parameters.client;
    const utils = parameters.utils;

    if(utils.config.descriptionStatus) {
        const channel = client.channels.find(channel => channel.id === utils.config.descriptionStatus);
        const serverStatus = JSON.parse(await httpAsPromised.get('https://api.skript.pl/server/mc.fcraft.pl/', { resolve: 'body' }));

        if(serverStatus.players.online === 0) {
            channel.setTopic(`Gracze: ${serverStatus.players.online}/${serverStatus.players.max}`);
        } else if(serverStatus.players.online < 10) {
            channel.setTopic(`Gracze: ${serverStatus.players.online}/${serverStatus.players.max} (${serverStatus.players.list.join(', ')})`);
        } else {
            channel.setTopic(`Gracze: ${serverStatus.players.online}/${serverStatus.players.max}`);
        }
    }
};
