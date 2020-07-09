import { autorun } from "mobx";
import { flow, types } from "mobx-state-tree";

import { app, database } from "../services/firebase";

const STORAGE_KEY_TOKEN = "token";

const PatientDescription = types.model({
  name: types.maybe(types.string),
  birthday: types.maybe(types.string),
  cpf: types.maybe(types.string),
  weight: types.maybe(types.number),
});

const Patient = types.model({
  id: types.maybe(types.string),
  desc: types.maybe(PatientDescription),
});

const User = types.model({
  type: types.maybeNull(types.string),
  name: types.maybe(types.string),
  birthday: types.maybe(types.string),
  cpf: types.maybe(types.string),
  uid: types.maybe(types.string),
  patients: types.array(Patient),
});

// Store that will have all the lembracas from a given paciente
const UserStore = types
  .model({
    user: types.maybeNull(User),
    token: types.maybe(types.string),
    loading: false,
  })
  .views((self) => ({
    get isAuthorized() {
      return !!self.token;
    },
  }))
  .actions((self) => {
    const fetchUser = flow(function* () {
      self.loading = true;

      // Try to login with the google default sing in
      try {
        const snapshot = yield database
          .ref("users/" + self.token)
          .once("value");

        const value = snapshot.val();

        self.user = value;
      } catch (error) {
        console.error(error.message);
      }

      self.loading = false;
    });

    return { fetchUser };
  })

  .actions((self) => {
    const initialize = flow(function* (token) {
      self.token = token;

      if (token) {
        yield self.fetchUser();
      }
    });

    return {
      initialize,
    };
  })
  .actions((self) => {
    const logout = () => {
      self.token = undefined;
    };
    // Make the login with the API, pass the token that come from google, and set the token generated in th API
    const login = flow(function* ({ email, password }) {
      // Try to login with the google default sing in
      try {
        const authUser = yield app
          .auth()
          .signInWithEmailAndPassword(email, password);

        const { uid } = authUser.user;

        yield self.initialize(uid);

        return {
          response: true,
          message: "ok",
        };
      } catch (error) {
        console.error(error.message);

        return {
          response: false,
          message: error.message,
        };
      }
    });

    return { login, logout };
  })

  .actions((self) => {
    const addPatient = flow(function* (patient) {
      try {
        const values = yield database.ref("pacientes/").push(patient);

        if (self.user.type === "Cuidador") {
          const key = values.key;
          const value = { ...patient, cuidador: self.token };
          const values = yield database
            .ref("users/" + self.token + "/pacientes")
            .child(key)
            .set(patient);
        }
      } catch (error) {
        console.error(error);
      }
    });

    return {
      addPatient,
    };
  })

  .actions((self) => ({
    afterCreate: async () => {
      const token = localStorage.getItem(STORAGE_KEY_TOKEN);

      // Case the token is allready in localsotrage initialize with it
      await self.initialize(token || undefined);

      autorun(() => {
        if (self.token) {
          localStorage.setItem(STORAGE_KEY_TOKEN, self.token);
        } else {
          localStorage.removeItem(STORAGE_KEY_TOKEN);
        }
      });
    },
  }));

export default UserStore;
