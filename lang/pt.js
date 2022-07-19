import pt from 'vee-validate/dist/locale/pt_PT'
import headerFile from './pt/header'
import footerFile from './pt/footer'
import commonFile from './pt/common'
import cartFile from './pt/cart'
import checkOutFile from './pt/checkoout'
import customizeTreatmentFile from './pt/customize-treatment'
import dashboardFile from './pt/dashboard'

const CustomMessages = {
  email_exists: 'E-mail já recebido',
  check_card_limit: 'O cartão deve ter 16 dígitos'
}

export default {
  ...commonFile,
  ...headerFile,
  ...footerFile,
  ...cartFile,
  ...checkOutFile,
  ...customizeTreatmentFile,
  ...dashboardFile,
  validation: { ...pt.messages, ...CustomMessages }
}
