const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = async function sqlite(method, tabble, value) {
    if (method === 'get') {
        return(
            (await db.get(tabble))
        );
    };
    if (method === 'set') {
        await db.set(tabble, value);
    };
    if (method === 'delete') {
        await db.delete(tabble);
    };
    if (method === 'push') {
        await db.pull(tabble);
    };
};