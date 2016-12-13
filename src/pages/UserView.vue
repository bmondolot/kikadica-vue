<template>
  <div>
      <h3>What he said</h3>
      <ul>
        <li v-for="quote in quotesAsQuoted">
          <div class="quoted">The {{ quote.creationDate | moment }}</div>
          <div class="quote">{{ quote.text }}</div>
          <div class="author">brought back by {{ quote.authorUser }}</div>
        </li>
      </ul>

      <h3>What he heard</h3>
      <ul>
        <li v-for="quote in quotesAsAuthor">
          <div class="quoted">{{ quote.quotedUser }} said (the {{ quote.creationDate | moment }})</div>
          <div class="quote">{{ quote.text }}</div>
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
      quotesAsAuthor: [],
      quotesAsQuoted: []
    }
  },
  created () {
    this.getQuotesAsAuthor()
    this.getQuotesAsQuoted()
  },
  methods: {
    getQuotesAsAuthor: function () {
      this.$http.get(config.API_URL + '/quotes/byauthoruser/' + this.$route.params.name + '/page/1/perpage/100').then((response) => {
        this.quotesAsAuthor = response.data
      }, (response) => {
        console.log('Quotes could not be loaded')
      })
    },
    getQuotesAsQuoted: function () {
      this.$http.get(config.API_URL + '/quotes/byquoteduser/' + this.$route.params.name + '/page/1/perpage/100').then((response) => {
        this.quotesAsQuoted = response.data
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
