import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.directive("success", {
  bind(el) {
    el.style.color = "green"
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
