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
    <div class="top3-list">
      <h2>Authors</h2>
      <ul>
        <li v-for="author in authors">
          {{ author }}
        </li>
      </ul>
    </div>
    <div class="top3-list">
      <h2>Quoted users</h2>
      <ul>
        <li v-for="quotedUser in quotedUsers">
          {{ quotedUser }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
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
      this.$http.get('http://localhost:3000/quotes').then((response) => {
        this.quotes = response.data
      }, (response) => {
        console.log('Quotes could not be loaded')
      })
    },
    getAuthors: function () {
      // TODO : back pas prêt
    },
    getQuotedUsers: function () {
      // TODO : back pas prêt
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
