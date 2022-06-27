import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
// import { messages } from 'vee-validate/dist/locale/en.json'
// Add a rule.

for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
    // message: messages[rule]
  })
}

// const that = this
extend('email_exists', {
  getMessage: field => 'The email is already in the system.',

  validate: (value) => {
    // return axios.get(process.env.baseUrl + '/email-exist/' + value).then((response) => {
    return {
      valid: true
      // valid: response.data.valid // Your api could return a response containing a 'valid property'
    }
    // })
  }
}, {
  immediate: true
})

// Register it globally
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
