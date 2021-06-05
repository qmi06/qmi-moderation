const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json')
const ayar = require('../Settings/config.json')

module.exports = {
    name: 'rol',
    aliases: [],
    async execute(client, message, args) {

        if (!message.member.hasPermission('MANAGE_CHANNELS') && message.author.id !== ayar.sahip) return message.lineReply('`Bu komudu kullanmak için gerekli izinlere sahip değilsin!`').then(x => x.delete({ timeout: 3000 }), message.react(id.Emojiler.başarısızemojiid));
        let üye = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

        let guild = message.guild;
        if (args[0] === "al") {
            if (!üye || !rol) return message.lineReply('`Rol alabilmek için üye ve rol belirtmelisin!`').then(x => x.delete({ timeout: 3000 }));
            if (message.member.roles.highest.position <= üye.roles.highest.position) return message.lineReply('`Etiketlediğin üye veya rol senden üst veya senle aynı pozisyonda!`').then(x => x.delete({ timeout: 3000 }))
            if (!üye.roles.cache.has(rol)) return message.lineReply('`Etiketlenen üyede etiketlenen rol bulunmamaktadır!`').then(x => x.delete({ timeout: 3000 }));

            üye.roles.remove(rol), message.lineReply('`Başarıyla etiketlenen üyeden rolü aldım.`').then(x => x.delete({ timeout: 7 * 1000 }), message.react(id.Emojiler.başarılıemojiid));
            return;
        };

        if (args[0] === "ver") {
            if (!üye || !rol) return message.lineReply('`Rol verebilmek için üye ve rol belirtmelisin!`').then(x => x.delete({ timeout: 3000 }));
            if (message.member.roles.highest.position <= üye.roles.highest.position) return message.lineReply('`Etiketlediğin üye veya rol senden üst veya senle aynı pozisyonda!`').then(x => x.delete({ timeout: 3000 }))
            if (üye.roles.cache.has(rol)) return message.lineReply('`Etiketlenen üyede etiketlenen rol bulunmaktadır!`').then(x => x.delete({ timeout: 3000 }));

            üye.roles.add(rol), message.lineReply('`Başarıyla etiketlenen üyeye verdim.`').then(x => x.delete({ timeout: 7 * 1000 }), message.react(id.Emojiler.başarılıemojiid));
            return;
        };
        message.lineReply('`Ver veya al argümanlarını kullanmalısın!`').then(x => x.delete({ timeout: 3000 }));
    }
}