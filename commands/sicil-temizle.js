const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json')
const ayar = require('../Settings/config.json')

module.exports = {
    name: 'sicil-temizle',
    aliases: [],
    async execute(client, message, args) {

        if (message.author.id !== ayar.sahip) return message.lineReply('`Bu komudu kullanmak için gerekli izinlere sahip değilsin!`').then(x => x.delete({ timeout: 3000 }), message.react(id.Emojiler.başarısızemojiid));

        let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!üye) return message.lineReply('`Sicil temizleyebilmek için bir üye belirtmelisin!`').then(x => x.delete({ timeout: 3000 }));
        let uye = message.guild.member(üye);
        let guild = message.guild;

        db.delete(`üye.${uye.id}.sicil`, `üye.${uye.id}.uyarılar`, `üye.${uye.id}.ssicil`);
        message.lineReply(`${uye} \`başarıyla sicili temizlendi!\``);
    }
}