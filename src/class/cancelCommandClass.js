const { Client, GatewayIntentBits } = require("discord.js");
const auth = require("../data/auth");

const cancelCommandClass = new class cancelCommandClass {
    constructor(user, guild, channel) {
        this.user = user;
        this.guild = guild;
        this.channel = channel;
        this.client = new Client({
            intents: [
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
            ]
        });
    };

    async run() {
        this.client.on('ready', async () => {
            this.client.guilds.cache.get(this.guild).channels.cache.get(this.channel).messages.fetch({
                limit: 5
            }).then(async msg => {
                console.log(msg);
            });
        });

        this.client.login(auth.discordToken);
        setTimeout(() => {
            this.client.destroy();
        }, 60000);
    };
};

module.exports = cancelCommandClass;