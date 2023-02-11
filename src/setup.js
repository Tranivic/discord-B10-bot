const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

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

// Bot commands related code
client.on('messageCreate', (message) => {
  if (!message.content.startsWith('!') || message.author.bot) return;
  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  console.log(
    'O comando foi: ' +
      command +
      `${
        args.length < 1 ? '. E não teve argumentos' : ' e os argumentos foram'
      }` +
      args
  );
});

client.login(process.env.DISCORD_TOKEN);

const searchCommand = async (commandName) => {
  const fs = require('node:fs');
  const path = require('node:path');
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
      if (command.data.name === commandName) {
        return command;
      }
    } else {
      console.log(
        `Esse comando em ${filePath} está com "data" ou "execute ausentes"`
      );
    }
  }
};
