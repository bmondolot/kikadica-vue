// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Resource from 'vue-resource'
import HomeView from './pages/HomeView.vue'
import AuthorsView from './pages/AuthorsView.vue'

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

/* eslint-disable no-new */
new Vue({
  router
}).$mount('#app')
