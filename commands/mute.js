const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json')
const ayar = require('../Settings/config.json')

module.exports = {
    name: 'mute',
    aliases: [],
    async execute(client, message, args) {

        if (!message.member.hasPermission('MANAGE_ROLES') && !message.member.roles.cache.get(id.Mute.muteyetkiliid) && message.author.id !== ayar.sahip) return message.lineReply('`Bu komudu kullanmak için gerekli izinlere sahip değilsin!`').then(x => x.delete({ timeout: 3000 }), message.react(id.Emojiler.başarısızemojiid));

        let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let sebep = args.slice(1).join(' ');

        if (!üye || !sebep) return message.lineReply('`Metin kanallarında susturmak için üye ve sebep belirtmelisin!`').then(x => x.delete({ timeout: 3000 }));
        if (üye.roles.cache.get(id.Mute.muterolid)) return message.lineReply('`Etiketlenen üye zaten metin kanallarında susturulmuş!`').then(x => x.delete({ timeout: 3000 }));
        if (message.member.roles.highest.position <= üye.roles.highest.position) return message.lineReply('`Etiketlediğin kullanıcı senden üst veya senle aynı pozisyonda!`').then(x => x.delete({ timeout: 3000 }))

        db.push(`üye.${üye.id}.sicil`, { Yetkili: message.author.id, Tip: "CHAT MUTE", Sebep: sebep, Zaman: Date.now() });

        client.channels.cache.get(id.Mute.mutelogkanalid).send(new Discord.MessageEmbed().setColor('#97ffff').setDescription(`${üye}\`(${üye.id})\` adlı üye, <@${message.author.id}>\`(${message.author.id})\` üyesi tarafından \`(${new Date().toTurkishFormatDate()})\` zamanında \`(${sebep})\` sebebiyle  metin kanallarında susturuldu.`))

        üye.roles.add(id.Mute.muterolid), message.lineReply('`Etiketlenen üye başarıyla metin kanallarında susturuldu!`').then(x => x.delete({ timeout: 9000 }), message.react(id.Emojiler.başarılıemojiid))
    }
}