const cancelCommandClass = require("../../class/cancelCommandClass");

module.exports = {
    name: 'cancelar',
    aliases: ["cancel"],
    async execute(message) {
        const data = {
            "user": message.author.id,
            "guild": message.guild.id,
            "channel": message.channel.id,
        };
        const command = new cancelCommandClass(data);
        command.run();
    },
};