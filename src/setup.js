const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('!') || message.author.bot) return;

  const userArgument = message.content.slice(1).trim().split(/ +/);
  const userCommand = userArgument.shift().toLowerCase();

  console.log('O usuário digitou: ', userCommand + ' ' + userArgument);
  
  try {
    const command = await searchCommand(userCommand);
    if (command) {
      await command.execute(message, userArgument);
    } else {
      message.reply('Comando não encontrado');
    }
  } catch (error) {
    console.error(error);
    message.reply('Ocorreu um erro ao executar o comando.');
  }
});

client.login(process.env.DISCORD_TOKEN).catch(console.error);

async function searchCommand(commandName) {
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = await fs.readdir(commandsPath);
  const commands = commandFiles

    .filter((file) => file.endsWith('.js'))
    .map((file) => require(`${commandsPath}/${file}`));

  try {
    const retrievedCommand = commands.find(
      (command) => command.data.name === commandName
    );
    return retrievedCommand;
  } catch (error) {
    console.log('Algum comando não possui a propriedade data ou a função execute');
  }
}
