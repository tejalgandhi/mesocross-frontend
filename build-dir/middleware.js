const middleware = {}

middleware['authenticated'] = require('..\\middleware\\authenticated.js')
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

middleware['route-guard'] = require('..\\middleware\\route-guard.js')
middleware['route-guard'] = middleware['route-guard'].default || middleware['route-guard']

export default middleware
