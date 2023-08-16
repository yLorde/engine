const { ActivityType } = require("discord.js");
const mysql = require('../database/mysql');
const GlobalUsersSchema = require('../database/Schema/GlobalUsersSchema');

module.exports = {
    name: 'ready',
    async execute(client) {
        console.log('Bot iniciado!');

        try {
            mysql.start();
        } catch (err) {
            console.log(err);
        };

        client.database.globalusers = GlobalUsersSchema;

        client.user.setPresence({
            afk: false,
            status: 'online',
            activities: [{
                name: 'Em desenvolvimento!',
                type: ActivityType.Playing
            }]
        });
    },
}