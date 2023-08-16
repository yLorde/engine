const { Client, GatewayIntentBits, Partials, Collection, ComponentType, messageLink } = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');
const { discordToken } = require("./data/auth");
const { magenta } = require('colors');

const client = new Client({
    intents: [
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User
    ], 
});

client.commands = new Collection();
client.database = new Collection();
client.aliases = new Collection();
client.description = new Collection();
client.usage = new Collection();
client.config = new Collection();

client.setMaxListeners(50);

client.login(discordToken);

const functions = fs.readdirSync("./src/functions/handler").filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync("./src/commands");

for (file of functions) {
    require(`./functions/handler/${file}`)(client)
};
client.handleEvents(eventFiles, "./src/events");
client.handleCommands(commandFolders, "./src/commands");