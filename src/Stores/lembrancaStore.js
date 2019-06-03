import { action, computed, observable } from 'mobx';

// Store that will have all the lembracas from a given paciente
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