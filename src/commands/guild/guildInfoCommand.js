const { EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, GuildDefaultMessageNotifications } = require("discord.js");
const moment = require('moment');

module.exports = {
    name: 'serverinfo',
    aliases: ['guildinfo', 'guildabout', 'serverabout'],
    async execute(message, args, client) {
        try {

            const aa__ = message;
            const bb__ = args;
            const guild = client.guilds.cache.get(args[0]) || message.guild;
            if (!guild) return;

            const embed = new EmbedBuilder();
            const row = new ActionRowBuilder();

            if (guild.iconURL({ size: 4096 })) {
                embed.setThumbnail(guild.iconURL({ size: 4096 }));

                row.addComponents([
                    new ButtonBuilder()
                        .setLabel(`Icon URL`)
                        .setStyle(ButtonStyle.Link)
                        .setURL(guild.iconURL({ size: 4096 }))
                ]);
            };

            embed.setTitle(`${guild.name}'s Info`)
            embed.setColor('DarkerGrey')
            embed.setFooter({ text: `Request by: ${message.author.tag}` })
            //embed.setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 4096 }) });
            embed.setFields(
                { name: `<:3970discord:1101618872802607184> ID`, value: `${guild.id}`, inline: true },
                { name: `<:Guild_owner_dark_theme:1101618600063795280> Owner`, value: `<@${(await guild.fetchOwner()).id}>`, inline: true },
                { name: `\n`, value: `\n` },
                { name: `<:locked_textchannel:1101618320026910720> Text Channels`, value: `${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size}`, inline: true },
                { name: `<:Discord_voice_private_dark:1101618444706795530> Voice Channels`, value: `${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size}`, inline: true },
                { name: `\n`, value: `\n` },
                { name: `<:Boost:1101612104030629979> Boosts`, value: `${guild.premiumSubscriptionCount}`, inline: true },
                { name: `<:Members:1101617762549375036> Members`, value: `${guild.memberCount}`, inline: true },
                { name: `<:BOT:1101617992606949376> Bot(s)`, value: `${guild.members.cache.filter(member => member.user.bot).size}`, inline: true },
                { name: `Created In`, value: `${moment(guild.createdAt).format('DD/MM/YYYY, à\\s HH:mm:ss')}` },
            )
            if (guild.bannerURL({ size: 4096 })) {
                row.addComponents([
                    new ButtonBuilder()
                        .setLabel(`Banner URL`)
                        .setStyle(ButtonStyle.Link)
                        .setURL(guild.bannerURL({ size: 4096 }))
                ]);
                embed.setImage(guild.bannerURL({ size: 4096 }))
            };

            if (!row.components[0]) {
                row.addComponents([
                    new ButtonBuilder()
                        .setLabel(`No Buttons`)
                        .setDisabled(true)
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId('__no__buttons__')
                ]);
            };

            message.reply({
                embeds: [embed],
                components: [row],
            });
        } catch (err) {
            console.log(err);
        };
    },
}