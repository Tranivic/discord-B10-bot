module.exports = {
    data: {
      name: 'ping',
      description: 'Responde com pong!',
    },
    async execute(interaction) {
      await interaction.reply('Pong!');
    },
  };
  