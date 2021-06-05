const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json')
const ayar = require('../Settings/config.json')

module.exports = {
    name: 'sohbet',
    aliases: [],
    async execute(client, message, args) {

        if (!message.member.hasPermission('MANAGE_CHANNELS') && message.author.id !== ayar.sahip) return message.lineReply('`Bu komudu kullanmak için gerekli izinlere sahip değilsin!`').then(x => x.delete({ timeout: 3000 }), message.react(id.Emojiler.başarısızemojiid));

        let guild = message.guild;
        if (args[0] === "aç") {
            let every = message.guild.roles.cache.find(r => r.name === "@everyone");
            message.channel.createOverwrite(every, {
                SEND_MESSAGES: null
            });
            message.lineReply('`Sohbet kanalı başarıyla açıldı.`').then(x => x.delete({ timeout: 7 * 1000 }), message.react(id.Emojiler.başarılıemojiid))
            return;
        };

        if (args[0] === "kapat") {
            let every = message.guild.roles.cache.find(r => r.name === "@everyone");
            message.channel.createOverwrite(every, {
                SEND_MESSAGES: false
            });
            message.lineReply('`Sohbet kanalı başarıyla kapatıldı.`').then(x => x.delete({ timeout: 7 * 1000 }), message.react(id.Emojiler.başarılıemojiid))
            return;
        };
        message.lineReply('`Aç veya kapat argümanlarını kullanmalısın!`').then(x => x.delete({ timeout: 3000 }));
    }
}