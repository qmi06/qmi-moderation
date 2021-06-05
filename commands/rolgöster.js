const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json');
const ayar = require('../Settings/config.json');

module.exports = {
    name: 'rolgöster',
    aliases: ['rol-göster', "rolgoster", "rol-goster"],
    async execute(client, message, args) {

        if (!message.member.hasPermission('ADMINISTRATOR') && message.author.id !== ayar.sahip) return message.lineReply('`Bu komudu kullanmak için gerekli izinlere sahip değilsin!`').then(x => x.delete({ timeout: 3000 }), message.react(id.Emojiler.başarısızemojiid));

        var rol = message.guild.roles.cache.find(m => m.id === args.slice(0).join(" "));
        if (!rol) return message.lineReply("`Rol görüntüleyebilmek için bir rol ID'si girmelisin`").then(x => x.delete({ timeout: 3000 }));

        let members = message.guild.members.cache.filter(x => x.roles.cache.has(rol.id)).map(y => y.user);
        let total = members.length;

        message.lineReply(`\`• ${rol.name} rolünde (${total}) kişi bulunmakta.\`\n\n__Rolü Bulunduran Kullanıcılar__\n${rol.members.map(uye => `• <@${uye.id}> \`(${uye.id})\``).join("\n")} `).then(x => x.delete({ timeout: 7000 }), message.react(id.Emojiler.başarılıemojiid))

    }
}