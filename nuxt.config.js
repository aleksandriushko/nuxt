import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "%s - settlersportal",
    title: "settlersportal",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  // modules: [
  //   ['nuxt-i18n',
  //   {
  //     locales: [
  //       {
  //         name: 'Russian',
  //         code: 'ru',
  //         iso: 'ru-RU',
  //         file: 'ru-RU.js'
  //       },
  //       {
  //         name: 'English',
  //         code: 'en',
  //         iso: 'en-US',
  //         file: 'en-US.js'
  //       },
  //     ],
  //     langDir: 'lang/',
  //     defaultLocale: 'en',
  //   }]
  // ],

  // Or with global options
  // i18n: {
  // locales: [
  //   { code: 'en', iso: 'en-US', file: 'en-US.js' },
  //   { code: 'ru', iso: 'ru-RU', file: 'ru-RU.js' }
  // ],
  //   defaultLocale: 'en',
  //   langDir: 'lang/',
  //   vueI18n: {
  //     fallbackLocale: 'ru',
  //     messages: {
  //       en: {
  //         welcome: 'Welcome'
  //       },
  //       ru: {
  //         welcome: 'Добро пожаловать'
  //       }
  //     }
  //   }
  // },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "nuxt-interpolation"
  ],

  plugins: ["plugins/i18n.js", "plugins/dayjs.js"],

  // Router settings
  router: {
    // middleware: ['authenticated']
    middleware: ["authenticated", "i18n"]
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    /*
    /  fix bug (Unexpected token 'export') when refrash login and register pages
    /  https://github.com/logaretm/vee-validate/issues/2240
    /  https://logaretm.github.io/vee-validate/guide/rules.html#installing-all-rules
    */
    transpile: ["vee-validate/dist/rules"]
  }
};
