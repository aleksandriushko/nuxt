import { auth } from "@/services/firebase";
import { database } from "@/services/firebase";
import Cookie from "js-cookie";

export const state = () => ({
  user: null
});

export const mutations = {
  SET_USER: (state, account) => {
    state.user = account;
  }
};

export const getters = {
  error: state => state.error
};

export const actions = {
  async login({ commit }, account) {
    try {
      // Login the user
      await auth.signInWithEmailAndPassword(account.email, account.password);

      // Get JWT from Firebase
      const token = await auth.currentUser.getIdToken();
      const { email, uid } = auth.currentUser;

      // Set JWT to the cookie
      Cookie.set("access_token", token);

      // Set the user locally
      commit("SET_USER", { email, uid });
    } catch (error) {
      throw error;
    }
  },
  async register({ dispatch, commit }, account) {
    try {
      // Register the user
      await auth.createUserWithEmailAndPassword(
        account.email,
        account.password
      );

      // Get JWT from Firebase
      const token = await auth.currentUser.getIdToken();
      const { email, uid } = auth.currentUser;

      // Set JWT to the cookie
      Cookie.set("access_token", token);

      // Set the user locally
      await commit("SET_USER", { email, uid });

      // remove этот коммент - это тест, в базе создается юзер с каким-то хэшом, и в него добавляется сво-во info в которкю падает объект
      await database.ref(`/users/${uid}/info`).set({
        role: "USER",
        username: account.username
      });
    } catch (error) {
      throw error;
    }
  },
  async forgot({ dispatch, commit }, account) {
    try {
      await auth.sendPasswordResetEmail(account.email);
    } catch (error) {
      throw error;
    }
  }
};
