module.exports = {
    name: 'error',
    async execute(err) {
        if (err) {
            console.log(err.message);
            console.log(err.stack.slice(0, 150));
            return;
        };
    },
};