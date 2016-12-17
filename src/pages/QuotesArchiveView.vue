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
      quotes: [],
      nextPage: 1,
      pageSize: 100
    }
  },
  methods: {
    getNextQuotesPage: function () {
      this.$http.get(config.API_URL + '/quotes/page/' + this.nextPage + '/perpage/' + this.pageSize).then((response) => {
        response.data.forEach((element) => this.quotes.push(element))
        if (response.data.length === this.pageSize) {
          this.nextPage = this.nextPage + 1
        } else {
          console.log('no more page to load')
        }

        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      }, (response) => {
        console.log('Quotes could not be loaded')
      })
    },
    onInfinite: function () {
      this.getNextQuotesPage()
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
