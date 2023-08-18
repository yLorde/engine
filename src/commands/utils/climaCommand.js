const { EmbedBuilder } = require('discord.js');
const weather = require('weather-js');

module.exports = {
    name: 'clima',
    aliases: ["weather"],
    async execute(message, args, client) {

        try {
            weather.find({
                search: args,
                degreeType: 'C'
            }, function (err, result) {
                if (err) {
                    message.channel.send({
                        content: `${message.author.toString()}, unable to execute this command! **Error:** \`${err.code}.\``
                    });
                    return;
                };
                if (!result) {
                    message.channel.send({
                        content: `${message.author.toString()}, **${args}** Not found!`
                    });
                    return;
                };
                message.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setColor('DarkerGrey')
                        .setTitle(`${result[0].location.name}`)
                        .setFooter({ text: `Request by: ${message.author.tag}` })
                        .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ size: 4096 }) })
                        .setThumbnail(result[0].current.imageUrl)
                        .setImage('https://gordoncounty.org/wp-content/uploads/2014/01/weather-banner.jpg')
                        .setFields(
                            { name: 'Temperature', value: `${result[0].current.temperature} °C`, inline: true },
                            { name: 'Time', value: `${result[0].current.observationtime}`, inline: true },
                            { name: '\n', value: '\n' },
                            { name: 'Low/Baixa', value: `${result[0].forecast[0].low} °C`, inline: true },
                            { name: 'High/Alta', value: `${result[0].forecast[0].high} °C`, inline: true},
                            { name: '\n', value: '\n' },
                            { name: 'Winddisplay/Vento', value: `${result[0].current.winddisplay}`, inline: true },
                            { name: 'humidity', value: `${result[0].current.humidity} %`, inline: true }
                        )
                    ]
                });
    
                //console.log(JSON.stringify(result, null, 2));
            });
        } catch(err) {
            console.log(err);
        };

    },
};