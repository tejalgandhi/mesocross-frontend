export const hello = () => {
  return 'hello'
}

export const togglePassword = (passwordType) => {
  if (passwordType === 'password') {
    return {
      image: 'Eye_Close.svg',
      text: 'text'
    }
  } else {
    return {
      image: 'eye.svg',
      text: 'password'
    }
  }
}

export const showPricePopup = (obj) => {
  setTimeout(() => {
    if (obj.pricePopup && !obj.isLoggedin) {
      obj.$bvModal.show('price')
    }
  }, 2000)
}
