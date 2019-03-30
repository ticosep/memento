import UserStore from './userStore';
import PacienteStore from './pacienteStore';

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.pacienteStore = new PacienteStore(this);
  }
}


export default new RootStore();