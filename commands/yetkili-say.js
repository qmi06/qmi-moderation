const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json');
const ayar = require('../Settings/config.json');

module.exports = {
    name: 'yetkili-say',
    aliases: ['ysay'],
    async execute(client, message, args) {

        let yetkili = message.guild.roles.cache.get("849381089927364638");
        let tyetkililer = message.guild.members.cache.filter(üye => üye.roles.highest.position >= yetkili.position && !üye.user.bot && üye.presence.status !== "offline");
        let yetkililer = message.guild.members.cache.filter(üye => üye.roles.highest.position >= yetkili.position && !üye.voice.channel && !üye.user.bot && üye.presence.status !== "offline");

        message.lineReply(`\`${tyetkililer.size} tane çevrim içi yetkiliden ${yetkililer.size} tanesi seste değildir.\` \n\n__Seste Olmayan Yetkililer__\n\`${yetkililer.map(y => y).join(", ")}\``).then(x => x.delete({ timeout: 30 * 1000 }), message.react(id.Emojiler.başarılıemojiid))
    }
}