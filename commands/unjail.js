const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json')
const ayar = require('../Settings/config.json')

module.exports = {
    name: 'unjail',
    aliases: [],
    async execute(client, message, args) {

        if (!message.member.hasPermission('MANAGE_ROLES') && !message.member.roles.cache.get(id.Jail.jailyetkiliid) && message.author.id !== ayar.sahip) return message.lineReply('`Bu komudu kullanmak için gerekli izinlere sahip değilsin!`').then(x => x.delete({ timeout: 3000 }), message.react(id.Emojiler.başarısızemojiid));

        let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!üye) return message.lineReply('`Jailden çıkarabilmek için bir üye belirtmelisin!`').then(x => x.delete({ timeout: 3000 }));
        if (!üye.roles.cache.get(id.Jail.jailrolid)) return message.lineReply('`Etiketlenen üye jailde bulunmuyor!`').then(x => x.delete({ timeout: 3000 }));
        if (message.member.roles.highest.position <= üye.roles.highest.position) return message.lineReply('`Etiketlediğin kullanıcı senden üst veya senle aynı pozisyonda!`').then(x => x.delete({ timeout: 3000 }))


        if (!db.get(`üye.${üye.id}.roller`)) {
            üye.roles.remove(id.Jail.jailrolid), üye.roles.add(id.kayıtsızrolid)
        } else {

            let roller = db.get(`üye.${üye.id}.roller`) || [];
            let rol = roller.filter(filterRole => filterRole.name !== '@everyone')
            rol.forEach(async rols => { üye.roles.add(rols.id), üye.roles.remove(id.Jail.jailrolid) });
            db.delete(`üye.${üye.id}.roller`);
        }

        client.channels.cache.get(id.Jail.jaillogkanalid).send(new Discord.MessageEmbed().setColor('#f4a460').setDescription(`${üye}\`(${üye.id})\` adlı üye, <@${message.author.id}>\`(${message.author.id})\` üyesi tarafından \`(${new Date().toTurkishFormatDate()})\` zamanında jailden çıkarıldı.`))

        message.lineReply('`Etiketlenen üye başarıyla jailden çıkarıldı!`').then(x => x.delete({ timeout: 9000 }), message.react(id.Emojiler.başarılıemojiid))
    }
}