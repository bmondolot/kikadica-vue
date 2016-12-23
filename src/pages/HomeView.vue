<template>
  <div>
    <div class="random-quote">
      <h2>Une citation au hasard</h2>
      <div class="quoted">{{ randomQuote.quotedUser }} a dit (le {{ randomQuote.creationDate | moment }})</div>
      <div class="quote">{{ randomQuote.text }}</div>
      <div class="author">rapporté par {{ randomQuote.authorUser }}</div>
    </div>
    <div class="top10-list">
      <h2>Les dernières citations</h2>
      <ul>
          <li v-for="quote in quotes">
            <div class="quoted">{{ quote.quotedUser }} a dit (le {{ quote.creationDate | moment }})</div>
            <div class="quote">{{ quote.text }}</div>
            <div class="author">rapporté par {{ quote.authorUser }}</div>
          </li>
      </ul>
    </div>
    <user-list
      v-bind:items="authors"
      list-title="Ceux qui rapportent le plus"
    >
    </user-list>
    <user-list
      v-bind:items="quotedUsers"
      list-title="Les plus cités"
    >
    </user-list>
    <add-quote-modal></add-quote-modal>
  </div>
</template>

<script>
import config from '../config'
import UserList from '../components/UserList.vue'
import moment from 'moment'
import AddQuoteModal from '../components/AddQuoteModal.vue'

export default {
  name: 'HomeView',
  components: {
    UserList, AddQuoteModal
  },
  data () {
    return {
      quotes: [],
      authors: [],
      quotedUsers: [],
      randomQuote: []
    }
  },
  created () {
    this.getQuotes()
    this.getAuthors()
    this.getQuotedUsers()
    this.getRandomQuote()
  },
  methods: {
    getQuotes: function () {
      this.$http.get(config.API_URL + '/quotes/page/1/perpage/10').then((response) => {
        this.quotes = response.data
      }, (response) => {
        console.log('Quotes could not be loaded')
      })
    },
    getAuthors: function () {
      this.$http.get(config.API_URL + '/authors/page/1/perpage/3').then((response) => {
        this.authors = response.data
      }, (response) => {
        console.log('Authors could not be loaded')
      })
    },
    getQuotedUsers: function () {
      this.$http.get(config.API_URL + '/quoted/page/1/perpage/3').then((response) => {
        this.quotedUsers = response.data
      }, (response) => {
        console.log('Quoted users could not be loaded')
      })
    },
    getRandomQuote: function () {
      this.$http.get(config.API_URL + '/quote/random').then((response) => {
        this.randomQuote = response.data
      }, (response) => {
        console.log('Random quote could not be loaded')
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
