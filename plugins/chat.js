// eslint-disable-next-line no-undef
// window.$crisp = []; window.CRISP_WEBSITE_ID = 'e97be7a3-3b08-48f5-812b-2a12bb195698'; (function () { d = document; s = d.createElement('script'); s.src = 'https://client.crisp.chat/l.js'; s.async = 1; d.getElementsByTagName('head')[0].appendChild(s) })()
export default () => {
  window.$crisp = []
  window.CRISP_WEBSITE_ID = 'e97be7a3-3b08-48f5-812b-2a12bb195698';

  (function () {
    const d = document
    const s = d.createElement('script')

    s.src = 'https://client.crisp.chat/l.js'
    s.async = 1
    d.getElementsByTagName('head')[0].appendChild(s)
  })()
}
