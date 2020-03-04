import HomeAsider from './home/home-asider'
import HomeHeader from './../views/home/home-header'
export default {
  install: function (Vue) {
    Vue.component('home-asider', HomeAsider)
    Vue.component('home-header', HomeHeader)
  }
}
