import JWTDecode from "jwt-decode";
import cookieparser from "cookieparser";

// import messagePlugin from '../plugins/message.plugin'
// import Vue from 'vue'
// Vue.use(messagePlugin)

export const state = () => ({
  // error: null,
  locales: ["en", "ru"],
  locale: "ru"
});

export const mutations = {
  // SET_ERROR: (state, error) => {
  //     console.log('SET_ERROR', error)
  //     state.error = error
  // },
  // CLEAR_ERROR: (state) => {
  //   state.error = null
  // },
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale;

      // state.lang = data;
      // i18n.locale = data;
      // localize(data, jp);

      // localize('en', en);
    }
  }
};

export const getters = {
  locale: state => state.locale
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    console.log("nuxtServerInit");
    if (process.server && process.static) return;
    if (!req.headers.cookie) return;

    const parsed = cookieparser.parse(req.headers.cookie);
    const accessTokenCookie = parsed.access_token;

    if (!accessTokenCookie) return;

    const decoded = JWTDecode(accessTokenCookie);

    if (decoded) {
      commit("users/SET_USER", {
        uid: decoded.user_id,
        email: decoded.email
      });
    }
  }
};
