import { types } from "mobx-state-tree"

const Lembraca = types.model({
    desc: types.maybe(types.string),
    data: types.maybe(types.string),
    path: types.maybe(types.string),
    type: types.maybe(types.string)
});

// Store that will have all the lembracas from a given paciente
const LembracaStore = types
    .model({
        lembrancaList: types.array(types.optional(Lembraca, {}))
    })
    .actions(self => ({
        addlembranca(p) {
            self.lembrancaList.push(p);
        },
        clearAll() {
            self.lembrancaList.clear();
        }
    }))

export default LembracaStore;