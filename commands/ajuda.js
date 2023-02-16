const fs = require('fs').promises;
const path = require('path');

module.exports = {
  data: {
    name: 'ajuda',
    description: 'Lista todos os comandos disponíveis',
    aliases: ['comandos', 'help', 'commands'],
  },
  async execute(interaction) {
    const commandsPath = path.join(__dirname);
    const commandFiles = await fs.readdir(commandsPath);
    const commands = commandFiles.filter((file) => file.endsWith('.js'));
    let formatedReply = `Lista de comandos disponíveis: \n\n`;
    try {
      await commands.forEach((command) => {
        const commandData = require(`${commandsPath}/${command}`);
        let commandFind = {
          name: commandData.data.name,
          description: commandData.data.description,
        };
        formatedReply += `!${commandFind.name} : ${commandFind.description} \n`;
      });
      
      await interaction.author.send(formatedReply);
      await interaction.reactions.removeAll();
      await interaction.react('✅');

    } catch (error) {
      await interaction.reply(
        'Ocorreu algum erro ao enviar a lista de comandos por DM, verifique se você tem as mensagens privadas ativadas.'
      );
      console.log(error.rawError.message);
    }
  },
};
