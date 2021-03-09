<template>
    <v-app>
        <v-main class="grey darken-3">
            <v-container fill-height="fill-height">
                <v-layout align-center="align-center" justify-center="justify-center">

                    <Nuxt />
                    <Snackbar />

                </v-layout>
            </v-container>
        </v-main>
        <v-footer app="app">
        <v-flex class="text-xs-center">© 2018. All rights reserved. <a @click="testBtn">testBtn</a></v-flex>
        </v-footer>
    </v-app>
</template>

<script>
import { auth } from "@/services/firebase";
import Cookie from "js-cookie";
import Snackbar from '@/components/Snackbar'
import validations from '@/utils/validations'

export default {
    // asyncData(context) {
    //     return { project: 'nuxt' }
    // },
    data() {
      return {
        validations
      }
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
        async logout() {
            await auth.signOut();
            await Cookie.remove("access_token");
            location.href = "/";
        },
        testBtn() {
            console.log('testBtn', this.validations)
            // this.$store.commit('SET_ERROR', 'test error text')
        }
    },
    components: {
        Snackbar
    },
    created() {
        this.$vuetify.theme.isDark = true
    }
}
</script>
