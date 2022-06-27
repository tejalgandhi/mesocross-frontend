export default () => ({
  address: [],
  cardNames: {
    master: 'MasterCard',
    visa: 'Visa',
    american: 'American Express'
  },
  userCards: [],
  isAddPayment: false,
  loggedIn: '',
  loggedinUser: {
    full_name: ''
  },
  singleAddress: {
    company_name: '',
    nif: '',
    country_code: '',
    country: '',
    address: '',
    address_first_line: '',
    address_second_line: '',
    city: '',
    state: '',
    post_code: '',
    dial_code: '',
    iso_alpha2: '',
    phone_no: '',
    email: ''
  },
  selectedAddress: 0,
  selectedCard: 0
})
