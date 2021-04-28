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
          <validation-observer ref="validator">
            <v-form>

              <validation-provider v-slot="{ errors }" name="email" rules="required">
                <v-text-field
                  v-model="account.name"
                  :error-messages="errors"
                  prepend-icon="mdi-user"
                  :label="$t('register.placeholderName')"
                  type="text"
                  required />
              </validation-provider>


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
                  :label="$t('register.placeholderPassword')"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append="showPassword = !showPassword"
                  prepend-icon="mdi-lock"
                  counter="true"
                  @input="isError = false"
                  required
                />
              </validation-provider>
            </v-form>

            <div class="v-messages error--text ml-8" role="alert" v-if="isError">
                  {{ errMsg }}
            </div>
          </validation-observer>

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

import { required, email, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode, localize } from 'vee-validate'
import en from '~/lang/validation/en.json';
import ru from '~/lang/validation/ru.json';

setInteractionMode('eager')

extend("required", required);
extend("email", email);

localize('en', en);


export default {
  layout: 'empty',

  data: () => ({
    account: {
      email: '',
      password: '',
      name: ''
    },
    isError: false,
    showPassword: false,
    errors: null,
    errMsg: ''
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
  methods: {
    async updateFormValidity() {
      this.isValid = await this.$refs.validator.validate({
        silent: true // Validate silently and don't cause observer errors to be updated. We only need true/false. No side effects.
      })
    },
    register() {
      this.$store.dispatch('users/register', this.account)
        .then(() => this.$router.push('/'))
        .catch(error => {
          if(error.code === "auth/email-already-in-use") {
            this.isError = true
            this.errMsg = this.$t('register.errors.auth/email-already-in-use')
          }
        })
    }
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
