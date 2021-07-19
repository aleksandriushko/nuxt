<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app >
      <v-list dense>
        <v-list-item link :to="$i18n.path('')">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('links.home') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="$i18n.path('about')">
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('links.about') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="$i18n.path('buildings')">
          <v-list-item-action>
            <v-icon>mdi-arrow-right</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('links.buildings') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="$i18n.path('resources')">
          <v-list-item-action>
            <v-icon>mdi-arrow-right</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('links.resources') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>



        <!-- <v-list-item link :to="$i18n.path('specialists')">
          <v-list-item-action>
            <v-icon>mdi-arrow-right</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('links.specialists') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->


        <v-list-group :value="false" prepend-icon="mdi-account-circle">
          <template v-slot:activator>
            <v-list-item-title>{{ $t('links.specialists') }}</v-list-item-title>
          </template>

            <v-list-item v-for="([title, icon, path], i) in specialists" :key="i" link  :to="$i18n.path(path)">
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="getLinkName(title)"></v-list-item-title>
            </v-list-item>
        </v-list-group>


        <v-list-item link :to="$i18n.path('buffs')">
          <v-list-item-action>
            <v-icon>mdi-arrow-right</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('links.buffs') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $t('layout.topBarTitle') }}</v-toolbar-title>

      <v-spacer />
      <div v-if="currentUser">
        <v-btn text @click="logout">Logout</v-btn>
        <v-btn text>{{ currentUser.email }}</v-btn>
      </div>
      <div v-else>
          <v-btn text :to="$i18n.path('login')">{{ $t('links.login') }}</v-btn>
          <v-btn text :to="$i18n.path('register')">{{ $t('links.register') }}</v-btn>
          <v-btn text :to="`/ru` + $route.fullPath" v-if="$i18n.locale === 'en'" active-class="none" exact>{{ $t('links.en') }}</v-btn>
          <v-btn text :to="$route.fullPath.replace(/^\/[^\/]+/, '')" v-else active-class="none" exact>{{ $t('links.ru') }}</v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <!-- <v-container fluid> -->
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { auth } from "@/services/firebase";
  import Cookie from "js-cookie";

  export default {
    name: "default",
    data: () => ({
      drawer: null,

      specialists: [
        ['Explorers', 'mdi-account-multiple-outline', 'specialists/explorers'],
        ['Geologists', 'mdi-account-multiple-outline', 'specialists/geologists'],
        ['Generals', 'mdi-account-multiple-outline', 'specialists/generals'],
        ['Marshals', 'mdi-account-multiple-outline', 'specialists/marshals'],
      ],

    }),
    asyncData(context) {
      return { project: 'nuxt' }
    },
    computed: {
      currentUser() {
        return this.$store.state.users.user
      },
      error() {
        return this.$store.getters.error
      }
    },
    watch: {
      error(firebaseError) {
        console.log('firebaseError', firebaseError)
      }
    },
    methods: {
      changeLang (lang) {
        //mutate 'locale' in store
        this.$store.commit('SET_LANG', lang)
        //re-route to the current page but with the selected language in a query string
        // this.$router.push({ path: `${this.$router.currentRoute.path}?lang=${lang}` })
      },
      async logout() {
          await auth.signOut();
          await Cookie.remove("access_token");
          location.href = "/";
      },
      getLinkName(name) {
        return this.$t(`links.${name.toLowerCase()}`)
      }
    },
    components: {
      // Snackbar
    }
  }
</script>

<style scoped>
ul.v-breadcrumbs.theme--light {
    padding: 0;
}
</style>
