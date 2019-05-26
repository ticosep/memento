import UserStore from './userStore';
import LembracaStore from './lembrancaStore';

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.lembrancaStore = new LembracaStore(this);
  }
}


export default new RootStore();