// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Resource from 'vue-resource'
import HomeView from './pages/HomeView.vue'
import TopAuthorsView from './pages/TopAuthorsView.vue'
import TopQuotedUsersView from './pages/TopQuotedUsersView.vue'
import UserView from './pages/UserView.vue'
import QuotesArchiveView from './pages/QuotesArchiveView.vue'
import moment from 'moment'

// install router
Vue.use(VueRouter)

// install Resource to use ajax functions
Vue.use(Resource)

// routing
var router = new VueRouter({
  routes: [
     {path: '/', component: HomeView},
     {path: '/top-authors', component: TopAuthorsView},
     {path: '/top-quoted', component: TopQuotedUsersView},
     {path: '/archive', component: QuotesArchiveView},
     {name: 'user', path: '/user/:name', component: UserView}
  ]
})

/* eslint-disable no-new */
new Vue({
  router
}).$mount('#app')

// define system wide locale
moment.locale('fr')
