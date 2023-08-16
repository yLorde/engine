const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'fakeban',
    permission: 'BAN_MEMBERS',
    premium: 'sim',
    async execute(message, args) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let author = message.guild.members.cache.get(message.author.id);
        let reason = args.slice(1).join(' ') || "No reason";
        //if (message.member.roles.highest.position < member.roles.highest.position) return;

        if (!member) return;
        if (member.id === author.id) return;

        try {

            await message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setFooter({ text: `Request by: ${message.author.tag}` })
                        .setColor(`DarkerGrey`)
                        .setDescription(`Member banned successfully! Check the logs.`)
                        .setTitle(`Banned!`)
                        .setTimestamp()
                ]
            }).then(async (msg) => {
                setTimeout(() => {
                    msg.delete().catch(err => { });
                }, 15000);
            }).catch(err => { });

            member.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`Message: BAN`)
                        .setDescription(`You have been banned from the server: **${message.guild.name}**`)
                        .setFields(
                            { name: `Moderator`, value: `${author} \`${author.user.tag}\``, inline: true },
                            { name: `User`, value: `${member}, \`${member.user.tag}\``, inline: true },
                            { name: `Reason`, value: `${reason}`, inline: true },
                        )
                        .setThumbnail(author.user.avatarURL({ size: 4096 }))
                        .setColor('DarkerGrey')
                        .setFooter({ text: `This message is just for fun.` })
                        .setTimestamp()
                ]
            }).catch(err => { });

        } catch (err) {
            console.log(err);
            if (err) {
                await message.channel.send({
                    content: `${message.author.toString()}, Unable to ban member.`,
                }).then(async (msg) => {
                    setTimeout(() => {
                        msg.delete().catch(err => { });
                    }, 15000)
                });
            };
        };

    },
};