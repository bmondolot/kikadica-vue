 <template>
 	<div class="simple-list">
      <h2>{{ listTitle }}</h2>
      <ul>
        <li v-for="item in items">
          {{ item }}
        </li>
      </ul>
    </div>
 </template>

<script>
export default {
  name: 'simple-list',
  props: ['items', 'listTitle'],
  data () {
    return {
      items: [],
      listTitle: ''
    }
  }
}

</script>

