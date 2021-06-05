const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json');
const ayar = require('../Settings/config.json');

module.exports = {
    name: 'nerede',
    aliases: ['ses-bilgi', "sesbilgi", "ses-durum", "sesdurum"],
    async execute(client, message, args) {

        if (!message.member.hasPermission('ADMINISTRATOR') && message.author.id !== ayar.sahip) return message.lineReply('`Bu komudu kullanmak için gerekli izinlere sahip değilsin!`').then(x => x.delete({ timeout: 3000 }), message.react(id.Emojiler.başarısızemojiid));

        let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!üye) return message.lineReply('`Ses durumuna bakmak istediğiniz üyeyi belirtiniz!`').then(x => x.delete({ timeout: 3000 }));
        if (!üye.voice.channel) return message.lineReply('`Üye ses kanalında bulunmamaktadır!`').then(x => x.delete({ timeout: 3000 }));

        let mic = üye.voice.selfMute ? "Kapalı" : "Açık";
        let kul = üye.voice.selfDeaf ? "Kapalı" : "Açık";

        message.lineReply(`\`Etiketlenen üye (${message.guild.channels.cache.get(üye.voice.channelID).name}) adlı ses kanalında. Kullanıcının mikrofon durumu (${mic}), kulaklık durumu (${kul}) şeklindedir.\``).then(x => x.delete({ timeout: 7 * 1000 }), message.react(id.Emojiler.başarılıemojiid));

    }
}