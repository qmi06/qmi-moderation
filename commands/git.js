const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const ms = require("ms");
const db = require("quick.db");
const id = require('../Settings/idler.json')
const ayar = require('../Settings/config.json')

module.exports = {
    name: 'git',
    aliases: [],
    async execute(client, message, args) {

        let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!üye) return message.lineReply("`Gidebilmek için bir üye belirtmelisin!`").then(x => x.delete({ timeout: 3000 }));
        if (!message.member.voice.channel || !üye.voice.channel || message.member.voice.channelID == üye.voice.channelID) return message.lineReply('`Etiketlenen üye veya sen seste bulunmamaktasın!`').then(x => x.delete({ timeout: 5000 }));
        if (message.member.hasPermission("ADMINISTRATOR")) { await message.member.voice.setChannel(üye.voice.channelID), message.lineReply('`Başarılı bir şekilde etiketlenen üyenin yanına gidildi.`').then(x => x.delete({ timeout: 7000 }), message.react(id.Emojiler.başarılıemojiid)); } else {
            const reactionFilter = (reaction, user) => { return ['✅'].includes(reaction.emoji.name) && user.id === üye.id };
            message.channel.send(new Discord.MessageEmbed().setDescription(`${üye}, ${message.author} seni yanına çekmek istiyor. Gitmek istiyor musun?`).setFooter('Onaylamak için 15 saniyen var.')).then(async msj => {
                await msj.react('✅');
                message.channel.send(`${üye}`).then(x => x.delete())
                msj.awaitReactions(reactionFilter, { max: 1, time: 15 * 1000, error: ['time'] }).then(c => {
                    let onay = c.first();
                    if (onay) {
                        message.member.voice.setChannel(üye.voice.channelID);
                        msj.delete(), message.lineReply('`Başarılı bir şekilde etiketlenen üyenin yanına gidildi.`').then(x => x.delete({ timeout: 7000 }), message.react(id.Emojiler.başarılıemojiid));
                    };
                });
            });
        }
    }
}