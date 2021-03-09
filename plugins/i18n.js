// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
// Vue.use(VueI18n)

// export default ({ app, store }) => {
//   // inject our i18n instance into the app root to be used in middleware
//   // we assume a store/index.js file has been defined and the variable 'locale' defined on store, we'll go into this in detail in the next code snippet
//   app.i18n = new VueI18n({ //construction a new VueI18n
//     locale: store.state.locale,
//     fallbackLocale: 'en',//always displays Chinese if English translation is not available
//     messages: {
//       //'locales' directory contains all the translations in the form of json files
//       // 'en': require('~/lang/en-US.js'),
//       // 'ru': require('~/lang/ru-RU.js')
//       'en': require('~/lang/en.json'),
//       'ru': require('~/lang/ru.json'),
//     }
//   })
// }

import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    messages: {
      'en': require('~/lang/en.json'),
      'ru': require('~/lang/ru.json'),
    }
  })

  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${app.i18n.locale}/${link}`
  }
}
