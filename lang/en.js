import en from 'vee-validate/dist/locale/en'
const CustomMessages = {
  email_exists: 'Email Already Taken'
}

export default {
  welcome: 'Welcome',
  validation: { ...en.messages, ...CustomMessages }
}
