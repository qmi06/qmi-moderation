const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json')
const ayar = require('../Settings/config.json')

module.exports = {
    name: 'sil',
    aliases: ["temizle", "clear"],
    async execute(client, message, args) {

        if (!message.member.hasPermission('MANAGE_MESSAGES') && message.author.id !== ayar.sahip) return message.lineReply('`Bu komudu kullanmak için gerekli izinlere sahip değilsin!`').then(x => x.delete({ timeout: 3000 }), message.react(id.Emojiler.başarısızemojiid));
        if (!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) return message.lineReply('`Silinecek mesaj sayısı (0-100) arasında olmalıdır`').then(x => x.delete({ timeout: 3000 }));
        await message.delete().catch();
        message.channel.bulkDelete(Number(args[0])).then(silincekmesaj => message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`Başarılı bir şekilde **${silincekmesaj.size}** adet mesaj silindi!`)).then(x => x.delete({ timeout: 7000 }))).catch()
    }
}