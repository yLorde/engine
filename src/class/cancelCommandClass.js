const { Client, GatewayIntentBits, Guild } = require("discord.js");
const auth = require("../data/auth");

module.exports = class cancelCommandClass {
    constructor(data) {
        this.user = data.user;
        this.guild = data.guild;
        this.channel = data.channel;
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
            ]
        });
    };

    async run() {
        this.client.on('ready', async () => {
            this.client.guilds.cache.get(this.guild).channels.cache.get(this.channel).messages.fetch({ limit: 5 }).then(async msg => {
                await msg.map(async msgs => {
                    if (msgs.author.id != this.client.user.id) return;
                    if (!msgs.embeds) return;
                    if (!msgs.embeds[0]) return;
                    if (!msgs.embeds[0].data) return;
                    if (msgs.embeds[0].data) {
                        if (msgs.embeds[0].data.footer.text.includes(this.user)) {
                            await msgs.delete().catch(err => { });
                        } else if (msgs.embeds[0].data.footer.text.includes(this.client.users.cache.get(this.user).tag)) {
                            await msgs.delete().catch(err => { });
                        };
                    };
                });
            })
        });

        this.client.login(auth.discordToken);
        setTimeout(() => {
            this.client.destroy();
        }, 60000);
    };
};