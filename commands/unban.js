const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json')
const ayar = require('../Settings/config.json')

module.exports = {
    name: 'unban',
    aliases: [],
    async execute(client, message, args) {

        if (!message.member.hasPermission('BAN_MEMBERS') && !message.member.roles.cache.get(id.Ban.banyetkiliid) && message.author.id !== ayar.sahip) return message.lineReply('`Bu komudu kullanmak için gerekli izinlere sahip değilsin!`').then(x => x.delete({ timeout: 3000 }), message.react(id.Emojiler.başarısızemojiid));


        if (!args[0] || isNaN(args[0])) return message.lineReply("Geçerli bir kişi ID'si belirtmelisin!").then(x => x.delete({ timeout: 3000 }));
        let üye = await client.users.fetch(args[0]);
        if (üye) {
            message.guild.members.unban(üye.id).catch(err => message.lineReply("Bu ID'li kimse banlanmamış!").then(x => x.delete({ timeout: 3000 })));
        } else {
            message.channel.send("Geçerli bir kişi ID'si belirtmelisin!").then(x => x.delete({ timeout: 3000 }));
        };
        message.lineReply("`ID'si girilen üyenin banı kaldırıldı.`").then(x => x.delete({ timeout: 7000 }), message.react(id.Emojiler.başarılıemojiid)), client.channels.cache.get(id.Ban.banlogkanalid).send(new Discord.MessageEmbed().setColor('#f4a460').setDescription(`${üye}\`(${üye.id})\` adlı üye, <@${message.author.id}>\`(${message.author.id})\` üyesi tarafından \`(${new Date().toTurkishFormatDate()})\` zamanında banı kaldırıldı.`));

    }
}