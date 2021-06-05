const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json')
const ayar = require('../Settings/config.json')

module.exports = {
    name: 'sicil',
    aliases: [],
    async execute(client, message, args) {

        let üye = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first() : message.author) || message.author;
        let uye = message.guild.member(üye);
        let guild = message.guild;

        let sicil = db.get(`üye.${uye.id}.sicil`) || [];
        sicil = sicil.reverse();
        let listedPenal = sicil.length > 0 ? sicil.map((value, index) => `\`${index + 1}.\` **[${value.Tip}]** __(${new Date(value.Zaman).toTurkishFormatDate()})__ tarihinde ****(${value.Sebep})**** nedeniyle ${message.guild.members.cache.has(value.Yetkili) ? message.guild.members.cache.get(value.Yetkili) : value.Yetkili} tarafından cezalandırıldı.`).join("\n") : "Bu üye hiç ceza almamış.";

        let ssicil = db.get(`üye.${uye.id}.ssicil`) || [];
        ssicil = ssicil.reverse();
        let listedPenal1 = ssicil.length > 0 ? ssicil.map((value, index) => `\`${index + 1}.\` **[${value.Tip}]** __(${new Date(value.Zaman).toTurkishFormatDate()})__ tarihinde ****(${value.Süre})**** boyunca (${value.Sebep}) nedeniyle ${message.guild.members.cache.has(value.Yetkili) ? message.guild.members.cache.get(value.Yetkili) : value.Yetkili} tarafından cezalandırıldı.`).join("\n") : "Bu üye hiç ceza almamış.";


        let uyarılar = db.get(`üye.${uye.id}.uyarılar`) || [];
        uyarılar = uyarılar.reverse();
        let listedPenal2 = uyarılar.length > 0 ? uyarılar.map((value, index) => `\`${index + 1}.\` **[${value.Tip}]** __(${new Date(value.Zaman).toTurkishFormatDate()})__ tarihinde ****(${value.Sebep})**** nedeniyle ${message.guild.members.cache.has(value.Yetkili) ? message.guild.members.cache.get(value.Yetkili) : value.Yetkili} tarafından uyarıldı.`).join("\n") : "Bu üye hiç uyarı almamış..";


        let victim = üye;

        message.channel.send(new Discord.MessageEmbed().setColor('#ffac00').setAuthor(`${uye.displayName.replace("`", "")} ${uye.nickname ? "" : "[Yok]"} adlı kullanıcının sicili!`).setThumbnail(victim.avatarURL({ dynamic: true, format: "png", size: 1024 })).setDescription(`__\`Süreli Ceza Bilgileri\`__\n${listedPenal1}\n\n__\`Süresiz Ceza Bilgileri\`__\n ${listedPenal}\n\n __\`Uyarı Bilgileri\`__\n ${listedPenal2}`));
    }
}