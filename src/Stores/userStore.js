import { action, computed } from 'mobx';

class UserStore {
  
  @action setUser = (user) => {
    	this.user = user;
  };

  @computed get userInfo() {
    return this.user;
  }
}

export default new UserStore();