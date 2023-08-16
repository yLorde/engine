const { EmbedBuilder, ComponentType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const api = require('nekos.life');
const nekos = new api();

module.exports = {
    name: 'tapa',
    aliases: ["slap", "bater"],
    async execute(message, args, client) {
        const membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
        const reason = args.slice(1).join(' ');
        try {
            const embed = new EmbedBuilder();

            embed
            .setDescription(`${message.author} hit on ${membro}`)
            .setColor('DarkerGrey')
            .setImage((await nekos.slap()).url)
            .setFooter({ text: `Request by: ${message.author.tag}` })

            if (reason) {
                embed.setTitle(reason)
            };

            await message.channel.send({
                content: membro.toString(),
                embeds: [
                    embed
                ],
                components: [
                    new ActionRowBuilder().addComponents([
                        new ButtonBuilder()
                            .setLabel('Gave Back')
                            .setStyle(ButtonStyle.Secondary)
                            .setCustomId(`slapGaveBack`)
                            .setDisabled(false)
                    ])
                ]
            }).then(async (msg) => {
                const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button });
                collector.on('collect', async (i) => {
                    if (i.member.id != membro.id) {
                        i.reply({
                            content: `This button is not for you!`,
                            ephemeral: true
                        });
                        return;
                    };
                    if (i.customId === 'slapGaveBack') {
                        i.message.edit({
                            components: [
                                new ActionRowBuilder().addComponents([
                                    new ButtonBuilder()
                                        .setLabel('Gave Back')
                                        .setStyle(ButtonStyle.Secondary)
                                        .setCustomId(`slapGaveBack`)
                                        .setDisabled(true)
                                ])
                            ]
                        })
                        i.reply({
                            content: message.author.toString(),
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${membro} hit on ${message.author}`)
                                    .setColor('DarkerGrey')
                                    .setImage((await nekos.slap()).url)
                                    .setFooter({ text: `Request by: ${membro.user.tag}` })
                            ],
                        })
                    };
                });
            });
        } catch (err) {
            console.log(err);
        };

    },
}