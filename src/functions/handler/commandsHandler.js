const fs = require('node:fs');

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                client.commands.set(command.name, command);
            };
        };
    };
};