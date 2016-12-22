<template>
  <div>
    <user-list
      v-bind:items="authors"
      list-title="La liste des rapporteurs"
    >
    </user-list>
  </div>
</template>

<script>
import config from '../config'
import UserList from '../components/UserList.vue'
import moment from 'moment'

export default {
  name: 'TopAuthorsView',
  components: {
    UserList
  },
  data () {
    return {
      authors: []
    }
  },
  created () {
    this.getAuthors()
  },
  methods: {
    getAuthors: function () {
      this.$http.get(config.API_URL + '/authors/page/1/perpage/100').then((response) => {
        this.authors = response.data
      }, (response) => {
        console.log('Top authors could not be loaded')
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
