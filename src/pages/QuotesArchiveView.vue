<template>
  <div>
      <ul>
          <li v-for="quote in quotes">
            <div class="quoted">{{ quote.quotedUser }} said (the {{ quote.creationDate | moment }})</div>
            <div class="quote">{{ quote.text }}</div>
            <div class="author">brought back by {{ quote.authorUser }}</div>
          </li>
      </ul>
  </div>
</template>

<script>
import config from '../config'
import UserList from '../components/UserList.vue'
import moment from 'moment'

export default {
  name: 'QuotesArchiveView',
  components: {
    UserList
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
