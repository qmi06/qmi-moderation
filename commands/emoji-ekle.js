const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json');
const ayar = require('../Settings/config.json');

module.exports = {
    name: 'ee',
    aliases: [],
    async execute(client, message, args) {

        if (!message.member.hasPermission('MANAGE_EMOJIES') && message.author.id !== ayar.sahip) return message.lineReply('`Bu komudu kullanmak için gerekli izinlere sahip değilsin!`').then(x => x.delete({ timeout: 3000 }), message.react(id.Emojiler.başarısızemojiid));

        let guild = message.guild;
        let [link, ad] = args.slice(0).join(" ").split(" ");
        if (!link || !ad) return message.lineReply('`Emoji ekleyebilmem için geçerli bir link ve isim girmelisin!`').then(x => x.delete({ timeout: 3000 }));

        guild.emojis.create(link, ad)
            .then(emoji => message.lineReply(` \`Başarıyla (${emoji.name}) adında emoji oluşturuldu. (${emoji})\` `).then(x => x.delete({ timeout: 3000 }), message.react(id.Emojiler.başarılıemojiid)));

    }
}