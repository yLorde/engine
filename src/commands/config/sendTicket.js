const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");

module.exports = {
    name: 'sendTicket',
    aliases: ["st"],
    permission: 'ADMINISTRATOR',
    premium: 'sim',
    async execute(message) {
        try {

            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor('DarkerGrey')
                        .setTitle(`Ticket's Setup`)
                        .setDescription(`-> This menu helps with ticket setup. \n\n-> You can use some pre-made templates. \n\n-> And even modify them. \n\n-> To create your model in your own way, just click on \`Create\` and inform all the desired characteristics.`)
                        .setFooter({ text: `Request by: ${message.author.tag}` })
                        .setTimestamp()
                ],
                components: [
                    new ActionRowBuilder().addComponents([
                        new ButtonBuilder().setLabel(`Default`).setStyle(ButtonStyle.Primary).setCustomId(`sendModelOne`).setDisabled(false),
                        new ButtonBuilder().setLabel(`Support`).setStyle(ButtonStyle.Secondary).setCustomId(`sendModelTwo`).setDisabled(false),
                        new ButtonBuilder().setLabel(`Create`).setStyle(ButtonStyle.Success).setCustomId(`createCustomTicket`).setDisabled(true),
                        new ButtonBuilder().setEmoji(`🗑`).setStyle(ButtonStyle.Danger).setCustomId(`deleteThisMessage`).setDisabled(false),
                    ]),
                ],
            }).then(async (msg) => {
                const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button });

                collector.on('collect', async (i) => {
                    if (i.member.id != message.author.id) return i.reply({ content: `This interaction is not for you!`, ephemeral: true });

                    if (i.customId === 'deleteThisMessage') {
                        i.message.delete().catch(err => { });
                    };

                    await i.reply({
                        content: `Wait..`,
                        ephemeral: true
                    });
                    await i.deleteReply();

                    if (i.customId === 'sendModelOne') {
                        await i.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                .setTitle(`${message.guild.name}'s ticket`)
                                .setColor('DarkerGrey')
                                .setFooter({ text: `Engine's Ticket System` })
                                .setDescription(`To open a ticket just click the button below.\n Remember to follow the server rules.\n -> When creating a template you cannot select text other than custom.`)
                            ],
                            components: [
                                new ActionRowBuilder().addComponents([
                                    new ButtonBuilder().setLabel(`Open Ticket`).setCustomId(`openOneTicketTest`).setEmoji(`🎟`).setStyle(ButtonStyle.Secondary),
                                    new ButtonBuilder().setLabel(`PT-BR`).setCustomId(`setOneToBR`).setStyle(ButtonStyle.Primary).setDisabled(true),
                                    new ButtonBuilder().setLabel('Create').setCustomId(`createOneTicketModel`).setStyle(ButtonStyle.Success).setDisabled(true),
                                    new ButtonBuilder().setEmoji(`🗑`).setStyle(ButtonStyle.Danger).setCustomId(`deleteThisMessage`).setDisabled(false),
                                ]),
                            ],
                        }).then(async (msg) => {
                            const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button });
                            
                            collector.on('collect', async (i) => {
                                if (i.member.id != message.author.id) return i.reply({ content: `This interaction is not for you!`, ephemeral: true });

                                if (i.customId === 'deleteThisMessage') {
                                    i.message.delete().catch(err => { });
                                };
                            });
                        });
                    };

                    if (i.customId === 'sendModelTwo') {
                        await i.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                .setTitle(`${message.guild.name}'s ticket`)
                                .setColor('DarkerGrey')
                                .setFooter({ text: `Engine's Ticket System` })
                                .setDescription(`-> Select below which category of ticket you want to open. \n\nTo open a ticket just click the button below.\n Remember to follow the server rules.\n\n -> When creating a template you cannot select text other than custom.`)
                            ],
                            components: [
                                new ActionRowBuilder().addComponents([
                                    new ButtonBuilder().setLabel(`Support`).setCustomId(`openOneTicketTest`).setEmoji(`🎟`).setStyle(ButtonStyle.Secondary),
                                    new ButtonBuilder().setLabel(`Others`).setCustomId(`openTwoTicketTest`).setEmoji(`🎟`).setStyle(ButtonStyle.Secondary),
                                    new ButtonBuilder().setLabel(`PT-BR`).setCustomId(`setTwoToBR`).setStyle(ButtonStyle.Primary).setDisabled(true),
                                    new ButtonBuilder().setLabel('Create').setCustomId(`createTwoTicketModel`).setStyle(ButtonStyle.Success).setDisabled(true),
                                    new ButtonBuilder().setEmoji(`🗑`).setStyle(ButtonStyle.Danger).setCustomId(`deleteThisMessage`).setDisabled(false),
                                ]),
                            ],
                        }).then(async (msg) => {
                            const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button });
                            
                            collector.on('collect', async (i) => {
                                if (i.member.id != message.author.id) return i.reply({ content: `This interaction is not for you!`, ephemeral: true });

                                if (i.customId === 'deleteThisMessage') {
                                    i.message.delete().catch(err => { });
                                };
                            });
                        });
                    };
                });
            });

        } catch (err) {
            console.log(err);
        };
    },
};