import {action, makeAutoObservable, runInAction} from 'mobx';

import {ApiGlobalChatAi} from '../actions/Api';

class ChatStore {
  messages = [];

  constructor() {
    makeAutoObservable(this, {
      fetchApiGlobalChatAi: action.bound,
    });
  }

  async fetchApiGlobalChatAi() {
    try {
      let response = await ApiGlobalChatAi();
      runInAction(() => {
        this.messages = response;
      });
    } catch (error) {}
  }
}

export default new ChatStore();
