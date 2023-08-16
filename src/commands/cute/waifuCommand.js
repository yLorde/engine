const { EmbedBuilder, ComponentType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const api = require('nekos.life');
const nekos = new api();

module.exports = {
    name: 'waifu',
    async execute(message, args, client) {
    try {
            await message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`Waifu`)
                        .setColor('DarkerGrey')
                        .setImage((await nekos.waifu()).url)
                        .setFooter({ text: `Request by: ${message.author.tag}` })
                ],
            });
        } catch (err) {
            console.log(err);
        };
    },
};