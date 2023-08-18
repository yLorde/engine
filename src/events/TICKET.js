module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        const cases = {

            createCustomTicket: async () => {
                
            },

            createOneTicketModel: async () => {
                
            },

            createTwoTicketModel: async () => {

            },

        };

        const handler = cases[interaction.customId];
        if (handler) await handler();
    },
};