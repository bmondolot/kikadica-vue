<template>
  <div>
      <h3>Ce qu'il a dit</h3>
      <ul>
        <li v-for="quote in quotesAsQuoted">
          <div class="quoted">Le {{ quote.creationDate | moment }}</div>
          <div class="quote" v-html="quote.text"></div>
          <div class="author">rapporté par {{ quote.authorUser }}</div>
        </li>
      </ul>

      <h3>Ce qu'il a rapporté</h3>
      <ul>
        <li v-for="quote in quotesAsAuthor">
          <div class="quoted">{{ quote.quotedUser }} a dit (le {{ quote.creationDate | moment }})</div>
          <div class="quote" v-html="quote.text"></div>
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
