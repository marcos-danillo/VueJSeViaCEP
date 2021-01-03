import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://viacep.com.br/ws/'

Vue.use({
    install(Vue){

        Vue.prototype.$http = axios.create({
            baseURL: 'https://viacep.com.br/ws/',
            // baseURL: 'http://localhost:8000/',
            // headers: {
            //     "Authorization": "abc123"
            // }
        })

        Vue.prototype.$http.interceptors.request.use(config => {

            return config
        }, error => Promise.reject(error))

        Vue.prototype.$http.interceptors.response.use(res => {

            return res
        }, error => Promise.reject(error))
    }
})
