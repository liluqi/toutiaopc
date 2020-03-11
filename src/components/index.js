import HomeAsider from './home/home-asider'
import HomeHeader from './../views/home/home-header'
import BreadCrumb from './../utills/bread-crumb'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install: function (Vue) {
    Vue.component('home-asider', HomeAsider)
    Vue.component('home-header', HomeHeader)
    Vue.component('bread-crumb', BreadCrumb)
    Vue.use(VueQuillEditor)
  }
}
