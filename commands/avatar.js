const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json')
const ayar = require('../Settings/config.json')

module.exports = {
    name: 'avatar',
    aliases: [],
    async execute(client, message, args) {
        let üye = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first() : message.author) || message.author;
        message.channel.send(new Discord.MessageEmbed().setColor('#ffac00').setAuthor(`${üye.tag} adlı üyenin profil fotoğrafı!`).setImage(üye.avatarURL({ dynamic: true, format: "png", size: 1024 })));
    }
}