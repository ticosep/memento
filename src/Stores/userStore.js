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
  type: types.maybe(types.string),
  name: types.maybe(types.string),
  birthday: types.maybe(types.string),
  cpf: types.maybe(types.string),
  uid: types.maybe(types.string),
  patients: types.map(Patient),
});

// Store that will have all the lembracas from a given paciente
const UserStore = types
  .model({
    user: types.maybe(User),
    token: types.maybe(types.string),
    loading: false,
  })

  .actions((self) => {
    const fetchUser = flow(function* () {
      self.loading = true;

      // Try to login with the google default sing in
      try {
        const snapshot = yield database
          .ref("users/" + self.token)
          .once("value");

        const value = snapshot.val();

        console.log(value);
      } catch (error) {
        console.error(error.message);
      }

      self.loading = false;
    });

    return { fetchUser };
  })

  .actions((self) => {
    const initialize = (token) => {
      self.token = token;

      if (token) {
        self.fetchUser();
      }
    };

    return {
      initialize,
    };
  })
  .actions((self) => {
    // Make the login with the API, pass the token that come from google, and set the token generated in th API
    const login = flow(function* ({ email, password }) {
      self.loading = true;

      // Try to login with the google default sing in
      try {
        const authUser = yield app
          .auth()
          .signInWithEmailAndPassword(email, password);

        const { uid } = authUser.user;

        self.initialize(uid);

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

      self.loading = false;
    });

    return { login };
  })

  .actions((self) => ({
    afterCreate: () => {
      const token = localStorage.getItem(STORAGE_KEY_TOKEN);

      // Case the token is allready in localsotrage initialize with it
      self.initialize(token || undefined);

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
