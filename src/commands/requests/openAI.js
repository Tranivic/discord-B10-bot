const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.GPT_TOKEN,
});

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
  