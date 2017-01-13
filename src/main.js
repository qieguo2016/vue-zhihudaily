require('es6-promise').polyfill()
import { app, store } from './app'

// actually mount to DOM
app.$mount('#app')
