import es from 'vee-validate/dist/locale/es'
const CustomMessages = {
  email_exists: 'Correo electrónico ya tomado'
}
export default {
  welcome: 'Bienvenidos',
  validation: { ...es.messages, ...CustomMessages }
}
