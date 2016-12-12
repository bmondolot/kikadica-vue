<template>
  <div>
    <div class="top10-list">
      <h2>The last quotes</h2>
      <ul>
          <li v-for="quote in quotes">
              {{ quote.text }}
          </li>
      </ul>
    </div>
    <simple-list
      v-bind:items="authors"
      list-title="Authors"
    >
    </simple-list>
    <simple-list
      v-bind:items="quotedUsers"
      list-title="Quoted users"
    >
    </simple-list>
  </div>
</template>

<script>
import config from '../config'
import SimpleList from '../components/SimpleList.vue'

export default {
  name: 'HomeView',
  components: {
    SimpleList
  },
  data () {
    return {
      quotes: [],
      authors: [],
      quotedUsers: []
    }
  },
  created () {
    this.quotes = this.getQuotes()
    this.authors = this.getAuthors()
    this.quotedUsers = this.getQuotedUsers()
  },
  methods: {
    getQuotes: function () {
      this.$http.get(config.API_URL + '/quotes').then((response) => {
        this.quotes = response.data
      }, (response) => {
        console.log('Quotes could not be loaded')
      })
    },
    getAuthors: function () {
      this.$http.get(config.API_URL + '/authors').then((response) => {
        this.authors = response.data
      }, (response) => {
        console.log('Authors could not be loaded')
      })
    },
    getQuotedUsers: function () {
      this.$http.get(config.API_URL + '/quoted').then((response) => {
        this.quotedUsers = response.data
      }, (response) => {
        console.log('Quoted users could not be loaded')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 { 
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
