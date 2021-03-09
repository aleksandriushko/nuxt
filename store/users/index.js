import { auth } from "@/services/firebase";
import { database } from "@/services/firebase";
import Cookie from "js-cookie";

export const state = () => ({
    user: null
})

export const mutations = {
    SET_USER: (state, account) => {
        state.user = account
    }
}

export const getters = {
    error: state => state.error
}

export const actions = {
    async login({ commit }, account) {
        try {
            // Login the user
            await auth.signInWithEmailAndPassword(account.email, account.password)

            // Get JWT from Firebase
            const token = await auth.currentUser.getIdToken()
            const { email, uid } = auth.currentUser

            // Set JWT to the cookie
            Cookie.set("access_token", token)

            // Set the user locally
            commit("SET_USER", { email, uid })
        } catch (error) {
            commit('SET_ERROR', error, { root: true })

            setTimeout(() => {
                commit('CLEAR_ERROR', '', { root: true })
            }, 3000)
            
            throw error
        }
    },
    async register({ dispatch, commit }, account) {
        try {
            // Register the user
            await auth.createUserWithEmailAndPassword(account.email, account.password)
            
            // Get JWT from Firebase
            const token = await auth.currentUser.getIdToken()
            const { email, uid } = auth.currentUser

            // Set JWT to the cookie
            Cookie.set('access_token', token)

            // Set the user locally
            await commit('SET_USER', { email, uid })

            await database.ref(`/users/${uid}/info`).set({
                test: 111,
                name: account.name
            })
        } catch (error) {
            commit('SET_ERROR', error, { root: true })

            setTimeout(() => {
                commit('CLEAR_ERROR', '', { root: true })
            }, 3000)
            
            throw error
        }
    }
}