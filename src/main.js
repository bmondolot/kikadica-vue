// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Resource from 'vue-resource'
import HomeView from './components/HomeView.vue'
import AuthorsView from './components/AuthorsView.vue'

// install router
Vue.use(VueRouter)

// install Resource to use ajax functions
Vue.use(Resource)

// routing
var router = new VueRouter({
  routes: [
     {path: '/', component: HomeView},
     {path: '/top-authors', component: AuthorsView}
  ]
})

new Vue({
  router
}).$mount('#app')

/* eslint-disable no-new */
/*
 * new Vue({ el: '#app', template: '<App/>', components: { App } })
 */
