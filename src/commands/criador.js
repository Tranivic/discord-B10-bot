module.exports = {
  data: {
    name: 'criador',
    description: 'Informa o criador do bot',
  },
  async execute(interaction) {
    await interaction.reply('O criador do bot é o @Auvic');
  },
};
