const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'cargos',
    aliases: ["roles"],
    async execute(message, args, client) {
        try {
            const user = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.author;
            const member = message.guild.members.cache.get(user.id);
            if (!member) return;

            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor('DarkerGrey')
                        .setTitle(`Roles of: ${member.user.tag}`)
                        .setThumbnail(member.displayAvatarURL({ size: 4096 }))
                        .setDescription(`Roles:\n\n<@&${member.roles.cache.map(r => r.id).join('> \n<@&')}>`)
                        .setFooter({ text: `Request by: ${message.author.tag}` })
                ]
            })
        } catch (err) {
            console.log(err);
        };
    },
}