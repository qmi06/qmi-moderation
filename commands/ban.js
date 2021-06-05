const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json')
const ayar = require('../Settings/config.json')

module.exports = {
    name: 'ban',
    aliases: [],
    async execute(client, message, args) {

        if (!message.member.hasPermission('BAN_MEMBERS') && !message.member.roles.cache.get(id.Ban.banyetkiliid) && message.author.id !== ayar.sahip) return message.lineReply('`Bu komudu kullanmak için gerekli izinlere sahip değilsin!`').then(x => x.delete({ timeout: 3000 }), message.react(id.Emojiler.başarısızemojiid));

        let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let sebep = args.slice(1).join(' ');

        if (!üye || !sebep) return message.lineReply('`Banlayabilmek için üye ve sebep belirtmelisin!`').then(x => x.delete({ timeout: 3000 }));
        if (message.member.roles.highest.position <= üye.roles.highest.position) return message.lineReply('`Etiketlediğin kullanıcı senden üst veya senle aynı pozisyonda!`').then(x => x.delete({ timeout: 3000 }));

        db.push(`üye.${üye.id}.sicil`, { Yetkili: message.author.id, Tip: "BAN", Sebep: sebep, Zaman: Date.now() });

        message.guild.members.cache.get(üye.id).ban({ reason: sebep }), message.lineReply('`Etiketlenen üye başarıyla banlandı!`').then(x => x.delete({ timeout: 9000 }), message.react(id.Emojiler.başarılıemojiid));

        client.channels.cache.get(id.Ban.banlogkanalid).send(new Discord.MessageEmbed().setColor('#551a8b').setDescription(`${üye}\`(${üye.id})\` adlı üye, <@${message.author.id}>\`(${message.author.id})\` üyesi tarafından \`(${new Date().toTurkishFormatDate()})\` zamanında \`(${sebep})\` sebebiyle  banlandı.`));

    }
}