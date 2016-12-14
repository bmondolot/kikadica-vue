<template>
  <div>
      <ul>
          <li v-for="quote in quotes">
            <div class="quoted">{{ quote.quotedUser }} said (the {{ quote.creationDate | moment }})</div>
            <div class="quote">{{ quote.text }}</div>
            <div class="author">brought back by {{ quote.authorUser }}</div>
          </li>
          <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
      </ul>
  </div>
</template>

<script>
import config from '../config'
import UserList from '../components/UserList.vue'
import moment from 'moment'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'QuotesArchiveView',
  components: {
    UserList, InfiniteLoading
  },
  data () {
    return {
      quotes: []
    }
  },
  created () {
    this.getQuotes()
  },
  methods: {
    getQuotes: function () {
      this.$http.get(config.API_URL + '/quotes/page/1/perpage/100').then((response) => {
        this.quotes = response.data
      }, (response) => {
        console.log('Quotes could not be loaded')
      })
    },
    onInfinite: function () {
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      console.log('on infinite')
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('lll')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}

li > div {
  display: inline-block;
}

a {
  color: #42b983;
}
</style>
