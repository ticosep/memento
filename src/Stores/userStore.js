import { action, computed, observable } from 'mobx';

class UserStore {
  @observable user;
  
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setUser = (user) => {
    	this.user = user;
  };

  @computed get userTipo() {
    return this.user.tipo;
  }
 }

export default UserStore;