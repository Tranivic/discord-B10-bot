const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
  data: {
    name: 'b10',
    description:
      'Faz a integração com o OpenAI, ira responder o que o usuario digitar',
  },
  async execute(interaction, requestedPrompt) {
    interaction.react('🤖');
    requestedPrompt = requestedPrompt.join(' ');
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
      interaction.reply(messageResponse);
    } catch (error) {
      console.log(error);
      interaction.reactions.removeAll();
      interaction.reply('Algo deu errado com a integração com o OpenAI');
      interaction.react('❌');
    }
  },
};
