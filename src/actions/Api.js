import axios from 'axios';

const SECRET_KEY_AI = '';
// const SECRET_KEY_AI = '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';

axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = 'Bearer ' + SECRET_KEY_AI;
    config.headers['Content-Type'] = 'application/json';
    console.log('config', JSON.stringify(config));
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (__DEV__) {
      if (!error?.response) {
        console.log(error);
      } else {
        const {config, status, data} = error?.response || {};
        console.log(`URL: ${config?.url}\n`, `STATUS: ${status}\n`, data);
      }
    }
    return Promise.reject(error);
  },
);

export const ApiGlobalChatAi = async (prompt, messages) => {
  try {
    let response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      data: {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Does this message want to generate an AI picture, image, art or anything similar? ${prompt} . Simply answer with a yes or no.`,
          },
        ],
      },
    });
    let isArt = response.data?.choices[0]?.message?.content?.trim();
    if (isArt.toLowerCase().includes('yes')) {
      return ApiImgChatAi(prompt, messages);
    } else {
      return ApiTextChatAi(_, messages);
    }
  } catch (error) {
    console.log('ApiGlobalChatAi.error', error);
  }
};

export const ApiTextChatAi = async (_, messages) => {
  try {
    let response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      data: {
        model: 'gpt-3.5-turbo',
        messages,
      },
    });
    let answer = response.data?.choices[0]?.message?.content;
    messages.push({role: 'assistant', content: answer?.trim()});
    return messages;
  } catch (error) {
    console.log('ApiTextChatAi.error', error);
  }
};

export const ApiImgChatAi = async (prompt, messages) => {
  try {
    let data = {
      prompt,
      n: 1,
      size: '512x512',
    };
    let response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/images/generations',
      data,
    });
    let url = response?.data?.data[0]?.url;
    messages.push({role: 'assistant', content: url});
    return messages;
  } catch (error) {
    console.log('ApiImgChatAi.error', error);
  }
};
