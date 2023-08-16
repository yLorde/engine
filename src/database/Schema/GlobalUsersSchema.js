const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    idU: { type: String },
    id: { type: String },
    tag: { type: String },
    username: { type: String },
    denied: { type: Boolean, default: false }, //não vai poder usar comandos
    money: {
        hand: { type: Number, default: 0 }, //tem que depositar o dinheiro p/ n ser roubado
        bank: { type: Number, default: 0 }, //maybe juros
        daily: { type: Number, default: 0 },
        work: {
            exp: { type: Number, default: 0 },
            level: { type: Number, default: 1 },
            job: { type: String, default: 'null' },
        },
    },
    perfil: {
        background: { type: String, default: 'null' },
        bio: { type: String, default: 'null' }, //OLÁ, EU ME CHAMO LORD E SOU FODA
        tempStatus: { type: String, default: 'null' }, //NOTAS DO IG
        color: { type: String, default: 'DarkerGrey' },
        insignia: {
            casado: { type: Boolean, default: false },
            comprador: { type: Boolean, default: false },
            vip: { type: Boolean, default: false },
            equipe: { type: Boolean, default: false },
        },
    },
    marry: {
        is: { type: Boolean, default: false },
        with: { type: String, default: 'null' },
        date: { type: String, default: 'null' },
    },
});

const GlobalUsers = mongoose.model('GlobalUsers', userSchema);
module.exports = GlobalUsers;