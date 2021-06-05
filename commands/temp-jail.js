const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const ms = require("ms");
const db = require("quick.db");
const id = require('../Settings/idler.json')
const ayar = require('../Settings/config.json')

module.exports = {
    name: 'tempjail',
    aliases: ['sürelijail', 'süreli-jail', 'temp-jail'],
    async execute(client, message, args) {

        if (!message.member.hasPermission('MANAGE_ROLES') && !message.member.roles.cache.get(id.Jail.jailyetkiliid) && message.author.id !== ayar.sahip) return message.lineReply('`Bu komudu kullanmak için gerekli izinlere sahip değilsin!`').then(x => x.delete({ timeout: 3000 }), message.react(id.Emojiler.başarısızemojiid));

        let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let sebep = args.slice(2).join(' ');
        let süre = args[1];
        if (!üye || !süre || !sebep) return message.lineReply('`Jaile atmak için üye, süre(1s,1m,1h,1d) ve sebep belirtmelisin!`').then(x => x.delete({ timeout: 3000 }));
        if (üye.roles.cache.get(id.Jail.jailrolid)) return message.lineReply('`Etiketlenen üye zaten jailde!`').then(x => x.delete({ timeout: 3000 }));
        if (message.member.roles.highest.position <= üye.roles.highest.position) return message.lineReply('`Etiketlediğin kullanıcı senden üst veya senle aynı pozisyonda!`').then(x => x.delete({ timeout: 3000 }))

        let rols = üye.roles.cache

        db.push(`üye.${üye.id}.ssicil`, { Yetkili: message.author.id, Tip: "JAIL", Sebep: sebep, Zaman: Date.now(), Süre: süre }), db.set(`üye.${üye.id}.sroller`, rols);

        client.channels.cache.get(id.Jail.jaillogkanalid).send(new Discord.MessageEmbed().setColor('#00ff66').setDescription(`${üye}\`(${üye.id})\` adlı üye, <@${message.author.id}>\`(${message.author.id})\` üyesi tarafından \`(${new Date().toTurkishFormatDate()})\` zamanında \`(${sebep})\` sebebiyle \`${süre}\` boyunca jaile atıldı.`))

        üye.roles.set([id.Jail.jailrolid]), message.lineReply(`\`Etiketlenen üye başarıyla (${süre}) boyunca jaile atıldı!\``).then(x => x.delete({ timeout: 9000 }), message.react(id.Emojiler.başarılıemojiid))

        setTimeout(function () {
            if (üye.roles.cache.get(id.Jail.jailrolid)) {
                let roller = db.get(`üye.${üye.id}.sroller`) || [];
                let rol = roller.filter(filterRole => filterRole.name !== '@everyone')
                rol.forEach(async rols => { üye.roles.add(rols.id), üye.roles.remove(id.Jail.jailrolid) });
                db.delete(`üye.${üye.id}.sroller`);
            } else {
                null
            }
        }, ms(süre));
    }
}