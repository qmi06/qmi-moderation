const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json')
const ayar = require('../Settings/config.json')

module.exports = {
    name: 'warn',
    aliases: ['uyar'],
    async execute(client, message, args) {

        if (!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.get(id.Warn.warnyetkiliid) && message.author.id !== ayar.sahip) return message.lineReply('`Bu komudu kullanmak için gerekli izinlere sahip değilsin!`').then(x => x.delete({ timeout: 3000 }), message.react(id.Emojiler.başarısızemojiid));

        let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let sebep = args.slice(1).join(' ');

        if (!üye || !sebep) return message.lineReply('`Uyarmak için üye ve sebep belirtmelisin!`').then(x => x.delete({ timeout: 3000 }));
        if (message.member.roles.highest.position <= üye.roles.highest.position) return message.lineReply('`Etiketlediğin kullanıcı senden üst veya senle aynı pozisyonda!`').then(x => x.delete({ timeout: 3000 }))

        db.push(`üye.${üye.id}.uyarılar`, { Yetkili: message.author.id, Tip: "WARN", Sebep: sebep, Zaman: Date.now() });

        client.channels.cache.get(id.Warn.warnlogkanalid).send(new Discord.MessageEmbed().setColor('#00ff66').setDescription(`${üye}\`(${üye.id})\` adlı üye, <@${message.author.id}>\`(${message.author.id})\` üyesi tarafından \`(${new Date().toTurkishFormatDate()})\` zamanında \`(${sebep})\` sebebiyle uyardı.`))

        üye.send(`**${message.guild.name}** sunucusundan <@${message.author.id}> tarafından \`(${sebep})\` sebebiyle uyarıldın!`), message.lineReply('`Etiketlenen üye başarılı bir şekilde uyarıldı!`').then(x => x.delete({ timeout: 9000 }), message.react(id.Emojiler.başarılıemojiid))
    }
}