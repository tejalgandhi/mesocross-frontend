const https = require('https')
const fs = require('fs')
const path = require('path')
const env = require('dotenv').config({
  path: path.join(__dirname, '../.env')
})

try {
  const prepareUrl = uri => {
    const base = env.parsed.BASE_URL
    if (base.endsWith('/')) {
      return base + (uri.startsWith('/') ? uri.substr(1): uri)
    } else {
      return base + (uri.startsWith('/') ? uri: '/' + uri)
    }
  }

  const url = prepareUrl('/lang')
  console.log(url);
  const request = https.request(url, (response) => {
    let data = ''
    response.on('data', (chunk) => {
      data = data + chunk.toString()
    })
    response.on('end', () => {
      const languages = JSON.parse(data)
      for (const lang in languages) {
        const common = languages[lang].common
        delete languages.common
        const langCode = JSON.stringify({ ...common, ...languages[lang] }, null, 2)
        const langFolder = 'lang/'
        if (!fs.existsSync(langFolder)) {
          fs.mkdirSync(langFolder)
        }
        fs.writeFile(`${langFolder}/${lang}.js`, `export default ${langCode}`, 'utf-8', (err) => {
          if (err) { return console.log('Error in saving launages', err) }
        })
      }
      console.log('Languages have been updated successfully')
    })
  })
  request.on('error', (error) => {
    console.log('Language API get faild', error)
  })
  request.end()
} catch (error) {
  console.log('Cache Language API get faild', error)
}
