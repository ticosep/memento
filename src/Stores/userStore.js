import { types } from "mobx-state-tree"

// Store that will have all the lembracas from a given paciente
const UserStore = types
    .model({
        type: types.maybe(types.string)
    })
    .actions(self => ({
        setType  (type)  {
            self.type = type;
        }
    }))


export default UserStore;