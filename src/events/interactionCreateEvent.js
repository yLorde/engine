const GlobalUsersSchema = require('../database/Schema/GlobalUsersSchema');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        const cases = {
            delMessage: async () => {
                await interaction.message.delete().catch(err => { });
            },

            editBioModal: async () => {
                try {
                    const bio = interaction.fields.getTextInputValue('editBioModalText');

                    await GlobalUsersSchema.findOneAndUpdate(
                        { idU: interaction.member.id },
                        {
                            $set: {
                                'perfil.bio': bio
                            }
                        }
                    );

                    interaction.reply({
                        content: `You've updated your bio!\nNew bio: ${bio}`,
                        ephemeral: true
                    });
                    interaction.message.delete();
                } catch (err) {
                    console.log(err)
                }
            },

            openOneTicketTest: async () => {
                try {
                    await interaction.reply({
                        content: `This ticket is just a test ticket!`,
                        ephemeral: true
                    });
                } catch(err) {
                    console.log(err);
                };
            },

            openTwoTicketTest: async () => {
                try {
                    await interaction.reply({
                        content: `This ticket is just a test ticket!`,
                        ephemeral: true
                    });
                } catch(err) {
                    console.log(err);
                };
            },
        };

        const handler = cases[interaction.customId];
        if (handler) await handler();
    },
};