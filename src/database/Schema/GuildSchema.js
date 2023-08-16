const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let guildSchema = new Schema({
    idS: { type: String },
    name: { type: String },
    ownerId: { type: String },
    id: { type: String },
    premium: { type: Boolean, default: false },
    premiumRestante: { type: String, default: 'null' },
    prefix: { type: String, default: '-' },
    vip: {
        type: Array, default: [
            {
                role: 'null',
                name: 'null',
                defaultTime: 'null',
                firstLady: true,
                createRole: true,
                createCall: true,
                callCategory: 'null',
                roleImage: true,
            }
        ]
    },
    logs: {
        call: { type: String, default: 'null' },
        chat: { type: String, default: 'null' },
        join: { type: String, default: 'null' },
        leave: { type: String, default: 'null' },
        role: { type: String, default: 'null' },
        ban: { type: String, default: 'null' },
        kick: { type: String, default: 'null' },
        adv: { type: String, default: 'null' },
        inviteCreate: { type: String, default: 'null' },
        serverEdit: { type: String, default: 'null' },
    },
    ticket: {
        suporteRole: { type: String, default: 'null' },
        ticketCategory: { type: String, default: 'null' },
        message: { type: String, default: 'null' },
    },
    autoMessage: {
        type: Array, default: [
            {
                channel: 'null',
                message: 'null',
                color: 'null',
            }
        ]
    },
    autorole: {
        active: { type: Boolean, default: false },
        roles: { type: Array, default: [] },
    },
    joinMessage: {
        send: { type: Boolean, default: false },
        channel: { type: String, default: 'null' },
        message: { type: String, default: 'null' },
        button: { type: Boolean, default: false },
        buttonLabel: { type: String, default: 'null' },
        buttonEmoji: { type: String, default: 'null' },
        messageButton: { type: String, default: 'null' },
        deleteTime: { type: String, default: '30' },
    },
    boostMessage: {
        sendOnAdd: { type: Boolean, default: false },
        sendOnRemove: { type: Boolean, default: false },
        messageAdd: { type: String, default: 'null' },
        messageRemove: { type: String, default: 'null' },
    },
    reactions: {
        react: { type: Boolean, default: false },
        channels: {
            type: Array, default: [{
                channel: '',
                emojis: [],
            }]
        }
    }
});

const Guild = mongoose.model('Guilds', guildSchema);
module.exports = Guild;