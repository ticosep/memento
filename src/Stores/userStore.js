import { autorun } from "mobx";
import { flow, types } from "mobx-state-tree";

import { app, database, storageRef } from "../services/firebase";
import { getContentType } from "../utils/getContentType";

const STORAGE_KEY_TOKEN = "token";

const Games = types.model({
  gameTime: types.maybe(types.string),
  data: types.maybe(types.string),
  dataSelecionada: types.maybe(types.string),
  numOfMementos: types.maybe(types.number),
  score: types.maybe(types.number),
});

const Memento = types.model({
  desc: types.maybe(types.string),
  data: types.maybe(types.string),
  path: types.maybe(types.string),
  type: types.maybe(types.string),
  url: types.maybe(types.string),
});

const Patient = types.model({
  id: types.maybe(types.string),
  name: types.maybe(types.string),
  birthday: types.maybe(types.string),
  cpf: types.maybe(types.string),
  weight: types.maybe(types.string),
  scores: types.array(types.optional(Games, {})),
  mementos: types.array(types.optional(Memento, {})),
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

        const userSnapshot = snapshot.val();

        self.user = userSnapshot;

        const pacientes = yield database.ref("pacientes/").once("value");

        const pacientesValues = Object.entries(pacientes.val());

        if (self.user.type === "Cuidador") {
          const careGiverPatients = pacientesValues.filter(([key]) =>
            Object.values(userSnapshot.pacientes).some((value) => value === key)
          );

          self.user.patients = careGiverPatients.map(([key, value]) => {
            const mementos = value.mementos
              ? Object.values(value.mementos)
              : [];

            const patient = Object.assign(
              {},
              { ...value },
              { id: key },
              { mementos }
            );
            return patient;
          });
        }

        if (self.user.type === "Medico") {
          self.user.patients = pacientesValues.map(([key, value]) => {
            const mementos = value.mementos
              ? Object.values(value.mementos)
              : [];
            const scores = value.scores ? Object.values(value.scores) : [];

            const patient = Object.assign(
              {},
              { ...value },
              { id: key },
              { mementos, scores }
            );
            return patient;
          });
        }
      } catch (error) {
        console.error(error.message);
      }

      self.loading = false;
    });

    const addMemento = flow(function* (id, memento, desc, file, data, type) {
      try {
        yield new Promise((resolve, reject) => {
          try {
            storageRef
              .child("mementos/" + id + "/" + desc)
              .put(file, memento)
              .then(() => {
                resolve("Uploaded");
              });
          } catch (error) {
            reject("Error upload!");
          }
        });

        storageRef.child("mementos/" + id + "/" + desc).updateMetadata(memento);

        const path = storageRef.child("mementos/" + id + "/" + desc).fullPath;

        // Create a reference to the file we want to download
        const mementoRef = storageRef.child(path);

        // Get the download URL
        const url = yield mementoRef.getDownloadURL();

        yield database.ref("pacientes/" + id + "/mementos").push({
          desc,
          data,
          path,
          type: getContentType(type),
          url,
        });

        const patient = self.user.patients.find((patient) => patient.id === id);

        patient.mementos.push({ desc, path, data, type, url });
      } catch (error) {
        console.error(error.message);
      }
    });

    const addScore = flow(function* (id, gameData) {
      try {
        yield database.ref("pacientes/" + id + "/scores").push(gameData);

        const patient = self.user.patients.find((patient) => patient.id === id);

        patient.scores.push(gameData);
      } catch (error) {
        console.error(error.message);
      }
    });

    return { fetchUser, addMemento, addScore };
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

        const newPatient = Object.assign(
          {},
          { ...patient },
          { id: values.key }
        );

        if (self.user.type === "Cuidador") {
          const key = values.key;
          yield database
            .ref("users/" + self.token + "/pacientes")
            .child(key)
            .set(values.key);
        }

        self.user.patients.push(newPatient);
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
