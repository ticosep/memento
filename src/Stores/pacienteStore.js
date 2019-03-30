import { action, computed, observable } from 'mobx';

class PacienteStore{

    @observable pacienteList = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
    }
  
    @action addPaciente = (p) => {
        this.pacienteList.push(p);
    }
  
    @computed get paciente() {
        return this.pacienteList;
      }
  }

  export default PacienteStore;