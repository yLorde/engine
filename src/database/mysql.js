const mongoose = require('mongoose');
const { mongoToken } = require('../data/auth');

module.exports = {
    start() {
        try {
            mongoose.connect(mongoToken).then(async () => {
                console.log(`DataBase iniciada.`)
            }).catch(err => {
                if (err) {
                    console.log('Não foi possível se conectar, operando no modo local!');
                    console.log(`Err:\n${err}`);
                    return;
                };
            });
        } catch (e) {
            console.log(e);
        };
    },
};