<template>
    <v-flex class="login-form text-center">
      <div class="display-1 mb-3">
        <v-icon class="mr-2" large="large">mdi-account</v-icon>{{ $t('register.title') }}
      </div>
      <v-card light="light">
        <v-card-text>
          <div class="subheading">
            <template>{{ $t('register.description') }}</template>
          </div>
          <v-form>

            <validation-provider rules="required" v-slot="{ errors }">
              <v-text-field v-model="account.name" prepend-icon="mdi-user" :label="$t('register.placeholderName')" type="text"></v-text-field>
              <span>{{ errors[0] }}</span>
            </validation-provider>

            <v-text-field v-model="account.email" prepend-icon="mdi-email" label="Email" type="email"></v-text-field>

            <validation-provider mode="eager" rules="required|email" v-slot="{ errors }" id="password">
              <v-text-field v-model="account.password" prepend-icon="mdi-lock" :label="$t('login.placeholderPassword')" type="password"></v-text-field>
              <span>{{ errors[0] }}</span>
            </validation-provider>

            <v-alert
              color="red"
              type="error"
              v-if="isError"
            >{{ errMsg }}</v-alert>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-col class="text-left">
            <v-btn large link text :to="$i18n.path('login')" color="primary" class="reg-btn">{{ $t('register.btnLogin') }}</v-btn>
          </v-col>
          <v-col class="text-right">
            <v-btn large color="primary" class="white--text" @click.prevent="register">{{ $t('register.btnRegistration') }}</v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
      <div>
        <v-btn link text :to="$i18n.path('')" class="mt-2">
          <v-icon left>mdi-arrow-left</v-icon>{{ $t('register.btnGoHome') }}
        </v-btn>
        <v-btn class="mt-2" text :to="`/ru` + $route.fullPath" v-if="$i18n.locale === 'en'" active-class="none" exact>{{ $t('links.en') }}</v-btn>
        <v-btn class="mt-2" text :to="$route.fullPath.replace(/^\/[^\/]+/, '')" v-else active-class="none" exact>{{ $t('links.ru') }}</v-btn>



      </div>
    </v-flex>

</template>


<script>
// import { ValidationProvider, extend } from 'vee-validate'
// import { required } from 'vee-validate/dist/rules'

import { required, email, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})


// extend('required', {
//   ...required,
//   message: 'This field {_field_} is required 111'
// })

// extend('custPass1', value => {
//   if(value < 4) {
//     return true
//   }
//   return 'This field {_field_} is required 222'
// })

// extend('custPass2', {
//   validate: value => {
//     return value > 4
//   },
//   message: 'The {_field_} must be between  digits'
// });

extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max;
  },
  params: ['min', 'max'],
  message: (fieldName, placeholders) => {
    return `The ${fieldName} field must have at least ${placeholders.min} characters and ${placeholders.max} characters at most`;
  }
});


export default {
  layout: 'empty',

  data: () => ({
    account: {
      email: '',
      password: '',
      name: ''
    },
    isError: false,
    errMsg: ''
  }),
  methods: {
    changeLang (lang) {
      //mutate 'locale' in store
      this.$store.commit('SET_LANG', lang)
      //re-route to the current page but with the selected language in a query string
      // this.$router.push({ path: `${this.$router.currentRoute.path}?lang=${lang}` })
    },
    register() {
      this.$store
        .dispatch('users/register', this.account)
        .then(() => {
          this.$router.push('/')
        })
        .catch(error => {
          this.isError = true
          this.errMsg = error.code
          setTimeout(() => {
              this.isError = false
          }, 5000)
        })
    }
  },
  components: {
    ValidationProvider
  },
}
</script>

<style scoped>
  .login-form {
    max-width: 500px;
  }
  .reg-btn {
    text-transform: none;
    letter-spacing: 0.07em;
    font-weight: 400;
  }
</style>
