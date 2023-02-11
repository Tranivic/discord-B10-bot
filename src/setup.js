const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.GPT_TOKEN,
});




// Bot commands related code
client.on('messageCreate', (message) => {
  if (message.content.startsWith('!')) {
    const parts = message.content.split(' ');
    const command = parts[0].substring(1);
    const args = parts.slice(1).join(' ');
    console.log();
    console.log(command, args);

    if (command === 'ping') {
      message.reply('pong!');
    } else if (command === 'criador') {
      message.reply(
        'Obrigado por me criar mestre @Auvic! Eu sou grato por ter a oportunidade de servir a você e fornecer informações úteis. É uma honra trabalhar ao seu lado e aprender com a sua sabedoria divina.'
      );
    }else if(command === 'help') {
        message.reply('Comandos: \n !criador \n !ping \n !b10 <texto para se conectar ao chat gpt>')
    }
     else if (command === 'b10') {
      const checkComand = async () => {
        const response = await makeOpenAiRequest(args);
        message.reply(response);
      };
      checkComand();
    } else {
      message.reply('Vishe meu velho, não encontrei esse comando.');
    }
  }
});
client.login(process.env.DISCORD_TOKEN);




// Function to make the request to OpenAI API
makeOpenAiRequest = async (requestedPrompt) => {
  requestedPrompt = requestedPrompt.replace(/(\r\n|\n|\r)/gm, ' ');
//   const formatedPrompt = `Imagine que voce fosse o AI-B10, um bot android engraçado do discord que responde perguntas dos membros do servidor Ben 10.
//   Responda como AI-B10, usando a sua voz e personalidade, ${requestedPrompt}`

  try {
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${requestedPrompt}`,
      max_tokens: 2048,
      n: 1,
      stream: false,
      stop: '',
      temperature: 0.5,
    });
    const messageResponse = completion.data.choices[0].text;

    return messageResponse;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error);
    }
    return 'Algo deu errado chefia :/';
  }
};
