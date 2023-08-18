const cancelCommandClass = require("../../class/cancelCommandClass");

module.exports = {
    name: 'cancelar',
    aliases: ["cancel"],
    async execute(message) {
        const command = new cancelCommandClass(message.author.id, message.guild.id, message.channel.id);
        command.run();
    },
};