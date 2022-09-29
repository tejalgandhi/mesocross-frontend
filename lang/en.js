import en from 'vee-validate/dist/locale/en'
import headerFile from './en/header'
import footerFile from './en/footer'
import commonFile from './en/common'
import cartFile from './en/cart'
import checkOutFile from './en/checkoout'
import customizeTreatmentFile from './en/customize-treatment'
import dashboardFile from './en/dashboard'
const CustomMessages = {
  email_exists: 'Email Already Taken',
  check_card_limit: 'Card Should be 16 digits.'
}

export default {
  ...commonFile,
  ...headerFile,
  ...footerFile,
  ...cartFile,
  ...checkOutFile,
  ...customizeTreatmentFile,
  ...dashboardFile,
  welcome: 'Welcome',
  validation: { ...en.messages, ...CustomMessages }
}
