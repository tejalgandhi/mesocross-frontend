export default function ({ i18n, $axios, store }) {
  $axios.onRequest((config) => {
    // eslint-disable-next-line dot-notation
    config['headers']['localization'] = i18n.locale || 'en'
  })

  $axios.onError((error) => {
    // console.error(error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
    //   redirect('/400')
    }
  })
}
