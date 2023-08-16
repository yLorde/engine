const { EmbedBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const config = require("../data/config");
const { ButtonBuilder } = require("@discordjs/builders");
const about = require("../data/about");
const GlobalUsersSchema = require('../database/Schema/GlobalUsersSchema');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        try {

            var prefix = config.defaultPrefix;
            if (message.author.bot) return;
            if (!message.guild) return;

            async function delMessage(user) {
                message.channel.messages.fetch({
                    limit: 5
                }).then(async (msg) => {
                    msg.map((m) => {
                        if (m.content.startsWith(prefix)) {
                            if (m.author.id === user.id) {
                                m.delete().catch(err => { });
                            };
                        };
                    });
                });
            };

            const GlobalUser = await GlobalUsersSchema.findOne({ idU: message.author.id });
            if (!GlobalUser) {
                await GlobalUsersSchema.create({
                    idU: message.author.id,
                    id: message.author.id,
                    tag: message.author.tag,
                    username: message.author.username
                });
            };

            if (message.content === `<@${client.user.id}>`) {
                await message.channel.send({
                    content: message.author.toString(),
                    embeds: [
                        new EmbedBuilder()
                            .setColor('DarkerGrey')
                            .setDescription(`Hello, my name is ${client.user.username} and I'm here to help you!\n [do not click here!](https://www.youtube.com/watch?v=tgIRmwMvlf4)\n\n:flag_br: I was raised by a Brazilian!`)
                            .setFields(
                                { name: 'Author', value: `\`${client.users.cache.get(about.authorId).tag}\``, inline: true },
                                { name: 'Version', value: `\`${about.version}\``, inline: true },
                                { name: 'Prefix', value: `\`${config.defaultPrefix}\``, inline: true },
                                { name: 'Commands', value: `\`${client.commands.size}\``, inline: true },
                                { name: 'Guilds', value: `\`${client.guilds.cache.size}\``, inline: true },
                            )
                            .setTitle(`Who is calling me?`)
                            //.setImage(client.user.avatarURL({ size: 4096 }))
                            .setThumbnail(client.users.cache.get(about.authorId).avatarURL({ size: 4096 }))
                    ],
                    components: [
                        new ActionRowBuilder().addComponents([
                            new ButtonBuilder().setLabel('Commands').setCustomId('mentionCommandsViews').setStyle(ButtonStyle.Secondary).setDisabled(true),
                            new ButtonBuilder().setLabel('Functions').setCustomId('mentionFunctionsViews').setStyle(ButtonStyle.Secondary).setDisabled(true),
                            new ButtonBuilder().setLabel('About').setCustomId('mentionAboutView').setStyle(ButtonStyle.Secondary).setDisabled(true),
                            new ButtonBuilder().setLabel('Website').setURL('https://google.com').setStyle(ButtonStyle.Link).setDisabled(true),
                        ]),
                    ]
                }).then(async (msg) => {
                    setTimeout(() => {
                        msg.delete().catch(err => { });
                    }, 15000)
                });
            };

            if (
                !message.content.startsWith(prefix)
            ) return;

            const args = message.content.slice(prefix.length).trim().split(/\s+/g);
            const commandName = args.shift().toLowerCase();

            const command =
                client.commands.get(commandName) ||
                client.commands.find(
                    (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
                );

            if (!command) {
                await delMessage(message.author);
                await message.channel.send({
                    content: `${message.author.toString()}, Unknown command.`,
                }).then(async (msg) => {
                    setTimeout(() => {
                        msg.delete().catch(err => { });
                    }, 15000)
                });
                return;
            };

            try {
                if (command.permission) {
                    if (!message.member.permissions.has(command.permission)) {
                        await message.reply({
                            content: `${message.author.toString()}, you do not have permissions to use this command.`,
                        }).then(async (msg) => {
                            setTimeout(() => {
                                msg.delete().catch(err => { });
                            }, 15000)
                        });
                        return;
                    };
                };
                await delMessage(message.author);
                await command.execute(message, args, client);
            } catch (err) {
                await message.reply({
                    content: `${message.author.toString()} unable to execute this command, error code: ${err.code}`,
                }).then(msg => {
                    setTimeout(() => {
                        msg.delete().catch(err => { });
                    }, 10000);
                })
                console.log(err);
            };

        } catch (err) {
            console.log(err);
        };
    },
};