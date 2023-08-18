const cancelCommandClass = require("../../class/cancelCommandClass");

module.exports = {
    name: 'cancelar',
    aliases: ["cancel"],
    async execute(message) {
        cancelCommandClass.run(message.author.id, message.guild.id, message.channel.id);
    },
};