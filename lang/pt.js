import pt from 'vee-validate/dist/locale/pt_PT'

const CustomMessages = {
  email_exists: 'E-mail já recebido'
}
export default {
  welcome: 'Bem-vinda',
  validation: { ...pt.messages, ...CustomMessages }
}
