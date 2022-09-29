import es from 'vee-validate/dist/locale/es'
import headerFile from './es/header'
import footerFile from './es/footer'
import commonFile from './es/common'
import cartFile from './es/cart'
import checkOutFile from './es/checkoout'
import customizeTreatmentFile from './es/customize-treatment'
import dashboardFile from './es/dashboard'
const CustomMessages = {
  email_exists: 'Correo electrónico ya tomado',
  check_card_limit: 'La tarjeta debe tener 16 dígitos.'
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
  validation: { ...es.messages, ...CustomMessages }
}
