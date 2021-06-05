const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const ms = require("ms");
const db = require("quick.db");
const id = require('../Settings/idler.json')
const ayar = require('../Settings/config.json')

module.exports = {
    name: 'tempvmute',
    aliases: ['vsürelimute', 'süreli-vmute', 'temp-vmute'],
    async execute(client, message, args) {

        if (!message.member.hasPermission('MANAGE_ROLES') && !message.member.roles.cache.get(id.Mute.muteyetkiliid) && message.author.id !== ayar.sahip) return message.lineReply('`Bu komudu kullanmak için gerekli izinlere sahip değilsin!`').then(x => x.delete({ timeout: 3000 }), message.react(id.Emojiler.başarısızemojiid));

        let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let sebep = args.slice(2).join(' ');
        let süre = args[1];
        if (!üye || !süre || !sebep) return message.lineReply('`Ses kanallarında susturmak için üye, süre(1s,1m,1h,1d) ve sebep belirtmelisin!`').then(x => x.delete({ timeout: 3000 }));
        if (message.member.roles.highest.position <= üye.roles.highest.position) return message.lineReply('`Etiketlediğin kullanıcı senden üst veya senle aynı pozisyonda!`').then(x => x.delete({ timeout: 3000 }))

        db.push(`üye.${üye.id}.ssicil`, { Yetkili: message.author.id, Tip: "VOICE MUTE", Sebep: sebep, Zaman: Date.now(), Süre: süre });

        client.channels.cache.get(id.Mute.mutelogkanalid).send(new Discord.MessageEmbed().setColor('#97ffff').setDescription(`${üye}\`(${üye.id})\` adlı üye, <@${message.author.id}>\`(${message.author.id})\` üyesi tarafından \`(${new Date().toTurkishFormatDate()})\` zamanında \`(${sebep})\` sebebiyle \`${süre}\` boyunca ses kanallarında susturuldu.`))

        üye.voice.setMute(true), message.lineReply(`\`Etiketlenen üye başarıyla ses kanallarında (${süre}) boyunca susturuldu!\``).then(x => x.delete({ timeout: 9000 }), message.react(id.Emojiler.başarılıemojiid))

        setTimeout(function () {
            üye.voice.setMute(false)
        }, ms(süre));
    }
}