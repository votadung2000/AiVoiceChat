import {action, makeAutoObservable, runInAction} from 'mobx';

import {ApiGlobalChatAi} from '../actions/Api';

class ChatStore {
  messages = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this, {
      fetchApiGlobalChatAi: action.bound,
    });
  }

  async fetchApiGlobalChatAi(prompt) {
    this.isLoading = true;
    try {
      let newMessages = [
        ...this.messages,
        {
          role: 'user',
          content: prompt?.trim(),
        },
      ];
      let response = await ApiGlobalChatAi(prompt, newMessages);
      runInAction(() => {
        this.messages = response;
        this.isLoading = false;
      });
    } catch (error) {
      this.isLoading = false;
    }
  }
}

export default new ChatStore();
