const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json')
const ayar = require('../Settings/config.json')

module.exports = {
    name: 'say',
    aliases: [],
    async execute(client, message, args) {


        let toplam = message.guild.memberCount;
        let online = message.guild.members.cache.filter(only => only.presence.status != "offline").size;
        const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
        let count = 0

        let textChannels = message.guild.channels.cache.filter(m => m.type == "text").size;
        for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size; let boost = message.guild.premiumSubscriptionCount
        let tag = message.guild.members.cache.filter(m => m.user.username.includes(id.Tag)).size;

        const acebots = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name} Sunucu İstatistik`)
            .setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
            .setDescription(`> Sunucuda ki kişi sayısı: \`${toplam}\`
        > Tagımızı bulunduran kişi sayısı: \`${tag}\`
        > Sesli kanallarda bulunan kişi sayısı: \`${count}\`
        > Sunucuda ki boost sayısı:  \`${boost}\` `);

        message.channel.send(acebots);

    }
}