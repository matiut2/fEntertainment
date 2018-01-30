'use strict';

var api = null, config = null;

exports.config = () => {
    if (config == null) {
        config = JSON.parse(require('fs').readFileSync('config.json'));
    } return config;
};

exports.api = () => {
    if (api == null) {
        const apifcraftpl = require('api-fcraft.pl');
        api = new apifcraftpl(config.key);
    } return api;
}

exports.capitalize = text => {
    return String(text).charAt(0).toUpperCase() + String(text).slice(1);
};

exports.escapeMarkdown = text => {
    return text.replace('_', '\\_');
};
