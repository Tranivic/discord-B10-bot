module.exports = {
    data: {
        name: 'creator',
        description: 'Informa o criador do bot',
    },
    async execute(interaction) {
        await interaction.reply('O criador do bot é o @Auvic');
    }
};