<template>
  <div class="top10-list">
    <h2>Les dernières citations</h2>
    <ul>
        <li v-for="quote in quotes">
            {{ quote.text }}
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'homeList',
  data () {
    return {
      quotes: [
        {
          text: 'Unique citation'
        }
      ]
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
