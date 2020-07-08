import UserStore from './userStore';
import LembracaStore from './lembrancaStore';
import { types } from "mobx-state-tree"

// Store that will have all the lembracas from a given paciente
const RootStore = types
    .model({
      userStore: types.optional(UserStore, {}),
      lembrancaStore: types.optional(LembracaStore, {})
    });


export default RootStore.create();