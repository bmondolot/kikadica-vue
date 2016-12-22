<template>
  <div>
    <user-list
      v-bind:items="quotedUsers"
      list-title="La liste des cités"
    >
    </user-list>
  </div>
</template>

<script>
import config from '../config'
import UserList from '../components/UserList.vue'
import moment from 'moment'

export default {
  name: 'TopQuotedUsersView',
  components: {
    UserList
  },
  data () {
    return {
      quotedUsers: []
    }
  },
  created () {
    this.getQuotedUsers()
  },
  methods: {
    getQuotedUsers: function () {
      this.$http.get(config.API_URL + '/quoted/page/1/perpage/100').then((response) => {
        this.quotedUsers = response.data
      }, (response) => {
        console.log('Top quoted users could not be loaded')
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
