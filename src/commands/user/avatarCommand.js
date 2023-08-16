const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");

module.exports = {
    name: 'avatar',
    aliases: ["icon", 'usericon', 'useravatar'],
    async execute(message, args, client) {
        try {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;

            const embed = new EmbedBuilder();
            const row = new ActionRowBuilder();

            if (!member.avatarURL({ size: 4096 })) return;
            if (!member.displayAvatarURL({ size: 4096 })) return;

            embed.setTitle(`Avatar of ${member.tag}`);
            embed.setColor('DarkerGrey');
            embed.setDescription(`Resolution: \`4096x4096\``);
            embed.setFooter({ text: `Request by: ${message.author.tag}` });
            embed.setImage(member.avatarURL({ size: 4096 }));

            row.addComponents([
                new ButtonBuilder()
                    .setLabel(`Baixar Foto`)
                    .setURL(member.avatarURL({ size: 4096 }))
                    .setStyle(ButtonStyle.Link)
                    .setDisabled(false)
            ]);

            row.addComponents([
                new ButtonBuilder()
                    .setLabel(`Server Icon`)
                    .setCustomId(`showServerIcon`)
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(false)
            ]);

            await message.channel.send({
                embeds: [embed],
                components: [row],
            }).then(async (msg) => {
                const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button });

                collector.on('collect', async (i) => {
                    if (message.author.id != i.member.id) {
                        i.reply({
                            content: `This interactions is not for you!`,
                            ephemeral: true
                        });
                        return;
                    }
                    if (i.customId === 'showServerIcon') {
                        await i.message.delete();
                        await msg.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('DarkerGrey')
                                    .setTitle(`Avatar of ${i.member.user.tag}`)
                                    .setDescription(`Resolution: \`4096x4096\``)
                                    .setImage(i.member.displayAvatarURL({ size: 4096 }))
                                    .setFooter({ text: `Request by: ${message.author.tag}` })
                            ],
                            components: [
                                new ActionRowBuilder().addComponents([
                                    new ButtonBuilder()
                                        .setLabel(`Baixar Foto`)
                                        .setURL(i.member.displayAvatarURL({ size: 4096 }))
                                        .setStyle(ButtonStyle.Link)
                                        .setDisabled(false)
                                ])
                            ]
                        });
                        return false
                    };
                });
            });
        } catch (err) {
            console.log(err);
        };
    },
};