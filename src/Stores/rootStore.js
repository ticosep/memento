import { types } from "mobx-state-tree";

import LembracaStore from "./mementoStore";
import UserStore from "./userStore";

// Store that will have all the lembracas from a given paciente
const RootStore = types.model({
  userStore: types.optional(UserStore, {}),
  lembrancaStore: types.optional(LembracaStore, {}),
});

export default RootStore.create();
