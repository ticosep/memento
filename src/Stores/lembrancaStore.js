import { action, computed, observable } from 'mobx';

class LembracaStore{

    @observable lembrancaList = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
    }
  
    @action addlembranca = (p) => {
        this.lembrancaList.push(p);
    }
  
    @computed get lembranca() {
        return this.lembrancaList;
      }
  }

  export default LembracaStore;