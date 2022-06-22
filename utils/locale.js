export const convertToLocale = (data, translatableFields, isArr = false, localeLang = 'en') => {
  let convertedData = []
  if (isArr) {
    convertedData = data.map((value) => {
      const translateData = value
      for (const i in translatableFields) {
        if (translateData[translatableFields[i]]) {
          translateData[translatableFields[i]] = getLocaleValue(translateData[translatableFields[i]], localeLang)
        }
      }
      return translateData
    })
  } else {
    for (const i in translatableFields) {
      if (data[translatableFields[i]]) {
        data[translatableFields[i]] = getLocaleValue(data[translatableFields[i]], localeLang)
      }
    }
    convertedData = Object.assign({}, data)
  }
  return convertedData
}
const getLocaleValue = (data, lang) => {
  try {
    const localeValue = JSON.parse(data)
    return localeValue[lang] || ''
  } catch (e) {
    return data
  }
}
