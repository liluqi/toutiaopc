import HomeAsider from './home/home-asider'
import HomeHeader from './../views/home/home-header'
import BreadCrumb from './../utills/bread-crumb'
export default {
  install: function (Vue) {
    Vue.component('home-asider', HomeAsider)
    Vue.component('home-header', HomeHeader)
    Vue.component('bread-crumb', BreadCrumb)
  }
}
