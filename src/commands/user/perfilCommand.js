const { EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const GlobalUsersSchema = require('../../database/Schema/GlobalUsersSchema');

module.exports = {
    name: 'perfil',
    async execute(message, args, client) {
        try {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
            if (!member) return;

            const guildUser = message.guild.members.cache.get(member.id);
            const clientUser = client.users.cache.get(member.id);
            const globalUser = await GlobalUsersSchema.findOne({ idU: member.id });

            if (!guildUser) return;
            if (!clientUser) return;
            if (!globalUser) {
                GlobalUsersSchema.create({
                    idU: guildUser.user.id,
                    id: guildUser.user.id,
                    tag: guildUser.user.tag,
                    username: guildUser.username,
                });
                await message.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('DarkerGrey')
                            .setDescription(`Esse usuário não estava registrado no banco de dados...\nReutilize o comando!`)
                    ]
                }).then(async (msg) => {
                    setTimeout(() => {
                        msg.delete().catch(err => { });
                    }, 15000)
                });
                return;
            };

            let permissions = ['Default'];
            let insignia = [];
            let bio = null;
            let another = ' ';
            let blockEdit = false;

            if (member.id != message.author.id) blockEdit = true;

            if (guildUser.permissions.has(PermissionFlagsBits.Administrator)) permissions.push('Admin');
            if (guildUser.permissions.has(PermissionFlagsBits.BanMembers)) permissions.push('Ban');
            if (guildUser.permissions.has(PermissionFlagsBits.MuteMembers)) permissions.push('Mute');
            if (guildUser.permissions.has(PermissionFlagsBits.ManageChannels)) permissions.push('Channels');
            if (guildUser.permissions.has(PermissionFlagsBits.ManageRoles)) permissions.push('Roles');
            if (guildUser.id === (await message.guild.fetchOwner()).id) permissions.push('Guild Owner');

            if (globalUser.perfil.insignia.casado) {
                insignia.push('💍');
                another = `**Married with:** *${globalUser.marry.with}*`
            };

            if (globalUser.perfil.insignia.comprador) insignia.push('🏆');
            if (globalUser.perfil.insignia.equipe) insignia.push('⚙');
            if (globalUser.perfil.insignia.vip) insignia.push('💎');

            if (globalUser.perfil.bio === "null") {
                bio = ' ';
            } else {
                bio = globalUser.perfil.bio;
            }

            const embed = new EmbedBuilder();
            embed.setTitle(`Perfil of: ${clientUser.tag}`);
            embed.setColor(globalUser.perfil.color);
            embed.setFooter({ text: `Request by: ${message.author.tag} | ${message.author.id}` });

            if (globalUser.perfil.background != "null") {
                embed.setImage(globalUser.perfil.background)
            };

            embed.setDescription(`
    ${insignia.join(' ')}
    ${another}
    
    **Bio**:
    ${bio}
    
    **Server Permissions:** \n\`${permissions.join(', ')}\`
    `)
            if (member.displayAvatarURL({ size: 4096 })) embed.setThumbnail(clientUser.displayAvatarURL({ size: 4096 }));

            message.channel.send({
                embeds: [embed],
                components: [
                    new ActionRowBuilder().addComponents([
                        new ButtonBuilder()
                            .setCustomId(`editBioOfPerfil`)
                            .setLabel(`Edit Bio`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(`✏`)
                            .setDisabled(blockEdit)
                    ])
                ],
            }).then(async (msg) => {
                const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button });

                collector.on('collect', async (i) => {
                    try {
                        if (i.member.id != message.author.id) {
                            i.reply({
                                content: `This interaction is not for you!`,
                                ephemeral: true
                            });
                            return;
                        };
                        const modal = new ModalBuilder().setCustomId(`editBioModal`).setTitle(`Edit Bio`);
                        const newBio = new TextInputBuilder()
                            .setStyle(TextInputStyle.Paragraph)
                            .setMinLength(10)
                            .setMaxLength(350)
                            .setCustomId(`editBioModalText`)
                            .setRequired(true)
                            .setLabel(`What's your new bio?`)

                        const row = new ActionRowBuilder().addComponents(newBio);
                        modal.addComponents(row);
                        i.showModal(modal);
                    } catch (err) {
                        console.log(err);
                    };
                });
            });
        } catch (err) {
            console.log(err);
        };
    },
};