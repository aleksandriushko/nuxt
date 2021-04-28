<template>
  <v-flex class="login-form text-center">
    <div class="display-1 mb-3">
      <v-icon class="mr-2" large="large">mdi-account</v-icon> {{ $t('login.title') }}
    </div>
    <v-card light="light">
      <v-card-text>
        <div class="subheading">
          <template>{{ $t('login.description') }}</template>
        </div>
        <validation-observer ref="validator">
          <form @submit="login">
            <validation-provider v-slot="{ errors }" name="email" rules="required|email" >
              <v-text-field
                v-model="account.email"
                :error-messages="errors"
                label="E-mail"
                type="email"
                prepend-icon="mdi-email"
                required
                @input="isError = false"
              />
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="password" rules="required">
              <v-text-field
                v-model="account.password"
                :error-messages="errors"
                :label="$t('login.placeholderPassword')"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showPassword = !showPassword"
                prepend-icon="mdi-lock"
                counter="true"
                @input="isError = false"
                required
              />
            </validation-provider>
          </form>
          <div class="v-messages error--text ml-8" role="alert" v-if="isError">
                {{ errMsg }}
          </div>
        </validation-observer>
      </v-card-text>
      <v-card-actions>
        <v-col class="text-left">
          <v-btn large link text :to="$i18n.path('register')" color="primary" class="reg-btn">{{ $t('login.btnRegistration') }}</v-btn>
        </v-col>
        <v-col class="text-right">
          <v-btn large color="primary" class="white--text" @click.prevent="login" :disabled="!isValid">{{ $t('login.btnLogin') }}</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
    <div>
      <v-btn link text :to="$i18n.path('')" class="mt-2">
        <v-icon left>mdi-arrow-left</v-icon>{{ $t('login.btnGoHome') }}
      </v-btn>
      <v-btn class="mt-2" text :to="`/ru` + $route.fullPath" v-if="$i18n.locale === 'en'" active-class="none" exact>{{ $t('links.en') }}</v-btn>
      <v-btn class="mt-2" text :to="$route.fullPath.replace(/^\/[^\/]+/, '')" v-else active-class="none" exact>{{ $t('links.ru') }}</v-btn>

      <div @click="btnTest">
        btnLogin
      </div>
    </div>
  </v-flex>

</template>

<script>
  import { required, email} from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode, localize } from 'vee-validate'
  import en from '~/lang/validation/en.json';
  import ru from '~/lang/validation/ru.json';

  setInteractionMode('eager') // check valedate when out text field

  extend("required", required);
  extend("email", email);

  localize('en', en);

export default {

  layout: 'empty',

  data: () => ({
      account: {
        email: '',
        password: ''
      },
      isError: false,
      // errMsg: '',
      showPassword: false,
      // invalid: false,
      errors: null,

      isValid: false, // for disable submit when no valid (1 of 3)
  }),
  computed: {
    locale: function() {
      return this.$store.getters.locale
    }
  },
  watch: {
    // for disable submit when no valid (2 of 3)
    'account': {
      deep: true,
      handler: function() {
        this.updateFormValidity();
      }
    },
    locale(lang) {
      if(lang === 'en') {
        localize('en', en);
      } else if(lang === 'ru') {
        localize('ru', ru);
      }
    }
  },
  created() {
    if(this.locale === 'ru') {
      localize('ru', ru);
    }
  },
  methods: {
    // for disable submit when no valid (3 of 3)
    async updateFormValidity() {
      this.isValid = await this.$refs.validator.validate({
        silent: true // Validate silently and don't cause observer errors to be updated. We only need true/false. No side effects.
      })
    },
    btnTest() {
      this.errors = 'asd'
      console.log('Object.keys(this.fields)', this.validator)
          // console.log('testBtn', extend, ValidationObserver, ValidationProvider, setInteractionMode, localize)

      // console.log('Object.keys(this.fields)', this.$validator)
    },
    login(e) {
      // TODO: add parsing of data.
      this.$store.dispatch('users/login', this.account)
        .then(() => this.$router.push('/admin'))
        .catch(error => {
          console.log('error aaa', error)

          if(error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
            this.isError = true
            this.errMsg = this.$t('login.errors.auth/user-not-found')
          }
        })
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
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
