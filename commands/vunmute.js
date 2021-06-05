const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json')
const ayar = require('../Settings/config.json')

module.exports = {
    name: 'vunmute',
    aliases: [],
    async execute(client, message, args) {

        if (!message.member.hasPermission('MANAGE_ROLES') && !message.member.roles.cache.get(id.Mute.muteyetkiliid) && message.author.id !== ayar.sahip) return message.lineReply('`Bu komudu kullanmak için gerekli izinlere sahip değilsin!`').then(x => x.delete({ timeout: 3000 }), message.react(id.Emojiler.başarısızemojiid));

        let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!üye) return message.lineReply('`Ses kanallarında susturulmasını kaldırmak için bir kullanıcı belirtmelisin!`').then(x => x.delete({ timeout: 3000 }));
        if (!üye.voice.channel) return message.lineReply('`Üye ses kanalında bulunmamaktadır!`').then(x => x.delete({ timeout: 3000 }));
        if (message.member.roles.highest.position <= üye.roles.highest.position) return message.lineReply('`Etiketlediğin kullanıcı senden üst veya senle aynı pozisyonda!`').then(x => x.delete({ timeout: 3000 }))

        client.channels.cache.get(id.Mute.mutelogkanalid).send(new Discord.MessageEmbed().setColor('#97ffff').setDescription(`${üye}\`(${üye.id})\` adlı üye, <@${message.author.id}>\`(${message.author.id})\` üyesi tarafından \`(${new Date().toTurkishFormatDate()})\` zamanında ses kanallarında ki susturulması kaldırdı.`))

        üye.voice.setMute(false), message.lineReply('`Etiketlenen üyenin başarıyla ses kanallarında ki susturulması kaldırıldı!`').then(x => x.delete({ timeout: 9000 }), message.react(id.Emojiler.başarılıemojiid))
    }
}