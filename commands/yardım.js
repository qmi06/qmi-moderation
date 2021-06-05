const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json')
const ayar = require('../Settings/config.json')

module.exports = {
    name: 'yardım',
    aliases: [],
    async execute(client, message, args) {

        message.channel.send(new Discord.MessageEmbed().setColor('#93ffb5').setAuthor(` ${message.guild.name} Yardım menüsü`)
            .setDescription(`
            > \`.avatar\` -> Avatarınızı gösterir.
            > \`.ban @üye <sebep>\` -> Üyeyi sunucudan yasaklar.
            > \`.çek @üye\` -> Üyeyi bulunduğunuz kanala çekersiniz.
            > \`.emoji-ekle <link> <isim>\` -> Sunucuya emoji eklersiniz.
            > \`.git @üye\` -> Üyenin bulunduğu ses kanalına gidersiniz.
            > \`.jail @üye <sebep>\` -> Üyenin tüm rollerini alarak cezalıya atar.
            > \`.kick @üye <sebep>\` -> Üyeyi sunucudan atar.
            > \`.mute @üye <sebep>\` -> Üyeyi metin kanallarında susturur.
            > \`.rol <al/ver> @üye @rol\` -> Kullanışınıza göre üyeye rol verir veya alır.
            > \`.rolgöster <id>\` -> Belirttiğiniz rol ile ilgili bilgiler verir.
            > \`.say\` -> Sunucu bilgilerini verir.
            > \`.sohbet <aç/kapat>\` -> Kullanış amacınıza göre bulunduğunuz kanalı kapatır veya açar.
            > \`.tempjail @üye <süre> <sebep>\` -> Üyeyi süreli bir şekilde tüm rollerini alarak jaile atar.
            > \`.tempmute @üye <süre> <sebep>\` -> Üyeyi metin kanallarında süreli susturur.
            > \`.tempvmute @üye <süre> <sebep>\` -> Üyeyi ses kanallarında süreli susturur.
            > \`.unban <id>\` -> Belirttiğiniz idnin yasaklamasını kaldırır.
            > \`.unjail @üye\` -> Üyeyi cezalıdan çıkararak eski rollerini geri verir.
            > \`.unmute @üye\` -> Üyenin metin kanallarında ki susturmasını açar.
            > \`.vmute @üye <sebep>\` -> Üyeyi sesli kanallarda susturur.
            > \`.vunmute @üye\` -> Üyenin sesli kanallarda ki susturmasını kaldırır.
            > \`.warn @üye <sebep>\` -> Üyeyi özelden uyarır.
            > \`.yetkili-say\` -> Aktif olup seste olmayan yetkilileri gösterir.
            
            `))

    }
}