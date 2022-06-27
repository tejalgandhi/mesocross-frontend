import Vue from 'vue'
import { StripePlugin } from '@vue-stripe/vue-stripe'

const options = {
  pk: process.env.stripePublisableKey,
  testMode: true, // Boolean. To override the insecure host warning
  stripeAccount: process.env.stripeAccount,
  apiVersion: process.env.stripeVersion,
  locale: 'en'
}

Vue.use(StripePlugin, options)
